import { ZodError, ZodIssue } from "zod";
import { TErrorMessages, TGenericResponse } from "../interface/error.interface";

const handleZodError = (err: ZodError): TGenericResponse => {
  const errorMessages: TErrorMessages = err.issues.map((issue: ZodIssue) => {
    return {
      path: issue?.path[issue?.path?.length - 1],
      message: issue.message,
    };
  });

  const statusCode = 400;

  const errMsg = err.issues.map(
    (issue) => `${issue.path[1]} ${issue.message} `
  );

  return {
    statusCode,
    message: errMsg[0] || "validation error.",
    errorMessages,
  };
};

export default handleZodError;
