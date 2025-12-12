"use client";
import React from "react";
import Image from "next/image";
import Link from "next/link";
import {
  FaUser,
  FaBriefcase,
  FaPhone,
  FaEnvelope,
  FaGlobe,
  FaGraduationCap,
  FaLanguage,
  FaDollarSign,
  FaCalendarAlt,
  FaCity,
  FaMapPin,
  FaRegAddressCard,
  FaInfoCircle,
  FaFacebookF,
  FaTwitter,
  FaLinkedinIn,
  FaWhatsapp,
  FaInstagram,
  FaPinterest,
  FaTumblr,
  FaYoutube,
} from "react-icons/fa";
import { FiChevronRight } from "react-icons/fi";
import { IoChevronForward } from "react-icons/io5";
import Footer from "@/components/Footer/Footer";
import Sidebar from "@/components/Common/Sidebar";
// input fields for basic information
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

const Profile = () => {
  const [mobileOpen, setMobileOpen] = React.useState(false);
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
                  My Profile
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
                    <span className="text-gray-700 font-medium">Profile</span>
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
              <h2 className="text-xl font-bold">Randall Henderson</h2>
              <p className="text-gray-500">IT Contractor</p>
            </div>
          </div>

          {/* Basic Information Form */}
          <div className="bg-white  p-6">
            <h3 className="text-lg font-semibold mb-6 border-b pb-3">
              Basic Information
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {/* Name */}
              <InputField
                id="name"
                label="Your Name"
                placeholder="Devid Smith"
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
                placeholder="Devid@example.com"
                icon={<FaEnvelope />}
              />
              {/* Website */}
              <InputField
                id="website"
                label="Website"
                placeholder="https://devsmith.net"
                icon={<FaGlobe />}
              />
              {/* Qualification */}
              <InputField
                id="qualification"
                label="Qualification"
                placeholder="BTech"
                icon={<FaGraduationCap />}
              />
              {/* Language */}
              <InputField
                id="language"
                label="Language"
                placeholder="English, Spanish"
                icon={<FaLanguage />}
              />
              {/* Job Category */}
              <InputField
                id="jobCategory"
                label="Job Category"
                placeholder="IT & Software"
                icon={<FaBriefcase />}
              />
              {/* Experience */}
              <InputField
                id="experience"
                label="Experience"
                placeholder="05 Years"
                icon={<FaCalendarAlt />}
              />
              {/* Current Salary */}
              <InputField
                id="currentSalary"
                label="Current Salary"
                placeholder="$65K"
                icon={<FaDollarSign />}
              />
              {/* Expected Salary */}
              <InputField
                id="expectedSalary"
                label="Expected Salary"
                placeholder="$75K"
                icon={<FaDollarSign />}
              />
              {/* Age */}
              <InputField
                id="age"
                label="Age"
                placeholder="35 Years"
                icon={<FaUser />}
              />
              {/* Country */}
              <InputField
                id="country"
                label="Country"
                placeholder="USA"
                icon={<FaGlobe />}
              />
              {/* City */}
              <InputField
                id="city"
                label="City"
                placeholder="Texas"
                icon={<FaCity />}
              />
              {/* Postcode */}
              <InputField
                id="postcode"
                label="Postcode"
                placeholder="75462"
                icon={<FaMapPin />}
              />
              {/* Full Address */}
              <InputField
                id="address"
                label="Full Address"
                placeholder="1363-1385 Sunset Blvd Angeles, CA 90026, USA"
                icon={<FaRegAddressCard />}
              />
              {/* Description */}
              <div className="relative sm:col-span-2">
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
                  placeholder="Write a short bio..."
                  rows={4}
                  className="w-full pl-10 p-2 rounded bg-white text-sm placeholder-slate-400 ring-1 ring-blue-100 
                  transition focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#00c9ff]"
                />
              </div>
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
          {/* social network  */}
          <div className="bg-white  p-6 mt-8">
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
      </div>
      {/* <Footer /> */}
    </>
  );
};

export default Profile;
