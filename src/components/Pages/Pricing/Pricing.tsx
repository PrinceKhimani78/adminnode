"use client";
import Footer from "@/components/Footer/Footer";
import React, { useState } from "react";
import CountUp from "react-countup";
import { useInView } from "react-intersection-observer";

const Pricing = () => {
  // Breadcrumbs
  type Crumb = { name: string; href?: string };
  const crumbs: Crumb[] = [{ name: "Home", href: "/" }, { name: "Pricing" }];

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
              Pricing Plans
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

      {/* main content */}
      <section className="px-5 lg:px-[5%] 2xl:px-[15%] pt-10 pb-20">
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

          {/* <p className="text-blue-600 tracking-tight">Choose Your Plan</p>

          <h2 className="text-[40px] sm:text-5xl font-extrabold leading-[1.1] text-slate-900">
            Save up to{" "}
            <span className="inline-block">
              <CountUp end={10} duration={1.2} />%
            </span>
          </h2> */}

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
                  <h3 className="text-blue-700 font-semibold relative pl-10 z-10">
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
                  <button className="relative mt-8 px-4 h-9 overflow-hidden group border border-[#00c9ff] bg-[#00c9ff] rounded-lg from-gray-700/50 to-black hover:bg-transparent text-white hover:text-[#00c9ff] active:scale-90 transition-all ease-out duration-700 cursor-pointer">
                    <span className="absolute right-0 w-10 h-full top-0 transition-all duration-1000 transform translate-x-12 bg-white opacity-10 -skew-x-12 group-hover:-translate-x-24 ease"></span>
                    <span className="relative flex gap-2 items-center text-sm font-semibold">
                      See&nbsp;More
                    </span>
                  </button>
                </div>

                {/* Standard */}
                <div className="relative rounded-2xl bg-white p-6 shadow-[0_12px_40px_-18px_rgba(29,78,216,0.25)] ring-1 ring-slate-100 overflow-hidden">
                  <span className="absolute right-4 top-4 rounded-full bg-[#72b76a] px-3 py-1 text-xs font-semibold text-white z-20">
                    Recommended
                  </span>
                  <div className="absolute -top-25 right-5 h-55 w-100 bg-red-50 rounded-[90%]" />
                  <h3 className="text-blue-700 font-semibold relative pl-10 z-10">
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
                        Purchase&nbsp;Now
                      </span>
                    </button>
                  </div>
                </div>

                {/* Extended */}
                <div className="relative rounded-2xl bg-white p-6 shadow-[0_12px_40px_-18px_rgba(29,78,216,0.25)] ring-1 ring-slate-100 overflow-hidden">
                  <div className="absolute -top-25 right-5 h-55 w-100 bg-violet-100 rounded-[90%]" />
                  <h3 className="text-blue-700 font-semibold pl-10 relative z-10">
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

      <Footer />
    </>
  );
};

export default Pricing;
