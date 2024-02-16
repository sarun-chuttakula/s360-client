import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { Login } from "../api";
import { ApiResponse } from "../interfaces/Auth";
import AuthContext from "../context/AuthProvider"; // Import the AuthContext

const LoginScreen: React.FC = () => {
  const navigate = useNavigate();
  const { setAuth } = useContext(AuthContext); // Access setAuth from AuthContext
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const response: ApiResponse = await Login(formData);
    if (response.success) {
      setAuth(response.data); // Update authentication data using setAuth
      navigate("/");
    } else {
      navigate("/login");
    }
  };

  return (
    <div className="Login-container">
      <form className="Login-form" onSubmit={handleSubmit}>
        <h1>Login Up Page</h1>

        <div className="form-group">
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
            Login Up
          </button>

          <p>
            Don't have an account? <a href="/signup">Sign Up</a>
          </p>
        </div>
      </form>
    </div>
  );
};

export default LoginScreen;
