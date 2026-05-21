import mongoose from "mongoose";
import News from "../models/News.js";

export const createNews = async (req, res) => {
  try {
    const {
      title,
      sub_title,
      video_type,
      type,
      youtube_url,
      content,
      is_auto_draft,
    } = req.body;

    let categories = [];

    try {
      categories = JSON.parse(req.body.categories || "[]");
    } catch (err) {
      categories = [];
    }

    categories = categories.map((id) => new mongoose.Types.ObjectId(id));

    const existingDraft = await News.findOne({
      author: req.body.author,
      type: 2,
      is_auto_draft: true,
    });

    let news;

    const newsData = {
      title,

      subtitle: sub_title,

      author: req.body.author,

      categories,

      videoType: Number(video_type),

      type: Number(type),

      youtubeUrl: youtube_url || "",

      content:
        typeof content === "string" ? JSON.parse(content || "{}") : content,

      is_auto_draft: is_auto_draft === true || is_auto_draft === "true",
    };

    if (req.file?.filename) {
      newsData.thumbnail = req.file.filename;
    }

    // UPDATE EXISTING DRAFT
    if (existingDraft && (is_auto_draft === true || is_auto_draft === "true")) {
      await News.findByIdAndUpdate(existingDraft._id, newsData);

      news = await News.findById(existingDraft._id);
    } else {
      // CREATE NEW NEWS
      news = await News.create(newsData);
    }

    // POPULATE
    const populatedNews = await News.findById(news._id)
      .populate("author", "name email")
      .populate("categories", "name");

    return res.status(201).json({
      status: true,
      message: "News saved successfully",
      data: populatedNews,
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
      .populate("author", "name email")
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
    const news = await News.findOne({ slug: req.params.slug })
      .populate("author", "name email")
      .populate("categories", "name slug");

    if (!news) {
      return res.status(404).json({
        status: false,
        message: "News not found",
      });
    }

    return res.status(200).json({
      status: true,
      data: {
        ...news._doc,
        author: news.author?.name || "Admin",
      },
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

export const getAllNewsByAuthorId = async (req, res) => {
  try {
    const { authorId } = req.params;

    const { page = 1, limit = 10 } = req.query;

    if (!mongoose.Types.ObjectId.isValid(authorId)) {
      return res.status(400).json({
        status: false,
        message: "Invalid author ID",
      });
    }

    const skip = (page - 1) * limit;

    const news = await News.find({
      author: authorId,
    })
      .populate("author", "name email profileImage")
      .populate("categories", "name slug")
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(parseInt(limit));

    const total = await News.countDocuments({
      author: authorId,
    });

    return res.status(200).json({
      status: true,
      totalPages: Math.ceil(total / limit),
      total,
      data: news,
    });
  } catch (error) {
    console.error("Get News By Author Error:", error);

    return res.status(500).json({
      status: false,
      message: error.message,
    });
  }
};
