import React from "react";
import { Route, Routes } from "react-router-dom";
import Layout from "../components/Layout";
import Dashboard from "../pages/Dashboard";
import GroupChat from "../pages/GroupChat";

const MainRouter = () => {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route path="/" element={<Dashboard />} />
        <Route path="/GroupChat" element={<GroupChat />} />
      </Route>
    </Routes>
  );
};

export default MainRouter;
