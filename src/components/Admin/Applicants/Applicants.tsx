"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import Sidebar from "../Common/Sidebar";
import AdminHeader from "../Common/AdminHeader";
import { FaEye, FaCheck, FaTimes, FaClock, FaListAlt, FaDownload } from "react-icons/fa";
import { FiChevronRight, FiChevronLeft } from "react-icons/fi";
import { IoChevronForward } from "react-icons/io5";
import { useAuth } from "@/context/AuthContext";
import { useParams, useRouter } from "next/navigation";

const BACKEND = process.env.NEXT_PUBLIC_BACKEND_API_URL || "https://api.rojgariindia.com/api";

const Applicants = () => {
  const { id: jobId } = useParams();
  const { token, isAuthenticated } = useAuth();
  const router = useRouter();
  
  const [applicants, setApplicants] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [selectedAnswers, setSelectedAnswers] = useState<any>(null);

  useEffect(() => {
    if (isAuthenticated && token && jobId) {
      fetchApplicants();
    }
  }, [isAuthenticated, token, jobId]);

  const fetchApplicants = async () => {
    try {
      const res = await fetch(`${BACKEND}/applications/job/${jobId}/applicants`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await res.json();
      if (res.ok && data.success) {
        setApplicants(data.data);
      }
    } catch (err) {
      console.error("Failed to fetch applicants", err);
    } finally {
      setLoading(false);
    }
  };

  const updateStatus = async (appId: string, status: string) => {
    try {
      const res = await fetch(`${BACKEND}/applications/${appId}/status`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ status }),
      });
      if (res.ok) {
        setApplicants(prev => prev.map(a => a.id === appId ? { ...a, status } : a));
      }
    } catch (err) {
      console.error("Error updating status", err);
    }
  };

  const getStatusClasses = (status: string) => {
    switch (status) {
        case 'Shortlisted': return "px-2 py-0.5 rounded text-[10px] font-bold bg-green-100 text-green-700";
        case 'Interviewed': return "px-2 py-0.5 rounded text-[10px] font-bold bg-blue-100 text-blue-700";
        case 'Rejected': return "px-2 py-0.5 rounded text-[10px] font-bold bg-red-100 text-red-700";
        default: return "px-2 py-0.5 rounded text-[10px] font-bold bg-slate-100 text-slate-700";
    }
  };

  return (
    <>
      <div className="pl-0 pr-3 sm:pr-4 py-3 sm:py-4 flex gap-3 sm:gap-4 relative">
        <Sidebar mobileOpen={mobileOpen} setMobileOpen={setMobileOpen} />
        <main className="flex-1 px-5 py-5 min-w-0 bg-white shadow rounded-lg space-y-6 overflow-hidden">
          <AdminHeader />
          
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
                  Job Applicants
                </h1>
              </div>
            </div>
          </div>

          <div className="overflow-x-auto">
            {loading ? (
                <div className="py-20 text-center text-slate-400">Loading applicants...</div>
            ) : (
                <div className="min-w-full inline-block align-middle">
                    <table className="min-w-full divide-y divide-slate-100">
                        <thead className="bg-slate-50">
                            <tr>
                                <th className="px-4 py-3 text-left text-xs font-bold text-slate-500 uppercase tracking-wider">Candidate</th>
                                <th className="px-4 py-3 text-left text-xs font-bold text-slate-500 uppercase tracking-wider">Applied Date</th>
                                <th className="px-4 py-3 text-left text-xs font-bold text-slate-500 uppercase tracking-wider">Status</th>
                                <th className="px-4 py-3 text-center text-xs font-bold text-slate-500 uppercase tracking-wider">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100">
                            {applicants.map((app) => (
                                <tr key={app.id} className="hover:bg-slate-50 transition-colors">
                                    <td className="px-4 py-4 whitespace-nowrap">
                                        <div className="flex items-center gap-3">
                                            <div className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center text-slate-400 font-bold overflow-hidden border">
                                                {app.Candidate?.profile_photo ? (
                                                     <Image 
                                                        src={app.Candidate.profile_photo.startsWith('http') ? app.Candidate.profile_photo : `${BACKEND.replace('/api', '')}/uploads/${app.Candidate.profile_photo}`} 
                                                        alt={app.Candidate.full_name} 
                                                        width={40} 
                                                        height={40} 
                                                        className="object-cover h-full w-full" 
                                                      />
                                                ) : app.Candidate?.full_name?.charAt(0) || "U"}
                                            </div>
                                            <div>
                                                <p className="font-semibold text-slate-900 text-sm">{app.Candidate?.full_name}</p>
                                                <p className="text-[10px] text-slate-500">{app.Candidate?.city || "N/A"}, {app.Candidate?.state || "N/A"}</p>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-4 py-4 text-xs text-slate-500 whitespace-nowrap">
                                        {new Date(app.applied_at).toLocaleDateString()}
                                    </td>
                                    <td className="px-4 py-4 whitespace-nowrap">
                                        <span className={getStatusClasses(app.status)}>
                                            {app.status}
                                        </span>
                                    </td>
                                    <td className="px-4 py-4 whitespace-nowrap">
                                        <div className="flex items-center justify-center gap-2">
                                            {/* In Admin panel, link to candidate profile might differ, for now use current if possible */}
                                            {app.screening_answers && (
                                                <button onClick={() => setSelectedAnswers(typeof app.screening_answers === 'string' ? JSON.parse(app.screening_answers) : app.screening_answers)} className="p-1.5 text-purple-600 hover:bg-purple-50 rounded-lg transition" title="View Screening Answers">
                                                    <FaListAlt />
                                                </button>
                                            )}
                                            {app.resume && (
                                                <a 
                                                    href={`${BACKEND.replace('/api', '')}/uploads/resume/${app.candidate_id}/${app.resume}`} 
                                                    target="_blank" 
                                                    rel="noopener noreferrer" 
                                                    className="p-1.5 text-blue-600 hover:bg-blue-50 rounded-lg transition" 
                                                    title="Download Resume"
                                                >
                                                    <FaDownload />
                                                </a>
                                            )}
                                            
                                            <div className="flex border rounded-lg overflow-hidden bg-white">
                                                <button onClick={() => updateStatus(app.id, 'Shortlisted')} className="p-1.5 text-green-600 hover:bg-green-50 transition border-r" title="Shortlist">
                                                    <FaCheck size={12} />
                                                </button>
                                                <button onClick={() => updateStatus(app.id, 'Rejected')} className="p-1.5 text-red-600 hover:bg-red-50 transition" title="Reject">
                                                    <FaTimes size={12} />
                                                </button>
                                            </div>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                            {applicants.length === 0 && (
                                <tr>
                                    <td colSpan={4} className="px-4 py-10 text-center text-slate-400 text-sm italic">No applicants found for this job.</td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            )}
          </div>
        </main>
      </div>

      {selectedAnswers && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
          <div className="bg-white rounded-2xl w-full max-w-xl shadow-2xl overflow-hidden">
            <div className="flex justify-between items-center p-6 border-b border-gray-100">
              <h3 className="text-xl font-bold text-gray-900">Screening Answers</h3>
              <button onClick={() => setSelectedAnswers(null)} className="text-gray-400 hover:text-gray-700 transition">
                <FaTimes size={20} />
              </button>
            </div>
            <div className="p-6 max-h-[60vh] overflow-y-auto space-y-6">
              {Array.isArray(selectedAnswers) ? (
                selectedAnswers.map((item: any, index: number) => (
                  <div key={index} className="bg-gray-50 rounded-xl p-4 border border-gray-100">
                    <p className="font-semibold text-gray-900 text-sm mb-2">Q: {item.question}</p>
                    <p className="text-gray-700 text-sm italic">{item.answer}</p>
                  </div>
                ))
              ) : Object.keys(selectedAnswers || {}).length > 0 ? (
                Object.entries(selectedAnswers).map(([question, answer], index) => (
                  <div key={index} className="bg-gray-50 rounded-xl p-4 border border-gray-100">
                    <p className="font-semibold text-gray-900 text-sm mb-2">Q: {question}</p>
                    <p className="text-gray-700 text-sm italic">{String(answer)}</p>
                  </div>
                ))
              ) : (
                <p className="text-gray-500 text-center py-4">No answers provided.</p>
              )}
            </div>
            <div className="p-4 border-t border-gray-100 bg-gray-50 flex justify-end">
              <button onClick={() => setSelectedAnswers(null)} className="px-6 py-2 bg-white border border-gray-200 text-gray-700 font-semibold rounded-lg hover:bg-gray-50 transition">
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Applicants;
