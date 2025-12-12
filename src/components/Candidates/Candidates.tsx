"use client";
import React from "react";
import Image from "next/image";
import Footer from "../Footer/Footer";
import Link from "next/link";
import "swiper/css";
import { useInView } from "react-intersection-observer";
import { Typewriter } from "react-simple-typewriter";
import Testimonials from "../Testimonials/Testimonials";
import { motion } from "framer-motion";
// import { FaStarHalfAlt, FaRegStar } from "react-icons/fa";
type FeatureListProps = {
  items: string[];
  className?: string;
};
const CheckIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg
    className={className}
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 20 20"
    fill="currentColor"
    aria-hidden="true"
  >
    <path
      fillRule="evenodd"
      d="M16.707 5.293a1 1 0 0 1 0 1.414l-7.25 7.25a1 1 0 0 1-1.414 0l-3-3a1 1 0 1 1 1.414-1.414l2.293 2.293 6.543-6.543a1 1 0 0 1 1.414 0Z"
      clipRule="evenodd"
    />
  </svg>
);
const FeatureList: React.FC<FeatureListProps> = ({ items, className = "" }) => {
  return (
    <ul className={`space-y-2 ${className}`}>
      {items.map((text, i) => (
        <li key={i} className="flex items-center gap-3">
          <span className="mt-0.5 inline-flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-[#FFCC23]">
            <CheckIcon className="h-4 w-4 text-white" />
          </span>
          <span className="font-semibold text-[12px] text-gray-700 align-middle ">
            {text}
          </span>
        </li>
      ))}
    </ul>
  );
};
const Candidates = () => {
  type Crumb = { name: string; href?: string };
  const crumbs: Crumb[] = [
    { name: "Home", href: "/" },
    { name: "Candidates", href: "/candidates" },
  ];
  const [jobTyperRef, jobTyperSeen] = useInView({
    triggerOnce: true,
    threshold: 0.2,
  });
  return (
    <>
      {/* banner */}
      <section className="relative overflow-hidden">
        <div className="h-[220px] lg:h-[350px] bg-[url('/images/RI_banner_bg.webp')] bg-cover bg-center bg-no-repeat bg-fixed" />
        <div className="absolute inset-0 flex h-[220px] lg:h-[350px] place-items-end  justify-center px-5 lg:px-[5%] 2xl:px-[10%]">
          <div className="max-w-screen-xl w-full text-center">
            <h1 className="inline-block mb-4 px-4 py-2 text-slate-900  sm:text-xl fontAL font-semibold capitalize text-2xl md:text-3xl lg:text-4xl mt-5">
              Candidates
            </h1>
            {/* Breadcrumbs */}
            <nav
              aria-label="Breadcrumb"
              className="mb-6 text-sm text-slate-700"
            >
              <ol className="flex items-center justify-center gap-2">
                {crumbs.map((c, i) => {
                  const isLast = i === crumbs.length - 0;
                  return (
                    <li key={c.name} className="flex items-center gap-2">
                      {i > 0 && (
                        <svg
                          viewBox="0 0 20 20"
                          fill="currentColor"
                          className="w-4 h-4 text-slate-400"
                          aria-hidden="true"
                        >
                          <path d="M7.05 4.55a1 1 0 0 1 1.4 0l4 4a1 1 0 0 1 0 1.4l-4 4a1 1 0 1 1-1.4-1.4L9.88 10 7.05 7.15a1 1 0 0 1 0-1.4z" />
                        </svg>
                      )}
                      {isLast || !c.href ? (
                        <span className=" fontPOP text-xs sm:text-sm">
                          {c.name}
                        </span>
                      ) : (
                        <a
                          href={c.href}
                          className="hover:text-slate-900 fontPOP text-xs sm:text-sm"
                        >
                          {c.name}
                        </a>
                      )}
                    </li>
                  );
                })}
              </ol>
            </nav>
          </div>
        </div>
      </section>
      {/* How It Works  */}
      <section className="section-container md:pt-12 2xl:pt-[5%] grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-14">
        {/* left side */}
        <div className="flex flex-col gap-4 pr-6 md:pr-10 lg:pr-16 pt-6 md:pt-10 lg:pt-16 pb-6 md:pb-10 lg:pb-16">
          <p className="fontPOP text-[#FFCC23] text-xs sm:text-sm">
            How It Works
          </p>
          <p
            className="fontAL font-semibold capitalize text-2xl md:text-3xl lg:text-4xl max-w-[500px] min-h-10"
            style={{
              letterSpacing: "1px",
              wordSpacing: "2px",
              lineHeight: 1.2,
            }}
            ref={jobTyperRef}
          >
            {jobTyperSeen && (
              <Typewriter
                words={["Follow our steps we will help you."]}
                typeSpeed={90}
                deleteSpeed={0}
                delaySpeed={800}
                cursor={false}
                loop={1}
              />
            )}
          </p>
          <div className="mt-2">
            <FeatureList
              items={[
                "Trusted & Quality Job",
                "International Job",
                "No Extra Charge",
                "Top Companies",
              ]}
            />
          </div>
        </div>

        {/* right side  */}
        <div className="grid flex-1 grid-cols-1 sm:grid-cols-1 md:grid-cols-2 gap-10 md:gap-14 lg:gap-16">
          {[
            {
              no: "01",
              bg: "bg-[#00c9ff]/40",
              num: "text-[#00c9ff]",
              icon: "/images/icon1webp",
              titleTop: "Register",
              titleBottom: "Your Account",
              offset: "sm:translate-y-0",
              glow: "shadow-[0_30px_60px_rgba(24,39,75,0.12)]",
              badgeGlow: "shadow-[0_15px_45px_rgba(59,130,246,0.35)]",
            },
            {
              no: "02",
              bg: "bg-[#ffcc23]/50",
              num: "text-[#ffcc23]",
              icon: "/images/icon2webp",
              titleTop: "Search",
              titleBottom: "Your Job",
              offset: "sm:-translate-y-6",
              glow: "shadow-[0_30px_60px_rgba(139,99,0,0.12)]",
              badgeGlow: "shadow-[0_15px_45px_rgba(245,158,11,0.35)]",
            },
            {
              no: "03",
              bg: "bg-[#ae70bb]/60",
              num: "text-[#ae70bb]",
              icon: "/images/icon3webp",
              titleTop: "Apply",
              titleBottom: "For Dream Job",
              offset: "sm:-translate-y-2",
              glow: "shadow-[0_30px_60px_rgba(86,40,110,0.14)]",
              badgeGlow: "shadow-[0_15px_45px_rgba(168,85,247,0.35)]",
            },
            {
              no: "04",
              bg: "bg-[#72b76a]/60",
              num: "text-[#72b76a]",
              icon: "/images/icon4webp",
              titleTop: "Upload",
              titleBottom: "Your Resume",
              offset: "sm:translate-y-4",
              glow: "shadow-[0_30px_60px_rgba(10,97,82,0.14)]",
              badgeGlow: "shadow-[0_15px_45px_rgba(45,212,191,0.35)]",
            },
          ].map((c, i) => {
            const isLeftCol = i % 2 === 0;
            return (
              <div
                key={c.no}
                className={`group relative rounded-2xl ${c.bg} p-6 ${c.glow} ${
                  c.offset
                }
                                         transition-all duration-300 ease-out will-change-transform
                                         hover:-translate-y-1 hover:shadow-xl
                                         ${
                                           isLeftCol
                                             ? "md:hover:-translate-x-2"
                                             : ""
                                         }`}
              >
                {/* floating white badge */}
                <div
                  className={`absolute
        -left-2 -top-3           /* base (mobile <640px) */
         sm:-left-4 sm:-top-4     /* ≥640px */
         md:-left-6 md:-top-5     /* ≥768px */
         lg:-left-7 lg:-top-7     /* ≥1024px */
         xl:-left-8 xl:-top-8     /* ≥1280px */
         2xl:-left-10 2xl:-top-10 /* ≥1536px */
           flex 
           h-16 w-16         /* base (mobile <640px) */
           sm:h-14 sm:w-14   /* ≥640px */
           md:h-16 md:w-16   /* ≥768px */
           lg:h-16 lg:w-16   /* ≥1024px */
           xl:h-18 xl:w-18   /* ≥1280px */
           2xl:h-20 2xl:w-20 /* ≥1536px */
           items-center justify-center
           rounded-2xl bg-white ${c.badgeGlow}
           transition-transform duration-300 group-hover:scale-105`}
                >
                  <Image
                    src={c.icon}
                    alt={`step-${c.no}`}
                    width={28}
                    height={28}
                    className="w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 lg:w-9 lg:h-9 xl:w-10 xl:h-10 2xl:w-12 2xl:h-12"
                  />
                </div>
                <span
                  className={`absolute right-3 top-2 select-none
           text-5xl           /* base (mobile <640px) */
           sm:text-xl        /* ≥640px */
           md:text-3xl        /* ≥768px */
           lg:text-4xl        /* ≥1024px */
           xl:text-5xl        /* ≥1280px */
           2xl:text-6xl       /* ≥1536px big screens */
           font-extrabold ${c.num}
           transition-opacity duration-300 group-hover:opacity-90`}
                >
                  {c.no}
                </span>
                <h4
                  className="mt-8 mb-2  sm:mt-6 
         text-xl        /* mobile default */
         sm:text-sm   /* ≥640px */
         md:text-sm     /* ≥768px */
         lg:text-lg     /* ≥1024px */
         xl:text-xl     /* ≥1280px */
         font-semibold text-[#17171d]"
                >
                  {c.titleTop} <br className="hidden sm:block" />{" "}
                  {c.titleBottom}
                </h4>
                <p
                  className="
           text-[13px] leading-6        /* base (mobile <640px) */
           sm:text-xs sm:leading-6      /* small screens ≥640px */
           md:text-[11px] md:leading-4  /* tablets ≥768px */
           lg:text-sm lg:leading-5      /* laptops ≥1024px */
           xl:text-sm xl:leading-6    /* desktops ≥1280px */
           text-black/70
         "
                >
                  You need to create an account to find the best and preferred
                  job.
                </p>
              </div>
            );
          })}
        </div>
      </section>
      {/* call to action  */}
      <section className="px-4 sm:px-6 lg:px-[5%] 2xl:px-[15%] my-10">
        {/* defs for the bite */}
        <svg aria-hidden="true" className="absolute w-0 h-0">
          <defs>
            {/* Right-edge concave bite; tweak 0.88 for depth (smaller = deeper) */}
            <clipPath id="ctaBiteRight" clipPathUnits="objectBoundingBox">
              <path d="M0,0 H0.88 Q1,0.50 0.88,1 H0 Z" />
            </clipPath>
          </defs>
        </svg>
        {/* Animate the full yellow card */}
        <motion.div
          initial={{ opacity: 0, y: 100 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1.5, ease: "easeOut" }}
          className="max-w-screen-xl mx-auto bg-gradient-to-r from-[#FFCC23]/80 to-[#FFCC23]/40 
     rounded-xl text-gray-900 shadow-lg grid grid-cols-1 lg:grid-cols-2 gap-6 items-center"
        >
          {/* Left Side - Wider white content box */}
          <div
            className="relative px-8 ml-10 md:p-12 z-10 text-center lg:text-left 
             bg-white rounded-l-xl overflow-hidden lg:w-[120%]"
            style={{
              clipPath: "url(#ctaBiteRight)",
              WebkitClipPath: "url(#ctaBiteRight)", // Safari
            }}
          >
            {/* Content sits above arc */}
            <div className="relative z-10 max-w-lg">
              <h2 className="font-semibold text-2xl md:text-3xl lg:text-4xl text-gray-900 leading-snug">
                Ready To Start Your Career Journey?
              </h2>
              <p className="text-sm md:text-base text-gray-800 mt-5 leading-relaxed max-w-md">
                Create your candidate profile, upload your resume, and apply to
                top companies in just a few clicks. Take the first step towards
                your dream job today! Create your candidate profile, upload your
                resume, and apply to top companies in just a few clicks. Take
                the first step towards your dream job today! Resume, and apply
                to top companies in just a few clicks. Take the first step
                towards your dream job today!
              </p>

              <Link href="/candidates/login">
                <button
                  className="relative mt-4 px-5 h-10 overflow-hidden group border border-[#FFD633] 
             bg-[#FFD633] rounded-lg hover:bg-transparent text-gray-900 hover:text-white 
             active:scale-90 transition-all ease-out duration-700 cursor-pointer"
                >
                  <span
                    className="absolute right-0 w-10 h-full top-0 transition-all duration-1000 transform 
               translate-x-12 bg-black opacity-10 -skew-x-12 group-hover:-translate-x-24 ease"
                  ></span>
                  <span className="relative flex gap-2 items-center text-sm font-semibold">
                    Candidates Login
                  </span>
                </button>
              </Link>
            </div>
          </div>

          {/* Right Side - Illustration with White Circle + Arc */}
          <div className="relative flex justify-center items-center p-8">
            {/* Yellow Arc */}
            <div
              className="hidden lg:block absolute left-[125px] top-[20px] w-[460px] h-[460px] 
                rounded-full border-[40px] border-[#fdeba5] z-0"
            ></div>

            {/* White Circle */}
            <div className="hidden lg:block absolute -right-15 w-[420px] h-[420px] rounded-full bg-white z-0"></div>

            {/* Girl Image */}
            <Image
              src="/images/profilewebp"
              alt="Candidate Illustration"
              width={300}
              height={300}
              className="
      relative z-10 object-contain
      mx-auto                      /* center on mobile */
      left-0 translate-x-0        /* reset mobile offsets */
      sm:mx-0 sm:left-20          /* offsets only from sm and up */
      sm:translate-x-6 sm:-translate-y-2
    "
            />
          </div>
        </motion.div>
      </section>

      {/* Testimonials */}
      <Testimonials />
      {/* <Footer /> */}
    </>
  );
};

export default Candidates;
{
  /* <Link href="/candidates/login">
  <button className="relative mt-4 px-5 h-10 overflow-hidden group border border-[#FFD633] bg-[#FFD633] rounded-lg hover:bg-transparent text-gray-900 hover:text-white active:scale-90 transition-all ease-out duration-700 cursor-pointer">
    <span className="absolute right-0 w-10 h-full top-0 transition-all duration-1000 transform translate-x-12 bg-black opacity-10 -skew-x-12 group-hover:-translate-x-24 ease"></span>
    <span className="relative flex gap-2 items-center text-sm font-semibold">
      Candidates Login
    </span>
  </button>
</Link>; */
}
