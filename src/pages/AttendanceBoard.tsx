import React, { useState, useEffect } from "react";
import { getStudentsAttendance, markAttendance } from "../api/attendance.api";
import useAuth from "../hooks/useAuth";

const AttendanceBoard: React.FC = () => {
  const auth = useAuth();
  const [students, setStudents] = useState<any[]>([]);
  const [attendanceStatus, setAttendanceStatus] = useState<any>({});

  useEffect(() => {
    const fetchStudents = async () => {
      try {
        const response = await getStudentsAttendance(`${auth?.accesstoken}`);
        setStudents(response.data);
        const initialStatus = response.data.reduce((acc: any, student: any) => {
          acc[student.id] = false;
          return acc;
        }, {});
        setAttendanceStatus(initialStatus);
      } catch (error) {
        console.error("Error fetching students:", error);
      }
    };
    fetchStudents();
  }, []);

  const handleMarkAttendance = async () => {
    try {
      const studentsToMarkAttendance = students.map((student) => ({
        attendance: attendanceStatus[student.id] || "ABSENT", // Default to "ABSENT" if no status is set
        ht_no: student.ht_no,
      }));
      await markAttendance(studentsToMarkAttendance, `${auth?.accesstoken}`);
    } catch (error) {
      console.error("Error marking attendance:", error);
    }
  };

  const handleCheckboxChange = (studentId: string) => {
    setAttendanceStatus((prevStatus: any) => ({
      ...prevStatus,
      [studentId]: prevStatus[studentId] === "PRESENT" ? "ABSENT" : "PRESENT",
    }));
  };

  return (
    <div className="attendance-board">
      <h1>Attendance Board</h1>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Email</th>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Mark Attendance</th>
          </tr>
        </thead>
        <tbody>
          {students.map((student) => (
            <tr key={student.id}>
              <td>{student.ht_no}</td>
              <td>{student.email}</td>
              <td>{student.firstname}</td>
              <td>{student.lastname}</td>
              <td>
                <input
                  className="mark-attendance-checkbox"
                  type="checkbox"
                  checked={attendanceStatus[student.id]}
                  placeholder="Mark Attendance"
                  onChange={() => handleCheckboxChange(student.id)}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <button onClick={handleMarkAttendance}>Mark Attendance</button>
    </div>
  );
};

export default AttendanceBoard;
