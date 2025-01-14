import { model, Schema } from "dynamoose";
import { UserRow } from "./interface";

const UserSchema = new Schema(
  {
    id: {
      type: String,
      hashKey: true, // Primary key
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      index: {
        name: "EmailIndex",
        type: "global",
      },
    },
    password: {
      type: String,
      required: true,
    },
    brandId: {
      type: String,
    },
    deactivatedAt: {
      type: Date,
    },
    deactivatedBy: {
      type: String,
    },
  },
  {
    timestamps: true, // Adds createdAt and updatedAt fields automatically
  }
);

// Export the model
export const UserModel = model<UserRow>("User", UserSchema);

export default UserModel;
