import { INewAttendanceRequest } from "../dtos/attendance.dto";
import { ATTENDANCE_API_URLS } from "./api-resource";

export const getStudentsAttendance = async (token: string) => {
  try {
    const response = await fetch(`${ATTENDANCE_API_URLS}/students`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    if (!response.ok) {
      throw new Error("Failed to fetch attendance details");
    }
    const responseData = await response.json();
    return responseData;
  } catch (error: any) {
    console.error("Error during fetching attendance details:", error.message);
    throw error;
  }
};

export const getStudentsbyClass = async (token: string, classId: string) => {
  try {
    const response = await fetch(
      `${ATTENDANCE_API_URLS}/students?classId=${classId}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );
    if (!response.ok) {
      throw new Error("Failed to fetch students by class");
    }
    const responseData = await response.json();
    return responseData;
  } catch (error: any) {
    console.error("Error during fetching students by class:", error.message);
    throw error;
  }
};

export const markAttendance = async (
  markAttendance: INewAttendanceRequest[],
  token: string
) => {
  try {
    const transformedPayload = markAttendance.map((student) => ({
      attendance: student.attendance,
      ht_no: student.ht_no,
    }));
    const response = await fetch(`${ATTENDANCE_API_URLS}/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(transformedPayload),
    });
    //console.log(JSON.stringify({ transformedPayload }));
    if (!response.ok) {
      throw new Error("Failed to mark attendance");
    }
    const responseData = await response.json();
    return responseData;
  } catch (error: any) {
    console.error("Error during marking attendance:", error.message);
    throw error;
  }
};
