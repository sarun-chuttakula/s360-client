import React from "react";
import { Routes, Route } from "react-router-dom";
import Sidebar from "./components/sidebar/sidebar";
import Dashboard from "./pages/Dashboard";
import GroupChat from "./pages/GroupChat";
import FeeBoard from "./pages/FeeBoard";
import ResultBoard from "./pages/ResultBoard";
import AttendanceBoard from "./pages/AttendanceBoard";
import Library from "./pages/Library";
import Feedback from "./components/feedbackbox/feedback";
import Layout from "./components/layout/Layout";

function Main() {
  return (
    <div className="app-container">
      <div className="main">
        <div className="side-bar">
          <Sidebar />
        </div>
        <div className="dashboard">
          <Routes>
            <Route path="/" element={<Layout />}>
              <Route path="/" element={<Dashboard />} />
              <Route path="/groups" element={<GroupChat />} />
              <Route path="/fee-board" element={<FeeBoard />} />
              <Route path="/result-board" element={<ResultBoard />} />
              <Route path="/attendance-board" element={<AttendanceBoard />} />
              <Route path="/library" element={<Library />} />
              <Route path="/feedback" element={<Feedback />} />
            </Route>
          </Routes>
        </div>
      </div>
      <div className="feedback-container">
        <Feedback />
      </div>
    </div>
  );
}

export default Main;
