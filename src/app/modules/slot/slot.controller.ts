import httpStatus from "http-status";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { SlotServices } from "./slot.service";
import AppError from "../../error/AppError";

const createSlot = catchAsync(async (req, res) => {
  const result = await SlotServices.createSlotIntoDB(req.body);
  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "Slots created successfully",
    data: result,
  });
});

const getAllSlot = catchAsync(async (req, res) => {
  const result = await SlotServices.getAllSlotsFromDB(req.query);

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "Available slots retrieved successfully!",
    data: result,
  });
});

export const SlotsController = {
  createSlot,
  getAllSlot,
};
