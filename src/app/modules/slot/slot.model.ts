import { Schema, model } from "mongoose";
import { TSlot } from "./slot.interface";

const slotSchema = new Schema({
  service: {
    type: Schema.Types.ObjectId,
    ref: "Service",
    required: true,
  },
  date: {
    type: Date,
    required: true,
  },
  startTime: {
    type: String,
    required: true,
    validate: {
      validator: function (v: any) {
        return /\d{2}:\d{2}/.test(v);
      },
      message: (props: any) =>
        `${props.value} is not a valid start time format! It should be HH:mm.`,
    },
  },
  endTime: {
    type: String,
    required: true,
    validate: {
      validator: function (v: any) {
        return /\d{2}:\d{2}/.test(v);
      },
      message: (props: any) =>
        `${props.value} is not a valid end time format! It should be HH:mm.`,
    },
  },
  isBooked: {
    type: String,
    enum: ["available", "booked", "canceled"],
    default: "available",
  },
});

export const Slot = model<TSlot>("Slot", slotSchema);
