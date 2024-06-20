import { z } from "zod";

const userLoginSchema = z.object({
  body: z.object({
    email: z.string({ required_error: "Please enter your email." }),
    password: z.string({ required_error: "Please enter your password." }),
  }),
});

export const AuthValidation = {
  userLoginSchema,
};
