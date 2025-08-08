"use client";
import React, { useEffect, useState } from "react";
import { useAuth } from "../../../../../(auth)/(contexts)/AuthContext";
import { useRouter } from "next/navigation";
import Sidebar from "../../../(components)/Sidebar";
import Navbar from "../../../(components)/Navbar";
import DashboardCards from "./DashboardCards";
import ProjectList from "../(contexts)/ProjectList";
import RecentActivity from "../(contexts)/RecentActivity";
import ActionableInsights from "../(components)/ActionableInsights";

export default function Dashboard() {
  const { user, logout } = useAuth();
  const router = useRouter();

  const [dashboardData, setDashboardData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const handleLogout = () => {
    logout();
    router.push("/");
  };

  useEffect(() => {
    async function fetchDashboard() {
      setLoading(true);
      setError(null);
      try {
        // Change this URL to your actual backend endpoint
        const res = await fetch("/api/dashboard");
        if (!res.ok) throw new Error("Failed to fetch dashboard data");
        const data = await res.json();
        setDashboardData(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }
    fetchDashboard();
  }, []);

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Sidebar */}
      <Sidebar />
      {/* Main Content */}
      <main className="flex-1 flex flex-col overflow-y-auto">
        {/* Navbar */}
        <Navbar />
        {error && (
          <div className="p-4 text-red-700 bg-red-100 text-center">{error}</div>
        )}
        {/* Stats Row */}
        <DashboardCards totals={dashboardData?.totals} loading={loading} />
        {/* Main Content Grid */}
        <div className="flex flex-col md:flex-row gap-6 px-8 pb-8">
          {/* Project List */}
          <ProjectList projects={dashboardData?.projectList} loading={loading} />
          {/* Right Side: Recent Activity & Insights */}
          <div className="w-full md:w-80 flex flex-col gap-6">
            <RecentActivity activity={dashboardData?.recentActivity} loading={loading} />
            <ActionableInsights insights={dashboardData?.actionableInsights} loading={loading} />
          </div>
        </div>
      </main>
    </div>
  );
}
