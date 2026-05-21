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

newsSchema.pre("save", async function (next) {
  if (this.title) {
    let baseSlug = this.title
      .toLowerCase()
      .trim()
      .replace(/[^\u0900-\u097Fa-z0-9\s-]/g, "")
      .replace(/\s+/g, "-")
      .replace(/-+/g, "-");

    let slug = baseSlug;

    let counter = 1;

    while (
      await mongoose.models.News.findOne({
        slug,
        _id: { $ne: this._id },
      })
    ) {
      slug = `${baseSlug}-${counter}`;
      counter++;
    }

    this.slug = slug;
  }

  next();
});

export default mongoose.model("News", newsSchema);
