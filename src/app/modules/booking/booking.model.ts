import { Schema, model } from "mongoose";
import { Vehicles } from "./booking.constant";
import { TBooking } from "./booking.interface";

const bookingSchema = new Schema(
  {
    customer: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    service: {
      type: Schema.Types.ObjectId,
      ref: "Service",
      required: true,
    },
    slot: {
      type: Schema.Types.ObjectId,
      ref: "Slot",
      required: true,
    },
    vehicleType: {
      type: String,
      enum: Vehicles,
      required: true,
    },
    vehicleBrand: {
      type: String,
      required: true,
      trim: true,
    },
    vehicleModel: {
      type: String,
      required: true,
      trim: true,
    },
    manufacturingYear: {
      type: Number,
      required: true,
      min: 1886,
    },
    registrationPlate: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
  },
  { timestamps: true }
);

export const Booking = model<TBooking>("Booking", bookingSchema);
