import { Schema, model } from "mongoose";
import { ServiceModel, TService } from "./service.interface";

const serviceSchema = new Schema<TService, ServiceModel>(
  {
    name: { type: String, require: true, trim: true },
    description: { type: String, require: true, trim: true },
    price: { type: Number, require: true },
    duration: { type: Number, require: true },
    isDeleted: { type: Boolean, default: false },
  },
  {
    timestamps: true,
  }
);

serviceSchema.statics.isServiceExistById = async function (id: string) {
  return await Service.findById(id);
};

export const Service = model<TService, ServiceModel>("Service", serviceSchema);
