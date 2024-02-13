import React, { useState } from "react";

const Signup: React.FC = () => {
  const [formData, setFormData] = useState({
    firstname: "",
    email: "",
    username: "",
    password: "",
  });
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:4000/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error("Failed to register user");
      }

      console.log("User registered successfully");
    } catch (error: any) {
      console.error("Error during registration:", error.message);
    }
    console.log("Form submitted with data:", formData);
  };
  return (
    <div className="Signup-container">
      <form className="Signup-form" onSubmit={handleSubmit}>
        <h1>Sign Up Page</h1>

        <div className="form-group">
          <label htmlFor="firstname">First Name</label>
          <input
            type="text"
            name="firstname"
            id="firstname"
            value={formData.firstname}
            onChange={handleChange}
          />
        </div>
      </form>
    </div>
  );
};

export default Signup;
