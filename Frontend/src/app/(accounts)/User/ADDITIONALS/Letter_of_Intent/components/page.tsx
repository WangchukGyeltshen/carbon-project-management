"use client";
import React, { useMemo, useState } from "react";
import { useRouter } from "next/navigation";

type ActivityStatus = "Ongoing" | "Completed" | "Inactive" | "Deferred" | string;

interface ActivityItem {
  id: number | string;
  projectName: string;
  description: string;
  status: ActivityStatus;
  progress: string;
  dateOnboarded: string;
}

const dummyActivities: ActivityItem[] = [
  {
    id: 1,
    projectName: "Dagachhu Hydropower\nProject",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla...",
    status: "Ongoing",
    progress: "1/3",
    dateOnboarded: "01/01/2025",
  },
  {
    id: 2,
    projectName: "Bhutan Solar Project I",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla...",
    status: "Completed",
    progress: "3/3",
    dateOnboarded: "01/01/2025",
  },
];

const statusColors: Record<string, string> = {
  Ongoing: "text-blue-600 bg-blue-50",
  Completed: "text-green-600 bg-green-50",
  Inactive: "text-gray-600 bg-gray-100",
  Deferred: "text-red-600 bg-red-50",
};

function StatusPill({ status }: { status: ActivityStatus }) {
  return (
    <span
      className={`inline-block px-3 py-1 rounded-full text-xs font-semibold ${
        statusColors[status] || "text-gray-700 bg-gray-100"
      }`}
    >
      {status}
    </span>
  );
}

