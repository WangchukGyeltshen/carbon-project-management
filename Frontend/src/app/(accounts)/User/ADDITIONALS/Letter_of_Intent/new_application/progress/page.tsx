"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Sidebar from "../../../../components/Sidebar";
import Navbar from "../../../../components/Navbar";
import ProgressSidebar from "../components/progress_sidebar";

export default function AddActivityPage(): React.ReactElement {
  const router = useRouter();
  const [activityName, setActivityName] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [file, setFile] = useState<File | null>(null);
  const [error, setError] = useState<string>("");

  return (
    <div className="flex h-screen bg-[#F4F6F2]">
      <Sidebar />
      <div className="flex-1 flex flex-col min-w-0">
        <Navbar />
        <main className="flex-1 overflow-auto p-8">
          <div className="flex gap-4">
            <ProgressSidebar step={1} />
            <div className="bg-white rounded-lg shadow-md p-8 flex-1">
              <h2 className="text-2xl font-bold mb-2 text-black">Project Concept Note</h2>
              <p className="text-gray-600 mb-6">Complete the following task</p>
              {error && <div className="mb-4 text-red-600 font-semibold">{error}</div>}
              <form
                className="space-y-6"
                onSubmit={(e) => {
                  e.preventDefault();
                  setError("");

                  if (!activityName || !description || !file) {
                    setError("All fields including the file upload are required.");
                    return;
                  }

                  router.push("/User/ADDITIONALS/Letter_of_Intent/new_application/progress/letter_of_intent/");
                }}
              >
                <div>
                  <label className="block text-black mb-1">Project Name</label>
                  <input type="text" className="w-full border rounded px-3 py-2 text-black" value={activityName} onChange={(e) => setActivityName(e.target.value)} placeholder="Enter project name" />
                </div>
                <div>
                  <label className="block text-black mb-1">Description</label>
                  <textarea className="w-full border rounded px-3 py-2 text-black" value={description} onChange={(e) => setDescription(e.target.value)} placeholder="Enter project description" rows={3} />
                </div>
                <div>
                  <label className="block text-gray-700 mb-1">Upload Supporting Document</label>
                  <label htmlFor="file-upload" className="border-2 border-dashed border-gray-300 rounded-lg flex flex-col items-center justify-center py-8 cursor-pointer w-full">
                    <input type="file" className="hidden" id="file-upload" onChange={(e) => setFile(e.target.files?.[0] || null)} />
                    <svg width="40" height="40" fill="none" stroke="#32623A" strokeWidth="2" viewBox="0 0 24 24">
                      <path d="M12 16V4M12 4l-4 4m4-4l4 4" />
                      <rect x="4" y="16" width="16" height="4" rx="2" />
                    </svg>
                    <span className="mt-2 text-gray-500">{file ? file.name : "Browse File to Upload"}</span>
                  </label>
                </div>
                <div className="flex justify-end">
                  <button type="submit" className="px-6 py-2 bg-[#32623A] text-white rounded hover:bg-[#29512f] transition">
                    Submit
                  </button>
                </div>
              </form>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
