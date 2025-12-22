"use client";
import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect, useRef } from "react";
import Particles from "react-tsparticles";
import Image from "next/image";
import {
  FaInstagram,
  FaLinkedin,
  FaFacebook,
  FaTwitter,
  //   FaCheckCircle,
} from "react-icons/fa";
import confetti from "canvas-confetti";
export default function ComingSoon() {
  const [formData, setFormData] = useState({ email: "", phone: "" });
  const [showSuccess, setShowSuccess] = useState(false);
  const [progress, setProgress] = useState(0);
  const [subscribed, setSubscribed] = useState(false);
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  const launchDate = new Date("2025-11-01T00:00:00").getTime();
  const startDate = new Date("2025-10-01T00:00:00").getTime();

  // Track timeouts for cleanup
  const timeoutRefs = useRef<NodeJS.Timeout[]>([]);

  // Countdown & Progress logic
  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date().getTime();
      const distance = launchDate - now;
      const totalDuration = launchDate - startDate;

      const days = Math.floor(distance / (1000 * 60 * 60 * 24));
      const hours = Math.floor(
        (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
      );
      const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((distance % (1000 * 60)) / 1000);

      const passed = now - startDate;
      const progressPercent = Math.min((passed / totalDuration) * 100, 100);

      if (distance < 0) {
        clearInterval(interval);
        setProgress(100);
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
      } else {
        setProgress(progressPercent);
        setTimeLeft({ days, hours, minutes, seconds });
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [launchDate, startDate]); // Add startDate dependency

  // Cleanup all timeouts on unmount
  useEffect(() => {
    return () => {
      timeoutRefs.current.forEach(clearTimeout);
    };
  }, []);

  // Particles Init
  const particlesInit = () => {};

  // Handle Submit (Frontend Only)
  //   const handleSubmit = (e: any) => {
  //     e.preventDefault();

  //     if (!formData.email || !formData.phone) return;

  //     setShowSuccess(true);
  //     setFormData({ email: "", phone: "" });

  //     setTimeout(() => setShowSuccess(false), 3000);
  //   };
  const handleSubmit = (e: any) => {
    e.preventDefault();

    if (!formData.email || !formData.phone) return;

    // 🎉 First confetti burst (strong)
    confetti({
      particleCount: 100,
      spread: 70,
      startVelocity: 50,
      origin: { y: 0.6 },
      colors: ["#FFD633", "#00C9FF", "#ffffff"],
    });

    // 🎉 Second confetti burst (a bit delayed for natural effect)
    const timeout1 = setTimeout(() => {
      confetti({
        particleCount: 70,
        spread: 100,
        startVelocity: 40,
        origin: { y: 0.7 },
        colors: ["#FFD633", "#00C9FF", "#ffffff"],
      });
    }, 250);
    timeoutRefs.current.push(timeout1);

    // ✅ Update button + success popup
    setSubscribed(true);
    setShowSuccess(true);
    setFormData({ email: "", phone: "" });

    // Revert back after 4 seconds
    const timeout2 = setTimeout(() => {
      setShowSuccess(false);
      setSubscribed(false);
    }, 4000);
    timeoutRefs.current.push(timeout2);
  };

  // 💬 AnimatedText component
  function AnimatedText() {
    const messages = [
      "👨‍💻 Developers are finalizing features",
      "💼 Employers are onboarding to Rojgari",
      "🚀 We're getting ready for launch",
      "🎯 Your next job is almost here!",
    ];
    const [index, setIndex] = useState(0);

    useEffect(() => {
      const timer = setInterval(() => {
        setIndex((prev) => (prev + 1) % messages.length);
      }, 3000); // every 3 seconds change
      return () => clearInterval(timer);
    }, [messages.length]); // Add dependency to prevent stale closure

    return (
      <motion.span
        key={index}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -10 }}
        transition={{ duration: 0.6 }}
        className="inline-block text-center"
      >
        {messages[index]}
      </motion.span>
    );
  }
  return (
    <div className="relative flex flex-col items-center justify-center min-h-screen overflow-hidden bg-[#72B76A] text-white px-6">
      {/* 🌌 Particles Background */}
      <Particles
        id="tsparticles"
        options={{
          background: { color: "transparent" },
          fpsLimit: 60,
          interactivity: {
            events: {
              onHover: { enable: true, mode: "repulse" },
              resize: true,
            },
            modes: { repulse: { distance: 80, duration: 0.4 } },
          },
          particles: {
            number: { value: 40, density: { enable: true, area: 800 } },
            color: { value: ["#00C9FF", "#FFD633", "#ffffff"] },
            links: {
              enable: true,
              distance: 150,
              color: "#ffffff",
              opacity: 0.1,
              width: 1,
            },
            move: {
              enable: true,
              speed: 0.6,
              random: true,
              outModes: { default: "bounce" },
            },
            opacity: { value: 0.25 },
            size: { value: { min: 1, max: 2.5 } },
            shape: { type: "circle" },
          },
          detectRetina: true,
        }}
        className="absolute inset-0 z-0"
      />

      {/* Overlay Glow */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#00C9FF]/30 via-transparent to-[#FFD633]/30 z-0"></div>

      {/* Main Content */}
      <div className="relative z-10 flex flex-col items-center text-center">
        <motion.div
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="mb-8 flex justify-center"
        >
          <Image
            src="/images/logo.svg"
            alt="Rojgari India"
            width={220}
            height={80}
            priority // loads instantly (recommended for hero section)
            className="drop-shadow-lg"
          />
        </motion.div>

        <motion.h1
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.8 }}
          className="fontAL text-5xl md:text-6xl font-extrabold mb-4 drop-shadow-lg"
        >
          Coming Soon
        </motion.h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.8 }}
          className="fontAL text-lg md:text-xl text-gray-200 mb-10 max-w-xl"
        >
          We’re building something amazing. Stay tuned — Rojgari India is about
          to launch!
        </motion.p>

        {/* Countdown */}
        {/* <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7, duration: 0.8 }}
          className="flex gap-6 mb-8 text-center"
        >
          {[
            { label: "Days", value: timeLeft.days },
            { label: "Hours", value: timeLeft.hours },
            { label: "Minutes", value: timeLeft.minutes },
            { label: "Seconds", value: timeLeft.seconds },
          ].map((item, index) => (
            <motion.div
              key={index}
              className="flex flex-col items-center bg-white/10 px-5 py-3 rounded-xl backdrop-blur-md shadow-lg"
              whileHover={{ scale: 1.05 }}
            >
              <span className="text-3xl font-bold text-[#FFD633]">
                {item.value}
              </span>
              <span className="text-sm text-gray-200">{item.label}</span>
            </motion.div>
          ))}
        </motion.div> */}

        {/* Joiners Counter + Team Updates */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7, duration: 0.8 }}
          className="flex flex-col items-center justify-center mb-10"
        >
          {/* 👥 Joiners Counter */}
          <motion.h2
            key={progress} // reuse progress for subtle animation trigger
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            className="text-3xl md:text-4xl font-bold text-[#FFD633] mb-3"
          >
            {Math.floor(2800 + progress * 10).toLocaleString()}+ Job Seekers
            Joined 🚀
          </motion.h2>

          {/* 💬 Animated “Team Working” text */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
            className="text-lg text-gray-200 mt-2 font-medium"
          >
            <AnimatedText />
          </motion.p>
        </motion.div>
        {/* Progress Bar */}
        <div className="w-full max-w-lg bg-white/20 rounded-full overflow-hidden mb-10 h-3">
          <motion.div
            className="h-3 bg-gradient-to-r from-[#FFD633] via-[#00C9FF] to-[#00A3CC]"
            animate={{ width: `${progress}%` }}
            transition={{ duration: 1, ease: "easeInOut" }}
          />
        </div>

        {/* Form */}
        <motion.form
          onSubmit={handleSubmit}
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 1, duration: 0.8 }}
          className="flex flex-col md:flex-row items-center bg-white/10 backdrop-blur-lg rounded-full overflow-hidden p-2 shadow-lg gap-3"
        >
          <input
            type="email"
            placeholder="Enter your email"
            value={formData.email}
            onChange={(e) =>
              setFormData({ ...formData, email: e.target.value })
            }
            className="bg-transparent text-white placeholder-gray-300 px-4 py-2 outline-none w-64"
            required
          />
          <input
            type="tel"
            placeholder="Mobile number"
            value={formData.phone}
            onChange={(e) =>
              setFormData({ ...formData, phone: e.target.value })
            }
            className="bg-transparent text-white placeholder-gray-300 px-4 py-2 outline-none w-64"
            required
          />
          <button
            type="submit"
            disabled={subscribed}
            className={`px-6 py-2 rounded-full font-semibold transition-all shadow-md hover:shadow-lg ${
              subscribed
                ? "bg-[#00C9FF] text-white cursor-default"
                : "bg-[#FFD633] text-black hover:bg-[#E6C52D]"
            }`}
          >
            {subscribed ? "Subscribed 🎉" : "Notify Me"}
          </button>
        </motion.form>

        {/* ✅ Success Popup */}
        {/* <AnimatePresence>
          {showSuccess && (
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 40 }}
              transition={{ duration: 0.5 }}
              className="fixed bottom-10 right-10 bg-[#00C9FF]/90 text-white px-6 py-3 rounded-lg shadow-lg flex items-center gap-3 z-50 backdrop-blur-md border border-white/20"
            >
              <FaCheckCircle className="text-[#FFD633] text-2xl" />
              <p className="font-medium">Subscribed successfully!</p>
            </motion.div>
          )}
        </AnimatePresence> */}

        {/* Social Icons */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
          className="flex gap-6 mt-10 text-2xl"
        >
          <a href="#" className="hover:text-[#FFD633] transition">
            <FaInstagram />
          </a>
          <a href="#" className="hover:text-[#FFD633] transition">
            <FaLinkedin />
          </a>
          <a href="#" className="hover:text-[#FFD633] transition">
            <FaFacebook />
          </a>
          <a href="#" className="hover:text-[#FFD633] transition">
            <FaTwitter />
          </a>
        </motion.div>
      </div>
    </div>
  );
}
