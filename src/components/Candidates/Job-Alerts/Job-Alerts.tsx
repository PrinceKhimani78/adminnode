"use client";
import React, { useState, useEffect, useRef } from "react";
import { FaEye, FaTrash } from "react-icons/fa";
import Image from "next/image";
import Link from "next/link";
import Sidebar from "@/components/Common/Sidebar";
import Footer from "@/components/Footer/Footer";
import { IoChevronForward } from "react-icons/io5";
import { FiChevronRight } from "react-icons/fi";
const jobs = [
  {
    id: 1,
    title: "Web Developer",
    description: "A strategic approach to website design..",
    date: "28/06/2023",
  },
  {
    id: 2,
    title: "SEO Experts",
    description: "Providing the best SEO practices.",
    date: "28/06/2023",
  },
  {
    id: 3,
    title: "Web Developer",
    description: "As promised, we’re the most professional..",
    date: "Weekly",
  },
  {
    id: 4,
    title: "Web Designer",
    description: "Custom web design solutions websites..",
    date: "28/06/2023",
  },
  {
    id: 5,
    title: "Full-Stack Developer",
    description: "A strategic approach to website design..",
    date: "28/06/2023",
  },
];

const JobAlerts = () => {
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const [sortBy, setSortBy] = useState("Last 2 Months");
  const [sortOpen, setSortOpen] = useState(false);
  const sortOptions = [
    "Last 2 Months",
    "Last 1 Month",
    "Last 2 Weeks",
    "Last 1 Week",
  ];
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(e.target as Node)
      ) {
        setSortOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <>
      <div className="pl-2 pr-4 sm:px-2 py-2 flex gap-3 sm:gap-4 my-30 relative">
        <Sidebar
          type="candidate"
          mobileOpen={mobileOpen}
          setMobileOpen={setMobileOpen}
        />
        <main className="flex-1 px-5 py-5 bg-white shadow rounded-lg space-y-8">
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
                  Job Alerts
                </h1>
              </div>
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
                    <span className="text-gray-700 font-medium">
                      Job-Alerts
                    </span>
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

          {/* Sorting */}
          <div className="flex flex-col sm:flex-row justify-between gap-3">
            <p
              className="fontAL font-semibold capitalize text-xl mt-5"
              style={{
                letterSpacing: "1px",
                wordSpacing: "2px",
                lineHeight: 1.2,
              }}
            >
              Job Alerts
            </p>
            <div className="flex items-center gap-2" ref={dropdownRef}>
              <span className="hidden text-sm font-semibold text-gray-800 sm:block">
                Sort By
              </span>
              <div className="relative">
                <button
                  type="button"
                  onClick={() => setSortOpen((v) => !v)}
                  className="inline-flex items-center justify-between w-full gap-2 px-4 py-2 text-sm font-medium border sm:w-auto rounded-xl border-slate-200 text-slate-700 hover:bg-slate-50"
                >
                  <span className="font-semibold text-slate-900">{sortBy}</span>
                  <svg
                    className="w-4 h-4 text-slate-500"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path d="M5.23 7.21a.75.75 0 011.06.02L10 11.19l3.71-3.96a.75.75 0 111.08 1.04l-4.25 4.54a.75.75 0 01-1.08 0L5.25 8.27a.75.75 0 01-.02-1.06z" />
                  </svg>
                </button>

                {sortOpen && (
                  <ul className="absolute right-0 z-20 mt-2 overflow-hidden bg-white border shadow-lg w-44 rounded-xl border-slate-200">
                    {sortOptions.map((opt) => (
                      <li key={opt}>
                        <button
                          type="button"
                          onClick={() => {
                            setSortBy(opt);
                            setSortOpen(false);
                          }}
                          className={`w-full px-4 py-2 text-left text-sm hover:bg-slate-50 ${
                            sortBy === opt ? "bg-slate-50 font-semibold" : ""
                          }`}
                        >
                          {opt}
                        </button>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </div>
          </div>

          {/* Job Alerts  */}
          <div className="grid gap-4 sm:gap-6">
            {jobs.map((job, i) => (
              <div
                key={job.id}
                className={`flex flex-col sm:flex-row sm:items-center justify-between border border-gray-400 rounded-lg p-4 shadow-sm ${
                  i % 2 === 0 ? "bg-white" : "bg-gray-50"
                }`}
              >
                {/* Job Info */}
                <div className="flex-1 text-center sm:text-left">
                  <h3 className="text-lg font-semibold">{job.title}</h3>
                  <p className="text-gray-600 text-sm">{job.description}</p>
                  <p className="text-gray-400 text-xs mt-1">📅 {job.date}</p>
                </div>

                {/* Actions */}
                <div className="flex gap-4 mt-3 sm:mt-0 sm:ml-6 justify-center">
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
        </main>
      </div>
      {/* <Footer /> */}
    </>
  );
};

export default JobAlerts;
