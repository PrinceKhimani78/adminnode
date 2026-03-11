"use client";
import React, { useState, useEffect, use } from "react";
import Sidebar from "@/components/Admin/Common/Sidebar";
import AdminHeader from "@/components/Admin/Common/AdminHeader";
import JobForm from "@/components/Admin/Common/JobForm";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";

interface EditJobPageProps {
  params: Promise<{ id: string }>;
}

const EditJobPage = ({ params }: EditJobPageProps) => {
  const { id } = use(params);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [jobData, setJobData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const { token, isAuthenticated } = useAuth();
  const router = useRouter();

  useEffect(() => {
    const fetchJob = async () => {
      if (!isAuthenticated || !token) return;
      
      try {
        const backendUrl = process.env.NEXT_PUBLIC_BACKEND_API_URL || "/api";
        const response = await fetch(`${backendUrl}/jobs/${id}`, {
          headers: {
            "Authorization": `Bearer ${token}`
          }
        });
        const data = await response.json();
        if (data.success) {
          setJobData(data.data);
        } else {
          alert("Failed to fetch job data");
          router.push('/admin/manage-jobs');
        }
      } catch (error) {
        console.error("Error fetching job:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchJob();
  }, [id, token, isAuthenticated]);

  return (
    <>
      <div className="pl-2 pr-4 sm:px-2 py-2 flex gap-3 sm:gap-4 my-10 relative bg-[#F8FAFC] min-h-screen">
        <Sidebar mobileOpen={mobileOpen} setMobileOpen={setMobileOpen} />
        <main className="flex-1 px-4 sm:px-8 py-6 min-w-0 space-y-6">
          <AdminHeader />

          <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 border-b border-gray-200 pb-6">
            <div>
              <h1 className="text-2xl sm:text-3xl font-extrabold text-gray-900 flex items-center gap-3">
                Edit job
              </h1>
            </div>
          </div>

          {loading ? (
            <div className="text-center py-20 font-medium text-gray-500">Loading job details...</div>
          ) : jobData ? (
            <JobForm initialData={jobData} isEdit={true} />
          ) : (
            <div className="text-center py-20 text-red-500">Job not found</div>
          )}
        </main>
      </div>
    </>
  );
};

export default EditJobPage;
