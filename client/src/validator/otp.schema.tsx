import { z } from "zod";

export const otpValidation = z.object({
  email: z
    .string()
    .min(1, { message: "This field has to be filled." })
    .email("This is not a valid email."),
  otp: z.string().min(6, { message: "Too short" }),
});
