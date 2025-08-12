"use client";
import React, { useState, useMemo } from "react";

interface NotificationItem {
  id: number;
  from: string;
  subject: string;
  isBold?: boolean;
}

const dummyNotifications: NotificationItem[] = [
  { id: 1, from: "VVB", subject: "Dear User, Your MADD File has been Validated and Accepted!", isBold: true },
  { id: 2, from: "RGOB", subject: "Dear User, Your Letter of Authorization has been processed!" },
  { id: 3, from: "VVB", subject: "Dear User, Your MADD File has been Rejected!" },
  { id: 4, from: "RGOB", subject: "Dear User, Your MADD File has been Validated!" },
  { id: 5, from: "VVB", subject: "Dear User, Your Project Concept Note has been Rejected!" },
  { id: 6, from: "RGOB", subject: "Dear User, Your Letter of Authorization has been processed!" },
  { id: 7, from: "RGOB", subject: "Dear User, Your Letter of Authorization has been processed!" },
  { id: 8, from: "RGOB", subject: "Dear User, Your MADD File has been Validated!" },
  { id: 9, from: "RGOB", subject: "Dear User, Your MADD File has been Validated!" },
  { id: 10, from: "RGOB", subject: "Dear User, Your MADD File has been Validated!" },
];

export default function NotificationsTable() {
  const [selectedIds, setSelectedIds] = useState<Set<number>>(new Set());
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const rowsPerPage = 10;

  // Modal state and selected notification
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedNotification, setSelectedNotification] = useState<NotificationItem | null>(null);

  const filtered = useMemo(() => {
    return dummyNotifications.filter(
      (n) =>
        n.from.toLowerCase().includes(search.toLowerCase()) ||
        n.subject.toLowerCase().includes(search.toLowerCase())
    );
  }, [search]);

  const total = filtered.length;
  const pageCount = Math.ceil(total / rowsPerPage);
  const paginated = filtered.slice((page - 1) * rowsPerPage, page * rowsPerPage);

  const toggleSelect = (id: number) => {
    setSelectedIds((prev) => {
      const copy = new Set(prev);
      if (copy.has(id)) copy.delete(id);
      else copy.add(id);
      return copy;
    });
  };

  const toggleSelectAll = () => {
    if (selectedIds.size === paginated.length) {
      setSelectedIds(new Set());
    } else {
      setSelectedIds(new Set(paginated.map((n) => n.id)));
    }
  };

  const handlePrev = () => setPage((p) => Math.max(p - 1, 1));
  const handleNext = () => setPage((p) => Math.min(p + 1, pageCount));

  // Open modal with selected notification
  const handleView = (notification: NotificationItem) => {
    setSelectedNotification(notification);
    setModalOpen(true);
  };

  return (
    <div className="bg-white rounded-xl shadow p-6 w-full max-w-7xl mx-auto">
      {/* Filter + Search */}
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

      {/* Table */}
      <div className="overflow-x-auto rounded shadow-sm border border-gray-200">
        <table className="w-full text-black text-sm">
          <thead className="bg-gray-100 text-gray-600 uppercase text-xs select-none">
            <tr>
              <th className="px-3 py-3 text-left">
                <input
                  type="checkbox"
                  checked={selectedIds.size === paginated.length && paginated.length > 0}
                  onChange={toggleSelectAll}
                  aria-label="Select all"
                  className="cursor-pointer"
                />
              </th>
              <th className="px-3 py-3 text-left w-12">#</th>
              <th className="px-3 py-3 text-left w-24">FROM</th>
              <th className="px-3 py-3 text-left">SUBJECT</th>
              <th className="px-3 py-3 text-left w-20">ACTION</th>
            </tr>
          </thead>
          <tbody>
            {paginated.length === 0 && (
              <tr>
                <td colSpan={5} className="text-center py-6 text-gray-500">
                  No notifications found.
                </td>
              </tr>
            )}
            {paginated.map((item, idx) => (
              <tr
                key={item.id}
                className={`cursor-pointer hover:bg-gray-50 border-b border-gray-100 ${
                  idx % 2 === 0 ? "bg-white" : "bg-gray-50"
                }`}
              >
                <td className="px-3 py-3">
                  <input
                    type="checkbox"
                    checked={selectedIds.has(item.id)}
                    onChange={() => toggleSelect(item.id)}
                    aria-label={`Select notification ${item.id}`}
                    className="cursor-pointer"
                    onClick={(e) => e.stopPropagation()} // prevent row click
                  />
                </td>
                <td className="px-3 py-3 font-medium">{(page - 1) * rowsPerPage + idx + 1}</td>
                <td className="px-3 py-3 font-semibold">{item.from}</td>
                <td
                  className={`px-3 py-3 truncate max-w-[600px] ${
                    item.isBold ? "font-bold" : "font-normal"
                  }`}
                  title={item.subject}
                >
                  {item.subject}
                </td>
                <td className="px-3 py-3">
                  <button
                    className="text-gray-700 border border-gray-300 rounded px-4 py-1 text-xs font-semibold hover:bg-gray-100 transition-colors"
                    onClick={() => handleView(item)}
                  >
                    view
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="flex items-center justify-between mt-3 text-xs text-gray-500 select-none">
        <span>
          {total === 0 ? 0 : (page - 1) * rowsPerPage + 1}-
          {Math.min(page * rowsPerPage, total)} of {total}
        </span>
        <div className="flex items-center gap-2">
          <span>Rows per page:</span>
          <select
            value={rowsPerPage}
            disabled
            className="border border-gray-300 rounded px-1 py-0.5 text-black bg-white cursor-not-allowed"
          >
            <option value={10}>10</option>
          </select>
          <button
            onClick={handlePrev}
            disabled={page === 1}
            className={`px-2 py-1 rounded ${
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
            className={`px-2 py-1 rounded ${
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

      {/* Modal */}
      {modalOpen && selectedNotification && (
        <div
          className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50"
          onClick={() => setModalOpen(false)}
          role="dialog"
          aria-modal="true"
          aria-labelledby="modal-title"
          aria-describedby="modal-desc"
        >
          <div
            className="bg-white rounded-lg shadow-lg w-full max-w-md p-6 relative"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              className="absolute top-2 right-2 text-gray-400 hover:text-black text-xl font-bold"
              onClick={() => setModalOpen(false)}
              aria-label="Close modal"
            >
              &times;
            </button>
            <h2 id="modal-title" className="text-xl font-bold mb-4">
              Notification from {selectedNotification.from}
            </h2>
            <p id="modal-desc" className="text-black whitespace-pre-wrap">
              {selectedNotification.subject}
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
