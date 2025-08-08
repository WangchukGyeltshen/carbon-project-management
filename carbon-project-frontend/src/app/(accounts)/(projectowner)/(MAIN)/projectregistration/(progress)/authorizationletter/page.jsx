"use client";
import React, { useState } from "react";
import Sidebar from "(accounts)/(projectowner)/(components)/Sidebar";
import Navbar from "(accounts)/(projectowner)/(components)/Navbar";
import ProgressSidebar from "../../(components)/ProgressSidebar";
import WaitingRequest from "./WaitingRequest";
import AuthorizationDocuments from "./letter/page";

export default function AuthorizationPage() {
  const [step, setStep] = useState("documents");

  return (
    <div className="flex h-screen bg-[#F4F6F2]">
      <Sidebar activeMenu="/projectregistration" />
      <div className="flex-1 flex flex-col min-w-0">
        <Navbar />
        <main className="flex-1 overflow-auto p-8">
          <div className="flex gap-4">
            <ProgressSidebar step={3} />
            {step === "documents" ? (
              <WaitingRequest onPrev={() => setStep("documents")} />
            ) : (
              <AuthorizationDocuments onSubmitSuccess={() => setStep("waiting")} />
            )}
          </div>
        </main>
      </div>
    </div>
  );
}
