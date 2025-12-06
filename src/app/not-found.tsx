import Footer from "@/components/Footer/Footer";
import Image from "next/image";
import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col justify-between bg-white">
      {/* ===== 404 Main Section ===== */}
      <section className="flex flex-col md:flex-row items-center justify-center flex-1 px-6 py-16 md:py-24">
        {/* Illustration */}
        <div className="flex-1 flex justify-center mt-30">
          <Image
            src="/images/error-404.png"
            alt="404 Illustration"
            width={400}
            height={400}
            className="object-contain"
          />
        </div>

        {/* Text Section */}
        <div className="flex-1 text-center md:text-left">
          <h1 className="text-[100px] font-extrabold text-[#00C9FF]">404</h1>
          <h2 className="text-2xl md:text-3xl font-semibold text-gray-800 mt-2">
            We’re Sorry, Page Not Found
          </h2>
          <p className="text-gray-600 mt-3 max-w-md">
            The page you’re looking for might have been removed, had its name
            changed, or is temporarily unavailable.
          </p>

          <div className="flex gap-3 mt-6 justify-center md:justify-start">
            <Link href="/">
              <button className="relative px-4 h-9 overflow-hidden group border border-[#00c9ff] bg-[#00c9ff] rounded-lg from-gray-700/50 to-black hover:bg-transparent text-white hover:text-[#00c9ff] active:scale-90 transition-all ease-out duration-700 cursor-pointer">
                <span className="absolute right-0 w-10 h-full top-0 transition-all duration-1000 transform translate-x-12 bg-white opacity-10 -skew-x-12 group-hover:-translate-x-24 ease"></span>
                <span className="relative flex gap-2 items-center text-sm font-semibold">
                  Go&nbsp;to&nbsp;Home
                </span>
              </button>
            </Link>
            <Link href="/jobs">
              <button className="relative px-4 h-9 overflow-hidden group border border-[#00c9ff] bg-transparent text-[#00c9ff] rounded-lg hover:bg-[#00c9ff] hover:text-white active:scale-90 transition-all ease-out duration-700 cursor-pointer flex items-center justify-center">
                <span className="absolute right-0 w-10 h-full top-0 transition-all duration-1000 transform translate-x-12 bg-white opacity-10 -skew-x-12 group-hover:-translate-x-24 ease"></span>
                <span className="relative flex gap-2 items-center text-sm font-semibold">
                  Browse&nbsp;Jobs
                </span>
              </button>
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
