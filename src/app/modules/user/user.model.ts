import { Schema, model } from "mongoose";
import { TUser, UserModel } from "./user.interface";
import bcrypt from "bcrypt";
import config from "../../config";

const UserSchema = new Schema<TUser, UserModel>(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true, select: 0 },
    phone: { type: String, required: true },
    role: { type: String, enum: ["admin", "user"], required: true },
    address: { type: String, required: true },
  },
  {
    timestamps: true,
  }
);

UserSchema.pre("save", async function (next) {
  this.password = await bcrypt.hash(
    this.password,
    Number(config.bcrypt_salt_routes)
  );
  next();
});

UserSchema.post("save", function (doc, next) {
  (doc as any).password = undefined;
  next();
});

UserSchema.statics.isUserExistsByEmail = async function (email: string) {
  return await User.findOne({ email }).select({ __v: 0 });
};

export const User = model<TUser, UserModel>("User", UserSchema);
