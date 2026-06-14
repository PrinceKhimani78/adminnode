"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  FaBriefcase,
  FaFileAlt,
  FaBell,
  FaEnvelope,
  FaMapMarkerAlt,
  FaTrash,
  FaEye,
  FaUsers,
  FaUserTie,
} from "react-icons/fa";
import Sidebar from "../Common/Sidebar";
import AdminHeader from "../Common/AdminHeader";
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

import { FiChevronRight } from "react-icons/fi";
import { IoChevronForward } from "react-icons/io5";

interface Candidate {
  id: string;
  full_name: string;
  surname: string;
  email: string;
  mobile_number: string;
  district: string;
  city: string;
  village: string;
  total_experience_years: number;
  expected_salary_min: number;
  expected_salary_max: number;
  profile_photo?: string;
  created_at: string;
  status: string;
  position?: string;
  job_category?: string;
}

interface DashboardStats {
  totalJobs: number;
  totalCandidates: number;
  totalRecruiters: number;
  pendingRecruiters: number;
}

const Dashboard = () => {
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const [stats, setStats] = useState<DashboardStats>({
    totalJobs: 0,
    totalCandidates: 0,
    totalRecruiters: 0,
    pendingRecruiters: 0,
  });
  const [recentCandidates, setRecentCandidates] = useState<Candidate[]>([]);
  const [loading, setLoading] = useState(true);

  // Generate profile views from candidate registration data
  const [profileViewsData, setProfileViewsData] = useState<{ month: string; registrations: number }[]>([]);

  useEffect(() => {
    const fetchDashboardData = async () => {
      setLoading(true);
      try {
        const token = localStorage.getItem("admin_token");
        const headers = { "Authorization": `Bearer ${token}` };

        // Fetch candidates
        const candidatesRes = await fetch("/api/candidate-profile?limit=200", { headers });
        const candidatesData = await candidatesRes.json();

        let allCandidates: Candidate[] = [];
        if (candidatesData.success && candidatesData.data?.profiles) {
          allCandidates = candidatesData.data.profiles;
        }

        // Fetch jobs
        let totalJobs = 0;
        try {
          const jobsRes = await fetch("/api/jobs?limit=1", { headers });
          const jobsData = await jobsRes.json();
          if (jobsData.success) {
            totalJobs = jobsData.count || jobsData.data?.length || 0;
          }
        } catch { totalJobs = 0; }

        // Fetch recruiters (pending)
        let totalRecruiters = 0;
        let pendingRecruiters = 0;
        try {
          const pendingRes = await fetch("/api/recruiter/pending", { headers });
          const pendingData = await pendingRes.json();
          if (pendingData.success) {
            pendingRecruiters = pendingData.data?.length || 0;
          }
        } catch { /* ignore */ }

        // Set stats
        setStats({
          totalJobs,
          totalCandidates: allCandidates.length,
          totalRecruiters,
          pendingRecruiters,
        });

        // Recent candidates (last 6, sorted by created_at desc)
        const sorted = [...allCandidates].sort((a, b) =>
          new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
        );
        setRecentCandidates(sorted.slice(0, 6));

        // Build monthly registration chart from real data
        const monthCounts: Record<string, number> = {};
        const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

        // Last 6 months
        const now = new Date();
        for (let i = 5; i >= 0; i--) {
          const d = new Date(now.getFullYear(), now.getMonth() - i, 1);
          const key = `${d.getFullYear()}-${d.getMonth()}`;
          monthCounts[key] = 0;
        }

        allCandidates.forEach(c => {
          const d = new Date(c.created_at);
          const key = `${d.getFullYear()}-${d.getMonth()}`;
          if (key in monthCounts) {
            monthCounts[key]++;
          }
        });

        const chartData = Object.entries(monthCounts).map(([key, count]) => {
          const [year, month] = key.split('-').map(Number);
          return {
            month: `${monthNames[month]} ${year}`,
            registrations: count,
          };
        });

        setProfileViewsData(chartData);

      } catch (err) {
        console.error("Failed to fetch dashboard data", err);
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  const formatDate = (dateStr: string) => {
    const d = new Date(dateStr);
    return d.toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' });
  };

  return (
    <>
      <div className="pl-0 pr-3 sm:pr-4 py-3 sm:py-4 flex gap-3 sm:gap-4 relative">
        {/* Sidebar */}
        <Sidebar mobileOpen={mobileOpen} setMobileOpen={setMobileOpen} />
        <main className="flex-1 px-5 py-5 min-w-0 bg-white shadow rounded-lg space-y-4">
          <AdminHeader />
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
                  Admin Dashboard
                </h1>
              </div>

              
              
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                title: "Posted Jobs",
                value: loading ? "..." : stats.totalJobs,
                icon: <FaBriefcase />,
                color: "bg-[#FFCC23]",
                href: "/admin/manage-jobs",
              },
              {
                title: "Total Candidates",
                value: loading ? "..." : stats.totalCandidates,
                icon: <FaUsers />,
                color: "bg-[#72B76A]",
                href: "/admin/candidates-list",
              },
              {
                title: "Pending Recruiters",
                value: loading ? "..." : stats.pendingRecruiters,
                icon: <FaUserTie />,
                color: "bg-[#AE70BB]",
                href: "/admin/manage-recruiters",
              },
              {
                title: "Recent Registrations",
                value: loading ? "..." : recentCandidates.length,
                icon: <FaBell />,
                color: "bg-[#00C9FF]",
                href: "/admin/candidates-list",
              },
            ].map((card, i) => (
              <Link
                key={i}
                href={card.href}
                className={`${card.color} text-white p-6 rounded-lg shadow flex justify-between items-center hover:opacity-90 hover:scale-[1.02] transition-all cursor-pointer`}
              >
                <div className="flex flex-col gap-2">
                  <div className="text-3xl text-white">{card.icon}</div>
                  <p className="text-sm">{card.title}</p>
                </div>
                <p className="text-3xl font-bold">{card.value}</p>
              </Link>
            ))}
          </div>

          {/* Candidate Registrations Chart */}
          <div className="grid">
            <div className="bg-white shadow rounded-lg p-6">
              <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                <FaFileAlt /> Candidate Registrations (Last 6 Months)
              </h3>
              <div className="h-72 w-full">
                {loading ? (
                  <div className="flex items-center justify-center h-full">
                    <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-[#72B76A]"></div>
                  </div>
                ) : (
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={profileViewsData}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                      <XAxis dataKey="month" stroke="#6b7280" />
                      <YAxis stroke="#6b7280" />
                      <Tooltip />
                      <Legend />
                      <Line
                        type="monotone"
                        dataKey="registrations"
                        stroke="#72B76A"
                        strokeWidth={3}
                        dot={{ r: 5, fill: "#72B76A" }}
                        activeDot={{ r: 8 }}
                      />
                    </LineChart>
                  </ResponsiveContainer>
                )}
              </div>
            </div>
          </div>

          {/* Recent Candidates */}
          <div className="bg-white shadow rounded-lg p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold flex items-center gap-2">
                <FaUsers className="text-[#72B76A]" /> Recent Candidates
              </h3>
              <Link href="/admin/candidates-list" className="text-sm text-[#72B76A] hover:underline font-medium">
                View All →
              </Link>
            </div>

            {loading ? (
              <div className="flex justify-center py-10">
                <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-[#72B76A]"></div>
              </div>
            ) : recentCandidates.length === 0 ? (
              <p className="text-gray-500 text-center py-6">No candidates registered yet.</p>
            ) : (
              <div className="divide-y divide-gray-200">
                {recentCandidates.map((c) => (
                  <div
                    key={c.id}
                    className="flex flex-col sm:flex-row sm:items-center sm:justify-between py-4 px-2 hover:bg-gray-50 rounded-lg transition gap-4"
                  >
                    <div className="flex items-center gap-4">
                      <div className="relative w-[50px] h-[50px] flex-shrink-0">
                        {c.profile_photo ? (
                          <img
                            src={`/api/candidate-profile/${c.id}/download/photo?size=thumbnail`}
                            alt={c.full_name}
                            className="rounded-full border object-cover w-[50px] h-[50px]"
                            onError={(e) => {
                              (e.target as HTMLImageElement).style.display = 'none';
                              (e.target as HTMLImageElement).nextElementSibling?.classList.remove('hidden');
                            }}
                          />
                        ) : null}
                        <div className={`w-[50px] h-[50px] rounded-full bg-[#72B76A]/10 flex items-center justify-center text-lg font-bold text-[#72B76A] ${c.profile_photo ? 'hidden absolute inset-0' : ''}`}>
                          {c.full_name?.charAt(0) || 'U'}
                        </div>
                      </div>
                      <div>
                        <h4 className="font-semibold text-sm sm:text-base">
                          {c.full_name} {c.surname}
                        </h4>
                        <p className="text-xs text-gray-500">
                          {c.job_category && c.job_category !== 'Other' ? c.job_category : c.position || 'Job Seeker'}
                        </p>
                        <div className="flex items-center gap-2 text-xs text-gray-500 mt-0.5">
                          <FaMapMarkerAlt className="text-[#42A5F5] text-[10px]" />
                          <span>{c.district || c.city || 'N/A'}{c.village ? `, ${c.village}` : ''}</span>
                          <span className="text-[#72B76A] font-semibold">
                            {c.total_experience_years ? `${c.total_experience_years} Yrs Exp` : 'Fresher'}
                          </span>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center gap-3">
                      <span className="text-[10px] text-gray-400 font-medium whitespace-nowrap">
                        {formatDate(c.created_at)}
                      </span>
                      <Link
                        href="/admin/candidates-list"
                        className="p-1.5 rounded-full bg-blue-50 text-[#00c9ff] hover:bg-blue-100 transition text-sm"
                      >
                        <FaEye />
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </main>
      </div>
    </>
  );
};

export default Dashboard;
