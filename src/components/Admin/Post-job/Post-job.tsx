"use client";
import React, { useState } from "react";
import Sidebar from "../Common/Sidebar";
import AdminHeader from "../Common/AdminHeader";
import JobForm from "../Common/JobForm";
import { useRouter } from "next/navigation";
import { IoChevronForward } from "react-icons/io5";
import { FiChevronRight } from "react-icons/fi";
import Link from "next/link";

const Postjob = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const router = useRouter();

  return (
    <>
      <div className="pl-0 pr-3 sm:pr-4 py-3 sm:py-4 flex gap-3 sm:gap-4 relative">
        <Sidebar mobileOpen={mobileOpen} setMobileOpen={setMobileOpen} />
        <main className="flex-1 px-5 py-5 min-w-0 bg-white shadow rounded-lg space-y-4">
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
                  className="fontAL font-semibold capitalize text-xl md:text-2xl lg:text-3xl flex items-center gap-3"
                  style={{
                    letterSpacing: "1px",
                    wordSpacing: "2px",
                    lineHeight: 1.2,
                  }}
                >
                  Post a job
                </h1>
              </div>


            </div>
          </div>

          <JobForm />
        </main>
      </div>
    </>
  );
};

export default Postjob;
