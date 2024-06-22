import httpStatus from "http-status";
import { Service } from "../service/service.model";
import { User } from "../user/user.model";
import { TBooking } from "./booking.interface";
import { Booking } from "./booking.model";
import AppError from "../../error/AppError";
import { Slot } from "../slot/slot.model";
import { Types } from "mongoose";

const createBookServiceIntoDB = async (
  payload: Omit<TBooking, "customer" | "service" | "slot"> & {
    serviceId: string;
    slotId: string;
  },
  userEmail: string
) => {
  const {
    serviceId,
    slotId,
    vehicleType,
    vehicleBrand,
    vehicleModel,
    manufacturingYear,
    registrationPlate,
  } = payload;

  const user = await User.findOne({ email: userEmail }).select({ _id: 1 });
  const userId = user?._id.toString();

  // check if service is exist
  const isServiceExists = await Service.isServiceExistById(serviceId);
  if (!isServiceExists) {
    throw new AppError(httpStatus.NOT_FOUND, "This service is not found.");
  }

  // check if slot is exists
  const isSlotExists = await Slot.findOne({
    _id: slotId.toString(),
    service: serviceId.toString(),
  });
  if (!isSlotExists) {
    throw new AppError(
      httpStatus.NOT_FOUND,
      "This service's slot is not found."
    );
  }

  // Update slot to booked
  await Slot.findByIdAndUpdate(
    slotId,
    { isBooked: "booked" },
    { new: true, runValidators: true }
  );

  const newBooking = {
    customer: userId,
    service: new Types.ObjectId(serviceId),
    slot: new Types.ObjectId(slotId),
    vehicleType,
    vehicleBrand,
    vehicleModel,
    manufacturingYear,
    registrationPlate,
  };

  console.log(newBooking);

  const booking = await Booking.create(newBooking);
  const populateBooking = await booking.populate("customer service slot");

  return populateBooking;
};

const getAllBookingServicesFromDB = async () => {
  const result = await Booking.find()
    .populate("customer")
    .populate("service")
    .populate("slot");
  return result;
};

const getMyBookingServiceFromDB = async (email: string) => {
  // getting customer id
  const user = await User.findOne({ email }).select({ _id: 1 });
  const userId = user?._id.toString();

  const result = await Booking.findOne({ customer: userId }).populate(
    "customer service slot"
  );
  return result;
};

export const BookingServices = {
  createBookServiceIntoDB,
  getAllBookingServicesFromDB,
  getMyBookingServiceFromDB,
};
