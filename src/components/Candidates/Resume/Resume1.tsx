"use client";
import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import Sidebar from "@/components/Common/Sidebar";
import { FaEdit } from "react-icons/fa";
import Modal from "@/components/Common/Modal";
import Footer from "@/components/Footer/Footer";
import { IoChevronForward } from "react-icons/io5";
import { FiChevronRight } from "react-icons/fi";
const Resume1 = () => {
  const [mobileOpen, setMobileOpen] = React.useState(false);
  /* ================== STATES ================== */

  // Resume Headline
  const [headline, setHeadline] = useState(
    "Senior UI / UX Designer and Developer at Google INC"
  );
  const [openHeadline, setOpenHeadline] = useState(false);
  const [tempHeadline, setTempHeadline] = useState(headline);

  // Key Skills
  const [skills, setSkills] = useState([
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
  ]);
  const [openSkills, setOpenSkills] = useState(false);
  const [tempSkills, setTempSkills] = useState(skills);
  const [newSkill, setNewSkill] = useState("");

  // Education
  const [education, setEducation] = useState([
    {
      course: "BCA - Bachelor of Computer Applications",
      duration: "2004 to 2006",
    },
    {
      course: "MCA - Master of Computer Application",
      duration: "2006 to 2008",
    },
    { course: "Design Communication Visual", duration: "2008 to 2011" },
  ]);
  const [openEducation, setOpenEducation] = useState(false);
  const [tempEducation, setTempEducation] = useState(education);

  // IT Skills
  const [itSkills, setItSkills] = useState([
    { skill: "Python", version: "13", lastUsed: "2020", exp: "1 Year" },
    { skill: "Bootstrap", version: "5", lastUsed: "2021", exp: "1 Year" },
  ]);
  const [openItSkills, setOpenItSkills] = useState(false);
  const [tempItSkills, setTempItSkills] = useState(itSkills);

  // Employment
  const [employment, setEmployment] = useState([
    {
      designation: "Senior UI / UX Designer and Developer",
      organization: "Google INC",
      exp: "6 Years",
      notice: "Available to join in 1 Month",
    },
  ]);
  const [openEmployment, setOpenEmployment] = useState(false);
  const [tempEmployment, setTempEmployment] = useState(employment);

  // Projects
  const [projects, setProjects] = useState([
    {
      title: "Jobzilla",
      company: "Google INC",
      duration: "January 2023 to Present",
      desc: "Jobjilla Template",
    },
  ]);
  const [openProjects, setOpenProjects] = useState(false);
  const [tempProjects, setTempProjects] = useState(projects);

  // Career Profile
  const [careerProfile, setCareerProfile] = useState({
    industry: "IT-Software/Software Services",
    functionalArea: "Design / Creative / User Experience",
    role: "Web Designer",
    jobType: "Permanent",
    employmentType: "Full Time",
    shift: "Day",
    availability: "06 August",
    salary: "1 Lakh",
    location: "Remote",
    desiredIndustry: "Tech",
  });
  const [openCareer, setOpenCareer] = useState(false);
  const [tempCareer, setTempCareer] = useState(careerProfile);

  // Personal Details
  const [personalDetails, setPersonalDetails] = useState({
    dob: "1998-07-31",
    address: "Add Permanent Address",
    gender: "Male",
    pincode: "302021",
    maritalStatus: "Single / Unmarried",
    hometown: "USA",
    passport: "+123 456 7890",
    workPermit: "UK",
    differentlyAbled: "None",
    languages: "English",
  });
  const [openPersonal, setOpenPersonal] = useState(false);
  const [tempPersonal, setTempPersonal] = useState(personalDetails);

  // Accomplishments
  const [accomplishments, setAccomplishments] = useState([
    {
      title: "Online Profile",
      desc: "Add link to Online profiles (e.g. Linkedin, Facebook etc.).",
    },
    {
      title: "Work Sample",
      desc: "Add link to your Projects (e.g. Github links etc.).",
    },
  ]);
  const [openAccomplishments, setOpenAccomplishments] = useState(false);
  const [tempAccomplishments, setTempAccomplishments] =
    useState(accomplishments);

  // Profile Summary
  const [profileSummary, setProfileSummary] = useState(
    "Your Profile Summary should mention the highlights of your career and education, what your professional interests are, and what kind of a career you are looking for."
  );
  const [openSummary, setOpenSummary] = useState(false);
  const [tempSummary, setTempSummary] = useState(profileSummary);
  // Attach Resume
  const [resumeFile, setResumeFile] = useState<{
    name: string;
    size: number;
  } | null>(null);
  const [tempResumeFile, setTempResumeFile] = useState<{
    name: string;
    size: number;
  } | null>(null);
  const [openResume, setOpenResume] = useState(false);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setTempResumeFile({ name: file.name, size: file.size });
    }
  };
  /* ================== RENDER ================== */
  return (
    <>
      <div className="pl-2 pr-4 sm:px-2 py-2 flex gap-3 sm:gap-4 my-30 relative">
        <Sidebar
          type="candidate"
          mobileOpen={mobileOpen}
          setMobileOpen={setMobileOpen}
        />

        <main className="flex-1 px-5 py-5 bg-white shadow rounded-lg space-y-8">
          {/* Title */}
          <div className="border-b pb-4">
            <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-2 ">
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
                  My Resume
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
                    <span className="text-gray-700 font-medium">Dashboard</span>
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
              <h2 className="text-lg font-bold">Randall Henderson</h2>
              <p className="text-gray-500">IT Contractor</p>
            </div>
          </div>

          {/* Resume Headline */}
          <div className="bg-gray-50 p-5 rounded-lg shadow-sm">
            <div className="flex justify-between items-center border-b pb-3 mb-3">
              <h2 className="text-lg font-semibold">Resume Headline</h2>
              <FaEdit
                className="text-[#00C9FF] cursor-pointer"
                onClick={() => {
                  setTempHeadline(headline);
                  setOpenHeadline(true);
                }}
              />
            </div>
            <p>{headline}</p>
          </div>

          {/* Key Skills */}
          <div className="bg-gray-50 p-5 rounded-lg shadow-sm">
            <div className="flex justify-between items-center border-b pb-3 mb-3">
              <h2 className="text-lg font-semibold">Key Skills</h2>
              <FaEdit
                className="text-[#00C9FF] cursor-pointer"
                onClick={() => {
                  setTempSkills(skills);
                  setOpenSkills(true);
                }}
              />
            </div>
            <div className="flex flex-wrap gap-2">
              {skills.map((s, i) => (
                <span
                  key={i}
                  className="px-3 py-1 bg-blue-50 rounded-full text-sm text-[#00C9FF]"
                >
                  {s}
                </span>
              ))}
            </div>
          </div>

          {/* Education */}
          <div className="bg-gray-50 p-5 rounded-lg shadow-sm">
            <div className="flex justify-between items-center border-b pb-3 mb-3">
              <h2 className="text-lg font-semibold">Education</h2>
              <FaEdit
                className="text-[#00C9FF] cursor-pointer"
                onClick={() => {
                  setTempEducation(education);
                  setOpenEducation(true);
                }}
              />
            </div>
            <div className="space-y-2">
              {education.map((e, i) => (
                <p key={i}>
                  <span className="font-semibold">{e.course}</span> (
                  {e.duration})
                </p>
              ))}
            </div>
          </div>

          {/* IT Skills */}
          <div className="bg-gray-50 p-5 rounded-lg shadow-sm">
            <div className="flex justify-between items-center border-b pb-3 mb-3">
              <h2 className="text-lg font-semibold">IT Skills</h2>
              <FaEdit
                className="text-[#00C9FF] cursor-pointer"
                onClick={() => {
                  setTempItSkills(itSkills);
                  setOpenItSkills(true);
                }}
              />
            </div>
            <div className="space-y-2">
              {itSkills.map((s, i) => (
                <p key={i}>
                  {s.skill} (v{s.version}) - {s.exp}
                </p>
              ))}
            </div>
          </div>

          {/* Employment */}
          <div className="bg-gray-50 p-5 rounded-lg shadow-sm">
            <div className="flex justify-between items-center border-b pb-3 mb-3">
              <h2 className="text-lg font-semibold">Employment</h2>
              <FaEdit
                className="text-[#00C9FF] cursor-pointer"
                onClick={() => {
                  setTempEmployment(employment);
                  setOpenEmployment(true);
                }}
              />
            </div>
            {employment.map((job, i) => (
              <div key={i} className="space-y-1">
                <h3 className="font-semibold">{job.designation}</h3>
                <p className="text-gray-600">{job.organization}</p>
                <p className="text-gray-600">{job.exp}</p>
                <p className="text-gray-600">{job.notice}</p>
              </div>
            ))}
          </div>

          {/* Projects */}
          <div className="bg-gray-50 p-5 rounded-lg shadow-sm">
            <div className="flex justify-between items-center border-b pb-3 mb-3">
              <h2 className="text-lg font-semibold">Projects</h2>
              <FaEdit
                className="text-[#00C9FF] cursor-pointer"
                onClick={() => {
                  setTempProjects(projects);
                  setOpenProjects(true);
                }}
              />
            </div>
            {projects.map((p, i) => (
              <div key={i} className="space-y-1">
                <h3 className="font-semibold">{p.title}</h3>
                <p className="text-gray-600">{p.company}</p>
                <p className="text-gray-600">{p.duration}</p>
                <p className="text-gray-600">{p.desc}</p>
              </div>
            ))}
          </div>

          {/* Career Profile */}
          <div className="bg-gray-50 p-5 rounded-lg shadow-sm">
            <div className="flex justify-between items-center border-b pb-3 mb-3">
              <h2 className="text-lg font-semibold">Career Profile</h2>
              <FaEdit
                className="text-[#00C9FF] cursor-pointer"
                onClick={() => {
                  setTempCareer(careerProfile);
                  setOpenCareer(true);
                }}
              />
            </div>
            <div className="grid grid-cols-2 gap-2 text-sm">
              <p>
                <strong>Industry:</strong> {careerProfile.industry}
              </p>
              <p>
                <strong>Functional Area:</strong> {careerProfile.functionalArea}
              </p>
              <p>
                <strong>Role:</strong> {careerProfile.role}
              </p>
              <p>
                <strong>Job Type:</strong> {careerProfile.jobType}
              </p>
              <p>
                <strong>Employment:</strong> {careerProfile.employmentType}
              </p>
              <p>
                <strong>Shift:</strong> {careerProfile.shift}
              </p>
              <p>
                <strong>Availability:</strong> {careerProfile.availability}
              </p>
              <p>
                <strong>Salary:</strong> {careerProfile.salary}
              </p>
              <p>
                <strong>Location:</strong> {careerProfile.location}
              </p>
              <p>
                <strong>Desired Industry:</strong>{" "}
                {careerProfile.desiredIndustry}
              </p>
            </div>
          </div>

          {/* Personal Details */}
          <div className="bg-gray-50 p-5 rounded-lg shadow-sm">
            <div className="flex justify-between items-center border-b pb-3 mb-3">
              <h2 className="text-lg font-semibold">Personal Details</h2>
              <FaEdit
                className="text-[#00C9FF] cursor-pointer"
                onClick={() => {
                  setTempPersonal(personalDetails);
                  setOpenPersonal(true);
                }}
              />
            </div>
            <div className="grid grid-cols-2 gap-2 text-sm">
              <p>
                <strong>DOB:</strong> {personalDetails.dob}
              </p>
              <p>
                <strong>Gender:</strong> {personalDetails.gender}
              </p>
              <p>
                <strong>Marital Status:</strong> {personalDetails.maritalStatus}
              </p>
              <p>
                <strong>Hometown:</strong> {personalDetails.hometown}
              </p>
              <p>
                <strong>Passport:</strong> {personalDetails.passport}
              </p>
              <p>
                <strong>Work Permit:</strong> {personalDetails.workPermit}
              </p>
              <p>
                <strong>Languages:</strong> {personalDetails.languages}
              </p>
              <p>
                <strong>Address:</strong> {personalDetails.address}
              </p>
              <p>
                <strong>Pin Code:</strong> {personalDetails.pincode}
              </p>
              <p>
                <strong>Diff. Abled:</strong> {personalDetails.differentlyAbled}
              </p>
            </div>
          </div>

          {/* Accomplishments */}
          <div className="bg-gray-50 p-5 rounded-lg shadow-sm">
            <div className="flex justify-between items-center border-b pb-3 mb-3">
              <h2 className="text-lg font-semibold">Accomplishments</h2>
              <FaEdit
                className="text-[#00C9FF] cursor-pointer"
                onClick={() => {
                  setTempAccomplishments(accomplishments);
                  setOpenAccomplishments(true);
                }}
              />
            </div>
            {accomplishments.map((a, i) => (
              <div key={i}>
                <p className="font-semibold">{a.title}</p>
                <p className="text-gray-600">{a.desc}</p>
              </div>
            ))}
          </div>

          {/* Summary */}
          <div className="bg-gray-50 p-5 rounded-lg shadow-sm">
            <div className="flex justify-between items-center border-b pb-3 mb-3">
              <h2 className="text-lg font-semibold">Profile Summary</h2>
              <FaEdit
                className="text-[#00C9FF] cursor-pointer"
                onClick={() => {
                  setTempSummary(profileSummary);
                  setOpenSummary(true);
                }}
              />
            </div>
            <p>{profileSummary}</p>
          </div>
          {/* Attach Resume */}
          <div className="bg-gray-50 rounded-lg shadow-sm p-5">
            <div className="flex justify-between items-center border-b pb-3 mb-3">
              <h2 className="text-lg font-semibold">Attach Resume</h2>
              <FaEdit
                className="text-[#00C9FF] cursor-pointer"
                onClick={() => {
                  setTempResumeFile(resumeFile);
                  setOpenResume(true);
                }}
              />
            </div>

            {resumeFile ? (
              <div className="flex items-center justify-between border rounded p-3 bg-blue-50">
                <p className="text-gray-700">
                  {resumeFile.name}{" "}
                  <span className="text-sm text-gray-500">
                    ({(resumeFile.size / 1024).toFixed(1)} KB)
                  </span>
                </p>
                <button
                  onClick={() => setResumeFile(null)}
                  className="text-red-500 text-sm hover:underline"
                >
                  Remove
                </button>
              </div>
            ) : (
              <p className="text-gray-500 text-sm">No file uploaded</p>
            )}
          </div>
        </main>
      </div>
      {/* <Footer /> */}

      {/* 🔹 MODALS (all sections) */}
      <Modal
        title="Edit Resume Headline"
        isOpen={openHeadline}
        onClose={() => setOpenHeadline(false)}
        onSave={() => {
          setHeadline(tempHeadline);
          setOpenHeadline(false);
        }}
      >
        <textarea
          value={tempHeadline}
          onChange={(e) => setTempHeadline(e.target.value)}
          rows={3}
          className="w-full border p-2 rounded"
        />
      </Modal>

      <Modal
        title="Edit Key Skills"
        isOpen={openSkills}
        onClose={() => setOpenSkills(false)}
        onSave={() => {
          setSkills(tempSkills);
          setOpenSkills(false);
        }}
      >
        <div className="flex gap-2 mb-3">
          <input
            type="text"
            value={newSkill}
            onChange={(e) => setNewSkill(e.target.value)}
            className="flex-1 border p-2 rounded"
          />
          <button
            onClick={() => {
              if (newSkill) {
                setTempSkills([...tempSkills, newSkill]);
                setNewSkill("");
              }
            }}
            className="px-3 py-2 bg-[#00C9FF] text-white rounded"
          >
            Add
          </button>
        </div>
        <div className="flex flex-wrap gap-2">
          {tempSkills.map((s, i) => (
            <span
              key={i}
              className="px-3 py-1 bg-blue-50 rounded-full text-sm flex items-center gap-2"
            >
              {s}
              <button
                onClick={() =>
                  setTempSkills(tempSkills.filter((_, idx) => idx !== i))
                }
                className="text-red-500"
              >
                ✕
              </button>
            </span>
          ))}
        </div>
      </Modal>

      {/* Education Modal */}
      <Modal
        title="Edit Education"
        isOpen={openEducation}
        onClose={() => setOpenEducation(false)}
        onSave={() => {
          setEducation(tempEducation);
          setOpenEducation(false);
        }}
      >
        {tempEducation.map((e, i) => (
          <div key={i} className="space-y-2 mb-3 border rounded p-2 bg-blue-50">
            <input
              type="text"
              value={e.course}
              onChange={(ev) => {
                const updated = [...tempEducation];
                updated[i].course = ev.target.value;
                setTempEducation(updated);
              }}
              className="w-full border p-2 rounded"
            />
            <input
              type="text"
              value={e.duration}
              onChange={(ev) => {
                const updated = [...tempEducation];
                updated[i].duration = ev.target.value;
                setTempEducation(updated);
              }}
              className="w-full border p-2 rounded"
            />
            <button
              onClick={() =>
                setTempEducation(tempEducation.filter((_, idx) => idx !== i))
              }
              className="text-red-500 text-xs"
            >
              Delete
            </button>
          </div>
        ))}
      </Modal>

      {/* IT Skills Modal */}
      <Modal
        title="Edit IT Skills"
        isOpen={openItSkills}
        onClose={() => setOpenItSkills(false)}
        onSave={() => {
          setItSkills(tempItSkills);
          setOpenItSkills(false);
        }}
      >
        {tempItSkills.map((s, i) => (
          <div
            key={i}
            className="grid grid-cols-2 gap-2 mb-3 border rounded p-2 bg-blue-50"
          >
            <input
              value={s.skill}
              onChange={(e) => {
                const updated = [...tempItSkills];
                updated[i].skill = e.target.value;
                setTempItSkills(updated);
              }}
              className="border p-2 rounded"
              placeholder="Skill"
            />
            <input
              value={s.version}
              onChange={(e) => {
                const updated = [...tempItSkills];
                updated[i].version = e.target.value;
                setTempItSkills(updated);
              }}
              className="border p-2 rounded"
              placeholder="Version"
            />
            <input
              value={s.lastUsed}
              onChange={(e) => {
                const updated = [...tempItSkills];
                updated[i].lastUsed = e.target.value;
                setTempItSkills(updated);
              }}
              className="border p-2 rounded"
              placeholder="Last Used"
            />
            <input
              value={s.exp}
              onChange={(e) => {
                const updated = [...tempItSkills];
                updated[i].exp = e.target.value;
                setTempItSkills(updated);
              }}
              className="border p-2 rounded"
              placeholder="Experience"
            />
          </div>
        ))}
      </Modal>

      {/* Employment Modal */}
      <Modal
        title="Edit Employment"
        isOpen={openEmployment}
        onClose={() => setOpenEmployment(false)}
        onSave={() => {
          setEmployment(tempEmployment);
          setOpenEmployment(false);
        }}
      >
        {tempEmployment.map((job, i) => (
          <div key={i} className="space-y-2 mb-3 border rounded p-2 bg-blue-50">
            <input
              value={job.designation}
              onChange={(e) => {
                const updated = [...tempEmployment];
                updated[i].designation = e.target.value;
                setTempEmployment(updated);
              }}
              className="border p-2 rounded"
              placeholder="Designation"
            />
            <input
              value={job.organization}
              onChange={(e) => {
                const updated = [...tempEmployment];
                updated[i].organization = e.target.value;
                setTempEmployment(updated);
              }}
              className="border p-2 rounded"
              placeholder="Organization"
            />
            <input
              value={job.exp}
              onChange={(e) => {
                const updated = [...tempEmployment];
                updated[i].exp = e.target.value;
                setTempEmployment(updated);
              }}
              className="border p-2 rounded"
              placeholder="Experience"
            />
            <input
              value={job.notice}
              onChange={(e) => {
                const updated = [...tempEmployment];
                updated[i].notice = e.target.value;
                setTempEmployment(updated);
              }}
              className="border p-2 rounded"
              placeholder="Notice"
            />
          </div>
        ))}
      </Modal>

      {/* Projects Modal */}
      <Modal
        title="Edit Projects"
        isOpen={openProjects}
        onClose={() => setOpenProjects(false)}
        onSave={() => {
          setProjects(tempProjects);
          setOpenProjects(false);
        }}
      >
        {tempProjects.map((p, i) => (
          <div key={i} className="space-y-2 mb-3 border rounded p-2 bg-blue-50">
            <input
              value={p.title}
              onChange={(e) => {
                const updated = [...tempProjects];
                updated[i].title = e.target.value;
                setTempProjects(updated);
              }}
              className="border p-2 rounded"
              placeholder="Title"
            />
            <input
              value={p.company}
              onChange={(e) => {
                const updated = [...tempProjects];
                updated[i].company = e.target.value;
                setTempProjects(updated);
              }}
              className="border p-2 rounded"
              placeholder="Company"
            />
            <input
              value={p.duration}
              onChange={(e) => {
                const updated = [...tempProjects];
                updated[i].duration = e.target.value;
                setTempProjects(updated);
              }}
              className="border p-2 rounded"
              placeholder="Duration"
            />
            <input
              value={p.desc}
              onChange={(e) => {
                const updated = [...tempProjects];
                updated[i].desc = e.target.value;
                setTempProjects(updated);
              }}
              className="border p-2 rounded"
              placeholder="Description"
            />
          </div>
        ))}
      </Modal>

      {/* Career Profile Modal */}
      <Modal
        title="Edit Career Profile"
        isOpen={openCareer}
        onClose={() => setOpenCareer(false)}
        onSave={() => {
          setCareerProfile(tempCareer);
          setOpenCareer(false);
        }}
      >
        {(Object.keys(tempCareer) as Array<keyof typeof tempCareer>).map(
          (key) => (
            <div key={key} className="mb-2">
              <label className="block text-sm font-medium">{key}</label>
              <input
                value={tempCareer[key]}
                onChange={(e) =>
                  setTempCareer({ ...tempCareer, [key]: e.target.value })
                }
                className="w-full border p-2 rounded"
              />
            </div>
          )
        )}
      </Modal>

      {/* Personal Details Modal */}
      <Modal
        title="Edit Personal Details"
        isOpen={openPersonal}
        onClose={() => setOpenPersonal(false)}
        onSave={() => {
          setPersonalDetails(tempPersonal);
          setOpenPersonal(false);
        }}
      >
        {(Object.keys(tempPersonal) as Array<keyof typeof tempPersonal>).map(
          (key) => (
            <div key={key} className="mb-2">
              <label className="block text-sm font-medium">{key}</label>
              <input
                value={tempPersonal[key]}
                onChange={(e) =>
                  setTempPersonal({ ...tempPersonal, [key]: e.target.value })
                }
                className="w-full border p-2 rounded"
              />
            </div>
          )
        )}
      </Modal>

      {/* Accomplishments Modal */}
      <Modal
        title="Edit Accomplishments"
        isOpen={openAccomplishments}
        onClose={() => setOpenAccomplishments(false)}
        onSave={() => {
          setAccomplishments(tempAccomplishments);
          setOpenAccomplishments(false);
        }}
      >
        {tempAccomplishments.map((a, i) => (
          <div key={i} className="space-y-2 mb-3 border rounded p-2 bg-blue-50">
            <input
              value={a.title}
              onChange={(e) => {
                const updated = [...tempAccomplishments];
                updated[i].title = e.target.value;
                setTempAccomplishments(updated);
              }}
              className="w-full border p-2 rounded"
              placeholder="Title"
            />
            <textarea
              value={a.desc}
              onChange={(e) => {
                const updated = [...tempAccomplishments];
                updated[i].desc = e.target.value;
                setTempAccomplishments(updated);
              }}
              rows={2}
              className="w-full border p-2 rounded"
              placeholder="Description"
            />
          </div>
        ))}
      </Modal>

      {/* Summary Modal */}
      <Modal
        title="Edit Profile Summary"
        isOpen={openSummary}
        onClose={() => setOpenSummary(false)}
        onSave={() => {
          setProfileSummary(tempSummary);
          setOpenSummary(false);
        }}
      >
        <textarea
          value={tempSummary}
          onChange={(e) => setTempSummary(e.target.value)}
          rows={6}
          className="w-full border p-2 rounded"
        />
      </Modal>
      {/* Attach Resume Modal */}
      <Modal
        title="Upload Resume"
        isOpen={openResume}
        onClose={() => setOpenResume(false)}
        onSave={() => {
          setResumeFile(tempResumeFile);
          setOpenResume(false);
        }}
      >
        <div
          className="w-full h-32 border-2 border-dashed border-[#00C9FF] rounded-lg flex flex-col items-center justify-center cursor-pointer bg-blue-50 hover:bg-blue-100 transition"
          onClick={() => document.getElementById("resumeUpload")?.click()}
        >
          <p className="text-gray-500">Drop files here or click to upload</p>
          <input
            id="resumeUpload"
            type="file"
            className="hidden"
            onChange={handleFileChange}
          />
        </div>

        {tempResumeFile && (
          <div className="mt-3 flex items-center justify-between border rounded p-3 bg-gray-50">
            <p className="text-gray-700">
              {tempResumeFile.name}{" "}
              <span className="text-sm text-gray-500">
                ({(tempResumeFile.size / 1024).toFixed(1)} KB)
              </span>
            </p>
            <button
              onClick={() => setTempResumeFile(null)}
              className="text-red-500 text-sm hover:underline"
            >
              Remove
            </button>
          </div>
        )}
      </Modal>
    </>
  );
};

export default Resume1;
