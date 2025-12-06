"use client";
import Footer from "@/components/Footer/Footer";
import React, { useState } from "react";

const Login = () => {
  type Crumb = { name: string; href?: string };
  const crumbs: Crumb[] = [
    { name: "Home", href: "/" },
    { name: "Candidates-login", href: "/candidates" },
  ];
  const [employmentHistory, setEmploymentHistory] = useState([{}]);
  const [educationHistory, setEducationHistory] = useState([{}]);
  // Employment Handlers
  const addEmployment = () => {
    if (employmentHistory.length < 5) {
      setEmploymentHistory([...employmentHistory, {}]);
    }
  };
  //   remove button for candidates
  const removeEmployment = (index: number) => {
    const updated = [...employmentHistory];
    updated.splice(index, 1);
    setEmploymentHistory(updated);
  };

  // Education Handlers
  const addEducation = () => {
    if (educationHistory.length < 5) {
      setEducationHistory([...educationHistory, {}]);
    }
  };
  //   remove button for education
  const removeEducation = (index: number) => {
    const updated = [...educationHistory];
    updated.splice(index, 1);
    setEducationHistory(updated);
  };

  return (
    <>
      {/*  banner*/}
      <section className="relative overflow-hidden">
        <div className="h-[220px] lg:h-[350px] bg-[url('/images/RI_banner_bg.webp')] bg-cover bg-center bg-no-repeat bg-fixed" />
        <div className="absolute inset-0 flex h-[220px] lg:h-[350px] place-items-end  justify-center px-5 lg:px-[5%] 2xl:px-[10%]">
          <div className="max-w-screen-xl w-full text-center">
            <h1 className="inline-block mb-4 px-4 py-2 text-slate-900  sm:text-xl fontAL font-semibold capitalize text-2xl md:text-3xl lg:text-4xl mt-5">
              Candidates Login
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
      {/* main section  */}

      <div className="px-4 sm:px-6 lg:px-[5%] 2xl:px-[15%]">
        {/* candidates infomation  */}
        <div>
          <div className="rounded-xl p-6 sm:p-8 bg-transparent">
            <p className="fontAL font-semibold capitalize text-xl md:text-2xl lg:text-3xl my-10 text-center">
              Candidates Information
            </p>

            <form className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 text-sm">
              {/* Full Name */}
              <div>
                <label className="block text-slate-600 mb-1">Full Name:</label>
                <input
                  type="text"
                  placeholder="Enter your name"
                  className="w-full p-2 rounded bg-white  text-sm placeholder-slate-400 ring-1 ring-blue-100 transition focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#00c9ff]"
                />
              </div>

              {/* Email */}
              <div>
                <label className="block text-slate-600 mb-1">Email:</label>
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="w-full p-2 rounded bg-white  text-sm placeholder-slate-400 ring-1 ring-blue-100 transition focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#00c9ff]"
                />
              </div>

              {/* Contact Number */}
              <div>
                <label className="block text-slate-600 mb-1">
                  Contact Number:
                </label>
                <input
                  type="text"
                  placeholder="Enter your contact no."
                  className="w-full p-2 rounded bg-white  text-sm placeholder-slate-400 ring-1 ring-blue-100 transition focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#00c9ff]"
                />
              </div>

              {/* Date of Birth */}
              <div>
                <label className="block text-slate-600 mb-1">
                  Date of Birth:
                </label>
                <input
                  type="date"
                  defaultValue=""
                  className="w-full p-2 rounded bg-white  text-sm text-slate-400 ring-1 ring-blue-100 transition focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#00c9ff] [color-scheme:light] [&:not(:placeholder-shown)]:text-slate-400"
                  placeholder="dd/mm/yyyy"
                />
              </div>

              {/* Nationality */}
              <div>
                <label className="block text-slate-600 mb-1">
                  Nationality:
                </label>
                <select
                  defaultValue=""
                  className="w-full p-2 rounded bg-white text-sm text-slate-400 ring-1 ring-blue-100 transition focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#00c9ff]"
                >
                  <option value="" disabled hidden>
                    Select
                  </option>
                  <option className="text-slate-700">Indian</option>
                  <option className="text-slate-700">American</option>
                  <option className="text-slate-700">Other</option>
                </select>
              </div>

              {/* Address */}
              <div>
                <label className="block text-slate-600 mb-1">Address:</label>
                <textarea
                  rows={1}
                  placeholder="Enter your address"
                  className="w-full p-2 rounded bg-white   text-sm placeholder-slate-400 ring-1 ring-blue-100 transition focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#00c9ff]"
                />
              </div>

              {/* Gender */}
              <div>
                <label className="block text-slate-600 mb-1">Gender:</label>
                <div className="flex gap-4">
                  <label className="flex items-center text-slate-400 gap-2">
                    <input
                      type="checkbox"
                      //   className="ring-1 ring-blue-100 transition focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#00c9ff]"
                      className="appearance-none h-5 w-5 rounded-md border border-gray-300 
               checked:bg-[#00C9FF] checked:border-[#00C9FF] 
               checked:[&:after]:content-['✔'] checked:[&:after]:text-white 
               checked:[&:after]:flex checked:[&:after]:items-center checked:[&:after]:justify-center checked:[&:after]:text-sm"
                    />{" "}
                    Male
                  </label>
                  <label className="flex items-center text-slate-400 gap-2">
                    <input
                      type="checkbox"
                      className="appearance-none h-5 w-5 rounded-md border border-gray-300 
               checked:bg-[#00C9FF] checked:border-[#00C9FF] 
               checked:[&:after]:content-['✔'] checked:[&:after]:text-white 
               checked:[&:after]:flex checked:[&:after]:items-center checked:[&:after]:justify-center checked:[&:after]:text-sm"
                    />{" "}
                    Female
                  </label>
                </div>
              </div>

              {/* Marital Status */}
              <div>
                <label className="block text-slate-600 mb-1">
                  Marital Status:
                </label>
                <div className="flex gap-4">
                  <label className="flex items-center text-slate-400 gap-2">
                    <input
                      type="checkbox"
                      className="appearance-none h-5 w-5 rounded-md border border-gray-300 
               checked:bg-[#00C9FF] checked:border-[#00C9FF] 
               checked:[&:after]:content-['✔'] checked:[&:after]:text-white 
               checked:[&:after]:flex checked:[&:after]:items-center checked:[&:after]:justify-center checked:[&:after]:text-sm"
                    />{" "}
                    Yes
                  </label>
                  <label className="flex items-center text-slate-400 gap-2">
                    <input
                      type="checkbox"
                      className="appearance-none h-5 w-5 rounded-md border border-gray-300 
               checked:bg-[#00C9FF] checked:border-[#00C9FF] 
               checked:[&:after]:content-['✔'] checked:[&:after]:text-white 
               checked:[&:after]:flex checked:[&:after]:items-center checked:[&:after]:justify-center checked:[&:after]:text-sm"
                    />{" "}
                    No
                  </label>
                </div>
              </div>

              {/* Kids */}
              <div>
                <label className="block text-slate-600 mb-1">Kids:</label>
                <div className="flex gap-4">
                  <label className="flex items-center  text-slate-400 gap-2">
                    <input
                      type="checkbox"
                      className="appearance-none h-5 w-5 rounded-md border border-gray-300 
               checked:bg-[#00C9FF] checked:border-[#00C9FF] 
               checked:[&:after]:content-['✔'] checked:[&:after]:text-white 
               checked:[&:after]:flex checked:[&:after]:items-center checked:[&:after]:justify-center checked:[&:after]:text-sm"
                    />{" "}
                    Yes
                  </label>
                  <label className="flex items-center text-slate-400 gap-2">
                    <input
                      type="checkbox"
                      className="appearance-none h-5 w-5 rounded-md border border-gray-300 
               checked:bg-[#00C9FF] checked:border-[#00C9FF] 
               checked:[&:after]:content-['✔'] checked:[&:after]:text-white 
               checked:[&:after]:flex checked:[&:after]:items-center checked:[&:after]:justify-center checked:[&:after]:text-sm"
                    />{" "}
                    No
                  </label>
                </div>
              </div>

              {/* Illness/Operation */}
              <div className="sm:col-span-2 lg:col-span-3">
                <label className="block text-slate-600 mb-1">
                  Any major illness/operation during last three years?
                </label>
                <div className="flex gap-4 ">
                  <label className="flex items-center text-slate-400 gap-2">
                    <input
                      type="checkbox"
                      className="appearance-none h-5 w-5 rounded-md border border-gray-300 
               checked:bg-[#00C9FF] checked:border-[#00C9FF] 
               checked:[&:after]:content-['✔'] checked:[&:after]:text-white 
               checked:[&:after]:flex checked:[&:after]:items-center checked:[&:after]:justify-center checked:[&:after]:text-sm"
                    />{" "}
                    Yes
                  </label>
                  <label className="flex items-center text-slate-400 gap-2">
                    <input
                      type="checkbox"
                      className="appearance-none h-5 w-5 rounded-md border border-gray-300 
               checked:bg-[#00C9FF] checked:border-[#00C9FF] 
               checked:[&:after]:content-['✔'] checked:[&:after]:text-white 
               checked:[&:after]:flex checked:[&:after]:items-center checked:[&:after]:justify-center checked:[&:after]:text-sm"
                    />{" "}
                    No
                  </label>
                </div>
              </div>

              {/* Candidates History */}
              <div className="sm:col-span-2 lg:col-span-3">
                <p className="fontAL font-semibold capitalize text-xl md:text-2xl py-5 lg:text-3xl text-center">
                  CANDIDATES HISTORY (Starting with most recent job)
                </p>
                {/* Add button - only once at bottom */}
                {employmentHistory.length < 5 && (
                  <div className="flex justify-start pl-4 mt-2">
                    <button
                      type="button"
                      onClick={addEmployment}
                      className="flex items-center justify-center w-8 h-8 rounded bg-[#00c9ff] text-white font-bold hover:bg-blue-500 transition"
                    >
                      +
                    </button>
                  </div>
                )}

                {employmentHistory.map((_, index) => (
                  <div key={index} className=" p-4 mb-4 space-y-4 relative">
                    {/* Remove button (only if more than 1 row) */}
                    {employmentHistory.length > 1 && (
                      <button
                        type="button"
                        onClick={() => removeEmployment(index)}
                        className="absolute -top-4 right-2 flex items-center justify-center w-8 h-8 rounded bg-[#00c9ff] text-white font-bold hover:bg-[#00c9ff] transition"
                      >
                        –
                      </button>
                    )}

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 text-sm">
                      {/* Company Name */}
                      <div>
                        <label className="block text-slate-600 mb-1">
                          Company Name:
                        </label>
                        <input
                          type="text"
                          placeholder="Enter company name"
                          className="w-full p-2 rounded bg-white text-sm placeholder-slate-400 
            ring-1 ring-blue-100 transition focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#00c9ff]"
                        />
                      </div>

                      {/* Position Held */}
                      <div>
                        <label className="block text-slate-600 mb-1">
                          Position Held:
                        </label>
                        <input
                          type="text"
                          placeholder="Enter position held"
                          className="w-full p-2 rounded bg-white text-sm placeholder-slate-400 
            ring-1 ring-blue-100 transition focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#00c9ff]"
                        />
                      </div>

                      {/* Employment Period */}
                      <div>
                        <label className="block text-slate-600 mb-1">
                          Employment Period:
                        </label>
                        <div className="flex gap-2">
                          <input
                            type="text"
                            placeholder="dd-mm-yyyy"
                            onFocus={(e) => (e.target.type = "date")}
                            onBlur={(e) => (e.target.type = "text")}
                            className="w-full p-2 rounded bg-white pr-10 text-sm placeholder-slate-400 
              ring-1 ring-blue-100 transition focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#00c9ff] appearance-none"
                          />
                          <span className="self-center text-slate-500">-</span>
                          <input
                            type="text"
                            placeholder="dd-mm-yyyy"
                            onFocus={(e) => (e.target.type = "date")}
                            onBlur={(e) => (e.target.type = "text")}
                            className="w-full p-2 rounded bg-white pr-10 text-sm placeholder-slate-400 
              ring-1 ring-blue-100 transition focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#00c9ff] appearance-none"
                          />
                        </div>
                      </div>

                      {/* Reason for Leaving */}
                      <div>
                        <label className="block text-slate-600 mb-1">
                          Reason for Leaving:
                        </label>
                        <input
                          type="text"
                          placeholder="Enter reason for leaving"
                          className="w-full p-2 rounded bg-white text-sm placeholder-slate-400 
            ring-1 ring-blue-100 transition focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#00c9ff]"
                        />
                      </div>

                      {/* Supervisor's Name */}
                      <div>
                        <label className="block text-slate-600 mb-1">
                          Supervisor’s Name:
                        </label>
                        <input
                          type="text"
                          placeholder="Enter supervisor’s name"
                          className="w-full p-2 rounded bg-white text-sm placeholder-slate-400 
            ring-1 ring-blue-100 transition focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#00c9ff]"
                        />
                      </div>

                      {/* Supervisor's Contact */}
                      <div>
                        <label className="block text-slate-600 mb-1">
                          Supervisor’s Contact:
                        </label>
                        <input
                          type="text"
                          placeholder="Enter supervisor’s contact"
                          className="w-full p-2 rounded bg-white text-sm placeholder-slate-400 
            ring-1 ring-blue-100 transition focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#00c9ff]"
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Educational Background */}
              <div className="sm:col-span-2 lg:col-span-3 ">
                <p className="fontAL font-semibold capitalize text-xl md:text-2xl lg:text-3xl  text-center">
                  EDUCATIONAL BACKGROUND
                </p>
                {/* Add button - only once at bottom */}
                {educationHistory.length < 5 && (
                  <div className="flex justify-start pl-4 mt-5">
                    <button
                      type="button"
                      onClick={addEducation}
                      className="flex items-center justify-center w-8 h-8 rounded bg-[#00c9ff] text-white font-bold hover:bg-blue-500 transition"
                    >
                      +
                    </button>
                  </div>
                )}
                {educationHistory.map((_, index) => (
                  <div key={index} className=" p-4 my-4 space-y-4 relative">
                    {/* Remove button (only if more than 1 row) */}
                    {educationHistory.length > 1 && (
                      <button
                        type="button"
                        onClick={() => removeEducation(index)}
                        className="absolute -top-4 right-2 flex items-center justify-center w-8 h-8 rounded bg-[#00C9FF] text-white font-bold hover:bg-[##00C9FF] transition"
                      >
                        –
                      </button>
                    )}

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 text-sm">
                      {/* Degree */}
                      <div>
                        <label className="block text-slate-600 mb-1">
                          Degree:
                        </label>
                        <input
                          type="text"
                          placeholder="Enter your degree"
                          className="w-full p-2 rounded bg-white text-sm placeholder-slate-400 
            ring-1 ring-blue-100 transition focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#00c9ff]"
                        />
                      </div>

                      {/* Institution */}
                      <div>
                        <label className="block text-slate-600 mb-1">
                          Institution:
                        </label>
                        <input
                          type="text"
                          placeholder="Enter institution"
                          className="w-full p-2 rounded bg-white text-sm placeholder-slate-400 
            ring-1 ring-blue-100 transition focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#00c9ff]"
                        />
                      </div>

                      {/* Year of Completion */}
                      <div>
                        <label className="block text-slate-600 mb-1">
                          Year of Completion:
                        </label>
                        <input
                          type="date"
                          className="w-full p-2 rounded bg-white text-sm text-slate-400 
            ring-1 ring-blue-100 transition focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#00c9ff]"
                          placeholder="dd/mm/yyyy"
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Availability & Preferred Work Schedule */}
              <div className="sm:col-span-2 lg:col-span-3">
                <p className="fontAL font-semibold capitalize text-xl md:text-2xl lg:text-3xl py-5 pb-8 text-center">
                  Availability & Preferred Work Schedule
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 text-sm">
                  {/* Available to Start Work From */}
                  <div>
                    <label className="block text-slate-600 mb-1">
                      Available to Start Work From:
                    </label>
                    <input
                      type="date"
                      className="w-full p-2 rounded bg-white text-sm text-slate-400 
            ring-1 ring-blue-100 transition focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#00c9ff]"
                      placeholder="dd/mm/yyyy"
                    />
                  </div>

                  {/* Position Applied For */}
                  <div>
                    <label className="block text-slate-600 mb-1">
                      Position Applied For:
                    </label>
                    <input
                      type="text"
                      placeholder="Enter position applied"
                      className="w-full p-2 rounded bg-white  text-sm placeholder-slate-400 ring-1 ring-blue-100 transition focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#00c9ff]"
                    />
                  </div>

                  {/* Current Position */}
                  <div>
                    <label className="block text-slate-600 mb-1">
                      Current Position:
                    </label>
                    <input
                      type="text"
                      placeholder="Enter your current position"
                      className="w-full p-2 rounded bg-white  text-sm placeholder-slate-400 ring-1 ring-blue-100 transition focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#00c9ff]"
                    />
                  </div>

                  {/* Salary Drawn */}
                  <div>
                    <label className="block text-slate-600 mb-1">
                      Salary Drawn:
                    </label>
                    <input
                      type="text"
                      placeholder="Enter your salary drawn"
                      className="w-full p-2 rounded bg-white  text-sm placeholder-slate-400 ring-1 ring-blue-100 transition focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#00c9ff]"
                    />
                  </div>

                  {/* Salary Expected */}
                  <div>
                    <label className="block text-slate-600 mb-1">
                      Salary Expected:
                    </label>
                    <input
                      type="text"
                      placeholder="Enter your expected salary"
                      className="w-full p-2 rounded bg-white  text-sm placeholder-slate-400 ring-1 ring-blue-100 transition focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#00c9ff]"
                    />
                  </div>

                  {/* Work Arrangement */}
                  <div>
                    <label className="block text-slate-600 ">
                      Work Arrangement:
                    </label>
                    <div className="grid grid-cols-2 gap-2 text-slate-400">
                      <label className="flex items-center gap-2">
                        <input
                          type="checkbox"
                          className="appearance-none h-5 w-5 rounded-md border border-gray-300 
               checked:bg-[#00C9FF] checked:border-[#00C9FF] 
               checked:[&:after]:content-['✔'] checked:[&:after]:text-white 
               checked:[&:after]:flex checked:[&:after]:items-center checked:[&:after]:justify-center checked:[&:after]:text-sm"
                        />{" "}
                        Full-Time
                      </label>
                      <label className="flex items-center gap-2">
                        <input
                          type="checkbox"
                          className="appearance-none h-5 w-5 rounded-md border border-gray-300 
               checked:bg-[#00C9FF] checked:border-[#00C9FF] 
               checked:[&:after]:content-['✔'] checked:[&:after]:text-white 
               checked:[&:after]:flex checked:[&:after]:items-center checked:[&:after]:justify-center checked:[&:after]:text-sm"
                        />{" "}
                        Part-Time
                      </label>
                      <label className="flex items-center gap-2">
                        <input
                          type="checkbox"
                          className="appearance-none h-5 w-5 rounded-md border border-gray-300 
               checked:bg-[#00C9FF] checked:border-[#00C9FF] 
               checked:[&:after]:content-['✔'] checked:[&:after]:text-white 
               checked:[&:after]:flex checked:[&:after]:items-center checked:[&:after]:justify-center checked:[&:after]:text-sm"
                        />{" "}
                        Temporary
                      </label>
                      <label className="flex items-center gap-2">
                        <input
                          type="checkbox"
                          className="appearance-none h-5 w-5 rounded-md border border-gray-300 
               checked:bg-[#00C9FF] checked:border-[#00C9FF] 
               checked:[&:after]:content-['✔'] checked:[&:after]:text-white 
               checked:[&:after]:flex checked:[&:after]:items-center checked:[&:after]:justify-center checked:[&:after]:text-sm"
                        />{" "}
                        Shift Work
                      </label>
                    </div>
                  </div>
                </div>
              </div>

              {/* Language Proficiency */}
              <div className="sm:col-span-2 lg:col-span-3 ">
                <p className="fontAL font-semibold capitalize text-xl md:text-2xl py-5  lg:text-3xl my-10 text-center">
                  Language Proficiency
                </p>

                <div className="space-y-4 text-sm">
                  {["English", "Hindi", "Gujarati"].map((lang) => (
                    <div key={lang} className="flex  gap-4 items-center">
                      <span className="w-24 text-slate-600">{lang}:</span>
                      <div className="grid  sm:flex gap-1">
                        <label className="flex items-center gap-2 text-slate-400">
                          <input
                            type="checkbox"
                            className="appearance-none h-5 w-5 rounded-md border border-gray-300 
               checked:bg-[#00C9FF] checked:border-[#00C9FF] 
               checked:[&:after]:content-['✔'] checked:[&:after]:text-white 
               checked:[&:after]:flex checked:[&:after]:items-center checked:[&:after]:justify-center checked:[&:after]:text-sm"
                          />{" "}
                          No
                        </label>
                        <label className="flex items-center gap-2 text-slate-400">
                          <input
                            type="checkbox"
                            className="appearance-none h-5 w-5 rounded-md border border-gray-300 
               checked:bg-[#00C9FF] checked:border-[#00C9FF] 
               checked:[&:after]:content-['✔'] checked:[&:after]:text-white 
               checked:[&:after]:flex checked:[&:after]:items-center checked:[&:after]:justify-center checked:[&:after]:text-sm"
                          />{" "}
                          Basic
                        </label>
                        <label className="flex items-center gap-2 text-slate-400">
                          <input
                            type="checkbox"
                            className="appearance-none h-5 w-5 rounded-md border border-gray-300 
               checked:bg-[#00C9FF] checked:border-[#00C9FF] 
               checked:[&:after]:content-['✔'] checked:[&:after]:text-white 
               checked:[&:after]:flex checked:[&:after]:items-center checked:[&:after]:justify-center checked:[&:after]:text-sm"
                          />{" "}
                          Intermediate
                        </label>
                        <label className="flex items-center gap-2 text-slate-400">
                          <input
                            type="checkbox"
                            className="appearance-none h-5 w-5 rounded-md border border-gray-300 
               checked:bg-[#00C9FF] checked:border-[#00C9FF] 
               checked:[&:after]:content-['✔'] checked:[&:after]:text-white 
               checked:[&:after]:flex checked:[&:after]:items-center checked:[&:after]:justify-center checked:[&:after]:text-sm"
                          />
                          Fluent
                        </label>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};
export default Login;
// {
//   /* Language Proficiency */
// }
// <div className="sm:col-span-2 lg:col-span-3">
//   <p className="fontAL font-semibold capitalize text-xl md:text-2xl lg:text-3xl py-5 my-6 text-center">
//     Language Proficiency
//   </p>

//   <div className="overflow-x-auto">
//     <div className="min-w-[600px]">
//       {/* Header Row */}
//       <div className="grid grid-cols-5 text-sm font-medium text-slate-700 border-b pb-3 mb-3">
//         <span className="text-left">Language</span>
//         <span className="text-center">No</span>
//         <span className="text-center">Basic</span>
//         <span className="text-center">Intermediate</span>
//         <span className="text-center">Fluent</span>
//       </div>

//       {/* Languages */}
//       {["English", "Hindi", "Gujarati"].map((lang) => (
//         <div
//           key={lang}
//           className="grid grid-cols-5 items-center text-sm text-slate-600 py-3 border-b"
//         >
//           <span className="font-medium">{lang}</span>

//           {["No", "Basic", "Intermediate", "Fluent"].map((level) => (
//             <label
//               key={level}
//               className="flex justify-center items-center gap-2 text-slate-500 cursor-pointer"
//             >
//               <input
//                 type="checkbox"
//                 className="appearance-none h-5 w-5 rounded-md border border-gray-300
//                 checked:bg-[#00C9FF] checked:border-[#00C9FF]
//                 checked:[&:after]:content-['✔'] checked:[&:after]:text-white
//                 checked:[&:after]:flex checked:[&:after]:items-center
//                 checked:[&:after]:justify-center checked:[&:after]:text-sm transition"
//               />
//             </label>
//           ))}
//         </div>
//       ))}
//     </div>
//   </div>
// </div>;
