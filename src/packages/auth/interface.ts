import { ObjectId } from "mongodb";

export interface User {
  email: string;
  password: string;
  username: string;
  active: Boolean;
  isEmailVerified: Boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface UserUpdate extends Partial<User> {}

export interface Session {
  userId: ObjectId;
  token: string;
  active: Boolean;
  createdAt: Date;
  expireAt: Date;
}

export interface AccountVerification {
  type: "EMAIL" | "MOBILE";
  token: string;
  otp: string;
  userId: ObjectId;
  active: boolean;
  createdAt: Date;
  expireAt: Date;
}
