import { Schema, model } from "mongoose";
import { TSlot } from "./slot.interface";
import { datePattern } from "./slot.constant";

const slotSchema = new Schema(
  {
    service: {
      type: Schema.Types.ObjectId,
      ref: "Service",
      required: true,
    },
    date: {
      type: String,
      required: true,
      match: datePattern,
    },
    startTime: {
      type: String,
      required: true,
    },
    endTime: {
      type: String,
      required: true,
    },
    isBooked: {
      type: String,
      enum: ["available", "booked", "canceled"],
      default: "available",
    },
  },
  {
    timestamps: true,
  }
);

export const Slot = model<TSlot>("Slot", slotSchema);
