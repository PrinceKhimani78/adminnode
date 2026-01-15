"use client";
import Sidebar from "../Common/Sidebar";
import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { IoChevronForward } from "react-icons/io5";
import { FiChevronRight } from "react-icons/fi";

const packages = [
  {
    id: 1,
    name: "Basic",
    srNumber: "#552030",
    transaction: "#HDAC-101512012",
    jobs: 20,
    used: 14,
    remain: 6,
    status: "Active",
    expired: "13/06/2023",
  },
  {
    id: 2,
    name: "Premium",
    srNumber: "#552045",
    transaction: "#ICIC-101512023",
    jobs: 35,
    used: 25,
    remain: 10,
    status: "Active",
    expired: "15/06/2023",
  },
  {
    id: 3,
    name: "Gold",
    srNumber: "#552050",
    transaction: "#AXY-101512050",
    jobs: 28,
    used: 24,
    remain: 4,
    status: "Expired",
    expired: "17/06/2023",
  },
  {
    id: 4,
    name: "Basic",
    srNumber: "#552055",
    transaction: "#SBI-101512056",
    jobs: 22,
    used: 14,
    remain: 8,
    status: "Active",
    expired: "25/06/2023",
  },
  {
    id: 5,
    name: "Gold",
    srNumber: "#552060",
    transaction: "#HDAC-1015123552",
    jobs: 18,
    used: 14,
    remain: 4,
    status: "Active",
    expired: "15/05/2023",
  },
  {
    id: 6,
    name: "Basic",
    srNumber: "#552075",
    transaction: "#HDAC-1015121503",
    jobs: 20,
    used: 14,
    remain: 6,
    status: "Expired",
    expired: "08/05/2023",
  },
];
const Packages = () => {
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const [showModal, setShowModal] = useState(false);
  return (
    <>
      <div className="pl-2 pr-4 sm:px-2 py-2 flex gap-3 sm:gap-4  relative">
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
                  Package !
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
                    <span className="text-gray-700 font-medium">Package</span>
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
          {/* package  */}
          <div className="border-b pb-4">
            <h1 className="text-xl font-semibold flex items-center gap-2">
              📦 Package
            </h1>
          </div>

          {/* Package List */}
          <div className="overflow-x-auto">
            <div className="min-w-full border border-gray-200 rounded-lg">
              {/* Header */}
              <div className="hidden sm:grid grid-cols-7 bg-gray-50 border-b border-gray-400 text-sm font-semibold text-gray-700">
                <div className="px-4 py-3">Package</div>
                <div className="px-4 py-3">Sr. Number</div>
                <div className="px-4 py-3">Transaction id</div>
                <div className="px-4 py-3">No. of Jobs</div>
                <div className="px-4 py-3">Used</div>
                <div className="px-4 py-3">Remain</div>
                <div className="px-4 py-3">Status</div>
              </div>

              {/* Rows */}
              {packages.map((pkg, i) => (
                <div
                  key={pkg.id}
                  className={`grid grid-cols-1 sm:grid-cols-7 text-sm ${
                    i % 2 === 0 ? "bg-white" : "bg-gray-50"
                  } border-b border-gray-400`}
                >
                  {/* Package + Expired together */}
                  <div className="px-4 py-3">
                    <p className="text-blue-600 font-medium">{pkg.name}</p>
                    <p className="text-gray-500 text-xs">{pkg.expired}</p>
                  </div>
                  <div className="px-4 py-3">{pkg.srNumber}</div>
                  <div className="px-4 py-3">{pkg.transaction}</div>
                  <div className="px-4 py-3">{pkg.jobs}</div>
                  <div className="px-4 py-3">{pkg.used}</div>
                  <div className="px-4 py-3">{pkg.remain}</div>
                  <div
                    className={`px-4 py-3 font-semibold ${
                      pkg.status === "Active"
                        ? "text-green-600"
                        : "text-red-500"
                    }`}
                  >
                    {pkg.status}
                  </div>
                </div>
              ))}
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

export default Packages;
