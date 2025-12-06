"use client";
import React, { useState } from "react";
import Image from "next/image";
import Sidebar from "@/components/Common/Sidebar";
import Link from "next/link";
import { IoChevronForward } from "react-icons/io5";
import { FiChevronRight } from "react-icons/fi";

const cardData = [
  {
    id: 1,
    date: "1 day ago",
    btnText: "New",
    btnColor: "#72B76A",
    title: "Lorem ipsum dolor sit amet consectetur1",
    desc: "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Temporibus, explicabo ea. Odio!1",
    link: "https://lorem ipsum dolor sit amet.1",
    price: "$23908 /Month",
    footerLink: " job details",
  },
  {
    id: 2,
    date: "8 day ago",
    btnText: "Lorem1",
    btnColor: "#FFCC23",
    title: "Lorem ipsum dolor sit amet consectetur2",
    desc: "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Temporibus, explicabo ea. Odio!2",
    link: "https://lorem ipsum dolor sit amet.2",
    price: "$23907 /Month",
    footerLink: "job details",
  },
  {
    id: 3,
    date: "5 day ago",
    btnText: "Lorem3",
    btnColor: "#AE70BB",
    title: "Lorem ipsum dolor sit amet consectetur3",
    desc: "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Temporibus, explicabo ea. Odio!3",
    link: "https://lorem ipsum dolor sit amet.3",
    price: "$23909 /Month",
    footerLink: "job details",
  },
  {
    id: 4,
    date: "5 day ago",
    btnText: "Lorem4",
    btnColor: "#00C9FF",
    title: "Lorem ipsum dolor sit amet consectetur4",
    desc: "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Temporibus, explicabo ea. Odio!4",
    link: "https://lorem ipsum dolor sit amet.4",
    price: "$24909 /Month",
    footerLink: "job details",
  },
  {
    id: 5,
    date: "5 day ago",
    btnText: "Lorem5",
    btnColor: "#023052",
    title: "Lorem ipsum dolor sit amet consectetur5",
    desc: "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Temporibus, explicabo ea. Odio!5",
    link: "https://lorem ipsum dolor sit amet.5",
    price: "$25909 /Month",
    footerLink: "job details",
  },
  {
    id: 6,
    date: "6 day ago",
    btnText: "Lorem6",
    btnColor: "#881A2D",
    title: "Lorem ipsum dolor sit amet consectetur6",
    desc: "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Temporibus, explicabo ea. Odio!6",
    link: "https://lorem ipsum dolor sit amet.6",
    price: "$26909 /Month",
    footerLink: "job details",
  },
];

const payValue = (price: string) =>
  parseInt(price.replace(/[^0-9]/g, ""), 10) || 0;

