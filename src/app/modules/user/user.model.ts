import { Schema, model } from "mongoose";
import { TUser, TUserName } from "./user.interface";

const UserNameSchema = new Schema<TUserName>({
  firstName: { type: String, required: true },
  middleName: { type: String },
  lastName: { type: String, required: true },
});

const UserSchema = new Schema<TUser>({
  name: { type: UserNameSchema, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  phone: { type: String, required: true },
  role: { type: String, enum: ["admin", "user"], required: true },
  address: { type: String, required: true },
});

export const User = model<TUser>("User", UserSchema);
