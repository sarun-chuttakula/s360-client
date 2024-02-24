import React, { useEffect, useState } from "react";
import { getTimeTable } from "../api";
import "../styles/classes.css";

interface TimetableProps {
  classId: string;
  token: string;
}

interface TimetableData {
  [day: string]: {
    period: string;
    subject: string;
    teacher_id: string;
    teacher_name: string;
  }[];
}

const Timetable: React.FC<TimetableProps> = ({ classId, token }) => {
  const [timetableData, setTimetableData] = useState<TimetableData>({});
  const [error, setError] = useState<string | null>(null);
  const days = Object.keys(timetableData); // Dynamically get days from timetable data

  useEffect(() => {
    const fetchTimetable = async () => {
      try {
        const data = await getTimeTable(token, classId);
        setTimetableData(data);
      } catch (error: any) {
        setError(error.message);
      }
    };

    fetchTimetable();
  }, [classId, token]);

  return (
    <div className="timetable">
      <h2>Timetable</h2>
      {error && <div>Error: {error}</div>}
      <table>
        <thead>
          <tr>
            {days.map((day, index) => (
              <th key={index}>{day}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          <tr>
            {days.map((day, index) => (
              <td key={index}>
                <ul>
                  {timetableData[day]?.map((entry, i) => (
                    <li key={i}>
                      <strong>{entry.period}:</strong> {entry.subject} -{" "}
                      {entry.teacher_name}
                    </li>
                  ))}
                </ul>
              </td>
            ))}
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default Timetable;
