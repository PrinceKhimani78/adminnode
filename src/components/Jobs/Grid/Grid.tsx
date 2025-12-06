"use client";
import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import Footer from "@/components/Footer/Footer";

/* =============================
   Static data / types
============================= */
const categories = [
  "All Category",
  "Design",
  "Development",
  "Marketing",
  "Sales",
  "Operations",
];
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
  {
    id: 7,
    date: "6 day ago",
    btnText: "Lorem6",
    btnColor: "#881A2D",
    title: "Lorem ipsum dolor sit amet consectetur6",
    desc: "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Temporibus, explicabo ea. Odio!6",
    link: "https://lorem ipsum dolor sit amet.6",
    price: "$26909 /Month",
    footerLink: "job details",
  },
  {
    id: 8,
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
    id: 9,
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
    id: 10,
    date: "5 day ago",
    btnText: "Lorem4",
    btnColor: "#00C9FF",
    title: "Lorem ipsum dolor sit amet consectetur4",
    desc: "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Temporibus, explicabo ea. Odio!4",
    link: "https://lorem ipsum dolor sit amet.4",
    price: "$24909 /Month",
    footerLink: "job details",
  },
];
// type BadgeTone = "success" | "warning" | "primary" | "info" | "amber";
// interface Job {
//   id: number;
//   logo: string;
//   daysAgo: string;
//   badge: { label: string; tone: BadgeTone };
//   title: string;
//   address: string;
//   site: string;
//   pay: string;
// }

// const JOBS: Job[] = [
//   {
//     id: 1,
//     logo: "/images/company.jpg",
//     daysAgo: "1 day ago",
//     badge: { label: "New", tone: "success" },
//     title: "Senior Web Designer , Developer",
//     address: "1363–1385 Sunset Blvd Los Angeles, CA 90026, USA",
//     site: "https://thewebmax.com",
//     pay: "$2000 – $2500 / Month",
//   },
//   {
//     id: 2,
//     logo: "/images/business.jpg",
//     daysAgo: "15 days ago",
//     badge: { label: "Internship", tone: "warning" },
//     title: "Senior Rolling Stock Technician",
//     address: "1363–1385 Sunset Blvd Los Angeles, CA 90026, USA",
//     site: "https://thewebmax.com",
//     pay: "$7 / Hour",
//   },
//   {
//     id: 3,
//     logo: "/images/companyname.jpg",
//     daysAgo: "6 Month ago",
//     badge: { label: "Fulltime", tone: "primary" },
//     title: "IT Department Manager",
//     address: "1363–1385 Sunset Blvd Los Angeles, CA 90026, USA",
//     site: "https://thewebmax.com",
//     pay: "$2000 – $2500 / Month",
//   },
//   {
//     id: 4,
//     logo: "/images/arrow1.jpg",
//     daysAgo: "2 days ago",
//     badge: { label: "Freelancer", tone: "info" },
//     title: "Art Production Specialist",
//     address: "1363–1385 Sunset Blvd Los Angeles, CA 90026, USA",
//     site: "https://thewebmax.com",
//     pay: "$1500 – $1800 / Month",
//   },
//   {
//     id: 5,
//     logo: "/images/vectorlogo.jpg",
//     daysAgo: "1 day ago",
//     badge: { label: "Temporary", tone: "amber" },
//     title: "Recreation & Fitness Worker",
//     address: "1363–1385 Sunset Blvd Los Angeles, CA 90026, USA",
//     site: "https://thewebmax.com",
//     pay: "$500 – $1000 / Month",
//   },
//   {
//     id: 6,
//     logo: "/images/company.jpg",
//     daysAgo: "1 day ago",
//     badge: { label: "New", tone: "success" },
//     title: "Senior Web Designer , Developer",
//     address: "1363–1385 Sunset Blvd Los Angeles, CA 90026, USA",
//     site: "https://thewebmax.com",
//     pay: "$2000 – $2500 / Month",
//   },
//   {
//     id: 7,
//     logo: "/images/business.jpg",
//     daysAgo: "15 days ago",
//     badge: { label: "Internship", tone: "warning" },
//     title: "Senior Rolling Stock Technician",
//     address: "1363–1385 Sunset Blvd Los Angeles, CA 90026, USA",
//     site: "https://thewebmax.com",
//     pay: "$7 / Hour",
//   },
//   {
//     id: 8,
//     logo: "/images/companyname.jpg",
//     daysAgo: "6 Month ago",
//     badge: { label: "Fulltime", tone: "primary" },
//     title: "IT Department Manager",
//     address: "1363–1385 Sunset Blvd Los Angeles, CA 90026, USA",
//     site: "https://thewebmax.com",
//     pay: "$2000 – $2500 / Month",
//   },
//   {
//     id: 9,
//     logo: "/images/arrow1.jpg",
//     daysAgo: "2 days ago",
//     badge: { label: "Freelancer", tone: "info" },
//     title: "Art Production Specialist",
//     address: "1363–1385 Sunset Blvd Los Angeles, CA 90026, USA",
//     site: "https://thewebmax.com",
//     pay: "$1500 – $1800 / Month",
//   },
//   {
//     id: 10,
//     logo: "/images/vectorlogo.jpg",
//     daysAgo: "1 day ago",
//     badge: { label: "Temporary", tone: "amber" },
//     title: "Recreation & Fitness Worker",
//     address: "1363–1385 Sunset Blvd Los Angeles, CA 90026, USA",
//     site: "https://thewebmax.com",
//     pay: "$500 – $1000 / Month",
//   },
// ];

