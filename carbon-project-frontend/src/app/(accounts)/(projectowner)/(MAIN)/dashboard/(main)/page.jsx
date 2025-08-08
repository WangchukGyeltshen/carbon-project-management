"use client";
import ProtectedRoute from '../(components)/ProtectedRoute';
import Dashboard from '../(design)/Dashboard';

export default function DashboardPage() {
  return (
    <ProtectedRoute>
      <Dashboard />
    </ProtectedRoute>
  );
}
