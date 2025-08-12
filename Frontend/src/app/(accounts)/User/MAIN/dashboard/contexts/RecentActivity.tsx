import React from "react";

interface ActivityItem {
  message: string;
  timeAgo: string;
}

export default function RecentActivity({ activity, loading }: { activity?: ActivityItem[]; loading: boolean }): JSX.Element {
  if (loading) {
    return (
      <div className="bg-white rounded-xl shadow p-6">
        <div className="text-lg font-semibold mb-4">Recent Activity</div>
        <div className="space-y-3">
          {[1, 2, 3].map((_, i) => (
            <div key={i} className="h-6 bg-gray-100 rounded w-full animate-pulse" />
          ))}
        </div>
      </div>
    );
  }
  return (
    <div className="bg-white rounded-xl shadow p-6">
      <div className="text-lg font-semibold mb-4">Recent Activity</div>
      <ul className="space-y-3">
        {activity?.length ? (
          activity.map((item, idx) => (
            <li className="flex items-center justify-between text-sm" key={idx}>
              <span>{item.message}</span>
              <span className="text-gray-400">{item.timeAgo}</span>
            </li>
          ))
        ) : (
          <li className="text-gray-400 text-center">No recent activity</li>
        )}
      </ul>
    </div>
  );
}


