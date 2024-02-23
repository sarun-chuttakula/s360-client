import { CLASSES_API_URLS } from "./api-resource";

export const getClasses = async (token: string) => {
  try {
    const response = await fetch(`${CLASSES_API_URLS}/`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    if (!response.ok) {
      throw new Error("Failed to fetch classes");
    }
    const responseData = await response.json();
    return responseData;
  } catch (error: any) {
    console.error("Error during fetching classes:", error.message);
    throw error;
  }
};

export const getTimeTable = async (token: string, classId: string) => {
  try {
    const response = await fetch(
      `http://192.168.0.109:5001/class/timetable?classId=${classId}`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    if (!response.ok) {
      throw new Error("Failed to fetch timetable data");
    }

    const responseData = await response.json();
    return responseData.data;
  } catch (error: any) {
    console.error("Error during fetching timetable:", error.message);
    throw error;
  }
};
