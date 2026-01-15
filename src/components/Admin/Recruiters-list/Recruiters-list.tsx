"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import Sidebar from "../Common/Sidebar";
import { FaEye, FaEnvelope, FaTrash, FaMapMarkerAlt } from "react-icons/fa";
import { IoChevronForward } from "react-icons/io5";

import { RxCross2 } from "react-icons/rx";
import { FaSearch } from "react-icons/fa";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";
const candidates = [
  {
    id: 1,
    name: "Wanda Montgomery",
    location: "New York",
    role: "UI Designer",
    date: "15/06/2023 at 10:35 am",
    status: "Approved",
    img: "/images/profile1.webp",
  },
  {
    id: 2,
    name: "Peter Hawkins",
    location: "New York",
    role: "Medical Professed",
    date: "16/06/2023 at 11:35 am",
    status: "Pending",
    img: "/images/profile1.webp",
  },
  {
    id: 3,
    name: "Ralph Johnson",
    location: "New York",
    role: "Bank Manager",
    date: "17/06/2023 at 01:15 pm",
    status: "Rejected",
    img: "/images/profile1.webp",
  },
  {
    id: 4,
    name: "Randall Henderson",
    location: "New York",
    role: "IT Contractor",
    date: "18/06/2023 at 10:35 am",
    status: "Pending",
    img: "/images/profile1.webp",
  },
  {
    id: 5,
    name: "Randall Warren",
    location: "New York",
    role: "Digital & Creative",
    date: "22/06/2023 at 10:35 am",
    status: "Approved",
    img: "/images/profile1.webp",
  },
];

const getStatusClasses = (status: string) => {
  switch (status) {
    case "Approved":
      return "bg-green-500 text-white px-3 py-1 rounded text-xs font-semibold";
    case "Pending":
      return "bg-yellow-600 text-white px-3 py-1 rounded text-xs font-semibold";
    case "Rejected":
      return "bg-red-500 text-white px-3 py-1 rounded text-xs font-semibold";
    default:
      return "bg-gray-400 text-white px-3 py-1 rounded text-xs font-semibold";
  }
};

