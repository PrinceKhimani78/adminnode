"use client";

import React from "react";
import Link from "next/link";
import "../Header/Header.css";
import Image from "next/image";
import "../Home/Home.css";
// import Widget from "./Widget";
import { IoIosCall } from "react-icons/io";
import { HiOutlineMail } from "react-icons/hi";
import { SlLocationPin } from "react-icons/sl";

const Footer: React.FC = () => {
  return (
    <div>
      {/* <Widget /> */}

      <div className="relative overflow-hidden bg-[#00C9FF] text-xs py-3 z-0">
        <div className="animate-marquee whitespace-nowrap flex w-max">
          <span className="pr-10">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Enim
            laboriosam recusandae placeat quibusdam eos maxime quo incidunt
            veritatis, quam dolore commodi ipsum tempore molestiae asperiores
            architecto facilis perspiciatis repellat, maiores cum illum!
            Asperiores suscipit dolor aperiam quaerat cum molestias voluptates
            repudiandae, dolorum dignissimos consequatur sapiente vel possimus,
            veniam iste dicta!
          </span>
          <span className="pr-10">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Enim
            laboriosam recusandae placeat quibusdam eos maxime quo incidunt
            veritatis, quam dolore commodi ipsum tempore molestiae asperiores
            architecto facilis perspiciatis repellat, maiores cum illum!
            Asperiores suscipit dolor aperiam quaerat cum molestias voluptates
            repudiandae, dolorum dignissimos consequatur sapiente vel possimus,
            veniam iste dicta!
          </span>
        </div>
      </div>

      <div className="bg-[#00233e] text-white py-10 px-5 lg:px-[5%] 2xl:px-[10%]">
        <div className="flex flex-col justify-center w-full">
          <div className="grid grid-cols-1 lg:grid-cols-[35%_60%] justify-between items-center gap-5 my-10">
            <p className="fontAL text-lg">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolores,
              nulla totam. Ut soluta veritatis porro culpa dicta optio, et
              molestiae.
            </p>

            <div className="flex justify-end w-full">
              <input
                type="text"
                className="px-5 w-[90%] lg:w-[70%] text-black bg-white border rounded-l-lg border-white focus:border-[#00C9FF] focus-within:border-2 focus:outline-none focus:ring-0 focus-visible:outline-none placeholder:text-gray-400"
                placeholder="Your email"
              />
              <button className="newsletter_btn">
                <span className="text-sm">Subscribe</span>
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 items-center gap-10 mt-10">
            <div>
              <Link href="/">
                <Image
                  src="/images/logo.svg"
                  alt="Logo"
                  width={60}
                  height={60}
                  className="h-20 w-auto bg-white p-2 rounded-md"
                />
              </Link>

              <div className="space-y-3 mt-5">
                <p>
                  Lorem ipsum dolor sit amet consectetur adipisicing elit. Magni
                  sint, saepe nostrum placeat cum aut.
                </p>

                <p className="group">
                  <b>Email: </b>{" "}
                  <Link
                    href="/"
                    className="group-hover:underline underline-offset-2"
                  >
                    abcd@gmail.com
                  </Link>
                </p>

                <p className="group">
                  <b>Call: </b>{" "}
                  <Link
                    href="/"
                    className="group-hover:underline underline-offset-2"
                  >
                    +91 98765 43210
                  </Link>
                </p>

                <p className="group">
                  <b>Address: </b>{" "}
                  <Link
                    href="/"
                    className="group-hover:underline underline-offset-2"
                  >
                    Lorem ipsum, dolor sit amet consectetur adipisicing elit.
                    Voluptates, dignissimos.
                  </Link>
                </p>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-10 items-stretch">
              <div className="flex flex-col justify-between h-full">
                <p className="relative text-[#00C9FF] text-xl mb-8">
                  For Candidates
                  <span className="absolute left-0 -bottom-3 w-10 h-0.5 bg-[#00C9FF]"></span>
                </p>

                <Link
                  href="/"
                  className="text-sm hover:underline underline-offset-2"
                >
                  Lorem ipsum
                </Link>

                <Link
                  href="/"
                  className="text-sm hover:underline underline-offset-2"
                >
                  Lorem ipsum
                </Link>
              </div>

              <div className="flex flex-col justify-between h-full">
                <p className="relative text-[#00C9FF] text-xl mb-8">
                  For Recruiters
                  <span className="absolute left-0 -bottom-3 w-10 h-0.5 bg-[#00C9FF]"></span>
                </p>

                <Link
                  href="/"
                  className="text-sm hover:underline underline-offset-2"
                >
                  Lorem ipsum
                </Link>

                <Link
                  href="/"
                  className="text-sm hover:underline underline-offset-2"
                >
                  Lorem ipsum
                </Link>

                <Link
                  href="/"
                  className="text-sm hover:underline underline-offset-2"
                >
                  Lorem ipsum
                </Link>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-10 items-stretch">
              <div className="flex flex-col justify-between h-full">
                <p className="relative text-[#00C9FF] text-xl mb-8">
                  Helpful Resources
                  <span className="absolute left-0 -bottom-3 w-10 h-0.5 bg-[#00C9FF]"></span>
                </p>

                <Link
                  href="/"
                  className="text-sm hover:underline underline-offset-2"
                >
                  Lorem ipsum
                </Link>

                <Link
                  href="/"
                  className="text-sm hover:underline underline-offset-2"
                >
                  Lorem ipsum
                </Link>
              </div>

              <div className="flex flex-col justify-between h-full">
                <p className="relative text-[#00C9FF] text-xl mb-8">
                  Quick Links
                  <span className="absolute left-0 -bottom-3 w-10 h-0.5 bg-[#00C9FF]"></span>
                </p>

                <Link
                  href="/"
                  className="text-sm hover:underline underline-offset-2"
                >
                  Lorem
                </Link>

                <Link
                  href="/"
                  className="text-sm hover:underline underline-offset-2"
                >
                  Lorem
                </Link>

                <Link
                  href="/"
                  className="text-sm hover:underline underline-offset-2"
                >
                  Lorem
                </Link>

                <Link
                  href="/"
                  className="text-sm hover:underline underline-offset-2"
                >
                  Lorem
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
