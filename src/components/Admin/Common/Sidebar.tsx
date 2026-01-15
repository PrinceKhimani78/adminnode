"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Tooltip } from "antd";
import {
  FaHome,
  FaBuilding,
  FaBriefcase,
  FaPlus,
  FaUsers,
  FaBox,
  FaBell,
  FaTrash,
} from "react-icons/fa";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";

export default function Sidebar({
  mobileOpen = false,
  setMobileOpen,
}: {
  mobileOpen?: boolean;
  setMobileOpen?: (open: boolean) => void;
}) {
  const pathname = usePathname();
  const [collapsed, setCollapsed] = useState(true);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const menuItems = [
    { icon: <FaHome />, label: "Admin Dashboard", href: "/admin/dashboard" },
    {
      icon: <FaUsers />,
      label: "Recruiters List",
      href: "/admin/recruiters-list",
    },
    {
      icon: <FaBuilding />,
      label: "Company Profile",
      href: "/admin/company-profile",
    },
    { icon: <FaBriefcase />, label: "Manage Jobs", href: "/admin/manage-jobs" },
    { icon: <FaPlus />, label: "Post New Job", href: "/admin/post-job" },
    {
      icon: <FaUsers />,
      label: "Candidates List",
      href: "/admin/candidates-list",
    },
    { icon: <FaBox />, label: "Packages", href: "/admin/packages" },
    { icon: <FaBell />, label: "Resume Alerts", href: "/admin/resume-alerts" },
    { icon: <FaTrash />, label: "Delete Profile", href: "#delete" },
  ];

  return (
    <>
      {/* ================= MOBILE SIDEBAR ================= */}
      <div className="md:hidden">
        {mobileOpen && (
          <div
            className="fixed inset-0 bg-black/40 z-30"
            onClick={() => setMobileOpen?.(false)}
          />
        )}

        <aside
          className={`fixed top-0 left-0 h-screen w-[92%] bg-[#FFFFF0] shadow-lg z-[9999]
          transform transition-transform duration-300
          ${mobileOpen ? "translate-x-0" : "-translate-x-full"}`}
        >
          <button
            onClick={() => setMobileOpen?.(false)}
            className="absolute top-4 right-4 text-gray-500"
          >
            ✕
          </button>

          <nav className="flex flex-col gap-6 mt-28 px-4">
            {menuItems.map((item, i) =>
              item.label === "Delete Profile" ? (
                <button
                  key={i}
                  onClick={() => {
                    setMobileOpen?.(false);
                    setShowDeleteModal(true);
                  }}
                  className="flex items-center gap-3 px-3 text-[#72B76A]"
                >
                  <div className="w-6 text-lg">{item.icon}</div>
                  <span className="text-sm font-medium">Delete Profile</span>
                </button>
              ) : (
                <Link
                  key={i}
                  href={item.href}
                  onClick={() => setMobileOpen?.(false)}
                  className="flex items-center gap-3 px-3 text-[#72B76A]"
                >
                  <div className="w-6 text-lg">{item.icon}</div>
                  <span className="text-sm font-medium">{item.label}</span>
                </Link>
              )
            )}
          </nav>
        </aside>
      </div>

      {/* ================= DESKTOP SIDEBAR ================= */}
      <div className="hidden md:block">
        <aside
          className={`sticky top-0 h-[91vh] flex flex-col
          bg-white shadow rounded-r-lg transition-all duration-300
          ${collapsed ? "w-16 items-center" : "w-52"}`}
        >
          {/* Toggle */}
          <div className={`py-5 ${collapsed ? "" : "ml-2"}`}>
            <button
              onClick={() => setCollapsed(!collapsed)}
              className="w-8 h-8 flex items-center justify-center rounded-full
              border border-[#72B76A] hover:bg-[#72B76A]/10"
            >
              {collapsed ? (
                <FiChevronRight className="text-[#72B76A]" />
              ) : (
                <FiChevronLeft className="text-[#72B76A]" />
              )}
            </button>
          </div>

          {/* Menu */}
          <nav className="flex-1 flex flex-col px-2 space-y-7 overflow-y-auto">
            {menuItems.map((item, i) => {
              const isActive = pathname === item.href;

              if (item.label === "Delete Profile") {
                return (
                  <Tooltip
                    key={i}
                    title="Delete Profile"
                    placement="right"
                    color="#72B76A"
                    open={collapsed ? undefined : false}
                  >
                    <button
                      onClick={() => setShowDeleteModal(true)}
                      className="flex items-center gap-2 rounded-md text-[#72B76A] hover:bg-[#72B76A] hover:text-white transition"
                    >
                      <div className="w-10 h-10 flex items-center justify-center text-xl">
                        {item.icon}
                      </div>
                      {!collapsed && (
                        <span className="text-sm font-medium">
                          Delete Profile
                        </span>
                      )}
                    </button>
                  </Tooltip>
                );
              }

              return (
                <Tooltip
                  key={i}
                  title={item.label}
                  placement="right"
                  color="#72B76A"
                  open={collapsed ? undefined : false}
                >
                  <Link
                    href={item.href}
                    className={`flex items-center gap-2 rounded-md
                    ${
                      isActive
                        ? "bg-[#72B76A] text-white"
                        : "text-[#72B76A] hover:bg-[#72B76A] hover:text-white"
                    }`}
                  >
                    <div className="w-10 h-10 flex items-center justify-center text-xl">
                      {item.icon}
                    </div>

                    {!collapsed && (
                      <span className="text-sm font-medium">{item.label}</span>
                    )}
                  </Link>
                </Tooltip>
              );
            })}
          </nav>
        </aside>
      </div>

      {/* ================= DELETE CONFIRM MODAL ================= */}
      {showDeleteModal && (
        <div className="fixed inset-0 z-[10000] flex items-center justify-center bg-black/60 px-3">
          {/* Modal */}
          <div
            className="
        bg-white w-full sm:max-w-md rounded-t-2xl sm:rounded-lg
        shadow-xl p-5 sm:p-6 animate-slideUp
      "
          >
            <h2 className="text-lg font-semibold mb-2">Delete Profile</h2>

            <p className="text-gray-600 text-sm sm:text-base mb-6">
              Are you sure you want to delete your profile? This action cannot
              be undone.
            </p>

            {/* Actions */}
            <div className="flex flex-col sm:flex-row gap-3 sm:justify-end">
              <button
                onClick={() => setShowDeleteModal(false)}
                className="
            w-full sm:w-auto px-4 py-2 rounded-md
            border border-gray-300 text-gray-700
            hover:bg-gray-100
          "
              >
                Cancel
              </button>

              <button
                onClick={async () => {
                  try {
                    // await fetch("/api/delete-profile", { method: "DELETE" });
                    setShowDeleteModal(false);
                    alert("Profile deleted");
                  } catch (err) {
                    console.error(err);
                  }
                }}
                className="
            w-full sm:w-auto px-4 py-2 rounded-md
            bg-red-600 text-white hover:bg-red-700
          "
              >
                Yes, Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
