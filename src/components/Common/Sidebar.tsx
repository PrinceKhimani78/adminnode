"use client";
import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Tooltip } from "antd";
import {
  FaUser,
  FaBriefcase,
  FaFileAlt,
  FaBookmark,
  FaBell,
  FaHome,
  FaCog,
  FaBuilding,
  FaPlus,
  FaUsers,
  FaBox,
  FaTrash,
} from "react-icons/fa";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";

type SidebarType = "candidate" | "recruiter" | "admin";

interface SidebarProps {
  type: SidebarType;
  onDeleteClick?: () => void;
  mobileOpen?: boolean;
  setMobileOpen?: (open: boolean) => void;
}

const Sidebar: React.FC<SidebarProps> = ({
  type,
  onDeleteClick,
  mobileOpen = false,
  setMobileOpen,
}) => {
  const pathname = usePathname();
  const [collapsed, setCollapsed] = useState(true);

  const menuItems =
    type === "candidate"
      ? [
          {
            icon: <FaHome />,
            label: "Dashboard",
            href: "/candidates/dashboard",
          },
          {
            icon: <FaUser />,
            label: "My Profile",
            href: "/candidates/profile",
          },
          {
            icon: <FaBriefcase />,
            label: "Applied Jobs",
            href: "/candidates/applied-jobs",
          },
          {
            icon: <FaFileAlt />,
            label: "My Resume",
            href: "/candidates/resume",
          },
          {
            icon: <FaBookmark />,
            label: "Saved Jobs",
            href: "/candidates/saved-jobs",
          },
          {
            icon: <FaBell />,
            label: "Job Alerts",
            href: "/candidates/job-alerts",
          },
          {
            icon: <FaCog />,
            label: "Change Password",
            href: "/candidates/change-password",
          },
        ]
      : type === "recruiter"
      ? [
          {
            icon: <FaHome />,
            label: "Recruiter Dashboard",
            href: "/recruiters/dashboard",
          },
          {
            icon: <FaBuilding />,
            label: "Company Profile",
            href: "/recruiters/company-profile",
          },
          {
            icon: <FaBriefcase />,
            label: "Manage Jobs",
            href: "/recruiters/manage-jobs",
          },
          {
            icon: <FaPlus />,
            label: "Post New Job",
            href: "/recruiters/post-job",
          },
          {
            icon: <FaUsers />,
            label: "Candidates List",
            href: "/recruiters/candidates-list",
          },
          { icon: <FaBox />, label: "Packages", href: "/recruiters/packages" },
          {
            icon: <FaBell />,
            label: "Resume Alerts!",
            href: "/recruiters/resume-alerts",
          },
          { icon: <FaTrash />, label: "Delete Profile", href: "#delete" },
        ]
      : [
          { icon: <FaUsers />, label: "Manage Users", href: "/admin/users" },
          { icon: <FaBriefcase />, label: "Manage Jobs", href: "/admin/jobs" },
          {
            icon: <FaFileAlt />,
            label: "Applications",
            href: "/admin/applications",
          },
          { icon: <FaCog />, label: "Settings", href: "/admin/settings" },
          { icon: <FaTrash />, label: "Reports", href: "/admin/reports" },
        ];
  return (
    <>
      {/* Mobile Sidebar Drawer */}
      <div className="md:hidden">
        {mobileOpen && (
          <div
            className="fixed inset-0 bg-black/40 z-30"
            onClick={() => setMobileOpen?.(false)}
          />
        )}

        <aside
          className={`fixed top-0 left-0 h-full w-[92%]  bg-[#FFFFF0] shadow-lg z-[9999] transform transition-transform duration-300 ${
            mobileOpen ? "translate-x-0" : "-translate-x-full"
          }`}
        >
          <button
            onClick={() => setMobileOpen?.(false)}
            className="absolute top-4 right-4 text-[gray] "
          >
            ✕
          </button>

          <nav className="flex flex-col gap-6 mt-28 px-4">
            {menuItems.map((item, i) => (
              <Link
                key={i}
                href={item.href}
                onClick={() => setMobileOpen?.(false)} // auto close on click
                className="flex items-center gap-3 px-3 text-[#00C9FF] hover:text-sky-500"
              >
                <div className="w-6 flex justify-center text-lg">
                  {item.icon}
                </div>
                <span className="text-sm font-medium">{item.label}</span>
              </Link>
            ))}
          </nav>
        </aside>
      </div>

      {/* Tablet/Desktop Sidebar */}

      <div className="hidden md:block">
        <aside
          className={`sticky top-24 h-[66vh] flex flex-col justify-evenly
    bg-white shadow rounded-r-lg shrink-0 transition-all duration-300  
    ${collapsed ? "w-16 items-center" : "w-52"}`}
        >
          {/* Toggle button */}
          <div className={`flex flex-start py-5 ${collapsed ? "" : "ml-2"}`}>
            <button
              onClick={() => setCollapsed(!collapsed)}
              className="w-8 h-8 flex items-center justify-center rounded-full border border-[#00C9FF] bg-white hover:bg-[#00C9FF]/10 transition"
            >
              {collapsed ? (
                <FiChevronRight size={20} className="text-[#00C9FF]" />
              ) : (
                <FiChevronLeft size={20} className="text-[#00C9FF]" />
              )}
            </button>
          </div>

          {/* Menu items */}

          <nav className="flex-1 flex flex-col items-start px-2 space-y-3">
            {menuItems.map((item, i) => {
              const isActive = pathname === item.href;

              return (
                <Tooltip
                  key={i}
                  title={item.label}
                  placement="right"
                  color="#00C9FF"
                  open={collapsed ? undefined : false}
                >
                  <Link
                    href={item.href}
                    className={`relative flex items-center w-full gap-2 rounded-md transition-colors
            ${
              isActive
                ? "bg-[#00C9FF] text-white"
                : "text-[#00C9FF] hover:bg-[#00C9FF] hover:text-white"
            }`}
                  >
                    <div className="flex items-center  justify-center w-10 h-10 rounded-md text-lg">
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
    </>
  );
};

export default Sidebar;
