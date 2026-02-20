import { useState } from "react";
import { SignUpPayload, SignUpResponse } from "@/types";
import signupService from "@/services/auth/signup-service";
import axios from "axios";

export default function useSignup() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const signup = async (payload: SignUpPayload): Promise<SignUpResponse> => {
    setIsLoading(true);
    try {
      const response = await signupService(payload);
      setSuccess(response.message);
      return response;
    } catch (err) {
      const message =
        axios.isAxiosError(err) && err.response?.data?.message
          ? err.response.data.message
          : err instanceof Error
            ? err.message
            : "Failed to signup";
      setError(message);
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  return { isLoading, error, success, signup };
}
