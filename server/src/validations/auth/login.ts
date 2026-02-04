import { z } from "zod";

export const loginValidationData = z
  .object({
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

export type loginValidationSchema = z.infer<typeof loginValidationData>;

export default function loginValidation(payload: unknown) {
  const result = loginValidationData.safeParse(payload);
  return result;
}
