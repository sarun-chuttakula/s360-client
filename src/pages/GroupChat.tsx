import React, { useState, useEffect, useRef } from "react";
import { Group, ApiResponse } from "../interfaces";
import GroupForm, { GroupData } from "../components/GroupForm/GroupForm";
import { AiOutlinePlusCircle } from "react-icons/ai";
import { IoSend } from "react-icons/io5";

const GroupChat = () => {
  const [groups, setGroups] = useState<Group[]>([]);
  const [selectedGroup, setSelectedGroup] = useState<Group | null>(null);
  const [messages, setMessages] = useState<any[]>([]);
  const [messageInput, setMessageInput] = useState("");
  const [currentPage, setCurrentPage] = useState(1); // State for current page
  const [reachedFirstMessage, setReachedFirstMessage] = useState(false);
  const chatContainerRef = useRef<HTMLDivElement>(null);
  const [userRole, setUserRole] = useState<string | null>(null);
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    // Fetch group data from the API
    const token =
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjUzYWNlOTI3LWE2YjEtNGEzOC04NGMwLWQ0NTAwNzI1N2I3MiIsInJvbGUiOiJ0ZWFjaGVyIiwidXVpZCI6IjVjYjVhMTY4LTY4ZmUtNDZmNi1hYjRjLWQyOWViODQyMmQyZSIsImV4cCI6MTcwOTM4MjQwMSwidHlwZSI6ImFjY2VzcyIsImlhdCI6MTcwODA4NjQwMX0.xU1cDi6qkCjxOgXZw-I2qQ8Izh3B64HSkeo785JXOEE";
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
    const decodedToken: any = decodeJwtToken(token);
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

  useEffect(() => {
    if (selectedGroup) {
      // Fetch messages when a group is selected
      const token =
        "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjUzYWNlOTI3LWE2YjEtNGEzOC04NGMwLWQ0NTAwNzI1N2I3MiIsInJvbGUiOiJ0ZWFjaGVyIiwidXVpZCI6IjVjYjVhMTY4LTY4ZmUtNDZmNi1hYjRjLWQyOWViODQyMmQyZSIsImV4cCI6MTcwOTM4MjQwMSwidHlwZSI6ImFjY2VzcyIsImlhdCI6MTcwODA4NjQwMX0.xU1cDi6qkCjxOgXZw-I2qQ8Izh3B64HSkeo785JXOEE";
      fetchMessages(selectedGroup.id, token, currentPage); // Pass currentPage to fetchMessages
    }
  }, [selectedGroup, currentPage]); // Include currentPage in the dependency array

  useEffect(() => {
    // Listen for scroll events on the chat container
    const handleScroll = () => {
      if (
        chatContainerRef.current &&
        chatContainerRef.current.scrollTop === 0 &&
        !reachedFirstMessage
      ) {
        // If scrolled to the top and not yet reached the first message
        fetchPreviousMessages();
      }
    };

    if (chatContainerRef.current) {
      chatContainerRef.current.addEventListener("scroll", handleScroll);
    }

    return () => {
      if (chatContainerRef.current) {
        chatContainerRef.current.removeEventListener("scroll", handleScroll);
      }
    };
  }, [reachedFirstMessage]); // Listen for changes in reachedFirstMessage state

  const fetchMessages = (groupId: string, token: string, page: number) => {
    fetch(`http://localhost:5001/message/?groupId=${groupId}&page=${page}`, {
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
          // Append new messages if scrolling down, prepend if scrolling up
          if (currentPage === 1) {
            setMessages(data.data);
          } else {
            setMessages([...data.data, ...messages]);
          }
        } else {
          console.error("Failed to fetch messages:", data.message);
        }
      })
      .catch((error) => {
        console.error("Error fetching messages:", error);
      });
  };

  const fetchPreviousMessages = () => {
    // Fetch previous messages when scrolled to the top
    if (selectedGroup && currentPage > 1) {
      setCurrentPage(currentPage - 1);
    } else {
      setReachedFirstMessage(true);
    }
  };

  const handleGroupClick = (group: Group) => {
    setSelectedGroup(group);
    setCurrentPage(1); // Reset currentPage when a new group is selected
    setReachedFirstMessage(false); // Reset reachedFirstMessage state
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setMessageInput(event.target.value);
  };

  const handleMessageSend = () => {
    if (messageInput.trim() === "") return; // Prevent sending empty messages
    sendMessage();
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      event.preventDefault(); // Prevent default form submission behavior
      sendMessage();
    }
  };

  const sendMessage = () => {
    const token =
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjUzYWNlOTI3LWE2YjEtNGEzOC04NGMwLWQ0NTAwNzI1N2I3MiIsInJvbGUiOiJ0ZWFjaGVyIiwidXVpZCI6IjVjYjVhMTY4LTY4ZmUtNDZmNi1hYjRjLWQyOWViODQyMmQyZSIsImV4cCI6MTcwOTM4MjQwMSwidHlwZSI6ImFjY2VzcyIsImlhdCI6MTcwODA4NjQwMX0.xU1cDi6qkCjxOgXZw-I2qQ8Izh3B64HSkeo785JXOEE";
    fetch("http://localhost:5001/message/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        sender: "message",
        receiver: "message",
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
          setMessages([...messages, data.data]);
          setMessageInput("");
        } else {
          console.error("Failed to send message:", data.message);
        }
      })
      .catch((error) => {
        console.error("Error sending message:", error);
      });
  };
  const handleAddGroup = (groupData: GroupData) => {
    // Your logic for adding the group
    console.log("Adding group:", groupData);
    setShowForm(false);
  };

  return (
    <div className="group-chat">
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
        {/* Render "Add Group" button for teachers and admins */}
        {/* {(userRole === "teacher" || userRole === "admin") && (
          <button onClick={handleAddGroup}>Add Group</button>
        )} */}
      </div>

      <div className="chat-container" ref={chatContainerRef}>
        {selectedGroup ? (
          <div>
            <h2 className="chat-header">{selectedGroup.name}</h2>
            <div className="chat-messages">
              {messages.map((msg, index) => (
                <div key={index}>{msg.message}</div>
              ))}
            </div>
            <div className="chat-input">
              <input
                type="text"
                placeholder="Type your message..."
                value={messageInput}
                onChange={handleInputChange}
                onKeyDown={handleKeyDown}
              />
              {/* <button onClick={handleMessageSend}>Send</button> */}
              <IoSend
                className="send-icon"
                size={30}
                onClick={handleMessageSend}
              />
            </div>
          </div>
        ) : (
          <div className="text-center">Select a group to start chatting</div>
        )}
      </div>
      <div className="add-group">
        {showForm ? (
          <GroupForm onAddGroup={handleAddGroup} />
        ) : (
          <AiOutlinePlusCircle
            className="add-group-icon"
            size={30}
            onClick={() => setShowForm(true)}
          />
        )}
      </div>
    </div>
  );
};

export default GroupChat;