// const toneClasses: Record<BadgeTone, string> = {
//   success: "bg-green-600",
//   warning: "bg-yellow-700",
//   primary: "bg-indigo-600",
//   info: "bg-cyan-700",
//   amber: "bg-amber-700",
// };

const jobTypeOptions = [
  { label: "Freelance", count: 9 },
  { label: "Full Time", count: 7 },
  { label: "Internship", count: 15 },
  { label: "Part Time", count: 20 },
  { label: "Temporary", count: 22 },
  { label: "Volunteer", count: 25 },
];

const datePostOptions = [
  "Last hour",
  "Last 24 hours",
  "Last 7 days",
  "Last 14 days",
  "Last 30 days",
  "All",
] as const;
type DatePost = (typeof datePostOptions)[number];

const employmentOptions = [
  "Freelance",
  "Full Time",
  "Internship",
  "Part Time",
] as const;
type Employment = (typeof employmentOptions)[number];

const TAGS = [
  "General",
  "Jobs",
  "Payment",
  "Application",
  "Work",
  "Recruiting",
  "Employer",
  "Income",
  "Tips",
] as const;

/* =============================
   Job Card
============================= */
// function CareerCard({ job }: { job: Job }) {
//   return (
//     <article className="relative p-5 pt-8 transition bg-white border shadow-md rounded-xl border-slate-200 hover:-translate-y-1 hover:shadow-lg">
//       <div className="absolute w-16 h-16 overflow-hidden bg-white border shadow-lg -top-5 left-5 rounded-xl border-slate-200">
//         <Image src={job.logo} alt={job.title} fill className="object-cover" />
//       </div>
//       <div className="flex items-center justify-between mb-3 ml-20 text-sm">
//         <span className="font-semibold text-green-600">{job.daysAgo}</span>
//         <span
//           className={`rounded-lg px-3 py-1 text-xs font-bold text-white ${
//             toneClasses[job.badge.tone]
//           }`}
//         >
//           {job.badge.label}
//         </span>
//       </div>
//       <h4 className="mb-2 text-lg  text-slate">{job.title}</h4>
//       <div className="mb-2 text-sm text-slate-500">{job.address}</div>
//       <a
//         href={job.site}
//         target="_blank"
//         rel="noopener noreferrer"
//         className="text-sm font-semibold text-green-600 hover:underline"
//       >
//         {job.site}
//       </a>
//       <div className="flex items-center justify-between mt-4">
//         <div className="text-base text-slate-900">{job.pay}</div>
//         <Link
//           href={`/jobs/details`}
//           className="text-sm font-bold text-green-600 hover:underline"
//         >
//           Job Details
//         </Link>
//       </div>
//     </article>
//   );
// }

