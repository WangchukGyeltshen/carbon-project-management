import React from "react";
import Sidebar from "../../components/Sidebar";
import Navbar from "../../components/Navbar";
import Letter_of_Intent from "./components/page";

export default function Letter_of_IntentPage(): React.ReactElement {
  return (
    <div className="flex h-screen bg-[#F4F6F2]">
      <Sidebar />
      <div className="flex-1 flex flex-col min-w-0">
        <Navbar />
        <main className="flex-1 overflow-auto p-8">
          <Letter_of_Intent />
        </main>
      </div>
    </div>
  );
}