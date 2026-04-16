import mongoose from "mongoose";

const newsSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    subtitle: { type: String, default: "" },

    // slug: { type: String, unique: true, lowercase: true },
    slug: { type: String, unique: true, sparse: true },

    categories: [{ type: mongoose.Schema.Types.ObjectId, ref: "Category" }],

    // ✅ MAIN CONTENT (HTML or JSON editor)
    // content: { type: String, required: true },
    content: { type: Object, default: {} },

    type: {
      type: Number,
      enum: [1, 2], // 1 = published, 2 = draft
      default: 2,
    },

    thumbnail: { type: String, default: "" },
  },
  { timestamps: true },
);

// auto slug
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
