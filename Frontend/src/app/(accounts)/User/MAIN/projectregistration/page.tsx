"use client";
import React, { useState } from "react";
import Sidebar from "../../components/Sidebar";
import Navbar from "../../components/Navbar";
import ProgressSidebar from "./components/ProgressSidebar";
import ProjectDocuments from "./progress/projectdocuments/page";
import WaitingRequest from "./progress/projectdocuments/WaitingRequest";

export default function ProjectRegistrationPage(): React.ReactElement {
  const [step, setStep] = useState<"documents" | "waiting">("documents");
  return (
    <div className="flex h-screen bg-[#F4F6F2]">
      <Sidebar />
      <div className="flex-1 flex flex-col min-w-0">
        <Navbar />
        <main className="flex-1 overflow-auto p-8">
          <div className="flex gap-4">
            <ProgressSidebar step={1} />
            {step === "documents" ? (
              <ProjectDocuments onSubmitSuccess={() => setStep("waiting")} />
            ) : (
              <WaitingRequest onPrev={() => setStep("documents")} />
            )}
          </div>
        </main>
      </div>
    </div>
  );
}