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
  const [currentPage, setCurrentPage] = useState(1);
  const [reachedFirstMessage, setReachedFirstMessage] = useState(false);
  const chatContainerRef = useRef<HTMLDivElement>(null);
  const [userRole, setUserRole] = useState<string | null>(null);
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    const token =
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjUzYWNlOTI3LWE2YjEtNGEzOC04NGMwLWQ0NTAwNzI1N2I3MiIsInJvbGUiOiJ0ZWFjaGVyIiwidXVpZCI6IjRmOWFhNzU3LTU5M2QtNDJjZC05OTRkLWU4NzNmMzliMDU3ZCIsImV4cCI6MTcwOTM5NDk3NiwidHlwZSI6ImFjY2VzcyIsImlhdCI6MTcwODA5ODk3Nn0.kyBnZnIwtUsVbag6n6--Tvw_EE0pXAW_92IaJEmc2QQ";
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
      const token =
        "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjUzYWNlOTI3LWE2YjEtNGEzOC04NGMwLWQ0NTAwNzI1N2I3MiIsInJvbGUiOiJ0ZWFjaGVyIiwidXVpZCI6IjRmOWFhNzU3LTU5M2QtNDJjZC05OTRkLWU4NzNmMzliMDU3ZCIsImV4cCI6MTcwOTM5NDk3NiwidHlwZSI6ImFjY2VzcyIsImlhdCI6MTcwODA5ODk3Nn0.kyBnZnIwtUsVbag6n6--Tvw_EE0pXAW_92IaJEmc2QQ";
      fetchMessages(selectedGroup.id, token, currentPage);
    }
  }, [selectedGroup, currentPage]);

  useEffect(() => {
    const handleScroll = () => {
      if (
        chatContainerRef.current &&
        chatContainerRef.current.scrollTop === 0 &&
        !reachedFirstMessage
      ) {
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
  }, [reachedFirstMessage]);

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
    if (selectedGroup && currentPage > 1) {
      setCurrentPage(currentPage - 1);
    } else {
      setReachedFirstMessage(true);
    }
  };

  const handleGroupClick = (group: Group) => {
    setSelectedGroup(group);
    setCurrentPage(1);
    setReachedFirstMessage(false);
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setMessageInput(event.target.value);
  };

  const handleMessageSend = () => {
    if (messageInput.trim() === "") return;
    sendMessage();
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      event.preventDefault();
      sendMessage();
    }
  };

  const sendMessage = () => {
    const token =
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjUzYWNlOTI3LWE2YjEtNGEzOC04NGMwLWQ0NTAwNzI1N2I3MiIsInJvbGUiOiJ0ZWFjaGVyIiwidXVpZCI6IjRmOWFhNzU3LTU5M2QtNDJjZC05OTRkLWU4NzNmMzliMDU3ZCIsImV4cCI6MTcwOTM5NDk3NiwidHlwZSI6ImFjY2VzcyIsImlhdCI6MTcwODA5ODk3Nn0.kyBnZnIwtUsVbag6n6--Tvw_EE0pXAW_92IaJEmc2QQ";
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
    console.log("Adding group:", groupData);
    const token =
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjUzYWNlOTI3LWE2YjEtNGEzOC04NGMwLWQ0NTAwNzI1N2I3MiIsInJvbGUiOiJ0ZWFjaGVyIiwidXVpZCI6IjRmOWFhNzU3LTU5M2QtNDJjZC05OTRkLWU4NzNmMzliMDU3ZCIsImV4cCI6MTcwOTM5NDk3NiwidHlwZSI6ImFjY2VzcyIsImlhdCI6MTcwODA5ODk3Nn0.kyBnZnIwtUsVbag6n6--Tvw_EE0pXAW_92IaJEmc2QQ";
    fetch("http://localhost:5001/group/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(groupData),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to add group");
        }
        return response.json();
      })
      .then((data: ApiResponse) => {
        if (data.success) {
          console.log("Group added successfully:", data.data);
          // Fetch updated group list after adding the group
          setShowForm(false);
        } else {
          console.error("Failed to add group:", data.message);
        }
      })
      .catch((error) => {
        console.error("Error adding group:", error);
      });
  };

  const handleCloseForm = () => {
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
        <div className="add-group">
          {userRole === "teacher" || userRole === "admin" ? (
            showForm ? (
              <GroupForm
                onAddGroup={handleAddGroup}
                onClose={handleCloseForm}
              />
            ) : (
              <AiOutlinePlusCircle
                className="add-group-icon"
                size={30}
                onClick={() => setShowForm(true)}
              />
            )
          ) : null}
        </div>
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
    </div>
  );
};

export default GroupChat;
