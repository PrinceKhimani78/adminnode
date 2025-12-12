"use client";
import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import Footer from "@/components/Footer/Footer";
import {
  FaUsers,
  FaBriefcase,
  FaFileAlt,
  FaExclamationTriangle,
} from "react-icons/fa";
import {
  ResponsiveContainer,
  LineChart,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
} from "recharts";
import Sidebar from "@/components/Common/Sidebar";
import { IoChevronForward } from "react-icons/io5";
import { FiChevronRight } from "react-icons/fi";

const systemStats = [
  {
    title: "Total Users",
    value: 1245,
    icon: <FaUsers />,
    color: "bg-[#FFCC23]",
  },
  {
    title: "Total Jobs",
    value: 320,
    icon: <FaBriefcase />,
    color: "bg-[#72B76A]",
  },
  {
    title: "Applications",
    value: 7800,
    icon: <FaFileAlt />,
    color: "bg-[#AE70BB]",
  },
  {
    title: "Reports",
    value: 12,
    icon: <FaExclamationTriangle />,
    color: "bg-[#00C9FF]",
  },
];

const userGrowth = [
  { month: "Jan", users: 200 },
  { month: "Feb", users: 280 },
  { month: "Mar", users: 350 },
  { month: "Apr", users: 400 },
  { month: "May", users: 450 },
  { month: "Jun", users: 500 },
];

const recentUsers = [
  {
    name: "Alicia Keys",
    role: "Candidate",
    joined: "2 days ago",
    image: "/images/profile1webp",
  },
  {
    name: "Mark Wilson",
    role: "Recruiter",
    joined: "5 days ago",
    image: "/images/profile1webp",
  },
  {
    name: "Emma Stone",
    role: "Candidate",
    joined: "1 week ago",
    image: "/images/profile1webp",
  },
  {
    name: "Chris Evans",
    role: "Recruiter",
    joined: "2 weeks ago",
    image: "/images/profile1webp",
  },
];

const recentJobs = [
  { title: "Frontend Developer", company: "TechCorp", applicants: 25 },
  { title: "UI/UX Designer", company: "DesignHub", applicants: 15 },
  { title: "Data Analyst", company: "Analytics Pro", applicants: 10 },
  { title: "Marketing Manager", company: "AdWorks", applicants: 30 },
];

const Dashboard = () => {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <>
      <div className="px-1 sm:px-4 py-2 flex gap-3 sm:gap-8 my-30 relative">
        {/* Sidebar */}
        <Sidebar
          type="admin"
          mobileOpen={mobileOpen}
          setMobileOpen={setMobileOpen}
        />

        {/* Main Content */}
        <main className="flex-1 px-5 py-5 min-w-0 bg-white shadow rounded-lg space-y-8">
          {/* Header + Breadcrumb */}
          <div className="border-b pb-4">
            <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-2">
              <div className="flex gap-5 items-center">
                <IoChevronForward
                  onClick={() => setMobileOpen(true)}
                  className="text-[white] text-2xl cursor-pointer md:hidden bg-black rounded-full p-1"
                />
                <h1 className="fontAL font-semibold capitalize text-xl md:text-2xl lg:text-3xl">
                  Admin Dashboard
                </h1>
              </div>
              <nav className="hidden sm:block text-sm text-gray-500 text-center sm:text-right">
                <ol className="flex items-center justify-center sm:justify-end gap-2 flex-wrap">
                  <li className="flex items-center gap-2">
                    <Link href="/" className="hover:text-gray-700 transition">
                      Home
                    </Link>
                    <FiChevronRight />
                  </li>
                  <li>
                    <span className="text-gray-700 font-medium">
                      Admin Dashboard
                    </span>
                  </li>
                </ol>
              </nav>
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {systemStats.map((stat, i) => (
              <div
                key={i}
                className={`${stat.color} text-white p-6 rounded-lg shadow flex justify-between items-center`}
              >
                <div className="flex flex-col gap-2">
                  <div className="text-3xl">{stat.icon}</div>
                  <p className="text-sm">{stat.title}</p>
                </div>
                <p className="text-3xl font-bold">{stat.value}</p>
              </div>
            ))}
          </div>

          {/* User Growth Chart */}
          <div className="bg-white shadow rounded-lg p-6">
            <h3 className="text-lg font-semibold mb-4">User Growth</h3>
            <div className="h-72 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={userGrowth}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                  <XAxis dataKey="month" stroke="#6b7280" />
                  <YAxis stroke="#6b7280" />
                  <Tooltip />
                  <Legend />
                  <Line
                    type="monotone"
                    dataKey="users"
                    stroke="#42A5F5"
                    strokeWidth={3}
                    dot={{ r: 5, fill: "#42A5F5" }}
                    activeDot={{ r: 8 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Recent Users */}
          <div className="bg-white shadow rounded-lg p-6">
            <h3 className="text-lg font-semibold mb-4">Recent Users</h3>
            <div className="divide-y divide-gray-200">
              {recentUsers.map((user, i) => (
                <div key={i} className="flex items-center justify-between py-3">
                  <div className="flex items-center gap-4">
                    <Image
                      src={user.image}
                      alt={user.name}
                      width={50}
                      height={50}
                      className="rounded-full"
                    />
                    <div>
                      <h4 className="font-semibold">{user.name}</h4>
                      <p className="text-gray-500 text-sm">{user.role}</p>
                    </div>
                  </div>
                  <p className="text-xs text-gray-400">{user.joined}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Recent Jobs */}
          <div className="bg-white shadow rounded-lg p-6">
            <h3 className="text-lg font-semibold mb-4">Recent Jobs</h3>
            <div className="divide-y divide-gray-200">
              {recentJobs.map((job, i) => (
                <div key={i} className="flex items-center justify-between py-3">
                  <div>
                    <h4 className="font-semibold">{job.title}</h4>
                    <p className="text-gray-500 text-sm">{job.company}</p>
                  </div>
                  <span className="text-sm text-blue-600 font-medium">
                    {job.applicants} applicants
                  </span>
                </div>
              ))}
            </div>
          </div>
        </main>
      </div>
      <Footer />
    </>
  );
};

export default Dashboard;
