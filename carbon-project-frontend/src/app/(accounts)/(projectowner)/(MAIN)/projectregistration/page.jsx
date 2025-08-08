"use client";
import React from "react";
import Sidebar from "(accounts)/(projectowner)/(components)/Sidebar";
import Navbar from "../../(components)/Navbar";
import ProgressSidebar from "./(components)/ProgressSidebar";
import ProjectDocuments from "./(progress)/ProjectDocuments/ProjectDocuments";
import WaitingRequest from "./(progress)/ProjectDocuments/WaitingRequest";

import { useState } from "react";

export default function ProjectRegistrationPage() {
  const [step, setStep] = useState("documents");

  return (
    <div className="flex h-screen bg-[#F4F6F2]">
      <Sidebar />
      <div className="flex-1 flex flex-col min-w-0">
        <Navbar />
        <main className="flex-1 overflow-auto p-8">
          <div className="flex gap-4">
            <ProgressSidebar step={1} />
{step === "documents" ? (
  <ProjectDocuments onSubmitSuccess={() => setStep("waiting")}/>
) : (
  <WaitingRequest onPrev={() => setStep("documents")} />
)}
          </div>
        </main>
      </div>
    </div>
  );
}

