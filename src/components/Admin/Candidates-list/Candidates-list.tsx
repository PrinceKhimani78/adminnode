"use client";
import Image from 'next/image';
import React, { useEffect, useState, useRef } from "react";
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
  state?: string;
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
  experienced?: boolean;
  pincode?: string;
  pref_state?: string;
  pref_district?: string;
  pref_city?: string;
  pref_village?: string;
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
  languages_known?: string[];
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
  certifications?: {
    name: string;
    year?: string;
    achievement?: string;
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
        const response = await fetch("/api/candidate-profile?limit=100");
        const data = await response.json();
        console.log("FETCH RESULT: ", data);
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
  const [isEditing, setIsEditing] = useState(false);
  const [editForm, setEditForm] = useState<Partial<Candidate>>({});

  const [candidateToDelete, setCandidateToDelete] = useState<Candidate | null>(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const handleViewCandidate = async (candidate: Candidate) => {
    setSelectedCandidate(candidate); // Set initial data from list
    setEditForm(candidate);
    setShowDetailsModal(true);
    setIsEditing(false);

    try {
      const response = await fetch(`/api/candidate-profile/${candidate.id}`);
      const data = await response.json();
      if (data.success && data.data) {
        setSelectedCandidate(data.data); // Update with full details
        setEditForm(data.data);
      }
    } catch (err) {
      console.error("Error fetching full candidate details:", err);
    }
  };

  const confirmDelete = (candidate: Candidate) => {
    setCandidateToDelete(candidate);
    setShowDeleteModal(true);
  };

  const handleDeleteCandidate = async () => {
    if (!candidateToDelete) return;

    try {
      const response = await fetch(`/api/candidate-profile/${candidateToDelete.id}`, {
        method: "DELETE",
      });
      const data = await response.json();
      if (data.success) {
        setCandidates(candidates.filter(c => c.id !== candidateToDelete.id));
        setShowDeleteModal(false);
        setCandidateToDelete(null);
      } else {
        alert(data.message || "Failed to delete candidate");
      }
    } catch (err) {
      console.error("Error deleting candidate:", err);
      alert("Error deleting candidate");
    }
  };

  const handleEditChange = (field: keyof Candidate, value: any) => {
    setEditForm((prev) => ({ ...prev, [field]: value }));
  };

  const handleSaveChanges = async () => {
    if (!selectedCandidate) return;

    try {
      // Build payload matching the backend updateCandidateProfileSchema exactly.
      // Only include fields that are in the schema; use correct types per field.
      const strOrEmpty = (v: unknown) =>
        v === null || v === undefined ? '' : String(v);
      const numOrNull = (v: unknown) =>
        v === null || v === undefined || v === '' ? null : Number(v);
      const dateOrNull = (v: unknown) =>
        v === null || v === undefined || v === '' ? null : v;
      const parseJsonArray = (v: unknown): unknown[] | null => {
        if (Array.isArray(v)) return v;
        if (typeof v === 'string' && v.trim().startsWith('[')) {
          try { return JSON.parse(v.trim()); } catch { return null; }
        }
        return null;
      };

      const payload: Record<string, unknown> = {
        // Required-like strings
        full_name: strOrEmpty(editForm.full_name),
        surname: strOrEmpty(editForm.surname),
        email: strOrEmpty(editForm.email),
        mobile_number: strOrEmpty(editForm.mobile_number),
        // Optional strings (allow '')
        alternate_mobile_number: strOrEmpty(editForm.alternate_mobile_number),
        address: strOrEmpty(editForm.address),
        state: strOrEmpty(editForm.state),
        city: strOrEmpty(editForm.city),
        district: strOrEmpty(editForm.district),
        village: strOrEmpty(editForm.village),
        pincode: strOrEmpty(editForm.pincode),
        position: strOrEmpty(editForm.position),
        gender: strOrEmpty(editForm.gender),
        marital_status: strOrEmpty(editForm.marital_status),
        job_category: strOrEmpty(editForm.job_category),
        interview_availability: strOrEmpty(editForm.interview_availability),
        preferred_shift: strOrEmpty(editForm.preferred_shift),
        summary: strOrEmpty(editForm.summary),
        additional_info: strOrEmpty(editForm.additional_info),
        // Numbers (allow null)
        total_experience_years: numOrNull(editForm.total_experience_years),
        expected_salary_min: numOrNull(editForm.expected_salary_min),
        expected_salary_max: numOrNull(editForm.expected_salary_max),
        // Dates (allow null or '')
        date_of_birth: dateOrNull(editForm.date_of_birth),
        availability_start: dateOrNull(editForm.availability_start),
        // Arrays (must be real arrays, not JSON strings)
        languages_known: parseJsonArray(editForm.languages_known),
        // Nested arrays — send edited or original data, coerce types to match Joi schema
        skills: ((editForm.skills ?? selectedCandidate.skills) || []).map((s: any) => ({
          ...s,
          years_of_experience: String(s.years_of_experience ?? '0'),
        })) as any[],
        work_experience: ((editForm.work_experience ?? selectedCandidate.work_experience) || []).map((e: any) => ({
          ...e,
          current_wages: e.current_wages !== '' && e.current_wages !== null && e.current_wages !== undefined ? Number(e.current_wages) : undefined,
        })) as any[],
        education: ((editForm.education ?? selectedCandidate.education) || []).map((e: any) => ({
          ...e,
          passing_year: String(e.passing_year ?? ''),
        })) as any[],
        certifications: ((editForm.certifications ?? selectedCandidate.certifications) || []).map((c: any) => ({
          ...c,
          year: c.year ? String(c.year) : undefined,
        })) as any[],
      };

      const response = await fetch(`/api/candidate-profile/${selectedCandidate.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await response.json();

      if (data.success) {
        setSelectedCandidate({ ...selectedCandidate, ...editForm } as Candidate);
        setIsEditing(false);
        setCandidates(candidates.map(c =>
          c.id === selectedCandidate.id ? { ...c, ...editForm } as Candidate : c
        ));
        alert("Candidate details updated successfully!");
      } else {
        alert(data.message || "Failed to update candidate details");
      }
    } catch (err) {
      console.error("Error updating candidate:", err);
      alert("Error updating candidate. Check console for details.");
    }
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
      <div className={`pl-2 pr-4 sm:px-2 py-2 flex gap-3 sm:gap-4 my-10 relative`}>
        {/* Sidebar */}
        <div className="print:hidden">
          <Sidebar mobileOpen={mobileOpen} setMobileOpen={setMobileOpen} />
        </div>
        <main className={`flex-1 px-5 py-5 min-w-0 bg-white shadow rounded-lg space-y-8 ${showDetailsModal ? "print:hidden" : ""}`}>
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
                      <Image
                        src={c.profile_photo ? `https://api.rojgariindia.com/api/candidate-profile/${c.id}/download/photo?size=thumbnail` : "/images/profile1.webp"}
                        alt={c.full_name || "Profile"}
                        width={40}
                        height={40}
                        className="rounded-full border object-cover w-10 h-10"
                        unoptimized
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
                    <button
                      onClick={() => confirmDelete(c)}
                      className="text-[#00C9FF] hover:text-red-600 transition"
                      title="Delete Candidate"
                    >
                      <FaTrash />
                    </button>
                  </div>
                </div>

                {/* Mobile Card */}
                <div className="sm:hidden px-3 py-4 space-y-2">
                  <div className="flex items-center gap-3 px-3 py-3">
                    {c.profile_photo ? (
                      <Image
                        src={c.profile_photo ? `https://api.rojgariindia.com/api/candidate-profile/${c.id}/download/photo?size=thumbnail` : "/images/profile1.webp"}
                        alt={c.full_name || "Profile"}
                        width={40}
                        height={40}
                        className="rounded-full border object-cover w-10 h-10"
                        unoptimized
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
                      className="text-[#00C9FF] hover:text-blue-700 transition"
                      title="View Details"
                    >
                      <FaEye />
                    </button>
                    <button
                      onClick={() => confirmDelete(c)}
                      className="text-[#00C9FF] hover:text-red-600 transition"
                      title="Delete Candidate"
                    >
                      <FaTrash />
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
        {/* Delete confirmation modal */}
        {showDeleteModal && candidateToDelete && (
          <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50">
            <div className="bg-white rounded-lg shadow-lg w-[90%] max-w-md relative">
              <button
                onClick={() => setShowDeleteModal(false)}
                className="absolute top-3 right-4 text-gray-400 hover:text-black text-xl font-bold"
              >
                ×
              </button>
              <div className="px-6 py-8 text-center">
                <p className="text-lg font-medium mb-6">
                  Do you want to delete <span className="font-bold">{candidateToDelete.full_name} {candidateToDelete.surname}</span>'s profile?
                </p>
                <div className="flex justify-center gap-4">
                  <button
                    onClick={() => setShowDeleteModal(false)}
                    className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
                  >
                    No
                  </button>
                  <button
                    onClick={handleDeleteCandidate}
                    className="px-6 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition"
                  >
                    Yes, Delete
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Candidate Details Modal */}
        {showDetailsModal && selectedCandidate && (
          <div className="fixed inset-0 flex items-center justify-center bg-black/60 z-[9999] animate-fadeIn p-4 overflow-y-auto print:static print:bg-transparent print:p-0 print:m-0 print:block print:w-full">
            <div className="bg-white rounded-xl shadow-2xl w-full max-w-3xl relative flex flex-col max-h-[90vh] print:max-w-none print:max-h-none print:shadow-none print:w-full print:overflow-visible print:border-none">
              {/* Header */}
              <div className="flex items-center justify-between p-5 border-b sticky top-0 bg-white rounded-t-xl z-10 print:static print:border-none print:p-0 print:mb-4">
                <h2 className="text-xl font-bold text-gray-800">Candidate Information View</h2>
                <div className="flex items-center gap-4">
                  {!isEditing && (
                    <button
                      onClick={() => setIsEditing(true)}
                      className="text-sm font-semibold text-[#00C9FF] hover:text-blue-600 transition print:hidden"
                    >
                      Edit Profile
                    </button>
                  )}
                  <button
                    onClick={() => {
                      setShowDetailsModal(false);
                      setIsEditing(false);
                    }}
                    className="text-gray-400 hover:text-gray-600 transition print:hidden"
                  >
                    <RxCross2 size={24} />
                  </button>
                </div>
              </div>

              {/* Content */}
              <div className="p-6 overflow-y-auto space-y-8">
                {/* Header Profile Section */}
                <div className="flex flex-col sm:flex-row gap-6 items-center sm:items-start border-b pb-6">
                  {selectedCandidate.profile_photo ? (
                    <div className="relative w-24 h-24">
                      <Image
                        src={`https://api.rojgariindia.com/api/candidate-profile/${selectedCandidate.id}/download/photo`}
                        alt={selectedCandidate.full_name}
                        fill
                        className="rounded-full border-4 border-gray-100 object-cover shadow-sm"
                        unoptimized // External API might not support double optimization well
                      />
                    </div>
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
                          href={`https://api.rojgariindia.com/api/candidate-profile/${selectedCandidate.id}/download/resume`}
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

                {/* 1. PERSONAL DETAILS */}
                <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
                  <div className="bg-gray-50 px-5 py-3 border-b border-gray-200">
                    <h4 className="text-sm font-bold text-gray-800 uppercase tracking-wider">Personal Details</h4>
                  </div>
                  <div className="p-5 grid grid-cols-1 sm:grid-cols-2 gap-y-4 gap-x-10 text-sm">
                    <div>
                      <p className="font-semibold text-gray-500">First Name</p>
                      {isEditing ? (
                        <input
                          type="text"
                          value={editForm.full_name || ''}
                          onChange={(e) => handleEditChange('full_name', e.target.value)}
                          className="w-full mt-1 p-2 border rounded"
                        />
                      ) : (
                        <p className="text-gray-900">{selectedCandidate.full_name}</p>
                      )}
                    </div>
                    <div>
                      <p className="font-semibold text-gray-500">Last Name</p>
                      {isEditing ? (
                        <input
                          type="text"
                          value={editForm.surname || ''}
                          onChange={(e) => handleEditChange('surname', e.target.value)}
                          className="w-full mt-1 p-2 border rounded"
                        />
                      ) : (
                        <p className="text-gray-900">{selectedCandidate.surname || 'N/A'}</p>
                      )}
                    </div>
                    <div>
                      <p className="font-semibold text-gray-500">Email Address</p>
                      {isEditing ? (
                        <input
                          type="email"
                          value={editForm.email || ''}
                          onChange={(e) => handleEditChange('email', e.target.value)}
                          className="w-full mt-1 p-2 border rounded"
                        />
                      ) : (
                        <p className="text-gray-900 break-all">{selectedCandidate.email}</p>
                      )}
                    </div>
                    <div>
                      <p className="font-semibold text-gray-500">Mobile Number</p>
                      {isEditing ? (
                        <input
                          type="text"
                          value={editForm.mobile_number || ''}
                          onChange={(e) => handleEditChange('mobile_number', e.target.value)}
                          className="w-full mt-1 p-2 border rounded"
                        />
                      ) : (
                        <p className="text-gray-900">{selectedCandidate.mobile_number}</p>
                      )}
                    </div>
                    <div>
                      <p className="font-semibold text-gray-500">Alt Mobile Number</p>
                      {isEditing ? (
                        <input
                          type="text"
                          value={editForm.alternate_mobile_number || ''}
                          onChange={(e) => handleEditChange('alternate_mobile_number', e.target.value)}
                          className="w-full mt-1 p-2 border rounded"
                        />
                      ) : (
                        <p className="text-gray-900">{selectedCandidate.alternate_mobile_number || 'N/A'}</p>
                      )}
                    </div>
                    <div>
                      <p className="font-semibold text-gray-500">Date of Birth</p>
                      {isEditing ? (
                        <input
                          type="date"
                          value={editForm.date_of_birth ? editForm.date_of_birth.split('T')[0] : ''}
                          onChange={(e) => handleEditChange('date_of_birth', e.target.value)}
                          className="w-full mt-1 p-2 border rounded"
                        />
                      ) : (
                        <p className="text-gray-900">{selectedCandidate.date_of_birth ? new Date(selectedCandidate.date_of_birth).toLocaleDateString() : 'N/A'}</p>
                      )}
                    </div>
                    <div>
                      <p className="font-semibold text-gray-500">Gender</p>
                      {isEditing ? (
                        <select
                          value={editForm.gender || ''}
                          onChange={(e) => handleEditChange('gender', e.target.value)}
                          className="w-full mt-1 p-2 border rounded bg-white"
                        >
                          <option value="">Select</option>
                          <option value="Male">Male</option>
                          <option value="Female">Female</option>
                          <option value="Other">Other</option>
                        </select>
                      ) : (
                        <p className="text-gray-900">{selectedCandidate.gender || 'N/A'}</p>
                      )}
                    </div>
                    <div>
                      <p className="font-semibold text-gray-500">Marital Status</p>
                      {isEditing ? (
                        <select
                          value={editForm.marital_status || ''}
                          onChange={(e) => handleEditChange('marital_status', e.target.value)}
                          className="w-full mt-1 p-2 border rounded bg-white"
                        >
                          <option value="">Select</option>
                          <option value="Single">Single</option>
                          <option value="Married">Married</option>
                          <option value="Divorced">Divorced</option>
                          <option value="Widowed">Widowed</option>
                        </select>
                      ) : (
                        <p className="text-gray-900">{selectedCandidate.marital_status || 'N/A'}</p>
                      )}
                    </div>
                    <div>
                      <p className="font-semibold text-gray-500">State</p>
                      {isEditing ? (
                        <input
                          type="text"
                          value={editForm.state || ''}
                          onChange={(e) => handleEditChange('state', e.target.value)}
                          className="w-full mt-1 p-2 border rounded"
                        />
                      ) : (
                        <p className="text-gray-900">{selectedCandidate.state || 'N/A'}</p>
                      )}
                    </div>
                    <div>
                      <p className="font-semibold text-gray-500">District</p>
                      {isEditing ? (
                        <input
                          type="text"
                          value={editForm.district || ''}
                          onChange={(e) => handleEditChange('district', e.target.value)}
                          className="w-full mt-1 p-2 border rounded"
                        />
                      ) : (
                        <p className="text-gray-900">{selectedCandidate.district || 'N/A'}</p>
                      )}
                    </div>
                    <div>
                      <p className="font-semibold text-gray-500">City</p>
                      {isEditing ? (
                        <input
                          type="text"
                          value={editForm.city || ''}
                          onChange={(e) => handleEditChange('city', e.target.value)}
                          className="w-full mt-1 p-2 border rounded"
                        />
                      ) : (
                        <p className="text-gray-900">{selectedCandidate.city || 'N/A'}</p>
                      )}
                    </div>
                    <div>
                      <p className="font-semibold text-gray-500">Village</p>
                      {isEditing ? (
                        <input
                          type="text"
                          value={editForm.village || ''}
                          onChange={(e) => handleEditChange('village', e.target.value)}
                          className="w-full mt-1 p-2 border rounded"
                        />
                      ) : (
                        <p className="text-gray-900">{selectedCandidate.village || 'N/A'}</p>
                      )}
                    </div>
                    <div className="sm:col-span-2">
                      <p className="font-semibold text-gray-500">Permanent Address</p>
                      {isEditing ? (
                        <input
                          type="text"
                          value={editForm.address || ''}
                          onChange={(e) => handleEditChange('address', e.target.value)}
                          className="w-full mt-1 p-2 border rounded"
                        />
                      ) : (
                        <p className="text-gray-900">{selectedCandidate.address || 'N/A'}</p>
                      )}
                    </div>
                    <div>
                      <p className="font-semibold text-gray-500">Area Pin Code</p>
                      {isEditing ? (
                        <input
                          type="text"
                          value={editForm.pincode || ''}
                          onChange={(e) => handleEditChange('pincode', e.target.value)}
                          className="w-full mt-1 p-2 border rounded"
                        />
                      ) : (
                        <p className="text-gray-900">{selectedCandidate.pincode || 'N/A'}</p>
                      )}
                    </div>
                    <div>
                      <p className="font-semibold text-gray-500">Languages</p>
                      {isEditing ? (
                        <div className="mt-2 flex flex-wrap gap-2">
                          {['Hindi', 'English', 'Gujarati', 'Marathi', 'Bengali', 'Tamil', 'Telugu', 'Kannada', 'Punjabi', 'Urdu'].map(lang => {
                            const cur: string[] = (() => { const v = editForm.languages_known; if (Array.isArray(v)) return v as string[]; if (typeof v === 'string') { try { return JSON.parse(v); } catch { return []; } } return []; })();
                            const on = cur.includes(lang);
                            return (<label key={lang} onClick={() => handleEditChange('languages_known', on ? cur.filter(l => l !== lang) : [...cur, lang])} className={`px-2 py-1 rounded border cursor-pointer text-xs select-none ${on ? 'bg-blue-50 border-blue-400 text-blue-700 font-semibold' : 'border-gray-200 text-gray-500'}`}>{lang}</label>);
                          })}
                        </div>
                      ) : (
                        <div className="flex flex-wrap gap-1 mt-1">
                          {(() => { const langs = selectedCandidate.languages_known; let p: string[] = []; if (Array.isArray(langs)) { p = langs; } else if (typeof langs === 'string') { try { p = JSON.parse(langs); } catch { p = [langs]; } } return p.length > 0 ? p.map((l, i) => (<span key={i} className="bg-blue-50 text-blue-700 px-2 py-0.5 rounded text-xs border border-blue-100">{l}</span>)) : 'N/A'; })()}
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                {/* 2. PROFESSIONAL */}
                <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
                  <div className="bg-gray-50 px-5 py-3 border-b border-gray-200">
                    <h4 className="text-sm font-bold text-gray-800 uppercase tracking-wider">Professional</h4>
                  </div>
                  <div className="p-5 space-y-6">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-4 gap-x-10 text-sm">
                      <div>
                        <p className="font-semibold text-gray-500">Current Position</p>
                        {isEditing ? (
                          <input
                            type="text"
                            value={editForm.position || ''}
                            onChange={(e) => handleEditChange('position', e.target.value)}
                            className="w-full mt-1 p-2 border rounded"
                          />
                        ) : (
                          <p className="text-gray-900 font-medium">{selectedCandidate.position || 'N/A'}</p>
                        )}
                      </div>
                      <div>
                        <p className="font-semibold text-gray-500">Experience (in Years)</p>
                        {isEditing ? (
                          <input
                            type="number"
                            min="0"
                            step="0.5"
                            value={editForm.total_experience_years || ''}
                            onChange={(e) => handleEditChange('total_experience_years', parseFloat(e.target.value))}
                            className="w-full mt-1 p-2 border rounded"
                          />
                        ) : (
                          <p className="text-gray-900 font-medium">{selectedCandidate.total_experience_years || 0} Years</p>
                        )}
                      </div>
                    </div>

                    <div className="text-sm">
                      <p className="font-semibold text-gray-500 mb-1">Profile Summary</p>
                      {isEditing ? (
                        <textarea
                          value={editForm.summary || ''}
                          onChange={(e) => handleEditChange('summary', e.target.value)}
                          className="w-full p-2 border rounded min-h-[80px]"
                        />
                      ) : (
                        <p className="text-gray-700 bg-gray-50 p-3 rounded-lg border border-gray-100 leading-relaxed italic">
                          {selectedCandidate.summary || "No summary provided."}
                        </p>
                      )}
                    </div>

                    {/* Work Experience History */}
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <p className="font-bold text-gray-800 text-sm border-l-4 border-[#00C9FF] pl-2">Work Experience</p>
                        {isEditing && <button type="button" onClick={() => { const e2 = [...((editForm.work_experience ?? selectedCandidate.work_experience) || []) as any[]]; handleEditChange('work_experience', [...e2, { position: '', company: '', start_date: '', end_date: '', is_current: false, salary_period: '', current_wages: '', current_city: '' }]); }} className="text-xs text-[#00C9FF] hover:underline">+ Add</button>}
                      </div>
                      {(() => {
                        const exps = (isEditing ? ((editForm.work_experience ?? selectedCandidate.work_experience) || []) : (selectedCandidate.work_experience || [])) as any[];
                        if (isEditing) return exps.length > 0 ? (<div className="space-y-3">{exps.map((exp: any, i: number) => (<div key={i} className="p-3 bg-gray-50 border rounded-lg text-xs space-y-2"><div className="flex justify-between"><span className="font-semibold">#{i + 1}</span><button type="button" onClick={() => handleEditChange('work_experience', exps.filter((_: any, j: number) => j !== i))} className="text-red-400 text-xs">Remove</button></div><div className="grid grid-cols-2 gap-2"><div><label className="text-gray-500">Position</label><input className="w-full mt-0.5 p-1.5 border rounded text-xs" value={exp.position || ''} onChange={e => { const n = [...exps]; n[i] = { ...n[i], position: e.target.value }; handleEditChange('work_experience', n); }} /></div><div><label className="text-gray-500">Company</label><input className="w-full mt-0.5 p-1.5 border rounded text-xs" value={exp.company || ''} onChange={e => { const n = [...exps]; n[i] = { ...n[i], company: e.target.value }; handleEditChange('work_experience', n); }} /></div><div><label className="text-gray-500">Start Date</label><input type="date" className="w-full mt-0.5 p-1.5 border rounded text-xs" value={exp.start_date ? exp.start_date.substring(0, 10) : ''} onChange={e => { const n = [...exps]; n[i] = { ...n[i], start_date: e.target.value }; handleEditChange('work_experience', n); }} /></div><div><label className="text-gray-500">End Date</label><input type="date" className="w-full mt-0.5 p-1.5 border rounded text-xs" disabled={exp.is_current} value={exp.end_date ? exp.end_date.substring(0, 10) : ''} onChange={e => { const n = [...exps]; n[i] = { ...n[i], end_date: e.target.value }; handleEditChange('work_experience', n); }} /></div><div><label className="text-gray-500">Notice Period (days)</label><input className="w-full mt-0.5 p-1.5 border rounded text-xs" value={exp.salary_period || ''} onChange={e => { const n = [...exps]; n[i] = { ...n[i], salary_period: e.target.value }; handleEditChange('work_experience', n); }} /></div><div><label className="text-gray-500">Salary (₹)</label><input type="number" className="w-full mt-0.5 p-1.5 border rounded text-xs" value={exp.current_wages || ''} onChange={e => { const n = [...exps]; n[i] = { ...n[i], current_wages: e.target.value }; handleEditChange('work_experience', n); }} /></div><div><label className="text-gray-500">City</label><input className="w-full mt-0.5 p-1.5 border rounded text-xs" value={exp.current_city || ''} onChange={e => { const n = [...exps]; n[i] = { ...n[i], current_city: e.target.value }; handleEditChange('work_experience', n); }} /></div><div className="flex items-center gap-2 col-span-2"><input type="checkbox" checked={!!exp.is_current} onChange={e => { const n = [...exps]; n[i] = { ...n[i], is_current: e.target.checked }; handleEditChange('work_experience', n); }} /><label>Currently Working Here</label></div></div></div>))}</div>) : <p className="text-xs text-gray-400 italic">Click + Add to add experience.</p>;
                        return exps.length > 0 ? (<div className="space-y-3">{exps.map((exp: any, i: number) => (<div key={i} className="p-4 bg-white border border-gray-200 rounded-lg shadow-sm hover:border-[#00C9FF] transition"><div className="flex justify-between items-start mb-2"><div><h5 className="font-bold text-gray-900">{exp.position}</h5><p className="text-gray-600 font-medium">{exp.company}</p></div><span className={`px-2 py-0.5 text-[10px] rounded-full font-bold uppercase ${exp.is_current ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-500'}`}>{exp.is_current ? 'Current' : 'Previous'}</span></div><div className="grid grid-cols-2 gap-2 text-xs text-gray-600"><p><span className="font-semibold">Duration:</span> {exp.start_date ? new Date(exp.start_date).toLocaleDateString() : 'N/A'} - {exp.is_current ? 'Present' : (exp.end_date ? new Date(exp.end_date).toLocaleDateString() : 'N/A')}</p><p><span className="font-semibold">Notice:</span> {exp.salary_period || '0'} Days</p><p><span className="font-semibold">Salary:</span> ₹{exp.current_wages || 'N/A'}</p><p><span className="font-semibold">Location:</span> {exp.current_city || 'N/A'}</p></div></div>))}</div>) : <p className="text-xs text-gray-400 italic">No work experience listed.</p>;
                      })()}
                    </div>

                    {/* Education */}
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <p className="font-bold text-gray-800 text-sm border-l-4 border-[#AE70BB] pl-2">Education</p>
                        {isEditing && <button type="button" onClick={() => { const e2 = [...((editForm.education ?? selectedCandidate.education) || []) as any[]]; handleEditChange('education', [...e2, { degree: '', university: '', passing_year: '' }]); }} className="text-xs text-[#AE70BB] hover:underline">+ Add</button>}
                      </div>
                      {(() => {
                        const edus = ((isEditing ? (editForm.education ?? selectedCandidate.education) : selectedCandidate.education) || []) as any[];
                        if (isEditing) return edus.length > 0 ? (<div className="grid grid-cols-1 sm:grid-cols-2 gap-3">{edus.map((edu: any, i: number) => (<div key={i} className="p-3 bg-gray-50 border rounded-lg text-xs space-y-1.5"><div className="flex justify-between"><span className="font-semibold">#{i + 1}</span><button type="button" onClick={() => handleEditChange('education', edus.filter((_: any, j: number) => j !== i))} className="text-red-400">Remove</button></div><div><label className="text-gray-500">Degree</label><input className="w-full mt-0.5 p-1.5 border rounded text-xs" value={edu.degree || ''} onChange={e => { const n = [...edus]; n[i] = { ...n[i], degree: e.target.value }; handleEditChange('education', n); }} /></div><div><label className="text-gray-500">University / Board</label><input className="w-full mt-0.5 p-1.5 border rounded text-xs" value={edu.university || ''} onChange={e => { const n = [...edus]; n[i] = { ...n[i], university: e.target.value }; handleEditChange('education', n); }} /></div><div><label className="text-gray-500">Passing Year</label><input className="w-full mt-0.5 p-1.5 border rounded text-xs" value={edu.passing_year || ''} onChange={e => { const n = [...edus]; n[i] = { ...n[i], passing_year: e.target.value }; handleEditChange('education', n); }} /></div></div>))}</div>) : <p className="text-xs text-gray-400 italic">Click + Add to add education.</p>;
                        return edus.length > 0 ? (<div className="grid grid-cols-1 sm:grid-cols-2 gap-3">{edus.map((edu: any, i: number) => (<div key={i} className="p-3 bg-white border border-gray-200 rounded-lg shadow-sm"><p className="font-bold text-gray-900 text-sm">{edu.degree}</p><p className="text-xs text-gray-600">{edu.university}</p><p className="text-[10px] text-gray-400 mt-1">Passing Year: {edu.passing_year}</p></div>))}</div>) : <p className="text-xs text-gray-400 italic">No education details recorded.</p>;
                      })()}
                    </div>

                    {/* Skills */}
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <p className="font-bold text-gray-800 text-sm border-l-4 border-[#72B76A] pl-2">Skills</p>
                        {isEditing && <button type="button" onClick={() => { const s = [...((editForm.skills ?? selectedCandidate.skills) || []) as any[]]; handleEditChange('skills', [...s, { skill_name: '', years_of_experience: '0', level: 'Beginner' }]); }} className="text-xs text-[#72B76A] hover:underline">+ Add</button>}
                      </div>
                      {(() => {
                        const skills = ((isEditing ? (editForm.skills ?? selectedCandidate.skills) : selectedCandidate.skills) || []) as any[];
                        if (isEditing) return skills.length > 0 ? (<div className="space-y-2">{skills.map((skill: any, i: number) => (<div key={i} className="flex items-center gap-2 text-xs"><input className="flex-1 p-1.5 border rounded text-xs" placeholder="Skill name" value={skill.skill_name || ''} onChange={e => { const n = [...skills]; n[i] = { ...n[i], skill_name: e.target.value }; handleEditChange('skills', n); }} /><select className="p-1.5 border rounded text-xs" value={skill.years_of_experience || '0'} onChange={e => { const n = [...skills]; n[i] = { ...n[i], years_of_experience: e.target.value }; handleEditChange('skills', n); }}>{['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '10+'].map(y => <option key={y} value={y}>{y} Yrs</option>)}</select><select className="p-1.5 border rounded text-xs" value={skill.level || 'Beginner'} onChange={e => { const n = [...skills]; n[i] = { ...n[i], level: e.target.value }; handleEditChange('skills', n); }}>{['Beginner', 'Intermediate', 'Advanced', 'Expert'].map(l => <option key={l} value={l}>{l}</option>)}</select><button type="button" onClick={() => handleEditChange('skills', skills.filter((_: any, j: number) => j !== i))} className="text-red-400 hover:text-red-600">✕</button></div>))}</div>) : <p className="text-xs text-gray-400 italic">Click + Add to add skills.</p>;
                        return skills.length > 0 ? (<div className="flex flex-wrap gap-2">{skills.map((skill: any, i: number) => (<div key={i} className="px-3 py-2 bg-white border border-gray-200 rounded-lg shadow-sm"><p className="text-xs font-bold text-gray-900">{skill.skill_name}</p><p className="text-[10px] text-[#72B76A] font-bold">{skill.years_of_experience} Yrs</p>{skill.level && <p className="text-[9px] text-gray-400 uppercase">{skill.level}</p>}</div>))}</div>) : <p className="text-xs text-gray-400 italic">No skills specified.</p>;
                      })()}
                    </div>

                    {/* Certifications */}
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <p className="font-bold text-gray-800 text-sm border-l-4 border-[#FFCC23] pl-2">Certifications</p>
                        {isEditing && <button type="button" onClick={() => { const c = [...((editForm.certifications ?? selectedCandidate.certifications) || []) as any[]]; handleEditChange('certifications', [...c, { name: '', year: '', achievement: '' }]); }} className="text-xs text-yellow-600 hover:underline">+ Add</button>}
                      </div>
                      {(() => {
                        const certs = ((isEditing ? (editForm.certifications ?? selectedCandidate.certifications) : selectedCandidate.certifications) || []) as any[];
                        if (isEditing) return certs.length > 0 ? (<div className="grid grid-cols-1 sm:grid-cols-2 gap-3">{certs.map((cert: any, i: number) => (<div key={i} className="p-3 bg-gray-50 border rounded-lg text-xs space-y-1.5"><div className="flex justify-between"><span className="font-semibold">#{i + 1}</span><button type="button" onClick={() => handleEditChange('certifications', certs.filter((_: any, j: number) => j !== i))} className="text-red-400">Remove</button></div><div><label className="text-gray-500">Name</label><input className="w-full mt-0.5 p-1.5 border rounded text-xs" value={cert.name || ''} onChange={e => { const n = [...certs]; n[i] = { ...n[i], name: e.target.value }; handleEditChange('certifications', n); }} /></div><div><label className="text-gray-500">Year</label><input className="w-full mt-0.5 p-1.5 border rounded text-xs" value={cert.year || ''} onChange={e => { const n = [...certs]; n[i] = { ...n[i], year: e.target.value }; handleEditChange('certifications', n); }} /></div><div><label className="text-gray-500">Achievement</label><input className="w-full mt-0.5 p-1.5 border rounded text-xs" value={cert.achievement || ''} onChange={e => { const n = [...certs]; n[i] = { ...n[i], achievement: e.target.value }; handleEditChange('certifications', n); }} /></div></div>))}</div>) : <p className="text-xs text-gray-400 italic">Click + Add to add certifications.</p>;
                        return certs.length > 0 ? (<div className="grid grid-cols-1 sm:grid-cols-2 gap-3">{certs.map((cert: any, i: number) => (<div key={i} className="p-3 bg-white border border-gray-200 rounded-lg shadow-sm"><div className="flex justify-between items-start"><p className="font-bold text-gray-900 text-sm">{cert.name}</p>{cert.year && <span className="text-[10px] font-bold text-gray-500">{cert.year}</span>}</div>{cert.achievement && <p className="text-xs text-gray-600 mt-1 italic">"{cert.achievement}"</p>}</div>))}</div>) : <p className="text-xs text-gray-400 italic">No certifications listed.</p>;
                      })()}
                    </div>
                  </div>
                </div>

                {/* 3. AVAILABILITY & EXPECTATIONS */}
                <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
                  <div className="bg-gray-50 px-5 py-3 border-b border-gray-200">
                    <h4 className="text-sm font-bold text-gray-800 uppercase tracking-wider">Availability & Expectations</h4>
                  </div>
                  <div className="p-5 grid grid-cols-1 sm:grid-cols-2 gap-y-4 gap-x-10 text-sm">
                    <div>
                      <p className="font-semibold text-gray-500">Interview Availability</p>
                      {isEditing ? (
                        <input
                          type="text"
                          value={editForm.interview_availability || ''}
                          onChange={(e) => handleEditChange('interview_availability', e.target.value)}
                          className="w-full mt-1 p-2 border rounded"
                        />
                      ) : (
                        <p className="text-gray-900 font-medium">{selectedCandidate.interview_availability || 'N/A'}</p>
                      )}
                    </div>
                    <div>
                      <p className="font-semibold text-gray-500">Preferred Shift</p>
                      {isEditing ? (
                        <input
                          type="text"
                          value={editForm.preferred_shift || ''}
                          onChange={(e) => handleEditChange('preferred_shift', e.target.value)}
                          className="w-full mt-1 p-2 border rounded"
                        />
                      ) : (
                        <p className="text-gray-900 font-medium">{selectedCandidate.preferred_shift || 'N/A'}</p>
                      )}
                    </div>
                    <div>
                      <p className="font-semibold text-gray-500">Expected Salary (Monthly)</p>
                      {isEditing ? (
                        <div className="flex gap-2 mt-1">
                          <input
                            type="number"
                            placeholder="Min"
                            value={editForm.expected_salary_min || ''}
                            onChange={(e) => handleEditChange('expected_salary_min', Number(e.target.value))}
                            className="w-1/2 p-2 border rounded"
                          />
                          <input
                            type="number"
                            placeholder="Max"
                            value={editForm.expected_salary_max || ''}
                            onChange={(e) => handleEditChange('expected_salary_max', Number(e.target.value))}
                            className="w-1/2 p-2 border rounded"
                          />
                        </div>
                      ) : (
                        <p className="text-[#00C9FF] font-bold">₹{selectedCandidate.expected_salary_min || 0} - ₹{selectedCandidate.expected_salary_max || 0}</p>
                      )}
                    </div>
                    <div>
                      <p className="font-semibold text-gray-500">Preferred State</p>
                      {isEditing ? (
                        <input
                          type="text"
                          value={editForm.pref_state || ''}
                          onChange={(e) => handleEditChange('pref_state', e.target.value)}
                          className="w-full mt-1 p-2 border rounded"
                        />
                      ) : (
                        <p className="text-gray-900">{selectedCandidate.pref_state || 'N/A'}</p>
                      )}
                    </div>
                    <div>
                      <p className="font-semibold text-gray-500">Preferred District</p>
                      {isEditing ? (
                        <input
                          type="text"
                          value={editForm.pref_district || ''}
                          onChange={(e) => handleEditChange('pref_district', e.target.value)}
                          className="w-full mt-1 p-2 border rounded"
                        />
                      ) : (
                        <p className="text-gray-900">{selectedCandidate.pref_district || 'N/A'}</p>
                      )}
                    </div>
                    <div>
                      <p className="font-semibold text-gray-500">Preferred City</p>
                      {isEditing ? (
                        <input
                          type="text"
                          value={editForm.pref_city || ''}
                          onChange={(e) => handleEditChange('pref_city', e.target.value)}
                          className="w-full mt-1 p-2 border rounded"
                        />
                      ) : (
                        <p className="text-gray-900">{selectedCandidate.pref_city || 'N/A'}</p>
                      )}
                    </div>
                    <div>
                      <p className="font-semibold text-gray-500">Preferred Village</p>
                      {isEditing ? (
                        <input
                          type="text"
                          value={editForm.pref_village || ''}
                          onChange={(e) => handleEditChange('pref_village', e.target.value)}
                          className="w-full mt-1 p-2 border rounded"
                        />
                      ) : (
                        <p className="text-gray-900">{selectedCandidate.pref_village || 'N/A'}</p>
                      )}
                    </div>
                    <div>
                      <p className="font-semibold text-gray-500">Availability to Join</p>
                      {isEditing ? (
                        <input
                          type="date"
                          value={editForm.availability_start ? editForm.availability_start.split('T')[0] : ''}
                          onChange={(e) => handleEditChange('availability_start', e.target.value)}
                          className="w-full mt-1 p-2 border rounded"
                        />
                      ) : (
                        <p className="text-gray-900 font-medium">{selectedCandidate.availability_start ? new Date(selectedCandidate.availability_start).toLocaleDateString() : 'N/A'}</p>
                      )}
                    </div>
                    <div>
                      <p className="font-semibold text-gray-500">Job Category</p>
                      {isEditing ? (
                        <input
                          type="text"
                          value={editForm.job_category || ''}
                          onChange={(e) => handleEditChange('job_category', e.target.value)}
                          className="w-full mt-1 p-2 border rounded"
                        />
                      ) : (
                        <p className="text-gray-900">{selectedCandidate.job_category || 'N/A'}</p>
                      )}
                    </div>
                    <div className="sm:col-span-2">
                      <p className="font-semibold text-gray-500 mb-1">Additional Notes / Remarks</p>
                      {isEditing ? (
                        <textarea
                          value={editForm.additional_info || ''}
                          onChange={(e) => handleEditChange('additional_info', e.target.value)}
                          className="w-full p-2 border rounded min-h-[60px]"
                        />
                      ) : (
                        <p className="text-gray-700 bg-gray-50 p-3 rounded-lg border border-gray-100 min-h-[60px]">
                          {selectedCandidate.additional_info || "No additional info provided."}
                        </p>
                      )}
                    </div>
                  </div>
                </div>

                {/* System Info */}
                <div className="pt-4 border-t text-[10px] text-gray-400 text-center flex justify-between px-2">
                  <span>Registered on: {new Date(selectedCandidate.created_at).toLocaleDateString()}</span>
                  <span>Last Updated: {new Date(selectedCandidate.updated_at).toLocaleDateString()}</span>
                </div>
              </div>

              {/* Footer */}
              <div className="p-5 border-t bg-gray-50 rounded-b-xl flex justify-end gap-3 print:hidden">
                {isEditing ? (
                  <>
                    <button
                      onClick={() => {
                        setIsEditing(false);
                        setEditForm(selectedCandidate);
                      }}
                      className="px-6 py-2 bg-gray-200 hover:bg-gray-300 text-gray-800 rounded-lg font-bold transition text-sm"
                    >
                      Cancel
                    </button>
                    <button
                      onClick={handleSaveChanges}
                      className="px-6 py-2 bg-green-500 hover:bg-green-600 text-white rounded-lg font-bold transition text-sm shadow-sm"
                    >
                      Save Changes
                    </button>
                  </>
                ) : (
                  <>
                    <button
                      onClick={() => setShowDetailsModal(false)}
                      className="px-6 py-2 bg-gray-200 hover:bg-gray-300 text-gray-800 rounded-lg font-bold transition text-sm"
                    >
                      Close
                    </button>
                    <button
                      onClick={() => {
                        setShowDetailsModal(false);
                        confirmDelete(selectedCandidate);
                      }}
                      className="px-6 py-2 bg-red-100 hover:bg-red-200 text-red-700 rounded-lg font-bold transition text-sm flex items-center gap-2 shadow-sm"
                    >
                      <FaTrash className="text-xs" />
                      Delete Profile
                    </button>
                    <button
                      onClick={() => window.print()}
                      className="px-6 py-2 bg-[#00C9FF] hover:bg-blue-600 text-white rounded-lg font-bold transition text-sm shadow-sm"
                    >
                      Print Profile
                    </button>
                  </>
                )}
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
