import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Register } from "../api";
import { ApiResponse } from "../interfaces/Auth";

const SignupScreen: React.FC = () => {
  const navigate = useNavigate();
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
    const response: ApiResponse = await Register(formData);
    if (response.success) navigate("/dashboard");
    else navigate("/login");
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
            placeholder="Enter your first name"
            value={formData.firstname}
            className="form-control"
            onChange={handleChange}
          />

          <label htmlFor="email">Email</label>
          <input
            type="email"
            name="email"
            id="email"
            placeholder="Enter your email"
            value={formData.email}
            className="form-control"
            onChange={handleChange}
          />

          <label htmlFor="username">Username</label>
          <input
            type="text"
            name="username"
            id="username"
            placeholder="Enter your username"
            value={formData.username}
            className="form-control"
            onChange={handleChange}
          />

          <label htmlFor="password">Password</label>
          <input
            type="password"
            name="password"
            id="password"
            placeholder="Enter your password"
            value={formData.password}
            className="form-control"
            onChange={handleChange}
          />

          <button type="submit" className="btn btn-primary">
            Sign Up
          </button>

          <p>
            Already have an account? <a href="/login">Login</a>
          </p>
        </div>
      </form>
    </div>
  );
};

export default SignupScreen;
