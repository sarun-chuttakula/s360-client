// Profile.tsx
import React, { useState } from "react";
import { FiUser } from "react-icons/fi"; // You can choose any icon from react-icons

const Profile: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleLogout = () => {
    // Implement your logout logic here
    //console.log("Logout clicked");
    setIsOpen(false);
  };

  const handleDetails = () => {
    // Implement your details logic here
    //console.log("Details clicked");
    setIsOpen(false);
  };

  return (
    <div className="relative">
      <div className="cursor-pointer" onClick={toggleDropdown}>
        <FiUser className="text-2xl" />
      </div>

      {isOpen && (
        <div className="absolute top-10 right-0 bg-white p-4 border rounded shadow">
          <ul>
            <li
              className="cursor-pointer px-4 py-2 hover:bg-gray-100"
              onClick={handleDetails}
            >
              Details
            </li>
            <li
              className="cursor-pointer px-4 py-2 hover:bg-gray-100"
              onClick={handleLogout}
            >
              Logout
            </li>
          </ul>
        </div>
      )}
    </div>
  );
};

export default Profile;