const Appliedjobs = () => {
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const sortOptions = [
    "Most Recent",
    "Freelance",
    "Full Time",
    "Internship",
    "Part Time",
  ] as const;
  type SortOpt = (typeof sortOptions)[number];
  const [sortBy, setSortBy] = useState<SortOpt>("Most Recent");

  const showOptions = [10, 20, 30, 50] as const;
  const [showN, setShowN] = useState<(typeof showOptions)[number]>(10);

  const [sortOpen, setSortOpen] = useState(false);
  const [showOpen, setShowOpen] = useState(false);

  const sortedJobs = [...cardData].sort((a, b) => {
    switch (sortBy) {
      case "Freelance":
        return a.id - b.id;
      case "Full Time":
      case "Part Time":
        return payValue(b.price) - payValue(a.price);
      case "Internship":
        return payValue(a.price) - payValue(b.price);
      case "Most Recent":
      default:
        return b.id - a.id;
    }
  });
  type Crumb = { name: string; href?: string };
  const crumbs: Crumb[] = [
    { name: "Home", href: "/" },
    { name: "Candidates", href: "/candidates" },
    { name: "Applied-Jobs" },
  ];

  return (
    <>
      <div className="pl-2 pr-4 sm:px-2 py-2 flex gap-3 sm:gap-4 my-30 relative">
        {/* Sidebar */}
        <Sidebar
          type="candidate"
          mobileOpen={mobileOpen}
          setMobileOpen={setMobileOpen}
        />
        {/* Main Content */}
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
                  Applied-jobs
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
                    <span className="text-gray-700 font-medium">
                      Applied-jobs
                    </span>
                  </li>
                </ol>
              </nav>
            </div>
          </div>
          {/* Profile */}
          <div className="flex items-center gap-4">
            <Image
              src="/images/profile1.png"
              alt="Profile"
              width={80}
              height={80}
              className="rounded-full border"
            />
            <div>
              <h2 className="text-xl font-bold">Randall Henderson</h2>
              <p className="text-gray-500">IT Contractor</p>
            </div>
          </div>

          {/* Toolbar */}
          <div className="mb-12">
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <p className="font-semibold text-slate-800">
                Showing{" "}
                <span className="text-slate-900">
                  {sortedJobs.length.toLocaleString()}
                </span>{" "}
                jobs
              </p>

              <div className="flex items-center justify-between w-full gap-3 sm:w-auto sm:gap-4 sm:justify-end">
                {/* Sort By */}
                <div className="flex items-center gap-2">
                  <span className="hidden text-sm font-semibold text-gray-800 sm:block">
                    Sort By
                  </span>
                  <div className="relative">
                    <button
                      type="button"
                      onClick={() => {
                        setSortOpen((v) => !v);
                        setShowOpen(false);
                      }}
                      className="inline-flex items-center justify-between w-full gap-2 px-4 py-2 text-sm font-medium border sm:w-auto rounded-xl border-slate-200 text-slate-700 hover:bg-slate-50"
                    >
                      <span className="font-semibold text-slate-900">
                        {sortBy}
                      </span>
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
                                sortBy === opt
                                  ? "bg-slate-50 font-semibold"
                                  : ""
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

                {/* Show N */}
                <div className="relative">
                  <button
                    type="button"
                    onClick={() => {
                      setShowOpen((v) => !v);
                      setSortOpen(false);
                    }}
                    className="inline-flex items-center justify-between w-full gap-2 px-4 py-2 text-sm font-medium border sm:w-auto rounded-xl border-slate-200 text-slate-700 hover:bg-slate-50"
                  >
                    Show{" "}
                    <span className="font-semibold text-slate-900">
                      {showN}
                    </span>
                    <svg
                      className="w-4 h-4 text-slate-500"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path d="M5.23 7.21a.75.75 0 011.06.02L10 11.19l3.71-3.96a.75.75 0 111.08 1.04l-4.25 4.54a.75.75 0 01-1.08 0L5.25 8.27a.75.75 0 01-.02-1.06z" />
                    </svg>
                  </button>
                  {showOpen && (
                    <ul className="absolute right-0 z-20 w-32 mt-2 overflow-hidden bg-white border shadow-lg rounded-xl border-slate-200">
                      {showOptions.map((n) => (
                        <li key={n}>
                          <button
                            type="button"
                            onClick={() => {
                              setShowN(n);
                              setShowOpen(false);
                            }}
                            className={`w-full px-4 py-2 text-left text-sm hover:bg-slate-50 ${
                              showN === n ? "bg-slate-50 font-semibold" : ""
                            }`}
                          >
                            Show {n}
                          </button>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Cards */}
          <div className="grid grid-cols-1 gap-6 sm:gap-8 sm:grid-cols-2">
            {sortedJobs.slice(0, showN).map((card) => (
              <div
                key={card.id}
                className="bg-white p-4 rounded-lg group shadow-md 
                 transition-all duration-300 ease-in-out 
                 hover:-translate-y-2 hover:shadow-xl hover:bg-[#F9FAFB]"
              >
                <div className="flex justify-between gap-10">
                  <Link href="/" className="inline-block">
                    <Image
                      src="/images/company.jpg"
                      alt="Company logo"
                      width={64}
                      height={64}
                      className="bg-white h-16 w-16 shadow-sm mt-0 sm:-mt-10 rounded-md"
                    />
                  </Link>

                  <div className="flex gap-5 items-center">
                    <p className="text-[#72B76A] text-xs">{card.date}</p>
                    <button
                      className="relative px-4 h-8 overflow-hidden border rounded-md text-white active:scale-90 
                       transition-all ease-out duration-700 group-hover:scale-105"
                      style={{
                        backgroundColor: card.btnColor,
                        borderColor: card.btnColor,
                      }}
                    >
                      <span
                        className="absolute right-0 w-10 h-full top-0 transition-all duration-1000 transform 
                              translate-x-12 bg-white opacity-10 -skew-x-12 group-hover:-translate-x-24 ease"
                      ></span>
                      <span className="relative flex gap-2 items-center text-xs font-semibold">
                        {card.btnText}
                      </span>
                    </button>
                  </div>
                </div>

                <p className="font-semibold mt-5 group-hover:text-[#72B76A] transition-colors">
                  {card.title}
                </p>

                <p className="text-sm text-gray-500 mt-2 mb-5">{card.desc}</p>

                {card.link.startsWith("http") ? (
                  <a
                    href={encodeURI(card.link)}
                    target="/details"
                    rel="noopener noreferrer"
                    className="text-[#72B76A] text-sm hover:underline underline-offset-4"
                  >
                    {card.link}
                  </a>
                ) : (
                  <Link
                    href={card.link}
                    className="text-[#72B76A] text-sm hover:underline underline-offset-4"
                  >
                    {card.link}
                  </Link>
                )}
                <div className="flex items-center justify-between mt-5">
                  <p className="font-semibold">{card.price}</p>

                  <Link
                    href={`/jobs/details`}
                    className="text-[#72B76A] text-sm hover:underline underline-offset-4"
                  >
                    {card.footerLink || "Job details"}
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </main>
      </div>
    </>
  );
};

export default Appliedjobs;
