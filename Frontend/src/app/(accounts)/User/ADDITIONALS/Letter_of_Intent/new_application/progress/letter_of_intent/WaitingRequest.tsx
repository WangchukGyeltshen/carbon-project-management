"use client";
import React from "react";
import { useRouter } from "next/navigation";

export default function WaitingRequest(): React.ReactElement {
  const router = useRouter();
  return (
    <div className="w-full bg-white rounded-xl shadow p-8 ml-auto">
      <div className="text-2xl font-bold mb-1 text-black">Letter of Intent</div>
      <div className="mb-6"></div>
      <div className="border border-dashed border-green-900 rounded-lg p-12 min-h-[200px] flex items-center justify-center bg-white" style={{ borderWidth: 1 }}>
        <span className="text-green-900 text-center">Waiting for RGoB to Verify your Concept Note</span>
      </div>
      <div className="flex justify-end gap-4 mt-8">
        <button className="px-6 py-2 border rounded-md text-gray-700 bg-white hover:bg-gray-100 transition" type="button" onClick={() => router.push("/User/ADDITIONALS/Letter_of_Intent/new_application/progress")}>
          Previous
        </button>
        <button className="px-6 py-2 border rounded-md text-white bg-gray-500 hover:bg-gray-700 transition" type="button" onClick={() => router.push("/User/ADDITIONALS/Letter_of_Intent/new_application/progress/letter_of_intent/letter")}>
          Next
        </button>
      </div>
    </div>
  );
}


