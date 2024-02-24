import { ApiResponse } from "../dtos/response.dto";
import { AUTH_API_URLS } from "./api-resource";

export const Register = async (data: any): Promise<ApiResponse> => {
  try {
    const response = await fetch(AUTH_API_URLS.SignUp, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      throw new Error("Failed to register user");
    }

    const responseData = await response.json();

    console.log("User registered successfully");

    return responseData; // Assuming the response data structure matches ApiResponse
  } catch (error: any) {
    console.error("Error during registration:", error.message);
    throw error; // Rethrow the error to be handled by the caller if needed
  }
};

export const Login = async (data: any) => {
  try {
    const response = await fetch(AUTH_API_URLS.Login, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      throw new Error("Failed to login user");
    }
    const responseData = await response.json();
    return responseData;
  } catch (error: any) {
    console.error("Error during login:", error.message);
    throw error;
  }
};
