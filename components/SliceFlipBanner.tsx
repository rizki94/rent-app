"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";

const SLICES = [
  {
    src: "/hero_bg.png",
    alt: "Armada Rental Bandung",
    clipStart: "polygon(0 0, 33.5% 0, 33.5% 100%, 0 100%)",
    clipEnd:   "polygon(0 0, 33.5% 0, 33.5% 100%, 0 100%)",
    translateY: "-100%",
    delay: 0,
    label: "Terawat",
  },
  {
    src: "/car_suv.png",
    alt: "SUV Rental",
    clipStart: "polygon(33.5% 0, 67% 0, 67% 100%, 33.5% 100%)",
    clipEnd:   "polygon(33.5% 0, 67% 0, 67% 100%, 33.5% 100%)",
    translateY: "100%",
    delay: 120,
    label: "Nyaman",
  },
  {
    src: "/car_mpv.png",
    alt: "MPV Rental",
    clipStart: "polygon(67% 0, 100% 0, 100% 100%, 67% 100%)",
    clipEnd:   "polygon(67% 0, 100% 0, 100% 100%, 67% 100%)",
    translateY: "-100%",
    delay: 240,
    label: "Terpercaya",
  },
];

export default function SliceFlipBanner({ phone }: { phone?: string | null }) {
  const sectionRef = useRef<HTMLElement>(null);
  const bgRef = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  const activePhone = phone || "6281234567890";

  // Parallax scroll
  useEffect(() => {
    const onScroll = () => {
      if (!sectionRef.current || !bgRef.current) return;
      const rect = sectionRef.current.getBoundingClientRect();
      const progress = -rect.top * 0.3;
      bgRef.current.style.transform = `translateY(${progress}px)`;
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Trigger slice-flip on intersection
  useEffect(() => {
    const obs = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setVisible(true);
          obs.disconnect();
        }
      },
      { threshold: 0.15 }
    );
    if (sectionRef.current) obs.observe(sectionRef.current);
    return () => obs.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative w-full overflow-hidden"
      style={{ minHeight: "520px" }}
    >
      {/* ── Parallax dark overlay background ── */}
      <div
        ref={bgRef}
        className="absolute will-change-transform pointer-events-none"
        style={{ inset: "-20% 0", background: "linear-gradient(135deg, var(--t-hero-from) 0%, var(--t-hero-to) 100%)" }}
      />

      {/* ── Slice panels ── */}
      <div className="absolute inset-0 overflow-hidden">
        {SLICES.map((slice, i) => (
          <div
            key={i}
            className="absolute inset-0"
            style={{
              clipPath: slice.clipEnd,
              transform: visible ? "translateY(0)" : `translateY(${slice.translateY})`,
              transition: `transform 0.9s cubic-bezier(0.16,1,0.3,1) ${slice.delay}ms`,
              willChange: "transform",
            }}
          >
            <Image
              src={slice.src}
              alt={slice.alt}
              fill
              className="object-cover"
              sizes="33vw"
              priority={i === 0}
            />
            {/* Per-slice dark tint + label */}
            <div
              className="absolute inset-0 flex flex-col items-center justify-end pb-10"
              style={{ background: "linear-gradient(to top, rgba(0,0,0,0.65) 0%, rgba(0,0,0,0.1) 60%, transparent 100%)" }}
            >
              <span
                className="text-white font-extrabold text-2xl sm:text-3xl tracking-widest uppercase opacity-0 transition-all duration-700"
                style={{
                  opacity: visible ? 1 : 0,
                  transform: visible ? "translateY(0)" : "translateY(16px)",
                  transitionDelay: `${slice.delay + 500}ms`,
                  letterSpacing: "0.2em",
                  textShadow: "0 2px 16px rgba(0,0,0,0.6)",
                }}
              >
                {slice.label}
              </span>
              {/* Accent underline */}
              <div
                className="h-[3px] mt-2 transition-all duration-700 ease-out"
                style={{
                  backgroundColor: "var(--t-accent)",
                  width: visible ? "48px" : "0px",
                  transitionDelay: `${slice.delay + 650}ms`,
                }}
              />
            </div>

            {/* Slice separator line */}
            {i < SLICES.length - 1 && (
              <div
                className="absolute top-0 right-0 w-[2px] h-full transition-all duration-700"
                style={{
                  background: "linear-gradient(to bottom, transparent, var(--t-accent), transparent)",
                  opacity: visible ? 0.8 : 0,
                  transitionDelay: `${slice.delay + 400}ms`,
                }}
              />
            )}
          </div>
        ))}
      </div>

      {/* ── Overlay content (center CTA) ── */}
      <div className="relative z-10 flex flex-col items-center justify-center text-center h-full px-4 py-24 sm:py-32">
        {/* Badge */}
        <div
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-white/25 bg-black/30 backdrop-blur-md mb-8 transition-all duration-700"
          style={{
            opacity: visible ? 1 : 0,
            transform: visible ? "translateY(0) scale(1)" : "translateY(-20px) scale(0.95)",
            transitionDelay: "350ms",
          }}
        >
          <span className="w-2 h-2 rounded-full" style={{ backgroundColor: "var(--t-accent)" }} />
          <span className="text-white/90 text-sm font-semibold tracking-widest uppercase">Armada Premium</span>
        </div>

        {/* Headline with diagonal slice-reveal */}
        <div className="overflow-hidden mb-3">
          <h2
            className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white leading-tight transition-all duration-900 ease-[cubic-bezier(0.16,1,0.3,1)]"
            style={{
              transform: visible ? "translateY(0) skewY(0deg)" : "translateY(100%) skewY(4deg)",
              opacity: visible ? 1 : 0,
              transitionDuration: "800ms",
              transitionDelay: "200ms",
            }}
          >
            Armada Kami,{" "}
            <span
              className="inline-block"
              style={{
                background: "linear-gradient(to right, var(--t-accent), color-mix(in srgb, var(--t-accent) 70%, white))",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              Kenyamanan Anda
            </span>
          </h2>
        </div>

        <div className="overflow-hidden mb-10">
          <p
            className="text-white/70 text-lg max-w-xl transition-all duration-700"
            style={{
              transform: visible ? "translateY(0)" : "translateY(100%)",
              opacity: visible ? 1 : 0,
              transitionDelay: "400ms",
            }}
          >
            Pilihan kendaraan berkualitas untuk perjalanan bisnis, wisata, atau keluarga — semua tersedia di Adhitama89.
          </p>
        </div>

        {/* CTA */}
        <div
          className="flex flex-wrap gap-4 justify-center transition-all duration-700"
          style={{
            opacity: visible ? 1 : 0,
            transform: visible ? "translateY(0)" : "translateY(24px)",
            transitionDelay: "550ms",
          }}
        >
          <a
            href="#cars"
            className="group relative overflow-hidden inline-flex items-center gap-2.5 font-bold text-[15px] px-8 py-4 transition-all duration-300 hover:shadow-2xl hover:-translate-y-1"
            style={{
              backgroundColor: "var(--t-accent)",
              color: "var(--t-accent-fg)",
              borderRadius: "calc(var(--t-radius, 1.5rem) * 1.5)",
            }}
          >
            <span className="absolute inset-0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700 bg-gradient-to-r from-transparent via-white/30 to-transparent" />
            <span className="relative z-10">Lihat Harga Sewa</span>
          </a>
          <a
            href={`https://wa.me/${activePhone}?text=Halo%20Adhitama89!%20Saya%20tertarik%20menyewa%20mobil`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2.5 font-semibold text-[15px] px-8 py-4 border-2 border-white/40 text-white hover:bg-white/15 hover:border-white transition-all duration-300 hover:-translate-y-1"
            style={{ borderRadius: "calc(var(--t-radius, 1.5rem) * 1.5)" }}
          >
            Pesan Sekarang
          </a>
        </div>
      </div>

      {/* Bottom gradient fade */}
      <div className="absolute bottom-0 left-0 right-0 h-16 pointer-events-none"
        style={{ background: "linear-gradient(to bottom, transparent, rgba(0,0,0,0.2))" }}
      />
    </section>
  );
}
