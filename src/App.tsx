import React from "react";
import "./App.css";
import Dashboard from "./pages/Dashboard";
import Sidebar from "./components/sidebar";
import { Navigate, Route, Routes } from "react-router-dom";
import GroupChat from "./pages/GroupChat";
import FeeBoard from "./pages/FeeBoard";
import ResultBoard from "./pages/ResultBoard";
import AttendanceBoard from "./pages/AttendanceBoard";
import Library from "./pages/Library";
import Feedback from "./components/feedback";
import Layout from "./components/Layout";
import LoginScreen from "./pages/Login";
import SignupScreen from "./pages/Signup";
import RequireAuth from "./components/RequireAuth";
import { Role } from "./enums/user.enum";
import useAuth from "./hooks/useAuth";
import Unauthorized from "./components/Unauthorized";
import Missing from "./components/Missing";
import ProfileDropdown from "./components/ProfileDropDown";
// import IOApp from "./pages/testio";
// import Auth0Callback from "./components/Auth0Callback";
function Main() {
  //only render sidebar when user is logged in
  const auth = useAuth();

  return (
    <>
      {/* <Router> */}
      <div className="app-container">
        {/* <div className="top-bar">Your top bar content</div> */}
        <div className="main">
          {auth ? (
            <div className="side-bar">
              <Sidebar />
            </div>
          ) : null}
          <div className="dashboard">
            {auth ? (
              <div className="top-bar">
                <div className="profile-icon">
                  <ProfileDropdown />
                </div>
              </div>
            ) : null}
            <Routes>
              <Route path="/" element={<Layout />}>
                {/* public routes */}
                <Route
                  path="/login"
                  element={auth ? <Navigate to="/" /> : <LoginScreen />}
                />
                <Route
                  path="*"
                  element={!auth ? <Navigate to="/login" /> : <Missing />}
                />
                {/* <Route path="/auth0-callback" element={<Auth0Callback />} /> */}
                <Route path="/signup" element={<SignupScreen />} />
                <Route path="/unauthorized" element={<Unauthorized />} />
                <Route
                  element={
                    auth ? (
                      <RequireAuth
                        allowedRoles={[Role.teacher, Role.student]}
                      />
                    ) : (
                      <Navigate to="/login" />
                    )
                  }
                ></Route>
                {/* we want to protect these routes */}
                <Route
                  element={
                    <RequireAuth allowedRoles={[Role.teacher, Role.student]} />
                  }
                >
                  <Route path="/" element={<Dashboard />} />
                  <Route path="/groups" element={<GroupChat />} />
                  <Route path="/fee-details" element={<FeeBoard />} />
                  <Route path="/result-board" element={<ResultBoard />} />

                  <Route path="/library" element={<Library />} />
                  <Route path="/feedback" element={<Feedback />} />
                </Route>
                <Route element={<RequireAuth allowedRoles={[Role.teacher]} />}>
                  <Route
                    path="/attendance-board"
                    element={<AttendanceBoard />}
                  />
                </Route>
              </Route>
            </Routes>
          </div>
        </div>
      </div>
      {/* </Router> */}
      {auth ? (
        <div className="feedback-container">
          <Feedback />
        </div>
      ) : null}
    </>
  );
  // return (
  //   <>
  //     <IOApp />
  //   </>
  // );
}

export default Main;
