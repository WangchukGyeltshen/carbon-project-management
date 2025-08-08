"use client";
import React, { useState, useEffect } from "react";
import axios from "axios";
import WaitingRequest from "./WaitingRequest.jsx";    

const STATUS_COLORS = {
  Accepted: "text-green-700",
  Rejected: "text-red-700",
  Pending: "text-yellow-600",
};

function StatusBadge({ status }) {
  return (
    <span className={`font-semibold ${STATUS_COLORS[status] || "text-gray-600"}`}>Status: {status}</span>
  );
}


export default function ProjectDocuments({ onSubmitSuccess }) {
  const [maddFile, setMaddFile] = useState(null);
  const [validationFile, setValidationFile] = useState(null);
  
  const [isLoading, setIsLoading] = useState(false);
  const [submitError, setSubmitError] = useState("");
  const [projectName, setProjectName] = useState("");
  const [description, setDescription] = useState("");

  const canSubmit = projectName && description && maddFile && validationFile && !isLoading;

  const handleSubmit = async () => {
    setIsLoading(true);
    setSubmitError("");
    try {
      const formData = new FormData();
      formData.append("projectName", projectName);
      formData.append("description", description);
      formData.append("maddFile", maddFile);
      formData.append("validationFile", validationFile);
      // TODO: Replace the endpoint with your actual backend endpoint
      // TODO: Restore backend call when ready
      await new Promise((resolve) => setTimeout(resolve, 1000)); // simulate network delay
      if (onSubmitSuccess) onSubmitSuccess();
    } catch (err) {
      setSubmitError("Failed to submit. Please try again.");
    }
    setIsLoading(false);
  };

  

  const files = [
    { name: "MADD.pdf", size: "50 MB" },
    { name: "Validation_Report.pdf", size: "50 MB" }
  ];

  // These states will be fetched from backend
  const [status, setStatus] = useState("Pending");
  const [comment, setComment] = useState("");

  useEffect(() => {
    // TODO: Replace with your actual backend endpoint and project/document id
    axios.get("/api/project-documents/123/status")
      .then(res => {
        setStatus(res.data.status);
        setComment(res.data.comment || "");
      })
      .catch(() => setStatus("Pending"));
  }, []);

  return (
    <div className="w-full bg-white rounded-xl shadow p-8 ml-auto">
      <div className="text-2xl font-bold mb-1 text-black">Project Documents</div>
      <div className="text-gray-600 text-sm mb-6">Complete the following task</div>
      <div className="mb-4">
        <label className="block text-gray-700 font-semibold mb-1">Project Name</label>
        <input
          type="text"
          value={projectName}
          onChange={e => setProjectName(e.target.value)}
          className="w-full border border-gray-200 rounded px-3 py-2 bg-white text-black"
          placeholder="Enter project name"
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700 font-semibold mb-1">Description</label>
        <textarea
          value={description}
          onChange={e => setDescription(e.target.value)}
          className="w-full border border-gray-200 rounded px-3 py-2 bg-white text-black"
          rows={3}
          placeholder="Enter project description"
        />
      </div>
      <div className="mb-6">
        <label className="block text-gray-700 font-semibold mb-1">Upload MADD File</label>
        <label className="block cursor-pointer border border-dashed border-gray-400 bg-green-50 rounded-lg p-6 flex flex-col items-center hover:bg-green-100 transition" htmlFor="madd-upload">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="#14532d" className="w-12 h-12 mb-2">
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 16v-8m0 0-3 3m3-3 3 3m0 6h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <span className="text-gray-700">Browse File to Upload</span>
          <input id="madd-upload" type="file" className="hidden" onChange={e => setMaddFile(e.target.files[0])} />
        </label>
        {maddFile && <div className="mt-2 text-sm text-gray-800">{maddFile.name} ({(maddFile.size/1024/1024).toFixed(2)} MB)</div>}
      </div>
      <div className="mb-6">
        <label className="block text-gray-700 font-semibold mb-1">Upload Validation Report</label>
        <label className="block cursor-pointer border border-dashed border-gray-400 bg-green-50 rounded-lg p-6 flex flex-col items-center hover:bg-green-100 transition" htmlFor="validation-upload">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="#14532d" className="w-12 h-12 mb-2">
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 16v-8m0 0-3 3m3-3 3 3m0 6h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <span className="text-gray-700">Browse File to Upload</span>
          <input id="validation-upload" type="file" className="hidden" onChange={e => setValidationFile(e.target.files[0])} />
        </label>
        {validationFile && <div className="mt-2 text-sm text-gray-800">{validationFile.name} ({(validationFile.size/1024/1024).toFixed(2)} MB)</div>}
      </div>

      {submitError && (
        <div className="bg-red-100 border border-red-300 text-red-700 px-4 py-2 rounded mb-4 text-sm">
          {submitError}
        </div>
      )}
      <div className="flex justify-end mt-8">
        <button
          className="px-6 py-2 bg-[#14532d] text-white rounded shadow hover:bg-green-900 transition font-semibold disabled:opacity-50 disabled:cursor-not-allowed"
          type="button"
          onClick={handleSubmit}
          disabled={!canSubmit}
        >
          {isLoading ? "Submitting..." : "Submit"}
        </button>
      </div>

    </div>
  );
}
