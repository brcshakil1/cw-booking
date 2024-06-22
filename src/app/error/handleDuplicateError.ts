/* eslint-disable @typescript-eslint/no-explicit-any */

import { TGenericResponse } from "../interface/error.interface";

const handleDuplicateError = (err: any): TGenericResponse => {
  // Extract value within double quotes using regex
  const match = err.message.match(/"([^"]+)"/);

  const extractedMessage = match && match[1];

  const errorMessages = [
    {
      path: "",
      message: extractedMessage,
    },
  ];

  const statusCode = 400;
  return {
    statusCode,
    message: err?.errorResponse?.errmsg
      ? err?.errorResponse?.errmsg
      : "Invalid Email",
    errorMessages,
  };
};

export default handleDuplicateError;