export default function ProjectTable() {
  const router = useRouter();

  // State for search, pagination
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  // State for modal & selected item
  const [selected, setSelected] = useState<ActivityItem | null>(null);
  const [modalOpen, setModalOpen] = useState(false);

  // Filter projects by search
  const filtered = useMemo(() => {
    return dummyActivities.filter(
      (item) =>
        item.projectName.toLowerCase().includes(search.toLowerCase()) ||
        item.description.toLowerCase().includes(search.toLowerCase()) ||
        item.status.toLowerCase().includes(search.toLowerCase())
    );
  }, [search]);

  const total = filtered.length;
  const pageCount = Math.ceil(total / rowsPerPage);

  const paginated = filtered.slice((page - 1) * rowsPerPage, page * rowsPerPage);

  const handlePrev = () => setPage((p) => Math.max(p - 1, 1));
  const handleNext = () => setPage((p) => Math.min(p + 1, pageCount));
  const handleRowsPerPageChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setRowsPerPage(Number(e.target.value));
    setPage(1);
  };

  return (
    <div className="bg-white rounded-lg shadow p-6 w-full max-w-full">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3 mb-4">
          <button
            className="p-2 rounded border border-gray-300 bg-gray-100 hover:bg-gray-200"
            aria-label="Filter"
            title="Filter"
          >
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="#222F3E"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M3 5a1 1 0 0 1 1-1h16a1 1 0 0 1 .8 1.6l-6.6 8.8V19a1 1 0 0 1-2 0v-4.6L4.2 6.6A1 1 0 0 1 5 5z" />
            </svg>
          </button>
          <input
            type="text"
            placeholder="Search..."
            className="border border-gray-200 rounded px-3 py-2 text-sm w-64 focus:outline-none focus:ring-2 focus:ring-green-200 text-black"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        <button
          onClick={() => router.push("/User/ADDITIONALS/Letter_of_Intent/new_application/progress")}
          className="bg-green-700 hover:bg-green-800 text-white font-semibold px-4 py-2 rounded"
        >
          + New Application
        </button>
      </div>

      {/* Table */}
      <div className="overflow-x-auto rounded-md border border-gray-200">
        <table className="min-w-full text-black text-left text-sm border-collapse border-spacing-y-3">
          <thead className="bg-gray-50 text-gray-500 text-xs uppercase">
            <tr>
              <th className="py-3 px-3 w-10">#</th>
              <th className="py-3 px-3 min-w-[180px]">Project Name</th>
              <th className="py-3 px-3 max-w-[300px]">Description</th>
              <th className="py-3 px-3 w-28">Status</th>
              <th className="py-3 px-3 w-16">Progress</th>
              <th className="py-3 px-3 w-32">Date Onboarded</th>
              <th className="py-3 px-3 w-24">Action</th>
            </tr>
          </thead>
          <tbody>
            {paginated.map((item, idx) => (
              <tr
                key={item.id}
                className={`bg-white hover:bg-gray-50 ${
                  idx % 2 === 1 ? "bg-gray-50" : ""
                }`}
              >
                <td className="py-3 px-3 font-medium">
                  {(page - 1) * rowsPerPage + idx + 1}
                </td>
                <td className="py-3 px-3 whitespace-pre-line font-semibold">
                  {item.projectName}
                </td>
                <td className="py-3 px-3 max-w-[300px] truncate">{item.description}</td>
                <td className="py-3 px-3">
                  <StatusPill status={item.status} />
                </td>
                <td className="py-3 px-3">{item.progress}</td>
                <td className="py-3 px-3">{item.dateOnboarded}</td>
                <td className="px-2 py-2 text-black">
                  <button
                    className="border border-gray-300 rounded px-4 py-1 text-xs font-semibold hover:bg-gray-100 transition-colors"
                    onClick={() => {
                      setSelected(item);
                      setModalOpen(true);
                    }}
                  >
                    view
                  </button>
                </td>
              </tr>
            ))}
            {paginated.length === 0 && (
              <tr>
                <td colSpan={7} className="text-center py-6 text-gray-400">
                  No projects found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="flex items-center justify-between mt-4 text-xs text-gray-500">
        <span>
          {total === 0
            ? 0
            : (page - 1) * rowsPerPage + 1}-{Math.min(page * rowsPerPage, total)} of{" "}
          {total}
        </span>
        <div className="flex items-center gap-2">
          <span>Rows per page:</span>
          <select
            value={rowsPerPage}
            onChange={handleRowsPerPageChange}
            className="border border-gray-300 rounded px-1 py-0.5 text-black bg-white"
          >
            {[5, 10, 20, 50].map((n) => (
              <option key={n} value={n}>
                {n}
              </option>
            ))}
          </select>
          <button
            onClick={handlePrev}
            disabled={page === 1}
            className={`mx-2 px-2 py-1 rounded ${
              page === 1 ? "text-gray-300 cursor-not-allowed" : "text-black hover:bg-gray-100"
            }`}
            aria-label="Previous Page"
          >
            &lt;
          </button>
          <span className="mx-1">
            {page}/{pageCount || 1}
          </span>
          <button
            onClick={handleNext}
            disabled={page === pageCount || pageCount === 0}
            className={`mx-2 px-2 py-1 rounded ${
              page === pageCount || pageCount === 0
                ? "text-gray-300 cursor-not-allowed"
                : "text-black hover:bg-gray-100"
            }`}
            aria-label="Next Page"
          >
            &gt;
          </button>
        </div>
      </div>

      {/* Modal for viewing selected item */}
      {modalOpen && selected && (
        <div
          className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50"
          onClick={() => setModalOpen(false)}
        >
          <div
            className="bg-white rounded-lg shadow-lg w-full max-w-md p-6 relative"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              className="absolute top-2 right-2 text-gray-400 hover:text-black text-xl font-bold"
              onClick={() => setModalOpen(false)}
              aria-label="Close"
            >
              &times;
            </button>
            <h2 className="text-xl font-bold mb-4">{selected.projectName}</h2>
            <div className="space-y-2 text-black">
              <p>
                <strong>Description: </strong>
                {selected.description}
              </p>
              <p>
                <strong>Status: </strong>
                <StatusPill status={selected.status} />
              </p>
              <p>
                <strong>Progress: </strong> {selected.progress}
              </p>
              <p>
                <strong>Date Onboarded: </strong> {selected.dateOnboarded}
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
