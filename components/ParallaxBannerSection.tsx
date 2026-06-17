"use client";

import { useEffect, useRef, useState } from "react";

interface Stat {
  value: string;
  label: string;
  suffix?: string;
}

const STATS: Stat[] = [
  { value: "2500", label: "Pelanggan Puas", suffix: "+" },
  { value: "8", label: "Tahun Pengalaman", suffix: "+" },
  { value: "50", label: "Armada Pilihan", suffix: "+" },
  { value: "24", label: "Jam Siap Melayani", suffix: "/7" },
];

const HEADLINE_SLICES = [
  "Perjalanan Anda",
  "Dimulai Dari Sini.",
];

// Simple animated counter hook
function useCounter(target: number, duration = 1400, started = false) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (!started) return;
    let start = 0;
    const step = target / (duration / 16);
    const timer = setInterval(() => {
      start += step;
      if (start >= target) {
        setCount(target);
        clearInterval(timer);
      } else {
        setCount(Math.floor(start));
      }
    }, 16);
    return () => clearInterval(timer);
  }, [target, duration, started]);
  return count;
}

function StatItem({ stat, started }: { stat: Stat; started: boolean }) {
  const num = parseInt(stat.value);
  const count = useCounter(num, 1600, started);
  return (
    <div className="text-center group">
      <div className="text-4xl sm:text-5xl font-extrabold tabular-nums leading-none mb-2 transition-transform duration-300 group-hover:scale-110"
        style={{ color: "var(--t-accent)" }}>
        {count}{stat.suffix}
      </div>
      <div className="text-white/70 text-[13px] sm:text-[15px] font-medium tracking-wide uppercase">
        {stat.label}
      </div>
    </div>
  );
}

