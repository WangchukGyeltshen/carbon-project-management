"use client";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

const dummyActivities = [
  {
    id: 1,
    name: "Dagachu Monitoring Report",
    description: "Lorem ipsum dolor sit amet, consectetur ...",
    project: "Dagachu Hydropower Project",
    startDate: "01/01/2025",
    endDate: "01/01/2025",
    status: "Ongoing",
    progress: "1/3",
  },
  {
    id: 2,
    name: "Dagachu Monitoring Report",
    description: "Lorem ipsum dolor sit amet, consectetur ...",
    project: "Dagachu Hydropower Project",
    startDate: "01/01/2025",
    endDate: "01/01/2025",
    status: "Completed",
    progress: "3/3",
  },
  {
    id: 3,
    name: "Dagachu Monitoring Report",
    description: "Lorem ipsum dolor sit amet, consectetur ...",
    project: "Dagachu Hydropower Project",
    startDate: "01/01/2025",
    endDate: "01/01/2025",
    status: "Ongoing",
    progress: "2/3",
  },
  {
    id: 4,
    name: "Dagachu Monitoring Report",
    description: "Lorem ipsum dolor sit amet, consectetur ...",
    project: "Dagachu Hydropower Project",
    startDate: "01/01/2025",
    endDate: "01/01/2025",
    status: "Inactive",
    progress: "1/3",
  },
  {
    id: 5,
    name: "Dagachu Monitoring Report",
    description: "Lorem ipsum dolor sit amet, consectetur ...",
    project: "Dagachu Hydropower Project",
    startDate: "01/01/2025",
    endDate: "01/01/2025",
    status: "Ongoing",
    progress: "2/3",
  },
  {
    id: 6,
    name: "Dagachu Monitoring Report",
    description: "Lorem ipsum dolor sit amet, consectetur ...",
    project: "Dagachu Hydropower Project",
    startDate: "01/01/2025",
    endDate: "01/01/2025",
    status: "Completed",
    progress: "3/3",
  },
  {
    id: 7,
    name: "Dagachu Monitoring Report",
    description: "Lorem ipsum dolor sit amet, consectetur ...",
    project: "Dagachu Hydropower Project",
    startDate: "01/01/2025",
    endDate: "01/01/2025",
    status: "Deferred",
    progress: "1/3",
  },
  {
    id: 8,
    name: "Dagachu Monitoring Report",
    description: "Lorem ipsum dolor sit amet, consectetur ...",
    project: "Dagachu Hydropower Project",
    startDate: "01/01/2025",
    endDate: "01/01/2025",
    status: "Ongoing",
    progress: "2/3",
  },
  {
    id: 9,
    name: "Dagachu Monitoring Report",
    description: "Lorem ipsum dolor sit amet, consectetur ...",
    project: "Dagachu Hydropower Project",
    startDate: "01/01/2025",
    endDate: "01/01/2025",
    status: "Inactive",
    progress: "2/3",
  },
  {
    id: 10,
    name: "Dagachu Monitoring Report",
    description: "Lorem ipsum dolor sit amet, consectetur ...",
    project: "Dagachu Hydropower Project",
    startDate: "01/01/2025",
    endDate: "01/01/2025",
    status: "Inactive",
    progress: "2/3",
  },
];

const statusColors = {
  Ongoing: "text-blue-600 bg-blue-50",
  Completed: "text-green-600 bg-green-50",
  Inactive: "text-gray-600 bg-gray-100",
  Deferred: "text-red-600 bg-red-50",
};

const statusLabels = {
  Ongoing: "Ongoing",
  Completed: "Completed",
  Inactive: "Inactive",
  Deferred: "Deferred",
};

function StatusPill({ status }) {
  return (
    <span
      className={`px-3 py-1 rounded-full text-xs font-semibold ${statusColors[status] || "text-gray-700 bg-gray-100"}`}
    >
      {statusLabels[status] || status}
    </span>
  );
}

// Mock user-owned projects
const userProjects = [
  { id: 1, name: 'Dagachu Hydropower Project' },
  { id: 2, name: 'Bumthang Solar Project' },
  // Add more as needed
];

