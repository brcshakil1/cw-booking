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
const updateServiceValidationSchema = z.object({
  body: z.object({
    name: z.string().min(1).optional(),
    description: z.string().min(1).optional(),
    price: z.number().optional(),
    duration: z.number().optional(),
    isDeleted: z.boolean().default(false).optional(),
  }),
});

export const ServiceValidations = {
  createServiceValidationSchema,
  updateServiceValidationSchema,
};
