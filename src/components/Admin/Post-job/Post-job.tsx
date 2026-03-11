"use client";
import React, { useState } from "react";
import Sidebar from "../Common/Sidebar";
import AdminHeader from "../Common/AdminHeader";
import JobForm from "../Common/JobForm";
import { useRouter } from "next/navigation";

const Postjob = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const router = useRouter();

  return (
    <>
      <div className="pl-2 pr-4 sm:px-2 py-2 flex gap-3 sm:gap-4 my-10 relative bg-[#F8FAFC] min-h-screen">
        <Sidebar mobileOpen={mobileOpen} setMobileOpen={setMobileOpen} />
        <main className="flex-1 px-4 sm:px-8 py-6 min-w-0 space-y-6">
          <AdminHeader />

          {/* Page Title */}
          <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 border-b border-gray-200 pb-6">
            <div>
              <h1 className="text-2xl sm:text-3xl font-extrabold text-gray-900 flex items-center gap-3">
                Post a job <span className="text-sm font-medium bg-[#E0F7FF] text-[#00c9ff] px-3 py-1 rounded-full uppercase tracking-tighter">Free</span>
              </h1>
            </div>
            
            <div className="flex items-center gap-2">
               <button onClick={() => router.push('/admin/manage-jobs')} className="px-5 py-2 text-sm font-semibold text-gray-600 hover:text-gray-900 transition">Exit</button>
            </div>
          </div>

          <JobForm />
        </main>
      </div>
    </>
  );
};

export default Postjob;
