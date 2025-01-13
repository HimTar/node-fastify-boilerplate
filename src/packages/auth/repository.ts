import { model, Schema } from "dynamoose";
import { UserRow } from "./interface";

const UserSchema = new Schema(
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
    email: {
      type: String,
      required: true,
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
    timestamps: true,
  }
);

const UserModel = model<UserRow>("User", UserSchema);

export default UserModel;
