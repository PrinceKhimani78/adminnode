"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";

export default function LoginPage() {
  const router = useRouter();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = () => {
    if (username === "admin" && password === "admin@123") {
      localStorage.setItem("admin_logged_in", "true");
      router.push("/admin/dashboard");
    } else {
      setError("Invalid username or password");
    }
  };

  return (
    <main className="min-h-screen flex items-center justify-center">
      <div
        className="
      w-full max-w-md
      rounded-2xl
      p-10
      shadow-2xl
      backdrop-blur-xl
      bg-white/10
      border border-white/20
    "
      >
        {/* Logo */}
        <div className="flex justify-center mb-6">
          <Image
            src="/images/logo.png"
            alt="Rojgari India"
            width={220}
            height={80}
            className="h-20 w-auto"
            priority
          />
        </div>

        <h2 className="text-2xl font-semibold text-center mb-6">Admin Login</h2>

        {/* Username */}
        <input
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder="Username"
          autoComplete="off"
          className="
            mb-4 w-full
            rounded-lg
            border border-gray-300
            bg-white
            px-5 py-3
            text-base text-black
            outline-none
            focus:border-green-500
          "
        />

        {/* Password */}
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
          autoComplete="new-password"
          className="
            mb-4 w-full
            rounded-lg
            border border-gray-300
            bg-white
            px-5 py-3
            text-base text-black
            outline-none
            focus:border-green-500
          "
        />

        {error && (
          <p className="text-red-600 text-sm mb-4 text-center">{error}</p>
        )}

        {/* Button */}
        <button
          onClick={handleLogin}
          className="
            w-full
            rounded-lg
            bg-[#72B76A]
            py-3
            text-base font-medium text-white
            hover:bg-[#72B76A]/80
            transition
         
          "
        >
          Login
        </button>
      </div>
    </main>
  );
}
