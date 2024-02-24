import React, { useEffect, useState } from "react";
import NoticeBoard from "./NoticeBoard";
import { getClasses } from "../api";
import useAuth from "../hooks/useAuth";
import Timetable from "../components/Timetable";
import "../styles/classes.css";
const Dashboard = () => {
  const [classes, setClasses] = useState<any[]>([]);
  const [selectedClassId, setSelectedClassId] = useState<string | null>(null);
  const auth = useAuth();

  useEffect(() => {
    const fetchClasses = async () => {
      try {
        const token = auth?.accesstoken as string;
        const response = await getClasses(token);
        setClasses(response.data);
      } catch (error) {
        console.error("Failed to fetch classes:", error);
      }
    };

    fetchClasses();
  }, [auth]);

  const handleClassClick = (classId: string) => {
    setSelectedClassId(classId);
  };

  return (
    <>
      <div className="main">
        <div className="dashboard">
          <h1>Dashboard</h1>
          <p>Welcome to the dashboard</p>
        </div>
        {auth?.role === "teacher" && classes.length > 0 && (
          <div className="classes">
            <h2>Classes</h2>
            <ul>
              {classes.map((classItem) => (
                <li
                  key={classItem.id}
                  onClick={() => handleClassClick(classItem.id)}
                >
                  {classItem.year}yr &nbsp;
                  {classItem.name}
                </li>
              ))}
            </ul>
          </div>
        )}
        <NoticeBoard />
        {selectedClassId && (
          <Timetable
            classId={selectedClassId}
            token={auth?.accesstoken as string}
          />
        )}
      </div>
    </>
  );
};

export default Dashboard;
