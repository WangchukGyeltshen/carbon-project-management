import React from "react";

export default function DashboardCards({ totals, loading }) {
  if (loading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 px-8 py-6">
        {[1, 2, 3].map((_, i) => (
          <div key={i} className="bg-white rounded-xl shadow p-6 animate-pulse h-32" />
        ))}
      </div>
    );
  }
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 px-8 py-6">
      {/* Card Helper */}
      {[
        {
          label: "Total Projects",
          total: totals?.projects?.total ?? 0,
          inProgress: totals?.projects?.inProgress ?? 0,
          approved: totals?.projects?.approved ?? 0,
          rejected: totals?.projects?.rejected ?? 0,
        },
        {
          label: "Monitoring Reports",
          total: totals?.monitoringReports?.total ?? 0,
          inProgress: totals?.monitoringReports?.inProgress ?? 0,
          approved: totals?.monitoringReports?.approved ?? 0,
          rejected: totals?.monitoringReports?.rejected ?? 0,
        },
        {
          label: "Letter of Intent",
          total: totals?.letterOfIntent?.total ?? 0,
          inProgress: totals?.letterOfIntent?.inProgress ?? 0,
          approved: totals?.letterOfIntent?.approved ?? 0,
          rejected: totals?.letterOfIntent?.rejected ?? 0,
        },
      ].map((item, idx) => (
        <div
          key={item.label}
          className="bg-white border border-[#E5E7EB] rounded-lg shadow-sm p-7 flex flex-col justify-between min-h-[170px]"
        >
          <div className="text-[#222F3E] font-semibold text-lg mb-2">{item.label}</div>
          <div className="text-4xl font-extrabold text-[#222F3E] mb-3">{item.total}</div>
          <div className="flex flex-wrap gap-x-4 gap-y-1 text-base">
            <span className="text-[#B48A1F] font-medium">
              In Progress: <span className="font-semibold">{item.inProgress}</span>
            </span>
            <span className="text-[#4B614B] font-medium">
              Approved: <span className="font-semibold">{item.approved}</span>
            </span>
            <span className="text-[#C94B4B] font-medium">
              Rejected: <span className="font-semibold">{item.rejected}</span>
            </span>
          </div>
        </div>
      ))}
    </div>
  );
}
