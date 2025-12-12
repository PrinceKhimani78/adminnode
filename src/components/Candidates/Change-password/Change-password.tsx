"use client";
import Sidebar from "@/components/Common/Sidebar";
import React from "react";
import Image from "next/image";
import Link from "next/link";
import { FaLock } from "react-icons/fa";
import Footer from "@/components/Footer/Footer";
import { IoChevronForward } from "react-icons/io5";
import { FiChevronRight } from "react-icons/fi";

const InputField = ({
  id,
  label,
  placeholder,
  type = "password",
  icon,
}: {
  id: string;
  label: string;
  placeholder: string;
  type?: string;
  icon: React.ReactNode;
}) => (
  <div className="flex flex-col gap-2">
    <label htmlFor={id} className="text-sm font-medium text-slate-700">
      {label}
    </label>
    <div className="relative">
      <span className="absolute inset-y-0 left-3 flex items-center text-gray-400">
        {icon}
      </span>
      <input
        type={type}
        id={id}
        placeholder={placeholder}
        className="w-full  pl-10 pr-3 py-2 rounded bg-white  text-sm placeholder-slate-400 ring-1 ring-blue-100 transition focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#00c9ff]"
      />
    </div>
  </div>
);

const Changepassword = () => {
  const [mobileOpen, setMobileOpen] = React.useState(false);
  return (
    <>
      <div className="pl-2 pr-4 sm:px-2 py-2 flex gap-3 sm:gap-4 my-30 relative">
        <Sidebar
          type="candidate"
          mobileOpen={mobileOpen}
          setMobileOpen={setMobileOpen}
        />
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
                  Change-Password
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
                      Change-Password
                    </span>
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
          {/* change password  */}
          <div className="space-y-6">
            <h2 className="text-lg font-semibold border-b pb-2">
              Change Password
            </h2>

            <form className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <InputField
                  id="old-password"
                  label="Old Password"
                  placeholder="Enter old password"
                  type="password"
                  icon={<FaLock className="text-[#00C9FF]" />}
                />
                <InputField
                  id="new-password"
                  label="New Password"
                  placeholder="Enter new password"
                  type="password"
                  icon={<FaLock className="text-[#00C9FF]" />}
                />
              </div>
              <InputField
                id="confirm-password"
                label="Confirm New Password"
                placeholder="Re-enter new password"
                type="password"
                icon={<FaLock className="text-[#00C9FF]" />}
              />

              <button
                type="submit"
                className="relative px-4 h-9 overflow-hidden group border border-[#00c9ff] bg-[#00c9ff] rounded-lg from-gray-700/50 to-black hover:bg-transparent text-white hover:text-[#00c9ff] active:scale-90 transition-all ease-out duration-700 cursor-pointer"
              >
                <span className="absolute right-0 w-10 h-full top-0 transition-all duration-1000 transform translate-x-12 bg-white opacity-10 -skew-x-12 group-hover:-translate-x-24 ease"></span>
                <span className="relative flex gap-2 items-center text-sm font-semibold">
                  Save Channges
                </span>
              </button>
            </form>
          </div>
        </main>
      </div>
      {/* <Footer /> */}
    </>
  );
};

export default Changepassword;
