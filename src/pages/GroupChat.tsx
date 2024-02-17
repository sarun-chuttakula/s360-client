import React, { useState, useEffect, useRef } from "react";
import { Group, ApiResponse } from "../interfaces";
import GroupForm, { GroupData } from "../components/GroupForm/GroupForm";
import { AiOutlinePlusCircle } from "react-icons/ai";
import { IoSend } from "react-icons/io5";
import { MdDelete } from "react-icons/md";
import {
  CreateGroup,
  DeleteGroup,
  GetAllMessages,
  GetGroups,
  SendMessage,
} from "../api/group-chat.api";
import useAuth from "../hooks/useAuth";
import { useSelector } from "react-redux";
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
  const auth = useAuth();
  const token = auth?.accesstoken as string;
  const userData = useSelector((state: any) => state.user.userData);
  useEffect(() => {
    GetGroups()
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
    setUserRole(userData.role);
  }, []);

  useEffect(() => {
    if (selectedGroup) {
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
    GetAllMessages(groupId, page)
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
    const messageData = {
      sender: "senderId",
      receiver: "receiverId",
      group: selectedGroup?.id,
      message: messageInput,
    };
    SendMessage(messageData)
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
    CreateGroup(groupData)
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

  const handleDeleteGroup = (groupId: string) => {
    console.log("Deleting group:", groupId);
    DeleteGroup(groupId)
      .then((data: ApiResponse) => {
        if (data.success) {
          console.log("Group deleted successfully:", data.data);
          // Fetch updated group list after deleting the group
        } else {
          console.error("Failed to delete group:", data.message);
        }
      })
      .catch((error) => {
        console.error("Error deleting group:", error);
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
        {/* <div className="chat-content"> */}
        {selectedGroup ? (
          <div>
            <div className="chat-header">
              <h2>{selectedGroup.name}</h2>
              <div className="delete-group">
                {userRole === "teacher" || userRole === "admin" ? (
                  <MdDelete
                    className="delete-group-icon"
                    size={30}
                    onClick={() => handleDeleteGroup(selectedGroup.id)}
                  />
                ) : null}
              </div>
            </div>
            <div className="chat-content">
              <div className="chat-messages">
                {messages.map((msg, index) => (
                  <div key={index}>{msg.message}</div>
                ))}
              </div>
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
      {/* </div> */}
    </div>
  );
};

export default GroupChat;
