"use client";
import Sidebar from "@/components/Admin/Common/Sidebar";
import AdminHeader from "../Common/AdminHeader";
import React, { useState, useEffect } from "react";
import { FaCheck, FaTimes, FaListAlt, FaBuilding, FaUserTie, FaCheckCircle, FaHourglassHalf, FaTimesCircle } from "react-icons/fa";
import { IoChevronForward } from "react-icons/io5";

interface RecruiterIndustryData {
    id: string;
    full_name: string;
    company_name: string;
    email: string;
    approved_industries: { id: number; name: string }[];
    pending_industries: string[];
    denied_industries: string[];
}

type TabType = "pending" | "all";

const IndustryRequests = () => {
    const [mobileOpen, setMobileOpen] = useState(false);
    const [tab, setTab] = useState<TabType>("pending");
    const [pendingRequests, setPendingRequests] = useState<RecruiterIndustryData[]>([]);
    const [allRecruiters, setAllRecruiters] = useState<RecruiterIndustryData[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [actionLoading, setActionLoading] = useState<string | null>(null);
    const [userRole, setUserRole] = useState<string>("");
    const [viewModal, setViewModal] = useState<{ isOpen: boolean; request: RecruiterIndustryData | null; industry: string | null }>({
        isOpen: false,
        request: null,
        industry: null
    });

    const fetchPendingRequests = async () => {
        try {
            const token = localStorage.getItem("admin_token");
            const response = await fetch("/api/recruiter/industry-requests", {
                headers: { "Authorization": `Bearer ${token}` },
            });
            const result = await response.json();
            if (response.ok) {
                setPendingRequests(result.data);
            }
        } catch (err) {
            console.error("Failed to fetch pending requests", err);
        }
    };

    const fetchAllRecruiters = async () => {
        try {
            const token = localStorage.getItem("admin_token");
            const response = await fetch("/api/recruiter/industries-list", {
                headers: { "Authorization": `Bearer ${token}` },
            });
            const result = await response.json();
            if (response.ok) {
                setAllRecruiters(result.data);
            }
        } catch (err) {
            console.error("Failed to fetch all recruiters", err);
        }
    };

    const fetchData = async () => {
        setLoading(true);
        setError("");
        await Promise.all([fetchPendingRequests(), fetchAllRecruiters()]);
        setLoading(false);
    };

    useEffect(() => {
        fetchData();
        const userStr = localStorage.getItem("admin_user");
        if (userStr) {
            try {
                const user = JSON.parse(userStr);
                setUserRole(user.role || "");
            } catch (e) {
                // ignore
            }
        }
    }, []);

    const handleDeleteRecruiter = async (recruiterId: string) => {
        if (!confirm("Are you sure you want to permanently delete this recruiter? This action cannot be undone.")) return;
        
        setActionLoading(`delete-${recruiterId}`);
        try {
            const token = localStorage.getItem("admin_token");
            const response = await fetch(`/api/recruiter/${recruiterId}`, {
                method: "DELETE",
                headers: {
                    "Authorization": `Bearer ${token}`,
                },
            });

            if (response.ok) {
                await fetchData();
            } else {
                const result = await response.json();
                alert(result.message || "Failed to delete recruiter");
            }
        } catch (err) {
            alert("Something went wrong during deletion");
        } finally {
            setActionLoading(null);
        }
    };

    const handleRemoveApprovedIndustry = async (recruiterId: string, industryName: string) => {
        if (!confirm(`Are you sure you want to remove "${industryName}" from approved industries?`)) return;
        
        setActionLoading(`remove-${recruiterId}-${industryName}`);
        try {
            const token = localStorage.getItem("admin_token");
            const response = await fetch(`/api/recruiter/remove-approved-industry`, {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`,
                },
                body: JSON.stringify({ recruiterId, industryName })
            });

            if (response.ok) {
                await fetchData();
            } else {
                const result = await response.json();
                alert(result.message || "Failed to remove industry");
            }
        } catch (err) {
            alert("Something went wrong during removal");
        } finally {
            setActionLoading(null);
        }
    };

    const handleApprove = async (recruiterId: string, industryName: string) => {
        const actionId = `${recruiterId}-${industryName}`;
        setActionLoading(actionId);
        try {
            const token = localStorage.getItem("admin_token");
            const response = await fetch("/api/recruiter/approve-industry", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`,
                },
                body: JSON.stringify({ recruiterId, industryName }),
            });

            if (response.ok) {
                await fetchData();
            } else {
                const result = await response.json();
                alert(result.message || "Failed to approve industry");
            }
        } catch (err) {
            alert("Something went wrong during approval");
        } finally {
            setActionLoading(null);
        }
    };

    const handleReject = async (recruiterId: string, industryName: string) => {
        const actionId = `${recruiterId}-${industryName}-reject`;
        setActionLoading(actionId);
        try {
            const token = localStorage.getItem("admin_token");
            const response = await fetch("/api/recruiter/reject-industry", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`,
                },
                body: JSON.stringify({ recruiterId, industryName }),
            });

            if (response.ok) {
                await fetchData();
            } else {
                const result = await response.json();
                alert(result.message || "Failed to reject industry");
            }
        } catch (err) {
            alert("Something went wrong during rejection");
        } finally {
            setActionLoading(null);
        }
    };

    const pendingCount = pendingRequests.reduce((sum, r) => sum + (r.pending_industries?.length || 0), 0);

    return (
        <div className="pl-0 pr-3 sm:pr-4 py-3 sm:py-4 flex gap-3 sm:gap-4 relative">
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
                            Industry Requests
                        </h1>
                    </div>
                    <p className="text-gray-500 text-sm mt-1">Approve industry addition requests from recruiters</p>
                </div>

                {/* Tabs */}
                <div className="flex gap-2 border-b">
                    <button
                        onClick={() => setTab("pending")}
                        className={`px-4 py-2.5 text-sm font-bold transition-all relative ${
                            tab === "pending"
                                ? "text-[#72B76A] border-b-2 border-[#72B76A]"
                                : "text-gray-500 hover:text-gray-700"
                        }`}
                    >
                        Pending Requests
                        {pendingCount > 0 && (
                            <span className="ml-2 bg-amber-500 text-white text-[10px] px-1.5 py-0.5 rounded-full font-bold">
                                {pendingCount}
                            </span>
                        )}
                    </button>
                    <button
                        onClick={() => setTab("all")}
                        className={`px-4 py-2.5 text-sm font-bold transition-all relative ${
                            tab === "all"
                                ? "text-[#72B76A] border-b-2 border-[#72B76A]"
                                : "text-gray-500 hover:text-gray-700"
                        }`}
                    >
                        All Recruiter Industries
                    </button>
                </div>

                {loading ? (
                    <div className="flex justify-center py-10">
                        <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-[#72B76A]"></div>
                    </div>
                ) : error ? (
                    <div className="bg-red-50 text-red-600 p-4 rounded-lg">{error}</div>
                ) : tab === "pending" ? (
                    /* ──────── PENDING TAB ──────── */
                    pendingRequests.length === 0 ? (
                        <div className="text-center py-10 text-gray-500">No pending industry addition requests.</div>
                    ) : (
                        <div className="overflow-x-auto">
                            <table className="w-full text-left border-collapse">
                                <thead>
                                    <tr className="bg-gray-100 text-gray-700 text-sm">
                                        <th className="p-4 border">Recruiter</th>
                                        <th className="p-4 border">Company</th>
                                        <th className="p-4 border">Requested Industries</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {pendingRequests.map((request) => (
                                        <tr key={request.id} className="border-b hover:bg-gray-50">
                                            <td className="p-4 align-top">
                                                <div className="flex items-center gap-2">
                                                    <FaUserTie className="text-gray-400" />
                                                    <span className="font-semibold">{request.full_name}</span>
                                                </div>
                                            </td>
                                            <td className="p-4 align-top">
                                                <div className="flex items-center gap-2">
                                                    <FaBuilding className="text-gray-400" />
                                                    <span>{request.company_name}</span>
                                                </div>
                                            </td>
                                            <td className="p-4">
                                                <div className="flex flex-wrap gap-4">
                                                    {(request.pending_industries || []).map((industry: string) => (
                                                        <div key={industry} className="flex flex-col gap-2 bg-gray-50 border border-gray-200 p-3 rounded-xl shadow-sm min-w-[200px]">
                                                            <div className="flex items-center justify-between mb-1">
                                                                <span className="text-sm font-bold text-gray-800">{industry}</span>
                                                                <span className="text-[10px] bg-amber-100 text-amber-700 px-2 py-0.5 rounded-full font-bold uppercase">Pending</span>
                                                            </div>
                                                            <div className="flex items-center gap-2 mt-1">
                                                                <button
                                                                    onClick={() => setViewModal({ isOpen: true, request, industry })}
                                                                    className="flex-1 text-[11px] bg-white border border-gray-300 text-gray-700 py-1.5 rounded-lg hover:bg-gray-50 transition font-bold"
                                                                >
                                                                    View
                                                                </button>
                                                                <button
                                                                    onClick={() => handleApprove(request.id, industry)}
                                                                    disabled={actionLoading === `${request.id}-${industry}`}
                                                                    className="flex-1 text-[11px] bg-green-600 text-white py-1.5 rounded-lg hover:bg-green-700 transition font-bold disabled:opacity-50"
                                                                >
                                                                    {actionLoading === `${request.id}-${industry}` ? "..." : "Admit"}
                                                                </button>
                                                                <button
                                                                    onClick={() => handleReject(request.id, industry)}
                                                                    disabled={actionLoading === `${request.id}-${industry}-reject`}
                                                                    className="flex-1 text-[11px] bg-red-600 text-white py-1.5 rounded-lg hover:bg-red-700 transition font-bold disabled:opacity-50"
                                                                >
                                                                    {actionLoading === `${request.id}-${industry}-reject` ? "..." : "Deny"}
                                                                </button>
                                                            </div>
                                                        </div>
                                                    ))}
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    )
                ) : (
                    /* ──────── ALL RECRUITERS TAB ──────── */
                    allRecruiters.length === 0 ? (
                        <div className="text-center py-10 text-gray-500">No recruiter industry data found.</div>
                    ) : (
                        <div className="space-y-6">
                            {allRecruiters.map((recruiter) => {
                                const hasAny = (recruiter.approved_industries?.length || 0) + (recruiter.pending_industries?.length || 0) + (recruiter.denied_industries?.length || 0) > 0;
                                if (!hasAny) return null;

                                return (
                                    <div key={recruiter.id} className="border border-gray-200 rounded-xl overflow-hidden">
                                        {/* Recruiter Header */}
                                        <div className="bg-gray-50 px-5 py-4 flex items-center justify-between border-b">
                                            <div className="flex items-center gap-4">
                                                <div className="w-10 h-10 bg-[#72B76A]/10 rounded-full flex items-center justify-center">
                                                    <FaUserTie className="text-[#72B76A]" />
                                                </div>
                                                <div>
                                                    <p className="font-bold text-gray-900">{recruiter.full_name}</p>
                                                    <p className="text-xs text-gray-500">{recruiter.company_name} · {recruiter.email}</p>
                                                </div>
                                            </div>
                                            {userRole === 'superadmin' && (
                                                <button
                                                    onClick={() => handleDeleteRecruiter(recruiter.id)}
                                                    disabled={actionLoading === `delete-${recruiter.id}`}
                                                    className="p-2 text-red-500 hover:bg-red-50 rounded-full transition-colors disabled:opacity-50"
                                                    title="Delete Recruiter"
                                                >
                                                    {actionLoading === `delete-${recruiter.id}` ? "..." : <FaTimesCircle />}
                                                </button>
                                            )}
                                        </div>

                                        <div className="p-5 space-y-4">
                                            {/* Approved */}
                                            {recruiter.approved_industries?.length > 0 && (
                                                <div>
                                                    <p className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-2 flex items-center gap-2">
                                                        <FaCheckCircle className="text-green-500" /> Approved
                                                    </p>
                                                    <div className="flex flex-wrap gap-2">
                                                        {recruiter.approved_industries.map(ind => (
                                                            <span key={ind.id} className="bg-green-50 text-green-700 border border-green-200 px-3 py-1 rounded-full text-xs font-semibold flex items-center gap-2">
                                                                {ind.name}
                                                                {userRole === 'superadmin' && (
                                                                    <button
                                                                        onClick={() => handleRemoveApprovedIndustry(recruiter.id, ind.name)}
                                                                        disabled={actionLoading === `remove-${recruiter.id}-${ind.name}`}
                                                                        className="hover:text-red-600 transition-colors disabled:opacity-50"
                                                                        title="Remove Approved Industry"
                                                                    >
                                                                        {actionLoading === `remove-${recruiter.id}-${ind.name}` ? "..." : <FaTimes />}
                                                                    </button>
                                                                )}
                                                            </span>
                                                        ))}
                                                    </div>
                                                </div>
                                            )}

                                            {/* Pending */}
                                            {recruiter.pending_industries?.length > 0 && (
                                                <div>
                                                    <p className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-2 flex items-center gap-2">
                                                        <FaHourglassHalf className="text-amber-500" /> Pending
                                                    </p>
                                                    <div className="flex flex-wrap gap-2">
                                                        {recruiter.pending_industries.map(name => (
                                                            <span key={name} className="bg-amber-50 text-amber-700 border border-amber-200 px-3 py-1 rounded-full text-xs font-semibold">
                                                                {name}
                                                            </span>
                                                        ))}
                                                    </div>
                                                </div>
                                            )}

                                            {/* Denied */}
                                            {recruiter.denied_industries?.length > 0 && (
                                                <div>
                                                    <p className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-2 flex items-center gap-2">
                                                        <FaTimesCircle className="text-red-500" /> Denied
                                                    </p>
                                                    <div className="flex flex-wrap gap-2">
                                                        {recruiter.denied_industries.map(name => (
                                                            <span key={name} className="bg-red-50 text-red-700 border border-red-200 px-3 py-1 rounded-full text-xs font-semibold">
                                                                {name}
                                                            </span>
                                                        ))}
                                                    </div>
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    )
                )}
            </main>

            {/* View Modal */}
            {viewModal.isOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
                    <div className="bg-white rounded-3xl shadow-2xl w-full max-w-lg overflow-hidden transform animate-in zoom-in-95 duration-200">
                        <div className="bg-[#72B76A] p-6 text-white flex justify-between items-center">
                            <div>
                                <h2 className="text-2xl font-bold uppercase tracking-tight">Request Details</h2>
                                <p className="text-sm opacity-90 font-medium">Industry addition review</p>
                            </div>
                            <button 
                                onClick={() => setViewModal({ isOpen: false, request: null, industry: null })}
                                className="p-2 hover:bg-white/20 rounded-full transition-colors"
                            >
                                <FaTimes className="text-xl" />
                            </button>
                        </div>
                        
                        <div className="p-8 space-y-8">
                            <div className="grid grid-cols-2 gap-8">
                                <div className="space-y-1">
                                    <p className="text-[10px] uppercase font-black text-gray-400 tracking-widest leading-none">Recruiter Name</p>
                                    <p className="text-lg font-bold text-gray-900 leading-tight">{viewModal.request?.full_name}</p>
                                </div>
                                <div className="space-y-1">
                                    <p className="text-[10px] uppercase font-black text-gray-400 tracking-widest leading-none">Company</p>
                                    <p className="text-lg font-bold text-gray-900 leading-tight">{viewModal.request?.company_name}</p>
                                </div>
                            </div>

                            <div className="p-6 bg-gray-50 rounded-2xl border border-gray-100 ring-1 ring-black/5">
                                <div className="flex items-center gap-3 mb-4">
                                    <div className="p-2 bg-green-100 rounded-lg">
                                        <FaListAlt className="text-green-600" />
                                    </div>
                                    <p className="text-[10px] uppercase font-black text-gray-500 tracking-widest">Requested Industry</p>
                                </div>
                                <p className="text-2xl font-black text-gray-900 tracking-tight">{viewModal.industry}</p>
                                <div className="mt-4 flex items-center gap-2 text-xs font-bold text-amber-600 bg-amber-50 px-3 py-1 rounded-full w-fit">
                                    <span className="relative flex h-2 w-2">
                                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75"></span>
                                        <span className="relative inline-flex rounded-full h-2 w-2 bg-amber-500"></span>
                                    </span>
                                    STATUS: PENDING APPROVAL
                                </div>
                            </div>

                            <div className="flex gap-3 pt-4">
                                <button
                                    onClick={() => {
                                        if (viewModal.request && viewModal.industry) {
                                            handleApprove(viewModal.request.id, viewModal.industry);
                                            setViewModal({ isOpen: false, request: null, industry: null });
                                        }
                                    }}
                                    className="flex-1 bg-green-600 text-white py-4 rounded-2xl font-black uppercase tracking-widest text-xs hover:bg-green-700 transition-all active:scale-95 shadow-lg shadow-green-200"
                                >
                                    Admit Industry
                                </button>
                                <button
                                    onClick={() => {
                                        if (viewModal.request && viewModal.industry) {
                                            handleReject(viewModal.request.id, viewModal.industry);
                                            setViewModal({ isOpen: false, request: null, industry: null });
                                        }
                                    }}
                                    className="flex-1 bg-red-600 text-white py-4 rounded-2xl font-black uppercase tracking-widest text-xs hover:bg-red-700 transition-all active:scale-95 shadow-lg shadow-red-200"
                                >
                                    Deny Request
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default IndustryRequests;
