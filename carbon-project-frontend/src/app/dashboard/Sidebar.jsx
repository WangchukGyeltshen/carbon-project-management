import React from "react";

export default function Sidebar() {
  return (
    <aside className="flex flex-col h-full w-64 bg-white border-r border-gray-200 shadow-sm">
      {/* Logo */}
      <div className="flex items-center justify-center h-20 border-b border-gray-100">
        <div className="w-12 h-12 bg-gray-200 rounded-full flex items-center justify-center font-bold text-xl text-gray-700">
          LOGO
        </div>
      </div>
      {/* Project Owner label */}
      <div className="px-6 py-4 text-gray-700 font-semibold text-lg border-b border-gray-100">
        Project Owner
      </div>
      {/* Menu */}
      <nav className="flex-1 px-4 py-4 space-y-2">
        <div className="space-y-1">
          <a href="#" className="flex items-center px-3 py-2 rounded-lg bg-green-100 text-green-700 font-semibold">
            <span className="mr-3">🏠</span> Dashboard
          </a>
          <a href="#" className="flex items-center px-3 py-2 rounded-lg text-gray-700 hover:bg-gray-100">
            <span className="mr-3">📝</span> Project Registration
          </a>
          <a href="#" className="flex items-center px-3 py-2 rounded-lg text-gray-700 hover:bg-gray-100">
            <span className="mr-3">🚀</span> Project Implementation
          </a>
        </div>
        <div className="mt-6 space-y-1">
          <a href="#" className="flex items-center px-3 py-2 rounded-lg text-gray-700 hover:bg-gray-100">
            <span className="mr-3">🔔</span> Notifications
          </a>
          <a href="#" className="flex items-center px-3 py-2 rounded-lg text-gray-700 hover:bg-gray-100">
            <span className="mr-3">📄</span> Letter of Intent
          </a>
        </div>
      </nav>
      {/* Bottom */}
      <div className="mt-auto px-4 py-4 border-t border-gray-100">
        <a href="#" className="flex items-center px-3 py-2 rounded-lg text-gray-700 hover:bg-gray-100 mb-2">
          <span className="mr-3">❓</span> Help
        </a>
        <a href="#" className="flex items-center px-3 py-2 rounded-lg text-red-600 hover:bg-red-100 font-semibold">
          <span className="mr-3">🚪</span> Logout Account
        </a>
      </div>
    </aside>
  );
}
