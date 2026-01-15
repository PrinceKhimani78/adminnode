"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import Sidebar from "../Common/Sidebar";
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
    jobs: 3,
    title: "SEO Experts",
    description: "Providing the best SEO practices.",
    times: "Hourly",
  },
  {
    jobs: 5,
    title: "Web Designer",
    description: "Custom web design solutions websites with personality.",
    times: "Weekly",
  },
  {
    jobs: 7,
    title: "Web Developer",
    description: "Custom web design solutions websites with personality.",
    times: "Weekly",
  },
];

const Resumealerts = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [showModal, setShowModal] = useState(false);

  return (
    <div className="pl-2 pr-4 py-2 flex gap-3 sm:gap-4 min-w-0">
      {/* Sidebar */}
      <Sidebar mobileOpen={mobileOpen} setMobileOpen={setMobileOpen} />

      <main className="flex-1 px-4 sm:px-6 py-5 min-w-0 bg-white shadow rounded-lg space-y-8">
        {/* Title */}
        <div className="border-b pb-4">
          <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-2">
            <div className="flex items-center gap-4">
              <IoChevronForward
                onClick={() => setMobileOpen(true)}
                className="md:hidden bg-black text-white rounded-full p-1 text-2xl cursor-pointer"
              />
              <h1 className="text-xl sm:text-2xl lg:text-3xl font-semibold">
                Resume Alerts
              </h1>
            </div>

            <nav className="hidden sm:flex text-sm text-gray-500 gap-2">
              <Link href="/" className="hover:text-gray-700">
                Home
              </Link>
              <FiChevronRight />
              <span className="text-gray-700 font-medium">Resume Alerts</span>
            </nav>
          </div>
        </div>

        {/* Profile */}
        <div className="flex items-center gap-4">
          <Image
            src="/images/profile1.webp"
            alt="Profile"
            width={70}
            height={70}
            className="rounded-full border"
          />
          <div>
            <h2 className="font-bold">Randall Henderson</h2>
            <p className="text-gray-500 text-sm">IT Contractor</p>
          </div>
        </div>

        {/* ================= DESKTOP TABLE ================= */}
        <div className="hidden lg:block overflow-x-auto rounded-lg border">
          <table className="min-w-full text-sm">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left">Jobs</th>
                <th className="px-6 py-3 text-left">Title</th>
                <th className="px-6 py-3 text-left">Description</th>
                <th className="px-6 py-3 text-left">Frequency</th>
                <th className="px-6 py-3 text-left">Actions</th>
              </tr>
            </thead>
            <tbody>
              {alertsData.map((alert, i) => (
                <tr key={i} className="border-t">
                  <td className="px-6 py-4">{alert.jobs}</td>
                  <td className="px-6 py-4 font-medium">{alert.title}</td>
                  <td className="px-6 py-4">{alert.description}</td>
                  <td className="px-6 py-4">{alert.times}</td>
                  <td className="px-6 py-4 flex gap-3">
                    <button className="p-2 rounded-full hover:bg-gray-100">
                      <FaEye />
                    </button>
                    <button
                      onClick={() => setShowModal(true)}
                      className="p-2 rounded-full hover:bg-red-100 text-red-600"
                    >
                      <FaTrash />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* ================= MOBILE + TABLET CARDS ================= */}
        <div className="lg:hidden space-y-4">
          {alertsData.map((alert, i) => (
            <div key={i} className="border rounded-lg p-4 shadow-sm space-y-2">
              <div className="flex justify-between items-center">
                <h3 className="font-semibold">{alert.title}</h3>
                <span className="text-sm text-gray-500">{alert.times}</span>
              </div>

              <p className="text-sm text-gray-600">{alert.description}</p>

              <p className="text-sm">
                <span className="font-semibold">Jobs:</span> {alert.jobs}
              </p>

              <div className="flex gap-4 pt-2">
                <button className="p-2 rounded-full bg-gray-100">
                  <FaEye />
                </button>
                <button
                  onClick={() => setShowModal(true)}
                  className="p-2 rounded-full bg-red-100 text-red-600"
                >
                  <FaTrash />
                </button>
              </div>
            </div>
          ))}
        </div>
      </main>

      {/* ================= DELETE MODAL ================= */}
      {showModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-[90%] max-w-md">
            <h3 className="text-lg font-semibold mb-4">Delete Alert</h3>
            <p className="text-gray-600 mb-6">
              Are you sure you want to delete this alert?
            </p>

            <div className="flex justify-end gap-3">
              <button
                onClick={() => setShowModal(false)}
                className="px-4 py-2 border rounded"
              >
                Cancel
              </button>
              <button
                onClick={() => setShowModal(false)}
                className="px-4 py-2 bg-red-600 text-white rounded"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Resumealerts;
