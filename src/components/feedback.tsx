import React, { useState } from "react";
import { VscFeedback } from "react-icons/vsc";
import "../styles/feedback-box.css";
const Feedback = () => {
  const [isOpen, setIsOpen] = useState(false);
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
        Authorization:
          "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjUzYWNlOTI3LWE2YjEtNGEzOC04NGMwLWQ0NTAwNzI1N2I3MiIsInJvbGUiOiJ0ZWFjaGVyIiwidXVpZCI6IjVjYjVhMTY4LTY4ZmUtNDZmNi1hYjRjLWQyOWViODQyMmQyZSIsImV4cCI6MTcwOTM4MjQwMSwidHlwZSI6ImFjY2VzcyIsImlhdCI6MTcwODA4NjQwMX0.xU1cDi6qkCjxOgXZw-I2qQ8Izh3B64HSkeo785JXOEE",
      },
      body: JSON.stringify(feedback),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.success) {
          setFeedbackStatus("Feedback submitted successfully");
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
