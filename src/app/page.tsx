"use client";

import LoginPage from "@/components/Admin/Login/LoginPage";

export default function HomePage() {
  return (
    <div className="relative min-h-screen w-full overflow-hidden">
      {/* Background Video */}
      <video
        autoPlay
        loop
        muted
        playsInline
        className="absolute inset-0 h-full w-full object-cover"
      >
        <source src="/images/bg-video.webm" type="video/webm" />
      </video>

      {/* Dark overlay for readability */}
      {/* <div className="absolute inset-0 bg-black/40" /> */}

      {/* Login Content */}
      <div className="relative z-10 flex min-h-screen items-center justify-center">
        <LoginPage />
      </div>
    </div>
  );
}
