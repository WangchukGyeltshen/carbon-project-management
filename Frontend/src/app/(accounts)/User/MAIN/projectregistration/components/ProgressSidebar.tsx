import React from "react";

export default function ProgressSidebar({ step = 1 }: { step?: number }): React.ReactElement {
  const steps = [{ label: "Project Documents" }, { label: "Authorization Request" }, { label: "Authorization Letter" }];
  return (
    <aside className="w-80 bg-white rounded-xl shadow p-6 mr-8 h-fit">
      <div className="text-2xl font-bold mb-1 text-black">Progress</div>
      <div className="text-gray-600 text-sm mb-6">Complete the following task</div>
      <div className="flex flex-col gap-3">
        {steps.map((item, idx) => {
          if (idx + 1 < step) {
            return (
              <div key={idx} className="flex items-center gap-3">
                <div className="w-8 h-8 flex items-center justify-center rounded-full border-2 border-green-300 bg-green-50 text-green-700">
                  <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="#22c55e" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="5 11 9 15 15 7" />
                  </svg>
                </div>
                <button className="flex-1 text-left px-4 py-2 rounded font-semibold border whitespace-nowrap bg-green-50 text-green-700 border-green-200">{item.label}</button>
              </div>
            );
          }
          if (idx + 1 === step) {
            return (
              <div key={idx} className="flex items-center gap-3">
                <div className="w-8 h-8 flex items-center justify-center rounded-full border-2 font-bold text-lg bg-[#32623A] text-white border-[#32623A]">{idx + 1}</div>
                <button className="flex-1 text-left px-4 py-2 rounded font-semibold border whitespace-nowrap bg-[#32623A] text-white border-[#32623A]">{item.label}</button>
              </div>
            );
          }
          return (
            <div key={idx} className="flex items-center gap-3">
              <div className="w-8 h-8 flex items-center justify-center rounded-full border-2 font-bold text-lg bg-gray-100 text-gray-500 border-gray-300">{idx + 1}</div>
              <button className="flex-1 text-left px-4 py-2 rounded font-semibold border whitespace-nowrap bg-white text-gray-700 border-gray-300">{item.label}</button>
            </div>
          );
        })}
      </div>
    </aside>
  );
}


