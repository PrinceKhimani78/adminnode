"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import Sidebar from "../Common/Sidebar";
import { FaEye, FaEnvelope, FaTrash, FaMapMarkerAlt } from "react-icons/fa";
import { IoChevronForward } from "react-icons/io5";
import { FiChevronRight } from "react-icons/fi";
import { RxCross2 } from "react-icons/rx";
import { FaSearch } from "react-icons/fa";

// Define candidate interface based on API response
interface Candidate {
  id: string;
  full_name: string;
  surname: string;
  email: string;
  mobile_number: string;
  district: string;
  city: string;
  village: string;
  total_experience_years: number;
  expected_salary_min: number;
  expected_salary_max: number;
  profile_photo?: string;
  created_at: string;
  updated_at: string;
  status: string;
  position?: string;
  job_category?: string;
  gender?: string;
  date_of_birth?: string;
  marital_status?: string;
  alternate_mobile_number?: string;
  address?: string;
  current_location?: string;
  interview_availability?: string;
  preferred_shift?: string;
  resume?: string;
  fresher?: boolean;
  work_experience?: {
    id?: string;
    position: string;
    company: string;
    start_date: string;
    end_date?: string;
    is_current: boolean;
    salary_period?: string; // This corresponds to Notice Period
    current_wages?: number;
    current_city?: string;
    current_village?: string;
  }[];
  summary?: string;
  additional_info?: string;
  availability_start?: string;
  education?: {
    degree: string;
    university: string;
    passing_year: string;
  }[];
  skills?: {
    skill_name: string;
    years_of_experience: string;
    level?: string;
  }[];
}

