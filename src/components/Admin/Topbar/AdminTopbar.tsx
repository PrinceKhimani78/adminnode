"use client";

import { useRouter } from "next/navigation";

interface AdminTopbarProps {
  username: string;
}

export default function AdminTopbar({ username }: AdminTopbarProps) {
  const router = useRouter();

  const handleLogout = () => {
    // Clear auth (example – adjust to your auth system)
    localStorage.removeItem("admin_token");
    localStorage.removeItem("admin_user");

    router.push("/admin/login");
  };

  return (
    <div className="w-full h-14 bg-white border-b border-gray-200 flex items-center justify-between px-6 py-6">
      {/* Left – Username */}
      <div className="text-sm font-semibold text-gray-800">
        Welcome, <span className="text-[#72B76A]">{username}</span>
      </div>

      {/* Right – Logout */}
      <button
        onClick={handleLogout}
        className="px-4 h-9 text-sm font-semibold
        border border-[#72B76A] rounded-md
        text-[#72B76A]
        hover:bg-[#72B76A] hover:text-white
        transition"
      >
        Logout
      </button>
    </div>
  );
}
