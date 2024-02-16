import React, { useState, useEffect } from "react";

interface Notice {
  id: string;
  title: string;
  description: string;
  image: string | null;
}

const NoticeBoard: React.FC = () => {
  const [notices, setNotices] = useState<Notice[]>([]);

  useEffect(() => {
    fetch("http://localhost:5001/noticeBoard/", {
      method: "GET",
      headers: {
        Authorization:
          "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6Ijk0OGM0MTlhLWQ2ODctNDcyNi05YWM4LTIzMWE0MzZjODkyMiIsInJvbGUiOiJ0ZWFjaGVyIiwidXVpZCI6IjA2MzYxNDcxLWIyNzEtNGU3Yy05YWFmLWE0MWRlMzI0NGI2ZSIsImV4cCI6MTcwOTM1MDIzMSwidHlwZSI6ImFjY2VzcyIsImlhdCI6MTcwODA1NDIzMX0.qhFym3whCKLhiotT7ruRLWM1VIDy0xM-STJrA9Zkxxs",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        setNotices(data.data);
      })
      .catch((error) => console.error("Error fetching data:", error));
  }, []);

  return (
    <div className="notice-board">
      <h1>Notice Board</h1>
      <p>Welcome to the Notice Board</p>
      <ul className="notice-list">
        {notices.map((notice) => (
          <li key={notice.id} className="notice-item">
            <h2 className="notice-title">{notice.title}</h2>
            <p className="notice-description">{notice.description}</p>
            {notice.image && (
              <img src={notice.image} alt="Notice" className="notice-image" />
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default NoticeBoard;
