import mongoose from "mongoose";

type PriceConfiguration = Record<
  string,
  {
    priceType: "base" | "additional";
    availableOptions: string[];
  }
>;

interface Attribute {
  name: string;
  widgetType: "swtich" | "radio";
  defaulValue: string;
  availableOptions: string[];
}

export interface Category {
  name: string;
  priceConfiguration: PriceConfiguration;
  attributes: Attribute[];
}

const priceConfigurationSchema = new mongoose.Schema<PriceConfiguration>({
  priceType: { type: String, enum: ["base", "additional"], required: true },
  availableOptions: { type: [String], required: true },
});
const attributeSchema = new mongoose.Schema<Attribute>({
  name: { type: String, required: true },
  widgetType: { type: String, enum: ["swtich", "radio"], required: true },
  defaulValue: { type: mongoose.Schema.Types.Mixed, required: true },
  availableOptions: { type: [String], required: true },
});

const categorySchema = new mongoose.Schema<Category>({
  name: { type: String, required: true },
  priceConfiguration: {
    type: Map,
    of: priceConfigurationSchema,
    required: true,
  },
  attributes: {
    type: [attributeSchema],
  },
});

export default mongoose.model<Category>("Category", categorySchema);