export default function ParallaxBannerSection({ phone }: { phone?: string | null }) {
  const sectionRef = useRef<HTMLElement>(null);
  const bgRef = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  const [statsVisible, setStatsVisible] = useState(false);
  const statsRef = useRef<HTMLDivElement>(null);

  // Parallax — move background at 40% scroll speed
  useEffect(() => {
    const handleScroll = () => {
      if (!sectionRef.current || !bgRef.current) return;
      const rect = sectionRef.current.getBoundingClientRect();
      const scrollProgress = -rect.top;
      bgRef.current.style.transform = `translateY(${scrollProgress * 0.4}px)`;
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Slice-flip + stats counter triggered by IntersectionObserver
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            setVisible(true);
            observer.unobserve(e.target);
          }
        });
      },
      { threshold: 0.2 }
    );
    const statsObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            setStatsVisible(true);
            statsObserver.unobserve(e.target);
          }
        });
      },
      { threshold: 0.4 }
    );

    if (sectionRef.current) observer.observe(sectionRef.current);
    if (statsRef.current) statsObserver.observe(statsRef.current);

    return () => {
      observer.disconnect();
      statsObserver.disconnect();
    };
  }, []);

  const activePhone = phone || "6281234567890";

  return (
    <section
      ref={sectionRef}
      className="relative w-full overflow-hidden"
      style={{ minHeight: "560px" }}
    >
      {/* ── Parallax Background ─────────────────────────── */}
      <div
        ref={bgRef}
        className="absolute inset-0 will-change-transform"
        style={{
          top: "-20%",
          bottom: "-20%",
          background: "linear-gradient(135deg, var(--t-hero-from) 0%, var(--t-hero-to) 60%, color-mix(in srgb, var(--t-accent) 25%, var(--t-hero-to)) 100%)",
        }}
      />

      {/* Diagonal accent strip */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: `linear-gradient(135deg, 
            transparent 0%, 
            transparent 55%, 
            color-mix(in srgb, var(--t-accent) 12%, transparent) 55%, 
            color-mix(in srgb, var(--t-accent) 12%, transparent) 100%)`,
        }}
      />

      {/* Noise/texture overlay */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='1'/%3E%3C/svg%3E")`,
        }}
      />

      {/* ── Content ────────────────────────────────────── */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 sm:py-32 flex flex-col items-center text-center">

        {/* Pill badge */}
        <div
          className={`inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-white/20 bg-white/10 backdrop-blur-md mb-8 transition-all duration-700 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}
        >
          <span className="w-2 h-2 rounded-full animate-pulse" style={{ backgroundColor: "var(--t-accent)" }} />
          <span className="text-white/90 text-sm font-medium tracking-wide">
            Rental Mobil #1 di Bandung
          </span>
        </div>

        {/* ── Slice-flip headline ────────────────────────── */}
        <h2 className="text-4xl sm:text-5xl lg:text-7xl font-extrabold text-white leading-[1.1] mb-6 overflow-hidden">
          {HEADLINE_SLICES.map((line, li) => (
            <span key={li} className="block overflow-hidden">
              <span
                className="block transition-all ease-[cubic-bezier(0.16,1,0.3,1)]"
                style={{
                  transitionDuration: `${700 + li * 150}ms`,
                  transitionDelay: `${li * 120}ms`,
                  transform: visible ? "translateY(0) rotateX(0deg)" : "translateY(110%) rotateX(-80deg)",
                  opacity: visible ? 1 : 0,
                  transformOrigin: "50% 0%",
                  display: "block",
                }}
              >
                {/* Slice the line into character spans for flip */}
                {line.split("").map((char, ci) => (
                  <span
                    key={ci}
                    className="inline-block transition-all ease-[cubic-bezier(0.16,1,0.3,1)]"
                    style={{
                      transitionDuration: "600ms",
                      transitionDelay: visible ? `${li * 100 + ci * 18}ms` : "0ms",
                      transform: visible ? "translateY(0) rotateX(0deg)" : "translateY(80%) rotateX(-60deg)",
                      opacity: visible ? 1 : 0,
                      whiteSpace: char === " " ? "pre" : "normal",
                    }}
                  >
                    {char === " " ? "\u00A0" : char}
                  </span>
                ))}
              </span>
            </span>
          ))}
        </h2>

        {/* Subtitle with fade-in-up */}
        <p
          className="text-white/70 text-lg sm:text-xl max-w-2xl leading-relaxed mb-10 transition-all duration-700"
          style={{
            transitionDelay: "400ms",
            transform: visible ? "translateY(0)" : "translateY(24px)",
            opacity: visible ? 1 : 0,
          }}
        >
          Adhitama89 hadir untuk memastikan setiap perjalanan Anda di Bandung dan sekitarnya berjalan lancar, aman, dan nyaman — kapan saja, di mana saja.
        </p>

        {/* CTA Buttons */}
        <div
          className="flex flex-wrap gap-4 justify-center transition-all duration-700"
          style={{
            transitionDelay: "560ms",
            transform: visible ? "translateY(0)" : "translateY(24px)",
            opacity: visible ? 1 : 0,
          }}
        >
          <a
            href="#cars"
            className="group relative overflow-hidden inline-flex items-center gap-3 font-bold text-[15px] px-8 py-4 transition-all duration-300 hover:shadow-2xl hover:-translate-y-1"
            style={{
              backgroundColor: "var(--t-accent)",
              color: "var(--t-accent-fg)",
              borderRadius: "calc(var(--t-radius, 1.5rem) * 1.5)",
            }}
          >
            {/* Shimmer sweep */}
            <span className="absolute inset-0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700 bg-gradient-to-r from-transparent via-white/25 to-transparent" />
            <span className="relative z-10">Cek Armada</span>
            <svg className="w-5 h-5 relative z-10 group-hover:translate-x-1 transition-transform" fill="currentColor" viewBox="0 0 512 512">
              <path d="M256 8c137 0 248 111 248 248S393 504 256 504 8 393 8 256 119 8 256 8zM140 300h116v70.9c0 10.7 13 16.1 20.5 8.5l114.3-114.9c4.7-4.7 4.7-12.2 0-16.9l-114.3-115c-7.6-7.6-20.5-2.2-20.5 8.5V212H140c-6.6 0-12 5.4-12 12v64c0 6.6 5.4 12 12 12z" />
            </svg>
          </a>

          <a
            href={`https://wa.me/${activePhone}?text=Halo%20Adhitama89!%20Saya%20ingin%20mengetahui%20lebih%20lanjut`}
            target="_blank"
            rel="noopener noreferrer"
            className="group inline-flex items-center gap-3 font-semibold text-[15px] px-8 py-4 border-2 border-white/40 text-white hover:bg-white/10 hover:border-white transition-all duration-300 hover:-translate-y-1"
            style={{ borderRadius: "calc(var(--t-radius, 1.5rem) * 1.5)" }}
          >
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 448 512">
              <path d="M380.9 97.1C339 55.1 283.2 32 223.9 32c-122.4 0-222 99.6-222 222 0 39.1 10.2 77.3 29.6 111L0 480l117.7-30.9c32.4 17.7 68.9 27 106.1 27h.1c122.3 0 224.1-99.6 224.1-222 0-59.3-25.2-115-67.1-157zm-157 341.6c-33.2 0-65.7-8.9-94-25.7l-6.7-4-69.8 18.3L72 359.2l-4.4-7c-18.5-29.4-28.2-63.3-28.2-98.2 0-101.7 82.8-184.5 184.6-184.5 49.3 0 95.6 19.2 130.4 54.1 34.8 34.9 56.2 81.2 56.1 130.5 0 101.8-84.9 184.6-186.6 184.6zm101.2-138.2c-5.5-2.8-32.8-16.2-37.9-18-5.1-1.9-8.8-2.8-12.5 2.8-3.7 5.6-14.3 18-17.6 21.8-3.2 3.7-6.5 4.2-12 1.4-32.6-16.3-54-29.1-75.5-66-5.7-9.8 5.7-9.1 16.3-30.3 1.8-3.7.9-6.9-.5-9.7-1.4-2.8-12.5-30.1-17.1-41.2-4.5-10.8-9.1-9.3-12.5-9.5-3.2-.2-6.9-.2-10.6-.2-3.7 0-9.7 1.4-14.8 6.9-5.1 5.6-19.4 19-19.4 46.3 0 27.3 19.9 53.7 22.6 57.4 2.8 3.7 39.1 59.7 94.8 83.8 35.2 15.2 49 16.5 66.6 13.9 10.7-1.6 32.8-13.4 37.4-26.4 4.6-13 4.6-24.1 3.2-26.4-1.3-2.5-5-3.9-10.5-6.6z" />
            </svg>
            Hubungi WhatsApp
          </a>
        </div>

        {/* ── Animated Stats Strip ──────────────────────── */}
        <div
          ref={statsRef}
          className="mt-20 w-full max-w-4xl mx-auto"
          style={{
            transition: "opacity 0.8s ease, transform 0.8s ease",
            transitionDelay: "200ms",
            opacity: statsVisible ? 1 : 0,
            transform: statsVisible ? "translateY(0)" : "translateY(32px)",
          }}
        >
          {/* Divider */}
          <div className="w-full h-px mb-12"
            style={{ background: "linear-gradient(to right, transparent, color-mix(in srgb, var(--t-accent) 40%, white 60%), transparent)" }}
          />

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 sm:gap-12">
            {STATS.map((s) => (
              <StatItem key={s.label} stat={s} started={statsVisible} />
            ))}
          </div>
        </div>
      </div>

      {/* Bottom fade to next section */}
      <div className="absolute bottom-0 left-0 right-0 h-24 pointer-events-none"
        style={{ background: "linear-gradient(to bottom, transparent, rgba(0,0,0,0.15))" }}
      />
    </section>
  );
}
