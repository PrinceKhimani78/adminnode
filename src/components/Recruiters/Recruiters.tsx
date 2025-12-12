"use client";
import React, { useState } from "react";
import Image from "next/image";
import Footer from "../Footer/Footer";
import { useInView } from "react-intersection-observer";
import { Typewriter } from "react-simple-typewriter";
import "swiper/css";
import Testimonials from "../Testimonials/Testimonials";
import CountUp from "react-countup";

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
          <span className="mt-0.5 inline-flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-[#881A2D]">
            <CheckIcon className="h-4 w-4 text-white" />
          </span>
          <span className="font-semibold text-[12px] text-gray-700 ">
            {text}
          </span>
        </li>
      ))}
    </ul>
  );
};
const Recruiters = () => {
  type Crumb = { name: string; href?: string };
  const crumbs: Crumb[] = [{ name: "Home", href: "/" }, { name: "Recruiters" }];
  const [jobTyperRef, jobTyperSeen] = useInView({
    triggerOnce: true,
    threshold: 0.2,
  });
  // Toggle
  const [plan, setPlan] = useState<"monthly" | "annual">("monthly");

  // In-view to trigger counters only when visible
  const { ref: gridRef, inView } = useInView({
    triggerOnce: false,
    threshold: 0.2,
  });

  // Animated check / cross icons (unchanged)
  function CheckIcon(props: React.SVGProps<SVGSVGElement>) {
    return (
      <svg
        viewBox="0 0 24 24"
        className="h-9 w-9 text-blue-600 flex-none"
        aria-hidden="true"
        {...props}
      >
        <path
          d="M9 12.75 11.25 15 15 9.75"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    );
  }
  function CrossIcon(props: React.SVGProps<SVGSVGElement>) {
    return (
      <svg
        viewBox="0 0 24 24"
        className="h-5 w-5 text-slate-300 flex-none"
        aria-hidden="true"
        {...props}
      >
        <path
          d="M6 6l12 12M18 6L6 18"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    );
  }

  const Feature: React.FC<{ ok?: boolean; children: React.ReactNode }> = ({
    ok,
    children,
  }) => (
    <li
      className={`flex items-center gap-3 text-sm ${
        ok ? "" : "text-slate-400"
      }`}
    >
      {ok ? <CheckIcon /> : <CrossIcon />}
      <span>{children}</span>
    </li>
  );

  // Prices
  const PRICES = {
    monthly: { basic: 90, standard: 248, extended: 499 },
    annual: { basic: 149, standard: 449, extended: 1499 },
  } as const;

  //counter
  const AnimatedPrice: React.FC<{
    amount: number;
    shouldAnimate: boolean;
    k: string;
  }> = ({ amount, shouldAnimate, k }) => (
    <CountUp
      key={`${k}-${amount}-${shouldAnimate}-${plan}`} // re-animate on plan change
      start={0}
      end={shouldAnimate ? amount : 0}
      duration={5.5}
      separator=","
    />
  );

  return (
    <>
      {/*  banner  */}
      <section className="relative overflow-hidden">
        <div className="h-[220px] lg:h-[350px] bg-[url('/images/RI_banner_bg.webp')] bg-cover bg-center bg-no-repeat bg-fixed" />
        <div className="absolute inset-0 flex h-[220px] lg:h-[350px] place-items-end  justify-center px-5 lg:px-[5%] 2xl:px-[10%]">
          <div className="max-w-screen-xl w-full text-center">
            <h1 className="inline-block mb-4 px-4 py-2 text-slate-900  sm:text-xl fontAL font-semibold capitalize text-2xl md:text-3xl lg:text-4xl mt-5">
              Recruiters
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
      {/* main content  */}
      {/* How It Works  */}
      <section className="section-container md:pt-12 2xl:pt-[5%] grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-14">
        {/* left side */}
        <div className="flex flex-col gap-4 pr-6 md:pr-10 lg:pr-16 pt-6 md:pt-10 lg:pt-16 pb-6 md:pb-10 lg:pb-16">
          <p className="fontPOP text-[#881A2D] text-xs sm:text-sm">
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

        {/* ✅ right side */}
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
                                    isLeftCol ? "md:hover:-translate-x-2" : ""
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
      {/* pricing section  */}
      <section className="section-container px-5 lg:px-[5%] 2xl:px-[15%] pt-10 pb-5">
        <div className="">
          <p
            className="fontPOP text-[#00c9ff] text-xs sm:text-sm"
            style={{
              letterSpacing: "1px",
              lineHeight: 1.3,
            }}
          >
            Choose Your Plan
          </p>

          <p
            className="fontAL font-semibold capitalize text-2xl md:text-3xl lg:text-4xl my-5"
            style={{
              letterSpacing: "1px",
              wordSpacing: "2px",
              lineHeight: 1.2,
            }}
          >
            Save up to{" "}
            <span className="inline-block">
              <CountUp end={10} duration={1.2} />%
            </span>
          </p>

          <div className="inline-flex rounded-full overflow-hidden border border-[#00c9ff]">
            <button
              onClick={() => setPlan("monthly")}
              aria-pressed={plan === "monthly"}
              className={`px-5 py-2 text-sm font-semibold transition ${
                plan === "monthly"
                  ? "bg-[#00c9ff] text-white"
                  : "bg-transparent text-[#00c9ff]"
              }`}
            >
              Monthly
            </button>

            <button
              onClick={() => setPlan("annual")}
              aria-pressed={plan === "annual"}
              className={`px-5 py-2 text-sm font-semibold transition ${
                plan === "annual"
                  ? "bg-[#00c9ff] text-white"
                  : "bg-transparent text-[#00c9ff]"
              }`}
            >
              Annual
            </button>
          </div>

          {/* PRICING CARDS */}
          <div className="mt-10" ref={gridRef}>
            {/* monthly */}
            {plan === "monthly" && (
              <div className="grid gap-8 md:grid-cols-3">
                {/* Basic */}
                <div className="relative rounded-2xl bg-white p-6 shadow-[0_12px_40px_-18px_rgba(29,78,216,0.25)] ring-1 ring-slate-100 overflow-hidden flex flex-col">
                  <div className="absolute -top-25 right-5 h-55 w-100 bg-slate-100 rounded-[90%]" />
                  <h3 className="text-[#00c9ff] font-semibold pl-10 relative z-10">
                    Basic
                  </h3>
                  <div className="mt-3 flex items-end gap-2 pl-10 relative z-10">
                    <span className="text-4xl font-extrabold">
                      $
                      <AnimatedPrice
                        amount={PRICES.monthly.basic}
                        shouldAnimate={inView}
                        k="m-basic"
                      />
                    </span>
                    <span className="text-2xl font-extrabold">/</span>
                    <span className="text-slate-700 font-semibold">
                      Monthly
                    </span>
                  </div>

                  <div className="flex-1 flex items-center pl-13">
                    <ul className="mt-8 w-full space-y-8 text-slate-700 relative z-10">
                      <Feature ok>1 job posting</Feature>
                      <Feature>0 featured job</Feature>
                      <Feature>job displayed fo 20 days</Feature>
                      <Feature>Premium support 24/7</Feature>
                    </ul>
                  </div>
                  <div className="flex justify-center">
                    <button className="relative mt-8 px-4 h-9 overflow-hidden group border border-[#00c9ff] bg-[#00c9ff] rounded-lg from-gray-700/50 to-black hover:bg-transparent text-white hover:text-[#00c9ff] active:scale-90 transition-all ease-out duration-700 cursor-pointer">
                      <span className="absolute right-0 w-10 h-full top-0 transition-all duration-1000 transform translate-x-12 bg-white opacity-10 -skew-x-12 group-hover:-translate-x-24 ease"></span>
                      <span className="relative flex gap-2 items-center text-sm font-semibold">
                        Purchase&nbsp;Now
                      </span>
                    </button>
                  </div>
                </div>

                {/* Standard (Recommended) */}
                <div className="relative rounded-2xl bg-white p-6 shadow-[0_12px_40px_-18px_rgba(29,78,216,0.25)] ring-1 ring-slate-100 overflow-hidden flex flex-col">
                  <span className="absolute right-4 top-4 rounded-full bg-emerald-500 px-3 py-1 text-xs font-semibold text-white z-20">
                    Recommended
                  </span>
                  <div className="absolute -top-25 right-5 h-55 w-100 bg-red-50 rounded-[90%]" />
                  <h3 className="text-[#00c9ff] font-semibold relative z-10 pl-10">
                    Standard
                  </h3>
                  <div className="mt-3 flex items-end gap-2 pl-10 relative z-10">
                    <span className="text-4xl font-extrabold">
                      $
                      <AnimatedPrice
                        amount={PRICES.monthly.standard}
                        shouldAnimate={inView}
                        k="m-standard"
                      />
                    </span>
                    <span className="text-2xl font-extrabold">/</span>
                    <span className="text-slate-700 font-semibold">
                      Monthly
                    </span>
                  </div>
                  <div className="flex-1 flex items-center pl-13">
                    <ul className="mt-8 space-y-4 text-slate-700 relative z-10">
                      <Feature ok>1 job posting</Feature>
                      <Feature ok>0 featured job</Feature>
                      <Feature ok>job displayed fo 20 days</Feature>
                      <Feature>Premium support 24/7</Feature>
                    </ul>
                  </div>
                  <div className="flex justify-center">
                    <button className="relative mt-8 px-4 h-9 overflow-hidden group border border-[#00c9ff] bg-[#00c9ff] rounded-lg from-gray-700/50 to-black hover:bg-transparent text-white hover:text-[#00c9ff] active:scale-90 transition-all ease-out duration-700 cursor-pointer">
                      <span className="absolute right-0 w-10 h-full top-0 transition-all duration-1000 transform translate-x-12 bg-white opacity-10 -skew-x-12 group-hover:-translate-x-24 ease"></span>
                      <span className="relative flex gap-2 items-center text-sm font-semibold">
                        Purchase&nbsp;Now
                      </span>
                    </button>
                  </div>
                </div>

                {/* Extended */}
                <div className="relative rounded-2xl bg-white p-6 shadow-[0_12px_40px_-18px_rgba(29,78,216,0.25)] ring-1 ring-slate-100 overflow-hidden flex flex-col">
                  <div className="absolute -top-25 right-5 h-55 w-100 bg-violet-100 rounded-[90%]" />
                  <h3 className="text-[#00c9ff] font-semibold relative z-10 pl-10">
                    Extended
                  </h3>
                  <div className="mt-3 flex items-end gap-2 relative z-10 pl-10">
                    <span className="text-4xl font-extrabold">
                      $
                      <AnimatedPrice
                        amount={PRICES.monthly.extended}
                        shouldAnimate={inView}
                        k="m-extended"
                      />
                    </span>
                    <span className="text-2xl font-extrabold">/</span>
                    <span className="text-slate-700 font-semibold">
                      Monthly
                    </span>
                  </div>
                  <div className="flex-1 flex items-center pl-13">
                    <ul className="mt-8 space-y-4 text-slate-700 relative z-10">
                      <Feature ok>1 job posting</Feature>
                      <Feature ok>0 featured job</Feature>
                      <Feature ok>job displayed fo 20 days</Feature>
                      <Feature ok>Premium support 24/7</Feature>
                    </ul>
                  </div>
                  <div className="flex justify-center">
                    <button className="relative mt-8 px-4 h-9 overflow-hidden group border border-[#00c9ff] bg-[#00c9ff] rounded-lg from-gray-700/50 to-black hover:bg-transparent text-white hover:text-[#00c9ff] active:scale-90 transition-all ease-out duration-700 cursor-pointer">
                      <span className="absolute right-0 w-10 h-full top-0 transition-all duration-1000 transform translate-x-12 bg-white opacity-10 -skew-x-12 group-hover:-translate-x-24 ease"></span>
                      <span className="relative flex gap-2 items-center text-sm font-semibold">
                        Purchase&nbsp;Now
                      </span>
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* annual */}
            {plan === "annual" && (
              <div className="grid gap-8 md:grid-cols-3">
                {/* Basic */}
                <div className="relative rounded-2xl bg-white p-6 shadow-[0_12px_40px_-18px_rgba(29,78,216,0.25)] ring-1 ring-slate-100 overflow-hidden">
                  <div className="absolute -top-25 right-5 h-55 w-100 bg-slate-100 rounded-[90%]" />
                  <h3 className="text-[#00c9ff] font-semibold relative pl-10 z-10">
                    Basic
                  </h3>
                  <div className="mt-3 flex items-end gap-2 pl-10 relative z-10">
                    <span className="text-4xl font-extrabold">
                      $
                      <AnimatedPrice
                        amount={PRICES.annual.basic}
                        shouldAnimate={inView}
                        k="a-basic"
                      />
                    </span>
                    <span className="text-2xl font-extrabold">/</span>
                    <span className="text-slate-700 font-semibold">year</span>
                  </div>
                  <div className="flex-1 flex items-center pl-13">
                    <ul className="mt-8 space-y-8 text-slate-700 relative z-10">
                      <Feature ok>1 job posting</Feature>
                      <Feature>0 featured job</Feature>
                      <Feature>job displayed fo 20 days</Feature>
                      <Feature>Premium support 24/7</Feature>
                    </ul>
                  </div>
                  <div className="flex justify-center">
                    <button className="relative mt-8 px-4 h-9 overflow-hidden group border border-[#00c9ff] bg-[#00c9ff] rounded-lg from-gray-700/50 to-black hover:bg-transparent text-white hover:text-[#00c9ff] active:scale-90 transition-all ease-out duration-700 cursor-pointer">
                      <span className="absolute right-0 w-10 h-full top-0 transition-all duration-1000 transform translate-x-12 bg-white opacity-10 -skew-x-12 group-hover:-translate-x-24 ease"></span>
                      <span className="relative flex gap-2 items-center text-sm font-semibold">
                        Purchase&nbsp;Now
                      </span>
                    </button>
                  </div>
                </div>

                {/* Standard */}
                <div className="relative rounded-2xl bg-white p-6 shadow-[0_12px_40px_-18px_rgba(29,78,216,0.25)] ring-1 ring-slate-100 overflow-hidden">
                  <span className="absolute right-4 top-4 rounded-full bg-[#72b76a] px-3 py-1 text-xs font-semibold text-white z-20">
                    Recommended
                  </span>
                  <div className="absolute -top-25 right-5 h-55 w-100 bg-red-50 rounded-[90%]" />
                  <h3 className="text-[#00c9ff] font-semibold relative pl-10 z-10">
                    Standard
                  </h3>
                  <div className="mt-3 flex items-end gap-2 pl-10 relative z-10">
                    <span className="text-4xl font-extrabold">
                      $
                      <AnimatedPrice
                        amount={PRICES.annual.standard}
                        shouldAnimate={inView}
                        k="a-standard"
                      />
                    </span>
                    <span className="text-2xl font-extrabold">/</span>
                    <span className="text-slate-700 font-semibold">year</span>
                  </div>
                  <div className="flex-1 flex items-center pl-13">
                    <ul className="mt-8 space-y-4 text-slate-700 relative z-10">
                      <Feature ok>1 job posting</Feature>
                      <Feature ok>0 featured job</Feature>
                      <Feature ok>job displayed fo 20 days</Feature>
                      <Feature>Premium support 24/7</Feature>
                    </ul>
                  </div>

                  <div className="flex justify-center">
                    <button className="relative mt-8 px-4 h-9 overflow-hidden group border border-[#00c9ff] bg-[#00c9ff] rounded-lg from-gray-700/50 to-black hover:bg-transparent text-white hover:text-[#00c9ff] active:scale-90 transition-all ease-out duration-700 cursor-pointer">
                      <span className="absolute right-0 w-10 h-full top-0 transition-all duration-1000 transform translate-x-12 bg-white opacity-10 -skew-x-12 group-hover:-translate-x-24 ease"></span>
                      <span className="relative flex gap-2 items-center text-sm font-semibold">
                        Purchase&nbsp; Now
                      </span>
                    </button>
                  </div>
                </div>

                {/* Extended */}
                <div className="relative rounded-2xl bg-white p-6 shadow-[0_12px_40px_-18px_rgba(29,78,216,0.25)] ring-1 ring-slate-100 overflow-hidden">
                  <div className="absolute -top-25 right-5 h-55 w-100 bg-violet-100 rounded-[90%]" />
                  <h3 className="text-[#00c9ff] font-semibold pl-10 relative z-10">
                    Extended
                  </h3>
                  <div className="mt-3 flex items-end gap-2 pl-10 relative z-10">
                    <span className="text-4xl font-extrabold">
                      $
                      <AnimatedPrice
                        amount={PRICES.annual.extended}
                        shouldAnimate={inView}
                        k="a-extended"
                      />
                    </span>
                    <span className="text-2xl font-extrabold">/</span>
                    <span className="text-slate-700 font-semibold">year</span>
                  </div>
                  <div className="flex-1 flex items-center pl-13">
                    <ul className="mt-8 space-y-4 text-slate-700 relative z-10">
                      <Feature ok>1 job posting</Feature>
                      <Feature ok>0 featured job</Feature>
                      <Feature ok>job displayed fo 20 days</Feature>
                      <Feature ok>Premium support 24/7</Feature>
                    </ul>
                  </div>
                  <div className="flex justify-center">
                    <button className="relative mt-8 px-4 h-9 overflow-hidden group border border-[#00c9ff] bg-[#00c9ff] rounded-lg from-gray-700/50 to-black hover:bg-transparent text-white hover:text-[#00c9ff] active:scale-90 transition-all ease-out duration-700 cursor-pointer">
                      <span className="absolute right-0 w-10 h-full top-0 transition-all duration-1000 transform translate-x-12 bg-white opacity-10 -skew-x-12 group-hover:-translate-x-24 ease"></span>
                      <span className="relative flex gap-2 items-center text-sm font-semibold">
                        Purchase&nbsp;Now
                      </span>
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* View More button */}
      {/* <div className="flex justify-center ">
        <a
          href="/pages/pricing"
          className="relative px-6 h-10 overflow-hidden group border border-[#00c9ff] bg-[#00c9ff] rounded-lg hover:bg-transparent text-white hover:text-[#00c9ff] active:scale-90 transition-all ease-out duration-700 cursor-pointer flex items-center justify-center"
        >
          <span className="absolute right-0 w-10 h-full top-0 transition-all duration-1000 transform translate-x-12 bg-white opacity-10 -skew-x-12 group-hover:-translate-x-24 ease"></span>
          <span className="relative flex gap-2 items-center text-sm font-semibold">
            View More
          </span>
        </a>
      </div> */}
      {/* View More button */}
      <div className="flex justify-center">
        <a
          href="/pages/pricing"
          className="relative px-6 h-10 overflow-hidden group border border-[#00c9ff] bg-transparent text-[#00c9ff] rounded-lg hover:bg-[#00c9ff] hover:text-white active:scale-90 transition-all ease-out duration-700 cursor-pointer flex items-center justify-center"
        >
          {/* Sliding Overlay Effect */}
          <span className="absolute left-0 w-0 h-full top-0 bg-[#00c9ff] transition-all duration-700 ease-out group-hover:w-full"></span>

          {/* Button Text */}
          <span className="relative flex gap-2 items-center text-sm font-semibold z-10">
            View More
          </span>
        </a>
      </div>

      {/* Testimonials */}
      <div className="recruiter-testimonials">
        <Testimonials />
      </div>
      {/* <Footer /> */}
    </>
  );
};

export default Recruiters;
