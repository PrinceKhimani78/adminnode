"use client";

import React, { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { FaUserCircle, FaSignOutAlt, FaChevronDown } from "react-icons/fa";

const AdminHeader = () => {
    const [userName, setUserName] = useState("Admin");
    const [userRole, setUserRole] = useState("Staff");
    const [showDropdown, setShowDropdown] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);
    const router = useRouter();

    useEffect(() => {
        if (typeof window !== "undefined") {
            const userStr = localStorage.getItem("admin_user");
            if (userStr) {
                const user = JSON.parse(userStr);
                setUserName(user.name || "Admin");
                setUserRole(user.role || "Staff");
            }
        }

        const handleClickOutside = (event: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setShowDropdown(false);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    const handleLogout = () => {
        localStorage.removeItem("admin_token");
        localStorage.removeItem("admin_user");
        localStorage.removeItem("admin_logged_in");
        router.push("/");
    };

    return (
        <div className="flex justify-end items-center mb-6 relative z-[50]">
            <div
                ref={dropdownRef}
                className="flex items-center gap-3 cursor-pointer hover:bg-gray-100 p-2 rounded-lg transition-all"
                onClick={() => setShowDropdown(!showDropdown)}
            >
                <div className="text-right hidden sm:block">
                    <p className="text-sm font-bold text-gray-800 uppercase leading-none">{userName}</p>
                    <p className="text-[10px] text-gray-500 capitalize leading-tight">{userRole}</p>
                </div>

                <div className="w-10 h-10 rounded-full bg-[#72B76A] flex items-center justify-center text-white font-bold uppercase border-2 border-white shadow-sm">
                    {userName[0]}
                </div>

                <FaChevronDown className={`text-gray-400 text-xs transition-transform duration-300 ${showDropdown ? 'rotate-180' : ''}`} />

                {showDropdown && (
                    <div className="absolute top-full right-0 mt-2 w-48 bg-white border border-gray-100 rounded-xl shadow-xl py-2 animate-in fade-in slide-in-from-top-2 duration-200">
                        <div className="px-4 py-2 border-b border-gray-50 sm:hidden">
                            <p className="text-sm font-bold text-gray-800 uppercase">{userName}</p>
                            <p className="text-[10px] text-gray-500 capitalize">{userRole}</p>
                        </div>
                        <button
                            onClick={handleLogout}
                            className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50 flex items-center gap-2 transition-colors"
                        >
                            <FaSignOutAlt /> Sign Out
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default AdminHeader;