export default function ProjectImplementation() {
  const router = useRouter();
  const [modalOpen, setModalOpen] = useState(false);
  const [selected, setSelected] = useState(null);
  const [activities, setActivities] = useState([...dummyActivities]);
const [selectedProject, setSelectedProject] = useState('');

  // Add activity if passed via navigation (router state)
  // Only add newActivity after mount to avoid hydration mismatch
  useEffect(() => {
    let added = false;
    if (typeof window !== "undefined" && !added) {
      const nav = window.history.state && window.history.state.options && window.history.state.options.state;
      if (nav && nav.newActivity) {
        setActivities(prev => [nav.newActivity, ...prev]);
        window.history.replaceState({ ...window.history.state, options: { ...window.history.state.options, state: {} } }, '');
        added = true;
      }
    }
  }, []);

  // Helper to add activity from UI (future use)
  const addActivity = (activity) => setActivities(prev => [activity, ...prev]);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const filtered = activities.filter(a => {
  // If a project is selected, filter by project ownership
  if (selectedProject) {
    return (
      (a.project === userProjects.find(p => p.id === Number(selectedProject))?.name) &&
      (
        a.name.toLowerCase().includes(search.toLowerCase()) ||
        a.description.toLowerCase().includes(search.toLowerCase()) ||
        a.project.toLowerCase().includes(search.toLowerCase())
      )
    );
  }
  // If no project selected, show all
  return (
    a.name.toLowerCase().includes(search.toLowerCase()) ||
    a.description.toLowerCase().includes(search.toLowerCase()) ||
    a.project.toLowerCase().includes(search.toLowerCase())
  );
});

  const total = filtered.length;
  const pageCount = Math.ceil(total / rowsPerPage);
  const paginated = filtered.slice((page - 1) * rowsPerPage, page * rowsPerPage);

  const handlePrev = () => setPage(prev => Math.max(prev - 1, 1));
  const handleNext = () => setPage(prev => Math.min(prev + 1, pageCount));
  const handleRowsPerPage = e => {
    setRowsPerPage(Number(e.target.value));
    setPage(1);
  };

  return (
    <div className="bg-white rounded-xl shadow p-6 w-full">
      <div className="flex flex-col gap-4 mb-6">
        {/* Project Select Dropdown */}
        <div>
          <label htmlFor="project-select" className="block mb-1 text-black font-medium">Project</label>
          <select
            id="project-select"
            value={selectedProject}
            onChange={e => setSelectedProject(e.target.value)}
            className="border border-gray-300 rounded px-3 py-2 text-black w-full max-w-xl bg-white focus:outline-none"
          >
            <option value="">Select Project</option>
            {userProjects.map(project => (
              <option key={project.id} value={project.id}>{project.name}</option>
            ))}
          </select>
        </div>
        <div className="flex items-center justify-between">
          {/* The rest of the action row (search, add button) remains unchanged */}

        <div className="flex items-center gap-3">
          <button className="p-2 rounded bg-gray-100 border border-gray-200 flex items-center justify-center" aria-label="Filter">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="#222F3E" xmlns="http://www.w3.org/2000/svg">
              <path d="M3 5a1 1 0 0 1 1-1h16a1 1 0 0 1 .8 1.6l-6.6 8.8V19a1 1 0 0 1-2 0v-4.6L4.2 6.6A1 1 0 0 1 5 5z"/>
            </svg>
          </button>
          <input
            type="text"
            placeholder="Search..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="border border-gray-200 rounded px-3 py-2 text-sm w-64 focus:outline-none focus:ring-2 focus:ring-green-200 text-black"
          />
        </div>
        <button
  className="bg-[#32623A] text-white px-5 py-2 rounded font-semibold flex items-center gap-2 hover:bg-[#29512f] transition-colors"
  onClick={() => router.push("/projectimplementation/addactivity/projectdocuments")}
>
  <span>+ Add New Activity</span>
</button>
      </div>
    </div>
    <div className="overflow-x-auto">
        <table className="min-w-full text-sm border-separate border-spacing-y-2 text-black">
          <thead>
            <tr className="text-[#8C8C8C] text-xs uppercase">
              <th className="px-2 py-3 text-left text-black">#</th>
              <th className="px-2 py-3 text-left text-black">Activity Name</th>
              <th className="px-2 py-3 text-left text-black">Description</th>
              <th className="px-2 py-3 text-left text-black">Project</th>
              <th className="px-2 py-3 text-left text-black">Start Date</th>
              <th className="px-2 py-3 text-left text-black">End Date</th>
              <th className="px-2 py-3 text-left text-black">Status</th>
              <th className="px-2 py-3 text-left text-black">Progress</th>
              <th className="px-2 py-3 text-left text-black">Action</th>
            </tr>
          </thead>
          <tbody>
            {paginated.map((activity, idx) => (
              <tr key={activity.id} className="bg-white hover:bg-gray-50 shadow-sm rounded">
                <td className="px-2 py-2 font-medium text-black">{(page - 1) * rowsPerPage + idx + 1}</td>
                <td className="px-2 py-2 text-black">{activity.name}</td>
                <td className="px-2 py-2 max-w-[180px] truncate text-black">{activity.description}</td>
                <td className="px-2 py-2 text-black">{activity.project}</td>
                <td className="px-2 py-2 text-black">{activity.startDate}</td>
                <td className="px-2 py-2 text-black">{activity.endDate}</td>
                <td className="px-2 py-2 text-black"><StatusPill status={activity.status} /></td>
                <td className="px-2 py-2 text-black">{activity.progress}</td>
                <td className="px-2 py-2 text-black">
                  <button
                    className="border border-gray-300 rounded px-4 py-1 text-xs font-semibold hover:bg-gray-100 transition-colors"
                    onClick={() => { setSelected(activity); setModalOpen(true); }}
                  >
                    view
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="flex items-center justify-between mt-4 text-xs text-gray-500">
          <span>{total === 0 ? 0 : ((page - 1) * rowsPerPage + 1)}-{Math.min(page * rowsPerPage, total)} of {total}</span>
          <div className="flex items-center gap-2">
            <span>Rows per page:</span>
            <select
              value={rowsPerPage}
              onChange={handleRowsPerPage}
              className="border border-gray-300 rounded px-1 py-0.5 text-black bg-white"
            >
              {[5, 10, 20, 50].map(n => (
                <option key={n} value={n}>{n}</option>
              ))}
            </select>
            <button
              onClick={handlePrev}
              disabled={page === 1}
              className={`mx-2 px-2 py-1 rounded ${page === 1 ? 'text-gray-300' : 'text-black hover:bg-gray-100'}`}
              aria-label="Previous Page"
            >
              &lt;
            </button>
            <span className="mx-1">{page}/{pageCount || 1}</span>
            <button
              onClick={handleNext}
              disabled={page === pageCount || pageCount === 0}
              className={`mx-2 px-2 py-1 rounded ${page === pageCount || pageCount === 0 ? 'text-gray-300' : 'text-black hover:bg-gray-100'}`}
              aria-label="Next Page"
            >
              &gt;
            </button>
          </div>
        </div>
      {modalOpen && selected && (
      <div
        className="fixed inset-0 bg-[#F4F6F2]/80 backdrop-blur-sm flex items-center justify-center z-50"
        onClick={() => setModalOpen(false)}
      >
        <div
          className="bg-white rounded-lg shadow-lg w-full max-w-md p-6 relative"
          onClick={e => e.stopPropagation()}
        >
          <button
            className="absolute top-2 right-2 text-gray-400 hover:text-black text-xl font-bold"
            onClick={() => setModalOpen(false)}
            aria-label="Close"
          >
            &times;
          </button>
          <h2 className="text-xl font-bold mb-4 text-black">Activity Details</h2>
          <div className="space-y-2 text-black">
            <div><span className="font-semibold">Name:</span> {selected.name}</div>
            <div><span className="font-semibold">Description:</span> {selected.description}</div>
            <div><span className="font-semibold">Project:</span> {selected.project}</div>
            <div><span className="font-semibold">Start Date:</span> {selected.startDate}</div>
            <div><span className="font-semibold">End Date:</span> {selected.endDate}</div>
            <div><span className="font-semibold">Status:</span> <StatusPill status={selected.status} /></div>
            <div><span className="font-semibold">Progress:</span> {selected.progress}</div>
          </div>
        </div>
      </div>
    )}
    </div>
    </div>
  );
}



