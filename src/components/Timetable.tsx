import React, { useEffect, useState } from "react";

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
        const response = await fetch(
          `http://localhost:5001/class/timetable?classId=${classId}`,
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
        setTimetableData(responseData.data);
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
