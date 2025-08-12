import React from "react";

export default function Navbar(): React.ReactElement {
  return (
    <div className="flex items-center justify-between px-8 py-6 border-b bg-white">
      <div className="text-xl font-bold text-gray-800">Project Owner</div>
      <div className="flex items-center gap-4">
        <div className="rounded-full bg-gray-100 p-2 flex items-center justify-center">
          <svg width="24" height="24" fill="none" stroke="#222F3E" strokeWidth="2" viewBox="0 0 24 24">
            <path d="M18 16v-5a6 6 0 10-12 0v5a2 2 0 002 2h8a2 2 0 002-2z" />
            <path d="M13.73 21a2 2 0 01-3.46 0" />
          </svg>
        </div>
        <div
          className="w-10 h-10 rounded-full flex items-center justify-center text-white font-bold text-base"
          style={{ background: "#B48A1F" }}
        >
          PO
        </div>
      </div>
    </div>
  );
}


