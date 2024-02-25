import React, { useState } from "react";
import "../styles/group-chat.css";

export interface GroupData {
  name: string;
  description: string;
  admin_id: string;
}

interface GroupFormProps {
  onAddGroup: (groupData: GroupData) => void;
  onClose: () => void; // Add a prop to handle closing the form
}

const GroupForm: React.FC<GroupFormProps> = ({ onAddGroup, onClose }) => {
  const [groupName, setGroupName] = useState("");
  const [groupDescription, setGroupDescription] = useState("");
  const [adminId, setAdminId] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onAddGroup({
      name: groupName,
      description: groupDescription,
      admin_id: adminId,
    });
    setGroupName("");
    setGroupDescription("");
    setAdminId("");
    onClose(); // Close the form after submission
  };

  return (
    <div className="group-form-overlay">
      <div className="group-form-container">
        <form onSubmit={handleSubmit}>
          <label className="group-form-label">
            Group Name:
            <input
              type="text"
              value={groupName}
              onChange={(e) => setGroupName(e.target.value)}
              className="group-form-input"
            />
          </label>
          <label className="group-form-label">
            Group Description:
            <input
              type="text"
              value={groupDescription}
              onChange={(e) => setGroupDescription(e.target.value)}
              className="group-form-input"
            />
          </label>
          <label className="group-form-label">
            Admin ID:
            <input
              type="text"
              value={adminId}
              onChange={(e) => setAdminId(e.target.value)}
              className="group-form-input"
            />
          </label>
          <div className="group-buttons">
            <button type="submit" className="group-form-button">
              Create Group
            </button>
            <button className="close-button" onClick={onClose}>
              Close
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default GroupForm;
