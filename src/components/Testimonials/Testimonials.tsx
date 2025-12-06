"use client";
import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import { FaQuoteLeft, FaStar, FaStarHalfAlt, FaRegStar } from "react-icons/fa";

import "swiper/css";

type Testimonial = {
  name: string;
  position: string;
  review: string;
  rating: number;
  image: string;
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

const Testimonials: React.FC = () => {
  return (
    <div className="relative">
      <div className="absolute inset-0 top-1/4 lg:top-1/2 -translate-y-1/2 -left-[450px] transform bg-[#72B76A]/40 z-0 rounded-t-full w-[550px] h-[550px] rotate-90" />

      <div className="relative py-10 px-5 lg:px-[5%] 2xl:px-[15%] z-10">
        <div className="grid grid-cols-1 lg:grid-cols-[45%_55%] items-center">
          {/* Left copy */}
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
              Lorem ipsum dolor sit amet, ipsum dolor sit amet Lorem. Lorem
              ipsum dolor sit amet, ipsum dolor sit amet Lorem. Lorem ipsum
              dolor sit amet, ipsum dolor sit amet Lorem. Lorem ipsum dolor sit
              amet, ipsum dolor sit amet Lorem. Lorem ipsum dolor sit amet,
              ipsum dolor sit amet Lorem. Lorem ipsum dolor sit amet, ipsum
              dolor sit amet Lorem.
            </p>

            {/* <button
              className="relative left-20 -top-3 sm:left-0 sm:-top-0 mt-8 px-4 h-9 overflow-hidden group border border-[#72B76A] bg-[#72B76A] rounded-lg
                          hover:bg-transparent text-white hover:text-[#72B76A] active:scale-90 transition-all ease-out duration-700 cursor-pointer"
              type="button"
            >
              <span className="absolute right-0 w-10 h-full top-0 transition-all duration-1000 transform translate-x-12 bg-white opacity-10 -skew-x-12 group-hover:-translate-x-24 ease" />
              <span className="relative flex gap-2 items-center text-sm font-semibold">
                See More
              </span>
            </button> */}
          </div>

          {/* Right slider */}
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
                  <div className="m-5 p-6 bg-white rounded-xl shadow-md text-center">
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
    </div>

    // <div className="relative">
    //   {/* Background Circle */}
    //   <div className="absolute inset-0 top-1/4 lg:top-1/2 -translate-y-1/2 -left-[450px] transform bg-[#72B76A]/40 z-0 rounded-t-full w-[550px] h-[550px] rotate-90" />

    //   {/* Content */}
    //   <div className="relative py-10 pl-5 lg:pl-[10%] 2xl:pl-[15%] pr-12 lg:pr-[14%] z-10">
    //     <div className="grid grid-cols-1 lg:grid-cols-[40%_55%] gap-5 items-center">
    //       {/* Left copy */}
    //       <div>
    //         <p
    //           className="fontPOP text-[#72B76A] text-xs sm:text-sm"
    //           style={{ letterSpacing: "1px", lineHeight: 1.3 }}
    //         >
    //           Reviews
    //         </p>

    //         <p
    //           className="fontAL font-semibold capitalize text-2xl md:text-3xl lg:text-4xl mt-5 max-w-[500px]"
    //           style={{
    //             letterSpacing: "1px",
    //             wordSpacing: "2px",
    //             lineHeight: 1.2,
    //           }}
    //         >
    //           Know what our clients say about us
    //         </p>

    //         <p className="my-10">
    //           Lorem ipsum dolor sit amet, ipsum dolor sit amet Lorem. Lorem
    //           ipsum dolor sit amet, ipsum dolor sit amet Lorem. Lorem ipsum
    //           dolor sit amet, ipsum dolor sit amet Lorem.
    //         </p>

    //         <button
    //           className="relative mt-8 px-4 h-9 overflow-hidden group border border-[#72B76A] bg-[#72B76A] rounded-lg
    //                     hover:bg-transparent text-white hover:text-[#72B76A] active:scale-90 transition-all ease-out duration-700 cursor-pointer"
    //           type="button"
    //         >
    //           <span className="absolute right-0 w-10 h-full top-0 transition-all duration-1000 transform translate-x-12 bg-white opacity-10 -skew-x-12 group-hover:-translate-x-24 ease" />
    //           <span className="relative flex gap-2 items-center text-sm font-semibold">
    //             See&nbsp;More
    //           </span>
    //         </button>
    //       </div>

    //       {/* Right slider */}
    //       <div className="relative p-10 pb-16">
    //         <div className="absolute top-0 -right-5 w-80 h-full bg-[#72B76A]/80 z-0 rounded-2xl" />

    //         <Swiper
    //           direction="vertical"
    //           slidesPerView={2}
    //           spaceBetween={10}
    //           loop
    //           autoplay={{ delay: 2500, disableOnInteraction: false }}
    //           modules={[Autoplay]}
    //           className="h-[520px] w-full relative z-10"
    //         >
    //           {testimonials.map((t) => (
    //             <SwiperSlide key={t.name}>
    //               <div className="m-5 p-6 bg-white rounded-l-2xl shadow-md text-center">
    //                 <div className="flex justify-end mb-4">
    //                   {renderStars(t.rating)}
    //                 </div>

    //                 <div>
    //                   <div className="flex gap-5">
    //                     <Link
    //                       href={`/profile/${encodeURIComponent(t.name)}`}
    //                       className="inline-block"
    //                     >
    //                       <Image
    //                         src={t.image}
    //                         alt={t.name}
    //                         width={70}
    //                         height={70}
    //                         className="rounded-full mr-auto mb-4"
    //                       />
    //                     </Link>

    //                     <div>
    //                       <FaQuoteLeft className="text-2xl text-green-700" />
    //                       <p className="text-left text-gray-700 italic my-4 line-clamp-2">
    //                         {t.review}
    //                       </p>
    //                     </div>
    //                   </div>

    //                   <p className="font-bold text-left">{t.name}</p>
    //                   <p className="text-sm text-left text-gray-500">
    //                     {t.position}
    //                   </p>
    //                 </div>
    //               </div>
    //             </SwiperSlide>
    //           ))}
    //         </Swiper>
    //       </div>
    //     </div>
    //   </div>
    // </div>
  );
};

export default Testimonials;
