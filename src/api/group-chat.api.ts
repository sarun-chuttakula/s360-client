import { ApiResponse } from "../dtos";
import { GROUP_API_URLS, MESSAGE_API_URLS } from "./api-resource";

export const CreateGroup = async (
  token: string,
  data: any
): Promise<ApiResponse> => {
  try {
    const response = await fetch(GROUP_API_URLS, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      throw new Error("Failed to create group");
    }

    const responseData = await response.json();

    //console.log("Group created successfully");

    return responseData; // Assuming the response data structure matches ApiResponse
  } catch (error: any) {
    console.error("Error during group creation:", error.message);
    throw error; // Rethrow the error to be handled by the caller if needed
  }
};

export const GetGroups = async (token: string) => {
  try {
    const response = await fetch(GROUP_API_URLS, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      throw new Error("Failed to fetch groups");
    }
    const responseData = await response.json();
    return responseData;
  } catch (error: any) {
    console.error("Error during fetching groups:", error.message);
    throw error;
  }
};

export const GetGroup = async (token: string, groupId: string) => {
  try {
    const response = await fetch(`${GROUP_API_URLS}/${groupId}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      throw new Error("Failed to fetch group");
    }
    const responseData = await response.json();
    return responseData;
  } catch (error: any) {
    console.error("Error during fetching group:", error.message);
    throw error;
  }
};

export const UpdateGroup = async (
  token: string,
  groupId: string,
  data: any
) => {
  try {
    const response = await fetch(`${GROUP_API_URLS}/${groupId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      throw new Error("Failed to update group");
    }
    const responseData = await response.json();
    return responseData;
  } catch (error: any) {
    console.error("Error during updating group:", error.message);
    throw error;
  }
};

export const DeleteGroup = async (token: string, groupId: string) => {
  try {
    const response = await fetch(`${GROUP_API_URLS}/?groupId=${groupId}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      throw new Error("Failed to delete group");
    }
    const responseData = await response.json();
    return responseData;
  } catch (error: any) {
    console.error("Error during deleting group:", error.message);
    throw error;
  }
};

export const GetAllMessages = async (
  token: string,
  groupId: string,
  page: number
) => {
  try {
    const response = await fetch(
      `${MESSAGE_API_URLS}/?groupId=${groupId}&page=${page}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );

    if (!response.ok) {
      throw new Error("Failed to fetch messages");
    }
    const responseData = await response.json();
    return responseData;
  } catch (error: any) {
    console.error("Error during fetching messages:", error.message);
    throw error;
  }
};

export const SendMessage = async (token: string, data: any) => {
  try {
    const response = await fetch(MESSAGE_API_URLS, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      throw new Error("Failed to send message");
    }
    const responseData = await response.json();
    return responseData;
  } catch (error: any) {
    console.error("Error during sending message:", error.message);
    throw error;
  }
};
