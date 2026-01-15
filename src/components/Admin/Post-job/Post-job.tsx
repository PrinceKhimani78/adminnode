"use client";
import React, { useState } from "react";
import Sidebar from "../Common/Sidebar";
import Image from "next/image";
import Link from "next/link";

import { IoChevronForward } from "react-icons/io5";
import { FiChevronRight } from "react-icons/fi";
import {
  FaUser,
  FaDollarSign,
  FaVenusMars,
  FaBriefcase,
  FaGraduationCap,
  FaGlobe,
  FaCity,
  FaMapMarkerAlt,
  FaEnvelope,
  FaHome,
  FaCalendarAlt,
} from "react-icons/fa";
import { ReactNode } from "react";

interface InputFieldProps {
  id: string;
  label: string;
  placeholder: string;
  icon: ReactNode;
}
const InputField = ({ id, label, placeholder, icon }: InputFieldProps) => (
  <div className="relative">
    <label
      htmlFor={id}
      className="block text-sm font-medium text-gray-700 mb-1"
    >
      {label}
    </label>
    <span className="absolute left-3 top-8 text-[#72B76A]">{icon}</span>
    <input
      type="text"
      id={id}
      placeholder={placeholder}
      className="w-full pl-10 p-2 rounded bg-green-50 text-sm placeholder-slate-400 ring-1 ring-green-100 
      transition focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#72B76A]"
    />
  </div>
);
const Postjob = () => {
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const [showModal, setShowModal] = useState(false);
  return (
    <>
      <div className="pl-2 pr-4 sm:px-2 py-2 flex gap-3 sm:gap-4  relative">
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
                  Post-job
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
                    <span className="text-gray-700 font-medium">Post-jobs</span>
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
          {/* job details  */}
          <div className="bg-white p-6">
            <h3 className="text-lg font-semibold mb-6 border-b pb-3">
              Job Details
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              <InputField
                id="title"
                label="Job Title"
                placeholder="Devid Smith"
                icon={<FaUser />}
              />
              <InputField
                id="category"
                label="Job Category"
                placeholder="Accounting and Finance"
                icon={<FaBriefcase />}
              />
              <InputField
                id="type"
                label="Job Type"
                placeholder="Full-time"
                icon={<FaBriefcase />}
              />
              <InputField
                id="salary"
                label="Offered Salary"
                placeholder="$ Salary"
                icon={<FaDollarSign />}
              />
              <InputField
                id="experience"
                label="Experience"
                placeholder="Minimum 3 years"
                icon={<FaUser />}
              />
              <InputField
                id="qualification"
                label="Qualification"
                placeholder="Qualification Title"
                icon={<FaGraduationCap />}
              />
              <InputField
                id="gender"
                label="Gender"
                placeholder="Select Gender"
                icon={<FaVenusMars />}
              />
              <InputField
                id="country"
                label="Country"
                placeholder="Country"
                icon={<FaGlobe />}
              />
              <InputField
                id="city"
                label="City"
                placeholder="City"
                icon={<FaCity />}
              />
              <InputField
                id="location"
                label="Location"
                placeholder="Type Address"
                icon={<FaMapMarkerAlt />}
              />
              <InputField
                id="latitude"
                label="Latitude"
                placeholder="Los Angeles"
                icon={<FaMapMarkerAlt />}
              />
              <InputField
                id="longitude"
                label="Longitude"
                placeholder="Los Angeles"
                icon={<FaMapMarkerAlt />}
              />
              <InputField
                id="email"
                label="Email Address"
                placeholder="Devid@example.com"
                icon={<FaEnvelope />}
              />
              <InputField
                id="website"
                label="Website"
                placeholder="https://..."
                icon={<FaGlobe />}
              />
              <InputField
                id="since"
                label="Est. Since"
                placeholder="Since..."
                icon={<FaCalendarAlt />}
              />
            </div>

            {/* Address */}
            <div className="mt-6">
              <InputField
                id="fullAddress"
                label="Complete Address"
                placeholder="1363-1385 Sunset Blvd Los Angeles, CA 90026, USA"
                icon={<FaHome />}
              />
            </div>

            {/* Description */}
            <div className="relative mt-6">
              <label
                htmlFor="description"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Description
              </label>
              <textarea
                id="description"
                rows={4}
                placeholder="Job description..."
                className="w-full p-2 rounded  text-sm placeholder-slate-400 ring-1 ring-green-100 
                transition focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#72B76A]"
              />
            </div>

            {/* Dates */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mt-6">
              <InputField
                id="startDate"
                label="Start Date"
                placeholder="mm/dd/yyyy"
                icon={<FaCalendarAlt />}
              />
              <InputField
                id="endDate"
                label="End Date"
                placeholder="mm/dd/yyyy"
                icon={<FaCalendarAlt />}
              />
            </div>

            {/* Buttons */}
            <div className="mt-6 grid grid-cols-1 gap-3 sm:flex sm:gap-4">
              {/* Publish Job */}
              <button
                type="submit"
                className="w-full sm:w-auto relative px-4 h-9 overflow-hidden group border border-[#72B76A] bg-[#72B76A] rounded-md 
    hover:bg-transparent text-white hover:text-[#72B76A] active:scale-90 transition-all ease-out duration-700 cursor-pointer text-sm"
              >
                <span
                  className="absolute right-0 w-8 h-full top-0 transition-all duration-1000 transform 
      translate-x-12 bg-white opacity-10 -skew-x-12 group-hover:-translate-x-24 ease"
                ></span>
                <span className="relative flex gap-2 items-center font-semibold justify-center">
                  Publish Job
                </span>
              </button>

              {/* Save Draft */}
              <button
                type="button"
                className="w-full sm:w-auto relative px-4 h-9 overflow-hidden group border border-[#72B76A] bg-white text-[#72B76A] rounded-md 
    hover:bg-[#72B76A] hover:text-white active:scale-90 transition-all ease-out duration-700 cursor-pointer text-sm"
              >
                <span
                  className="absolute right-0 w-8 h-full top-0 transition-all duration-1000 transform 
      translate-x-12 bg-white opacity-20 -skew-x-12 group-hover:-translate-x-24 ease"
                ></span>
                <span className="relative flex gap-2 items-center font-semibold justify-center">
                  Save Draft
                </span>
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
                  Do you want to delete your profile?
                </p>
                <div className="flex justify-center gap-4">
                  <button
                    onClick={() => setShowModal(false)}
                    className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition"
                  >
                    No
                  </button>
                  <button
                    onClick={async () => {
                      try {
                        const res = await fetch("/api/delete-profile", {
                          method: "DELETE",
                        });
                        if (res.ok) {
                          console.log("Profile deleted successfully");
                          // optional: redirect or logout
                        } else {
                          console.error("Failed to delete profile");
                        }
                      } catch (err) {
                        console.error("Error deleting profile", err);
                      }
                      setShowModal(false);
                    }}
                    className="px-6 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition"
                  >
                    Yes
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

export default Postjob;
