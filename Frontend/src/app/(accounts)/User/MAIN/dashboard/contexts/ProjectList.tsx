import React from "react";

interface ProjectItem {
  name: string;
  reports: number | string;
  dateOnBoard: string;
}

export default function ProjectList({ projects, loading }: { projects?: ProjectItem[]; loading: boolean }): JSX.Element {
  if (loading) {
    return (
      <div className="flex-1 bg-white rounded-xl shadow p-6 overflow-x-auto">
        <div className="text-lg font-semibold mb-4">Project List</div>
        <div className="h-40 animate-pulse bg-gray-100 rounded" />
      </div>
    );
  }
  return (
    <div className="flex-1 bg-white rounded-xl shadow p-6 overflow-x-auto">
      <div className="text-lg font-semibold mb-4">Project List</div>
      <table className="min-w-full text-sm">
        <thead>
          <tr className="text-left text-gray-500 border-b">
            <th className="py-2 pr-4">Project Name</th>
            <th className="py-2 pr-4">Reports</th>
            <th className="py-2 pr-4">Date on Board</th>
          </tr>
        </thead>
        <tbody>
          {projects?.length ? (
            projects.map((proj, idx) => (
              <tr className="border-b hover:bg-gray-50" key={idx}>
                <td className="py-2 pr-4 font-medium">{proj.name}</td>
                <td className="py-2 pr-4">{proj.reports}</td>
                <td className="py-2 pr-4">{proj.dateOnBoard}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={3} className="py-4 text-center text-gray-400">
                No projects found
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}


