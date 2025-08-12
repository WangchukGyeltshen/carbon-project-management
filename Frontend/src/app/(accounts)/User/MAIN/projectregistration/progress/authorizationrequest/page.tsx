"use client";
import React, { useState } from "react";
import Sidebar from "(accounts)/User/components/Sidebar";
import Navbar from "(accounts)/User/components/Navbar";
import ProgressSidebar from "(accounts)/User/MAIN/projectregistration/components/ProgressSidebar";
import WaitingRequest from "./WaitingRequest";

export default function AuthorizationPage(): React.ReactElement {
  const [step, setStep] = useState<"documents" | "waiting">("documents");

  const AuthorizationDocuments = ({ onSubmitSuccess }: { onSubmitSuccess: () => void }) => {
    const [file, setFile] = useState<File | null>(null);
    return (
      <div className="flex-1">
        <h2 className="text-xl font-bold mb-4 text-black">Authorization Documents</h2>
        <label className="border-dashed border-2 border-green-200 bg-green-50 flex flex-col items-center justify-center h-64 mb-6 cursor-pointer">
          <span className="text-green-700">Browse File to Upload</span>
          <input type="file" className="hidden" onChange={(e) => setFile(e.target.files?.[0] || null)} />
          {file && <div className="mt-2 text-sm text-gray-800">{file.name} ({((file.size || 0) / 1024 / 1024).toFixed(2)} MB)</div>}
        </label>
        <button className="bg-green-700 text-white px-4 py-2 rounded" onClick={onSubmitSuccess} disabled={!file}>
          Submit
        </button>
      </div>
    );
  };

  return (
    <div className="flex h-screen bg-[#F4F6F2]">
      <Sidebar activeMenu="/projectregistration" />
      <div className="flex-1 flex flex-col min-w-0">
        <Navbar />
        <main className="flex-1 overflow-auto p-8">
          <div className="flex gap-4">
            <ProgressSidebar step={2} />
            {step === "documents" ? (
              <AuthorizationDocuments onSubmitSuccess={() => setStep("waiting")} />
            ) : (
              <WaitingRequest />
            )}
          </div>
        </main>
      </div>
    </div>
  );
}


