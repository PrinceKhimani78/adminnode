"use client";

import React, {
  useEffect,
  useRef,
  useState,
  ChangeEvent,
  FormEvent,
} from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { usePathname, useRouter } from "next/navigation";
import { FaArrowRightToBracket } from "react-icons/fa6";
import Link from "next/link";
import "../Home/Home.css";
import "./Header.css";
import Image from "next/image";
import { RxCross2 } from "react-icons/rx";

type AuthSetter = React.Dispatch<React.SetStateAction<boolean>>;

interface HeaderProps {
  isAuthenticated?: boolean;
  setIsAuthenticated?: AuthSetter;
}

type Mode = "login" | "signup";

interface FormState {
  username: string;
  password: string;
  fullName: string;
  mobile: string;
  email: string;
  confirmPassword: string;
  otp: string;
}

// type JobsMenuItem = { label: string; href: string };

const Header: React.FC<HeaderProps> = ({
  isAuthenticated,
  setIsAuthenticated,
}) => {
  const pathnameRaw = usePathname() || "/";
  const pathname = pathnameRaw.toLowerCase();
  const router = useRouter();

  // route checks (case-insensitive)
  const isHome = pathname === "/";
  const isJobs = pathname === "/jobs";
  {
    /*|| pathname.startsWith("/jobs/");*/
  }
  const isCandidates = pathname === "/candidates";
  const isRecruiters = pathname === "/recruiters";
  const isPages = pathname === "/pages" || pathname.startsWith("/pages/");
  const isBlogs = pathname === "/blogs" || pathname.startsWith("/blogs/");
  type MenuItem = { label: string; href: string };
  // const pagesMenu: MenuItem[] = [
  //   { label: "About Us", href: "/pages/aboutus" },
  //   { label: "Pricing", href: "/pages/pricing" },
  // ];
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [showPopup, setShowPopup] = useState<boolean>(false);
  const [mode, setMode] = useState<Mode>("login");
  const [formData, setFormData] = useState<FormState>({
    username: "",
    password: "",
    fullName: "",
    mobile: "",
    email: "",
    confirmPassword: "",
    otp: "",
  });
  useEffect(() => {
    if (!showPopup) return;
    const { body } = document;
    const prevOverflow = body.style.overflow;
    const prevPaddingRight = body.style.paddingRight;

    // prevent layout shift when hiding scrollbar
    const scrollbar = window.innerWidth - document.documentElement.clientWidth;
    body.style.overflow = "hidden";
    if (scrollbar > 0) body.style.paddingRight = `${scrollbar}px`;

    return () => {
      body.style.overflow = prevOverflow;
      body.style.paddingRight = prevPaddingRight;
    };
  }, [showPopup]);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };
  const [userType, setUserType] = useState<"candidates" | "recruiter">(
    "candidates"
  );
  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("Form Submitted:", formData);

    localStorage.setItem("isAuthenticated", "true");

    if (userType === "candidates") {
      router.push("/candidates/dashboard");
    } else {
      router.push("/recruiters/dashboard");
    }

    setShowPopup(false);
    setIsChanged(false);
    setMenuOpen(false);
  };
  const handleLogout = () => {
    // setIsAuthenticated(false);
    localStorage.removeItem("isAuthenticated");
  };

  const dropdownRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        event.target instanceof Node &&
        !dropdownRef.current.contains(event.target)
      ) {
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const [menuOpen, setMenuOpen] = useState<boolean>(false);
  const [isChanged, setIsChanged] = useState<boolean>(false);
  // const [jobsOpen, setJobsOpen] = useState<boolean>(false);
  // const [pagesOpen, setPagesOpen] = useState<boolean>(false);

  const handleToggleChange = () => {
    setMenuOpen((prev) => !prev);
  };

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 767) {
        setMenuOpen(false);
        setIsChanged(false);
      }
    };
    window.addEventListener("resize", handleResize);
    handleResize();
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <>
      {/* Header for mobile */}
      <div className="lg:hidden">
        <div className="fixed top-0 grid grid-cols-2 items-center justify-between rounded-md bg-[#FFFFF0]/0 backdrop-blur-md h-20 w-[98%] mt-4 mx-[1%] px-3 py-2 z-[70]">
          {/* Logo */}
          <div className="flex justify-start">
            <Link href="/" className="flex items-center">
              <Image
                src="/images/logo.svg"
                alt="Logo"
                width={48}
                height={48}
                className="h-14 w-auto"
              />
            </Link>
          </div>

          {/* Toggle Menu (hamburger / X) */}
          <div
            className={`flex justify-end cursor-pointer ${
              menuOpen ? "change" : ""
            }`}
            onClick={handleToggleChange}
          >
            <div className="mx-3">
              <div className="bar1"></div>
              <div className="bar2"></div>
              <div className="bar3"></div>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile menu panel */}
      <div
        className={[
          "menu_bg fixed inset-0 z-[60] bg-white shadow-lg pt-24",
          "transform transition-transform duration-500",
          menuOpen
            ? "translate-y-0 pointer-events-auto"
            : "-translate-y-full pointer-events-none",
          "h-screen",
        ].join(" ")}
      >
        <div className="flex flex-col justify-center items-center mb-8 mx-7 space-y-6">
          <div>
            <Link
              href="/"
              onClick={() => setMenuOpen(false)}
              className={`relative inline-block group font-semibold ${
                isHome ? "text-[#72B76A]" : "text-black hover:text-[#72B76A]"
              }`}
            >
              Home
              <span
                className={`absolute left-0 -bottom-0.5 h-[2px] bg-current transition-all duration-300 ${
                  isHome ? "w-full text-[#72B76A]" : "w-0 group-hover:w-full"
                }`}
              />
            </Link>
          </div>

          <div>
            <Link
              href="/jobs"
              onClick={() => setMenuOpen(false)}
              className={`relative inline-block group font-semibold ${
                isJobs ? "text-[#72B76A]" : "text-black hover:text-[#72B76A]"
              }`}
            >
              Jobs
              <span
                className={`absolute left-0 -bottom-0.5 h-[2px] bg-current transition-all duration-300 ${
                  isJobs ? "w-full text-[#72B76A]" : "w-0 group-hover:w-full"
                }`}
              />
            </Link>
          </div>

          <div>
            <Link
              href="/candidates"
              onClick={() => setMenuOpen(false)}
              className={`relative inline-block group font-semibold ${
                isCandidates
                  ? "text-[#72B76A]"
                  : "text-black hover:text-[#72B76A]"
              }`}
            >
              Candidates
              <span
                className={`absolute left-0 -bottom-0.5 h-[2px] bg-current transition-all duration-300 ${
                  isCandidates
                    ? "w-full text-[#72B76A]"
                    : "w-0 group-hover:w-full"
                }`}
              />
            </Link>
          </div>

          <div>
            <Link
              href="/recruiters"
              onClick={() => setMenuOpen(false)}
              className={`relative inline-block group font-semibold ${
                isRecruiters
                  ? "text-[#72B76A]"
                  : "text-black hover:text-[#72B76A]"
              }`}
            >
              Recruiters
              <span
                className={`absolute left-0 -bottom-0.5 h-[2px] bg-current transition-all duration-300 ${
                  isRecruiters
                    ? "w-full text-[#72B76A]"
                    : "w-0 group-hover:w-full"
                }`}
              />
            </Link>
          </div>

          {/* Pages accordion */}
          <div>
            <Link
              href="/pages/aboutus"
              onClick={() => setMenuOpen(false)}
              className={`relative inline-block group font-semibold ${
                pathname === "/pages/aboutus"
                  ? "text-[#72B76A]"
                  : "text-black hover:text-[#72B76A]"
              }`}
            >
              About&nbsp;Us
              <span
                className={`absolute left-0 -bottom-0.5 h-[2px] bg-current transition-all duration-300 ${
                  pathname === "/pages/aboutus"
                    ? "w-full text-[#72B76A]"
                    : "w-0 group-hover:w-full"
                }`}
              />
            </Link>
          </div>

          <div>
            <Link
              href="/blogs"
              onClick={() => setMenuOpen(false)}
              className={`relative inline-block group font-semibold ${
                isBlogs ? "text-[#72B76A]" : "text-black hover:text-[#72B76A]"
              }`}
            >
              Blogs
              <span
                className={`absolute left-0 -bottom-0.5 h-[2px] bg-current transition-all duration-300 ${
                  isBlogs ? "w-full text-[#72B76A]" : "w-0 group-hover:w-full"
                }`}
              />
            </Link>
          </div>

          <div>
            <Link
              href="/contactus"
              onClick={() => setMenuOpen(false)}
              className="relative w-32 h-9 overflow-hidden group border border-[#72B76A] bg-transparent rounded-lg hover:bg-[#72B76A] text-[#72B76A] hover:text-white active:scale-90 transition-all ease-out duration-700 flex items-center justify-center"
            >
              <span className="absolute right-0 w-10 h-full top-0 transition-all duration-1000 transform translate-x-12 bg-white opacity-10 -skew-x-12 group-hover:-translate-x-24 ease" />
              <span className="relative text-sm font-semibold">Contact Us</span>
            </Link>
          </div>

          <div>
            <button
              onClick={() => {
                setShowPopup(true);
                setMenuOpen(false);
              }}
              className="relative w-32 h-9 overflow-hidden group border border-[#72B76A] bg-[#72B76A] rounded-lg hover:bg-transparent text-white hover:text-[#72B76A] active:scale-90 transition-all ease-out duration-700"
            >
              <span className="absolute right-0 w-10 h-full top-0 transition-all duration-1000 transform translate-x-12 bg-white opacity-10 -skew-x-12 group-hover:-translate-x-24 ease" />
              <span className="relative flex gap-2 justify-center items-center text-sm font-semibold">
                <FaArrowRightToBracket />
                Sign In
              </span>
            </button>
          </div>
        </div>
      </div>

      {/* Header for desktop */}
      <div className="hidden lg:block">
        <div className="fixed top-0 grid grid-cols-3 items-center justify-between bg-[#FFFFF0]/0 backdrop-blur-md rounded-md h-20 w-[98%] mt-4 mx-[1%] px-8 py-2 z-[70]">
          {/* Logo */}
          <div className="flex">
            <Link href="/" className="flex items-center">
              <Image
                src="/images/logo.svg"
                alt="Logo"
                width={48}
                height={48}
                className="h-16 w-auto"
              />
            </Link>
          </div>

          {/* Menu options */}
          <div className="fontPOP flex justify-center gap-5 text-sm">
            <Link
              href="/"
              className={`relative inline-block group font-semibold ${
                isHome ? "text-[#72B76A]" : "text-black hover:text-[#72B76A]"
              }`}
            >
              Home
              <span
                className={`absolute left-0 -bottom-0.5 h-[2px] bg-current transition-all duration-300 ${
                  isHome ? "w-full text-[#72B76A]" : "w-0 group-hover:w-full"
                }`}
              />
            </Link>

            <div className="relative group text-center">
              <Link
                href="/jobs"
                className={`relative inline-block font-semibold ${
                  isJobs ? "text-[#72B76A]" : "text-black hover:text-[#72B76A]"
                }`}
              >
                Jobs
                <span
                  className={`absolute left-0 -bottom-0.5 h-[2px] bg-current transition-all duration-300 ${
                    isJobs ? "w-full text-[#72B76A]" : "w-0 group-hover:w-full"
                  }`}
                />
              </Link>
            </div>

            <Link
              href="/candidates"
              className={`relative inline-block group font-semibold ${
                isCandidates
                  ? "text-[#72B76A]"
                  : "text-black hover:text-[#72B76A]"
              }`}
            >
              Candidates
              <span
                className={`absolute left-0 -bottom-0.5 h-[2px] bg-current transition-all duration-300 ${
                  isCandidates
                    ? "w-full text-[#72B76A]"
                    : "w-0 group-hover:w-full"
                }`}
              />
            </Link>

            <Link
              href="/recruiters"
              className={`relative inline-block group font-semibold ${
                isRecruiters
                  ? "text-[#72B76A]"
                  : "text-black hover:text-[#72B76A]"
              }`}
            >
              Recruiters
              <span
                className={`absolute left-0 -bottom-0.5 h-[2px] bg-current transition-all duration-300 ${
                  isRecruiters
                    ? "w-full text-[#72B76A]"
                    : "w-0 group-hover:w-full"
                }`}
              />
            </Link>

            {/* Pages /aboutus*/}
            <Link
              href="/pages/aboutus"
              className={`relative inline-block group font-semibold ${
                pathname === "/pages/aboutus"
                  ? "text-[#72B76A]"
                  : "text-black hover:text-[#72B76A]"
              }`}
            >
              About&nbsp;Us
              <span
                className={`absolute left-0 -bottom-0.5 h-[2px] bg-current transition-all duration-300 ${
                  pathname === "/pages/aboutus"
                    ? "w-full text-[#72B76A]"
                    : "w-0 group-hover:w-full"
                }`}
              />
            </Link>

            <Link
              href="/blogs"
              className={`relative inline-block group font-semibold ${
                isBlogs ? "text-[#72B76A]" : "text-black hover:text-[#72B76A]"
              }`}
            >
              Blogs
              <span
                className={`absolute left-0 -bottom-0.5 h-[2px] bg-current transition-all duration-300 ${
                  isBlogs ? "w-full text-[#72B76A]" : "w-0 group-hover:w-full"
                }`}
              />
            </Link>
          </div>

          {/* Contact / Auth */}
          <div className="flex gap-2 justify-end items-center">
            <Link
              href="/contactus"
              className="relative px-4 h-9 overflow-hidden group border border-[#72B76A] bg-transparent rounded-lg hover:bg-[#72B76A] text-[#72B76A] hover:text-white active:scale-90 transition-all ease-out duration-700 flex items-center justify-center"
            >
              <span className="absolute right-0 w-10 h-full top-0 transition-all duration-1000 transform translate-x-12 bg-white opacity-10 -skew-x-12 group-hover:-translate-x-24 ease" />
              <span className="relative text-sm font-semibold">Contact Us</span>
            </Link>

            <button
              onClick={() => setShowPopup(true)}
              className="relative px-4 h-9 overflow-hidden group border border-[#72B76A] bg-[#72B76A] rounded-lg hover:bg-transparent text-white hover:text-[#72B76A] active:scale-90 transition-all ease-out duration-700"
            >
              <span className="absolute right-0 w-10 h-full top-0 transition-all duration-1000 transform translate-x-12 bg-white opacity-10 -skew-x-12 group-hover:-translate-x-24 ease" />
              <span className="relative flex gap-2 items-center text-sm font-semibold">
                <FaArrowRightToBracket />
                Sign In
              </span>
            </button>
          </div>
        </div>
      </div>

      {/* Auth Popup */}
      {showPopup && (
        <div
          className="fixed inset-0 flex items-center justify-center bg-black/60 z-[10000]"
          onClick={() => setShowPopup(false)}
        >
          <div
            className="popupContent bg-white shadow-xl max-w-[1000px] h-auto md:h-[50vh] sm:-[50vh] mx-5  rounded-lg relative z-10 "
            onClick={(e) => e.stopPropagation()}
          >
            {/* Desktop Close Button */}
            <button
              onClick={() => setShowPopup(false)}
              aria-label="Close sign in"
              className="absolute top-4 right-4 z-20 text-3xl font-bold text-gray-400 hover:text-black hidden md:block"
            >
              <RxCross2 size={20} />
            </button>

            <div className="grid grid-cols-1 sm:grid-cols-2 items-center justify-center bg-[#FFFFF0] rounded-lg max-h-[80vh] ">
              {/* Left Panel */}
              <div className="relative w-full h-full rounded-b-lg sm:rounded-b-none sm:rounded-l-lg order-2 sm:order-1 border-r border-gray-300">
                <div className="flex flex-col items-center justify-center text-gray-900 p-5 h-full">
                  {/* Logo visible only on md+ */}
                  <Image
                    src="/images/logo.svg"
                    alt="Rojgari Logo"
                    width={220}
                    height={180}
                    className="mb-6 hidden md:block"
                  />
                  <div className="overflow-y-auto max-h-20 md:overflow-visible md:max-h-none ">
                    <p className="font-bold uppercase mb-4 text-center">
                      ➤ Please Note
                    </p>
                    <ul className="text-xs space-y-2">
                      <li>
                        - Lorem ipsum dolor sit amet consectetur adipisicing
                        elit.
                      </li>
                      <li>
                        - Distinctio, recusandae. Lorem ipsum dolor sit amet.
                      </li>
                      <li>
                        - Lorem ipsum dolor sit amet consectetur adipisicing
                        elit.
                      </li>
                      <li>
                        - Distinctio, recusandae. Lorem ipsum dolor sit amet.
                      </li>
                      <li>
                        - Distinctio, recusandae. Lorem ipsum dolor sit amet.
                      </li>
                      <li>
                        - Distinctio, recusandae. Lorem ipsum dolor sit amet.
                      </li>
                      <li>
                        - Distinctio, recusandae. Lorem ipsum dolor sit amet.
                      </li>
                      <li>
                        - Distinctio, recusandae. Lorem ipsum dolor sit amet.
                      </li>
                    </ul>
                  </div>
                </div>
              </div>

              {/* Right Panel */}
              <form
                className="col-span-2 sm:col-span-1 px-2 sm:px-6 lg:px-8 pt-0 pb-2  sm:py-8 order-1 sm:order-2"
                onSubmit={handleSubmit}
              >
                {/* Mobile Top Row (Logo + Close Button) */}
                <div className="  flex items-start sm:items-center justify-between top-2 mb-6 md:hidden ">
                  <Image
                    src="/images/logo.svg"
                    alt="Rojgari Logo"
                    width={170}
                    height={150}
                    className="h-16 "
                  />
                  <button
                    onClick={() => setShowPopup(false)}
                    aria-label="Close sign in"
                    className="text-3xl mt-2 font-bold text-gray-400 hover:text-black"
                  >
                    <RxCross2 size={20} />
                  </button>
                </div>

                {/* Title */}
                <h2 className="fontAL font-semibold capitalize text-xl md:text-2xl lg:text-3xl my-5 text-center md:text-left">
                  {mode === "login" ? "Login" : "Sign Up"}
                </h2>

                {/* Candidate / Recruiter buttons */}
                <div className="flex gap-3 mb-6 justify-center md:justify-start">
                  {/* Candidates Button */}
                  <button
                    type="button"
                    onClick={() => setUserType("candidates")}
                    className={`relative w-32 h-9 overflow-hidden group rounded-lg active:scale-90 transition-all ease-out duration-700 flex items-center justify-center border
                ${
                  userType === "candidates"
                    ? "bg-[#72B76A] text-white border-[#72B76A]"
                    : "bg-transparent text-[#72B76A] border-[#72B76A] hover:bg-[#72B76A] hover:text-white"
                }`}
                  >
                    <span className="absolute right-0 w-10 h-full top-0 transition-all duration-1000 transform translate-x-12 bg-white opacity-10 -skew-x-12 group-hover:-translate-x-24 ease"></span>
                    <span className="relative text-sm font-semibold">
                      Candidates
                    </span>
                  </button>

                  {/* Recruiters Button */}
                  <button
                    type="button"
                    onClick={() => setUserType("recruiter")}
                    className={`relative w-32 h-9 overflow-hidden group rounded-lg active:scale-90 transition-all ease-out duration-700 flex items-center justify-center border
                ${
                  userType === "recruiter"
                    ? "bg-[#72B76A] text-white border-[#72B76A]"
                    : "bg-transparent text-[#72B76A] border-[#72B76A] hover:bg-[#72B76A] hover:text-white"
                }`}
                  >
                    <span className="absolute right-0 w-10 h-full top-0 transition-all duration-1000 transform translate-x-12 bg-white opacity-10 -skew-x-12 group-hover:-translate-x-24 ease"></span>
                    <span className="relative text-sm font-semibold">
                      Recruiters
                    </span>
                  </button>
                </div>

                {/* Inputs */}
                {mode === "signup" ? (
                  <div className="space-y-3">
                    <input
                      type="text"
                      name="fullName"
                      placeholder="Full Name"
                      className="w-full p-2 rounded bg-white text-sm placeholder-slate-400 ring-1 focus:bg-white focus:outline-none ring-gray-300 transition focus:ring-2 focus:ring-[#72B76A]"
                      value={formData.fullName}
                      onChange={handleChange}
                    />
                    <input
                      type="text"
                      name="mobile"
                      placeholder="Mobile Number"
                      className="w-full p-2 rounded bg-white text-sm placeholder-slate-400 ring-1 focus:bg-white focus:outline-none ring-gray-300 transition focus:ring-2 focus:ring-[#72B76A]"
                      value={formData.mobile}
                      onChange={handleChange}
                    />
                    {/* Password */}
                    <div className="relative">
                      <input
                        type={showPassword ? "text" : "password"}
                        name="password"
                        placeholder="Password"
                        className="w-full p-2 rounded bg-white text-sm placeholder-slate-400 ring-1 focus:bg-white focus:outline-none ring-gray-300 transition focus:ring-2 focus:ring-[#72B76A]"
                        value={formData.password}
                        onChange={handleChange}
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword((prev) => !prev)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500"
                      >
                        {showPassword ? <FaEyeSlash /> : <FaEye />}
                      </button>
                    </div>

                    {/* Confirm Password */}
                    <div className="relative">
                      <input
                        type={showConfirmPassword ? "text" : "password"}
                        name="confirmPassword"
                        placeholder="Confirm Password"
                        className="w-full p-2 rounded bg-white text-sm placeholder-slate-400  focus:bg-white focus:outline-none ring-1 ring-gray-300 transition focus:ring-2 focus:ring-[#72B76A]"
                        value={formData.confirmPassword}
                        onChange={handleChange}
                      />
                      <button
                        type="button"
                        onClick={() => setShowConfirmPassword((prev) => !prev)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500"
                      >
                        {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
                      </button>
                    </div>

                    <input
                      type="text"
                      name="otp"
                      placeholder="Enter OTP"
                      className="w-full p-2 rounded bg-white text-sm placeholder-slate-400 ring-1 focus:bg-white focus:outline-none  ring-gray-300 transition focus:ring-2 focus:ring-[#72B76A]"
                      value={formData.otp}
                      onChange={handleChange}
                    />
                  </div>
                ) : (
                  <div className="space-y-3">
                    <input
                      type="text"
                      name="username"
                      placeholder="Username"
                      className="w-full p-2 rounded bg-white text-sm placeholder-slate-400 ring-1 ring-gray-300 focus:bg-white focus:outline-none transition focus:ring-2 focus:ring-[#72B76A]"
                      value={formData.username}
                      onChange={handleChange}
                    />
                    <div className="relative">
                      <input
                        type={showPassword ? "text" : "password"}
                        name="password"
                        placeholder="Password"
                        className="w-full p-2 rounded bg-white text-sm focus:bg-white focus:outline-none placeholder-slate-400 ring-1 ring-gray-300 transition focus:ring-2 focus:ring-[#72B76A]"
                        value={formData.password}
                        onChange={handleChange}
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword((prev) => !prev)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500"
                      >
                        {showPassword ? <FaEyeSlash /> : <FaEye />}
                      </button>
                    </div>
                  </div>
                )}

                {/* Action Button */}
                <div className="flex justify-center">
                  <button
                    type="submit"
                    className="relative mt-6 w-32 h-10 overflow-hidden group border border-[#72B76A] bg-[#72B76A] rounded-lg hover:bg-transparent text-white hover:text-[#72B76A] active:scale-90 transition-all ease-out duration-700 cursor-pointer flex items-center justify-center"
                  >
                    <span className="absolute right-0 w-10 h-full top-0 transition-all duration-1000 transform translate-x-12 bg-white opacity-10 -skew-x-12 group-hover:-translate-x-24 ease"></span>
                    <span className="relative flex gap-2 items-center text-sm font-semibold">
                      {mode === "login" ? "Login" : "Sign Up"}
                    </span>
                  </button>
                </div>

                {/* Toggle SignUp / Login */}
                <p className="mt-5 text-center text-sm text-gray-600">
                  {mode === "login" ? (
                    <>
                      Don’t have an account?{" "}
                      <button
                        type="button"
                        className="text-[#72B76A] font-bold underline"
                        onClick={() => setMode("signup")}
                      >
                        Sign up
                      </button>
                    </>
                  ) : (
                    <>
                      Already have an account?{" "}
                      <button
                        type="button"
                        className="text-[#72B76A] font-bold underline"
                        onClick={() => setMode("login")}
                      >
                        Log in
                      </button>
                    </>
                  )}
                </p>
              </form>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Header;