const Recruiterlist = () => {
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
  // / Auto show popup after 4 seconds
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowPopup(true);
    }, 4000);
    return () => clearTimeout(timer);
  }, []);
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const [entries, setEntries] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);
  const [showModal, setShowModal] = useState(false);
  const totalPages = Math.ceil(candidates.length / entries);

  const startIndex = (currentPage - 1) * entries;
  const endIndex = startIndex + entries;
  const currentCandidates = candidates.slice(startIndex, endIndex);

  const handlePrev = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  const handleNext = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };

  const handleEntriesChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setEntries(Number(e.target.value));
    setCurrentPage(1); // reset to first page when entries per page changes
  };
  const [selectedKeywords, setSelectedKeywords] = useState<string[]>([]);

  const keywords = [
    "Employee",
    "Project",
    "Attendance",
    "Salary",
    "Leave Management",
    "Day-Off Request",
    "Recruitment & Hiring",
  ];

  const handleKeywordClick = (keyword: string) => {
    if (!selectedKeywords.includes(keyword)) {
      setSelectedKeywords([...selectedKeywords, keyword]);
    }
  };
  return (
    <>
      <div className="pl-2 pr-4 sm:px-2 py-2 flex gap-3 sm:gap-4  relative">
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
                  Recruiters List
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
                      All Recruiters
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
            />
            <div>
              <h2 className="text-base sm:text-lg font-bold">
                Randall Henderson
              </h2>
              <p className="text-gray-500">IT Contractor</p>
            </div>
          </div>
          {/* Table Container */}
          <div className="bg-white  p-5">
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
              <div className="px-3">Applied For</div>
              <div className="px-3">Date</div>
              <div className="px-3">Status</div>
              <div className="px-3 text-center col-span-2">Actions</div>
            </div>

            {/* Rows */}
            {currentCandidates.map((c, i) => (
              <div
                key={c.id}
                className={`border-b ${
                  i % 2 === 0 ? "bg-white" : "bg-gray-50"
                }`}
              >
                {/* Desktop Grid */}
                <div className="hidden lg:grid grid-cols-7 items-center text-sm">
                  <div className="px-3 py-3">
                    <input type="checkbox" />
                  </div>
                  <div className="flex items-center gap-3 px-3 py-3">
                    <Image
                      src={c.img}
                      alt={c.name}
                      width={40}
                      height={40}
                      className="rounded-full border"
                    />
                    <div>
                      <p className="font-semibold text-slate-950">{c.name}</p>
                      <p className="flex items-center gap-1 text-xs text-gray-500">
                        <FaMapMarkerAlt className="text-[#00c9ff] text-sm" />
                        {c.location}
                      </p>
                    </div>
                  </div>
                  <div className="px-3 py-3">{c.role}</div>
                  <div className="px-3 py-3 text-gray-500">{c.date}</div>
                  <div className="px-3 py-3">
                    <span className={getStatusClasses(c.status)}>
                      {c.status}
                    </span>
                  </div>
                  <div className="flex gap-3 px-3 py-3 justify-center col-span-2">
                    <button className="p-2 rounded-full text-[#00233e] hover:bg-[rgba(0,35,62,0.1)] transition-colors">
                      <FaEye />
                    </button>
                    <button className="p-2 hover:bg-blue-50 rounded-full text-[#42A5F5]">
                      <FaEnvelope />
                    </button>
                    <button className="text-red-600 hover:bg-red-100 rounded-full p-2 transition-colors">
                      <FaTrash />
                    </button>
                  </div>
                </div>

                {/* Mobile Card */}
                <div className="lg:hidden px-3 py-4 space-y-2">
                  <div className="flex items-center gap-3 p-0">
                    <Image
                      src={c.img}
                      alt={c.name}
                      width={40}
                      height={40}
                      className="rounded-full border"
                    />
                    <div>
                      <p className="font-semibold text-slate-950">{c.name}</p>
                      <p className="text-xs text-gray-500 flex items-center gap-1">
                        <FaMapMarkerAlt className="text-[#00c9ff]" />{" "}
                        {c.location}
                      </p>
                    </div>
                  </div>
                  <p className="text-sm">
                    <span className="font-semibold">Applied For: </span>
                    {c.role}
                  </p>
                  <p className="text-sm text-gray-500">
                    <span className="font-semibold">Date: </span>
                    {c.date}
                  </p>
                  <p>
                    <span className="font-semibold">Status: </span>
                    <span className={getStatusClasses(c.status)}>
                      {c.status}
                    </span>
                  </p>
                  <div className="flex gap-4 justify-start mt-2">
                    <button className="p-2 rounded-full text-[#00233e] hover:bg-[rgba(0,35,62,0.1)] transition-colors">
                      <FaEye />
                    </button>
                    <button className="p-2 hover:bg-blue-50 rounded-full text-[#42A5F5]">
                      <FaEnvelope />
                    </button>
                    <button className="text-red-600 hover:bg-red-100 rounded-full p-2 transition-colors">
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
                {endIndex > candidates.length ? candidates.length : endIndex} of{" "}
                {candidates.length} entries
              </p>
              <div className="flex items-center gap-1">
                <button
                  onClick={handlePrev}
                  disabled={currentPage === 1}
                  className={`px-3 py-1 border rounded flex items-center justify-center ${
                    currentPage === 1
                      ? "bg-gray-200 text-gray-400 cursor-not-allowed"
                      : "bg-gray-100 hover:bg-gray-200"
                  }`}
                >
                  <FiChevronLeft size={16} />
                </button>

                {[...Array(totalPages)].map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentPage(index + 1)}
                    className={`px-3 py-1 border rounded cursor-pointer ${
                      currentPage === index + 1
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
                  className={`px-3 py-1 border rounded flex items-center justify-center ${
                    currentPage === totalPages
                      ? "bg-gray-200 text-gray-400 cursor-not-allowed"
                      : "bg-gray-100 hover:bg-gray-200"
                  }`}
                >
                  <FiChevronRight size={16} />
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
      {/* <Footer /> */}
    </>
  );
};

export default Recruiterlist;
