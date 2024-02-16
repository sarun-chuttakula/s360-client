import React, { useState } from "react";

// Define the type for the group data
export interface GroupData {
  name: string;
  description: string;
  admin_id: string;
}

interface GroupFormProps {
  onAddGroup: (groupData: GroupData) => void; // Define the type for the onAddGroup prop
}

const GroupForm: React.FC<GroupFormProps> = ({ onAddGroup }) => {
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
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Group Name:
        <input
          type="text"
          value={groupName}
          onChange={(e) => setGroupName(e.target.value)}
        />
      </label>
      <label>
        Group Description:
        <input
          type="text"
          value={groupDescription}
          onChange={(e) => setGroupDescription(e.target.value)}
        />
      </label>
      <label>
        Admin ID:
        <input
          type="text"
          value={adminId}
          onChange={(e) => setAdminId(e.target.value)}
        />
      </label>
      <button type="submit">Create Group</button>
    </form>
  );
};

export default GroupForm;
