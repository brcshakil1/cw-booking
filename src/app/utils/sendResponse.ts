import { Response } from "express";

type TResponse<T> = {
  success: boolean;
  statusCode: number;
  token?: string;
  message?: string;
  data: T;
};

const sendResponse = <T>(res: Response, data: TResponse<T>) => {
  res.status(data.statusCode).json({
    success: data?.success,
    statusCode: data?.statusCode,
    message: data?.message,
    token: data?.token,
    data: data?.data,
  });
};

export default sendResponse;
