"use client";
import Sidebar from "@/components/Admin/Common/Sidebar";
import AdminHeader from "../Common/AdminHeader";
import React, { useState, useEffect } from "react";
import { FaUserPlus, FaTrash, FaShieldAlt } from "react-icons/fa";
import { IoChevronForward } from "react-icons/io5";

const ManageAdmins = () => {
    const [mobileOpen, setMobileOpen] = useState(false);
    const [name, setName] = useState("");
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [role, setRole] = useState("admin");
    const [message, setMessage] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    const handleCreateAdmin = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setMessage("");
        setError("");

        try {
            const token = localStorage.getItem("admin_token");
            const response = await fetch("/api/admin/auth/create", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`,
                },
                body: JSON.stringify({ name, username, email, password, role }),
            });

            const result = await response.json();
            if (response.ok) {
                setMessage("Admin created successfully!");
                setName("");
                setUsername("");
                setEmail("");
                setPassword("");
                setRole("admin");
            } else {
                setError(result.message || "Failed to create admin");
            }
        } catch (err) {
            setError("Something went wrong");
        } finally {
            setLoading(false);
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
                            Admin Management
                        </h1>
                    </div>
                </div>

                <div className="max-w-2xl bg-gray-50 p-6 rounded-xl border border-gray-200">
                    <h2 className="text-xl font-bold mb-6 flex items-center gap-2 text-[#72B76A]">
                        <FaUserPlus /> Create New Admin
                    </h2>
                    <form onSubmit={handleCreateAdmin} className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                            <input
                                type="text"
                                required
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-[#72B76A] outline-none"
                                placeholder="John Doe"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Username</label>
                            <input
                                type="text"
                                required
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-[#72B76A] outline-none"
                                placeholder="johndoe123"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
                            <input
                                type="email"
                                required
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-[#72B76A] outline-none"
                                placeholder="admin@example.com"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
                            <input
                                type="password"
                                required
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-[#72B76A] outline-none"
                                placeholder="••••••••"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Role</label>
                            <select
                                value={role}
                                onChange={(e) => setRole(e.target.value)}
                                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-[#72B76A] outline-none"
                            >
                                <option value="admin">Admin (Restricted)</option>
                                <option value="superadmin">Superadmin (Full Access)</option>
                            </select>
                        </div>

                        {error && <p className="text-red-600 text-sm mt-2">{error}</p>}
                        {message && <p className="text-green-600 text-sm mt-2">{message}</p>}

                        <button
                            type="submit"
                            disabled={loading}
                            className={`w-full py-3 rounded-lg text-white font-medium transition ${loading ? "bg-gray-400" : "bg-[#72B76A] hover:bg-[#72B76A]/80"
                                }`}
                        >
                            {loading ? "Creating..." : "Create Admin Account"}
                        </button>
                    </form>
                </div>

                <div className="bg-blue-50 p-6 rounded-xl border border-blue-200">
                    <h3 className="text-lg font-bold mb-4 flex items-center gap-2 text-blue-700">
                        <FaShieldAlt /> Role Restrictions
                    </h3>
                    <div className="grid md:grid-cols-2 gap-6">
                        <div className="bg-white p-4 rounded-lg shadow-sm">
                            <h4 className="font-bold text-gray-800 mb-2">Superadmin</h4>
                            <ul className="text-sm text-gray-600 list-disc list-inside space-y-1">
                                <li>Full access to all modules</li>
                                <li>Can create and delete other admins</li>
                                <li>Can delete candidate profiles</li>
                                <li>Manage site-wide configurations</li>
                            </ul>
                        </div>
                        <div className="bg-white p-4 rounded-lg shadow-sm">
                            <h4 className="font-bold text-gray-800 mb-2">Admin</h4>
                            <ul className="text-sm text-gray-600 list-disc list-inside space-y-1">
                                <li>View and edit candidate profiles</li>
                                <li>Post and manage jobs</li>
                                <li>Cannot delete candidates</li>
                                <li>Cannot manage other admin accounts</li>
                            </ul>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
};

export default ManageAdmins;
