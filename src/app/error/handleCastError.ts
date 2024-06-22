import mongoose from "mongoose";
import { TErrorMessages, TGenericResponse } from "../interface/error.interface";

const handleCastError = (err: mongoose.Error.CastError): TGenericResponse => {
  const errorMessages: TErrorMessages = [
    {
      path: err?.path,
      message: err?.message,
    },
  ];

  const statusCode = 400;
  return {
    statusCode,
    message: err?.message ? err?.message : "Cast Error",
    errorMessages,
  };
};

export default handleCastError;
