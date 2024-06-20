import httpStatus from "http-status";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { ServiceServices } from "./service.service";

const createService = catchAsync(async (req, res) => {
  const result = await ServiceServices.createServiceIntoDB(req.body);
  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "Service created successfully!",
    data: result,
  });
});

const getAllServices = catchAsync(async (req, res) => {
  const result = await ServiceServices.getAllServicesFromDB();
  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "All Services retrieved successfully!",
    data: result,
  });
});

const getSingleService = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await ServiceServices.getSingleServiceFromDB(id);
  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "The Service retrieved successfully!",
    data: result,
  });
});

const updateService = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await ServiceServices.updateServiceIntoDB(id, req.body);
  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "The Service updated successfully!",
    data: result,
  });
});

const deleteService = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await ServiceServices.deleteServiceFromDB(id);
  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "The Service deleted successfully!",
    data: result,
  });
});

export const ServiceControllers = {
  createService,
  getAllServices,
  getSingleService,
  updateService,
  deleteService,
};
