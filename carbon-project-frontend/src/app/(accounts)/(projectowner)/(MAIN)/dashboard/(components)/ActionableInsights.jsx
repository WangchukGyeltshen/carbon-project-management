import React from "react";

const iconMap = {
  warning: <span className="mr-2">⚠️</span>,
  error: <span className="mr-2">⛔</span>,
  info: <span className="mr-2">ℹ️</span>,
};

const colorMap = {
  warning: "text-yellow-700",
  error: "text-red-700",
  info: "text-blue-700",
};

export default function ActionableInsights({ insights, loading }) {
  if (loading) {
    return (
      <div className="bg-white rounded-xl shadow p-6">
        <div className="text-lg font-semibold mb-4">Actionable Insights</div>
        <div className="space-y-3">
          {[1,2,3].map((_,i) => (
            <div key={i} className="h-6 bg-gray-100 rounded w-full animate-pulse" />
          ))}
        </div>
      </div>
    );
  }
  return (
    <div className="bg-white rounded-xl shadow p-6">
      <div className="text-lg font-semibold mb-4">Actionable Insights</div>
      <ul className="space-y-3">
        {insights?.length ? insights.map((item, idx) => (
          <li className={`flex items-center text-sm ${colorMap[item.type] || "text-gray-700"}`} key={idx}>
            {iconMap[item.type] || iconMap.info} {item.message}
          </li>
        )) : (
          <li className="text-gray-400 text-center">No actionable insights</li>
        )}
      </ul>
    </div>
  );
}
