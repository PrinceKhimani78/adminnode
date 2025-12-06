"use client";
import React from "react";
import Image from "next/image";
import Link from "next/link";
import {
  FaCalendarAlt,
  FaEnvelope,
  FaEye,
  FaGlobe,
  FaUserFriends,
  FaMapMarkerAlt,
  FaPhoneAlt,
  FaBriefcase,
  FaHourglassHalf,
  FaGraduationCap,
  FaVenusMars,
  FaDollarSign,
  FaFacebook,
  FaTwitter,
  FaLinkedin,
  FaWhatsapp,
  FaPinterest,
} from "react-icons/fa";
import Footer from "@/components/Footer/Footer";
const SKILL = [
  "Html",
  "Paython",
  "Wordprees",
  "JavaScript",
  "Work",
  "Recruiting",
  "Employer",
  "Income",
  "Tips",
] as const;
// const OFFICE_PHOTOS = [
//   "/images/job-grid.png",
//   "/images/job-grid.png",
//   "/images/job-grid.png",
//   "/images/job-grid.png",
//   "/images/job-grid.png",
//   "/images/job-grid.png",
//   "/images/job-grid.png",
//   "/images/job-grid.png",
//   "/images/job-grid.png",
//   "/images/job-grid.png",
//   "/images/job-grid.png",
//   "/images/job-grid.png",
// ];

const REQUIREMENTS: string[] = [
  "Must be able to communicate with others to convey information effectively.",
  "Personally passionate and up to date with current trends and technologies; comfortable working with adult media.",
  "Bachelor’s or Master’s degree level educational background.",
  "4+ years relevant PHP development experience.",
  "Troubleshooting, testing, and maintaining core product software and databases.",
];
const RESPONSIBILITIES: string[] = [
  "Establish and promote design guidelines, best practices, and standards.",
  "Accurately estimate design tickets during planning sessions.",
  "Partner with product and engineering to translate business and user goals into practical designs.",
  "Create wireframes, storyboards, user flows, process flows, and site maps.",
  "Present and defend designs and key deliverables to peers and executive stakeholders.",
  "Execute visual design stages from concept to final hand-off to engineering.",
];
const JOB_URL = "https://yourdomain.com/jobs/senior-web-designer"; // <- set real URL
const SHARE_TEXT = "Senior Web Designer / Developer — check this role";
const IMAGE_ABS_URL = "https://yourdomain.com/images/jobdeatail.jpg"; // for Pinterest

const SHARE_LINKS = [
  {
    name: "Facebook",
    href: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
      JOB_URL
    )}`,
    Icon: FaFacebook,
    cls: "bg-[#1877F2] hover:brightness-95",
  },
  {
    name: "Twitter",
    href: `https://twitter.com/intent/tweet?text=${encodeURIComponent(
      SHARE_TEXT
    )}&url=${encodeURIComponent(JOB_URL)}`,
    Icon: FaTwitter,
    cls: "bg-[#1DA1F2] hover:brightness-95",
  },
  {
    name: "Linkedin",
    href: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(
      JOB_URL
    )}`,
    Icon: FaLinkedin,
    cls: "bg-[#0A66C2] hover:brightness-95",
  },
  {
    name: "Whatsapp",
    href: `https://api.whatsapp.com/send?text=${encodeURIComponent(
      `${SHARE_TEXT} ${JOB_URL}`
    )}`,
    Icon: FaWhatsapp,
    cls: "bg-[#25D366] hover:brightness-95",
  },
  {
    name: "Pinterest",
    href: `https://pinterest.com/pin/create/button/?url=${encodeURIComponent(
      JOB_URL
    )}&media=${encodeURIComponent(
      IMAGE_ABS_URL
    )}&description=${encodeURIComponent(SHARE_TEXT)}`,
    Icon: FaPinterest,
    cls: "bg-[#E60023] hover:brightness-95",
  },
];

