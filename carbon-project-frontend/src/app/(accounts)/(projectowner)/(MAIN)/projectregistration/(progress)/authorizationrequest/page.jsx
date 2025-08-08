"use client";
import React, { useState } from "react";
import Sidebar from "(accounts)/(projectowner)/(components)/Sidebar";
import Navbar from "(accounts)/(projectowner)/(components)/Navbar";
import ProgressSidebar from "../../(components)/ProgressSidebar";
import WaitingRequest from "./WaitingRequest";

// Placeholder step components
const AuthorizationDocuments = ({ onSubmitSuccess }) => {
  const [file, setFile] = useState(null);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  return (
    <div className="flex-1">
      <h2 className="text-xl font-bold mb-4 text-black">Authorization Documents</h2>
      <label className="border-dashed border-2 border-green-200 bg-green-50 flex flex-col items-center justify-center h-64 mb-6 cursor-pointer">
        <span className="text-green-700">Browse File to Upload</span>
        <input
          type="file"
          className="hidden"
          onChange={handleFileChange}
        />
        {file && (
          <div className="mt-2 text-sm text-gray-800">{file.name} ({(file.size/1024/1024).toFixed(2)} MB)</div>
        )}
      </label>
      <button
        className="bg-green-700 text-white px-4 py-2 rounded"
        onClick={onSubmitSuccess}
        disabled={!file}
      >
        Submit
      </button>
    </div>
  );
};

export default function AuthorizationPage() {
  const [step, setStep] = useState("documents");

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
              <WaitingRequest onPrev={() => setStep("documents")} />
            )}
          </div>
        </main>
      </div>
    </div>
  );
}
