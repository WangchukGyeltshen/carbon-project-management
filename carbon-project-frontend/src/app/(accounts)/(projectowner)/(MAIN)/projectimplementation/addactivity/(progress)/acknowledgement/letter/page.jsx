"use client";
import React, { useEffect, useState } from "react";
import Sidebar from "(accounts)/(projectowner)/(components)/Sidebar";
import Navbar from "(accounts)/(projectowner)/(components)/Navbar";
import ProgressSidebar from "../../../(components)/ProgressSidebar";
import { useRouter } from "next/navigation";

export default function Letter() {
  const router = useRouter();

  return (
    <div className="flex h-screen bg-[#F4F6F2]">
      <Sidebar />
      <div className="flex-1 flex flex-col min-w-0">
        <Navbar />
        <main className="flex-1 overflow-auto p-8">
          <div className="flex gap-4">
            <ProgressSidebar step={3} />
            <div className="w-full">
              <div className="w-full bg-white rounded-xl shadow p-8 ml-auto">
                <div className="text-2xl font-bold mb-1 text-black">Acknowledgement</div>
                <div className="mb-6"></div>
                <div
                  className="inline-block w-full bg-green-50 text-green-900 border border-dashed border-green-900 rounded-md p-6 text-sm leading-relaxed"
                  style={{ borderWidth: 1 }}
                >
                  <span className="block bg-green-50 text-green-900 p-4 rounded-md text-sm leading-relaxed">
                  Your Request to Issue ITMOs/MCUs has been approved. Based on Request, following units have been issued:
                  <br />
                  &nbsp;&nbsp;&nbsp;&nbsp;a. ITMO: 24 tCO2e
                  <br />
                  &nbsp;&nbsp;&nbsp;&nbsp;b. MCU: 12 tCO2e
                  </span>

                </div>
                <div className="flex justify-end gap-4 mt-8">
                  <button
                    className="px-6 py-2 border rounded-md text-gray-700 bg-white hover:bg-gray-100 transition"
                    type="button"
                    onClick={() =>
                      router.push("/projectimplementation/addactivity/ITMOinsurrance")
                    }
                  >
                    Previous
                  </button>
                  <button
                    className="px-6 py-2 border rounded-md text-white bg-gray-500 hover:bg-gray-700 transition"
                    type="button"
                    onClick={() =>
                      router.push("/projectimplementation/addactivity/PEletter")
                    }
                  >
                    Next
                  </button>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
