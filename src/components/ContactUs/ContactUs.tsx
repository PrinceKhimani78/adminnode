"use client";
import React from "react";
import { useInView } from "react-intersection-observer";
import { MapPin, Phone, Mail } from "lucide-react";
import Footer from "../Footer/Footer";
import { FaMapMarkerAlt } from "react-icons/fa";
import { Typewriter } from "react-simple-typewriter";
type Crumb = { name: string; href?: string };
const ADDRESS = "1363 W Sunset Blvd, Los Angeles, CA 90026, USA";
const MAP_EMBED_SRC = `https://www.google.com/maps?q=${encodeURIComponent(
  ADDRESS
)}&output=embed`;
const MAP_DIRECTIONS = `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(
  ADDRESS
)}`;

const ContactUs = () => {
  const crumbs: Crumb[] = [{ name: "Home", href: "/" }, { name: "Contact Us" }];
  const [jobTyperRef, jobTyperSeen] = useInView({
    triggerOnce: true,
    threshold: 0.2,
  });
  return (
    <>
      {/* ===== banner ===== */}
      <section className="relative overflow-hidden">
        <div className="h-[220px] lg:h-[350px] bg-[url('/images/RI_banner_bgwebp')] bg-cover bg-center bg-no-repeat bg-fixed" />
        <div className="absolute inset-0 flex h-[220px] lg:h-[350px] place-items-end  justify-center px-5 lg:px-[5%] 2xl:px-[10%]">
          <div className="max-w-screen-xl w-full text-center">
            <h1 className="inline-block mb-4 px-4 py-2 text-slate-900  sm:text-xl fontAL font-semibold capitalize text-2xl md:text-3xl lg:text-4xl mt-5">
              Contact Us
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

      {/* ===== Main ===== */}
      <section className="relative">
        <div className="section-container px-4 sm:px-6 lg:px-[5%] 2xl:px-[15%] py-10 lg:py-[5%]">
          {/* light  mock */}
          <div className="mx-auto grid max-w-7xl items-start gap-15 lg:gap-20 grid-cols-1 lg:grid-cols-[minmax(0,1fr)_440px]">
            {/* LEFT — form */}
            <div className="m-0 md:m-5 md:pl-6">
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
                    words={["Send Us a Message"]}
                    typeSpeed={90}
                    deleteSpeed={0}
                    delaySpeed={800}
                    cursor={false}
                    loop={1}
                  />
                )}
              </p>

              <p
                className="fontPOP text-gray-500 text-xs sm:text-sm mt-2"
                style={{
                  letterSpacing: "1px",
                  lineHeight: 1.3,
                }}
              >
                Feel free to contact us and we will get back to you as soon as
                we can.
              </p>

              <form className="mt-6" onSubmit={(e) => e.preventDefault()}>
                <div className="grid gap-3 md:grid-cols-2">
                  <input
                    id="name"
                    name="name"
                    type="text"
                    placeholder="Name"
                    required
                    autoComplete="name"
                    className="w-full p-2 rounded bg-white  text-sm placeholder-slate-400 ring-1 ring-blue-100 transition focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#00c9ff]"
                  />
                  <input
                    id="email"
                    name="email"
                    type="email"
                    placeholder="Email"
                    required
                    autoComplete="email"
                    className="w-full p-2 rounded bg-white  text-sm placeholder-slate-400 ring-1 ring-blue-100 transition focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#00c9ff]"
                  />
                </div>

                <div className="mt-3 grid gap-3 md:grid-cols-2">
                  <input
                    id="phone"
                    name="phone"
                    type="tel"
                    placeholder="Phone"
                    autoComplete="tel"
                    className="w-full p-2 rounded bg-white  text-sm placeholder-slate-400 ring-1 ring-blue-100 transition focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#00c9ff]"
                  />
                  <input
                    id="subject"
                    name="subject"
                    type="text"
                    placeholder="Subject"
                    className="w-full p-2 rounded bg-white  text-sm placeholder-slate-400 ring-1 ring-blue-100 transition focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#00c9ff]"
                  />
                </div>

                <div className="mt-3">
                  <textarea
                    id="message"
                    name="message"
                    placeholder="Message"
                    rows={4}
                    className="w-full p-2 rounded bg-white   text-sm placeholder-slate-400 ring-1 ring-blue-100 transition focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#00c9ff]"
                  />
                </div>

                <div className="mt-8 flex justify-center sm:justify-start">
                  <button
                    type="submit"
                    className="relative px-4 h-9 overflow-hidden group border border-[#00c9ff] bg-[#00c9ff] rounded-lg from-gray-700/50 to-black hover:bg-transparent text-white hover:text-[#00c9ff] active:scale-90 transition-all ease-out duration-700 cursor-pointer"
                  >
                    <span className="absolute right-0 w-10 h-full top-0 transition-all duration-1000 transform translate-x-12 bg-white opacity-10 -skew-x-12 group-hover:-translate-x-24 ease"></span>
                    <span className="relative flex gap-2 items-center text-sm font-semibold">
                      Submit Now
                    </span>
                  </button>
                </div>
              </form>
            </div>

            {/* RIGHT — info card with right-anchored blue strip */}
            <aside className="relative md:pl-6">
              <div className="relative w-full max-w-[440px] lg:ml-auto">
                <div
                  aria-hidden
                  className="hidden lg:block absolute right-0 top-[-56px] bottom-[-72px] w-[84%] rounded-md bg-[#EAF3FF]"
                />

                {/* Info card (slightly left over the strip) */}
                <div className="relative mr-6 rounded-xl bg-white p-6 sm:p-8 ring-1 ring-blue-100/70 shadow-[0_22px_48px_-10px_rgba(29,78,216,0.15)]">
                  {/* block 1 */}
                  <div className="flex items-start gap-4">
                    <span className="grid h-11 w-11 place-items-center rounded-lg bg-blue-50 text-[#00c9ff] ring-1 ring-blue-100">
                      <MapPin size={20} />
                    </span>
                    <div>
                      <h3 className="font-semibold text-gray-900">
                        In the bay area?
                      </h3>
                      <p className="mt-1 text-xs leading-5 text-gray-900 font-bold">
                        1363–1385 Lorem ipsum dolor sit.,
                        <br />
                        Rjkt 360006, IN
                      </p>
                    </div>
                  </div>

                  <hr className="my-6 border-slate-100" />

                  {/* block 2 */}
                  <div className="flex items-start gap-4">
                    <span className="grid h-11 w-11 place-items-center rounded-lg bg-blue-50 text-[#00c9ff] ring-1 ring-blue-100">
                      <Phone size={20} />
                    </span>
                    <div>
                      <h3 className="font-semibold text-gray-900">
                        Feel free to contact us
                      </h3>
                      <p className="mt-1 text-xs leading-5 text-gray-900 font-bold">
                        +91 9876543210
                        <br />
                        +91 9876543210
                      </p>
                    </div>
                  </div>

                  <hr className="my-6 border-slate-100" />

                  {/* block 3 */}
                  <div className="flex items-start gap-4">
                    <span className="grid h-11 w-11 place-items-center rounded-lg bg-blue-50 text-[#00c9ff] ring-1 ring-blue-100">
                      <Mail size={20} />
                    </span>
                    <div>
                      <h3 className="font-semibold text-gray-900">Support</h3>
                      <p className="mt-1 text-xs leading-5 text-gray-900 font-bold">
                        infohelp@gmail.com
                        <br />
                        support12@gmail.com
                      </p>
                    </div>
                  </div>

                  {/* angled “paper” shadow under card */}
                  <div
                    aria-hidden
                    className="pointer-events-none absolute -bottom-4 left-10 h-4 w-[80%] -skew-x-6 rounded-[2px] bg-slate-300/25 blur-[1px]"
                  />
                </div>
              </div>
            </aside>
          </div>
        </div>
      </section>
      {/* map  */}
      <section className="relative w-full">
        <div className="section-container px-4 sm:px-6 lg:px-[5%] 2xl:px-[15%] pb-12">
          {/* Address + directions (overlay on top of the map) */}
          <div className="absolute top-5 left-1/2 -translate-x-1/2 z-10 bg-white/90 px-4 py-2 rounded-lg shadow-md flex items-center gap-2 text-sm text-neutral-700">
            <FaMapMarkerAlt className="text-gray-500" />
            {ADDRESS}
            <a
              href={MAP_DIRECTIONS}
              target="_blank"
              rel="noopener noreferrer"
              className="ml-3 text-sky-600 hover:underline"
            >
              Directions
            </a>
          </div>

          {/* Map with equal spacing */}
          <div className="w-full rounded-lg overflow-hidden shadow-md">
            <iframe
              src={MAP_EMBED_SRC}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="w-full h-[350px] md:h-[500px] grayscale"
            />
          </div>
        </div>
      </section>

      {/* <Footer /> */}
    </>
  );
};

export default ContactUs;
