import { z } from "zod";

const CreateUserValidationSchema = z.object({
  body: z.object({
    name: z.string().min(1),
    email: z.string().min(1),
    password: z.string().min(1),
    phone: z.string().min(1),
    role: z.enum(["admin", "user"]),
    address: z.string().min(1),
  }),
});

export const UserValidation = {
  CreateUserValidationSchema,
};
