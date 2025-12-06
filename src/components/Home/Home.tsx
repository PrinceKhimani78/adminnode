"use client";
import React, { useRef, useState, useEffect, useMemo } from "react";
import "./Home.css";
import CountUp from "react-countup";
import { motion, useAnimationControls } from "framer-motion";
import Link from "next/link";
import { useInView } from "react-intersection-observer";
import { Typewriter } from "react-simple-typewriter";
import dynamic from "next/dynamic";
import "react-multi-carousel/lib/styles.css";
import { FaStar, FaStarHalfAlt, FaRegStar } from "react-icons/fa";

import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import Image from "next/image";
import "swiper/css";
import { FaInstagram, FaPinterest, FaFacebook, FaYahoo } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import Testimonials from "../Testimonials/Testimonials";

const Carousel = dynamic(() => import("react-multi-carousel"), { ssr: false });

/* ============================
    Types
    ============================ */
type ResponsiveMap = Record<
  string,
  { breakpoint: { max: number; min: number }; items: number }
>;

type BlogItem = {
  date: string;
  text: string;
  link: string;
};

// Reuse your FloatingCard shape for social cards
type SocialCard = {
  name: string;
  role: string;
  border: string;
  icon: React.ReactNode;
};

type FloatingCardsAutoProps = {
  cards: SocialCard[];
  sideImageUrl?: string;
  duration?: number; // seconds per full scroll
};

/* ============================
    Video-like Floating Cards (auto-scrolling, pause on hover)
    ============================ */
export function FloatingCardsAuto({
  cards,
  sideImageUrl,
  duration = 20,
}: FloatingCardsAutoProps) {
  const listRef = useRef<HTMLUListElement | null>(null);
  const controls = useAnimationControls();

  // duplicate list for seamless loop
  const doubled = useMemo(() => [...cards, ...cards], [cards]);

  useEffect(() => {
    if (!listRef.current) return;
    const el = listRef.current;

    // measure height of one cycle (half list)
    const cycle = el.scrollHeight / 2;

    controls.start({
      y: [0, -cycle],
      transition: {
        repeat: Infinity,
        ease: "linear",
        duration,
      },
    });
  }, [cards, duration, controls]);

  return (
    <div className="relative w-full flex items-center mt-16 lg:mt-0 min-h-[60vh] lg:min-h-[55vh]">
      {/* Side image */}
      {sideImageUrl && (
        <div
          className="pointer-events-none absolute -right-14 lg:-right-20 top-1/2 -translate-y-1/2 h-[280px] sm:h-[350px] lg:h-[450px] w-[280px] sm:w-[350px] lg:w-[450px] bg-contain bg-no-repeat z-0"
          style={{ backgroundImage: `url('${sideImageUrl}')` }}
        />
      )}

      {/* Floating cards */}
      <div className="relative w-full">
        <div className="lg:sticky lg:top-24 h-[440px] overflow-hidden p-3 sm:p-5 z-10">
          <motion.ul
            ref={listRef}
            animate={controls}
            className="relative flex flex-col items-center gap-5 lg:gap-8 will-change-transform transform-gpu"
          >
            {doubled.map((c, i) => {
              // zig-zag only from lg screens
              const zig =
                i % 2 === 0
                  ? "lg:self-start lg:ml-6 xl:ml-10"
                  : "lg:self-end lg:mr-6 xl:mr-10";

              return (
                <li
                  key={`${c.name}-${i}`}
                  className={`group w-full flex justify-center ${zig}`}
                >
                  <div
                    className={`flex items-center w-[90%] sm:w-[80%] max-w-[380px] px-5 py-3 gap-4 rounded-full
                      backdrop-blur-sm bg-white/70 border-2 ${c.border}
                      shadow-[0_6px_24px_rgba(0,0,0,0.08)]
                      transition-transform duration-300 group-hover:scale-[1.02]`}
                  >
                    {c.icon}
                    <div>
                      <p className="font-semibold text-sm sm:text-lg">
                        {c.role}
                      </p>
                      <p className="text-xs sm:text-sm">{c.name}</p>
                    </div>
                  </div>
                </li>
              );
            })}
          </motion.ul>
        </div>
      </div>
    </div>
  );
}
/* ============================
    Utility: on-screen hook
    ============================ */

export const useOnScreen = (
  options?: IntersectionObserverInit
): [React.MutableRefObject<HTMLDivElement | null>, boolean] => {
  const [isIntersecting, setIsIntersecting] = useState<boolean>(false);
  const ref = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!ref.current) return;

    const observer = new IntersectionObserver(([entry]) => {
      setIsIntersecting(entry.isIntersecting);
    }, options);

    const current = ref.current;
    observer.observe(current);

    return () => {
      observer.unobserve(current);
      observer.disconnect();
    };
  }, [options]);

  return [ref, isIntersecting];
};

