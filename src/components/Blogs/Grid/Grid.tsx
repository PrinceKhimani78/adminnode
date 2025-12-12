"use client";
import React, { useState } from "react";
import Image from "next/image";

import Link from "next/link";
import Footer from "@/components/Footer/Footer";
/* =============================
   Static data / types
============================= */
// const categories = [
//   "All Category",
//   "Design",
//   "Development",
//   "Marketing",
//   "Sales",
//   "Operations",
// ];
const blogs: BlogItem[] = [
  {
    date: "Aug 20, 2025",
    text: "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Repudiandae in praesentium optio adipisci? Quidem, sint 1",
    link: "/blog1",
  },
  {
    date: "Sept 05, 2025",
    text: "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Repudiandae in praesentium optio adipisci? Quidem, sint 2",
    link: "/blog2",
  },
  {
    date: "Sept 25, 2025",
    text: "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Repudiandae in praesentium optio adipisci? Quidem, sint 3",
    link: "/blog3",
  },
  {
    date: "Sept 8, 2025",
    text: "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Repudiandae in praesentium optio adipisci? Quidem, sint 3",
    link: "/blog4",
  },
  {
    date: "Sept 7, 2025",
    text: "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Repudiandae in praesentium optio adipisci? Quidem, sint 3",
    link: "/blog5",
  },
  {
    date: "Sept 3, 2025",
    text: "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Repudiandae in praesentium optio adipisci? Quidem, sint 3",
    link: "/blog6",
  },
  {
    date: "Sept 4, 2025",
    text: "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Repudiandae in praesentium optio adipisci? Quidem, sint 3",
    link: "/blog7",
  },
  {
    date: "Sept 12, 2025",
    text: "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Repudiandae in praesentium optio adipisci? Quidem, sint 3",
    link: "/blog8",
  },
];
type BlogItem = {
  date: string;
  text: string;
  link: string;
};
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
//     logo: "/images/company.jpg",
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

// const jobTypeOptions = [
//   { label: "Freelance", count: 9 },
//   { label: "Full Time", count: 7 },
//   { label: "Internship", count: 15 },
//   { label: "Part Time", count: 20 },
//   { label: "Temporary", count: 22 },
//   { label: "Volunteer", count: 25 },
// ];

// const datePostOptions = [
//   "Last hour",
//   "Last 24 hours",
//   "Last 7 days",
//   "Last 14 days",
//   "Last 30 days",
//   "All",
// ] as const;
// type DatePost = (typeof datePostOptions)[number];

// const employmentOptions = [
//   "Freelance",
//   "Full Time",
//   "Internship",
//   "Part Time",
// ] as const;
// type Employment = (typeof employmentOptions)[number];

