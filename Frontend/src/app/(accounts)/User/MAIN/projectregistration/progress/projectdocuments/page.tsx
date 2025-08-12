"use client";
import React, { useEffect, useState } from "react";
import WaitingRequest from "./WaitingRequest"; 

const STATUS_COLORS: Record<string, string> = {
  Accepted: "text-green-700",
  Rejected: "text-red-700",
  Pending: "text-yellow-600",
};

function StatusBadge({ status }: { status: string }): React.ReactElement {
  return <span className={`font-semibold ${STATUS_COLORS[status] || "text-gray-600"}`}>Status: {status}</span>;
}

export default function ProjectDocuments({ onSubmitSuccess }: { onSubmitSuccess?: () => void }): React.ReactElement {
  const [maddFile, setMaddFile] = useState<File | null>(null);
  const [validationFile, setValidationFile] = useState<File | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [submitError, setSubmitError] = useState<string>("");
  const [projectName, setProjectName] = useState<string>("");
  const [description, setDescription] = useState<string>("");

  const canSubmit = !!(projectName && description && maddFile && validationFile && !isLoading);
 const handleSubmit = async (): Promise<void> => {
    setIsLoading(true);
    setSubmitError("");
    try {
      const formData = new FormData();
      formData.append("projectName", projectName);
      formData.append("description", description);
      if (maddFile) formData.append("maddFile", maddFile);
      if (validationFile) formData.append("validationFile", validationFile);
      await new Promise((resolve) => setTimeout(resolve, 1000));
      if (onSubmitSuccess) onSubmitSuccess();
    } catch (err) {
      setSubmitError("Failed to submit. Please try again.");
    }
    setIsLoading(false);
  };

  const [status, setStatus] = useState<string>("Pending");
  const [comment, setComment] = useState<string>("");

  useEffect(() => {
    // Placeholder fetch - replace when backend is ready
    const controller = new AbortController();
    fetch("/api/project-documents/123/status", { signal: controller.signal })
      .then(async (res) => {
        if (!res.ok) throw new Error("Failed to load");
        const data = (await res.json()) as { status: string; comment?: string };
        setStatus(data.status);
        setComment(data.comment || "");
      })
      .catch(() => setStatus("Pending"));
    return () => controller.abort();
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
          onChange={(e) => setProjectName(e.target.value)}
          className="w-full border border-gray-200 rounded px-3 py-2 bg-white text-black"
          placeholder="Enter project name"
        />
      </div>

      <div className="mb-4">
        <label className="block text-gray-700 font-semibold mb-1">Description</label>
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
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
          <input id="madd-upload" type="file" className="hidden" onChange={(e) => setMaddFile(e.target.files?.[0] || null)} />
        </label>
        {maddFile && <div className="mt-2 text-sm text-gray-800">{maddFile.name} ({(maddFile.size / 1024 / 1024).toFixed(2)} MB)</div>}
      </div>

      <div className="mb-6">
        <label className="block text-gray-700 font-semibold mb-1">Upload Validation Report</label>
        <label className="block cursor-pointer border border-dashed border-gray-400 bg-green-50 rounded-lg p-6 flex flex-col items-center hover:bg-green-100 transition" htmlFor="validation-upload">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="#14532d" className="w-12 h-12 mb-2">
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 16v-8m0 0-3 3m3-3 3 3m0 6h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <span className="text-gray-700">Browse File to Upload</span>
          <input id="validation-upload" type="file" className="hidden" onChange={(e) => setValidationFile(e.target.files?.[0] || null)} />
        </label>
        {validationFile && <div className="mt-2 text-sm text-gray-800">{validationFile.name} ({(validationFile.size / 1024 / 1024).toFixed(2)} MB)</div>}
      </div>

      {submitError && <div className="bg-red-100 border border-red-300 text-red-700 px-4 py-2 rounded mb-4 text-sm">{submitError}</div>}

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