/* =============================
   Page
============================= */
const Grid = () => {
  // Breadcrumbs
  type Crumb = { name: string; href?: string };
  const crumbs: Crumb[] = [{ name: "Home", href: "/" }, { name: "Jobs" }];

  // Filters / UI state
  const [open, setOpen] = useState(false);
  const [category, setCategory] = useState(categories[0]);
  const [keyword, setKeyword] = useState("");
  const [location, setLocation] = useState("");
  const [employment, setEmployment] = useState<Employment | null>(null);
  const [selectedJobTypes, setSelectedJobTypes] = useState<string[]>([]);
  const [datePost, setDatePost] = useState<DatePost>("All");
  const [sortOpen, setSortOpen] = useState(false);
  const [showOpen, setShowOpen] = useState(false);

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

  const payValue = (p: string) => {
    const nums = (p.match(/\d[\d,]*/g) || []).map((n) =>
      parseInt(n.replace(/,/g, ""), 10)
    );
    return nums.length ? Math.max(...nums) : 1;
  };

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

  // const displayedJobs = sortedJobs.slice(0, showN);

  const toggleJobType = (label: string) =>
    setSelectedJobTypes((prev) =>
      prev.includes(label) ? prev.filter((l) => l !== label) : [...prev, label]
    );

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log({
      category,
      keyword,
      location,
      jobTypes: selectedJobTypes,
      datePost,
      employment,
    });
  };

  return (
    <>
      {/* ===== banner ===== */}
      <section className="relative overflow-hidden">
        <div className="h-[220px] lg:h-[350px] bg-[url('/images/RI_banner_bg.webp')] bg-cover bg-center bg-no-repeat bg-fixed" />
        <div className="absolute inset-0 flex h-[220px] lg:h-[350px] place-items-end  justify-center px-5 lg:px-[5%] 2xl:px-[10%]">
          <div className="max-w-screen-xl w-full text-center">
            <h1 className="inline-block mb-4 px-4 py-2 text-slate-900  sm:text-xl fontAL font-semibold capitalize text-2xl md:text-3xl lg:text-4xl mt-5">
              The Most Exciting Jobs
            </h1>
            {/* Breadcrumbs */}
            <nav
              aria-label="Breadcrumb"
              className="mb-6 text-sm text-slate-700"
            >
              <ol className="flex items-center justify-center gap-2">
                {crumbs.map((c, i) => {
                  const isLast = i === crumbs.length - 0;
                  return (
                    <li key={c.name} className="flex items-center gap-2">
                      {i > 0 && (
                        <svg
                          viewBox="0 0 20 20"
                          fill="currentColor"
                          className="w-4 h-4 text-slate-400"
                          aria-hidden="true"
                        >
                          <path d="M7.05 4.55a1 1 0 0 1 1.4 0l4 4a1 1 0 0 1 0 1.4l-4 4a1 1 0 1 1-1.4-1.4L9.88 10 7.05 7.15a1 1 0 0 1 0-1.4z" />
                        </svg>
                      )}
                      {isLast || !c.href ? (
                        <span className=" fontPOP text-xs sm:text-sm">
                          {c.name}
                        </span>
                      ) : (
                        <a
                          href={c.href}
                          className="hover:text-slate-900 fontPOP text-xs sm:text-sm"
                        >
                          {c.name}
                        </a>
                      )}
                    </li>
                  );
                })}
              </ol>
            </nav>
          </div>
        </div>
      </section>

      {/* ===== main content===== */}
      <div className="">
        <section className="pb-10 px-1 lg:px-[5%] 2xl:px-[15%]">
          <div className="max-w-screen-xl px-4 py-10 mx-auto sm:px-6 lg:px-8 md:py-14">
            {/* Layout: stacked on mobile, 2-col on lg */}
            <div className="flex flex-col items-start gap-8 lg:flex-row lg:gap-8">
              {/* Sidebar */}
              {/* right side  */}
              <div className="w-full lg:w-[268px] lg:sticky lg:top-24 flex-shrink-0">
                <aside>
                  <form onSubmit={submit} className="p-5 bg-white shadow">
                    {/* Category */}
                    <label className="block mb-2 text-[15px] font-bold text-slate-800">
                      Category
                    </label>
                    <div className="relative">
                      <button
                        type="button"
                        onClick={() => setOpen((v) => !v)}
                        className="flex items-center justify-between w-full px-4 py-3 text-sm text-gray-700 bg-white border border-gray-200 rounded-xl hover:bg-gray-50"
                      >
                        <span className="truncate">{category}</span>
                        <svg
                          className="w-5 h-5 text-gray-500"
                          viewBox="0 0 20 20"
                          fill="currentColor"
                        >
                          <path
                            fillRule="evenodd"
                            d="M5.23 7.21a.75.75 0 011.06.02L10 11.19l3.71-3.96a.75.75 0 111.08 1.04l-4.25 4.54a.75.75 0 01-1.08 0L5.25 8.27a.75.75 0 01-.02-1.06z"
                            clipRule="evenodd"
                          />
                        </svg>
                      </button>
                      {open && (
                        <ul
                          className="absolute z-20 w-full mt-1 overflow-hidden bg-white border border-gray-200 shadow-lg rounded-xl"
                          role="listbox"
                        >
                          {categories.map((c) => (
                            <li key={c}>
                              <button
                                type="button"
                                onClick={() => {
                                  setCategory(c);
                                  setOpen(false);
                                }}
                                className={`w-full px-4 py-2 text-left text-sm hover:bg-gray-50 ${
                                  c === category ? "bg-gray-50 font-medium" : ""
                                }`}
                                role="option"
                                aria-selected={c === category}
                              >
                                {c}
                              </button>
                            </li>
                          ))}
                        </ul>
                      )}
                    </div>

                    {/* Keyword */}
                    <label className="block mt-6 mb-2 text-sm font-bold text-slate-700">
                      Keyword
                    </label>
                    <div className="relative">
                      <input
                        type="text"
                        placeholder="Job title or Keyword"
                        value={keyword}
                        onChange={(e) => setKeyword(e.target.value)}
                        className="w-full px-4 py-3 pr-10 text-sm placeholder-gray-400 border border-gray-200 rounded-xl focus:border-gray-300 focus:outline-none"
                      />
                      <div className="absolute inset-y-0 flex items-center pointer-events-none right-3">
                        <svg
                          className="w-5 h-5 text-gray-500"
                          viewBox="0 0 20 20"
                          fill="currentColor"
                        >
                          <path
                            fillRule="evenodd"
                            d="M12.9 14.32a7 7 0 111.414-1.414l3.39 3.39a1 1 0 01-1.414 1.414l-3.39-3.39zM14 9a5 5 0 11-10 0 5 5 0 0110 0z"
                            clipRule="evenodd"
                          />
                        </svg>
                      </div>
                    </div>

                    {/* Location */}
                    <label className="block mt-6 mb-2 text-sm font-bold text-slate-700">
                      Location
                    </label>
                    <div className="relative">
                      <input
                        type="text"
                        placeholder="Search location"
                        value={location}
                        onChange={(e) => setLocation(e.target.value)}
                        className="w-full px-4 py-3 pr-10 text-sm placeholder-gray-400 border border-gray-200 rounded-xl focus:border-gray-300 focus:outline-none"
                      />
                      <div className="absolute inset-y-0 flex items-center pointer-events-none right-3">
                        <svg
                          className="w-5 h-5 text-gray-500"
                          viewBox="0 0 24 24"
                          fill="currentColor"
                        >
                          <path d="M12 2a7 7 0 00-7 7c0 5.25 7 13 7 13s7-7.75 7-13a7 7 0 00-7-7zm0 9.5a2.5 2.5 0 110-5 2.5 2.5 0 010 5z" />
                        </svg>
                      </div>
                    </div>

                    {/* Job Type */}
                    <label className="block mt-6 mb-3 text-sm font-semibold text-gray-800">
                      Job Type
                    </label>
                    <ul className="space-y-3">
                      {jobTypeOptions.map(({ label, count }) => {
                        const id = `jt-${label
                          .toLowerCase()
                          .replace(/\s+/g, "-")}`;
                        const checked = selectedJobTypes.includes(label);
                        return (
                          <li
                            key={label}
                            className="flex items-center justify-between"
                          >
                            <div className="flex items-center gap-3">
                              <input
                                id={id}
                                type="checkbox"
                                checked={checked}
                                onChange={() => toggleJobType(label)}
                                className="w-4 h-4 text-green-600 border-gray-300 rounded focus:ring-green-500"
                              />
                              <label
                                htmlFor={id}
                                className="text-[15px] text-gray-800"
                              >
                                {label}
                              </label>
                            </div>
                            <span className="text-[13px] font-semibold text-blue-600">
                              {String(count).padStart(2, "0")}
                            </span>
                          </li>
                        );
                      })}
                    </ul>

                    {/* Date Posts */}
                    <label className="block mt-8 mb-3 text-sm font-semibold text-gray-800">
                      Date Posts
                    </label>
                    <ul className="space-y-3">
                      {datePostOptions.map((opt) => {
                        const id = `dp-${opt
                          .toLowerCase()
                          .replace(/\s+/g, "-")}`;
                        return (
                          <li key={opt} className="flex items-center gap-3">
                            <input
                              id={id}
                              type="radio"
                              name="date-posts"
                              value={opt}
                              checked={datePost === opt}
                              onChange={() => setDatePost(opt)}
                              className="w-4 h-4 text-green-600 border-gray-300 focus:ring-green-500"
                            />
                            <label
                              htmlFor={id}
                              className="text-[15px] text-gray-800"
                            >
                              {opt}
                            </label>
                          </li>
                        );
                      })}
                    </ul>

                    {/* Employment */}
                    <label className="block mt-8 mb-3 text-sm font-semibold text-gray-800">
                      Type of Employment
                    </label>
                    <ul className="space-y-3">
                      {employmentOptions.map((opt) => {
                        const id = `emp-${opt
                          .toLowerCase()
                          .replace(/\s+/g, "-")}`;
                        return (
                          <li key={opt} className="flex items-center gap-3">
                            <input
                              id={id}
                              type="radio"
                              name="employment"
                              value={opt}
                              checked={employment === opt}
                              onChange={() => setEmployment(opt)}
                              className="w-4 h-4 text-green-600 border-gray-300 focus:ring-green-500"
                            />
                            <label
                              htmlFor={id}
                              className="text-[15px] text-gray-800"
                            >
                              {opt}
                            </label>
                          </li>
                        );
                      })}
                    </ul>
                  </form>

                  {/* Tags */}
                  <div className="p-5 mt-6 bg-white border shadow-sm rounded-lg border-slate-200">
                    <h4 className="mb-4 text-[16px] font-semibold text-slate-900">
                      Tags
                    </h4>
                    <div className="flex flex-wrap gap-3">
                      {TAGS.map((tag) => (
                        <button
                          key={tag}
                          type="button"
                          className="rounded-full bg-blue-50 px-3 py-1.5 text-[13px] font-medium text-blue-700 hover:bg-blue-100"
                        >
                          {tag}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Recruiting */}
                  <div className="mt-6 overflow-hidden rounded-lg border border-blue-100 shadow-[0_6px_24px_-12px_rgba(59,130,246,0.35)]">
                    <div className="relative h-48 sm:h-56 md:h-64">
                      <Image
                        src="/images/job-grid.png"
                        alt="Recruiting"
                        fill
                        className="object-cover"
                      />
                      <div className="absolute inset-0 bg-gradient-to-tr from-blue-900/70 to-blue-600/60" />
                      <div className="absolute inset-0 flex flex-col justify-center p-6">
                        <h3 className="mb-2 text-xl font-semibold text-white">
                          Recruiting?
                        </h3>
                        <p className="mb-5 text-sm leading-6 text-white/90">
                          Get Best Matched Jobs On your Email. Add Resume NOW!
                        </p>
                        <Link href="/pages/aboutus">
                          <button className="relative mt-8 px-4 h-9 overflow-hidden  border border-[white] bg-white   rounded-lg hover:bg-transparent text-[blue] hover:text-[white] active:scale-90 transition-all ease-out duration-700 cursor-pointer">
                            <span className="absolute right-0 w-10 h-full top-0 transitigroupon-all duration-1000 transform translate-x-12 bg-white opacity-10 -skew-x-12 group-hover:-translate-x-24 ease"></span>
                            <span className="relative flex gap-2 items-center text-sm font-semibold">
                              Know More
                            </span>
                          </button>
                        </Link>
                      </div>
                    </div>
                  </div>
                </aside>
              </div>

              {/* left side  */}
              {/* Main */}
              <div className="w-full lg:flex-1">
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
                                    showN === n
                                      ? "bg-slate-50 font-semibold"
                                      : ""
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
                  {cardData.map((card) => (
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
                            className="bg-white h-16 w-16 shadow-sm rounded-md
                   mt-0 md:-mt-10"
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

                      <p className="text-sm text-gray-500 mt-2 mb-5">
                        {card.desc}
                      </p>

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
                      {/* <div className="flex items-center justify-between mt-5">
                        <p className="font-semibold">{card.price}</p>

                        {/^https?:\/\//i.test(card.footerLink) ? (
                          <a
                            href={card.footerLink}
                            target="/jobs/details"
                            rel="noopener noreferrer"
                            className="text-[#72B76A] text-sm hover:underline underline-offset-4"
                          >
                            {card.footerLink}
                          </a>
                        ) : (
                          <Link
                            href={card.footerLink}
                            className="text-[#72B76A] text-sm hover:underline underline-offset-4"
                          >
                            {card.footerLink}
                          </Link>
                        )}
                      </div> */}

                      {/* <div className="flex items-center justify-between mt-5">
                        <p className="font-semibold">{card.price}</p>

                        {card.footerLink.startsWith("http") ? (
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
                      </div> */}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
      {/* <Footer /> */}
    </>
  );
};

export default Grid;
