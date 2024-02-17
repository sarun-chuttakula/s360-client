import { ApiResponse } from "../interfaces";
import { NOTICE_BOARD_API_URLS } from "./api-resource";

export const SendNotice = async (
  data: any,
  token: string
): Promise<ApiResponse> => {
  try {
    const response = await fetch(NOTICE_BOARD_API_URLS, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      throw new Error("Failed to create notice");
    }

    const responseData = await response.json();

    console.log("Notice created successfully");

    return responseData; // Assuming the response data structure matches ApiResponse
  } catch (error: any) {
    console.error("Error during notice creation:", error.message);
    throw error; // Rethrow the error to be handled by the caller if needed
  }
};

export const GetNotices = async (token: string) => {
  try {
    const response = await fetch(NOTICE_BOARD_API_URLS, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      throw new Error("Failed to fetch notices");
    }
    const responseData = await response.json();
    return responseData;
  } catch (error: any) {
    console.error("Error during fetching notices:", error.message);
    throw error;
  }
};

export const GetNotice = async (noticeId: string, token: string) => {
  try {
    const response = await fetch(`${NOTICE_BOARD_API_URLS}/${noticeId}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      throw new Error("Failed to fetch notice");
    }
    const responseData = await response.json();
    return responseData;
  } catch (error: any) {
    console.error("Error during fetching notice:", error.message);
    throw error;
  }
};

export const UpdateNotice = async (
  noticeId: string,
  data: any,
  token: string
) => {
  try {
    const response = await fetch(`${NOTICE_BOARD_API_URLS}/${noticeId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      throw new Error("Failed to update notice");
    }
    const responseData = await response.json();
    return responseData;
  } catch (error: any) {
    console.error("Error during updating notice:", error.message);
    throw error;
  }
};

export const DeleteNotice = async (noticeId: string, token: string) => {
  try {
    const response = await fetch(
      `${NOTICE_BOARD_API_URLS}/?noticeId=${noticeId}`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );

    if (!response.ok) {
      throw new Error("Failed to delete notice");
    }
    const responseData = await response.json();
    return responseData;
  } catch (error: any) {
    console.error("Error during deleting notice:", error.message);
    throw error;
  }
};
