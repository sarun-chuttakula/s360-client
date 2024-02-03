import React from "react";
import { Routes, Route } from "react-router-dom";
import Dashboard from "../pages/Dashboard";
import Layout from "../components/layout/Layout";

const DashboardRouter = () => {
  return (
    // <div className="flex-1 bg-gray-200 h-screen">
    <Route path="/" element={<Layout />}>
      <Route path="/dashboard" element={<Dashboard />} />
    </Route>
    // </div>
  );
};

export default DashboardRouter;
