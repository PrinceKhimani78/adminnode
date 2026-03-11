"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import Sidebar from "../Common/Sidebar";
import AdminHeader from "../Common/AdminHeader";
import { FaEye, FaTrash, FaEdit } from "react-icons/fa";
import { FiChevronRight } from "react-icons/fi";
import { useAuth } from "@/context/AuthContext";

interface Job {
  id: string;
  title: string;
  description: string;
  requirements: string;
  location: string;
  job_category: string;
  employment_type: string;
  salary_min?: number;
  salary_max?: number;
  exp_min?: number;
  exp_max?: number;
  company_name?: string;
  perks_and_benefits?: string;
  created_at: string;
  status: 'Active' | 'Expired' | 'Draft';
}

const Managejobs = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [showViewModal, setShowViewModal] = useState(false);
  const [jobToDelete, setJobToDelete] = useState<string | null>(null);
  const [selectedJob, setSelectedJob] = useState<Job | null>(null);

  const { token, isAuthenticated, user } = useAuth();
  const [allJobs, setAllJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState(true);

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const [entries, setEntries] = useState(10);

  // Search state
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    fetchJobs();
  }, [token, isAuthenticated]);

  const fetchJobs = async () => {
    if (!isAuthenticated || !token) {
      setLoading(false);
      return;
    }

    try {
      const backendUrl = process.env.NEXT_PUBLIC_BACKEND_API_URL || "https://api.rojgariindia.com/api";
      const response = await fetch(`${backendUrl}/jobs/recruiter`, {
        headers: {
          "Authorization": `Bearer ${token}`
        }
      });
      const data = await response.json();
      if (data.success) {
        setAllJobs(data.data);
      } else {
        console.error("Failed to fetch jobs:", data.message);
      }
    } catch (error) {
      console.error("Error fetching jobs:", error);
    } finally {
      setLoading(false);
    }
  };


  // Filtering by search term
  const filteredJobs = allJobs.filter((job) =>
    job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    job.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
    job.job_category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Pagination logic
  const totalPages = Math.ceil(filteredJobs.length / entries);
  const startIndex = (currentPage - 1) * entries;
  const endIndex = startIndex + entries;
  const currentJobs = filteredJobs.slice(startIndex, endIndex);

  const handleEntriesChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setEntries(Number(e.target.value));
    setCurrentPage(1); // Reset to first page
  };

  const handlePrev = () => {
    if (currentPage > 1) setCurrentPage((prev) => prev - 1);
  };
  const handleNext = () => {
    if (currentPage < totalPages) setCurrentPage((prev) => prev + 1);
  };

  // Delete Job Actions
  const confirmDeleteJob = (id: string) => {
    setJobToDelete(id);
    setShowModal(true);
  };

  const handleDeleteJob = async () => {
    if (jobToDelete !== null && token) {
      try {
        const backendUrl = process.env.NEXT_PUBLIC_BACKEND_API_URL || "https://api.rojgariindia.com/api";
        // For now we just implement status update to inactive as specified in backend
        const response = await fetch(`${backendUrl}/jobs/${jobToDelete}/status`, {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          },
          body: JSON.stringify({ is_active: false })
        });
        const data = await response.json();
        if (data.success) {
          // Optimistically remove from UI
          const updatedList = allJobs.filter((job) => job.id !== jobToDelete);
          setAllJobs(updatedList);
          setShowModal(false);
          setJobToDelete(null);
        } else {
          alert(data.message || "Failed to delete job");
        }
      } catch (error) {
        console.error("Error deleting job", error);
        alert("An error occurred while deleting the job.");
      }
    }
  };

  const formatDate = (dateString: string) => {
    try {
      return new Date(dateString).toLocaleDateString('en-GB');
    } catch {
      return "N/A";
    }
  };

  const handleViewJob = (job: Job) => {
    setSelectedJob(job);
    setShowViewModal(true);
  };

  const handleEditJob = (id: string) => {
    window.location.href = (`/admin/edit-job/${id}`);
  };

  return (
    <>
      <div className="pl-2 pr-4 sm:px-2 py-2 flex gap-3 sm:gap-4 my-10 relative">
        <Sidebar mobileOpen={mobileOpen} setMobileOpen={setMobileOpen} />
        <main className="flex-1 px-5 py-5 min-w-0 bg-white shadow rounded-lg space-y-6 overflow-hidden">
          {/* Header */}
          <AdminHeader />
          <div className="border-b pb-4">
            <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-2">
              <div className="flex items-center gap-2">
                <div className="w-1.5 h-6 bg-[#00c9ff] rounded-full"></div>
                <h1 className="text-xl sm:text-2xl font-bold text-gray-800">
                  Manage <span className="text-gray-500">Jobs</span>
                </h1>
              </div>

              {/* Breadcrumbs */}
              <nav aria-label="Breadcrumb" className="hidden sm:block text-sm text-gray-500 text-center sm:text-right">
                <ol className="flex items-center justify-center sm:justify-end gap-2 flex-wrap">
                  <li className="flex items-center gap-2">
                    <Link href="/dashboard" className="hover:text-gray-700 transition">Dashboard</Link>
                    <FiChevronRight />
                  </li>
                  <li>
                    <span className="text-gray-700 font-medium">Manage Jobs</span>
                  </li>
                </ol>
              </nav>
            </div>
            {user?.role === 'recruiter' && (
              <p className="text-sm text-gray-500 mt-2">Managing jobs for {user.companyName}</p>
            )}
          </div>

          {/* Controls: Entries and Search */}
          <div className="flex flex-col sm:flex-row justify-between gap-3">
            <div className="flex items-center gap-2">
              <span className="text-sm text-gray-600">Show</span>
              <select
                className="border rounded px-2 py-1 text-sm bg-white"
                value={entries}
                onChange={handleEntriesChange}
              >
                <option value={10}>10</option>
                <option value={15}>15</option>
                <option value={20}>20</option>
              </select>
              <span className="text-sm text-gray-600">entries</span>
            </div>
            <div>
              <input
                type="text"
                placeholder="Search jobs..."
                className="w-full sm:w-64 p-2 rounded bg-white text-sm placeholder-slate-400 ring-1 ring-gray-300 transition focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#00c9ff]"
                value={searchTerm}
                onChange={(e) => {
                  setSearchTerm(e.target.value);
                  setCurrentPage(1);
                }}
              />
            </div>
          </div>

          {/* Job List */}
          <div className="space-y-4">
            {loading ? (
              <div className="text-center py-10">Loading jobs...</div>
            ) : currentJobs.length === 0 ? (
              <div className="text-center py-10 text-gray-500 border border-dashed border-gray-300 rounded-lg">
                No jobs found.
              </div>
            ) : (
              currentJobs.map((job) => (
                <div
                  key={job.id}
                  className="flex flex-col sm:flex-row sm:items-center justify-between border border-gray-200 rounded-lg p-4 shadow-sm bg-white hover:bg-gray-50 transition"
                >
                  {/* Job Info */}
                  <div className="flex gap-4 items-start sm:items-center flex-1">
                    <div className="w-12 h-12 bg-blue-100 text-blue-600 rounded flex items-center justify-center font-bold text-xl shrink-0">
                      {job.title.charAt(0)}
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-[#00c9ff] cursor-pointer hover:underline">
                        {job.title}
                      </h3>
                      <p className="text-sm text-gray-500">{job.location}</p>
                      <p className="text-sm text-gray-700 mt-1">
                        <span className="font-medium text-gray-500">Category:</span> {job.job_category}
                      </p>
                    </div>
                  </div>

                  {/* Job Meta & Actions */}
                  <div className="flex flex-col sm:flex-row sm:items-center gap-4 mt-4 sm:mt-0">
                    <span className="px-3 py-1 rounded bg-[#e8f8fd] text-[#00c9ff] border border-[#b3ebfa] text-xs font-semibold whitespace-nowrap text-center">
                      {job.employment_type}
                    </span>

                    <div className="text-xs text-gray-500 whitespace-nowrap">
                      <p><span className="font-medium">Created:</span> {formatDate(job.created_at)}</p>
                      <p className="mt-1"><span className="font-medium">Status:</span>
                        <span className={(job.status === 'Active') ? "text-green-600 ml-1" : "text-red-500 ml-1"}>
                          {job.status || "Closed"}
                        </span>
                      </p>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex gap-2 sm:ml-4 border-t sm:border-t-0 sm:border-l border-gray-200 pt-3 sm:pt-0 sm:pl-4 justify-end">
                      <button 
                        onClick={() => handleViewJob(job)}
                        className="p-2 text-gray-400 hover:text-[#00c9ff] hover:bg-blue-50 rounded transition" 
                        title="View details"
                      >
                        <FaEye />
                      </button>
                      <button 
                        onClick={() => handleEditJob(job.id)}
                        className="p-2 text-gray-400 hover:text-green-500 hover:bg-green-50 rounded transition" 
                        title="Edit job"
                      >
                        <FaEdit />
                      </button>
                      <button
                        onClick={() => confirmDeleteJob(job.id)}
                        className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded transition"
                        title="Delete job"
                      >
                        <FaTrash />
                      </button>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Pagination Controls */}
          {!loading && filteredJobs.length > 0 && (
            <div className="flex flex-col sm:flex-row justify-between items-center text-sm text-gray-600 gap-4 mt-6 pt-4 border-t border-gray-100">
              <p>
                Showing {startIndex + 1} to {Math.min(endIndex, filteredJobs.length)} of {filteredJobs.length} entries
              </p>
              <div className="flex items-center gap-1">
                <button
                  onClick={handlePrev}
                  disabled={currentPage === 1}
                  className={`px-3 py-1.5 border rounded transition ${currentPage === 1
                    ? "bg-gray-50 text-gray-400 cursor-not-allowed"
                    : "bg-white text-gray-700 hover:bg-gray-50"
                    }`}
                >
                  Previous
                </button>

                {/* Simple page numbers */}
                <div className="hidden sm:flex gap-1">
                  {[...Array(totalPages)].map((_, index) => {
                    // Only show adjacent pages to keep it clean
                    if (
                      index === 0 ||
                      index === totalPages - 1 ||
                      (index >= currentPage - 2 && index <= currentPage)
                    ) {
                      return (
                        <button
                          key={index}
                          onClick={() => setCurrentPage(index + 1)}
                          className={`w-8 h-8 flex items-center justify-center border rounded transition ${currentPage === index + 1
                            ? "bg-[#00c9ff] text-white border-[#00c9ff]"
                            : "bg-white text-gray-700 hover:bg-gray-50"
                            }`}
                        >
                          {index + 1}
                        </button>
                      );
                    } else if (
                      index === 1 && currentPage > 3 ||
                      index === totalPages - 2 && currentPage < totalPages - 2
                    ) {
                      return <span key={index} className="px-1 text-gray-400">...</span>;
                    }
                    return null;
                  })}
                </div>

                <button
                  onClick={handleNext}
                  disabled={currentPage === totalPages}
                  className={`px-3 py-1.5 border rounded transition ${currentPage === totalPages
                    ? "bg-gray-50 text-gray-400 cursor-not-allowed"
                    : "bg-white text-gray-700 hover:bg-gray-50"
                    }`}
                >
                  Next
                </button>
              </div>
            </div>
          )}
        </main>

        {/* Delete Confirmation Modal */}
        {showModal && (
          <div className="fixed inset-0 flex items-center justify-center bg-black/40 z-50 backdrop-blur-sm">
            <div className="bg-white rounded-xl shadow-2xl w-[90%] max-w-sm relative transform transition-all">
              <button
                onClick={() => setShowModal(false)}
                className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition"
              >
                ✕
              </button>
              <div className="p-8 text-center">
                <div className="w-16 h-16 bg-red-100 text-red-500 rounded-full flex items-center justify-center mx-auto mb-4 text-2xl">
                  <FaTrash />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">Delete Job Post</h3>
                <p className="text-gray-500 mb-6 text-sm">
                  Are you sure you want to close and remove this job posting? This action cannot be undone.
                </p>
                <div className="flex justify-center gap-3">
                  <button
                    onClick={() => setShowModal(false)}
                    className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleDeleteJob}
                    className="flex-1 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 shadow-sm transition"
                  >
                    Delete Job
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
        {/* View Job Modal */}
        {showViewModal && selectedJob && (
          <div className="fixed inset-0 flex items-center justify-center bg-black/40 z-50 backdrop-blur-sm">
            <div className="bg-white rounded-xl shadow-2xl w-[95%] max-w-2xl relative transform transition-all max-h-[90vh] overflow-y-auto">
              <button
                onClick={() => setShowViewModal(false)}
                className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition p-2 hover:bg-gray-100 rounded-full"
              >
                ✕
              </button>
              
              <div className="p-6 sm:p-8">
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-16 h-16 bg-blue-100 text-blue-600 rounded-lg flex items-center justify-center font-bold text-2xl">
                    {selectedJob.title.charAt(0)}
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-gray-900">{selectedJob.title}</h3>
                    <p className="text-gray-500">{selectedJob.location} • {selectedJob.job_category}</p>
                  </div>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
                  <div className="p-3 bg-gray-50 rounded-lg">
                    <p className="text-xs text-gray-500 uppercase font-semibold mb-1">Type</p>
                    <p className="text-sm font-medium">{selectedJob.employment_type}</p>
                  </div>
                  <div className="p-3 bg-gray-50 rounded-lg">
                    <p className="text-xs text-gray-500 uppercase font-semibold mb-1">Salary</p>
                    <p className="text-sm font-medium">
                      {selectedJob.salary_min && selectedJob.salary_max 
                        ? `₹${selectedJob.salary_min} - ₹${selectedJob.salary_max}` 
                        : "Not specified"}
                    </p>
                  </div>
                  <div className="p-3 bg-gray-50 rounded-lg">
                    <p className="text-xs text-gray-500 uppercase font-semibold mb-1">Experience</p>
                    <p className="text-sm font-medium">
                      {selectedJob.exp_min !== undefined && selectedJob.exp_max !== undefined 
                        ? `${selectedJob.exp_min} - ${selectedJob.exp_max} Yrs` 
                        : "Not specified"}
                    </p>
                  </div>
                  <div className="p-3 bg-gray-50 rounded-lg">
                    <p className="text-xs text-gray-500 uppercase font-semibold mb-1">Status</p>
                    <p className={`text-sm font-bold ${selectedJob.status === 'Active' ? "text-green-600" : "text-red-500"}`}>{selectedJob.status}</p>
                  </div>
                </div>

                <div className="space-y-6">
                  <div>
                    <h4 className="text-lg font-bold text-gray-800 mb-2 border-l-4 border-[#00c9ff] pl-3">Job Description</h4>
                    <div className="text-gray-600 text-sm leading-relaxed whitespace-pre-wrap">
                      {selectedJob.description}
                    </div>
                  </div>

                  {selectedJob.requirements && (
                    <div>
                      <h4 className="text-lg font-bold text-gray-800 mb-2 border-l-4 border-[#00c9ff] pl-3">Requirements</h4>
                      <div className="text-gray-600 text-sm leading-relaxed whitespace-pre-wrap">
                        {selectedJob.requirements}
                      </div>
                    </div>
                  )}
                </div>

                <div className="mt-8 pt-6 border-t border-gray-100 flex justify-between items-center">
                  <span className="text-xs text-gray-400">Created on {formatDate(selectedJob.created_at)}</span>
                  <button
                    onClick={() => setShowViewModal(false)}
                    className="px-6 py-2 bg-gray-900 text-white rounded-lg hover:bg-gray-800 transition shadow-md font-medium"
                  >
                    Close
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default Managejobs;
