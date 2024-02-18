import { FINANCE_API_URLS } from "./api-resource";
export const getFeeDetails = async (token: string, studentId?: string) => {
  try {
    if (studentId) {
      const response = await fetch(`${FINANCE_API_URLS}/?id=${studentId}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      if (!response.ok) {
        throw new Error("Failed to fetch fee details");
      }
      const responseData = await response.json();
      return responseData;
    } else {
      const response = await fetch(`${FINANCE_API_URLS}/`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      if (!response.ok) {
        throw new Error("Failed to fetch fee details");
      }
      const responseData = await response.json();
      return responseData;
    }
  } catch (error: any) {
    console.error("Error during fetching fee details:", error.message);
    throw error;
  }
};
