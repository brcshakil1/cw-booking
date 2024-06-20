import { Schema, model } from "mongoose";
import { TService } from "./service.interface";

const serviceSchema = new Schema<TService>({
  name: { type: String, require: true, trim: true },
  description: { type: String, require: true, trim: true },
  price: { type: Number, require: true },
  duration: { type: Number, require: true },
  isDeleted: { type: Boolean, default: false },
});

export const Service = model<TService>("Service", serviceSchema);
