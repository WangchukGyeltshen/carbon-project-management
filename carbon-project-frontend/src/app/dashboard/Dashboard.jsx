import React from "react";
import Sidebar from "./Sidebar";

export default function Dashboard() {
  return (
    <div className="flex h-screen bg-gray-50">
      {/* Sidebar */}
      <Sidebar />
      {/* Main Content */}
      <main className="flex-1 flex flex-col overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between px-8 py-6 border-b bg-white">
          <div className="text-xl font-bold text-gray-800">Project Owner</div>
          <div className="flex items-center space-x-4">
            <button className="relative">
              <span className="absolute -top-1 -right-1 w-2 h-2 bg-red-500 rounded-full"></span>
              <svg className="w-6 h-6 text-gray-500" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" /></svg>
            </button>
            <div className="w-10 h-10 bg-green-600 text-white rounded-full flex items-center justify-center font-bold text-lg">PO</div>
          </div>
        </div>
        {/* Stats Row */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 px-8 py-6">
          {/* Stat Card */}
          <div className="bg-white rounded-xl shadow p-6 flex flex-col">
            <div className="text-gray-500 font-medium mb-2">Total Projects</div>
            <div className="flex space-x-4">
              <div className="flex flex-col items-center">
                <span className="text-2xl font-bold text-green-700">12</span>
                <span className="text-xs text-gray-400">In Progress</span>
              </div>
              <div className="flex flex-col items-center">
                <span className="text-2xl font-bold text-blue-700">8</span>
                <span className="text-xs text-gray-400">Approved</span>
              </div>
              <div className="flex flex-col items-center">
                <span className="text-2xl font-bold text-red-600">2</span>
                <span className="text-xs text-gray-400">Rejected</span>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-xl shadow p-6 flex flex-col">
            <div className="text-gray-500 font-medium mb-2">Monitoring Reports</div>
            <div className="flex space-x-4">
              <div className="flex flex-col items-center">
                <span className="text-2xl font-bold text-green-700">5</span>
                <span className="text-xs text-gray-400">In Progress</span>
              </div>
              <div className="flex flex-col items-center">
                <span className="text-2xl font-bold text-blue-700">3</span>
                <span className="text-xs text-gray-400">Approved</span>
              </div>
              <div className="flex flex-col items-center">
                <span className="text-2xl font-bold text-red-600">1</span>
                <span className="text-xs text-gray-400">Rejected</span>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-xl shadow p-6 flex flex-col">
            <div className="text-gray-500 font-medium mb-2">Letter of Intent</div>
            <div className="flex space-x-4">
              <div className="flex flex-col items-center">
                <span className="text-2xl font-bold text-green-700">3</span>
                <span className="text-xs text-gray-400">In Progress</span>
              </div>
              <div className="flex flex-col items-center">
                <span className="text-2xl font-bold text-blue-700">2</span>
                <span className="text-xs text-gray-400">Approved</span>
              </div>
              <div className="flex flex-col items-center">
                <span className="text-2xl font-bold text-red-600">0</span>
                <span className="text-xs text-gray-400">Rejected</span>
              </div>
            </div>
          </div>
        </div>
        {/* Main Content Grid */}
        <div className="flex flex-col md:flex-row gap-6 px-8 pb-8">
          {/* Project List */}
          <div className="flex-1 bg-white rounded-xl shadow p-6 overflow-x-auto">
            <div className="text-lg font-semibold mb-4">Project List</div>
            <table className="min-w-full text-sm">
              <thead>
                <tr className="text-left text-gray-500 border-b">
                  <th className="py-2 pr-4">Project Name</th>
                  <th className="py-2 pr-4">Reports</th>
                  <th className="py-2 pr-4">Date on Board</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b hover:bg-gray-50">
                  <td className="py-2 pr-4 font-medium">Dagachhu Hydropower Project</td>
                  <td className="py-2 pr-4">7</td>
                  <td className="py-2 pr-4">2022-01-15</td>
                </tr>
                <tr className="border-b hover:bg-gray-50">
                  <td className="py-2 pr-4 font-medium">Solar Project I</td>
                  <td className="py-2 pr-4">3</td>
                  <td className="py-2 pr-4">2023-03-10</td>
                </tr>
                <tr className="hover:bg-gray-50">
                  <td className="py-2 pr-4 font-medium">Wind Power Project</td>
                  <td className="py-2 pr-4">2</td>
                  <td className="py-2 pr-4">2023-07-22</td>
                </tr>
              </tbody>
            </table>
          </div>
          {/* Right Side: Recent Activity & Insights */}
          <div className="w-full md:w-80 flex flex-col gap-6">
            {/* Recent Activity */}
            <div className="bg-white rounded-xl shadow p-6">
              <div className="text-lg font-semibold mb-4">Recent Activity</div>
              <ul className="space-y-3">
                <li className="flex items-center justify-between text-sm">
                  <span>Project "Solar Project I" approved</span>
                  <span className="text-gray-400">2 hours ago</span>
                </li>
                <li className="flex items-center justify-between text-sm">
                  <span>Report submitted for "Dagachhu Hydropower"</span>
                  <span className="text-gray-400">5 hours ago</span>
                </li>
                <li className="flex items-center justify-between text-sm">
                  <span>Letter of Intent received</span>
                  <span className="text-gray-400">1 day ago</span>
                </li>
              </ul>
            </div>
            {/* Actionable Insights */}
            <div className="bg-white rounded-xl shadow p-6">
              <div className="text-lg font-semibold mb-4">Actionable Insights</div>
              <ul className="space-y-3">
                <li className="flex items-center text-sm text-yellow-700">
                  <span className="mr-2">⚠️</span> Project "Wind Power" needs report update
                </li>
                <li className="flex items-center text-sm text-red-700">
                  <span className="mr-2">⛔</span> "Solar Project I" report overdue
                </li>
                <li className="flex items-center text-sm text-yellow-700">
                  <span className="mr-2">⚠️</span> Letter of Intent missing for "New Hydro Project"
                </li>
              </ul>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
