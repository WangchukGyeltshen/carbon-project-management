"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Sidebar from "(accounts)/User/components/Sidebar";
import Navbar from "(accounts)/User/components/Navbar";
import ProgressSidebar from "(accounts)/User/MAIN/projectimplementation/addactivity/components/ProgressSidebar";

export default function ITMOInsurrancePage(): React.ReactElement {
  const [file, setFile] = useState<File | null>(null);
  const [selectedOption, setSelectedOption] = useState<"upload" | "verification">("upload");
  const router = useRouter();

  return (
    <div className="flex h-screen bg-[#F4F6F2]">
      <Sidebar />
      <div className="flex-1 flex flex-col min-w-0">
        <Navbar />
        <main className="flex-1 overflow-auto p-8">
          <div className="flex gap-4">
            <ProgressSidebar step={2} />
            <div className="bg-white rounded-lg shadow-md p-8 flex-1 flex flex-col justify-between">
              <div>
                <h2 className="text-2xl font-bold mb-2 text-black">ITMO Issuance Request</h2>
                <p className="text-gray-600 mb-6">Complete the following task</p>
                <div className="mb-6">
                  <span className="block text-gray-700 font-medium mb-2">Mark your Decision:</span>
                  <button type="button" className={`flex items-center gap-2 mb-2 focus:outline-none ${selectedOption === "upload" ? "" : "opacity-70"} cursor-pointer`} onClick={() => setSelectedOption("upload")} aria-pressed={selectedOption === "upload"}>
                    <span className={`inline-flex items-center justify-center w-6 h-6 rounded-full border-2 ${selectedOption === "upload" ? "bg-[#32623A] border-[#32623A] text-white" : "bg-white border-gray-400 text-transparent"}`}>
                      {selectedOption === "upload" && (
                        <svg width="18" height="18" fill="none" stroke="white" strokeWidth="2" viewBox="0 0 24 24">
                          <path d="M5 13l4 4L19 7" />
                        </svg>
                      )}
                    </span>
                    <span className="block text-gray-700 font-medium">Upload an ITMO Issuance Letter</span>
                  </button>

                  {selectedOption === "upload" && (
                    <>
                      <label htmlFor="file-upload" className="border-2 border-dashed border-[#32623A] bg-[#F7FCF9] rounded-lg flex flex-col items-center justify-center py-12 cursor-pointer w-full transition-all mb-4">
                        <input type="file" className="hidden" id="file-upload" onChange={(e) => setFile(e.target.files?.[0] || null)} />
                        <svg width="48" height="48" fill="none" stroke="#32623A" strokeWidth="2" viewBox="0 0 24 24">
                          <path d="M12 16V4M12 4l-4 4m4-4l4 4" />
                          <rect x="4" y="16" width="16" height="4" rx="2" />
                        </svg>
                        <span className="mt-2 text-gray-600">{file ? file.name : "Browse File to Upload"}</span>
                      </label>

                      <button type="button" onClick={() => router.push("/User/MAIN/projectimplementation/addactivity/progress/acknowledgement")} disabled={!file} className={`px-6 py-2 rounded transition mb-4 ${file ? "bg-[#32623A] text-white hover:bg-[#29512f]" : "bg-gray-300 text-gray-600 cursor-not-allowed"}`}>
                        Submit
                      </button>
                    </>
                  )}

                  <button type="button" className={`flex items-center gap-2 text-gray-700 mt-2 mb-2 focus:outline-none ${selectedOption === "verification" ? "" : "opacity-70"} cursor-pointer`} onClick={() => setSelectedOption("verification")} aria-pressed={selectedOption === "verification"}>
                    <span className={`inline-flex items-center justify-center w-6 h-6 rounded-full border-2 ${selectedOption === "verification" ? "bg-[#32623A] border-[#32623A] text-white" : "bg-white border-gray-400 text-transparent"}`}>
                      {selectedOption === "verification" && (
                        <svg width="18" height="18" fill="none" stroke="white" strokeWidth="2" viewBox="0 0 24 24">
                          <path d="M5 13l4 4L19 7" />
                        </svg>
                      )}
                    </span>
                    <span>Process Based on Verification Report</span>
                  </button>

                  {selectedOption === "verification" && (
                    <button type="button" onClick={() => router.push("/User/MAIN/projectimplementation/addactivity/progress/acknowledgement")} className="px-6 py-2 bg-[#32623A] text-white rounded hover:bg-[#29512f] transition mt-4">
                      Submit
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}


