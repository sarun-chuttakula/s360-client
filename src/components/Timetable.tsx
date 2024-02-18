import React, { useEffect, useState } from "react";
import { getTimeTable } from "../api";

interface TimetableProps {
  classId: string;
  token: string;
}

export interface TimeTableEntry {
  id: string;
  day: string;
  time: string;
  subject: string;
}

const Timetable: React.FC<TimetableProps> = ({ classId, token }) => {
  const [timetable, setTimetable] = useState<TimeTableEntry[] | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchTimetable = async () => {
      try {
        const timetableData = await getTimeTable(token, classId);
        console.log("Timetable Data:", timetableData.data);

        const flattenedTimetable = Object.entries<any[]>(
          timetableData.data
        ).flatMap(([day, entries]) =>
          entries.map((entry: any) => ({
            id: entry.id,
            day,
            time: entry.time,
            subject: entry.subject,
          }))
        );

        if (Array.isArray(flattenedTimetable)) {
          setTimetable(flattenedTimetable);
        } else {
          setError("Timetable data is not in the expected format");
        }
      } catch (error) {
        setError("Failed to fetch timetable");
      }
    };

    fetchTimetable();
  }, [classId, token]);

  return (
    <div className="timetable">
      <h2>Timetable</h2>
      {error && <div>Error: {error}</div>}
      {/* {timetable ? (
        <div>
          {timetable ? (
            <div>
              {Object.entries(
                timetable.reduce((acc, entry) => {
                  if (!acc[entry.day]) {
                    acc[entry.day] = [];
                  }
                  acc[entry.day].push(
                    <li key={entry.id}>
                      {entry.time}: {entry.subject}
                    </li>
                  );
                  return acc;
                }, {} as { [key: string]: JSX.Element[] })
              ).map(([day, entries]) => (
                <div key={day}>
                  <h3>{day}</h3>
                  <ul>{entries}</ul>
                </div>
              ))}
            </div>
          ) : (
            <div>Loading timetable...</div>
          )}
        </div>
      ) : (
        <div>Loading timetable...</div>
      )} */}
      <h1>trying</h1>
    </div>
  );
};

export default Timetable;
