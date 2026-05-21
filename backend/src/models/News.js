import mongoose from "mongoose";
import slugify from "slugify";
const newsSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    subtitle: { type: String, default: "" },

    slug: { type: String, unique: true, sparse: true },

    author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },

    categories: [{ type: mongoose.Schema.Types.ObjectId, ref: "Category" }],

    content: { type: Object, default: {} },

    type: {
      type: Number,
      enum: [1, 2],
      default: 2,
    },

    youtubeUrl: { type: String, default: "" },

    videoType: { type: Number, default: 0 },

    thumbnail: { type: String, default: "" },
  },
  { timestamps: true },
);

newsSchema.pre("save", function (next) {
  if (this.title && !this.slug) {
    this.slug = this.title
      .toLowerCase()
      .trim()

      // remove special chars except Hindi/English/numbers/spaces
      .replace(/[^\u0900-\u097Fa-z0-9\s-]/g, "")

      // replace spaces with -
      .replace(/\s+/g, "-")

      // remove duplicate -
      .replace(/-+/g, "-");
  }

  next();
});

export default mongoose.model("News", newsSchema);
