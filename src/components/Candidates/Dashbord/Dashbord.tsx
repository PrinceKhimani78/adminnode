"use client";
import React from "react";
import Image from "next/image";
import Link from "next/link";
import Footer from "@/components/Footer/Footer";
import {
  FaBriefcase,
  FaFileAlt,
  FaBell,
  FaEnvelope,
  FaMapMarkerAlt,
  FaEye,
  FaTrash,
} from "react-icons/fa";
import { FiChevronRight } from "react-icons/fi";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import Sidebar from "@/components/Common/Sidebar";
import { IoChevronForward } from "react-icons/io5";
const profileViewsData = [
  { month: "January", viewers: 200 },
  { month: "February", viewers: 250 },
  { month: "March", viewers: 350 },
  { month: "April", viewers: 200 },
  { month: "May", viewers: 250 },
  { month: "June", viewers: 150 },
];

const applicants = [
  {
    name: "Wanda Montgomery",
    role: "Charted Accountant",
    location: "New York",
    rate: "$20 / Day",
    image: "/images/profile1.png",
  },
  {
    name: "Peter Hawkins",
    role: "Medical Professed",
    location: "New York",
    rate: "$7 / Hour",
    image: "/images/profile1.png",
  },
  {
    name: "Ralph Johnson",
    role: "Bank Manger",
    location: "New York",
    rate: "$180 / Day",
    image: "/images/profile1.png",
  },
  {
    name: "Randall Henderson",
    role: "IT Contractor",
    location: "New York",
    rate: "$90 / Week",
    image: "/images/profile1.png",
  },
];

const Dashbord = () => {
  const [mobileOpen, setMobileOpen] = React.useState(false);
  return (
    <>
      <div className="pl-2 pr-4 sm:px-2 py-2 flex gap-3 sm:gap-4 my-30 relative ">
        {/* Sidebar */}
        <Sidebar
          type="candidate"
          mobileOpen={mobileOpen}
          setMobileOpen={setMobileOpen}
        />
        {/* Main content */}
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
                  Candidates Dashboard
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
              <h2 className="text-base sm:text-lg font-bold">
                Randall Henderson
              </h2>
              <p className="text-gray-500">IT Contractor</p>
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                title: "Posted Jobs",
                value: 25,
                icon: <FaBriefcase />,
                color: "bg-[#FFCC23]",
              },
              {
                title: "Total Applications",
                value: 435,
                icon: <FaFileAlt />,
                color: "bg-[#72B76A]",
              },
              {
                title: "Messages",
                value: 28,
                icon: <FaEnvelope />,
                color: "bg-[#AE70BB]",
              },
              {
                title: "Notifications",
                value: 18,
                icon: <FaBell />,
                color: "bg-[#00C9FF]",
              },
            ].map((card, i) => (
              <div
                key={i}
                className={`${card.color} text-white p-6 rounded-lg shadow flex justify-between items-center`}
              >
                <div className="flex flex-col gap-2">
                  <div className="text-3xl text-white">{card.icon}</div>
                  <p className="text-sm">{card.title}</p>
                </div>
                <p className="text-3xl font-bold">{card.value}</p>
              </div>
            ))}
          </div>

          {/* Profile Views */}
          <div className="bg-white shadow rounded-lg p-6">
            <h3 className="text-lg font-semibold mb-4">Your Profile Views</h3>

            <div className="h-72 w-full min-w-0 overflow-x-auto scrollbar-thin">
              <div className="w-full min-w-0 h-full">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={profileViewsData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                    <XAxis dataKey="month" stroke="#6b7280" />
                    <YAxis stroke="#6b7280" />
                    <Tooltip />
                    <Legend />
                    <Line
                      type="monotone"
                      dataKey="viewers"
                      stroke="#42A5F5"
                      strokeWidth={3}
                      dot={{ r: 5, fill: "#42A5F5" }}
                      activeDot={{ r: 8 }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>

          {/* Recent Applicants */}
          <div className="bg-white shadow rounded-lg p-6">
            <h3 className="text-lg font-semibold mb-4">Recent Applicants</h3>
            <div className="divide-y divide-gray-400">
              {applicants.map((applicant, i) => (
                <div
                  key={i}
                  className="flex flex-col sm:flex-row sm:items-center sm:justify-between py-4 px-2 hover:bg-gray-50 rounded-lg transition gap-4"
                >
                  <div className=" flex items-center gap-4  ">
                    <Image
                      src={applicant.image}
                      alt={applicant.name}
                      width={50}
                      height={50}
                      className="rounded-full border"
                    />
                    <div>
                      <h4 className="font-semibold text-base sm:text-[20px]">
                        {applicant.name}
                      </h4>
                      <p className="text-[10px] sm:text-[15px] text-gray-500">
                        {applicant.role}
                      </p>
                      <div className="flex items-center gap-2 text-[10px] sm:text-sm text-gray-600 mt-1">
                        <FaMapMarkerAlt className="text-[#42A5F5]" />
                        <span>{applicant.location}</span>
                        <span className="text-green-600 font-medium">
                          {applicant.rate}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex sm:flex-row flex-row sm:justify-end justify-center gap-3 text-[#42A5F5]">
                    <button className="p-2 hover:bg-blue-50 rounded-full">
                      <FaEye />
                    </button>
                    <button className="p-2 hover:bg-blue-50 rounded-full">
                      <FaEnvelope />
                    </button>
                    <button className="p-2 hover:bg-blue-50 rounded-full">
                      <FaTrash />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </main>
      </div>
      {/* <Footer /> */}
    </>
  );
};

export default Dashbord;
