import React, { useState, useEffect } from "react";
import { Group, ApiResponse } from "../interfaces";

const GroupChat = () => {
  const [groups, setGroups] = useState<Group[]>([]);
  const [selectedGroup, setSelectedGroup] = useState<Group | null>(null);
  const [messages, setMessages] = useState<any[]>([]);
  const [messageInput, setMessageInput] = useState("");

  useEffect(() => {
    // Fetch group data from the API
    const token =
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6Ijk0OGM0MTlhLWQ2ODctNDcyNi05YWM4LTIzMWE0MzZjODkyMiIsInJvbGUiOiJ0ZWFjaGVyIiwidXVpZCI6ImRhZjY0ZTk1LWI5OGUtNGZkZS1iNmE2LTQ1MTQwZmExNTlhNiIsImV4cCI6MTcwOTM2MDE5OSwidHlwZSI6ImFjY2VzcyIsImlhdCI6MTcwODA2NDE5OX0.9ej0MSP1xnCvr_rXvZZCUPjWa0ulmOM3uABqrwW_bvE"; // Replace with your JWT token
    fetch("http://localhost:5001/group/", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to fetch group data");
        }
        return response.json();
      })
      .then((data: ApiResponse) => {
        if (data.success) {
          setGroups(data.data);
        } else {
          console.error("Failed to fetch group data:", data.message);
        }
      })
      .catch((error) => {
        console.error("Error fetching group data:", error);
      });
  }, []);

  useEffect(() => {
    if (selectedGroup) {
      // Fetch messages when a group is selected
      const token =
        "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6Ijk0OGM0MTlhLWQ2ODctNDcyNi05YWM4LTIzMWE0MzZjODkyMiIsInJvbGUiOiJ0ZWFjaGVyIiwidXVpZCI6ImRhZjY0ZTk1LWI5OGUtNGZkZS1iNmE2LTQ1MTQwZmExNTlhNiIsImV4cCI6MTcwOTM2MDE5OSwidHlwZSI6ImFjY2VzcyIsImlhdCI6MTcwODA2NDE5OX0.9ej0MSP1xnCvr_rXvZZCUPjWa0ulmOM3uABqrwW_bvE"; // Replace with your JWT token
      fetch(`http://localhost:5001/message/?groupId=${selectedGroup.id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
        .then((response) => {
          if (!response.ok) {
            throw new Error("Failed to fetch messages");
          }
          return response.json();
        })
        .then((data: ApiResponse) => {
          if (data.success) {
            setMessages(data.data);
          } else {
            console.error("Failed to fetch messages:", data.message);
          }
        })
        .catch((error) => {
          console.error("Error fetching messages:", error);
        });
    }
  }, [selectedGroup]);

  const handleGroupClick = (group: Group) => {
    setSelectedGroup(group);
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setMessageInput(event.target.value);
  };

  const handleMessageSend = () => {
    if (messageInput.trim() === "") return; // Prevent sending empty messages

    const token =
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6Ijk0OGM0MTlhLWQ2ODctNDcyNi05YWM4LTIzMWE0MzZjODkyMiIsInJvbGUiOiJ0ZWFjaGVyIiwidXVpZCI6ImRhZjY0ZTk1LWI5OGUtNGZkZS1iNmE2LTQ1MTQwZmExNTlhNiIsImV4cCI6MTcwOTM2MDE5OSwidHlwZSI6ImFjY2VzcyIsImlhdCI6MTcwODA2NDE5OX0.9ej0MSP1xnCvr_rXvZZCUPjWa0ulmOM3uABqrwW_bvE"; // Replace with your JWT token
    fetch("http://localhost:5001/message/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        sender: "message", // Replace with the actual sender value
        receiver: "message", // Replace with the actual receiver value
        message: messageInput,
        group: selectedGroup?.id,
      }),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to send message");
        }
        return response.json();
      })
      .then((data: ApiResponse) => {
        if (data.success) {
          setMessages([...messages, data.data]); // Add the sent message to the messages state
          setMessageInput(""); // Clear the message input field
        } else {
          console.error("Failed to send message:", data.message);
        }
      })
      .catch((error) => {
        console.error("Error sending message:", error);
      });
  };

  return (
    <div className="group-chat">
      {/* Left side content */}
      <div className="group-list">
        <div className="text-xl font-semibold mb-4">Groups</div>
        <ul>
          {groups.map((group) => (
            <li
              key={group.id}
              className={`group-item ${
                selectedGroup && selectedGroup.id === group.id ? "active" : ""
              }`}
              onClick={() => handleGroupClick(group)}
            >
              {group.name}
            </li>
          ))}
        </ul>
      </div>

      {/* Right side group chat */}
      <div className="chat-container">
        {selectedGroup ? (
          <div>
            <h2 className="chat-header">{selectedGroup.name}</h2>
            {/* Display chat messages here */}
            <div className="chat-messages">
              {messages.map((msg, index) => (
                <div key={index}>{msg.message}</div>
              ))}
            </div>
            <div className="chat-input">
              {/* Input field for sending messages */}
              <input
                type="text"
                placeholder="Type your message..."
                value={messageInput}
                onChange={handleInputChange}
              />
              {/* Button to send messages */}
              <button onClick={handleMessageSend}>Send</button>
            </div>
          </div>
        ) : (
          <div className="text-center">Select a group to start chatting</div>
        )}
      </div>
    </div>
  );
};

export default GroupChat;
