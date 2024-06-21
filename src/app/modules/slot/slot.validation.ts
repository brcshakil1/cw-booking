import { z } from "zod";
import { datePattern } from "./slot.constant";

const timeStringSchema = z.string().refine(
  (time) => {
    const regex = /^([01]?[0-9]|2[0-3]):[0-5][0-9]$/;
    return regex.test(time);
  },
  {
    message: "Invalid time format, Expected HH:MM in 24 hours format.",
  }
);

const createSlotValidationSchema = z.object({
  body: z.object({
    service: z.string(),
    date: z.string().regex(datePattern, "Invalid date format."),
    startTime: timeStringSchema,
    endTime: timeStringSchema,
    isBooked: z.enum(["available", "booked", "canceled"]).default("available"),
  }),
});

export const SlotValidation = {
  createSlotValidationSchema,
};
