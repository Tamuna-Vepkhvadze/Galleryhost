import { z } from "zod";
export const registerSchema = z
  .object({
    firstName: z
      .string()
      .min(2, "Name must contain at least 2 letters")
      .regex(/^[ა-ჰa-zA-Z]+$/, "The name must contain only letters."),
    lastName: z
      .string()
      .min(2, "Last name must contain at least 2 letters")
      .regex(/^[ა-ჰa-zA-Z]+$/, "Last name must contain only letters."),
    email: z
      
      .email("Please enter a valid email address."),
    password: z
      .string()
      .min(6, "Password must be at least 6 characters long.")
      .regex(/[A-Z]/, "Password must contain one uppercase letter.")
      .regex(/[0-9]/, "Password must contain one digit."),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match.",
    path: ["confirmPassword"],
  });
export type RegisterData = z.infer<typeof registerSchema>;









