import React, { useState, useEffect } from "react";
import { MdDelete } from "react-icons/md";
import { DeleteNotice, GetNotices } from "../api/notice-board.api";
import { ApiResponse } from "../dtos";
import useAuth from "../hooks/useAuth";
import "../styles/notice-board.css";
interface Notice {
  id: string;
  title: string;
  description: string;
  image: string | null;
}

const NoticeBoard: React.FC = () => {
  const auth = useAuth();
  const [notices, setNotices] = useState<Notice[]>([]);
  const [showForm, setShowForm] = useState(false); // State to control the visibility of the form
  const [userRole, setUserRole] = useState<string | null>(null);

  useEffect(() => {
    fetchNotices();
    const decodedToken: any = decodeJwtToken(auth?.accesstoken as string);
    if (decodedToken) {
      setUserRole(decodedToken.role);
    }
  }, []);

  const decodeJwtToken = (token: string) => {
    try {
      const decodedToken = JSON.parse(atob(token.split(".")[1]));
      return decodedToken;
    } catch (error) {
      console.error("Error decoding JWT token:", error);
      return null;
    }
  };

  const fetchNotices = () => {
    GetNotices(auth?.accesstoken as string)
      .then((data) => {
        setNotices(data.data);
      })
      .catch((error) => console.error("Error fetching data:", error));
  };

  const handleFormSubmit = (formData: {
    title: string;
    description: string;
  }) => {
    fetch("http://localhost:5001/noticeBoard/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${auth?.accesstoken}` as string,
      },
      body: JSON.stringify(formData),
    })
      .then((response) => response.json())
      .then((data) => {
        // Optionally, you can update the notices list after adding a new notice
        fetchNotices();
        setShowForm(false); // Hide the form after submission
      })
      .catch((error) => console.error("Error sending data:", error));
  };

  const handleNewNoticeClick = () => {
    setShowForm(!showForm); // Toggle the visibility of the form
  };

  const handleDeleteNotice = (noticeId: string) => {
    DeleteNotice(noticeId, auth?.accesstoken as string)
      .then((data: ApiResponse) => {
        if (data.success) {
          console.log("Notice deleted successfully:", data.data);
          // Fetch updated notice list after deleting the notice
          fetchNotices();
        } else {
          console.error("Failed to delete notice:", data.message);
        }
      })
      .catch((error) => {
        console.error("Error deleting notice:", error);
      });
  };

  if (notices.length === 0 && userRole !== "teacher" && userRole !== "admin") {
    return null;
  }

  return (
    <div className="notice-board">
      <h1>Notice Board</h1>
      {/* <p>Welcome to the Notice Board</p> */}
      {userRole === "teacher" || userRole === "admin" ? (
        <div className="notice-actions">
          <button
            onClick={handleNewNoticeClick}
            className="add-notice-button"
            title="Add Notice"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="feather feather-plus"
            >
              <line x1="12" y1="5" x2="12" y2="19"></line>
              <line x1="5" y1="12" x2="19" y2="12"></line>
            </svg>
          </button>
        </div>
      ) : null}
      {showForm ? (
        <NoticeForm onSubmit={handleFormSubmit} />
      ) : (
        <ul className="notice-list">
          {notices.map((notice) => (
            <li key={notice.id} className="notice-item">
              <h2 className="notice-title">{notice.title}</h2>
              <p className="notice-description">{notice.description}</p>
              {notice.image && (
                <img src={notice.image} alt="Notice" className="notice-image" />
              )}
              {userRole === "teacher" || userRole === "admin" ? (
                <MdDelete
                  className="delete-notice"
                  size={20}
                  onClick={() => handleDeleteNotice(notice.id)}
                />
              ) : null}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

interface NoticeFormProps {
  onSubmit: (formData: { title: string; description: string }) => void;
}

const NoticeForm: React.FC<NoticeFormProps> = ({ onSubmit }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({ title, description });
  };

  return (
    <form onSubmit={handleSubmit} className="notice-form">
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Enter title"
        required
      />
      <textarea
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        placeholder="Enter description"
        required
      ></textarea>
      <button type="submit">Submit</button>
    </form>
  );
};

export default NoticeBoard;
