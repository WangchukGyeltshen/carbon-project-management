"use client";
import React, { useEffect, useState } from "react";
import Sidebar from "../../../../components/Sidebar";
import Navbar from "../../../../components/Navbar";
import ProgressSidebar from "../../components/ProgressSidebar";
import { FiDownload } from "react-icons/fi";
import { HiOutlineDocument } from "react-icons/hi";
import { useRouter } from "next/navigation";

interface FileInfo {
  name?: string;
  url?: string;
  size?: number;
}

export default function Letter(): React.ReactElement {
  const router = useRouter();
  const [file, setFile] = useState<FileInfo | null>(null);

  useEffect(() => {
    const timer = setTimeout(() => {
      setFile({ name: "Authorization_Letter.pdf", url: "/files/Authorization_Letter.pdf", size: 1.2 * 1024 * 1024 });
    }, 500);
    return () => clearTimeout(timer);
  }, []);

  function formatSize(bytes?: number | null): string | null {
    if (!bytes) return null;
    if (bytes >= 1024 * 1024) return (bytes / 1024 / 1024).toFixed(1) + " MB";
    if (bytes >= 1024) return (bytes / 1024).toFixed(1) + " KB";
    return `${bytes} B`;
  }

  return (
    <div className="flex h-screen bg-[#F4F6F2]">
      <Sidebar activeMenu="/projectregistration" />
      <div className="flex-1 flex flex-col min-w-0">
        <Navbar />
        <main className="flex-1 overflow-auto p-8">
          <div className="flex gap-4">
            <ProgressSidebar step={3} />
            <div className="w-full">
              <div className="text-2xl font-bold mb-1 text-black">Authorization Letter</div>
              <div className="mb-6"></div>
              {file ? (
                <div className="border border-dashed border-gray-400 rounded-lg p-6 bg-green-50 flex items-center gap-4 mb-8" style={{ borderWidth: 1 }}>
                  <div className="flex items-center">
                    <HiOutlineDocument className="text-4xl text-gray-700 mr-4" />
                  </div>
                  <div className="flex-1">
                    {file.name && (
                      <a href={file.url} download={file.name} className="text-green-700 underline hover:text-green-900 text-base font-medium">
                        {file.name}
                      </a>
                    )}
                    {file.size && <div className="text-gray-500 text-sm mt-1">{formatSize(file.size)}</div>}
                  </div>
                  <a href={file.url} download={file.name} className="ml-6 flex items-center justify-center text-gray-700 hover:text-black" aria-label="Download File">
                    <FiDownload className="text-3xl" />
                  </a>
                </div>
              ) : (
                <div className="border border-dashed border-gray-400 rounded-lg p-12 min-h-[200px] flex items-center justify-center bg-white text-gray-600" style={{ borderWidth: 1 }}>
                  Waiting for RGoB to send the Authorization Letter...
                </div>
              )}
              <div className="flex justify-end mt-4">
                <button
                  className="px-6 py-2 border rounded-md text-white bg-gray-500 hover:bg-gray-700 transition"
                  type="button"
                  onClick={() => {
                    if (file) {
                      const newActivity = {
                        id: Date.now(),
                        name: "Authorization Letter Received",
                        description: "Authorization letter has been received and project is ready for implementation.",
                        project: file.name ? file.name.replace(/_/g, " ").replace(/\.pdf$/i, "") : "New Project",
                        startDate: new Date().toLocaleDateString("en-GB"),
                        endDate: "",
                        status: "Ongoing",
                        progress: "0/3",
                      };
                      if (typeof window !== "undefined") {
                        localStorage.setItem("newActivity", JSON.stringify(newActivity));
                      }
                      router.push("/User/MAIN/projectimplementation");
                    } else {
                      router.push("/User/MAIN/projectimplementation");
                    }
                  }}
                >
                  Next
                </button>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}


