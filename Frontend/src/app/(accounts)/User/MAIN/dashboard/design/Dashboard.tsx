"use client";
import React, { useEffect, useState } from "react";
import { useAuth } from "../../../../../(auth)/contexts/AuthContext";
import { useRouter } from "next/navigation";
import Sidebar from "../../../components/Sidebar";
import Navbar from "../../../components/Navbar";
import DashboardCards from "./DashboardCards";
import ProjectList from "../contexts/ProjectList";
import RecentActivity from "../contexts/RecentActivity";
import ActionableInsights from "../components/ActionableInsights";

interface DashboardResponse {
  totals?: Record<string, any>;
  projectList?: Array<any>;
  recentActivity?: Array<any>;
  actionableInsights?: Array<any>;
}

export default function Dashboard(): React.ReactElement {
  const { logout } = useAuth();
  const router = useRouter();

  const [dashboardData, setDashboardData] = useState<DashboardResponse | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const handleLogout = () => {
    logout();
    router.push("/");
  };

  useEffect(() => {
    async function fetchDashboard() {
      setLoading(true);
      setError(null);
      try {
        const res = await fetch("/api/dashboard");
        if (!res.ok) throw new Error("Failed to fetch dashboard data");
        const data = (await res.json()) as DashboardResponse;
        setDashboardData(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Unknown error");
      } finally {
        setLoading(false);
      }
    }
    fetchDashboard();
  }, []);

  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar />
      <main className="flex-1 flex flex-col overflow-y-auto">
        <Navbar />
        {error && <div className="p-4 text-red-700 bg-red-100 text-center">{error}</div>}
        <DashboardCards totals={dashboardData?.totals} loading={loading} />
        <div className="flex flex-col md:flex-row gap-6 px-8 pb-8">
          <ProjectList projects={dashboardData?.projectList} loading={loading} />
          <div className="w-full md:w-80 flex flex-col gap-6">
            <RecentActivity activity={dashboardData?.recentActivity} loading={loading} />
            <ActionableInsights insights={dashboardData?.actionableInsights} loading={loading} />
          </div>
        </div>
      </main>
    </div>
  );
}


