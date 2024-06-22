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
  const { date, serviceId } = query;
  const queryData: { date?: string; service?: string } = {};

  if (date) {
    queryData.date = date as string;

    // check if date doesn't exist
    const isSlotDateIsExists = await Slot.findOne({ date: queryData.date });
    if (!isSlotDateIsExists) {
      throw new AppError(
        httpStatus.BAD_REQUEST,
        "There is no slot available to the date"
      );
    }
  }

  if (serviceId) {
    queryData.service = serviceId as string;

    // check if service doesn't exist
    const isServiceExist = await Service.isServiceExistById(queryData.service);
    if (!isServiceExist) {
      throw new AppError(httpStatus.BAD_REQUEST, "Service does not exist");
    }
  }

  const result = await Slot.find(queryData)
    .select({ __v: 0 })
    .populate("service");

  return result;
};

export const SlotServices = {
  createSlotIntoDB,
  getAllSlotsFromDB,
};
