import React from "react";
import Image from "next/image";
import Link from "next/link";
import { FaFacebookF, FaTwitter, FaLinkedinIn, FaGoogle } from "react-icons/fa";
import Footer from "@/components/Footer/Footer";
const Details = () => {
  // breadcrmbs
  type Crumb = { name: string; href?: string };
  const crumbs: Crumb[] = [
    { name: "Home", href: "/" },
    { name: "Blogs", href: "/blogs" },
    { name: "Blog Detail" },
  ];
  const Check = () => (
    <svg viewBox="0 0 24 24" className="h-5 w-5">
      {/* <circle cx="12" cy="12" r="10" fill="rgb(219 234 254)" /> blue-100 */}
      <path
        d="M9 12.75 11.25 15 15 9.75"
        fill="none"
        stroke="rgb(37 99 235)"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
  const RESPONSIBILITIES: string[] = [
    "You need to create an account to find the best and preferred job.",
    "After creating the account, you have to apply for the desired job.",
    "After filling all the relevant information you have to upload your resume.",
  ];
  return (
    <>
      {/* ===== banner ===== */}
      <section className="relative overflow-hidden">
        <div className="h-[180px] sm:h-[220px] lg:h-[350px] bg-[url('/images/RI_banner_bg.webp')] bg-cover bg-center bg-no-repeat bg-fixed" />
        <div className="absolute inset-0 flex h-[180px] sm:h-[220px] lg:h-[350px] place-items-end  justify-center px-5 lg:px-[5%] 2xl:px-[10%]">
          <div className="max-w-screen-xl w-full text-center">
            <h1 className="inline-block mb-4 px-4 py-2 text-slate-900  sm:text-xl fontAL font-semibold capitalize text-2xl md:text-3xl lg:text-4xl mt-5">
              Blogs Details
            </h1>
            {/* Breadcrumbs */}
            <nav
              aria-label="Breadcrumb"
              className="mb-6 text-sm text-slate-700"
            >
              <ol className="flex items-center justify-center gap-2">
                {crumbs.map((c, i) => {
                  const isLast = i === crumbs.length - 1;
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

      <section className="py-10 px-5 lg:px-[5%] 2xl:px-[15%]">
        <div className="mx-auto max-w-6xl grid gap-10 lg:grid-cols-[2fr_1fr] items-stretch">
          {/* left side  */}
          <div className="h-full">
            <div className="h-full rounded-2xl bg-white flex flex-col gap-8 shadow">
              <div className="relative overflow-hidden rounded-2xl">
                {/* hero Image  */}
                <div className="relative h-[250px] xs:h-[260px] md:h-[320px] lg:h-[420px]">
                  <Image
                    src="/images/blogdetailwebp"
                    alt="Job cover"
                    fill
                    className="absolute inset-0 h-full w-full object-cover"
                  />
                </div>
                {/* description part  */}

                <div className="p-6 md:p-10 space-y-5">
                  <p className="font-bold text-slate-900">
                    April 05, 2023 &nbsp;{" "}
                    <span className="font-bold text-slate-900">
                      By Mark Petter
                    </span>
                  </p>

                  {/* title */}
                  <h2 className="fontAL font-semibold capitalize text-2xl md:text-3xl lg:text-4xl mt-5 max-w-[500px] min-h-24">
                    How to convince recruiters and get your dream job
                  </h2>

                  {/* main content */}
                  <div className="space-y-4  text-sm text-gray-800">
                    <p>
                      Please make sure you understand what rights you are
                      claiming before you submit a DMCA takedown notice because
                      it is a serious legal document. Consider whether you need
                      legal advice. It&apos;s really important not to make false
                      claims as this could have serious legal consequences.
                    </p>
                    <p>
                      penatibus et magnis dis parturient montes, nascetur
                      ridiculus mus. Integer tristique elit lobortis purus
                      bibendum, quis dictum metus mattis. Phasellus posuere
                      felis sed eros porttitor mattis. Curabitur massa magna,
                      tempor in blandit id, porta in ligula. Aliquam laoreet
                      nisl massa, at interdum mauris sollicitudin et.Harvel is a
                      copyright protection platform for next-gen creators,
                      crawling the web on a daily basis in order to find piracy
                      links and copyright infringement of your content. I
                    </p>
                    <h2 className="text-lg font-semibold text-neutral-900">
                      About Business Network
                    </h2>
                    <p>
                      Phasellus enim magna, varius et commodo ut, ultricies
                      vitae velit. Ut nulla tellus, eleifend euismod and
                      pellentesque vel, sagittis vel justo. In libero urna,
                      venenatis sit amet ornare non, suscipit nec risus. Sed
                      consequat justo non mauris pretium at tempor justo sodales
                    </p>
                    {/* Quote block */}
                    <div className="bg-gray-50 rounded-xl p-6 md:p-8 relative">
                      <div className="absolute top-4 left-6 text-4xl text-gray-400 font-serif">
                        “
                      </div>
                      <p className="text-gray-800 text-base md:text-lg leading-relaxed pl-6">
                        A business consulting agency is involved in the
                        planning, implementation, and education of businesses.
                      </p>
                      <p className="mt-4 font-bold text-gray-900 tracking-wide pl-6">
                        RICHARD ANDERSON
                      </p>
                    </div>
                    <h2 className="text-lg font-semibold text-neutral-900">
                      Get Your Resume Done Right
                    </h2>

                    <p>
                      Phasellus enim magna, varius et commodo ut, ultricies
                      vitae velit. Ut nulla tellus, eleifend euismod and
                      pellentesque vel, sagittis vel justo. In libero urna,
                      venenatis sit amet ornare non, suscipit nec risus. Sed
                      consequat justo non mauris pretium at tempor justo
                      sodales.
                    </p>
                    <div>
                      {/* Responsibilities part  */}
                      <ul className="mt-4 space-y-1">
                        {RESPONSIBILITIES.map((item, i) => (
                          <li
                            key={i}
                            className="flex gap-3 text-sm text-gray-800"
                          >
                            <span className="mt-0.5">
                              <Check />
                            </span>
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                      {/* Author Card */}
                      <div className="mt-10 rounded-xl bg-gray-50 p-6 flex flex-col gap-6 sm:flex-row sm:items-center">
                        {/* Author image */}
                        <div className="relative h-24 w-24 shrink-0 overflow-hidden rounded-xl mx-auto sm:mx-0">
                          <Image
                            src="/images/authorwebp"
                            alt="Rosalina William"
                            fill
                            className="object-cover"
                          />
                        </div>

                        {/* Author details */}
                        <div className="text-center sm:text-left">
                          <p className="text-blue-600 font-medium">
                            435 Posts Since 2018
                          </p>
                          <p className="text-sm text-gray-600 mt-1">
                            Lorem ipsum dolor sit amet, consectetur adipisicing
                            elit, sed do eiusmod tempor incididunt ut labore et
                            dolore magna aliqua. Ut enim ad minim veniam,
                          </p>
                          <p className="mt-2 font-bold text-gray-900">
                            ROSALINA WILLIAM
                          </p>
                        </div>
                      </div>

                      {/* Share icons */}
                      <div className="text-center mt-10">
                        <p className="font-medium text-gray-700">Share</p>
                        <div className="flex justify-center gap-6 mt-4 text-gray-500">
                          <Link
                            href="https://facebook.com"
                            target="_blank"
                            aria-label="Share on Facebook"
                          >
                            <FaFacebookF className="h-5 w-5 hover:text-blue-600 transition" />
                          </Link>
                          <Link
                            href="https://twitter.com"
                            target="_blank"
                            aria-label="Share on Twitter"
                          >
                            <FaTwitter className="h-5 w-5 hover:text-sky-500 transition" />
                          </Link>
                          <Link
                            href="https://linkedin.com"
                            target="_blank"
                            aria-label="Share on LinkedIn"
                          >
                            <FaLinkedinIn className="h-5 w-5 hover:text-blue-700 transition" />
                          </Link>
                          <Link
                            href="https://google.com"
                            target="_blank"
                            aria-label="Share on Google"
                          >
                            <FaGoogle className="h-5 w-5 hover:text-red-600 transition" />
                          </Link>
                        </div>
                      </div>

                      {/* Next/Prev navigation */}
                      <div className="flex justify-between items-center border-t border-gray-200 mt-10 pt-6">
                        <div className="flex items-center gap-2 text-blue-600 cursor-pointer">
                          <svg
                            className="h-25 w-12"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="5"
                          >
                            <path d="M15 18l-6-6 6-6" />
                          </svg>
                          <p className="text-sm font-medium text-gray-800">
                            The wise man therefore always holds in these matters
                            to this principle
                          </p>
                        </div>

                        <div className="flex items-center gap-2 text-blue-600 cursor-pointer text-right">
                          <p className="text-sm font-medium text-gray-800">
                            Rejects pleasures to secure other greater pleasures
                          </p>
                          <svg
                            className="h-25 w-12"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="5"
                          >
                            <path d="M9 18l6-6-6-6" />
                          </svg>
                        </div>
                      </div>
                      {/* Comments Section */}
                      <section className="mt-12">
                        <h2 className="text-lg font-semibold text-neutral-900">
                          Comments
                        </h2>

                        <div className="space-y-8 mt-7">
                          {/* Comment 1 */}
                          <div className="flex gap-4">
                            {/* Avatar */}
                            <div className="relative h-20 w-20 shrink-0 overflow-hidden rounded-xl">
                              <Image
                                src="/images/commentwebp"
                                alt="Richard Anderson"
                                fill
                                className="object-cover"
                              />
                            </div>

                            <div className="flex-1">
                              <div className="flex justify-between items-center">
                                <h4 className="font-semibold text-gray-900">
                                  Richard Anderson
                                </h4>
                                <Link
                                  href="#"
                                  className="text-sm text-blue-600 hover:underline"
                                >
                                  Reply
                                </Link>
                              </div>
                              <p className="text-sm text-gray-700 mt-1">
                                No one rejects, dislikes, or avoids pleasure
                                itself, because pleasure, but because those who
                                do not know how to pursue.
                              </p>
                              <p className="text-xs text-gray-500 mt-2">
                                Apr 05, 2023
                              </p>
                            </div>
                          </div>

                          {/* Comment 2 */}
                          <div className="flex gap-4">
                            <div className="relative h-20 w-20 shrink-0 overflow-hidden rounded-xl">
                              <Image
                                src="/images/commentwebp"
                                alt="Devid Abraham"
                                fill
                                className="object-cover"
                              />
                            </div>

                            <div className="flex-1">
                              <div className="flex justify-between items-center">
                                <h4 className="font-semibold text-gray-900">
                                  Devid Abraham
                                </h4>
                                <Link
                                  href="#"
                                  className="text-sm text-blue-600 hover:underline"
                                >
                                  Reply
                                </Link>
                              </div>
                              <p className="text-sm text-gray-700 mt-1">
                                No one rejects, dislikes, or avoids pleasure
                                itself, because pleasure, but because those who
                                do not know how to pursue.
                              </p>
                              <p className="text-xs text-gray-500 mt-2">
                                Apr 08, 2023
                              </p>
                            </div>
                          </div>
                        </div>
                      </section>
                      {/* Leave a Reply Section */}
                      <section className="mt-12">
                        <h2 className="text-lg font-semibold text-neutral-900">
                          Leave a reply
                        </h2>

                        <form className="bg-gray-50 rounded-xl p-6 space-y-5 shadow-sm mt-10">
                          {/* Name + Email */}
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <input
                              type="text"
                              placeholder="Your Name"
                              required
                              className="h-12 w-full rounded bg-white px-4 text-sm placeholder-slate-400 ring-1 ring-blue-100 transition focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#00c9ff]"
                            />
                            <input
                              type="email"
                              placeholder="Your Email"
                              required
                              className="h-12 w-full rounded bg-white px-4 text-sm placeholder-slate-400 ring-1 ring-blue-100 transition focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#00c9ff]"
                            />
                          </div>

                          {/* Message */}
                          <textarea
                            placeholder="Message"
                            required
                            rows={4}
                            className="w-full resize-y rounded bg-white px-4 py-3 text-sm placeholder-slate-400 ring-1 ring-blue-100 transition focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#00c9ff]"
                          ></textarea>

                          {/* Submit Button */}
                          <button
                            type="submit"
                            className="px-6 py-3 rounded-lg bg-[#00c9ff] text-white font-semibold hover:bg-[#009ec7] transition"
                          >
                            Submit Now
                          </button>
                        </form>
                      </section>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* right side  */}
          <div className="w-full lg:w-[280px] xl:w-[270px] flex-shrink-0 md:sticky md:top-20 lg:top-24 self-start mt-8">
            <aside className="space-y-10">
              {/* Search */}
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search"
                  className="w-full h-12 rounded-2xl bg-white pl-4 pr-12 text-sm placeholder-slate-400 shadow-[0_12px_40px_rgba(2,6,23,0.06)] focus:outline-none"
                />
                <span className="absolute right-2 top-1/2 -translate-y-1/2 inline-flex h-8 w-8 items-center justify-center rounded-full border border-slate-200 text-slate-500">
                  <svg
                    viewBox="0 0 20 20"
                    className="h-4 w-4"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M12.9 14.32a7 7 0 1 1 1.414-1.414l3.39 3.39a1 1 0 0 1-1.414 1.414l-3.39-3.39zM14 9a5 5 0 1 1-10 0 5 5 0 0 1 10 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                </span>
              </div>

              {/* Categories */}
              <section>
                <h4 className="relative mb-5 pl-4 text-[20px] font-semibold text-slate-900">
                  <span className="absolute left-0 top-1 bottom-1 w-[3px] rounded bg-[#00c9ff]" />
                  Categories
                </h4>
                <ul className="space-y-4">
                  {[
                    { label: "Categories", count: 8 },
                    { label: "Education", count: 12 },
                    { label: "Information", count: 15 },
                    { label: "Jobs", count: 25 },
                    { label: "Learn", count: 36 },
                    { label: "Skill", count: 12 },
                  ].map((c) => (
                    <li
                      key={c.label}
                      className="flex items-center justify-between"
                    >
                      <span className="text-[15px] text-slate-700">
                        {c.label}
                      </span>
                      <span className="tabular-nums text-[15px] text-slate-600">
                        {String(c.count).padStart(2, "0")}
                      </span>
                    </li>
                  ))}
                </ul>
              </section>

              {/* Recent Article */}
              <section>
                <h4 className="relative mb-5 pl-4 text-[20px] font-semibold text-slate-900">
                  <span className="absolute left-0 top-1 bottom-1 w-[3px] rounded bg-[#00c9ff]" />
                  Recent Article
                </h4>
                <ul className="space-y-6">
                  {[
                    {
                      title:
                        "Equipment you can count on. People you can trust.",
                      date: "April 08, 2023",
                      img: "/images/job-gridwebp",
                      href: "/blog1",
                    },
                    {
                      title: "Advanced Service Functions by Air Transport",
                      date: "April 12, 2023",
                      img: "/images/job-gridwebp",
                      href: "/blog2",
                    },
                    {
                      title: "Advanced Service Functions by Air Transport",
                      date: "April 12, 2023",
                      img: "/images/job-gridwebp",
                      href: "/blog3",
                    },
                    {
                      title: "Advanced Service Functions by Air Transport",
                      date: "April 12, 2023",
                      img: "/images/job-gridwebp",
                      href: "/blog4",
                    },
                    {
                      title: "Advanced Service Functions by Air Transport",
                      date: "April 12, 2023",
                      img: "/images/job-gridwebp",
                      href: "/blog5",
                    },
                  ].map((a) => (
                    <li key={a.href} className="flex gap-3">
                      <div className="relative h-14 w-14 shrink-0 overflow-hidden rounded-lg">
                        <Image
                          src={a.img}
                          alt={a.title}
                          fill
                          className="object-cover"
                        />
                      </div>
                      <div className="min-w-0">
                        <Link
                          href={a.href}
                          className="text-[13px] font-medium text-[#00c9ff] hover:underline"
                        >
                          {a.date}
                        </Link>
                        <p className="mt-1 text-[14px] leading-5 text-slate-800">
                          {a.title}
                        </p>
                      </div>
                    </li>
                  ))}
                </ul>
              </section>

              {/* Tags */}
              <section>
                <h4 className="relative mb-5 pl-4 text-[20px] font-semibold text-slate-900">
                  <span className="absolute left-0 top-1 bottom-1 w-[3px] rounded bg-[#00c9ff]" />
                  Tags
                </h4>

                <div className="flex flex-wrap gap-3">
                  {[
                    "General",
                    "Jobs",
                    "Payment",
                    "Application",
                    "Work",
                    "Recruiting",
                    "Employer",
                    "Income",
                    "Tips",
                  ].map((tag) => (
                    <button
                      key={tag}
                      type="button"
                      className="rounded-full bg-blue-50 px-4 py-2 text-[14px] font-medium text-sky-600 hover:bg-sky-100 transition"
                    >
                      {tag}
                    </button>
                  ))}
                </div>
              </section>
            </aside>
          </div>
        </div>
      </section>
      {/* <Footer /> */}
    </>
  );
};

export default Details;
