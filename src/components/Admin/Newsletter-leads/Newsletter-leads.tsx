"use client";
import React, { useEffect, useState } from "react";
import Sidebar from "../Common/Sidebar";
import AdminHeader from "../Common/AdminHeader";
import Pagination from "../Common/Pagination";
import { FaTrash } from "react-icons/fa";
import { IoChevronForward } from "react-icons/io5";

interface NewsletterLead {
  id: number;
  email: string;
  status: string;
  created_at: string;
}

const NewsletterLeads = () => {
  const [leads, setLeads] = useState<NewsletterLead[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [mobileOpen, setMobileOpen] = useState(false);
  const [entries, setEntries] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");
  const [leadToDelete, setLeadToDelete] = useState<NewsletterLead | null>(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [userRole, setUserRole] = useState<string>("");

  useEffect(() => {
    if (typeof window !== "undefined") {
      const userStr = localStorage.getItem("admin_user");
      if (userStr) {
        const user = JSON.parse(userStr);
        setUserRole(user.role || "");
      }
    }
  }, []);

  const fetchLeads = async () => {
    try {
      const token = localStorage.getItem("admin_token");
      // Use local backend for dev, or api.rojgariindia.com in production
      // Since it's admin, we can rely on standard paths. Using relative path if reverse proxied, or fully qualified.
      // We assume Nextjs proxy or direct API calls.
      const baseUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";
      const response = await fetch(`${baseUrl}/newsletter`, {
        headers: {
          "Authorization": `Bearer ${token}`
        }
      });
      const data = await response.json();
      if (data.success && data.data) {
        setLeads(data.data);
      } else {
        console.error("Failed to fetch leads:", data);
        setError("Failed to fetch leads.");
      }
    } catch (err) {
      console.error("Error fetching newsletter leads:", err);
      setError("Failed to load newsletter leads.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLeads();
  }, []);

  const handleDeleteLead = async () => {
    if (!leadToDelete) return;

    try {
      const token = localStorage.getItem("admin_token");
      const baseUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";
      const response = await fetch(`${baseUrl}/newsletter/${leadToDelete.id}`, {
        method: "DELETE",
        headers: {
          "Authorization": `Bearer ${token}`
        }
      });
      const data = await response.json();
      if (data.success) {
        setLeads(leads.filter(l => l.id !== leadToDelete.id));
        setShowDeleteModal(false);
        setLeadToDelete(null);
      } else {
        alert(data.message || "Failed to delete lead");
      }
    } catch (err) {
      console.error("Error deleting lead:", err);
      alert("Error deleting lead");
    }
  };

  const filteredLeads = leads.filter(l => {
    const searchString = `${l.email} ${l.status}`.toLowerCase();
    const matchesSearch = searchQuery.trim() === '' || searchString.includes(searchQuery.toLowerCase());
    return matchesSearch;
  });

  const totalPages = Math.ceil(filteredLeads.length / entries);
  const startIndex = (currentPage - 1) * entries;
  const endIndex = startIndex + entries;
  const currentLeads = filteredLeads.slice(startIndex, endIndex);

  return (
    <>
      <div className="pl-0 pr-3 sm:pr-4 py-3 sm:py-4 flex gap-3 sm:gap-4 relative">
        <div className="print:hidden">
          <Sidebar mobileOpen={mobileOpen} setMobileOpen={setMobileOpen} />
        </div>
        <main className="flex-1 px-5 py-5 min-w-0 bg-white shadow rounded-lg space-y-4">
          <AdminHeader />
          <div className="border-b pb-4">
            <div className="flex gap-5 items-center">
              <IoChevronForward
                onClick={() => setMobileOpen(true)}
                className="text-[white] text-2xl cursor-pointer md:hidden bg-black rounded-full p-1"
              />
              <h1 className="fontAL font-semibold capitalize text-xl md:text-2xl lg:text-3xl tracking-wide">
                Newsletter Leads
              </h1>
            </div>
          </div>

          <div className="bg-white shadow rounded-lg p-5">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-4 gap-3">
              <div className="flex items-center gap-2">
                <label htmlFor="entries" className="text-sm text-gray-600">Show</label>
                <select
                  id="entries"
                  value={entries}
                  onChange={(e) => { setEntries(Number(e.target.value)); setCurrentPage(1); }}
                  className="border rounded px-2 py-1 text-sm focus:ring-2 focus:ring-[#72B76A]"
                >
                  <option value={10}>10</option>
                  <option value={20}>20</option>
                  <option value={50}>50</option>
                </select>
                <span className="text-sm text-gray-600">entries</span>
              </div>
              <div>
                <input
                  type="text"
                  placeholder="Search emails..."
                  value={searchQuery}
                  onChange={(e) => { setSearchQuery(e.target.value); setCurrentPage(1); }}
                  className="w-full p-2 rounded bg-white text-sm placeholder-slate-400 ring-1 ring-gray-400 transition focus:outline-none focus:ring-2 focus:ring-[#72B76A]"
                />
              </div>
            </div>

            <div className="hidden sm:grid font-semibold text-sm text-gray-600 border-b py-2" style={{ gridTemplateColumns: '50px 2fr 1fr 1fr 80px' }}>
              <div className="px-3">ID</div>
              <div className="px-3">Email Address</div>
              <div className="px-3">Subscribed At</div>
              <div className="px-3">Status</div>
              <div className="px-2 text-center">Actions</div>
            </div>

            {loading ? <div className="p-10 text-center">Loading leads...</div> : 
             currentLeads.length === 0 ? <div className="p-10 text-center">No leads found.</div> :
             currentLeads.map((l, i) => (
              <div key={l.id} className={`border-b ${i % 2 === 0 ? "bg-white" : "bg-gray-50"}`}>
                <div className="hidden sm:grid items-center text-sm" style={{ gridTemplateColumns: '50px 2fr 1fr 1fr 80px' }}>
                  <div className="px-3 py-3">{l.id}</div>
                  <div className="px-3 py-3 font-medium text-slate-900">{l.email}</div>
                  <div className="px-3 py-3">{new Date(l.created_at).toLocaleDateString()}</div>
                  <div className="px-3 py-3">
                    <span className={`px-2 py-1 rounded text-[10px] font-semibold ${l.status === 'active' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                      {l.status === 'active' ? 'Active' : 'Unsubscribed'}
                    </span>
                  </div>
                  <div className="flex justify-center px-2 py-3">
                    {userRole === 'superadmin' && (
                      <button
                        onClick={() => { setLeadToDelete(l); setShowDeleteModal(true); }}
                        className="p-1.5 rounded-full bg-red-50 text-red-500 hover:bg-red-100 transition text-sm"
                        title="Delete Lead"
                      >
                        <FaTrash />
                      </button>
                    )}
                  </div>
                </div>

                {/* Mobile View */}
                <div className="sm:hidden px-3 py-4 space-y-2">
                  <div className="flex justify-between items-center">
                    <p className="font-semibold text-slate-950">{l.email}</p>
                    {userRole === 'superadmin' && (
                      <button
                        onClick={() => { setLeadToDelete(l); setShowDeleteModal(true); }}
                        className="p-1.5 rounded-full bg-red-50 text-red-500 hover:bg-red-100 transition text-sm"
                      >
                        <FaTrash />
                      </button>
                    )}
                  </div>
                  <p className="text-sm text-gray-500">Subscribed: {new Date(l.created_at).toLocaleDateString()}</p>
                  <p>
                    <span className={`px-2 py-1 rounded text-xs font-semibold ${l.status === 'active' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                      {l.status === 'active' ? 'Active' : 'Unsubscribed'}
                    </span>
                  </p>
                </div>
              </div>
            ))}

            <div className="flex flex-col sm:flex-row justify-between items-center text-sm text-gray-600 gap-2 mt-5">
              <p>
                Showing {filteredLeads.length > 0 ? startIndex + 1 : 0} to{" "}
                {endIndex > filteredLeads.length ? filteredLeads.length : endIndex} of{" "}
                {filteredLeads.length} entries
              </p>
              <Pagination
                currentPage={currentPage}
                totalPages={totalPages > 0 ? totalPages : 1}
                onPageChange={setCurrentPage}
              />
            </div>
          </div>
        </main>

        {showDeleteModal && leadToDelete && (
          <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50">
            <div className="bg-white rounded-lg shadow-lg w-[90%] max-w-md relative">
              <button
                onClick={() => setShowDeleteModal(false)}
                className="absolute top-3 right-4 text-gray-400 hover:text-black text-xl font-bold"
              >
                ×
              </button>
              <div className="px-6 py-8 text-center">
                <p className="text-lg font-medium mb-6">
                  Do you want to unsubscribe/delete <span className="font-bold">{leadToDelete.email}</span>?
                </p>
                <div className="flex justify-center gap-4">
                  <button
                    onClick={() => setShowDeleteModal(false)}
                    className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleDeleteLead}
                    className="px-6 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition"
                  >
                    Yes, Delete
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

export default NewsletterLeads;