// const TAGS = [
//   "General",
//   "Jobs",
//   "Payment",
//   "Application",
//   "Work",
//   "Recruiting",
//   "Employer",
//   "Income",
//   "Tips",
// ] as const;

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
const Grid = () => {
  // Breadcrumbs
  type Crumb = { name: string; href?: string };
  const crumbs: Crumb[] = [{ name: "Home", href: "/" }, { name: "Blogs" }];

  return (
    <>
      {/* banner */}
      <section className="relative overflow-hidden">
        <div className="h-[220px] lg:h-[350px] bg-[url('/images/RI_banner_bg.webp')] bg-cover bg-center bg-no-repeat bg-fixed" />
        <div className="absolute inset-0 flex h-[220px] lg:h-[350px] place-items-end  justify-center px-5 lg:px-[5%] 2xl:px-[10%]">
          <div className="max-w-screen-xl w-full text-center">
            <h1 className="inline-block mb-4 px-4 py-2 text-slate-900  sm:text-xl fontAL font-semibold capitalize text-2xl md:text-3xl lg:text-4xl mt-5">
              Blogs
            </h1>
            {/* Breadcrumbs */}
            <nav
              aria-label="Breadcrumb"
              className="mb-6 text-sm text-slate-700"
            >
              <ol className="flex items-center justify-center gap-2">
                {crumbs.map((c, i) => {
                  const isLast = i === crumbs.length - 1;
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
      {/* main content */}
      <div className="">
        <section className="pb-10 px-1 lg:px-[5%] 2xl:px-[15%]">
          <div className="max-w-screen-xl px-4 py-10 mx-auto sm:px-6 lg:px-8 md:py-14">
            <div className="flex flex-col items-start gap-8 lg:flex-row lg:gap-8">
              {/* Left side */}
              <div className="w-full lg:flex-1">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-10 mt-10">
                  {blogs.map((blog) => (
                    <article key={blog.link} className="relative">
                      {/* Image container */}
                      <div className="relative overflow-hidden rounded-2xl aspect-[9/11]">
                        <Image
                          src="https://imgcdn.stablediffusionweb.com/2025/2/1/bd370b10-62c0-482b-a06b-63ca5d29ce38.jpg"
                          alt="Blog image"
                          fill
                          sizes="(min-width:1024px) 33vw, (min-width:640px) 50vw, 100vw"
                          className="object-cover"
                        />
                      </div>

                      {/* Blue content box */}
                      <div className="relative -mt-12 mx-4 rounded-2xl bg-[#023052] text-white p-5 shadow-xl">
                        {/* Date pill */}
                        <span className="absolute -top-5 left-1/4 -translate-x-1/2 rounded-full bg-white text-[#023052] px-4 py-1 shadow text-sm font-medium">
                          {blog.date}
                        </span>

                        <p className="mt-5 mb-3 leading-6">{blog.text}</p>
                        <Link
                          href="/blogs/details"
                          className="italic underline-offset-2 hover:underline text-white/90"
                        >
                          Read More
                        </Link>
                      </div>
                    </article>
                  ))}
                </div>
              </div>

              {/* RIGHT SIDE */}
              <div className="w-full lg:w-[280px] xl:w-[270px] flex-shrink-0 md:sticky md:top-20 lg:top-24 self-start mt-8">
                <aside className="space-y-10">
                  {/* Search */}
                  <div className="relative">
                    <input
                      type="text"
                      placeholder="Search"
                      className="w-full h-12 rounded-2xl bg-white pl-4 pr-12 text-sm placeholder-slate-400 shadow-[0_12px_40px_rgba(2,6,23,0.06)] focus:outline-none"
                    />
                    <span className="absolute right-2 top-1/2 -translate-y-1/2 inline-flex h-8 w-8 items-center justify-center rounded-full border border-slate-200 text-slate-500">
                      <svg
                        viewBox="0 0 20 20"
                        className="h-4 w-4"
                        fill="currentColor"
                      >
                        <path
                          fillRule="evenodd"
                          d="M12.9 14.32a7 7 0 1 1 1.414-1.414l3.39 3.39a1 1 0 0 1-1.414 1.414l-3.39-3.39zM14 9a5 5 0 1 1-10 0 5 5 0 0 1 10 0z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </span>
                  </div>

                  {/* Categories */}
                  <section>
                    <h4 className="relative mb-5 pl-4 text-[20px] font-semibold text-slate-900">
                      <span className="absolute left-0 top-1 bottom-1 w-[3px] rounded bg-[#00c9ff]" />
                      Categories
                    </h4>
                    <ul className="space-y-4">
                      {[
                        { label: "Categories", count: 8 },
                        { label: "Education", count: 12 },
                        { label: "Information", count: 15 },
                        { label: "Jobs", count: 25 },
                        { label: "Learn", count: 36 },
                        { label: "Skill", count: 12 },
                      ].map((c) => (
                        <li
                          key={c.label}
                          className="flex items-center justify-between"
                        >
                          <span className="text-[15px] text-slate-700">
                            {c.label}
                          </span>
                          <span className="tabular-nums text-[15px] text-slate-600">
                            {String(c.count).padStart(2, "0")}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </section>

                  {/* Recent Article */}
                  <section>
                    <h4 className="relative mb-5 pl-4 text-[20px] font-semibold text-slate-900">
                      <span className="absolute left-0 top-1 bottom-1 w-[3px] rounded bg-[#00c9ff]" />
                      Recent Article
                    </h4>
                    <ul className="space-y-6">
                      {[
                        {
                          title:
                            "Equipment you can count on. People you can trust.",
                          date: "April 08, 2023",
                          img: "/images/job-gridwebp",
                          href: "/blog1",
                        },
                        {
                          title: "Advanced Service Functions by Air Transport",
                          date: "April 12, 2023",
                          img: "/images/job-gridwebp",
                          href: "/blog2",
                        },
                        {
                          title: "Advanced Service Functions by Air Transport",
                          date: "April 12, 2023",
                          img: "/images/job-gridwebp",
                          href: "/blog3",
                        },
                        {
                          title: "Advanced Service Functions by Air Transport",
                          date: "April 12, 2023",
                          img: "/images/job-gridwebp",
                          href: "/blog4",
                        },
                        {
                          title: "Advanced Service Functions by Air Transport",
                          date: "April 12, 2023",
                          img: "/images/job-gridwebp",
                          href: "/blog5",
                        },
                      ].map((a) => (
                        <li key={a.href} className="flex gap-3">
                          <div className="relative h-14 w-14 shrink-0 overflow-hidden rounded-lg">
                            <Image
                              src={a.img}
                              alt={a.title}
                              fill
                              className="object-cover"
                            />
                          </div>
                          <div className="min-w-0">
                            <Link
                              href={a.href}
                              className="text-[13px] font-medium text-[#00c9ff] hover:underline"
                            >
                              {a.date}
                            </Link>
                            <p className="mt-1 text-[14px] leading-5 text-slate-800">
                              {a.title}
                            </p>
                          </div>
                        </li>
                      ))}
                    </ul>
                  </section>

                  {/* Tags */}
                  <section>
                    <h4 className="relative mb-5 pl-4 text-[20px] font-semibold text-slate-900">
                      <span className="absolute left-0 top-1 bottom-1 w-[3px] rounded bg-[#00c9ff]" />
                      Tags
                    </h4>

                    <div className="flex flex-wrap gap-3">
                      {[
                        "General",
                        "Jobs",
                        "Payment",
                        "Application",
                        "Work",
                        "Recruiting",
                        "Employer",
                        "Income",
                        "Tips",
                      ].map((tag) => (
                        <button
                          key={tag}
                          type="button"
                          className="rounded-full bg-blue-50 px-4 py-2 text-[14px] font-medium text-sky-600 hover:bg-sky-100 transition"
                        >
                          {tag}
                        </button>
                      ))}
                    </div>
                  </section>
                </aside>
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
