import { z } from "zod";

export const validateSignupData = z
  .object({
    userName: z
      .string()
      .min(6, "Username must be at least 6 characters")
      .max(15, "Username must be at most 15 characters"),
    email: z.email("Invalid email address").trim().toLowerCase(),
    password: z
      .string()
      .min(8, "Password must be at least 8 characters")
      .regex(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
        {
          message:
            "Password must include uppercase, lowercase, number, and special character",
        },
      ),
  })
  .strict();

export type SignupValidationSchema = z.infer<typeof signupValidation>;

export default function signupValidation(payload: unknown) {
  const result = validateSignupData.safeParse(payload);
  return result;
}
