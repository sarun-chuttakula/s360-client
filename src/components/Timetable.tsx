import React, { useEffect, useState } from "react";
import { getTimeTable } from "../api"; // Adjust the path as per your file structure

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
      <div>
        {Object.entries(timetableData).map(([day, entries]) => (
          <div key={day}>
            <h3>{day}</h3>
            <ul>
              {entries.map((entry, index) => (
                <li key={index}>
                  {entry.period}: {entry.subject} - {entry.teacher_name}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Timetable;
