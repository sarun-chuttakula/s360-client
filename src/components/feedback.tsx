import React, { useState } from "react";
import { VscFeedback } from "react-icons/vsc";
import "../styles/feedback-box.css";
import useAuth from "../hooks/useAuth";
const Feedback = () => {
  const [isOpen, setIsOpen] = useState(false);
  const auth = useAuth();
  const token = auth?.accesstoken;
  const [feedback, setFeedback] = useState({
    title: "",
    description: "",
    image: "",
  });
  const [feedbackStatus, setFeedbackStatus] = useState("");

  const handleToggleChatBox = () => {
    setIsOpen(!isOpen);
  };

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setFeedback((prevFeedback) => ({
      ...prevFeedback,
      [name]: value,
    }));
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();

    fetch("http://localhost:5001/feedback/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(feedback),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.success) {
          setFeedbackStatus("Feedback submitted successfully");
          setFeedback({
            title: "",
            description: "",
            image: "",
          });
          setTimeout(() => {
            setIsOpen(false);
          }, 1000);
        } else {
          setFeedbackStatus("Failed to submit feedback");
        }
      })
      .catch((error) => {
        console.error("Error submitting feedback:", error);
        setFeedbackStatus("Failed to submit feedback");
      });
  };

  return (
    <div className="feedback">
      <div className="feedback-icon" onClick={handleToggleChatBox}>
        <VscFeedback />
      </div>

      {isOpen && (
        <div className="chat-box">
          <h2>Feedback</h2>
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              name="title"
              placeholder="Title"
              value={feedback.title}
              onChange={handleChange}
            />
            <textarea
              name="description"
              placeholder="Description"
              value={feedback.description}
              onChange={handleChange}
            ></textarea>
            <input
              type="text"
              name="image"
              placeholder="Image URL"
              value={feedback.image}
              onChange={handleChange}
            />
            <button type="submit">Submit</button>
          </form>
          {feedbackStatus && <p>{feedbackStatus}</p>}
        </div>
      )}
    </div>
  );
};

export default Feedback;
