import { z } from "zod";

export const validateEditBlogData = z.object({
  title: z
    .string()
    .min(1, "Title is required")
    .max(100, "Title must be less than 100 characters")
    .optional(),

  description: z
    .string()
    .min(1, "Description is required")
    .max(1000, "Description must be less than 1000 characters")
    .optional(),
});

export type EditBlogValidationSchema = z.infer<typeof validateEditBlogData>;

export default function editBlogValidation(payload: unknown) {
  const result = validateEditBlogData.safeParse(payload);
  return result;
}
