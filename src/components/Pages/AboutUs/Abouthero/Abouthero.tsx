"use client";

import React from "react";
import Link from "next/link";

type AboutheroProps = {
  title: string;
  image?: string;
  current?: string;
};

const Abouthero: React.FC<AboutheroProps> = ({
  title,
  image = "/images/RI_banner_bg.webp",
  current,
}) => {
  return (
    <section
      className="relative w-full h-[320px] md:h-[350px] bg-center bg-cover"
      style={{ backgroundImage: `url(${image})` }}
    >
      <div className="relative flex flex-col items-center justify-center h-full max-w-6xl px-4 mx-auto text-center">
        <h1 className="font-rubik font-bold text-[28px] md:text-[34px] leading-tight text-[#3c3c3c]">
          {title}
        </h1>

        <nav aria-label="Breadcrumb" className="mt-3">
          <ol className="inline-flex items-center gap-2 text-sm text-[#3c3c3c]/80">
            <li>
              <Link href="/" className="hover:underline">
                Home
              </Link>
            </li>
            <li aria-hidden className="select-none">
              /
            </li>
            <li>
              <span className="font-medium text-[#3c3c3c]">
                {current ?? title}
              </span>
            </li>
          </ol>
        </nav>
      </div>
    </section>
  );
};

export default Abouthero;
