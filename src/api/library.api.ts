import { LIBRARY_API_URLS } from "./api-resource";

export const getFolderStructure = async (token: string, path: string) => {
  try {
    const response = await fetch(
      `${LIBRARY_API_URLS}/getdirectories?path=${path}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );
    if (!response.ok) {
      throw new Error("Failed to fetch directory structure");
    }
    const responseData = await response.json();
    return responseData;
  } catch (error: any) {
    console.error("Error fetching directory structure:", error.message);
    throw error;
  }
};
