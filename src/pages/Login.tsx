import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux"; // Import useDispatch hook
import { login } from "../redux/actions/userActions"; // Import the login action
import { Login } from "../api";
import { ApiResponse } from "../dtos/response.dto";
import AuthContext from "../context/AuthProvider";
// import { useAuth0 } from "@auth0/auth0-react";
const LoginScreen: React.FC = () => {
  const navigate = useNavigate();
  // const { loginWithRedirect, isAuthenticated, user } = useAuth0();

  // const handleLogin = () => {
  //   loginWithRedirect();
  //   //console.log("User:", user);
  //   //console.log("IsAuthenticated:", isAuthenticated);
  // };
  const { setAuth } = useContext(AuthContext);
  const dispatch = useDispatch();
  const [error, setError] = useState("");

  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });
  const userData = useSelector((state: any) => state.user.userData);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const response: ApiResponse = await Login(formData);
      if (response.success) {
        //console.log("Token:", response.data.accesstoken);
        localStorage.setItem("token", response.data.accesstoken);
        setAuth(response.data);
        const userData = response.data;
        //console.log("User Data1:", userData);
        // Dispatch the login action with user data
        dispatch(login(userData));
        navigate("/");
      } else {
        navigate("/login");
      }
    } catch (error) {
      setError("Invalid Credentials");
    }
  };
  //console.log("User Data:", userData);

  return (
    <div className="Login-container">
      <form className="Login-form" onSubmit={handleSubmit}>
        <h1>Login Up Page</h1>
        {error && <p className="text-danger">{error}</p>}

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
          {/* <button onClick={handleLogin}>Login with Auth0</button> */}
          <p>
            Don't have an account? <a href="/signup">Sign Up</a>
          </p>
        </div>
      </form>
    </div>
  );
};

export default LoginScreen;
