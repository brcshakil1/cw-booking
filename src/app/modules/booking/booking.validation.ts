import { string, z } from "zod";
import { Vehicles } from "./booking.constant";

const vehicleTypeEnum = z.enum([
  "car",
  "truck",
  "SUV",
  "van",
  "motorcycle",
  "bus",
  "electricVehicle",
  "hybridVehicle",
  "bicycle",
  "tractor",
]);

const createBookingServiceValidationSchema = z.object({
  body: z.object({
    serviceId: z.string(),
    slotId: z.string(),
    vehicleType: vehicleTypeEnum,
    vehicleBrand: z.string(),
    vehicleModel: z.string(),
    manufacturingYear: z.number(),
    registrationPlate: z.string(),
  }),
});

export const BookingValidation = {
  createBookingServiceValidationSchema,
};
