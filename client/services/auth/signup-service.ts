import axios from "axios";
import { SERVER_URL } from "@/lib/constants";
import { SignUpPayload, SignUpResponse } from "@/types";

const signupService = async (
  payload: SignUpPayload,
): Promise<SignUpResponse> => {
  try {
    // axios request consists of 3 arguments: url, data, config
    // url: server url + endpoint
    // data: payload
    // config: headers and withCredentials and other options like timeout, etc.
    // withCredentials: true is required to send cookies with the request, which is necessary for session management

    const { data } = await axios.post(
      `${SERVER_URL}/api/v1/auth/signup`,
      payload,
      {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      },
    );
    return data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(error.response?.data.message || "Failed to signup");
    }
    throw new Error("Failed to signup");
  }
};

export default signupService;
