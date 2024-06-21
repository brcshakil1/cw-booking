import httpStatus from "http-status";
import AppError from "../../error/AppError";
import { Service } from "../service/service.model";
import { TSlot } from "./slot.interface";
import { Slot } from "./slot.model";

const createSlotIntoDB = async (payload: TSlot) => {
  // check if service is exists
  const service = await Service.isServiceExistById(payload.service);
  if (!service) {
    throw new AppError(httpStatus.NOT_FOUND, "Service not found.");
  }

  // check if the service is already deleted
  const isServiceDeleted = service?.isDeleted;
  if (isServiceDeleted) {
    throw new AppError(httpStatus.NOT_FOUND, "This service is already deleted");
  }

  // check if the start time is greater than the end time
  const startTimeConvertIntoArray = payload?.startTime.split(":");
  const endTimeConvertIntoArray = payload?.endTime.split(":");

  const startTimeHours =
    Number(startTimeConvertIntoArray[0]) +
    Number(startTimeConvertIntoArray[1]) / 60;

  const endTimeHours =
    Number(endTimeConvertIntoArray[0]) +
    Number(endTimeConvertIntoArray[1]) / 60;

  if (startTimeHours >= endTimeHours) {
    throw new AppError(
      httpStatus.BAD_REQUEST,
      "Start time cannot be greater than end time."
    );
  }

  // add all slots on the date in database
  const startTimeHoursToMinutes = Math.round(startTimeHours * 60);
  const endTimeHoursToMinutes = Math.round(endTimeHours * 60);
  const startAndEndTimeDuration =
    endTimeHoursToMinutes - startTimeHoursToMinutes;

  const serviceDuration = service?.duration;

  const numberOfSlots = startAndEndTimeDuration / serviceDuration;

  let allSlots = [];
  for (let i = 0; i < numberOfSlots; i++) {
    let newPayload = { ...payload };
    newPayload.startTime = `${startTimeHours + i}:00`;
    newPayload.endTime = `${startTimeHours + (i + 1)}:00`;
    allSlots.push(newPayload);
  }

  const result = await Slot.insertMany(allSlots);
  // const populateResult = await Slot.populate(result, { path: "service" });
  return result;
};

const getAllSlotsFromDB = async (query: Record<string, unknown>) => {
  let date = {};
  let service = {};
  if (query.date) {
    date = query.date;
  }
  if (query.date) {
    date = query.date;
  }
  if (query.serviceId) {
    service = query.serviceId;
  }

  const result = await Slot.find({ date, service })
    .select({ __v: 0 })
    .populate("service");
  return result;
};

const getSingleSlotFromDB = async (id: string) => {
  const result = await Slot.findById(id);
  return result;
};

const updateSlotIntoDB = async (id: string, payload: Partial<TSlot>) => {
  const result = await Slot.findByIdAndUpdate(id, payload, {
    new: true,
    runValidators: true,
  });
  return result;
};

const deleteSlotFromDB = async (id: string) => {
  const result = await Slot.findByIdAndUpdate(
    id,
    { isDeleted: true },
    { new: true }
  );
  return result;
};

export const SlotServices = {
  createSlotIntoDB,
  getAllSlotsFromDB,
  getSingleSlotFromDB,
  deleteSlotFromDB,
};
