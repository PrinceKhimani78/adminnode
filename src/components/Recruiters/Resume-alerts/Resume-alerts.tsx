"use client";
import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import Sidebar from "@/components/Common/Sidebar";
import { FaEye, FaTrash } from "react-icons/fa";
import { IoChevronForward } from "react-icons/io5";
import { FiChevronRight } from "react-icons/fi";

const alertsData = [
  {
    jobs: 5,
    title: "Web Developer",
    description: "A strategic approach to website design and development.",
    times: "Weekly",
  },
  {
    jobs: 3,
    title: "SEO Experts",
    description: "Providing the best SEO practices.",
    times: "Hourly",
  },
  {
    jobs: 5,
    title: "Web Developer",
    description:
      "As promised, we’re the most professional website designing company.",
    times: "Weekly",
  },
  {
    jobs: 5,
    title: "Web Designer",
    description: "Custom web design solutions websites with personality.",
    times: "Weekly",
  },
  {
    jobs: 5,
    title: "Web Developer",
    description: "A strategic approach to website design and development.",
    times: "Weekly",
  },
];

const Resumealerts = () => {
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const [showModal, setShowModal] = useState(false);
  return (
    <>
      <div className="pl-2 pr-4 sm:px-2 py-2 flex gap-3 sm:gap-4 my-30 relative">
        {/* sidebar */}
        <Sidebar
          type="recruiter"
          onDeleteClick={() => setShowModal(true)}
          mobileOpen={mobileOpen}
          setMobileOpen={setMobileOpen}
        />
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
                  Resume Alerts
                </h1>
              </div>
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
                      Resume-alerts
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

          {/* Alerts Table */}
          <div className="overflow-x-auto rounded-lg border border-gray-200">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">
                    Number Jobs
                  </th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">
                    Title
                  </th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">
                    Jobs Description
                  </th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">
                    Times
                  </th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 text-sm text-gray-700">
                {alertsData.map((alert, i) => (
                  <tr
                    key={i}
                    className={i % 2 === 0 ? "bg-gray-50" : "bg-white"}
                  >
                    <td className="px-6 py-4">{alert.jobs}</td>
                    <td className="px-6 py-4 font-medium">{alert.title}</td>
                    <td className="px-6 py-4">{alert.description}</td>
                    <td className="px-6 py-4">{alert.times}</td>
                    <td className="px-6 py-4 flex gap-3">
                      <button className="p-2 rounded-full bg-blue-50 text-[#00C9FF] hover:bg-blue-100">
                        <FaEye />
                      </button>
                      <button className="p-2 rounded-full bg-blue-50 text-[#00C9FF] hover:bg-red-100">
                        <FaTrash />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
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
    </>
  );
};

export default Resumealerts;
