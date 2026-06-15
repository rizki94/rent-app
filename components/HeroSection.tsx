"use client";

import Image from "next/image";
import { Wrench, Tag, Sparkle } from "@phosphor-icons/react";

export default function HeroSection({ phone }: { phone?: string | null }) {
  return (
    <section className="relative w-full">
      {/* Main Hero Banner */}
      <div className="relative min-h-[650px] lg:min-h-[750px] flex items-center overflow-hidden pt-28 pb-32 lg:pt-32 lg:pb-40">
        {/* Background Banner Image */}
        <Image
          src="/hero_banner.jpeg"
          alt="Background Banner"
          fill
          priority
          className="object-cover z-0 object-center scale-105 animate-slow-zoom"
        />
        {/* Premium Dark Gradient Overlay */}
        <div className="absolute inset-0 bg-[#0B132B]/80 lg:bg-gradient-to-br lg:from-[#0B132B]/95 lg:via-[#0A274E]/80 lg:to-transparent z-0 pointer-events-none" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0B132B] via-transparent to-[#0B132B]/50 z-0 pointer-events-none" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full z-10 flex flex-col lg:flex-row items-center gap-10 lg:gap-12">
          {/* Left Content */}
          <div className="w-full lg:w-[55%] text-left pt-6 pb-6">
            <div className="inline-block px-4 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/20 mb-6">
              <span className="text-sm font-medium text-amber-300 tracking-wide">
                ✨ Selamat Datang di Adhitama89
              </span>
            </div>
            <h2 className="text-[36px] sm:text-[48px] lg:text-[52px] font-extrabold text-white leading-[1.15] mb-6 tracking-tight drop-shadow-lg animate-fade-in-up">
              Sewa Mobil Bandung Lepas Kunci Terpercaya
            </h2>
            <p className="text-white/90 text-base sm:text-lg lg:text-xl font-light leading-relaxed mb-8 max-w-2xl">
              Percayakan perjalananmu pada kami, karena bersama Adhitama89{" "}
              <strong className="font-semibold text-amber-400">
                #JalanJadiMudah
              </strong>
              . Perusahaan rental terpercaya untuk setiap kebutuhan Anda.
            </p>

            <div className="flex flex-wrap gap-5 items-center">
              <a
                href="#cars"
                className="group relative overflow-hidden bg-gradient-to-r from-amber-400 to-amber-500 text-slate-900 font-bold text-[15px] px-8 sm:px-10 py-3.5 sm:py-4 rounded-full transition-all duration-300 hover:shadow-[0_0_20px_rgba(251,191,36,0.4)] hover:-translate-y-0.5 flex items-center gap-3"
              >
                <span className="relative z-10">Cek Harga</span>
                <svg
                  className="w-5 h-5 relative z-10 transform group-hover:translate-x-1 transition-transform"
                  fill="currentColor"
                  viewBox="0 0 512 512"
                >
                  <path d="M256 8c137 0 248 111 248 248S393 504 256 504 8 393 8 256 119 8 256 8zM140 300h116v70.9c0 10.7 13 16.1 20.5 8.5l114.3-114.9c4.7-4.7 4.7-12.2 0-16.9l-114.3-115c-7.6-7.6-20.5-2.2-20.5 8.5V212H140c-6.6 0-12 5.4-12 12v64c0 6.6 5.4 12 12 12z" />
                </svg>
                <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out" />
              </a>
            </div>
          </div>

          {/* Right Floating Glassmorphism Collage */}
          <div className="w-full lg:w-[45%] relative min-h-[300px] lg:min-h-[350px] flex items-center justify-center">
            {/* Ambient Background Glow */}
            <div className="absolute w-72 h-72 rounded-full bg-amber-400/20 blur-[80px] pointer-events-none" />
            <div className="absolute w-60 h-60 rounded-full bg-blue-500/20 blur-[80px] pointer-events-none translate-x-10 translate-y-10" />

            <div className="relative w-full max-w-[420px] space-y-3.5 sm:space-y-4 px-2 sm:px-0">
              {/* Glass Card 1 */}
              <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-4 sm:p-5 flex items-center gap-4 text-white shadow-lg transform lg:translate-x-[-20px] hover:translate-x-0 transition-transform duration-300 animate-float">
                <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-amber-400 flex items-center justify-center shrink-0">
                  <Wrench className="w-5 h-5 sm:w-6 sm:h-6 text-slate-900" weight="bold" />
                </div>
                <div>
                  <h4 className="font-bold text-sm sm:text-base text-amber-300">
                    Unit Terawat
                  </h4>
                  <p className="text-white/70 text-[11px] sm:text-xs mt-0.5">
                    Kondisi mesin & kebersihan interior terjamin prima.
                  </p>
                </div>
              </div>

              {/* Glass Card 2 */}
              <div
                className="bg-white/15 backdrop-blur-md border border-white/20 rounded-2xl p-4 sm:p-5 flex items-center gap-4 text-white shadow-lg transform lg:translate-x-[20px] hover:translate-x-0 transition-transform duration-300 animate-float"
                style={{ animationDelay: "1.5s" }}
              >
                <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-blue-500 flex items-center justify-center shrink-0">
                  <Tag className="w-5 h-5 sm:w-6 sm:h-6 text-white" weight="bold" />
                </div>
                <div>
                  <h4 className="font-bold text-sm sm:text-base text-blue-300">
                    Harga Bersahabat
                  </h4>
                  <p className="text-white/70 text-[11px] sm:text-xs mt-0.5">
                    Tarif sewa transparan & bersaing di seluruh Bandung.
                  </p>
                </div>
              </div>

              {/* Glass Card 3 */}
              <div
                className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-4 sm:p-5 flex items-center gap-4 text-white shadow-lg transform lg:translate-x-[-10px] hover:translate-x-0 transition-transform duration-300 animate-float"
                style={{ animationDelay: "3s" }}
              >
                <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-emerald-500 flex items-center justify-center shrink-0">
                  <Sparkle className="w-5 h-5 sm:w-6 sm:h-6 text-white" weight="bold" />
                </div>
                <div>
                  <h4 className="font-bold text-sm sm:text-base text-emerald-300">
                    Proses Mudah
                  </h4>
                  <p className="text-white/70 text-[11px] sm:text-xs mt-0.5">
                    Booking cepat langsung via chat online WhatsApp.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Stats Bar */}
      <div className="relative w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 z-20 -mt-16 sm:-mt-24 mb-20">
        <div className="bg-white/90 backdrop-blur-xl rounded-3xl border border-white shadow-[0_20px_40px_-15px_rgba(0,0,0,0.1)] p-6 sm:p-10">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
            {[
              {
                value: "2500+",
                label: "Member",
                icon: (
                  <svg
                    className="w-6 h-6 sm:w-8 sm:h-8 text-[#0A274E]"
                    fill="currentColor"
                    viewBox="0 0 576 512"
                  >
                    <path d="M528 32H48C21.5 32 0 53.5 0 80v16h576V80c0-26.5-21.5-48-48-48zM0 432c0 26.5 21.5 48 48 48h480c26.5 0 48-21.5 48-48V128H0v304zm352-232c0-4.4 3.6-8 8-8h144c4.4 0 8 3.6 8 8v16c0 4.4-3.6 8-8 8H360c-4.4 0-8-3.6-8-8v-16zm0 64c0-4.4 3.6-8 8-8h144c4.4 0 8 3.6 8 8v16c0 4.4-3.6 8-8 8H360c-4.4 0-8-3.6-8-8v-16zm0 64c0-4.4 3.6-8 8-8h144c4.4 0 8 3.6 8 8v16c0 4.4-3.6 8-8 8H360c-4.4 0-8-3.6-8-8v-16zM176 192c35.3 0 64 28.7 64 64s-28.7 64-64 64-64-28.7-64-64 28.7-64 64-64zM67.1 396.2C75.5 370.5 99.6 352 128 352h8.2c12.3 5.1 25.7 8 39.8 8s27.6-2.9 39.8-8h8.2c28.4 0 52.5 18.5 60.9 44.2 3.2 9.9-5.2 19.8-15.6 19.8H82.7c-10.4 0-18.8-10-15.6-19.8z" />
                  </svg>
                ),
              },
              {
                value: "150000+",
                label: "Customer",
                icon: (
                  <svg
                    className="w-6 h-6 sm:w-8 sm:h-8 text-[#0A274E]"
                    fill="currentColor"
                    viewBox="0 0 640 512"
                  >
                    <path d="M96 224c35.3 0 64-28.7 64-64s-28.7-64-64-64-64 28.7-64 64 28.7 64 64 64zm448 0c35.3 0 64-28.7 64-64s-28.7-64-64-64-64 28.7-64 64 28.7 64 64 64zm32 32h-64c-17.6 0-33.5 7.1-45.1 18.6 40.3 22.1 68.9 62 75.1 109.4h66c17.7 0 32-14.3 32-32v-32c0-35.3-28.7-64-64-64zm-256 0c61.9 0 112-50.1 112-112S381.9 32 320 32 208 82.1 208 144s50.1 112 112 112zm76.8 32h-8.3c-20.8 10-43.9 16-68.5 16s-47.6-6-68.5-16h-8.3C179.6 288 128 339.6 128 403.2V432c0 26.5 21.5 48 48 48h288c26.5 0 48-21.5 48-48v-28.8c0-63.6-51.6-115.2-115.2-115.2zm-223.7-13.4C161.5 263.1 145.6 256 128 256H64c-35.3 0-64 28.7-64 64v32c0 17.7 14.3 32 32 32h65.9c6.3-47.4 34.9-87.3 75.2-109.4z" />
                  </svg>
                ),
              },
              {
                value: "100+",
                label: "Units",
                icon: (
                  <svg
                    className="w-6 h-6 sm:w-8 sm:h-8 text-[#0A274E]"
                    fill="currentColor"
                    viewBox="0 0 640 512"
                  >
                    <path d="M544 192h-16L419.22 56.02A64.025 64.025 0 0 0 369.24 32H155.33c-26.17 0-49.7 15.93-59.42 40.23L48 194.26C20.44 201.4 0 226.21 0 256v112c0 8.84 7.16 16 16 16h48c0 53.02 42.98 96 96 96s96-42.98 96-96h128c0 53.02 42.98 96 96 96s96-42.98 96-96h48c8.84 0 16-7.16 16-16v-80c0-53.02-42.98-96-96-96zM160 432c-26.47 0-48-21.53-48-48s21.53-48 48-48 48 21.53 48 48-21.53 48-48 48zm72-240H116.93l38.4-96H232v96zm48 0V96h89.24l76.8 96H280zm200 240c-26.47 0-48-21.53-48-48s21.53-48 48-48 48 21.53 48 48-21.53 48-48 48z" />
                  </svg>
                ),
              },
              {
                value: "100%",
                label: "Terpercaya",
                icon: (
                  <svg
                    className="w-6 h-6 sm:w-8 sm:h-8 text-[#0A274E]"
                    fill="currentColor"
                    viewBox="0 0 512 512"
                  >
                    <path d="M223.75 130.75L154.62 15.54A31.997 31.997 0 0 0 127.18 0H16.03C3.08 0-4.5 14.57 2.92 25.18l111.27 158.96c29.72-27.77 67.52-46.83 109.56-53.39zM495.97 0H384.82c-11.24 0-21.66 5.9-27.44 15.54l-69.13 115.21c42.04 6.56 79.84 25.62 109.56 53.38L509.08 25.18C516.5 14.57 508.92 0 495.97 0zM256 160c-97.2 0-176 78.8-176 176s78.8 176 176 176 176-78.8 176-176-78.8-176-176-176zm92.52 157.26l-37.93 36.96 8.97 52.22c1.6 9.36-8.26 16.51-16.65 12.09L256 393.88l-46.9 24.65c-8.4 4.45-18.25-2.74-16.65-12.09l8.97-52.22-37.93-36.96c-6.82-6.64-3.05-18.23 6.35-19.59l52.43-7.64 23.43-47.52c2.11-4.28 6.19-6.39 10.28-6.39 4.11 0 8.22 2.14 10.33 6.39l23.43 47.52 52.43 7.64c9.4 1.36 13.17 12.95 6.35 19.59z" />
                  </svg>
                ),
              },
            ].map((stat, idx) => (
              <div key={idx} className="text-center group">
                <div className="w-12 h-12 sm:w-16 sm:h-16 mx-auto mb-3 sm:mb-5 rounded-2xl bg-[#0A274E]/5 flex items-center justify-center group-hover:bg-[#0A274E] group-hover:text-white transition-all duration-300">
                  {stat.icon}
                </div>
                <h3 className="text-[20px] sm:text-[32px] font-extrabold text-[#0A274E] leading-none mb-1 sm:mb-2">
                  {stat.value}
                </h3>
                <p className="text-[10px] sm:text-[13px] text-[#54595F] font-bold tracking-wide uppercase">
                  {stat.label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
