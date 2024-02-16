// App.js
import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import useAuth from "./hooks/useAuth";
import Dashboard from "./pages/Dashboard";
import LoginScreen from "./pages/Login";
import Sidebar from "./components/sidebar/sidebar";
import GroupChat from "./pages/GroupChat";
import FeeBoard from "./pages/FeeBoard";
import ResultBoard from "./pages/ResultBoard";
import AttendanceBoard from "./pages/AttendanceBoard";
import Library from "./pages/Library";
import Feedback from "./components/feedbackbox/feedback";

function App() {
  const authData = useAuth();

  return (
    <>
      <div className="app-container">
        <div className="main">
          <div className="side-bar">
            <Sidebar />
          </div>
          <div className="dashboard">
            <Routes>
              <Route
                path="/"
                element={authData ? <Dashboard /> : <Navigate to="/login" />}
              />
              <Route path="/login" element={<LoginScreen />} />
              <Route path="/groups" element={<GroupChat />} />
              <Route path="/fee-board" element={<FeeBoard />} />
              <Route path="/result-board" element={<ResultBoard />} />
              <Route path="/attendance-board" element={<AttendanceBoard />} />
              <Route path="/library" element={<Library />} />
              <Route path="/feedback" element={<Feedback />} />
            </Routes>
          </div>
        </div>
      </div>
      <div className="feedback-container">
        <Feedback />
      </div>
    </>
  );
}

export default App;
