"use client";

// import Sidebar from "@/components/Admin/Common/Sidebar";
import AdminTopbar from "@/components/Admin/Topbar/AdminTopbar";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // later replace with real session data
  const adminName = "Randall Henderson";

  return (
    <div className="min-h-screen flex bg-[#FFFFF0]">
      {/* Sidebar */}
      {/* <Sidebar /> */}

      {/* Right side */}
      <div className="flex-1 flex flex-col">
        {/* Top bar  */}
        <AdminTopbar username={adminName} />

        {/* Page content */}
        <main className="flex-1 p-1">{children}</main>
      </div>
    </div>
  );
}
