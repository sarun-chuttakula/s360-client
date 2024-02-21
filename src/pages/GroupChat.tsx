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
import * as io from "socket.io-client";
import { ClientToServerEvents, ServerToClientEvents } from "../types/typings";

let socket: any;
const GroupChat = () => {
  const [groups, setGroups] = useState<Group[]>([]);
  const [selectedGroup, setSelectedGroup] = useState<Group | null>(null);
  const [messages, setMessages] = useState<any[]>([]);
  const [messageInput, setMessageInput] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const chatContainerRef = useRef<HTMLDivElement>(null);
  const [userRole, setUserRole] = useState<string | null>(null);
  const [showForm, setShowForm] = useState(false);
  const auth = useAuth();
  const token = auth?.accesstoken as string;
  const userData = useSelector((state: any) => state.user.userData);
  // const socket: io.Socket<ServerToClientEvents, ClientToServerEvents> =
  //   io.connect("http://localhost:5001");

  useEffect(() => {
    socket = io.connect("http://localhost:5001");

    // Listen for the 'connect' event
    socket.on("connect", () => {
      console.log("Connected");
    });

    socket.on("serverMsg", (data: any) => {
      console.log(socket.id);
      console.log(data);
      console.log(data.msg);
      console.log(messages);
      // Update state using previous state

      setMessages((prevMessages) => [
        ...prevMessages,
        {
          id: data.id,
          message: data.msg,
          receiver: "receiverId",
          sender: "senderId",
        },
      ]);
      SendMessage(token, {
        id: data.id,
        group: data.group_id,
        message: data.msg,
        receiver: "receiverId",
        sender: "senderId",
      })
        .then((data: ApiResponse) => {
          if (data.success) {
            // setMessages([...messages, data.data]);
            setMessageInput("");
            setSelectedGroup(selectedGroup);
          } else {
            console.error("Failed to send message:", data.message);
          }
        })
        .catch((error) => {
          console.error("Error sending message:", error);
        });
    });
  }, [messages]);
  // console.log(messages);
  // Load selected group from sessionStorage on component mount
  useEffect(() => {
    const storedSelectedGroup = JSON.parse(
      sessionStorage.getItem("selectedGroup") || "null"
    );
    if (storedSelectedGroup) {
      setSelectedGroup(storedSelectedGroup);
    }
  }, []);
  useEffect(() => {
    GetGroups(token)
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
    // Store scroll position in sessionStorage when component unmounts
    return () => {
      if (chatContainerRef.current) {
        sessionStorage.setItem(
          "chatScrollPosition",
          chatContainerRef.current.scrollTop.toString()
        );
      }
    };
  }, []);

  useEffect(() => {
    // Restore scroll position from sessionStorage when component mounts
    if (chatContainerRef.current) {
      const storedScrollPosition = sessionStorage.getItem("chatScrollPosition");
      if (storedScrollPosition) {
        chatContainerRef.current.scrollTop = parseInt(storedScrollPosition);
      } else {
        // If no scroll position is stored, scroll to the bottom
        chatContainerRef.current.scrollTop =
          chatContainerRef.current.scrollHeight;
      }
    }
  }, []);
  useEffect(() => {
    if (!auth) {
      sessionStorage.removeItem("selectedGroup");
      sessionStorage.removeItem("chatScrollPosition");
    }
  }, [auth]);
  const fetchMessages = (groupId: string, token: string, page: number) => {
    GetAllMessages(token, groupId, page)
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

  const handleGroupClick = (group: Group) => {
    setSelectedGroup(group);
    setCurrentPage(1);
    // Store selected group in sessionStorage
    sessionStorage.setItem("selectedGroup", JSON.stringify(group));
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
    socket.emit("clientMsg", {
      // sender: "senderId",
      // receiver: "receiverId",
      group_id: selectedGroup!.id,
      msg: messageInput,
    });
  };

  const handleAddGroup = (groupData: GroupData) => {
    console.log("Adding group:", groupData);
    CreateGroup(token, groupData)
      .then((data: ApiResponse) => {
        if (data.success) {
          console.log("Group added successfully:", data.data);
          // Fetch updated group list after adding the group
          GetGroups(token)
            .then((updatedData: ApiResponse) => {
              if (updatedData.success) {
                setGroups(updatedData.data);
                setShowForm(false);
              } else {
                console.error(
                  "Failed to fetch updated group data:",
                  updatedData.message
                );
              }
            })
            .catch((error) => {
              console.error("Error fetching updated group data:", error);
            });
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
    DeleteGroup(token, groupId)
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
              <h2>
                {selectedGroup.name} {messages.length}
              </h2>
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
