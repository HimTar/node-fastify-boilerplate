import { model, Schema } from "dynamoose";
import { BrandRow } from "./interface";

const BrandSchema = new Schema(
  {
    id: {
      type: String,
      hashKey: true,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    deactivatedAt: {
      type: Date,
    },
    deactivatedBy: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

const BrandModel = model<BrandRow>("Brand", BrandSchema);

export default BrandModel;