const ADDRESS = "1363 W Sunset Blvd, Los Angeles, CA 90026, USA";
const MAP_EMBED_SRC = `https://www.google.com/maps?q=${encodeURIComponent(
  ADDRESS
)}&output=embed`;
const MAP_DIRECTIONS = `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(
  ADDRESS
)}`;
const Check = () => (
  <svg viewBox="0 0 24 24" className="h-5 w-5">
    {/* <circle cx="12" cy="12" r="10" fill="rgb(219 234 254)" /> blue-100 */}
    <path
      d="M9 12.75 11.25 15 15 9.75"
      fill="none"
      stroke="rgb(37 99 235)"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const Details = () => {
  // breadcrmbs
  type Crumb = { name: string; href?: string };
  const crumbs: Crumb[] = [
    { name: "Home", href: "/" },
    { name: "Jobs", href: "/jobs" },
    { name: "Job Details" },
  ];

  return (
    <>
      {/* ===== banner ===== */}
      <section className="relative overflow-hidden">
        <div className="h-[180px] sm:h-[220px] lg:h-[350px] bg-[url('/images/RI_banner_bg.webp')] bg-cover bg-center bg-no-repeat bg-fixed" />
        <div className="absolute inset-0 flex h-[180px] sm:h-[220px] lg:h-[350px] place-items-end  justify-center px-5 lg:px-[5%] 2xl:px-[10%]">
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
      {/* main content  */}
      <section className="py-10 px-5 lg:px-[5%] 2xl:px-[15%]">
        <div className="mx-auto max-w-6xl grid gap-10 lg:grid-cols-[2fr_1fr] items-stretch">
          {/* LEFT: main content */}
          <div className="h-full">
            <div className="h-full rounded-2xl bg-white p-5 flex flex-col gap-8 shadow">
              {/* Hero image card */}
              <div className="relative overflow-hidden rounded-2xl">
                <div className="relative h-[220px] xs:h-[260px] md:h-[320px] lg:h-[360px]">
                  <Image
                    src="/images/jobdetail.png"
                    alt="Job cover"
                    fill
                    className="absolute inset-0 h-full w-full object-cover"
                  />
                </div>
                {/* "New" pill stays inside the relative parent */}
                <span className="absolute left-4 top-4 rounded-full bg-[#72b76a] px-3 py-1 text-xs font-semibold text-white shadow">
                  New
                </span>
              </div>

              {/* Logo + Apply */}
              <div className="relative flex items-center justify-between">
                <Link href="/" className="block">
                  <div className="h-20 w-20 absolute -top-13 left-5 overflow-hidden rounded-lg bg-white p-2 shadow-[0_10px_30px_rgba(0,0,0,0.12)]">
                    <Image
                      src="/images/company.jpg"
                      alt="Company"
                      width={66}
                      height={66}
                      className="h-full w-full object-contain p-1"
                    />
                  </div>
                </Link>
                <Link href="/blogs">
                  <button className="relative px-6 h-10 overflow-hidden group border border-[#00C9FF] bg-[#00C9FF] rounded-lg hover:bg-transparent text-white hover:text-[#00C9FF] active:scale-90 transition-all ease-out duration-700 cursor-pointer">
                    <span className="absolute right-0 w-10 h-full top-0 transition-all duration-1000 transform translate-x-12 bg-white opacity-10 -skew-x-12 group-hover:-translate-x-24 ease"></span>
                    <span className="relative flex gap-2 items-center text-sm font-semibold">
                      Apply&nbsp;Now
                    </span>
                  </button>
                </Link>
                {/* <button className="mt-5 inline-flex items-center justify-center rounded-lg bg-[#1967d2] px-5 py-3 font-light text-white shadow hover:brightness-95">
                  Apply Now
                </button> */}
              </div>

              {/* Title row */}
              <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <h1 className="text-xl font-semibold text-[#0b0b0b] md:text-2xl">
                    Senior Web Designer , Developer
                    <span className="ml-2 align-middle text-sm font-medium text-emerald-600">
                      / 1 day ago
                    </span>
                  </h1>

                  <p className="mt-2 flex items-center gap-2 text-sm text-neutral-700">
                    <FaMapMarkerAlt className="text-gray-500" />
                    1363–1385 Sunset Blvd Los Angeles, CA 90026, USA
                  </p>

                  <div className="mt-3 flex flex-wrap items-center gap-x-6 gap-y-2 text-sm">
                    <a
                      href="https://thewebmax.com"
                      target="_blank"
                      rel="noreferrer"
                      className="text-sky-600 hover:underline"
                    >
                      https://thewebmax.com
                    </a>
                    <span className="font-medium text-neutral-800">
                      $2000 – $2500 / Month
                    </span>
                    <span className="text-neutral-500">Application ends:</span>
                    <span className="font-semibold text-red-600">
                      October 1, 2025
                    </span>
                  </div>
                </div>
              </div>

              {/* Description */}
              <div>
                <h2 className="text-lg font-semibold text-neutral-900">
                  Job Description:
                </h2>
                <div className="prose prose-neutral max-w-none prose-p:leading-relaxed text-sm">
                  <p className="mt-3 text-sm text-gray-800">
                    Ut enim ad minima veniam, quis nostrum exercitationem ullam
                    corporis…
                  </p>
                  <p className="mt-3 text-sm text-gray-800">
                    At vero eos et accusamus et iusto odio dignissimos…
                  </p>
                </div>
              </div>

              {/* Requirements */}
              <div>
                <h2 className="text-lg font-semibold text-neutral-900">
                  Requirements:
                </h2>
                <ul className="mt-4 space-y-1">
                  {REQUIREMENTS.map((item, i) => (
                    <li key={i} className="flex gap-3 text-sm text-gray-800">
                      <span className="mt-0.5">
                        <Check />
                      </span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Responsibilities */}
              <div>
                <h2 className="text-lg font-semibold text-neutral-900">
                  Responsibilities:
                </h2>
                <ul className="mt-4 space-y-1">
                  {RESPONSIBILITIES.map((item, i) => (
                    <li key={i} className="flex gap-3 text-sm text-gray-800">
                      <span className="mt-0.5">
                        <Check />
                      </span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Share profile */}
              <div>
                <h2 className="text-lg font-semibold text-neutral-900">
                  Share Profile:
                </h2>
                <div className="mt-4 flex flex-wrap gap-3">
                  {SHARE_LINKS.map(({ name, href, Icon, cls }) => (
                    <a
                      key={name}
                      href={href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`inline-flex items-center gap-2 rounded-lg px-3 py-2 text-white text-sm font-medium ${cls}`}
                    >
                      <Icon className="h-4 w-4" />
                      {name}
                    </a>
                  ))}
                </div>
              </div>

              {/* Location */}
              <div>
                <h2 className="text-lg font-semibold text-neutral-900">
                  Location:
                </h2>
                <p className="mt-2 flex items-center gap-2 text-sm text-neutral-700">
                  <FaMapMarkerAlt className="text-gray-500" />
                  {ADDRESS}
                  <a
                    href={MAP_DIRECTIONS}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="ml-3 text-sky-600 hover:underline"
                  >
                    Directions
                  </a>
                </p>
                <div className="mt-4 overflow-hidden rounded-xl border border-slate-200">
                  <iframe
                    src={MAP_EMBED_SRC}
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    className="h-[320px] w-full sm:h-[380px] grayscale"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* RIGHT: sidebar */}
          <div className="mx-auto max-w-6xl grid gap-10 lg:grid-cols-[2fr_1fr] items-stretch">
            <aside className="rounded-2xl p-5 self-stretch h-full">
              <h3 className="mb-4 font-semibold text-neutral-900">
                Job Information
              </h3>

              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <FaCalendarAlt className="text-[#00C9FF]" />
                  <div>
                    <p className="text-xs text-neutral-500">Date Posted</p>
                    <p className="text-sm font-medium">April 22, 2023</p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <FaEye className="text-[#00C9FF]" />
                  <div>
                    <p className="text-xs text-neutral-500">Views</p>
                    <p className="text-sm font-medium">8160 Views</p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <FaUserFriends className="text-[#00C9FF]" />
                  <div>
                    <p className="text-xs text-neutral-500">Applicants</p>
                    <p className="text-sm font-medium">6 Applicants</p>
                  </div>
                </div>

                <div className="h-px my-3" />

                <ul className="space-y-4 text-sm">
                  <li className="flex items-start gap-3">
                    <FaCalendarAlt className="mt-0.5 text-[#00C9FF]" />
                    <div>
                      <p className="text-neutral-500">Date Posted</p>
                      <p className="font-medium">April 22, 2023</p>
                    </div>
                  </li>

                  <li className="flex items-start gap-3">
                    <FaMapMarkerAlt className="mt-0.5 text-[#00C9FF]" />
                    <div>
                      <p className="text-neutral-500">Location</p>
                      <p className="font-medium">Munchen, Germany</p>
                    </div>
                  </li>

                  <li className="flex items-start gap-3">
                    <FaBriefcase className="mt-0.5 text-[#00C9FF]" />
                    <div>
                      <p className="text-neutral-500">Job Title</p>
                      <p className="font-medium">Web Developer</p>
                    </div>
                  </li>

                  <li className="flex items-start gap-3">
                    <FaHourglassHalf className="mt-0.5 text-[#00C9FF]" />
                    <div>
                      <p className="text-neutral-500">Experience</p>
                      <p className="font-medium">3 Year</p>
                    </div>
                  </li>

                  <li className="flex items-start gap-3">
                    <FaGraduationCap className="mt-0.5 text-[#00C9FF]" />
                    <div>
                      <p className="text-neutral-500">Qualification</p>
                      <p className="font-medium">Bachelor Degree</p>
                    </div>
                  </li>

                  <li className="flex items-start gap-3">
                    <FaVenusMars className="mt-0.5 text-[#00C9FF]" />
                    <div>
                      <p className="text-neutral-500">Gender</p>
                      <p className="font-medium">Both</p>
                    </div>
                  </li>

                  <li className="flex items-start gap-3">
                    <FaDollarSign className="mt-0.5 text-[#00C9FF]" />
                    <div>
                      <p className="text-neutral-500">Offered Salary</p>
                      <p className="font-medium">$2000–$2500 / Month</p>
                    </div>
                  </li>
                </ul>
              </div>

              {/* Job skills */}
              <div className="p-5 mt-6">
                <h4 className="mb-4 font-semibold text-neutral-900">
                  Job Skill
                </h4>
                <div className="flex flex-wrap gap-3">
                  {SKILL.map((skill) => (
                    <button
                      key={skill}
                      type="button"
                      className="rounded-full bg-blue-50 bg-opacity-10 px-3 py-1.5 text-[13px] font-medium text-[#00C9FF] hover:bg-blue-100"
                    >
                      {skill}
                    </button>
                  ))}
                </div>
              </div>

              {/* Company profile (now directly below Job Skill) */}
              <div className="relative mt-6 rounded-2xl bg-white p-6 shadow-[0_8px_24px_rgba(25,103,210,0.10)] ring-1 ring-blue-900/5">
                {/* floating logo */}
                <div className="absolute -top-6 left-6 rounded-xl bg-white p-2 shadow-[0_10px_30px_rgba(0,0,0,0.12)]">
                  <div className="relative h-14 w-14 overflow-hidden rounded-lg">
                    <Image
                      src="/images/company.jpg"
                      alt="Company logo"
                      width={56}
                      height={56}
                      className="h-full w-full object-contain p-1"
                    />
                  </div>
                </div>

                <h3 className="mt-10 text-lg font-semibold text-neutral-900">
                  Senior Web Designer , Developer
                </h3>

                <div className="mt-5 space-y-5 text-sm">
                  <div className="flex items-start gap-3">
                    <FaBriefcase className="text-[#00C9FF] mt-0.5" />
                    <div>
                      <p className="text-neutral-500">Company</p>
                      <p className="font-medium">Software Development</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <FaPhoneAlt className="text-[#00C9FF] mt-0.5" />
                    <div>
                      <p className="text-neutral-500">Phone</p>
                      <p className="font-medium">+291 560 56456</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <FaEnvelope className="text-[#00C9FF] mt-0.5" />
                    <div>
                      <p className="text-neutral-500">Email</p>
                      <a
                        href="mailto:thewebmaxdemo@gmail.com"
                        className="font-medium hover:underline"
                      >
                        thewebmaxdemo@gmail.com
                      </a>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <FaGlobe className="text-[#00C9FF] mt-0.5" />
                    <div>
                      <p className="text-neutral-500">Website</p>
                      <a
                        href="https://themeforest.net"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="font-medium hover:underline"
                      >
                        themeforest.net
                      </a>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <FaMapMarkerAlt className="text-[#00C9FF] mt-0.5" />
                    <div>
                      <p className="text-neutral-500">Address</p>
                      <p className="font-medium">
                        1363–1385 Sunset Blvd Angeles, CA 90026 ,USA
                      </p>
                    </div>
                  </div>
                </div>

                <div className="mt-6 text-center">
                  <Link href="/blogs">
                    <button className="relative px-6 h-10 overflow-hidden group border border-[#00C9FF] bg-[#00C9FF] rounded-lg hover:bg-transparent text-white hover:text-[#00C9FF] active:scale-90 transition-all ease-out duration-700 cursor-pointer">
                      <span className="absolute right-0 w-10 h-full top-0 transition-all duration-1000 transform translate-x-12 bg-white opacity-10 -skew-x-12 group-hover:-translate-x-24 ease"></span>
                      <span className="relative flex gap-2 items-center text-sm font-semibold">
                        View Profile
                      </span>
                    </button>
                  </Link>
                  {/* <Link
                    href="#"
                    className="block w-full rounded-xl bg-[#1967d2] px-5 py-3 text-center text-sm font-semibold text-white shadow hover:brightness-95 active:scale-[0.98] transition"
                  >
                    View Profile
                  </Link> */}
                </div>
              </div>
            </aside>
          </div>
        </div>

        {/* <div className="mx-auto max-w-6xl grid gap-10 lg:grid-cols-3  items-stretch"> */}
        {/* office photo  */}
        {/* <div className="mt-8">
            <h2 className="text-lg font-semibold text-neutral-900">
              Office Photos
            </h2>
            <div className="mt-4 grid grid-cols-3 sm:grid-cols-3 lg:grid-cols-4 gap-1">
              {OFFICE_PHOTOS.map((src, i) => (
                <div
                  key={`${src}-${i}`}
                  className="relative aspect-square overflow-hidden rounded-2xl"
                >
                  <Image
                    src={src}
                    alt={`OFFICE_PHOTO ${i + 1}`}
                    fill
                    className="object-cover"
                    sizes="(max-width:640px) 50vw, (max-width:1024px) 33vw, 25vw"
                  />
                </div>
              ))}
            </div>
          </div> */}
        {/* Video */}
        {/* <div className="mt-7">
            <SectionTitle>Video</SectionTitle>
            <a
              href="https://www.youtube.com/watch?v=c1XNqw2gSbU"
              target="_blank"
              rel="noopener noreferrer"
              className="group relative block overflow-hidden rounded-2xl"
            >
              <Image
                src="/images/job-grid.png"
                alt="Video cover"
                width={500}
                height={650}
                className="w-full h-[250px] object-cover"
              />
              }
              <span className="absolute inset-0 m-auto h-14 w-14 rounded-full bg-white/95 grid place-items-center shadow">
                <svg viewBox="0 0 24 24" className="h-6 w-6 fill-[#00C9FF]">
                  <path d="M8 5v14l11-7z" />
                </svg>
              </span>
            </a>
          </div> */}
        {/* Recruiting */}
        {/* <div className="mt-17 overflow-hidden rounded-2xl border border-blue-100 shadow-[0_6px_24px_-12px_rgba(59,130,246,0.35)]">
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
                <button
                  type="button"
                  className="px-6 py-3 text-sm font-semibold text-blue-700 bg-white shadow w-fit rounded-xl hover:shadow-md"
                >
                  Read More
                </button>
              </div>
            </div>
          </div> */}
        {/* </div> */}
      </section>
      {/* <Footer /> */}
    </>
  );
};

export default Details;
