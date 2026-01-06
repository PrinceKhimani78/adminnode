"use client";
import Sidebar from "../Common/Sidebar";
import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  FaUser,
  FaPhone,
  FaEnvelope,
  FaGlobe,
  FaCalendarAlt,
  FaVimeoV,
  FaInfoCircle,
  FaPlus,
  FaYoutube,
  FaFacebookF,
  FaTwitter,
  FaLinkedinIn,
  FaWhatsapp,
  FaInstagram,
  FaPinterest,
  FaTumblr,
} from "react-icons/fa";

import { IoChevronForward } from "react-icons/io5";
import { FiChevronRight } from "react-icons/fi";

const InputField = ({
  id,
  label,
  placeholder,
  icon,
}: {
  id: string;
  label: string;
  placeholder: string;
  icon: React.ReactNode;
}) => (
  <div className="relative">
    <label
      htmlFor={id}
      className="block text-sm font-medium text-gray-700 mb-2"
    >
      {label}
    </label>
    <span className="absolute left-3 top-10 text-[#00C9FF]">{icon}</span>
    <input
      id={id}
      name={id}
      type="text"
      placeholder={placeholder}
      className="w-full pl-10 p-2 rounded bg-white text-sm placeholder-slate-400 ring-1 ring-blue-100 
      transition focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#00c9ff]"
    />
  </div>
);
// input for social network
const SocialInput = ({
  id,
  label,
  placeholder,
  icon,
}: {
  id: string;
  label: string;
  placeholder: string;
  icon: React.ReactNode;
}) => (
  <div className="relative">
    <label
      htmlFor={id}
      className="block text-sm font-medium text-gray-700 mb-2"
    >
      {label}
    </label>
    <span className="absolute left-3 top-10 text-[#00C9FF]">{icon}</span>
    <input
      id={id}
      name={id}
      type="url"
      placeholder={placeholder}
      className="w-full pl-10 p-2 rounded text-sm placeholder-slate-400 ring-1 ring-blue-100 
      transition focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#00c9ff]"
    />
  </div>
);
const Companyprofile = () => {
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const [showModal, setShowModal] = useState(false);
  return (
    <>
      <div className="pl-2 pr-4 sm:px-2 py-2 flex gap-3 sm:gap-4 my-10 relative">
        {/* Sidebar */}
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
                  Company-Profile
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
                    <span className="text-gray-700 font-medium">
                      Company-Logo
                    </span>
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
          {/* Logo and Cover image */}
          <div className="space-y-8">
            <div className="border-b border-gray-300 pb-4">
              <h3 className="text-lg font-semibold flex gap-2">
                Logo and Cover image
              </h3>
            </div>

            {/* Company Logo */}
            <div className="flex flex-col gap-3">
              {/* */}
              <div className="relative w-[120px] h-[120px] flex items-center justify-center rounded-md border border-gray-200 bg-white">
                <Image
                  src="/images/company.webp"
                  alt="Company Logo"
                  width={100}
                  height={100}
                  className="object-contain"
                />

                <button
                  type="button"
                  className="absolute bottom-[10px] left-1/2 -translate-x-1/2 
             bg-[#00C9FF] hover:bg-[#0069d9] text-white text-xs 
             font-semibold w-[110px] py-2 rounded-md shadow text-center"
                >
                  Upload Photo
                </button>
              </div>

              {/* Instructions */}
              <p className="text-gray-600 text-sm mt-6">
                <span className="font-semibold">Company Logo :- </span>
                Max file size is <b>1MB</b>, Minimum dimension:
                <b> 136 x 136 </b> and suitable file types are
                <span className="text-blue-600"> .jpg</span> &{" "}
                <span className="text-blue-600">webp</span>
              </p>
            </div>

            {/* Banner Upload */}
            <div>
              <div className="border-2 border-dashed border-gray-300 bg-blue-50 rounded-md p-10 text-center text-gray-500 text-sm cursor-pointer hover:border-blue-400 hover:bg-blue-100 transition">
                Drop files here to upload
              </div>
              <p className="text-gray-600 text-sm mt-2">
                <span className="font-semibold">
                  Background Banner Image :-{" "}
                </span>
                Max file size is <b>1MB</b>, Minimum dimension:
                <b> 770 x 310 </b> and suitable file types are
                <span className="text-blue-600"> .jpg</span> &{" "}
                <span className="text-blue-600">webp</span>
              </p>
            </div>
          </div>
          {/* basic information  */}
          <div className="bg-white p-0 sm:p-2  ">
            <h3 className="text-lg font-semibold mb-6 border-b pb-3">
              Basic Informations
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {/* Company Name */}
              <InputField
                id="companyName"
                label="Company Name"
                placeholder="David Smith"
                icon={<FaUser />}
              />

              {/* Phone */}
              <InputField
                id="phone"
                label="Phone"
                placeholder="(251) 1234-456-7890"
                icon={<FaPhone />}
              />

              {/* Email */}
              <InputField
                id="email"
                label="Email Address"
                placeholder="David@example.com"
                icon={<FaEnvelope />}
              />

              {/* Website */}
              <InputField
                id="website"
                label="Website"
                placeholder="https://example.com"
                icon={<FaGlobe />}
              />

              {/* Est Since */}
              <InputField
                id="since"
                label="Est. Since"
                placeholder="Since..."
                icon={<FaCalendarAlt />}
              />

              {/* Team Size */}
              <InputField
                id="team"
                label="Team Size"
                placeholder="team-size"
                icon={<FaUser />}
              />
            </div>

            {/* Description */}
            <div className="relative sm:col-span-2 mt-6">
              <label
                htmlFor="description"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Description
              </label>
              <span className="absolute left-3 top-10 text-[#00C9FF]">
                <FaInfoCircle />
              </span>
              <textarea
                id="description"
                name="description"
                placeholder="Greetings! We are Galaxy Software Development Company."
                rows={4}
                className="w-full pl-10 p-2 rounded bg-blue-50 text-sm placeholder-slate-400 ring-1 ring-blue-100 
                transition focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#00c9ff]"
              />
            </div>

            {/* Save Button */}
            <div className="mt-6 flex justify-start">
              <button
                type="submit"
                className="relative px-6 h-10 overflow-hidden group border border-[#00c9ff] bg-[#00c9ff] rounded-lg 
                  hover:bg-transparent text-white hover:text-[#00c9ff] active:scale-90 transition-all ease-out duration-700 cursor-pointer"
              >
                <span
                  className="absolute right-0 w-10 h-full top-0 transition-all duration-1000 transform 
                    translate-x-12 bg-white opacity-10 -skew-x-12 group-hover:-translate-x-24 ease"
                ></span>
                <span className="relative flex gap-2 items-center text-sm font-semibold">
                  Save Changes
                </span>
              </button>
            </div>
          </div>
          {/* Photo Gallery  */}
          <div className="bg-white p-0  sm:p-2  mt-8">
            <h3 className="text-lg font-semibold mb-6 border-b pb-3">
              Photo Gallery
            </h3>

            <div className="border-2 border-dashed border-gray-300 bg-blue-50 rounded-md p-16 text-center text-gray-500 text-sm cursor-pointer hover:border-blue-400 hover:bg-blue-100 transition">
              Drop files here to upload
            </div>

            <div className="mt-6 flex justify-start">
              <button
                type="submit"
                className="relative px-6 h-10 overflow-hidden group border border-[#00c9ff] bg-[#00c9ff] rounded-lg 
        hover:bg-transparent text-white hover:text-[#00c9ff] active:scale-90 transition-all ease-out duration-700 cursor-pointer"
              >
                <span
                  className="absolute right-0 w-10 h-full top-0 transition-all duration-1000 transform 
          translate-x-12 bg-white opacity-10 -skew-x-12 group-hover:-translate-x-24 ease"
                ></span>
                <span className="relative flex gap-2 items-center text-sm font-semibold">
                  Save Changes
                </span>
              </button>
            </div>
          </div>
          {/* Video Gallery  */}
          <div className="bg-white p-0  sm:p-2   mt-8">
            {/* Heading */}
            <h3 className="text-lg font-semibold mb-6 border-b pb-3">
              Video Gallery
            </h3>

            {/* Youtube & Vimeo */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {/* Youtube */}
              <div className="relative">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Youtube
                </label>
                <span className="absolute left-3 top-8 text-[#00C9FF]">
                  <FaYoutube />
                </span>
                <input
                  type="text"
                  placeholder="https://www.youtube.com/"
                  className="w-full pl-10 p-2 rounded bg-blue-50 text-sm placeholder-slate-400 ring-1 ring-blue-100 
        focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#00c9ff]"
                />
                <div className="mt-1 text-xs text-[#00C9FF] flex items-center gap-1 cursor-pointer hover:underline">
                  <FaPlus /> Add More Fields
                </div>
              </div>

              {/* Vimeo */}
              <div className="relative">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Vimeo
                </label>
                <span className="absolute left-3 top-8 text-[#00C9FF]">
                  <FaVimeoV />
                </span>
                <input
                  type="text"
                  placeholder="https://vimeo.com/"
                  className="w-full pl-10 p-2 rounded bg-blue-50 text-sm placeholder-slate-400 ring-1 ring-blue-100 
        focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#00c9ff]"
                />
                <div className="mt-1 text-xs text-[#00C9FF] flex items-center gap-1 cursor-pointer hover:underline">
                  <FaPlus /> Add More Fields
                </div>
              </div>
            </div>

            <div className="mt-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Custom Video
              </label>
              <div className="border-2 border-dashed border-gray-300 bg-blue-50 rounded-md p-16 text-center text-gray-500 text-sm cursor-pointer hover:border-blue-400 hover:bg-blue-100 transition">
                Drop files here to upload
              </div>
            </div>

            <div className="mt-6 flex justify-start">
              <button
                type="submit"
                className="relative px-6 h-10 overflow-hidden group border border-[#00c9ff] bg-[#00c9ff] rounded-lg 
        hover:bg-transparent text-white hover:text-[#00c9ff] active:scale-90 transition-all ease-out duration-700 cursor-pointer"
              >
                <span
                  className="absolute right-0 w-10 h-full top-0 transition-all duration-1000 transform 
        translate-x-12 bg-white opacity-10 -skew-x-12 group-hover:-translate-x-24 ease"
                ></span>
                <span className="relative flex gap-2 items-center text-sm font-semibold">
                  Save Changes
                </span>
              </button>
            </div>
          </div>
          {/* social network  */}
          <div className="bg-white p-0 sm:p-2   mt-8">
            <h3 className="text-lg font-semibold mb-6 border-b pb-3">
              Social Network
            </h3>

            {/* Grid of Inputs */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              <SocialInput
                id="facebook"
                label="Facebook"
                placeholder="https://www.facebook.com/"
                icon={<FaFacebookF />}
              />
              <SocialInput
                id="twitter"
                label="Twitter"
                placeholder="https://twitter.com/"
                icon={<FaTwitter />}
              />
              <SocialInput
                id="linkedin"
                label="LinkedIn"
                placeholder="https://in.linkedin.com/"
                icon={<FaLinkedinIn />}
              />
              <SocialInput
                id="whatsapp"
                label="WhatsApp"
                placeholder="https://www.whatsapp.com/"
                icon={<FaWhatsapp />}
              />
              <SocialInput
                id="instagram"
                label="Instagram"
                placeholder="https://www.instagram.com/"
                icon={<FaInstagram />}
              />
              <SocialInput
                id="pinterest"
                label="Pinterest"
                placeholder="https://in.pinterest.com/"
                icon={<FaPinterest />}
              />
              <SocialInput
                id="tumblr"
                label="Tumblr"
                placeholder="https://www.tumblr.com/"
                icon={<FaTumblr />}
              />
              <SocialInput
                id="youtube"
                label="YouTube"
                placeholder="https://www.youtube.com/"
                icon={<FaYoutube />}
              />
            </div>

            {/* Save Button */}
            <div className="mt-6">
              <button
                type="submit"
                className="relative px-6 h-10 overflow-hidden group border border-[#00c9ff] bg-[#00c9ff] rounded-lg 
                hover:bg-transparent text-white hover:text-[#00c9ff] active:scale-90 transition-all ease-out duration-700 cursor-pointer"
              >
                <span
                  className="absolute right-0 w-10 h-full top-0 transition-all duration-1000 transform 
                translate-x-12 bg-white opacity-10 -skew-x-12 group-hover:-translate-x-24 ease"
                ></span>
                <span className="relative flex gap-2 items-center text-sm font-semibold">
                  Save Changes
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
                    className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
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

export default Companyprofile;
