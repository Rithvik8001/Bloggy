import { z } from "zod";

export const validateEditProfileData = z.object({
  userName: z
    .string()
    .min(6, "Username must be at least 6 characters")
    .max(15, "Username must be at most 15 characters")
    .optional(),
  password: z
    .string()
    .min(8, "Password must be at least 8 characters")
    .regex(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
      {
        message:
          "Password must include uppercase, lowercase, number, and special character",
      },
    )
    .optional(),
});

export type editProfileSchema = z.infer<typeof validateEditProfileData>;

export default function editProfileValidation(payload: unknown) {
  const result = validateEditProfileData.safeParse(payload);
  return result;
}