const Home = () => {
  // const [scrollPosition, setScrollPosition] = useState(0);
  const [openWhat, setOpenWhat] = useState(false);
  const [openType, setOpenType] = useState(false);

  const [what, setWhat] = useState("Job Title");
  const [type, setType] = useState("All Category");
  const [location, setLocation] = useState("");

  // ✅ Define dropdown options
  const whatOptions = ["Job Title", "Designer", "Developer"];
  const typeOptions = ["All Category", "Designing", "Development", "Marketing"];

  const whatRef = useRef<HTMLDivElement>(null);
  const typeRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (whatRef.current && !whatRef.current.contains(event.target as Node)) {
        setOpenWhat(false);
      }
      if (typeRef.current && !typeRef.current.contains(event.target as Node)) {
        setOpenType(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const renderStars = (rating: number): React.ReactNode[] => {
    const stars: React.ReactNode[] = [];
    for (let i = 1; i <= 5; i++) {
      if (rating >= i) {
        stars.push(<FaStar key={i} className="text-yellow-400" />);
      } else if (rating >= i - 0.5) {
        stars.push(<FaStarHalfAlt key={i} className="text-yellow-400" />);
      } else {
        stars.push(<FaRegStar key={i} className="text-yellow-400" />);
      }
    }
    return stars;
  };

  const [ref, isVisible] = useOnScreen({ threshold: 0.1 });

  const [AboutUs, setAboutUs] = useState(false);
  const sectionRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => setAboutUs(entry.isIntersecting),
      { threshold: 0.1 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  // animations
  const [img1, img1InView] = useInView({ triggerOnce: true, threshold: 0.1 });
  const [img2, img2InView] = useInView({ triggerOnce: true, threshold: 0.1 });
  // const [img3, img3InView] = useInView({ triggerOnce: true, threshold: 0.1 });
  // const [img4, img4InView] = useInView({ triggerOnce: true, threshold: 0.1 });
  // const [img5, img5InView] = useInView({ triggerOnce: true, threshold: 0.1 });
  // const [img6, img6InView] = useInView({ triggerOnce: true, threshold: 0.1 });
  // const [img7, img7InView] = useInView({ triggerOnce: true, threshold: 0.1 });
  // const [img8, img8InView] = useInView({ triggerOnce: true, threshold: 0.1 });
  // const [img9, img9InView] = useInView({ triggerOnce: true, threshold: 0.1 });
  // const [blogIntroRef, blogIntroSeen] = useInView({
  //   triggerOnce: true,
  //   threshold: 0.2,
  // });
  const [jobTyperRef, jobTyperSeen] = useInView({
    triggerOnce: true,
    threshold: 0.2,
  });
  const [placesTyperRef, placesTyperSeen] = useInView({
    triggerOnce: true,
    threshold: 0.2,
  });
  const typewriter1Ref = useRef<HTMLDivElement | null>(null);
  const typewriter2Ref = useRef<HTMLDivElement | null>(null);

  const [showTypewriter1, setShowTypewriter1] = useState(false);
  const [showTypewriter2, setShowTypewriter2] = useState(false);

  // Hook for typewriter1
  useEffect(() => {
    const observer1 = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShowTypewriter1(true);
          observer1.disconnect();
        }
      },
      { threshold: 0.1 }
    );

    if (typewriter1Ref.current) observer1.observe(typewriter1Ref.current);
    return () => observer1.disconnect();
  }, []);

  // Hook for typewriter2
  useEffect(() => {
    const observer2 = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShowTypewriter2(true);
          observer2.disconnect();
        }
      },
      { threshold: 0.1 }
    );

    if (typewriter2Ref.current) observer2.observe(typewriter2Ref.current);
    return () => observer2.disconnect();
  }, []);

  const cardData = [
    {
      id: 1,
      date: "1 day ago",
      btnText: "New",
      btnColor: "#72B76A",
      title: "Lorem1 ipsum dolor sit amet consectetur1",
      desc: "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Temporibus, explicabo ea. Odio!1",
      link: "https://lorem ipsum dolor sit amet.1",
      price: "$23908 /Month",
      footerLink: "Lorem ipsum1",
    },
    {
      id: 2,
      date: "8 day ago",
      btnText: "Lorem1",
      btnColor: "#FFCC23",
      title: "Lorem ipsum dolor sit amet consectetur2",
      desc: "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Temporibus, explicabo ea. Odio!2",
      link: "https://lorem ipsum dolor sit amet.2",
      price: "$23907 /Month",
      footerLink: "Lorem ipsum2",
    },
    {
      id: 3,
      date: "5 day ago",
      btnText: "Lorem3",
      btnColor: "#AE70BB",
      title: "Lorem ipsum dolor sit amet consectetur3",
      desc: "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Temporibus, explicabo ea. Odio!3",
      link: "https://lorem ipsum dolor sit amet.3",
      price: "$23909 /Month",
      footerLink: "Lorem ipsum3",
    },
    {
      id: 4,
      date: "5 day ago",
      btnText: "Lorem4",
      btnColor: "#00C9FF",
      title: "Lorem ipsum dolor sit amet consectetur4",
      desc: "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Temporibus, explicabo ea. Odio!4",
      link: "https://lorem ipsum dolor sit amet.4",
      price: "$24909 /Month",
      footerLink: "Lorem ipsum4",
    },
    {
      id: 5,
      date: "5 day ago",
      btnText: "Lorem5",
      btnColor: "#023052",
      title: "Lorem ipsum dolor sit amet consectetur5",
      desc: "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Temporibus, explicabo ea. Odio!5",
      link: "https://lorem ipsum dolor sit amet.5",
      price: "$25909 /Month",
      footerLink: "Lorem ipsum5",
    },
    {
      id: 6,
      date: "6 day ago",
      btnText: "Lorem6",
      btnColor: "#881A2D",
      title: "Lorem ipsum dolor sit amet consectetur6",
      desc: "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Temporibus, explicabo ea. Odio!6",
      link: "https://lorem ipsum dolor sit amet.6",
      price: "$26909 /Month",
      footerLink: "Lorem ipsum6",
    },
  ];
  const images_companies: string[] = [
    "https://logos-world.net/wp-content/uploads/2024/07/Woolworths-Logo.png",
    "https://1000logos.net/wp-content/uploads/2021/05/SUGAR-Cosmetics-logo.png",
    "https://logos-world.net/wp-content/uploads/2024/07/Woolworths-Logo.png",
    "https://1000logos.net/wp-content/uploads/2021/05/SUGAR-Cosmetics-logo.png",
    "https://logos-world.net/wp-content/uploads/2024/07/Woolworths-Logo.png",
    "https://1000logos.net/wp-content/uploads/2021/05/SUGAR-Cosmetics-logo.png",
    "https://logos-world.net/wp-content/uploads/2024/07/Woolworths-Logo.png",
  ];
  void images_companies;

  const responsive_companies: ResponsiveMap = {
    "2xl": {
      breakpoint: { max: 4000, min: 1536 },
      items: 6,
    },
    xl: {
      breakpoint: { max: 1535, min: 1280 },
      items: 5,
    },
    lg: {
      breakpoint: { max: 1279, min: 1024 },
      items: 4,
    },
    md: {
      breakpoint: { max: 1023, min: 768 },
      items: 4,
    },
    sm: {
      breakpoint: { max: 767, min: 640 },
      items: 3,
    },
    xs: {
      breakpoint: { max: 639, min: 0 },
      items: 2,
    },
  };

  void responsive_companies;

  type Testimonial = {
    name: string;
    position: string;
    review: string;
    rating: number; // 0..5, half steps ok
    image: string; // remote URL
  };

  const testimonials: Testimonial[] = [
    {
      name: "John Doe",
      position: "CEO, TechCorp",
      review:
        "Visionary Crafts transformed our idea into a reality. The process was smooth and the final product was amazing!",
      rating: 4.5,
      image: "https://randomuser.me/api/portraits/men/32.jpg",
    },
    {
      name: "Sarah Lee",
      position: "Founder, BeautyCare",
      review:
        "Their design quality and attention to detail exceeded our expectations. Highly recommend them!",
      rating: 5,
      image: "https://randomuser.me/api/portraits/women/44.jpg",
    },
    {
      name: "Amit Patel",
      position: "CTO, FinTechX",
      review:
        "One of the best teams we’ve worked with. They really understand what the client needs.",
      rating: 4,
      image: "https://randomuser.me/api/portraits/men/75.jpg",
    },
  ];

  const blogs: BlogItem[] = [
    {
      date: "Aug 20, 2025",
      text: "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Repudiandae in praesentium optio adipisci? Quidem, sint 1",
      link: "/blog1",
    },
    {
      date: "Sept 05, 2025",
      text: "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Repudiandae in praesentium optio adipisci? Quidem, sint 2",
      link: "/blog2",
    },
    {
      date: "Sept 25, 2025",
      text: "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Repudiandae in praesentium optio adipisci? Quidem, sint 3",
      link: "/blog3",
    },
  ];

  const socialCards: SocialCard[] = [
    {
      name: "Instagram",
      role: "Video Editor",
      border: "border-pink-600",
      icon: (
        <FaInstagram className="text-pink-600 text-[40px]" aria-hidden="true" />
      ),
    },
    {
      name: "Facebook",
      role: "Product Manager",
      border: "border-blue-700",
      icon: (
        <FaFacebook className="text-blue-700 text-[40px]" aria-hidden="true" />
      ),
    },
    {
      name: "Pinterest",
      role: "Graphic Designer",
      border: "border-red-500",
      icon: (
        <FaPinterest className="text-red-500 text-[40px]" aria-hidden="true" />
      ),
    },
    {
      name: "Google",
      role: "Full-Stack Developer",
      border: "border-green-600",
      icon: <FcGoogle className="text-[40px]" aria-hidden="true" />,
    },
    {
      name: "Yahoo",
      role: "Full-Stack Developer",
      border: "border-purple-600",
      icon: (
        <FaYahoo className="text-[#6001D2] text-[40px]" aria-hidden="true" />
      ),
    },
  ];

  return (
    <div>
      <div className="relative min-h-screen overflow-x-hidden z-0">
        {/* HERO (Banner + content) */}

        <section className="relative overflow-hidden">
          <div
            className="h-[155vh] lg:h-[100vh]  w-full bg-[url('/images/RI_banner_bgHome.png')] bg-cover bg-center bg-no-repeat bg-fixed"
            ref={typewriter1Ref}
          />

          <div className="absolute w-full top-32 lg:top-40 left-1/2 -translate-x-1/2 flex place-items-end justify-center px-5 lg:px-[5%] 2xl:px-[10%]">
            <div className="grid grid-cols-1 lg:grid-cols-[45%_50%] items-center lg:gap-5 w-full">
              {/* LEFT: your text + search */}
              <div className="" ref={ref}>
                <div
                  className="fontAL font-semibold text-[#72B76A] text-3xl md:text-4xl lg:text-5xl xl:text-6xl uppercase lg:mt-5"
                  style={{
                    letterSpacing: "1px",
                    wordSpacing: "2px",
                    lineHeight: 1.2,
                  }}
                >
                  {showTypewriter1 ? (
                    <Typewriter
                      words={["Find Best Jobs"]}
                      typeSpeed={120}
                      deleteSpeed={0}
                      delaySpeed={1000}
                      cursor={false}
                      loop={1}
                    />
                  ) : (
                    ""
                  )}
                  <br />
                  <span className="font-normal text-black normal-case">
                    To Boost Career
                  </span>
                </div>

                <p
                  className="fontPOP text-gray-500 font-semibold text-sm"
                  style={{
                    letterSpacing: "2px",
                    wordSpacing: "4px",
                    lineHeight: 1.3,
                  }}
                >
                  Lorem ipsum dolor sit, amet consectetur adipisicing elit.
                </p>

                {/* Search Bar */}
                <div className="mt-6 lg:mt-10">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-5 items-end">
                    {/* WHAT */}
                    <div className="relative" ref={whatRef}>
                      <label className="block mb-2 text-xs font-medium leading-tight text-gray-800">
                        WHAT
                      </label>
                      <div className="relative">
                        <button
                          type="button"
                          onClick={() => setOpenWhat((v) => !v)}
                          className="flex items-center justify-between w-full px-3 h-12 text-sm text-gray-700 bg-white border border-gray-300 rounded-[10px] hover:bg-gray-50"
                        >
                          <span className="truncate">{what}</span>
                          <svg
                            className="w-5 h-5 text-gray-500"
                            viewBox="0 0 20 20"
                            fill="currentColor"
                          >
                            <path
                              fillRule="evenodd"
                              d="M5.23 7.21a.75.75 0 011.06.02L10 
                     11.19l3.71-3.96a.75.75 0 
                     111.08 1.04l-4.25 4.54a.75.75 
                     0 01-1.08 0L5.25 8.27a.75.75 
                     0 01-.02-1.06z"
                              clipRule="evenodd"
                            />
                          </svg>
                        </button>
                        {openWhat && (
                          <ul className="absolute z-20 w-full mt-1 bg-white border border-gray-200 shadow-lg rounded-xl">
                            {whatOptions.map((opt) => (
                              <li key={opt}>
                                <button
                                  type="button"
                                  onClick={() => {
                                    setWhat(opt);
                                    setOpenWhat(false);
                                  }}
                                  className={`w-full px-4 py-2 text-left text-sm hover:bg-gray-50 ${
                                    what === opt ? "bg-gray-50 font-medium" : ""
                                  }`}
                                >
                                  {opt}
                                </button>
                              </li>
                            ))}
                          </ul>
                        )}
                      </div>
                    </div>

                    {/* TYPE */}
                    <div className="relative" ref={typeRef}>
                      <label className="block mb-2 text-xs font-medium leading-tight text-gray-800">
                        TYPE
                      </label>
                      <div className="relative">
                        <button
                          type="button"
                          onClick={() => setOpenType((v) => !v)}
                          className="flex items-center justify-between w-full px-3 h-12 text-sm text-gray-700 bg-white border border-gray-300 rounded-[10px] hover:bg-gray-50"
                        >
                          <span className="truncate">{type}</span>
                          <svg
                            className="w-5 h-5 text-gray-500"
                            viewBox="0 0 20 20"
                            fill="currentColor"
                          >
                            <path
                              fillRule="evenodd"
                              d="M5.23 7.21a.75.75 0 011.06.02L10 
                     11.19l3.71-3.96a.75.75 0 
                     111.08 1.04l-4.25 4.54a.75.75 
                     0 01-1.08 0L5.25 8.27a.75.75 
                     0 01-.02-1.06z"
                              clipRule="evenodd"
                            />
                          </svg>
                        </button>
                        {openType && (
                          <ul className="absolute z-20 w-full mt-1 bg-white border border-gray-200 shadow-lg rounded-xl">
                            {typeOptions.map((opt) => (
                              <li key={opt}>
                                <button
                                  type="button"
                                  onClick={() => {
                                    setType(opt);
                                    setOpenType(false);
                                  }}
                                  className={`w-full px-4 py-2 text-left text-sm hover:bg-gray-50 ${
                                    type === opt ? "bg-gray-50 font-medium" : ""
                                  }`}
                                >
                                  {opt}
                                </button>
                              </li>
                            ))}
                          </ul>
                        )}
                      </div>
                    </div>

                    {/* LOCATION */}
                    <div className="relative">
                      <label className="block mb-2 text-xs font-medium leading-tight text-gray-800">
                        LOCATION
                      </label>
                      <input
                        type="text"
                        placeholder="Location"
                        value={location}
                        onChange={(e) => setLocation(e.target.value)}
                        className="h-12 w-full rounded-[10px] border border-gray-300 bg-white placeholder-gray-400 px-3 text-sm text-gray-800 focus:outline-none focus:ring-2 focus:ring-[#72B76A]"
                      />
                    </div>
                  </div>
                </div>

                {/* CTA */}
                <div className="col-span-1 md:col-span-3 mt-4">
                  {/* <button className="relative px-4 h-9 overflow-hidden group border border-[#72B76A] bg-[#72B76A] rounded-lg hover:bg-transparent text-white hover:text-[#72B76A] active:scale-90 transition-all ease-out duration-700">
                      Find Job
                    </button> */}
                  <button className="relative px-4 h-9 overflow-hidden group border border-[#72B76A] bg-[#72B76A] rounded-lg from-gray-700/50 to-black hover:bg-transparent text-white hover:text-[#72B76A] active:scale-90 transition-all ease-out duration-700 cursor-pointer">
                    <span className="absolute right-0 w-10 h-full top-0 transition-all duration-1000 transform translate-x-12 bg-white opacity-10 -skew-x-12 group-hover:-translate-x-24 ease"></span>
                    <span className="relative flex gap-2 items-center text-sm font-semibold">
                      Find Job
                    </span>
                  </button>
                </div>

                {/* Subhead */}
                <div
                  className="hidden lg:block fontAL font-semibold text-gray-400/20 text-3xl md:text-4xl lg:text-5xl mt-20"
                  style={{
                    letterSpacing: "1px",
                    wordSpacing: "2px",
                    lineHeight: 1,
                  }}
                >
                  5,000+ Lorem Ipsum.
                </div>
              </div>

              {/* RIGHT: floating cards column */}
              <FloatingCardsAuto
                cards={socialCards}
                sideImageUrl="https://static.vecteezy.com/system/resources/previews/048/415/844/non_2x/3d-icon-simple-female-character-working-on-laptop-while-sitting-in-chair-free-png.png"
                duration={18}
              />
            </div>
          </div>
        </section>

        {/* <section className="relative [--hh:72px] lg:[--hh:125px] min-h-[calc(100svh-var(--hh))] pt-[calc(var(--hh)+25px)]"> */}
        {/* <section className="relative h-[200vh] lg:h-[100vh] w-full">
            {/* Background image with subtle parallax 
            <div
              className="absolute inset-0 -z-10 bg-cover bg-[5%_center] lg:bg-[40%_center] bg-no-repeat"
              style={{
                backgroundImage: 'url("/images/RI_banner_bg.png")',
                transform: `translateY(${scrollPosition * 0.1}px)`,
              }}
              role="img"
              ref={typewriter1Ref}
            />

            {/* Content, vertically centered 
            <div className="h-full px-5 lg:px-[5%] 2xl:px-[10%] flex items-center w-full">
              <div className="grid grid-cols-1 lg:grid-cols-[45%_50%] items-center lg:gap-5 w-full">
                {/* LEFT: your text + search 
                <div className="mt-24" ref={ref}>
                  <div
                    className="fontAL font-semibold text-[#72B76A] text-3xl md:text-4xl lg:text-5xl xl:text-6xl uppercase"
                    style={{
                      letterSpacing: "1px",
                      wordSpacing: "2px",
                      lineHeight: 1,
                    }}
                  >
                    {showTypewriter1 ? (
                      <Typewriter
                        words={["LOREM DOLOR"]}
                        typeSpeed={120}
                        deleteSpeed={0}
                        delaySpeed={1000}
                        cursor={false}
                        loop={1}
                      />
                    ) : (
                      ""
                    )}
                    <br />
                    <span className="font-normal text-black normal-case">
                      Lorem Ipsum.
                    </span>
                  </div>

                  <p
                    className="fontPOP text-gray-500 font-semibold text-sm mt-5"
                    style={{
                      letterSpacing: "2px",
                      wordSpacing: "4px",
                      lineHeight: 1.3,
                    }}
                  >
                    Lorem ipsum dolor sit, amet consectetur adipisicing elit.
                  </p>

                  {/* Search Bar — transparent fields, no white background 
                  <div className="mt-6 lg:mt-10">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-5 items-end">
                      {/* WHAT 
                      <div className="relative">
                        <label className="block mb-2 text-xs font-medium leading-tight text-gray-800">
                          WHAT
                        </label>
                        <div className="relative">
                          <select
                            className="
              h-12 w-full rounded-[10px] border border-gray-300
              bg-transparent appearance-none
              px-3 pr-10 text-sm text-gray-800
              focus:outline-none focus:ring-2 focus:ring-[#72B76A]
            "
                          >
                            <option>Job Title</option>
                            <option>Designer</option>
                            <option>Developer</option>
                          </select>
                          {/* chevron 
                          <svg
                            className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400"
                            viewBox="0 0 20 20"
                            fill="currentColor"
                          >
                            <path
                              fillRule="evenodd"
                              d="M5.23 7.21a.75.75 0 0 1 1.06.02L10 11.19l3.71-3.96a.75.75 0 1 1 1.08 1.04l-4.25 4.54a.75.75 0 0 1-1.08 0L5.25 8.27a.75.75 0 0 1-.02-1.06z"
                              clipRule="evenodd"
                            />
                          </svg>
                        </div>
                      </div>

                      {/* TYPE 
                      <div className="relative">
                        <label className="block mb-2 text-xs font-medium leading-tight text-gray-800">
                          TYPE
                        </label>
                        <div className="relative">
                          <select
                            className="
              h-12 w-full rounded-[10px] border border-gray-300
              bg-transparent appearance-none
              px-3 pr-10 text-sm text-gray-800
              focus:outline-none focus:ring-2 focus:ring-[#72B76A]
            "
                          >
                            <option>All Category</option>
                            <option>Design</option>
                            <option>Development</option>
                            <option>Marketing</option>
                          </select>
                          <svg
                            className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400"
                            viewBox="0 0 20 20"
                            fill="currentColor"
                          >
                            <path
                              fillRule="evenodd"
                              d="M5.23 7.21a.75.75 0 0 1 1.06.02L10 11.19l3.71-3.96a.75.75 0 1 1 1.08 1.04l-4.25 4.54a.75.75 0 0 1-1.08 0L5.25 8.27a.75.75 0 0 1-.02-1.06z"
                              clipRule="evenodd"
                            />
                          </svg>
                        </div>
                      </div>

                      {/* LOCATION 
                      <div className="relative">
                        <label className="block mb-2 text-xs font-medium leading-tight text-gray-800">
                          LOCATION
                        </label>
                        <input
                          type="text"
                          placeholder="Location"
                          className="
            h-12 w-full rounded-[10px] border border-gray-300
            bg-transparent placeholder-gray-400
            px-3 text-sm text-gray-800
            focus:outline-none focus:ring-2 focus:ring-[#72B76A]
          "
                        />
                      </div>
                    </div>
                  </div>

                  {/* CTA 
                  <div className="col-span-1 md:col-span-3 mt-4">
                    {/* <button className="relative px-4 h-9 overflow-hidden group border border-[#72B76A] bg-[#72B76A] rounded-lg hover:bg-transparent text-white hover:text-[#72B76A] active:scale-90 transition-all ease-out duration-700">
                      Find Job
                    </button> 
                    <button className="relative px-4 h-9 overflow-hidden group border border-[#72B76A] bg-[#72B76A] rounded-lg from-gray-700/50 to-black hover:bg-transparent text-white hover:text-[#881A2D] active:scale-90 transition-all ease-out duration-700 cursor-pointer">
                      <span className="absolute right-0 w-10 h-full top-0 transition-all duration-1000 transform translate-x-12 bg-white opacity-10 -skew-x-12 group-hover:-translate-x-24 ease"></span>
                      <span className="relative flex gap-2 items-center text-sm font-semibold">
                        Find&nbsp;Job
                      </span>
                    </button>
                  </div>

                  {/* Subhead 
                  <div
                    className="fontAL font-semibold text-gray-400/20 text-3xl md:text-4xl lg:text-5xl mt-20"
                    style={{
                      letterSpacing: "1px",
                      wordSpacing: "2px",
                      lineHeight: 1,
                    }}
                  >
                    5,000+ Lorem Ipsum.
                  </div>
                </div>

                {/* RIGHT: floating cards column 
                <FloatingCardsAuto
                  cards={socialCards}
                  sideImageUrl="https://static.vecteezy.com/system/resources/previews/048/415/844/non_2x/3d-icon-simple-female-character-working-on-laptop-while-sitting-in-chair-free-png.png"
                  speed={10}
                  resumeSpeed={16}
                />
              </div>
            </div>
          </section> */}

        <div className="relative z-10 bg-[#FFFFF0]">
          {/* About Us */}
          <div className="py-10 px-5 lg:px-[5%] 2xl:px-[15%]">
            <div className={`${AboutUs ? "" : ""}`} ref={sectionRef}>
              <div
                className="grid grid-cols-1 lg:grid-cols-[40%_55%] gap-10 items-center justify-between"
                ref={ref}
              >
                <div className="order-1 lg:order-2">
                  <p
                    className="fontPOP text-xs sm:text-sm"
                    style={{
                      letterSpacing: "1px",
                      lineHeight: 1.3,
                    }}
                  >
                    About Us
                  </p>

                  <p
                    className="fontAL font-semibold capitalize text-2xl md:text-3xl lg:text-4xl mt-5"
                    style={{
                      letterSpacing: "1px",
                      wordSpacing: "2px",
                      lineHeight: 1.2,
                    }}
                  >
                    Lorem ipsum dolor sit amet consectetur elit.
                  </p>

                  <div className="text-sm space-y-4 mt-8">
                    <div className="flex items-center gap-2">
                      <div className="flex items-center justify-center bg-[#FFCC23] h-6 w-6 rounded-full text-sm text-white">
                        1
                      </div>
                      <p>Lorem ipsum dolor sit amet consectetur.</p>
                    </div>

                    <div className="flex items-center gap-2">
                      <div className="flex items-center justify-center bg-[#FFCC23] h-6 w-6 rounded-full text-sm text-white">
                        2
                      </div>
                      <p>Lorem ipsum dolor sit amet consectetur.</p>
                    </div>

                    <div className="flex items-center gap-2">
                      <div className="flex items-center justify-center bg-[#FFCC23] h-6 w-6 rounded-full text-sm text-white">
                        3
                      </div>
                      <p>Lorem ipsum dolor sit amet consectetur.</p>
                    </div>

                    <div className="flex items-center gap-2">
                      <div className="flex items-center justify-center bg-[#FFCC23] h-6 w-6 rounded-full text-white">
                        4
                      </div>
                      <p>Lorem ipsum dolor sit amet consectetur.</p>
                    </div>
                  </div>

                  <div className="flex flex-wrap items-center gap-5 mt-5">
                    <div className="flex items-center gap-2 bg-white p-3 rounded-lg shadow-sm">
                      <div className="flex items-center justify-center bg-[#FFCC23] h-10 w-10 rounded-full text-white">
                        4
                      </div>
                      <div>
                        <p className="font-semibold text-[#FFCC23] text-lg">
                          {isVisible && (
                            <CountUp end={99} suffix="%" duration={7} />
                          )}
                        </p>
                        <p className="text-xs">Lorem ipsum dolor</p>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 bg-white p-3 rounded-lg shadow-sm">
                      <div className="flex items-center justify-center bg-[#FFCC23] h-10 w-10 rounded-full text-white">
                        4
                      </div>
                      <div>
                        <p className="font-semibold text-[#FFCC23] text-lg">
                          {isVisible && (
                            <CountUp end={300} suffix="+" duration={7} />
                          )}
                        </p>
                        <p className="text-xs">Lorem ipsum dolor</p>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 bg-white p-3 rounded-lg shadow-sm">
                      <div className="flex items-center justify-center bg-[#FFCC23] h-10 w-10 rounded-full text-white">
                        4
                      </div>
                      <div>
                        <p className="font-semibold text-[#FFCC23] text-lg">
                          {isVisible && (
                            <CountUp end={20} suffix="K+" duration={7} />
                          )}{" "}
                        </p>
                        <p className="text-xs">Lorem ipsum dolor</p>
                      </div>
                    </div>
                  </div>

                  <Link href="/pages/aboutus">
                    <button className="relative mt-8 px-4 h-9 overflow-hidden group border border-[#FFCC23] bg-[#FFCC23] rounded-lg hover:bg-transparent text-white hover:text-[#FFCC23] active:scale-90 transition-all ease-out duration-700 cursor-pointer">
                      <span className="absolute right-0 w-10 h-full top-0 transition-all duration-1000 transform translate-x-12 bg-white opacity-10 -skew-x-12 group-hover:-translate-x-24 ease"></span>
                      <span className="relative flex gap-2 items-center text-sm font-semibold">
                        Know More
                      </span>
                    </button>
                  </Link>
                </div>

                <div className="flex justify-center items-end mr-4 sm:mr-0 order-2 lg:order-1">
                  <motion.div
                    ref={img1}
                    initial={{ opacity: 0, x: 0 }}
                    animate={
                      img1InView ? { opacity: 1, x: 30 } : { opacity: 0, x: 0 }
                    }
                    transition={{ duration: 1.5, ease: "easeOut" }}
                  >
                    <div
                      className="bg-contain bg-center bg-no-repeat h-[300px] w-[300px] lg:h-[450px] lg:w-[450px]"
                      style={{
                        backgroundImage: "url('/images/aboutus.png')",
                      }}
                    />
                  </motion.div>
                </div>
              </div>
            </div>
          </div>

          {/* Job Post */}
          <div className="relative bg-[#00C9FF]/10 w-full overflow-hidden">
            <div className="absolute -top-32 -right-28 flex items-center justify-center h-96 w-96 rounded-full bg-[#AE70BB]/10 z-0">
              <div className="bg-[#E5FAF1] h-60 w-60 rounded-full"></div>
            </div>

            <div className="absolute -bottom-28 -left-28 flex items-center justify-center h-80 w-80 rounded-full bg-[#72B76A]/20 z-0">
              <div className="bg-[#E5FAF1] h-48 w-48 rounded-full"></div>
            </div>

            <div className="relative z-10 pt-20 pb-28 px-5 lg:px-[5%] 2xl:px-[15%]">
              <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-5">
                <div>
                  <p
                    className="fontPOP text-[#881A2D] text-xs sm:text-sm"
                    style={{
                      letterSpacing: "1px",
                      lineHeight: 1.3,
                    }}
                  >
                    Jobs
                  </p>

                  <p
                    className="fontAL font-semibold capitalize text-2xl md:text-3xl lg:text-4xl mt-5 max-w-[500px] min-h-24"
                    style={{
                      letterSpacing: "1px",
                      wordSpacing: "2px",
                      lineHeight: 1.2,
                    }}
                    ref={jobTyperRef}
                  >
                    {jobTyperSeen && (
                      <Typewriter
                        words={["Lorem ipsum dolor sit amet consectetur"]}
                        typeSpeed={90}
                        deleteSpeed={0}
                        delaySpeed={800}
                        cursor={false}
                        loop={1}
                      />
                    )}
                  </p>
                </div>

                <div>
                  <Link href="/jobs">
                    <button className="relative px-4 h-9 overflow-hidden group border border-[#881A2D] bg-[#881A2D] rounded-lg hover:bg-transparent text-white hover:text-[#881A2D] active:scale-90 transition-all ease-out duration-700 cursor-pointer">
                      <span className="absolute right-0 w-10 h-full top-0 transition-all duration-1000 transform translate-x-12 bg-white opacity-10 -skew-x-12 group-hover:-translate-x-24 ease"></span>
                      <span className="relative flex gap-2 items-center text-sm font-semibold">
                        View&nbsp;All&nbsp;Jobs
                      </span>
                    </button>
                  </Link>
                </div>
              </div>
              {/* cards  */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 items-start mt-10">
                {cardData.map((card) => (
                  <div
                    key={card.id}
                    className="bg-white p-4 rounded-lg group shadow-md 
                  transition-all duration-300 ease-in-out 
                  hover:-translate-y-2 hover:shadow-xl hover:bg-[#F9FAFB]"
                  >
                    <div className="flex justify-between gap-10">
                      <Link href="/" className="inline-block">
                        <Image
                          src="/images/company.jpg"
                          alt="Company logo"
                          width={64}
                          height={64}
                          className="bg-white h-16 w-16 shadow-sm -mt-10 rounded-md"
                        />
                      </Link>

                      <div className="flex gap-5 items-center">
                        <p className="text-[#72B76A] text-xs">{card.date}</p>
                        <button
                          className="relative px-4 h-8 overflow-hidden border rounded-md text-white active:scale-90 
                        transition-all ease-out duration-700 group-hover:scale-105"
                          style={{
                            backgroundColor: card.btnColor,
                            borderColor: card.btnColor,
                          }}
                        >
                          <span
                            className="absolute right-0 w-10 h-full top-0 transition-all duration-1000 transform 
                                translate-x-12 bg-white opacity-10 -skew-x-12 group-hover:-translate-x-24 ease"
                          ></span>
                          <span className="relative flex gap-2 items-center text-xs font-semibold">
                            {card.btnText}
                          </span>
                        </button>
                      </div>
                    </div>

                    <p className="font-semibold mt-5 group-hover:text-[#72B76A] transition-colors">
                      {card.title}
                    </p>

                    <p className="text-sm text-gray-500 mt-2 mb-5">
                      {card.desc}
                    </p>

                    {card.link.startsWith("http") ? (
                      <a
                        href={encodeURI(card.link)}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-[#72B76A] text-sm hover:underline underline-offset-4"
                      >
                        {card.link}
                      </a>
                    ) : (
                      <Link
                        href={card.link}
                        className="text-[#72B76A] text-sm hover:underline underline-offset-4"
                      >
                        {card.link}
                      </Link>
                    )}

                    <div className="flex items-center justify-between mt-5">
                      <p className="font-semibold">{card.price}</p>

                      {card.link.startsWith("http") ? (
                        <a
                          href={encodeURI(card.link)}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-[#72B76A] text-sm hover:underline underline-offset-4"
                        >
                          {card.link}
                        </a>
                      ) : (
                        <Link
                          href={card.link}
                          className="text-[#72B76A] text-sm hover:underline underline-offset-4"
                        >
                          {card.link}
                        </Link>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Places */}
          <div className="bg-[#ECF1F7] py-10 px-5 lg:px-10 my-20 mx-5 lg:mx-[5%] 2xl:mx-[15%] rounded-2xl">
            <div className="grid grid-cols-1 lg:grid-cols-[50%_45%] justify-between gap-10">
              <div>
                <p
                  className="fontAL font-semibold capitalize text-2xl md:text-3xl lg:text-4xl mt-5 max-w-[600px] min-h-24"
                  style={{
                    letterSpacing: "1px",
                    wordSpacing: "2px",
                    lineHeight: 1.3,
                  }}
                  ref={placesTyperRef}
                >
                  {placesTyperSeen && (
                    <Typewriter
                      words={[
                        "Connecting Talent With Opportunities Across Cities",
                      ]}
                      typeSpeed={90}
                      deleteSpeed={0}
                      delaySpeed={800}
                      cursor={false}
                      loop={1} // play once
                    />
                  )}
                </p>

                <ul className="mt-5 space-y-3">
                  <li>Lorem ipsum lorem ipsum</li>
                  <li>Lorem ipsum lorem ipsum</li>
                  <li>Lorem ipsum lorem ipsum</li>
                  <li>Lorem ipsum lorem ipsum</li>
                </ul>
              </div>

              <div>
                <Link href="/" className="flex items-center h-full">
                  <Image
                    src="/images/map-img.png"
                    alt="World map sketch"
                    width={500}
                    height={300}
                    className="rounded-md object-contain object-center"
                  />
                </Link>
              </div>
            </div>
          </div>

          {/* Upload Resume */}
          <div className="px-5 lg:px-[5%] 2xl:px-[15%]">
            <div className="grid grid-cols-1 lg:grid-cols-[40%_55%] gap-10 items-center justify-between">
              <div className="">
                <div className="relative flex items-center justify-center">
                  <div className="animate_outer_rotate absolute bg-[#EFE2F1] rounded-[50px] h-80 w-80 animate-rotate-slow z-0"></div>

                  <div className="animate_inner_rotate absolute bg-white rounded-[50px] h-72 w-72 animate-rotate-reverse z-10"></div>
                  <Link href="/" className="inline-block">
                    <Image
                      src="/images/girl.png"
                      alt="Girl-img"
                      height={400}
                      width={400}
                      className="relative z-20 "
                    />
                  </Link>
                </div>
              </div>

              <motion.div
                ref={img2}
                initial={{ opacity: 0, x: 100 }}
                animate={
                  img2InView ? { opacity: 1, x: 0 } : { opacity: 0, x: 100 }
                }
                transition={{ duration: 2, ease: "easeOut" }}
                className="mt-14"
              >
                <div className="relative inline-block lg:max-w-[600px] mr-5 lg:mr-0">
                  <div className="absolute top-8 left-5 w-full h-full rounded-xl bg-[#DFC6E4]"></div>

                  <div className="relative bg-white p-10 rounded-xl border border-[#DFC6E4]">
                    <p
                      className="fontPOP text-xs sm:text-sm"
                      style={{
                        letterSpacing: "1px",
                        lineHeight: 1.3,
                      }}
                    >
                      Lorem ipsum dolor.
                    </p>

                    <p
                      className="fontAL font-semibold capitalize text-2xl md:text-3xl lg:text-4xl mt-5"
                      style={{
                        letterSpacing: "1px",
                        wordSpacing: "2px",
                        lineHeight: 1.2,
                      }}
                    >
                      Upload your resume!
                    </p>

                    <p className="text-sm mt-5">
                      Lorem ipsum dolor sit amet consectetur adipisicing elit.
                      Nihil corrupti deserunt voluptatibus dolorum ducimus?
                      Eveniet autem voluptatem, delectus nulla reiciendis ab aut
                      quo accusamus similique vitae molestias. Perspiciatis eum
                      rem cum delectus!
                    </p>

                    <button className="relative mt-8 px-4 h-9 overflow-hidden group border border-[#AE70BB] bg-[#AE70BB] rounded-lg from-gray-700/50 to-black hover:bg-transparent text-white hover:text-[#AE70BB] active:scale-90 transition-all ease-out duration-700 cursor-pointer">
                      <span className="absolute right-0 w-10 h-full top-0 transition-all duration-1000 transform translate-x-12 bg-white opacity-10 -skew-x-12 group-hover:-translate-x-24 ease"></span>
                      <span className="relative flex gap-2 items-center text-sm font-semibold">
                        Upload Now
                      </span>
                    </button>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>

          {/* Top Companies */}
          <div className="bg-[#CCF4F3] mt-28 pt-20 pb-40 px-5 lg:px-[5%] 2xl:px-[15%]">
            <p
              className="fontPOP text-xs sm:text-sm text-center"
              style={{
                letterSpacing: "1px",
                lineHeight: 1.3,
              }}
            >
              Top companies
            </p>

            <p
              className="fontAL font-semibold capitalize text-center text-2xl md:text-3xl lg:text-4xl mt-5 mx-auto max-w-[800px]"
              style={{
                letterSpacing: "1px",
                wordSpacing: "2px",
                lineHeight: 1.2,
              }}
            >
              find
              <span className="text-[#00C9FF]"> best companies </span>
              for yourself here because you deserve it
            </p>
          </div>

          {/* Companies Carousel */}
          <div className="bg-[#F2FCF1] -mt-20 mx-10 lg:mx-[15%] 2xl:mx-[25%] p-5 rounded-xl">
            <div>
              <Carousel
                responsive={responsive_companies}
                infinite
                arrows={false}
                autoPlay
                autoPlaySpeed={2000}
                itemClass="p-5"
              >
                {images_companies.map((img, index) => (
                  <div
                    key={index}
                    className="border border-[#F9F9F9] w-full h-[90px] overflow-hidden rounded"
                  >
                    <Link href={`/company/${index}`} className="block">
                      <Image
                        src={img}
                        alt={`Slide ${index}`}
                        width={200}
                        height={90}
                        className="w-full h-full object-contain object-center transition-transform duration-300 ease-in-out hover:scale-110"
                      />
                    </Link>
                  </div>
                ))}
              </Carousel>
            </div>

            <div className="flex justify-center gap-5 sm:gap-10 lg:gap-20 text-center mx-5 mb-5">
              <div className="">
                <p className="font-semibold text-2xl md:text-3xl lg:text-4xl text-[#00C9FF]">
                  <CountUp end={5} suffix="M+" duration={3} />
                </p>
                <p className="text-sm mt-2">Lorem ipsum dolor.</p>
              </div>

              <div>
                <p className="font-semibold text-2xl md:text-3xl lg:text-4xl text-[#00C9FF]">
                  <CountUp end={9} suffix="M+" duration={3} />
                </p>
                <p className="text-sm mt-2">Lorem ipsum dolor.</p>
              </div>

              <div>
                <p className="font-semibold text-2xl md:text-3xl lg:text-4xl text-[#00C9FF]">
                  <CountUp end={20} suffix="K+" duration={3} />
                </p>
                <p className="text-sm mt-2">Lorem ipsum dolor.</p>
              </div>
            </div>
          </div>

          {/* Testimonials */}
          <Testimonials />

          {/* <div className="relative">
            <div className="absolute inset-0 top-1/4 lg:top-1/2 -translate-y-1/2 -left-[450px] transform bg-[#72B76A]/40 z-0 rounded-t-full w-[550px] h-[550px] rotate-90" />

            <div className="relative py-20 px-5 lg:px-[5%] 2xl:px-[15%] z-10">
              <div className="grid grid-cols-1 lg:grid-cols-[40%_55%] gap-5 items-center">
                {/* Left copy 
                <div>
                  <p
                    className="fontPOP text-[#72B76A] text-xs sm:text-sm"
                    style={{ letterSpacing: "1px", lineHeight: 1.3 }}
                  >
                    Reviews
                  </p>

                  <p
                    className="fontAL font-semibold capitalize text-2xl md:text-3xl lg:text-4xl mt-5 max-w-[500px]"
                    style={{
                      letterSpacing: "1px",
                      wordSpacing: "2px",
                      lineHeight: 1.2,
                    }}
                  >
                    Know what our clients say about us
                  </p>

                  <p className="my-10">
                    Lorem ipsum dolor sit amet, ipsum dolor sit amet Lorem.
                    Lorem ipsum dolor sit amet, ipsum dolor sit amet Lorem.
                    Lorem ipsum dolor sit amet, ipsum dolor sit amet Lorem.
                    Lorem ipsum dolor sit amet, ipsum dolor sit amet Lorem.
                    Lorem ipsum dolor sit amet, ipsum dolor sit amet Lorem.
                    Lorem ipsum dolor sit amet, ipsum dolor sit amet Lorem.
                  </p>

                  <button
                    className="relative mt-8 px-4 h-9 overflow-hidden group border border-[#72B76A] bg-[#72B76A] rounded-lg
                          hover:bg-transparent text-white hover:text-[#72B76A] active:scale-90 transition-all ease-out duration-700 cursor-pointer"
                    type="button"
                  >
                    <span className="absolute right-0 w-10 h-full top-0 transition-all duration-1000 transform translate-x-12 bg-white opacity-10 -skew-x-12 group-hover:-translate-x-24 ease" />
                    <span className="relative flex gap-2 items-center text-sm font-semibold">
                      See&nbsp;More
                    </span>
                  </button>
                </div>

                {/* Right slider 
                <div className="relative p-10 pb-16">
                  <div className="absolute top-0 right-0 w-80 h-full bg-[#72B76A]/80 z-0 rounded-2xl" />

                  <Swiper
                    direction="vertical"
                    slidesPerView={2}
                    spaceBetween={10}
                    loop
                    autoplay={{ delay: 2500, disableOnInteraction: false }}
                    modules={[Autoplay]}
                    className="h-[520px] w-full relative z-10"
                  >
                    {testimonials.map((t) => (
                      <SwiperSlide key={t.name}>
                        <div className="m-5 p-6 bg-white rounded-l-2xl shadow-md text-center">
                          <div className="flex justify-end mb-4">
                            {renderStars(t.rating)}
                          </div>

                          <div>
                            <div className="flex gap-5">
                              <Link
                                href={`/profile/${encodeURIComponent(t.name)}`}
                                className="inline-block"
                              >
                                <Image
                                  src={t.image}
                                  alt={t.name}
                                  width={70}
                                  height={70}
                                  className="rounded-full mr-auto mb-4"
                                />
                              </Link>

                              <div>
                                <FaQuoteLeft className="text-2xl text-green-700" />
                                <p className="text-left text-gray-700 italic my-4 line-clamp-2">
                                  {t.review}
                                </p>
                              </div>
                            </div>

                            <p className="font-bold text-left">{t.name}</p>
                            <p className="text-sm text-left text-gray-500">
                              {t.position}
                            </p>
                          </div>
                        </div>
                      </SwiperSlide>
                    ))}
                  </Swiper>
                </div>
              </div>
            </div>
          </div> */}

          {/* Blogs */}
          <div
            className="pt-5 pb-20 px-5 lg:px-[5%] 2xl:px-[15%]"
            ref={typewriter2Ref}
          >
            <p
              className="fontPOP text-xs sm:text-sm text-center"
              style={{
                letterSpacing: "1px",
                lineHeight: 1.3,
              }}
            >
              Blogs
            </p>

            <p
              className="fontAL font-semibold capitalize min-h-16 md:min-h-24 text-[#023052] text-center text-2xl md:text-3xl lg:text-4xl mt-5 max-w-[500px]  mx-auto"
              style={{
                letterSpacing: "1px",
                wordSpacing: "2px",
                lineHeight: 1.2,
              }}
            >
              {showTypewriter2 ? (
                <Typewriter
                  words={["Lorem ipsum dolor sit amet consectetur"]}
                  typeSpeed={90}
                  deleteSpeed={0}
                  delaySpeed={1000}
                  cursor={false}
                  loop={1}
                />
              ) : (
                ""
              )}
            </p>

            {/* Blog cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-10 mt-10">
              {blogs.map((blog) => (
                <article key={blog.link} className="relative">
                  {/* Image container */}
                  <div className="relative overflow-hidden rounded-2xl aspect-[9/11]">
                    <Image
                      src="https://imgcdn.stablediffusionweb.com/2025/2/1/bd370b10-62c0-482b-a06b-63ca5d29ce38.jpg"
                      alt="Blog image"
                      fill
                      sizes="(min-width:1024px) 33vw, (min-width:640px) 50vw, 100vw"
                      className="object-cover"
                    />
                  </div>

                  {/* Blue content box */}
                  <div className="relative -mt-12 mx-4 rounded-2xl bg-[#023052] text-white p-5 shadow-xl">
                    {/* Date pill */}
                    <span className="absolute -top-5 left-1/4 -translate-x-1/2 rounded-full bg-white text-[#023052] px-4 py-1 shadow text-sm font-medium">
                      {blog.date}
                    </span>

                    <p className="mt-5 mb-3 leading-6">{blog.text}</p>
                    <Link
                      href="/blogs/details"
                      className="italic underline-offset-2 hover:underline text-white/90"
                    >
                      Read More
                    </Link>
                  </div>
                </article>
              ))}
            </div>

            <div className="flex justify-center mt-12">
              <Link href="/blogs">
                <button className="relative px-6 h-10 overflow-hidden group border border-[#023052] bg-[#023052] rounded-lg hover:bg-transparent text-white hover:text-[#023052] active:scale-90 transition-all ease-out duration-700 cursor-pointer">
                  <span className="absolute right-0 w-10 h-full top-0 transition-all duration-1000 transform translate-x-12 bg-white opacity-10 -skew-x-12 group-hover:-translate-x-24 ease"></span>
                  <span className="relative flex gap-2 items-center text-sm font-semibold">
                    See&nbsp;More
                  </span>
                </button>
              </Link>
            </div>
          </div>

          {/* <Footer /> */}
        </div>
      </div>
    </div>
  );
};

export default Home;