const Candidateslist = () => {
  const [candidates, setCandidates] = useState<Candidate[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [showPopup, setShowPopup] = useState(false);
  // Lock body scroll when popup is open
  useEffect(() => {
    if (!showPopup) return;
    const { body } = document;
    const prevOverflow = body.style.overflow;
    const prevPaddingRight = body.style.paddingRight;

    // prevent layout shift when hiding scrollbar
    const scrollbar = window.innerWidth - document.documentElement.clientWidth;
    body.style.overflow = "hidden";
    if (scrollbar > 0) body.style.paddingRight = `${scrollbar}px`;

    return () => {
      body.style.overflow = prevOverflow;
      body.style.paddingRight = prevPaddingRight;
    };
  }, [showPopup]);

  // Fetch real data
  useEffect(() => {
    const fetchCandidates = async () => {
      try {
        const response = await fetch("https://api.rojgariindia.com/api/candidate-profile?limit=100");
        const data = await response.json();
        if (data.success && data.data && data.data.profiles) {
          setCandidates(data.data.profiles);
        } else {
          console.error("Invalid data format:", data);
        }
      } catch (err) {
        console.error("Error fetching candidates:", err);
        setError("Failed to load candidates");
      } finally {
        setLoading(false);
      }
    };

    fetchCandidates();
  }, []);

  const [mobileOpen, setMobileOpen] = React.useState(false);
  // const [entries, setEntries] = useState(10); // Simplified for now
  const [currentPage, setCurrentPage] = useState(1);
  const [showModal, setShowModal] = useState(false);
  const entries = 10;

  // Filter candidates locally for now
  const [selectedKeywords, setSelectedKeywords] = useState<string[]>([]);

  // Filter logic (basic)
  const [selectedCandidate, setSelectedCandidate] = useState<Candidate | null>(null);
  const [showDetailsModal, setShowDetailsModal] = useState(false);

  const handleViewCandidate = (candidate: Candidate) => {
    setSelectedCandidate(candidate);
    setShowDetailsModal(true);
  };

  const filteredCandidates = candidates.filter(c => {
    if (selectedKeywords.length === 0) return true;
    const searchString = `${c.full_name} ${c.position || ''} ${c.status}`.toLowerCase();
    return selectedKeywords.some(k => searchString.includes(k.toLowerCase()));
  });

  const totalPages = Math.ceil(filteredCandidates.length / entries);
  const startIndex = (currentPage - 1) * entries;
  const endIndex = startIndex + entries;
  const currentCandidates = filteredCandidates.slice(startIndex, endIndex);

  const handlePrev = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  const handleNext = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };

  const handleEntriesChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    // setEntries(Number(e.target.value));
    setCurrentPage(1);
  };

  const keywords = [
    "Active",
    "Experience",
    "Fresher",
  ];

  const handleKeywordClick = (keyword: string) => {
    if (!selectedKeywords.includes(keyword)) {
      setSelectedKeywords([...selectedKeywords, keyword]);
    }
  };
  return (
    <>
      <div className="pl-2 pr-4 sm:px-2 py-2 flex gap-3 sm:gap-4 my-10 relative">
        {/* Sidebar */}
        <Sidebar mobileOpen={mobileOpen} setMobileOpen={setMobileOpen} />
        <main className="flex-1 px-5 py-5 min-w-0 bg-white shadow rounded-lg space-y-8">
          {/* Title + Breadcrumb */}
          <div className="border-b pb-4">
            <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-2">
              {/* Mobile toggle button */}
              <div className="flex gap-5 items-center ">
                <IoChevronForward
                  onClick={() => setMobileOpen(true)}
                  className="text-[white] text-2xl cursor-pointer md:hidden bg-black rounded-full p-1"
                />
                <h1
                  className="fontAL font-semibold capitalize text-xl md:text-2xl lg:text-3xl "
                  style={{
                    letterSpacing: "1px",
                    wordSpacing: "2px",
                    lineHeight: 1.2,
                  }}
                >
                  Candidates List
                </h1>
              </div>
              {/* Breadcrumbs */}
              <nav
                aria-label="Breadcrumb"
                className="hidden sm:block text-sm text-gray-500 text-center sm:text-right"
              >
                <ol className="flex items-center justify-center sm:justify-end gap-2 flex-wrap">
                  <li className="flex items-center gap-2">
                    <Link href="/" className="hover:text-gray-700 transition">
                      Home
                    </Link>
                    <FiChevronRight />
                  </li>
                  <li>
                    <span className="text-gray-700 font-medium">
                      All Candidates
                    </span>
                  </li>
                </ol>
              </nav>
            </div>
          </div>

          {/* Profile */}
          <div className="flex items-center gap-4">
            <Image
              src="/images/profile1.webp"
              alt="Profile"
              width={80}
              height={80}
              className="rounded-full border"
              unoptimized={true}
            />
            <div>
              <h2 className="text-base sm:text-lg font-bold">
                Admin User
              </h2>
              <p className="text-gray-500">Administrator</p>
            </div>
          </div>
          {/* Table Container */}
          <div className="bg-white shadow rounded-lg p-5">
            {/* Top Controls */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-4 gap-3">
              <div className="flex items-center gap-2">
                <label htmlFor="entries" className="text-sm text-gray-600">
                  Show
                </label>
                <select
                  id="entries"
                  value={entries}
                  onChange={handleEntriesChange}
                  className="border rounded px-2 py-1 text-sm focus:ring-2 focus:ring-[#00C9FF]"
                >
                  <option value={5}>5</option>
                  <option value={10}>10</option>
                  <option value={20}>20</option>
                </select>
                <span className="text-sm text-gray-600">entries</span>
              </div>
              <div>
                <input
                  type="text"
                  placeholder="Search..."
                  className="w-full p-2 rounded bg-white text-sm placeholder-slate-400 ring-1 ring-gray-400 
      transition focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#00c9ff]"
                />
              </div>
            </div>

            {/* Table Header (desktop only) */}
            <div className="hidden sm:grid grid-cols-7 font-semibold text-sm text-gray-600 border-b py-2">
              <div className="px-3">
                <input type="checkbox" />
              </div>
              <div className="px-3">Name</div>
              <div className="px-3">Mobile</div>
              <div className="px-3">Location</div>
              <div className="px-3">Experience</div>
              <div className="px-3">Status</div>
              <div className="px-3 text-center col-span-1">Actions</div>
            </div>

            {loading ? <div className="p-10 text-center">Loading candidates...</div> : currentCandidates.map((c, i) => (
              <div
                key={c.id}
                className={`border-b ${i % 2 === 0 ? "bg-white" : "bg-gray-50"
                  }`}
              >
                {/* Desktop Grid */}
                <div className="hidden sm:grid grid-cols-7 items-center text-sm">
                  <div className="px-3 py-3">
                    <input type="checkbox" />
                  </div>
                  <div className="flex items-center gap-3 px-3 py-3">
                    {c.profile_photo ? (
                      <img
                        src={`https://api.rojgariindia.com/uploads/${c.profile_photo}`}
                        alt={c.full_name}
                        width={40}
                        height={40}
                        className="rounded-full border object-cover w-10 h-10"
                        referrerPolicy="no-referrer"
                        loading="lazy"
                      />
                    ) : (
                      <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center text-xs font-bold text-gray-500">
                        {c.full_name?.charAt(0) || 'U'}
                      </div>
                    )}
                    <div>
                      <p className="font-semibold text-slate-950">{c.full_name} {c.surname}</p>
                      <p className="text-xs text-gray-500">{c.email}</p>
                    </div>
                  </div>
                  <div className="px-3 py-3">{c.mobile_number}</div>
                  <div className="px-3 py-3">
                    <p className="flex items-center gap-1">
                      <FaMapMarkerAlt className="text-[#00c9ff] text-xs" />
                      {c.district || c.city}, {c.village ? c.village : ''}
                    </p>
                  </div>
                  <div className="px-3 py-3 font-medium">
                    {c.total_experience_years ? `${c.total_experience_years} Years` : 'Fresher'}
                  </div>
                  <div className="px-3 py-3">
                    <span className={`px-2 py-1 rounded text-xs font-semibold ${c.status === 'Active' ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-700'
                      }`}>
                      {c.status || 'Active'}
                    </span>
                  </div>
                  <div className="flex gap-3 px-3 py-3 justify-center col-span-1">
                    <button
                      onClick={() => handleViewCandidate(c)}
                      className="text-[#00C9FF] hover:text-blue-700"
                      title="View Details"
                    >
                      <FaEye />
                    </button>
                    {/* <button className="text-[#00C9FF] hover:text-blue-700">
                      <FaEnvelope />
                    </button>
                    <button className="text-[#00C9FF] hover:text-blue-700">
                      <FaTrash />
                    </button> */}
                  </div>
                </div>

                {/* Mobile Card */}
                <div className="sm:hidden px-3 py-4 space-y-2">
                  <div className="flex items-center gap-3 px-3 py-3">
                    {c.profile_photo ? (
                      <img
                        src={`https://api.rojgariindia.com/uploads/${c.profile_photo}`}
                        alt={c.full_name}
                        width={40}
                        height={40}
                        className="rounded-full border object-cover w-10 h-10"
                        referrerPolicy="no-referrer"
                        loading="lazy"
                      />
                    ) : (
                      <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center text-xs font-bold text-gray-500">
                        {c.full_name?.charAt(0) || 'U'}
                      </div>
                    )}
                    <div>
                      <p className="font-semibold text-slate-950">{c.full_name}</p>
                      <p className="text-xs text-gray-500 flex items-center gap-1">
                        <FaMapMarkerAlt className="text-[#00c9ff]" />{" "}
                        {c.district || c.city}
                      </p>
                    </div>
                  </div>
                  <p className="text-sm">
                    <span className="font-semibold">Mobile: </span>
                    {c.mobile_number}
                  </p>
                  <p className="text-sm text-gray-500">
                    <span className="font-semibold">Experience: </span>
                    {c.total_experience_years ? `${c.total_experience_years} Years` : 'Fresher'}
                  </p>
                  <p>
                    <span className="font-semibold">Status: </span>
                    <span className={`px-2 py-1 rounded text-xs font-semibold ${c.status === 'Active' ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-700'
                      }`}>
                      {c.status || 'Active'}
                    </span>
                  </p>
                  <div className="flex gap-4 justify-start mt-2">
                    <button
                      onClick={() => handleViewCandidate(c)}
                      className="text-[#00C9FF] hover:text-blue-700"
                    >
                      <FaEye />
                    </button>
                  </div>
                </div>
              </div>
            ))}

            {/* pagination */}
            <div className="flex flex-col sm:flex-row justify-between items-center text-sm text-gray-600 gap-2 mt-5">
              <p>
                Showing {startIndex + 1} to{" "}
                {endIndex > filteredCandidates.length ? filteredCandidates.length : endIndex} of{" "}
                {filteredCandidates.length} entries
              </p>
              <div className="flex items-center gap-1">
                <button
                  onClick={handlePrev}
                  disabled={currentPage === 1}
                  className={`px-3 py-1 border rounded cursor-pointer ${currentPage === 1
                    ? "bg-gray-200 text-gray-400 cursor-not-allowed"
                    : "bg-gray-100"
                    }`}
                >
                  Previous
                </button>

                {[...Array(totalPages)].map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentPage(index + 1)}
                    className={`px-3 py-1 border rounded cursor-pointer ${currentPage === index + 1
                      ? "bg-[#023052] text-white"
                      : "bg-gray-100 text-gray-700"
                      }`}
                  >
                    {index + 1}
                  </button>
                ))}

                <button
                  onClick={handleNext}
                  disabled={currentPage === totalPages}
                  className={`px-3 py-1 border rounded cursor-pointer ${currentPage === totalPages
                    ? "bg-gray-200 text-gray-400 cursor-not-allowed"
                    : "bg-gray-100"
                    }`}
                >
                  Next
                </button>
              </div>
            </div>
          </div>
        </main>

        {/* Delete modal */}
        {showModal && (
          <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50">
            <div className="bg-white rounded-lg shadow-lg w-[90%] max-w-md relative">
              <button
                onClick={() => setShowModal(false)}
                className="absolute top-3 right-4 text-gray-400 hover:text-black text-xl font-bold"
              >
                ×
              </button>
              <div className="px-6 py-8 text-center">
                <p className="text-lg font-medium mb-6">
                  Do you want to delete your profile?
                </p>
                <div className="flex justify-center gap-4">
                  <button
                    onClick={() => setShowModal(false)}
                    className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
                  >
                    No
                  </button>
                  <button
                    onClick={async () => {
                      try {
                        const res = await fetch("/api/delete-profile", {
                          method: "DELETE",
                        });
                        if (res.ok) {
                          console.log("Profile deleted successfully");
                        } else {
                          console.error("Failed to delete profile");
                        }
                      } catch (err) {
                        console.error("Error deleting profile", err);
                      }
                      setShowModal(false);
                    }}
                    className="px-6 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition"
                  >
                    Yes
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Candidate Details Modal */}
        {showDetailsModal && selectedCandidate && (
          <div className="fixed inset-0 flex items-center justify-center bg-black/60 z-[9999] animate-fadeIn p-4 overflow-y-auto">
            <div className="bg-white rounded-xl shadow-2xl w-full max-w-2xl relative flex flex-col max-h-[90vh]">
              {/* Header */}
              <div className="flex items-center justify-between p-5 border-b sticky top-0 bg-white rounded-t-xl z-10">
                <h2 className="text-xl font-bold text-gray-800">Candidate Details</h2>
                <button
                  onClick={() => setShowDetailsModal(false)}
                  className="text-gray-400 hover:text-gray-600 transition"
                >
                  <RxCross2 size={24} />
                </button>
              </div>

              {/* Content */}
              <div className="p-6 overflow-y-auto">
                {/* Header Profile Section */}
                <div className="flex flex-col sm:flex-row gap-6 items-center sm:items-start mb-8 border-b pb-6">
                  {selectedCandidate.profile_photo ? (
                    <img
                      src={`https://api.rojgariindia.com/uploads/${selectedCandidate.profile_photo}`}
                      alt={selectedCandidate.full_name}
                      width={100}
                      height={100}
                      className="rounded-full border-4 border-gray-100 object-cover shadow-sm w-24 h-24"
                      referrerPolicy="no-referrer"
                      loading="lazy"
                    />
                  ) : (
                    <div className="w-24 h-24 rounded-full bg-gray-200 flex items-center justify-center text-2xl font-bold text-gray-500 shadow-sm">
                      {selectedCandidate.full_name?.charAt(0) || 'U'}
                    </div>
                  )}
                  <div className="text-center sm:text-left flex-1">
                    <h3 className="text-2xl font-bold text-gray-900">{selectedCandidate.full_name} {selectedCandidate.surname}</h3>
                    <p className="text-gray-500 font-medium">{selectedCandidate.job_category || selectedCandidate.position || 'Job Seeker'}</p>
                    <div className="flex flex-wrap gap-2 mt-2 justify-center sm:justify-start">
                      <span className={`inline-block px-3 py-1 rounded-full text-xs font-semibold ${selectedCandidate.status === 'Active' ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-700'}`}>
                        {selectedCandidate.status || 'Active'}
                      </span>
                      {selectedCandidate.resume && (
                        <a
                          href={`https://api.rojgariindia.com/uploads/${selectedCandidate.resume}`}
                          target="_blank"
                          rel="noreferrer"
                          className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-semibold bg-blue-50 text-blue-700 hover:bg-blue-100 transition"
                        >
                          Download Resume
                        </a>
                      )}
                    </div>
                  </div>
                </div>

                {/* Details Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-6">

                  {/* Contact Info */}
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <h4 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-3">Contact Info</h4>
                    <div className="space-y-2 text-sm">
                      <p><span className="font-medium text-gray-700 w-32 inline-block">Email:</span> {selectedCandidate.email}</p>
                      <p><span className="font-medium text-gray-700 w-32 inline-block">Mobile:</span> {selectedCandidate.mobile_number}</p>
                      {selectedCandidate.alternate_mobile_number && (
                        <p><span className="font-medium text-gray-700 w-32 inline-block">Alt Mobile:</span> {selectedCandidate.alternate_mobile_number}</p>
                      )}
                      <div className="flex">
                        <span className="font-medium text-gray-700 w-32 shrink-0">Address:</span>
                        <span className="break-words flex-1">{selectedCandidate.address || 'N/A'}</span>
                      </div>
                    </div>
                  </div>

                  {/* Personal Details */}
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <h4 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-3">Personal Details</h4>
                    <div className="space-y-2 text-sm">
                      <p><span className="font-medium text-gray-700 w-32 inline-block">Gender:</span> {selectedCandidate.gender || 'N/A'}</p>
                      <p><span className="font-medium text-gray-700 w-32 inline-block">DOB:</span> {selectedCandidate.date_of_birth || 'N/A'}</p>
                      <p><span className="font-medium text-gray-700 w-32 inline-block">Marital Status:</span> {selectedCandidate.marital_status || 'N/A'}</p>
                    </div>
                  </div>

                  {/* Location Info */}
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <h4 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-3">Location</h4>
                    <div className="space-y-2 text-sm">
                      <p><span className="font-medium text-gray-700 w-32 inline-block">District:</span> {selectedCandidate.district || 'N/A'}</p>
                      <p><span className="font-medium text-gray-700 w-32 inline-block">City:</span> {selectedCandidate.city || 'N/A'}</p>
                      <p><span className="font-medium text-gray-700 w-32 inline-block">Village:</span> {selectedCandidate.village || 'N/A'}</p>
                      <p><span className="font-medium text-gray-700 w-32 inline-block">Current Loc:</span> {selectedCandidate.current_location || 'N/A'}</p>
                    </div>
                  </div>

                  {/* Professional Info */}
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <h4 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-3">Professional</h4>
                    <div className="space-y-2 text-sm">
                      <p><span className="font-medium text-gray-700 w-32 inline-block">Status:</span>
                        {selectedCandidate.fresher ? 'Fresher' : 'Experienced'}
                      </p>
                      <p><span className="font-medium text-gray-700 w-32 inline-block">Total Exp:</span> {selectedCandidate.total_experience_years ? `${selectedCandidate.total_experience_years} Years` : '0 Years'}</p>
                      <p><span className="font-medium text-gray-700 w-32 inline-block">Job Category:</span> {selectedCandidate.job_category || 'N/A'}</p>
                      <p><span className="font-medium text-gray-700 w-32 inline-block">Joining Date:</span> {selectedCandidate.availability_start ? new Date(selectedCandidate.availability_start).toLocaleDateString() : 'N/A'}</p>
                    </div>
                  </div>

                  {/* Summary & Additional Info */}
                  <div className="bg-gray-50 p-4 rounded-lg sm:col-span-2">
                    <h4 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-3">Overview</h4>
                    <div className="space-y-3 text-sm">
                      {selectedCandidate.summary && (
                        <div>
                          <p className="font-medium text-gray-700 mb-1">Summary:</p>
                          <p className="text-gray-600 bg-white p-3 rounded border border-gray-100">{selectedCandidate.summary}</p>
                        </div>
                      )}
                      {selectedCandidate.additional_info && (
                        <div>
                          <p className="font-medium text-gray-700 mb-1">Additional Info:</p>
                          <p className="text-gray-600 bg-white p-3 rounded border border-gray-100">{selectedCandidate.additional_info}</p>
                        </div>
                      )}
                      {!selectedCandidate.summary && !selectedCandidate.additional_info && (
                        <p className="text-gray-500 italic">No summary or additional info provided.</p>
                      )}
                    </div>
                  </div>

                  {/* Availability & Salary */}
                  <div className="bg-gray-50 p-4 rounded-lg sm:col-span-2">
                    <h4 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-3">Availability & Expectations</h4>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-2 text-sm">
                      <p><span className="font-medium text-gray-700 w-32 inline-block">Min Salary:</span> ₹{selectedCandidate.expected_salary_min || 0}</p>
                      <p><span className="font-medium text-gray-700 w-32 inline-block">Max Salary:</span> ₹{selectedCandidate.expected_salary_max || 0}</p>
                      <p><span className="font-medium text-gray-700 w-32 inline-block">Availability:</span> {selectedCandidate.interview_availability || 'N/A'}</p>
                      <p><span className="font-medium text-gray-700 w-32 inline-block">Pref. Shift:</span> {selectedCandidate.preferred_shift || 'N/A'}</p>
                    </div>
                  </div>

                  {/* Education Section */}
                  {selectedCandidate.education && selectedCandidate.education.length > 0 && (
                    <div className="bg-gray-50 p-4 rounded-lg sm:col-span-2">
                      <h4 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-3">Education</h4>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        {selectedCandidate.education.map((edu, index) => (
                          <div key={index} className="bg-white p-3 rounded border border-gray-200">
                            <p className="font-bold text-gray-800">{edu.degree}</p>
                            <p className="text-sm text-gray-600">{edu.university}</p>
                            <p className="text-xs text-gray-500 mt-1">Passing Year: {edu.passing_year}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Skills Section */}
                  {selectedCandidate.skills && selectedCandidate.skills.length > 0 && (
                    <div className="bg-gray-50 p-4 rounded-lg sm:col-span-2">
                      <h4 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-3">Skills</h4>
                      <div className="flex flex-wrap gap-2">
                        {selectedCandidate.skills.map((skill, index) => (
                          <span key={index} className="px-3 py-1 bg-white border border-gray-200 rounded-lg text-sm text-gray-700 shadow-sm flex flex-col items-center sm:flex-row sm:gap-2">
                            <span className="font-medium">{skill.skill_name}</span>
                            <span className="text-xs text-gray-500 bg-gray-100 px-1 rounded">
                              {skill.years_of_experience} yrs
                              {skill.level ? ` • ${skill.level}` : ''}
                            </span>
                          </span>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Work Experience Section (Current Salary & Notice Period) */}
                  {selectedCandidate.work_experience && selectedCandidate.work_experience.length > 0 && (
                    <div className="bg-gray-50 p-4 rounded-lg sm:col-span-2">
                      <h4 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-3">Work Experience</h4>
                      <div className="space-y-4">
                        {selectedCandidate.work_experience.map((exp, index) => (
                          <div key={index} className="p-3 bg-white border border-gray-200 rounded-lg shadow-sm">
                            <div className="flex justify-between items-start mb-2">
                              <div>
                                <h5 className="font-bold text-gray-800">{exp.position}</h5>
                                <p className="text-sm text-gray-600">{exp.company}</p>
                              </div>
                              <span className={`px-2 py-1 text-xs rounded font-medium ${exp.is_current ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-500'}`}>
                                {exp.is_current ? 'Current' : 'Previous'}
                              </span>
                            </div>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-sm text-gray-700">
                              <p><span className="font-semibold">Duration:</span> {exp.start_date} - {exp.end_date || 'Present'}</p>
                              {exp.salary_period && <p><span className="font-semibold">Notice Period:</span> {exp.salary_period}</p>}
                              {exp.current_wages && <p><span className="font-semibold">Current Salary:</span> ₹{exp.current_wages}</p>}
                              {(exp.current_city || exp.current_village) && (
                                <p><span className="font-semibold">Location:</span> {exp.current_city} {exp.current_village ? `, ${exp.current_village}` : ''}</p>
                              )}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                </div>

                {/* System Info */}
                <div className="mt-6 pt-4 border-t text-xs text-gray-400 text-center flex justify-between px-4">
                  <span>Registered on: {new Date(selectedCandidate.created_at).toLocaleDateString()}</span>
                  <span>Last Updated: {new Date(selectedCandidate.updated_at).toLocaleDateString()}</span>
                </div>

              </div>

              {/* Footer */}
              <div className="p-5 border-t bg-gray-50 rounded-b-xl flex justify-end">
                <button
                  onClick={() => setShowDetailsModal(false)}
                  className="px-5 py-2 bg-gray-200 hover:bg-gray-300 text-gray-800 rounded-lg font-medium transition"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        )}

        {/* search popup  */}

        {showPopup && (
          <div className="fixed inset-0 flex items-center justify-center bg-black/60 z-[10000] animate-fadeIn">
            <div className="relative bg-[#FFFFF0] rounded-lg shadow-xl w-[95%] max-w-xl min-h-[400px] p-6 animate-fadeInScale">
              {/* Title + Close */}
              <div className="flex items-center justify-between mb-5">
                <h2 className="text-lg font-semibold">Search</h2>
                <button
                  className="text-gray-500 hover:text-gray-800"
                  onClick={() => setShowPopup(false)}
                >
                  <RxCross2 size={22} />
                </button>
              </div>

              {/* Search Input */}
              <div className="relative mb-5">
                <FaSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" />
                <input
                  type="text"
                  placeholder="Search"
                  value={selectedKeywords.join(" ")}
                  readOnly
                  className="w-full pl-10 p-2 rounded bg-white text-sm placeholder-slate-400 
                ring-1 ring-gray-300 focus:outline-none focus:ring-2 
                focus:ring-[#00C9FF] transition"
                />
              </div>

              {/* Keywords as buttons */}
              <div className="flex flex-wrap gap-2">
                {keywords.map((keyword) => (
                  <button
                    key={keyword}
                    onClick={() => handleKeywordClick(keyword)}
                    className="px-4 py-2 rounded-lg bg-white border border-gray-200 
                        hover:bg-gray-50 focus:ring-2 focus:ring-[#00C9FF] 
                        transition text-gray-700 text-sm"
                  >
                    {keyword}
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </>

  );
};

export default Candidateslist;
