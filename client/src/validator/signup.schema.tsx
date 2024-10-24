import { z } from "zod";

export const signUpValidation = z.object({
  name: z.string().min(1),
  email: z
    .string()
    .min(1, { message: "This field has to be filled." })
    .email("This is not a valid email."),
  password: z
    .string()
    .min(8, { message: "Too short" })
    .regex(/[A-Z]/, { message: "Must contain at least one uppercase letter" })
    .regex(/[a-z]/, { message: "Must contain at least one lowercase letter" })
    .regex(/[0-9]/, { message: "Must contain at least one numeric digit" })
    .regex(/[!@#$%^&*]/, {
      message: "Must contain at least one special character",
    }),
});
