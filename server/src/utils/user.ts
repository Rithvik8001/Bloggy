import { User } from "../db/models/user";
import { formatDateDDMMYYYY } from "./date";

export function formatUserDates<T extends Partial<User>>(
  user: T,
): Omit<T, "createdAt" | "updatedAt"> & {
  createdAt: string;
  updatedAt: string;
} {
  return {
    ...user,
    createdAt: user.createdAt ? formatDateDDMMYYYY(user.createdAt) : "",
    updatedAt: user.updatedAt ? formatDateDDMMYYYY(user.updatedAt) : "",
  } as Omit<T, "createdAt" | "updatedAt"> & {
    createdAt: string;
    updatedAt: string;
  };
}
