import { z } from "zod";

export const validateCreateBlogData = z.object({
  title: z
    .string()
    .min(1, "Title is required")
    .max(100, "Title must be less than 100 characters"),
  description: z
    .string()
    .min(1, "Description is required")
    .max(1000, "Description must be less than 1000 characters"),
});

export type CreateBlogValidationSchema = z.infer<typeof validateCreateBlogData>;

export default function createBlogValidation(payload: unknown) {
  const result = validateCreateBlogData.safeParse(payload);
  return result;
}
