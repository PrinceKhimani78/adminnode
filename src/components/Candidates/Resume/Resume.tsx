"use client";
import React from "react";
import Image from "next/image";
import Sidebar from "@/components/Common/Sidebar";
import Link from "next/link";
import { FaEdit } from "react-icons/fa";
import Footer from "@/components/Footer/Footer";
import { FiChevronRight } from "react-icons/fi";

const Resume = () => {
  const skills = [
    { skill: "Python", version: "13", lastUsed: "2020", exp: "1 Year" },
    { skill: "Bootstrap", version: "5", lastUsed: "2021", exp: "1 Year" },
    { skill: "HTML", version: "5", lastUsed: "2020", exp: "1 Year" },
    { skill: "Photoshop", version: "CC-2023", lastUsed: "2023", exp: "1 Year" },
    { skill: "CSS", version: "3", lastUsed: "2018", exp: "1 Year" },
  ];
  return (
    <>
      <div className="pl-2 pr-4 sm:px-2 py-2 flex gap-3 sm:gap-4 my-30 relative">
        {/* Sidebar */}
        <Sidebar type="candidate" />
        {/* Main Content */}
        <main className="flex-1 bg-white min-w-0 rounded-lg shadow px-0 py-0 sm:px-5 sm:py-5 space-y-8">
          {/* Title + Breadcrumb */}
          <div className="border-b pb-4">
            <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-2">
              <h1
                className="fontAL font-semibold capitalize text-xl md:text-2xl lg:text-3xl mt-5"
                style={{
                  letterSpacing: "1px",
                  wordSpacing: "2px",
                  lineHeight: 1.2,
                }}
              >
                My Resume
              </h1>

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
                    <FiChevronRight />
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
          {/* Resume Headline */}
          <div className="bg-gray-50 rounded-lg shadow-sm p-5">
            <div className="flex justify-between items-center border-b pb-3 mb-3">
              <h2 className="text-lg fontAL font-semibold">Resume Headline</h2>
              <FaEdit className="text-[#00C9FF] cursor-pointer" />
            </div>
            <p className="text-gray-700">
              Senior UI / UX Designer and Developer at Google INC
            </p>
          </div>
          {/* Key Skills */}
          <div className="bg-gray-50 rounded-lg shadow-sm p-5">
            <div className="flex justify-between items-center border-b pb-3 mb-3">
              <h2 className="text-lg fontAL font-semibold">Key Skills</h2>
              <FaEdit className="text-[#00C9FF] cursor-pointer" />
            </div>
            <div className="flex flex-wrap gap-2">
              {[
                "Finance",
                "Sales",
                "Part-time",
                "Administration",
                "Retail",
                "Engineering",
                "Developer",
                "Work from home",
                "IT Consulting",
                "Manufacturing",
              ].map((skill, i) => (
                <span
                  key={i}
                  className="px-3 py-1 bg-blue-50 text-[#00C9FF] rounded-full text-sm cursor-pointer transition hover:bg-blue-100"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>
          {/* Employment */}
          <div className="bg-gray-50 rounded-lg shadow-sm p-5">
            <div className="flex justify-between items-center border-b pb-3 mb-3">
              <h2 className="text-lg fontAL font-semibold">Employment</h2>
              <FaEdit className="text-[#00C9FF] cursor-pointer" />
            </div>
            <div>
              <h3 className="font-semibold">
                Senior UI / UX Designer and Developer
              </h3>
              <p className="text-gray-600">Google INC</p>
              <p className="text-gray-600">Experience (6 Years)</p>
              <p className="text-gray-600">Available to join in 1 Month</p>
            </div>
          </div>
          {/* Education */}
          <div className="bg-gray-50 rounded-lg shadow-sm p-5">
            {/* Header */}
            <div className="flex justify-between items-center border-b pb-3 mb-3">
              <h2 className="text-lg font-semibold">Education</h2>
              <FaEdit className="text-[#00C9FF] cursor-pointer" />
            </div>

            {/* Info */}
            <p className="text-gray-600 text-sm mb-4">
              Mention your employment details including your current and
              previous company work experience
            </p>

            {/* Education list */}
            <div className="space-y-4">
              <div>
                <p className="text-gray-600">2004 to 2006</p>
                <p className="font-semibold">
                  BCA - Bachelor of Computer Applications
                </p>
              </div>

              <div>
                <p className="text-gray-600">2006 to 2008</p>
                <p className="font-semibold">
                  MCA - Master of Computer Application
                </p>
              </div>

              <div>
                <p className="text-gray-600">2008 to 2011</p>
                <p className="font-semibold">Design Communication Visual</p>
              </div>
            </div>

            <div className="mt-6 space-y-2">
              <Link
                href="#"
                className="block text-[#00C9FF] text-sm font-medium hover:underline cursor-pointer"
              >
                Add Doctorate/PhD
              </Link>
              <Link
                href="#"
                className="block text-[#00C9FF] text-sm font-medium hover:underline cursor-pointer"
              >
                Add Masters/Post-Graduation
              </Link>
              <Link
                href="#"
                className="block text-[#00C9FF] text-sm font-medium hover:underline cursor-pointer"
              >
                Add Graduation/Diploma
              </Link>
            </div>
          </div>
          {/* IT skill  */}
          <div className="bg-gray-50 rounded-lg shadow-sm p-5">
            {/* Header */}
            <div className="flex justify-between items-center border-b pb-3 mb-3">
              <h2 className="text-lg fontAL font-semibold">IT Skills</h2>
              <FaEdit className="text-[#00C9FF] cursor-pointer" />
            </div>

            {/* Info */}
            <p className="text-gray-600 text-sm mb-4">
              Mention your employment detail including your current and previous
              company work experience
            </p>

            {/* Skills Cards */}
            <div className="space-y-3">
              {skills.map((item, i) => (
                <div
                  key={i}
                  className={`flex flex-col sm:flex-row sm:items-center justify-between border border-gray-400 rounded-lg p-4 shadow-sm transition ${
                    i % 2 === 0 ? "bg-white" : "bg-gray-100"
                  } hover:bg-gray-200`}
                >
                  {/* Left side: Skill Info */}
                  <div className="flex flex-col sm:flex-row sm:gap-6 flex-1">
                    <div>
                      <p className="text-sm text-gray-500">Skill</p>
                      <p className="font-medium">{item.skill}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Version</p>
                      <p>{item.version}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Last Used</p>
                      <p>{item.lastUsed}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Experience</p>
                      <p>{item.exp}</p>
                    </div>
                  </div>

                  {/* Right side: Action */}
                  <div className="mt-3 sm:mt-0 sm:ml-6 text-[#00C9FF] cursor-pointer">
                    <FaEdit />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* project  */}
          <div className="bg-gray-50 rounded-lg shadow-sm p-5">
            <div className="flex justify-between items-center border-b pb-3 mb-3">
              <h2 className="text-lg fontAL font-semibold">Project</h2>
              <FaEdit className="text-[#00C9FF] cursor-pointer" />
            </div>
            <div className="space-y-2">
              <h3 className="font-semibold fontAl">Jobzilla</h3>
              <p className="text-gray-600">Google INC</p>
              <p className="text-gray-600">January 2023 to Present</p>
              <p className="text-gray-600">Jobjilla Template</p>
            </div>
          </div>
          {/* desired career profile  */}
          <div className="bg-gray-50 rounded-lg shadow-sm p-5">
            <div className="flex justify-between items-center border-b pb-3 mb-3">
              <h2 className="text-lg fontAL font-semibold">
                Desired Career Profile
              </h2>
              <FaEdit className="text-[#00C9FF] cursor-pointer" />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-4 gap-x-10 text-sm">
              <div>
                <p className="font-semibold">Industry</p>
                <p className="text-gray-600">IT-Software/Software Services</p>
              </div>

              <div>
                <p className="font-semibold">Functional Area</p>
                <p className="text-gray-600">
                  Design / Creative / User Experience
                </p>
              </div>

              <div>
                <p className="font-semibold">Role</p>
                <p className="text-gray-600">Web Designer</p>
              </div>

              <div>
                <p className="font-semibold">Job Type</p>
                <p className="text-gray-600">Permanent</p>
              </div>

              <div>
                <p className="font-semibold">Employment Type</p>
                <p className="text-gray-600">Full Time</p>
              </div>

              <div>
                <p className="font-semibold">Desired Shift</p>
                <p className="text-gray-600">Add Desired Shift</p>
              </div>

              <div>
                <p className="font-semibold">Availability to Join</p>
                <p className="text-gray-600">06 August</p>
              </div>

              <div>
                <p className="font-semibold">Expected Salary</p>
                <p className="text-gray-600">1 Lakh</p>
              </div>

              <div>
                <p className="font-semibold">Desired Location</p>
                <p className="text-gray-600">Add Desired Location</p>
              </div>

              <div>
                <p className="font-semibold">Desired Industry</p>
                <p className="text-gray-600">Add Desired Industry</p>
              </div>
            </div>
          </div>
          {/* Personal Details */}
          <div className="bg-gray-50 rounded-lg shadow-sm p-5">
            <div className="flex justify-between items-center border-b pb-3 mb-3">
              <h2 className="text-lg fontAL font-semibold">Personal Details</h2>
              <FaEdit className="text-[#00C9FF] cursor-pointer" />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-5 gap-x-10 text-sm">
              <div>
                <p className="font-semibold">Date of Birth</p>
                <p className="text-gray-600">31 July 1998</p>
              </div>

              <div>
                <p className="font-semibold">Permanent Address</p>
                <p className="text-gray-600">Add Permanent Address</p>
              </div>

              <div>
                <p className="font-semibold">Gender</p>
                <p className="text-gray-600">Male</p>
              </div>

              <div>
                <p className="font-semibold">Area Pin Code</p>
                <p className="text-gray-600">302021</p>
              </div>

              <div>
                <p className="font-semibold">Marital Status</p>
                <p className="text-gray-600">Single / Unmarried</p>
              </div>

              <div>
                <p className="font-semibold">Hometown</p>
                <p className="text-gray-600">USA</p>
              </div>

              <div>
                <p className="font-semibold">Passport Number</p>
                <p className="text-gray-600">+123 456 7890</p>
              </div>

              <div>
                <p className="font-semibold">Work Permit of Other Country</p>
                <p className="text-gray-600">UK</p>
              </div>

              <div>
                <p className="font-semibold">Differently Abled</p>
                <p className="text-gray-600">None</p>
              </div>

              <div>
                <p className="font-semibold">Languages</p>
                <p className="text-gray-600">English</p>
              </div>
            </div>
          </div>
          {/* Attach Resume */}
          <div className="bg-gray-50 rounded-lg shadow-sm p-5">
            {/* Header */}
            <div className="flex justify-between items-center border-b pb-3 mb-3">
              <h2 className="text-lg fontAL font-semibold">Attach Resume</h2>
            </div>

            {/* Info */}
            <p className="text-gray-600 text-sm mb-4">
              Resume is the most important document recruiters look for.
              Recruiters generally do not look at profiles without resumes.
            </p>

            {/* Upload Box */}
            <div className="w-full h-32 border-2 border-dashed border-[#00C9FF] rounded-lg flex items-center justify-center bg-blue-50 cursor-pointer hover:bg-blue-100 transition">
              <p className="text-gray-500">Drop files here to upload</p>
            </div>

            {/* File Size Note */}
            <p className="text-gray-500 text-sm mt-3">
              Upload Resume File size is{" "}
              <span className="font-medium">3 MB</span>
            </p>
          </div>
          {/* Accomplishments */}
          <div className="bg-gray-50 rounded-lg shadow-sm p-5">
            <div className="flex justify-between items-center border-b border-gray-300 pb-3 mb-3">
              <h2 className="text-lg fontAL font-semibold">Accomplishments</h2>
              <FaEdit className="text-[#00C9FF] cursor-pointer" />
            </div>

            {/* List */}
            <div className="">
              {[
                {
                  title: "Online Profile",
                  desc: "Add link to Online profiles (e.g. Linkedin, Facebook etc.).",
                },
                {
                  title: "Work Sample",
                  desc: "Add link to your Projects (e.g. Github links etc.).",
                },
                {
                  title: "White Paper / Research Publication / Journal Entry",
                  desc: "Add links to your Online publications.",
                },
                {
                  title: "Presentation",
                  desc: "Add links to your Online presentations (e.g. Slideshare presentation links etc.).",
                },
                {
                  title: "Certification",
                  desc: "Add details of Certification you have filed.",
                },
                {
                  title: "Patent",
                  desc: "Add details of Patents you have filed.",
                },
              ].map((item, i) => (
                <div
                  key={i}
                  className="flex justify-between items-start py-4 gap-3 hover:bg-gray-100 rounded-lg px-2 transition"
                >
                  {/* Left: Title + Description */}
                  <div>
                    <p className="font-semibold text-gray-800">{item.title}</p>
                    <p className="text-gray-600 text-sm">{item.desc}</p>
                  </div>

                  {/* Right: Edit Icon */}
                  <FaEdit className="text-[#00C9FF] cursor-pointer mt-1 flex-shrink-0" />
                </div>
              ))}
            </div>
          </div>
          {/* Profile Summary */}
          <div className="bg-gray-50 rounded-lg shadow-sm p-5">
            <div className="flex justify-between items-center border-b border-gray-300 pb-3 mb-3">
              <h2 className="text-lg fontAL font-semibold">Profile Summary</h2>
              <FaEdit className="text-[#00C9FF] cursor-pointer" />
            </div>

            <p className="text-gray-600 text-sm leading-relaxed">
              Your Profile Summary should mention the highlights of your career
              and education, what your professional interests are, and what kind
              of a career you are looking for. Write a meaningful summary of
              more than 50 characters.
            </p>
          </div>
        </main>
      </div>
      <Footer />
    </>
  );
};

export default Resume;
