"use client";
import React from "react";
import Sidebar from "(accounts)/User/components/Sidebar";
import Navbar from "(accounts)/User/components/Navbar";
import ProgressSidebar from "(accounts)/User/ADDITIONALS/Letter_of_Intent/new_application/components/progress_sidebar";
import { useRouter } from "next/navigation";
import WaitingRequest from "./WaitingRequest";

export default function Letter(): React.ReactElement {
  const router = useRouter();
  return (
    <div className="flex h-screen bg-[#F4F6F2]">
      <Sidebar />
      <div className="flex-1 flex flex-col min-w-0">
        <Navbar />
        <main className="flex-1 overflow-auto p-8">
          <div className="flex gap-4">
            <ProgressSidebar step={2} />
            <div className="w-full">
              <WaitingRequest />
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}


