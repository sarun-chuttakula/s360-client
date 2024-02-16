import React from "react";
import "./App.css";
import Dashboard from "./pages/Dashboard";
// import LoginScreen from "./pages/Login";
// import SignupScreen from "./pages/Signup";
import Sidebar from "./components/sidebar/sidebar";
import { Route, Routes } from "react-router-dom";
import GroupChat from "./pages/GroupChat";
import FeeBoard from "./pages/FeeBoard";
import ResultBoard from "./pages/ResultBoard";
import AttendanceBoard from "./pages/AttendanceBoard";
import Library from "./pages/Library";
import Feedback from "./components/feedbackbox/feedback";
import Layout from "./components/layout/Layout";
import LoginScreen from "./pages/Login";
import SignupScreen from "./pages/Signup";
// import RequireAuth from "./components/required_auth/RequireAuth";
// import { Role } from "./interfaces/Role";
function Main() {
  return (
    <>
      {/* <Router> */}
      <div className="app-container">
        {/* <div className="top-bar">Your top bar content</div> */}
        <div className="main">
          <div className="side-bar">
            <Sidebar />
          </div>
          <div className="dashboard">
            <Routes>
              <Route path="/" element={<Layout />}>
                public routes
                <Route path="/login" element={<LoginScreen />} />
                <Route path="/signup" element={<SignupScreen />} />
                {/* we want to protect these routes */}
                {/* <Route element={<RequireAuth allowedRoles={[Role.teacher]} />}> */}
                <Route path="/" element={<Dashboard />} />
                <Route path="/groups" element={<GroupChat />} />
                <Route path="/fee-board" element={<FeeBoard />} />
                <Route path="/result-board" element={<ResultBoard />} />
                <Route path="/attendance-board" element={<AttendanceBoard />} />
                <Route path="/library" element={<Library />} />
                <Route path="/feedback" element={<Feedback />} />
              </Route>
              {/* </Route> */}
            </Routes>
          </div>
        </div>
      </div>
      {/* </Router> */}
      <div className="feedback-container">
        <Feedback />
      </div>
    </>
  );
}

export default Main;
