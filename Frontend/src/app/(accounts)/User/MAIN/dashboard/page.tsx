"use client";
import React from "react";
import ProtectedRoute from "./components/ProtectedRoute";
import Dashboard from "./design/Dashboard";

export default function DashboardPage(): React.ReactElement {
  return (
    <ProtectedRoute>
      <Dashboard />
    </ProtectedRoute>
  );
}