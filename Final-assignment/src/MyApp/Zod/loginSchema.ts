import { z } from "zod";
export const loginSchema = z.object({
  email: z
    .string()
    .min(1, "Email or password is incorrect.")
    .email("Email or password is incorrect."),
  password: z
    .string()
    .min(1, "Email or password is incorrect."),
});