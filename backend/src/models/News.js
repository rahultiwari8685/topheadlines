import mongoose from "mongoose";

const newsSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    subtitle: { type: String, default: "" },

    slug: { type: String, unique: true, sparse: true },

    categories: [{ type: mongoose.Schema.Types.ObjectId, ref: "Category" }],

    content: { type: Object, default: {} },

    type: {
      type: Number,
      enum: [1, 2],
      default: 2,
    },

    // ✅ ADD THIS
    youtubeUrl: { type: String, default: "" },

    // (optional but you are using it)
    videoType: { type: Number, default: 0 },

    thumbnail: { type: String, default: "" },
  },
  { timestamps: true },
);

newsSchema.pre("save", function (next) {
  if (this.title && !this.slug) {
    this.slug = this.title
      .toLowerCase()
      .replace(/[^a-z0-9\s-]/g, "")
      .trim()
      .replace(/\s+/g, "-");
  }
  next();
});

export default mongoose.model("News", newsSchema);
