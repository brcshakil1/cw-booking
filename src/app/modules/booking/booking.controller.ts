import httpStatus from "http-status";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { BookingServices } from "./booking.service";

const createBookService = catchAsync(async (req, res) => {
  const { userEmail } = req.user;
  const result = await BookingServices.createBookServiceIntoDB(
    req.body,
    userEmail
  );
  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "Booking successful!",
    data: result,
  });
});
const getAllBookService = catchAsync(async (req, res) => {
  const result = await BookingServices.getAllBookingServicesFromDB();
  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "All bookings retrieved successfully!",
    data: result,
  });
});

const getMyBookingService = catchAsync(async (req, res) => {
  const { userEmail } = req.user;
  const result = await BookingServices.getMyBookingServiceFromDB(userEmail);
  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "User bookings retrieved successfully",
    data: result,
  });
});

export const BookingControllers = {
  createBookService,
  getAllBookService,
  getMyBookingService,
};
