import mongoose from "mongoose";
import { slugify } from "transliteration";

const categorySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },

    // ✅ Add this
    slug: {
      type: String,
      unique: true,
      sparse: true,
    },

    parentCategory: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category",
      default: null,
    },

    showInMenu: {
      type: String,
      default: "0",
    },

    position: {
      type: Number,
      default: 0,
    },

    meta_title: {
      type: String,
      required: true,
      trim: true,
    },

    meta_desc: {
      type: String,
      required: true,
      trim: true,
    },

    bannerImage: {
      type: String,
      default: "",
    },
  },
  {
    timestamps: true,
  },
);

// ✅ Auto Generate Slug
categorySchema.pre("save", async function (next) {
  if (this.name) {
    let baseSlug = slugify(this.name, {
      lower: true,
      strict: true,
    });

    let slug = baseSlug;
    let counter = 1;

    while (
      await mongoose.models.Category.findOne({
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

export default mongoose.model("Category", categorySchema);
