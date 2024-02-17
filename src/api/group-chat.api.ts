import { ApiResponse } from "../interfaces";
import { GROUP_API_URLS, MESSAGE_API_URLS } from "./api-resource";
const token =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjUzYWNlOTI3LWE2YjEtNGEzOC04NGMwLWQ0NTAwNzI1N2I3MiIsInJvbGUiOiJ0ZWFjaGVyIiwidXVpZCI6IjRmOWFhNzU3LTU5M2QtNDJjZC05OTRkLWU4NzNmMzliMDU3ZCIsImV4cCI6MTcwOTM5NDk3NiwidHlwZSI6ImFjY2VzcyIsImlhdCI6MTcwODA5ODk3Nn0.kyBnZnIwtUsVbag6n6--Tvw_EE0pXAW_92IaJEmc2QQ";
export const CreateGroup = async (data: any): Promise<ApiResponse> => {
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

    console.log("Group created successfully");

    return responseData; // Assuming the response data structure matches ApiResponse
  } catch (error: any) {
    console.error("Error during group creation:", error.message);
    throw error; // Rethrow the error to be handled by the caller if needed
  }
};

export const GetGroups = async () => {
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

export const GetGroup = async (groupId: string) => {
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

export const UpdateGroup = async (groupId: string, data: any) => {
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

export const DeleteGroup = async (groupId: string) => {
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

export const GetAllMessages = async (groupId: string, page: number) => {
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

export const SendMessage = async (data: any) => {
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
