import mongoose from "mongoose";
import News from "../models/News.js";

export const createNews = async (req, res) => {
  try {
    const { title, sub_title, video_type, type, youtube_url, content } =
      req.body;

    let categories = [];

    try {
      categories = JSON.parse(req.body.categories || "[]");
    } catch (err) {
      categories = [];
    }

    categories = categories.map((id) => new mongoose.Types.ObjectId(id));

    const createdNews = await News.create({
      title,
      subtitle: sub_title,

      author: req.author,

      categories,

      videoType: video_type,

      type,

      youtubeUrl: youtube_url || "",

      content: content || "",

      thumbnail: req.file?.filename || "",
    });

    // populate author after create
    const news = await News.findById(createdNews._id)
      .populate("author", "name email")
      .populate("categories", "name");

    return res.status(201).json({
      status: true,
      message: "News created successfully",
      data: news,
    });
  } catch (error) {
    console.error("Create News Error:", error);

    return res.status(500).json({
      status: false,
      message: error.message,
    });
  }
};

export const getNews = async (req, res) => {
  try {
    const news = await News.find()
      .populate("categories", "name")
      .sort({ createdAt: -1 });

    return res.status(200).json({
      status: true,
      data: news,
    });
  } catch (error) {
    return res.status(500).json({
      status: false,
      message: error.message,
    });
  }
};

export const getAllNewsByCategory = async (req, res) => {
  try {
    const { categoryId } = req.params;
    const { page = 1, limit = 6 } = req.query;

    if (!mongoose.Types.ObjectId.isValid(categoryId)) {
      return res.status(400).json({
        status: false,
        message: "Invalid category ID",
      });
    }

    const skip = (page - 1) * limit;

    const news = await News.find({
      categories: { $in: [categoryId] },
    })
      // .populate("categories", "name slug")
      .populate("categories", "name slug _id")
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(parseInt(limit));

    const total = await News.countDocuments({
      categories: { $in: [categoryId] },
    });

    return res.status(200).json({
      status: true,
      totalPages: Math.ceil(total / limit),
      total,
      data: news,
    });
  } catch (error) {
    console.error("Get News By Category Error:", error);
    return res.status(500).json({
      status: false,
      message: error.message,
    });
  }
};

export const getNewsBySlug = async (req, res) => {
  try {
    const news = await News.findOne({ slug: req.params.slug }).populate(
      "categories",
      "name slug",
    );

    if (!news) {
      return res.status(404).json({
        status: false,
        message: "News not found",
      });
    }

    return res.status(200).json({
      status: true,
      data: news,
    });
  } catch (error) {
    return res.status(500).json({
      status: false,
      message: error.message,
    });
  }
};

export const getNewsById = async (req, res) => {
  try {
    const { id } = req.params;

    const news = await News.findById(id).populate("categories", "name slug");

    if (!news) {
      return res.status(404).json({
        status: false,
        message: "News not found",
      });
    }

    return res.status(200).json({
      status: true,
      data: news,
    });
  } catch (error) {
    return res.status(500).json({
      status: false,
      message: error.message,
    });
  }
};

export const updateNews = async (req, res) => {
  try {
    const { id, title, sub_title, video_type, type, youtube_url } = req.body;

    // ✅ SAFE PARSE
    let categories = [];
    try {
      categories = JSON.parse(req.body.categories || "[]");
    } catch (err) {
      categories = [];
    }

    // ✅ CONVERT TO OBJECTID
    categories = categories.map((id) => new mongoose.Types.ObjectId(id));

    const updateData = {
      title,
      subtitle: sub_title,
      categories,
      videoType: video_type,
      type,
      youtubeUrl: youtube_url || "",
    };

    if (req.file) {
      updateData.thumbnail = req.file.filename;
    }

    const updated = await News.findByIdAndUpdate(id, updateData, {
      new: true,
    });

    return res.status(200).json({
      status: true,
      message: "News updated successfully",
      data: updated,
    });
  } catch (error) {
    return res.status(500).json({
      status: false,
      message: error.message,
    });
  }
};

export const deleteNews = async (req, res) => {
  try {
    await News.findByIdAndDelete(req.params.id);

    return res.status(200).json({
      status: true,
      message: "News deleted successfully",
    });
  } catch (error) {
    return res.status(500).json({
      status: false,
      message: error.message,
    });
  }
};
