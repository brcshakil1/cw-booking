import { z } from "zod";

const createServiceValidationSchema = z.object({
  body: z.object({
    name: z.string().min(1),
    description: z.string().min(1),
    price: z.number(),
    duration: z.number(),
    isDeleted: z.boolean().default(false),
  }),
});

export const ServiceValidations = {
  createServiceValidationSchema,
};
