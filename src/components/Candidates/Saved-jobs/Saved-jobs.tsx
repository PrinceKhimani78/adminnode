"use client";
import Sidebar from "@/components/Common/Sidebar";
import React, { useState } from "react";
import { FaEye, FaTrash } from "react-icons/fa";
import Image from "next/image";
import Link from "next/link";
import { IoChevronForward } from "react-icons/io5";
import { FiChevronRight } from "react-icons/fi";

const jobs = [
  {
    id: 1,
    logo: "/images/arrow1.jpg",
    title: "Art Production Specialist",
    company: "Coderbotics Solutions",
    date: "28/06/2023",
  },
  {
    id: 2,
    logo: "/images/miscrosoftwebp",
    title: "IT Department Manager",
    company: "Microsoft Solution",
    date: "28/06/2023",
  },
  {
    id: 3,
    logo: "/images/companyname.jpg",
    title: "Recreation & Fitness Worker",
    company: "Galaxy IT Solution",
    date: "28/06/2023",
  },
  {
    id: 4,
    logo: "/images/arrow1.jpg",
    title: "Frontend Developer",
    company: "TechWorld Pvt Ltd",
    date: "29/06/2023",
  },
  {
    id: 5,
    logo: "/images/companyname.jpg",
    title: "Backend Engineer",
    company: "Cloudify Systems",
    date: "29/06/2023",
  },
  {
    id: 6,
    logo: "/images/miscrosoftwebp",
    title: "Full Stack Developer",
    company: "NextGen IT",
    date: "30/06/2023",
  },
  {
    id: 7,
    logo: "/images/arrow1.jpg",
    title: "Data Analyst",
    company: "Insight Analytics",
    date: "30/06/2023",
  },
  {
    id: 8,
    logo: "/images/companyname.jpg",
    title: "UI/UX Designer",
    company: "PixelPerfect Designs",
    date: "01/07/2023",
  },
  {
    id: 9,
    logo: "/images/miscrosoftwebp",
    title: "Project Manager",
    company: "Agile Corp",
    date: "01/07/2023",
  },
  {
    id: 10,
    logo: "/images/arrow1.jpg",
    title: "Mobile App Developer",
    company: "Appify Solutions",
    date: "02/07/2023",
  },
  {
    id: 11,
    logo: "/images/companyname.jpg",
    title: "QA Tester",
    company: "BugFree Labs",
    date: "02/07/2023",
  },
  {
    id: 12,
    logo: "/images/arrow1.jpg",
    title: "Marketing Specialist",
    company: "Growthify Agency",
    date: "03/07/2023",
  },
  {
    id: 13,
    logo: "/images/miscrosoftwebp",
    title: "Cyber Security Analyst",
    company: "SecureNet Pvt Ltd",
    date: "03/07/2023",
  },
  {
    id: 14,
    logo: "/images/companyname.jpg",
    title: "DevOps Engineer",
    company: "CloudOps Hub",
    date: "04/07/2023",
  },
  {
    id: 15,
    logo: "/images/arrow1.jpg",
    title: "Content Writer",
    company: "Creative Minds",
    date: "04/07/2023",
  },
  {
    id: 16,
    logo: "/images/miscrosoftwebp",
    title: "HR Manager",
    company: "PeopleFirst Ltd",
    date: "05/07/2023",
  },
  {
    id: 17,
    logo: "/images/companyname.jpg",
    title: "Finance Executive",
    company: "FinTrack Solutions",
    date: "05/07/2023",
  },
  {
    id: 18,
    logo: "/images/arrow1.jpg",
    title: "Graphic Designer",
    company: "DesignHub Studio",
    date: "06/07/2023",
  },
  {
    id: 19,
    logo: "/images/miscrosoftwebp",
    title: "SEO Specialist",
    company: "RankBoost Agency",
    date: "06/07/2023",
  },
  {
    id: 20,
    logo: "/images/companyname.jpg",
    title: "Business Analyst",
    company: "StrategyWorks",
    date: "07/07/2023",
  },
];

