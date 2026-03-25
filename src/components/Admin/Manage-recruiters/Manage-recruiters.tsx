"use client";
import Sidebar from "@/components/Admin/Common/Sidebar";
import AdminHeader from "../Common/AdminHeader";
import React, { useState, useEffect } from "react";
import { FaCheck, FaTimes, FaUserTie, FaBuilding, FaEnvelope, FaPhone } from "react-icons/fa";
import { IoChevronForward } from "react-icons/io5";

interface Recruiter {
    id: string;
    full_name: string;
    email: string;
    company_name: string;
    mobile_number: string;
    status: string;
    pending_industries: string[];
    created_at: string;
}

const ManageRecruiters = () => {
    const [mobileOpen, setMobileOpen] = useState(false);
    const [recruiters, setRecruiters] = useState<Recruiter[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [actionLoading, setActionLoading] = useState<string | null>(null);

    const fetchPendingRecruiters = async () => {
        setLoading(true);
        try {
            const token = localStorage.getItem("admin_token");
            const response = await fetch("/api/recruiter/pending", {
                headers: {
                    "Authorization": `Bearer ${token}`,
                },
            });
            const result = await response.json();
            if (response.ok) {
                setRecruiters(result.data);
            } else {
                setError(result.message || "Failed to fetch recruiters");
            }
        } catch (err) {
            setError("Something went wrong while fetching recruiters");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchPendingRecruiters();
    }, []);

    const handleAction = async (id: string, action: 'approve' | 'reject') => {
        setActionLoading(id);
        try {
            const token = localStorage.getItem("admin_token");
            const response = await fetch(`/api/recruiter/${action}/${id}`, {
                method: "POST",
                headers: {
                    "Authorization": `Bearer ${token}`,
                },
            });

            if (response.ok) {
                setRecruiters(recruiters.filter(r => r.id !== id));
            } else {
                const result = await response.json();
                alert(result.message || `Failed to ${action} recruiter`);
            }
        } catch (err) {
            alert(`Something went wrong during ${action}`);
        } finally {
            setActionLoading(null);
        }
    };

    return (
        <div className="pl-2 pr-4 sm:px-2 py-2 flex gap-3 sm:gap-4 my-10 relative">
            <Sidebar mobileOpen={mobileOpen} setMobileOpen={setMobileOpen} />
            <main className="flex-1 px-5 py-5 min-w-0 bg-white shadow rounded-lg space-y-4">
                <AdminHeader />
                <div className="border-b pb-4">
                    <div className="flex items-center gap-5">
                        <IoChevronForward
                            onClick={() => setMobileOpen(true)}
                            className="text-[white] text-2xl cursor-pointer md:hidden bg-black rounded-full p-1"
                        />
                        <h1 className="fontAL font-semibold capitalize text-xl md:text-2xl lg:text-3xl">
                            Recruiter Management
                        </h1>
                    </div>
                    <p className="text-gray-500 text-sm mt-1">Approve or reject new recruiter signups</p>
                </div>

                {loading ? (
                    <div className="flex justify-center py-10">
                        <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-[#72B76A]"></div>
                    </div>
                ) : error ? (
                    <div className="bg-red-50 text-red-600 p-4 rounded-lg">{error}</div>
                ) : recruiters.length === 0 ? (
                    <div className="text-center py-10 text-gray-500">No pending recruiter approvals found.</div>
                ) : (
                    <div className="grid grid-cols-1 gap-6">
                        {recruiters.map((recruiter) => (
                            <div key={recruiter.id} className="bg-gray-50 p-6 rounded-xl border border-gray-200 shadow-sm hover:shadow-md transition">
                                <div className="flex flex-col md:flex-row justify-between gap-4">
                                    <div className="space-y-3">
                                        <div className="flex items-center gap-3">
                                            <div className="bg-[#72B76A]/10 p-3 rounded-full text-[#72B76A]">
                                                <FaUserTie size={24} />
                                            </div>
                                            <div>
                                                <h3 className="text-lg font-bold text-gray-900">{recruiter.full_name}</h3>
                                                <p className="text-sm text-gray-500">Joined on {new Date(recruiter.created_at).toLocaleDateString()}</p>
                                            </div>
                                        </div>

                                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 ml-2">
                                            <div className="flex items-center gap-2 text-gray-700">
                                                <FaBuilding className="text-gray-400" />
                                                <span className="font-medium">{recruiter.company_name}</span>
                                            </div>
                                            <div className="flex items-center gap-2 text-gray-700">
                                                <FaEnvelope className="text-gray-400" />
                                                <span>{recruiter.email}</span>
                                            </div>
                                            <div className="flex items-center gap-2 text-gray-700">
                                                <FaPhone className="text-gray-400" />
                                                <span>{recruiter.mobile_number}</span>
                                            </div>
                                            <div className="flex items-center gap-2 text-gray-700">
                                                <span className="text-gray-400 font-bold text-xs uppercase">Initial Industry:</span>
                                                <span className="bg-blue-100 text-blue-700 px-2 py-0.5 rounded text-xs font-semibold">
                                                  {recruiter.pending_industries?.[0] || 'N/A'}
                                                </span>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="flex md:flex-col justify-end gap-3 self-center md:self-start">
                                        <button
                                            onClick={() => handleAction(recruiter.id, 'approve')}
                                            disabled={actionLoading === recruiter.id}
                                            className="flex items-center justify-center gap-2 bg-[#72B76A] hover:bg-[#72B76A]/90 text-white px-6 py-2 rounded-lg font-medium transition disabled:bg-gray-400"
                                        >
                                            <FaCheck /> {actionLoading === recruiter.id ? "Processing..." : "Approve"}
                                        </button>
                                        <button
                                            onClick={() => handleAction(recruiter.id, 'reject')}
                                            disabled={actionLoading === recruiter.id}
                                            className="flex items-center justify-center gap-2 bg-red-500 hover:bg-red-600 text-white px-6 py-2 rounded-lg font-medium transition disabled:bg-gray-400"
                                        >
                                            <FaTimes /> Reject
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </main>
        </div>
    );
};

export default ManageRecruiters;
