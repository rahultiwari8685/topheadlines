import News from "../models/News.js";

export const createNews = async (req, res) => {
  try {
    const { title, sub_title, video_type, type, youtube_url, content } =
      req.body;

    const categories = req.body["categories[]"] || [];

    const news = await News.create({
      title,
      subtitle: sub_title,
      categories,
      videoType: video_type,
      type,
      youtubeUrl: youtube_url || "",
      content: content ? JSON.parse(content) : "",
      // thumbnail: req.files?.thumbnail?.[0]?.filename || "",
      thumbnail: req.file?.filename || "",
    });

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

    const categories = req.body["categories[]"] || [];

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
