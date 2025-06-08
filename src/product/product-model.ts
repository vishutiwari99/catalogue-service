import mongoose from "mongoose";

const priceConfigurationSchema = new mongoose.Schema({
  priceType: {
    type: String,
    enum: ["base", "additional"],
  },
  availableOptions: {
    type: Map,
    of: Number,
  },
});
const attributeValueSchema = new mongoose.Schema({
  name: {
    type: String,
  },
  value: {
    type: mongoose.Schema.Types.Mixed,
  },
});
const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    image: {
      type: String,
      required: true,
    },
    priceConfigurationSchema: {
      type: Map,
      of: priceConfigurationSchema,
    },
    attributes: [attributeValueSchema],
    tenantId: {
      type: Number,
    },
    categoryId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category",
    },
    isPublished: {
      type: Boolean,
      default: false,
      required: false,
    },
  },
  { timestamps: true },
);

export default mongoose.model("Product", productSchema);
