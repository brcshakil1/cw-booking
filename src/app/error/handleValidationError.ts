import mongoose from "mongoose";
import { TErrorMessages, TGenericResponse } from "../interface/error.interface";

const handleValidationError = (
  err: mongoose.Error.ValidationError
): TGenericResponse => {
  const errorMessages: TErrorMessages = Object.values(err.errors).map(
    (value: mongoose.Error.ValidatorError | mongoose.Error.CastError) => {
      return {
        path: value?.path,
        message: value?.message,
      };
    }
  );

  const statusCode = 400;

  return {
    statusCode,
    message: "validation error.",
    errorMessages,
  };
};

export default handleValidationError;
