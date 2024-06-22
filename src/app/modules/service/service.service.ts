import httpStatus from "http-status";
import AppError from "../../error/AppError";
import { TService } from "./service.interface";
import { Service } from "./service.model";

const createServiceIntoDB = async (payload: TService) => {
  const result = await Service.create(payload);
  return result;
};

const getAllServicesFromDB = async () => {
  const result = await Service.find();
  return result;
};

const getSingleServiceFromDB = async (id: string) => {
  // check is service is exist
  const service = await Service.isServiceExistById(id);
  if (!service) {
    throw new AppError(httpStatus.NOT_FOUND, "Not found the service!");
  }

  const result = await Service.findById(id);
  return result;
};

const updateServiceIntoDB = async (id: string, payload: Partial<TService>) => {
  // check is service is exist
  const service = await Service.isServiceExistById(id);
  if (!service) {
    throw new AppError(httpStatus.NOT_FOUND, "Not found the service!");
  }
  const result = await Service.findByIdAndUpdate(id, payload, {
    new: true,
    runValidators: true,
  });
  console.log(payload);
  return result;
};

const deleteServiceFromDB = async (id: string) => {
  // check is service is exist
  const service = await Service.isServiceExistById(id);
  if (!service) {
    throw new AppError(httpStatus.NOT_FOUND, "Not found the service!");
  }

  const result = await Service.findByIdAndUpdate(
    id,
    { isDeleted: true },
    { new: true }
  );
  return result;
};

export const ServiceServices = {
  createServiceIntoDB,
  getAllServicesFromDB,
  getSingleServiceFromDB,
  updateServiceIntoDB,
  deleteServiceFromDB,
};