const Savedjobs = () => {
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const [entries, setEntries] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);

  const totalPages = Math.ceil(jobs.length / entries);

  const startIndex = (currentPage - 1) * entries;
  const endIndex = startIndex + entries;
  const currentJobs = jobs.slice(startIndex, endIndex);

  const handlePrev = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  const handleNext = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };

  const handleEntriesChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setEntries(Number(e.target.value));
    setCurrentPage(1); // reset to first page on change
  };

  return (
    <div className="pl-2 pr-4 sm:px-2 py-2 flex gap-3 sm:gap-4 my-30 relative">
      {/* sidebar  */}
      <Sidebar
        type="candidate"
        mobileOpen={mobileOpen}
        setMobileOpen={setMobileOpen}
      />
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
                Saved-jobs
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
                <li className="flex items-center gap-2">
                  <Link
                    href="/candidates"
                    className="hover:text-gray-700 transition"
                  >
                    Candidates
                  </Link>
                  <FiChevronRight />
                </li>
                <li>
                  <span className="text-gray-700 font-medium">Saved-jobs</span>
                </li>
              </ol>
            </nav>
          </div>
        </div>

        {/* Profile */}
        <div className="flex items-center gap-4">
          <Image
            src="/images/profile1webp"
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

        {/* saved jobs controls */}
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

        {/* Jobs Table */}
        <div className="">
          <div className="w-full border border-gray-400 rounded-md text-sm ">
            {/* Header Row (hidden on small screens) */}
            <div className="hidden sm:grid grid-cols-4 bg-gray-100 border-b border-gray-400 font-semibold">
              <div className="px-4 py-2 border-r last:border-r-0 border-gray-400">
                Job Title
              </div>
              <div className="px-4 py-2 border-r last:border-r-0 border-gray-400">
                Company
              </div>
              <div className="px-4 py-2 border-r last:border-r-0 border-gray-400">
                Date
              </div>
              <div className="px-4 py-2">Action</div>
            </div>

            {/* Data Rows */}
            {currentJobs.map((job, i) => (
              <div
                key={job.id}
                className={`grid grid-cols-1 sm:grid-cols-4 ${
                  i % 2 === 0 ? "bg-white" : "bg-gray-50"
                } border-b border-gray-400`}
              >
                {/* Job Title */}
                <div className="px-3 py-2 border-r last:border-r-0 border-gray-400 grid grid-cols-[40px_1fr] gap-3 items-center font-medium text-[#00C9FF]">
                  {/* Logo */}
                  <Image
                    src={job.logo}
                    alt={job.title}
                    width={32}
                    height={32}
                    className="rounded"
                  />

                  {/* Text (label + title stacked) */}
                  <div className="flex flex-col">
                    <span className="sm:hidden font-semibold text-gray-700 text-xs">
                      Job Title:
                    </span>
                    <span>{job.title}</span>
                  </div>
                </div>

                {/* Company */}
                <div className="px-4 py-2 border-r last:border-r-0 border-gray-400 flex items-center gap-2">
                  <span className="sm:hidden font-semibold text-gray-700">
                    Company:
                  </span>
                  {job.company}
                </div>

                {/* Date */}
                <div className="px-4 py-2 border-r border-gray-400 flex items-center gap-2">
                  <span className="sm:hidden font-semibold text-gray-700">
                    Date:
                  </span>
                  {job.date}
                </div>

                {/* Action */}
                <div className="px-4 py-2 flex gap-3 justify-center items-center">
                  <span className="sm:hidden font-semibold text-gray-700">
                    Action:
                  </span>
                  <button className="text-[#00C9FF] cursor-pointer hover:text-[#0099cc] transition">
                    <FaEye />
                  </button>
                  <button className="text-[#00C9FF] cursor-pointer hover:text-[#0099cc] transition">
                    <FaTrash />
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* pagination */}
          <div className="flex flex-col sm:flex-row justify-between items-center text-sm text-gray-600 gap-2 mt-5">
            <p>
              Showing {startIndex + 1} to{" "}
              {endIndex > jobs.length ? jobs.length : endIndex} of {jobs.length}{" "}
              entries
            </p>
            <div className="flex items-center gap-1">
              <button
                onClick={handlePrev}
                disabled={currentPage === 1}
                className={`px-3 py-1 border rounded cursor-pointer ${
                  currentPage === 1
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
                className={`px-3 py-1 border rounded cursor-pointer ${
                  currentPage === totalPages
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
    </div>
  );
};

export default Savedjobs;
