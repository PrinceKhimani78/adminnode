"use client";
import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import Sidebar from "../Common/Sidebar";
import { FaEye, FaTrash } from "react-icons/fa";

import { IoChevronForward } from "react-icons/io5";
import { FiChevronRight } from "react-icons/fi";

const jobs = [
  {
    id: 1,
    title: "Art Production Specialist",
    companyLogo: "/images/company.webp",
    location: "1363-1385 Sunset Blvd Los Angeles, CA 90026, USA",
    category: "Product Designer",
    type: "Freelancer",
    typeColor: "bg-[#72B76A]",
    applications: "13 Applied",
    created: "08/06/2023",
    expired: "28/06/2023",
  },
  {
    id: 2,
    title: "IT Department Manager",
    companyLogo: "/images/company.webp",
    location: "1363-1385 Sunset Blvd Los Angeles, CA 90026, USA",
    category: "PHP Developer",
    type: "Fulltime",
    typeColor: "bg-[#AE70BB]",
    applications: "06 Applied",
    created: "08/06/2023",
    expired: "28/06/2023",
  },
  {
    id: 3,
    title: "Recreation & Fitness Worker",
    companyLogo: "/images/company.webp",
    location: "1363-1385 Sunset Blvd Los Angeles, CA 90026, USA",
    category: "Gym Trainer",
    type: "Temporary",
    typeColor: "bg-[#FFCC23]",
    applications: "08 Applied",
    created: "08/06/2023",
    expired: "28/06/2023",
  },
  {
    id: 4,
    title: "Art Production Specialist",
    companyLogo: "/images/company.webp",
    location: "1363-1385 Sunset Blvd Los Angeles, CA 90026, USA",
    category: "Product Designer",
    type: "Freelancer",
    typeColor: "bg-[#72B76A]",
    applications: "13 Applied",
    created: "08/06/2023",
    expired: "28/06/2023",
  },
  {
    id: 5,
    title: "IT Department Manager",
    companyLogo: "/images/company.webp",
    location: "1363-1385 Sunset Blvd Los Angeles, CA 90026, USA",
    category: "PHP Developer",
    type: "Fulltime",
    typeColor: "bg-[#AE70BB]",
    applications: "06 Applied",
    created: "08/06/2023",
    expired: "28/06/2023",
  },
  {
    id: 6,
    title: "Recreation & Fitness Worker",
    companyLogo: "/images/company.webp",
    location: "1363-1385 Sunset Blvd Los Angeles, CA 90026, USA",
    category: "Gym Trainer",
    type: "Temporary",
    typeColor: "bg-[#FFCC23]",
    applications: "08 Applied",
    created: "08/06/2023",
    expired: "28/06/2023",
  },
];
const Managejobs = () => {
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const [allJobs, setAllJobs] = useState(jobs);
  const [showModal, setShowModal] = useState(false);
  const [jobToDelete, setJobToDelete] = useState<number | null>(null);
  const [entries, setEntries] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);

  const confirmDeleteJob = (id: number) => {
    setJobToDelete(id);
    setShowModal(true);
  };

  const handleDeleteJob = () => {
    if (jobToDelete !== null) {
      setAllJobs(allJobs.filter((job) => job.id !== jobToDelete));
      setShowModal(false);
      setJobToDelete(null);
    }
  };

  const totalPages = Math.ceil(allJobs.length / entries);

  const startIndex = (currentPage - 1) * entries;
  const endIndex = startIndex + entries;
  const currentJobs = allJobs.slice(startIndex, endIndex);

  const handlePrev = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  const handleNext = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };

  const handleEntriesChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setEntries(Number(e.target.value));
    setCurrentPage(1);
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
                  Manage-Jobs
                </h1>
              </div>

              {/* Breadcrumbs (hidden on mobile) */}
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
                      Manage-Jobs
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
          {/* Sorting */}
          <div className="flex flex-col sm:flex-row justify-between  gap-3">
            <div className="flex items-center gap-2">
              <span>Show</span>
              <select
                className="border rounded px-2 py-1 text-sm"
                value={entries}
                onChange={handleEntriesChange}
              >
                <option value={10}>10</option>
                <option value={15}>15</option>
                <option value={20}>20</option>
              </select>
              <span>entries</span>
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
          {/* Job Details  */}
          <div className="space-y-4">
            {currentJobs.map((job) => (
              <div
                key={job.id}
                className="flex flex-col sm:flex-row sm:items-center justify-between border border-gray-100 rounded-lg p-4 shadow-sm bg-white hover:bg-gray-50 transition"
              >
                {/* Job Info */}
                <div className="flex gap-4 items-center flex-1">
                  <Image
                    src={job.companyLogo}
                    alt={job.title}
                    width={60}
                    height={60}
                    className="rounded border"
                  />
                  <div>
                    <h3 className="text-lg font-semibold text-[#007bff] cursor-pointer hover:underline">
                      {job.title}
                    </h3>
                    <p className="text-sm text-gray-500">{job.location}</p>
                    <p className="text-sm text-gray-700 mt-1">
                      <span className="font-medium">Category:</span>{" "}
                      {job.category}
                    </p>
                  </div>
                </div>

                {/* Job Meta */}
                <div className="flex flex-col sm:flex-row sm:items-center gap-4 mt-3 sm:mt-0">
                  <span
                    className={`px-3 py-1 rounded-full text-white text-xs font-semibold ${job.typeColor}`}
                  >
                    {job.type}
                  </span>
                  <span className="text-sm text-blue-600 font-medium cursor-pointer hover:underline">
                    {job.applications}
                  </span>
                  <div className="text-xs text-gray-500">
                    <p>Created: {job.created}</p>
                    <p>Expired: {job.expired}</p>
                  </div>
                  {/* Actions */}
                  <div className="flex gap-3 text-[#00C9FF]">
                    <button className="p-2 hover:bg-blue-50 rounded-full">
                      <FaEye />
                    </button>
                    <button
                      onClick={() => confirmDeleteJob(job.id)}
                      className="p-2 hover:bg-red-50 text-red-500 rounded-full transition"
                    >
                      <FaTrash />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
          {/* pagination */}
          <div className="flex flex-col sm:flex-row justify-between items-center text-sm text-gray-600 gap-2 mt-5">
            <p>
              Showing {startIndex + 1} to{" "}
              {endIndex > allJobs.length ? allJobs.length : endIndex} of {allJobs.length}{" "}
              entries
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
        </main>
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
                  Do you want to delete this <span className="font-bold">Job Post</span>?
                </p>
                <div className="flex justify-center gap-4">
                  <button
                    onClick={() => setShowModal(false)}
                    className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
                  >
                    No
                  </button>
                  <button
                    onClick={handleDeleteJob}
                    className="px-6 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition"
                  >
                    Yes, Delete
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
      {/* <Footer /> */}
    </>
  );
};

export default Managejobs;
