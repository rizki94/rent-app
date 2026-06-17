"use client";

import { useState, useEffect, useRef } from "react";
import { Star, CaretLeft, CaretRight, Quotes } from "@phosphor-icons/react";

interface TestimonialType {
  id: number;
  name: string;
  stars: number;
  comment: string;
}

const defaultTestimonials = [
  {
    id: 1,
    name: "Andi Pratama",
    comment:
      "Pelayanannya cepat dan responsif. Mobil yang datang bersih, nyaman, dan sesuai dengan foto. Proses booking juga mudah. Recommended!",
    stars: 5,
    initial: "A",
  },
  {
    id: 2,
    name: "Rina Wulandari",
    comment:
      "Sewa Avanza untuk perjalanan keluarga ke Garut. Kondisi mobil sangat baik dan tidak ada kendala selama perjalanan. Pasti akan menggunakan jasa rental ini lagi.",
    stars: 5,
    initial: "R",
  },
  {
    id: 3,
    name: "Dedi Kurniawan",
    comment:
      "Sudah beberapa kali rental di sini dan selalu puas. Harga sesuai, unit bersih, dan admin cepat merespon.",
    stars: 5,
    initial: "D",
  },
  {
    id: 4,
    name: "Sari Indah",
    comment:
      "Sangat puas dengan pelayanan Adhitama89! Mobil tepat waktu, kondisi prima, dan harga sangat terjangkau. Sudah rekomendasikan ke teman-teman.",
    stars: 5,
    initial: "S",
  },
  {
    id: 5,
    name: "Budi Santoso",
    comment:
      "Booking lewat WA sangat mudah. Armada bersih terawat. Pas banget untuk perjalanan bisnis ke luar kota. Terima kasih Adhitama89!",
    stars: 5,
    initial: "B",
  },
];

interface WhyUsSectionProps {
  initialTestimonials?: TestimonialType[];
}

export default function WhyUsSection({
  initialTestimonials,
}: WhyUsSectionProps) {
  const [page, setPage] = useState(0);
  const [isMounted, setIsMounted] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setIsMounted(true);
    const check = () => setIsMobile(window.innerWidth < 640);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  const testimonials =
    initialTestimonials && initialTestimonials.length > 0
      ? initialTestimonials.map((t, i) => ({
          ...t,
          initial: t.name.charAt(0).toUpperCase(),
        }))
      : defaultTestimonials;

  const totalPages = !isMounted
    ? 1
    : isMobile
      ? testimonials.length
      : Math.ceil(testimonials.length / 3);
  const activePage = Math.min(page, Math.max(0, totalPages - 1));

  const handlePageChange = (index: number) => {
    setPage(index);
    if (isMobile && scrollRef.current) {
      const children = scrollRef.current.children;
      if (children[index]) {
        children[index].scrollIntoView({
          behavior: "smooth",
          block: "nearest",
          inline: "center",
        });
      }
    }
  };

  const handleScroll = () => {
    if (!isMobile || !scrollRef.current) return;
    const container = scrollRef.current;
    const scrollLeft = container.scrollLeft;
    const containerWidth = container.clientWidth;
    const children = container.children;

    let activeIdx = 0;
    let minDiff = Infinity;

    for (let i = 0; i < children.length; i++) {
      const child = children[i] as HTMLElement;
      const childCenter = child.offsetLeft + child.clientWidth / 2;
      const containerCenter = scrollLeft + containerWidth / 2;
      const diff = Math.abs(childCenter - containerCenter);
      if (diff < minDiff) {
        minDiff = diff;
        activeIdx = i;
      }
    }
    setPage(activeIdx);
  };

  const avatarColors = [
    "bg-blue-600",
    "bg-violet-600",
    "bg-emerald-600",
    "bg-amber-500",
    "bg-rose-600",
  ];

  return (
    <section
      id="testimoni"
      className="py-24 bg-gradient-to-b from-slate-50 to-white relative overflow-hidden"
    >
      <div className="absolute top-0 right-0 w-[600px] h-[400px] bg-amber-50 rounded-full blur-[150px] opacity-50 pointer-events-none -translate-y-1/2 translate-x-1/3" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <div className="mb-16 text-center">
          <span
            className="inline-block text-xs font-bold uppercase tracking-[0.2em] mb-4"
            style={{ color: "var(--t-accent)" }}
          >
            Ulasan Pelanggan
          </span>
          <h2
            className="text-4xl sm:text-5xl font-extrabold mb-5"
            style={{ color: "var(--t-primary)" }}
          >
            Kata Mereka
          </h2>
          <div
            className="w-16 h-1 mx-auto rounded-full mb-5"
            style={{
              background:
                "linear-gradient(to right, var(--t-accent), color-mix(in srgb, var(--t-accent) 80%, white 20%))",
            }}
          />
          <p className="text-gray-500 text-base max-w-lg mx-auto">
            Ribuan pelanggan telah mempercayakan perjalanan mereka kepada
            Adhitama89.
          </p>
        </div>

        {/* Desktop Grid (hidden on mobile) */}
        <div className="hidden sm:grid sm:grid-cols-2 lg:grid-cols-3 gap-7 mb-10">
          {testimonials.slice(activePage * 3, activePage * 3 + 3).map((t) => {
            const colorClass = avatarColors[t.id % avatarColors.length];
            const initial = t.initial || t.name.charAt(0);
            return (
              <div
                key={t.id}
                className="group bg-white p-7 flex flex-col border border-gray-100 shadow-sm hover:shadow-xl transition-all duration-500 hover:-translate-y-2 relative overflow-hidden"
                style={{ borderRadius: "var(--t-radius, 1rem)" }}
              >
                {/* Gloss sweep on hover */}
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none overflow-hidden" style={{ borderRadius: "inherit" }}>
                  <div className="absolute top-0 left-[-100%] w-2/3 h-full bg-gradient-to-r from-transparent via-white/40 to-transparent skew-x-[-20deg] group-hover:left-[150%] transition-all duration-700 ease-in-out" />
                </div>

                {/* Big quote icon decoration */}
                <Quotes
                  className="absolute top-4 right-5 w-10 h-10 transition-all duration-500 group-hover:scale-110"
                  weight="fill"
                  style={{ color: "color-mix(in srgb, var(--t-accent) 15%, #f1f5f9)" }}
                />

                {/* Stars */}
                <div className="flex gap-1 mb-5">
                  {Array.from({ length: t.stars }).map((_, i) => (
                    <Star
                      key={i}
                      className="w-4 h-4"
                      weight="fill"
                      style={{ color: "var(--t-accent)" }}
                    />
                  ))}
                </div>

                {/* Comment */}
                <p className="text-gray-600 text-[14px] leading-relaxed mb-6 flex-1 italic relative z-10">
                  &ldquo;{t.comment}&rdquo;
                </p>

                {/* Author */}
                <div className="flex items-center gap-3 mt-auto pt-5 border-t border-gray-100 relative z-10">
                  <div
                    className={`w-10 h-10 ${colorClass} flex items-center justify-center text-white font-bold text-sm shrink-0`}
                    style={{ borderRadius: "calc(var(--t-radius, 1rem) * 0.8)" }}
                  >
                    {initial}
                  </div>
                  <div>
                    <p className="font-bold text-[15px] leading-none mb-1" style={{ color: "var(--t-primary)" }}>
                      {t.name}
                    </p>
                    <p className="text-gray-400 text-[12px]">
                      Customer Adhitama89
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Mobile Horizontal Snap-Scroll Slider */}
        <div
          ref={scrollRef}
          onScroll={handleScroll}
          className="sm:hidden flex overflow-x-auto snap-x snap-mandatory gap-6 pb-6 px-4 -mx-4 scrollbar-none scroll-smooth mb-10"
        >
          {testimonials.map((t) => {
            const colorClass = avatarColors[t.id % avatarColors.length];
            const initial = t.initial || t.name.charAt(0);
            return (
              <div
                key={t.id}
                className="w-[85vw] shrink-0 snap-center group bg-white p-7 flex flex-col border border-gray-100 shadow-sm relative overflow-hidden"
                style={{ borderRadius: "var(--t-radius, 1rem)" }}
              >
                {/* Gloss sweep on hover */}
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none overflow-hidden" style={{ borderRadius: "inherit" }}>
                  <div className="absolute top-0 left-[-100%] w-2/3 h-full bg-gradient-to-r from-transparent via-white/40 to-transparent skew-x-[-20deg] group-hover:left-[150%] transition-all duration-700 ease-in-out" />
                </div>

                {/* Big quote icon decoration */}
                <Quotes
                  className="absolute top-4 right-5 w-10 h-10 transition-all duration-500 group-hover:scale-110"
                  weight="fill"
                  style={{ color: "color-mix(in srgb, var(--t-accent) 15%, #f1f5f9)" }}
                />

                {/* Stars */}
                <div className="flex gap-1 mb-5">
                  {Array.from({ length: t.stars }).map((_, i) => (
                    <Star
                      key={i}
                      className="w-4 h-4"
                      weight="fill"
                      style={{ color: "var(--t-accent)" }}
                    />
                  ))}
                </div>

                {/* Comment */}
                <p className="text-gray-600 text-[14px] leading-relaxed mb-6 flex-1 italic relative z-10">
                  &ldquo;{t.comment}&rdquo;
                </p>

                {/* Author */}
                <div className="flex items-center gap-3 mt-auto pt-5 border-t border-gray-100 relative z-10">
                  <div
                    className={`w-10 h-10 ${colorClass} flex items-center justify-center text-white font-bold text-sm shrink-0`}
                    style={{ borderRadius: "calc(var(--t-radius, 1rem) * 0.8)" }}
                  >
                    {initial}
                  </div>
                  <div>
                    <p className="font-bold text-[15px] leading-none mb-1" style={{ color: "var(--t-primary)" }}>
                      {t.name}
                    </p>
                    <p className="text-gray-400 text-[12px]">
                      Customer Adhitama89
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex items-center justify-center gap-4">
            <button
              onClick={() => handlePageChange(Math.max(0, activePage - 1))}
              disabled={activePage === 0}
              aria-label="Previous"
              className="w-10 h-10 rounded-full border border-gray-200 bg-white flex items-center justify-center disabled:opacity-30 disabled:cursor-not-allowed transition-all hover:shadow-md hover:border-tp cursor-pointer"
              style={{ color: "var(--t-primary)" }}
            >
              <CaretLeft className="w-4 h-4" weight="bold" />
            </button>

            <div className="flex gap-2">
              {Array.from({ length: totalPages }).map((_, i) => (
                <button
                  key={i}
                  onClick={() => handlePageChange(i)}
                  aria-label={`Page ${i + 1}`}
                  className="h-2 rounded-full transition-all duration-300 cursor-pointer"
                  style={{
                    backgroundColor: i === activePage ? "var(--t-primary)" : "#d1d5db",
                    width: i === activePage ? "2rem" : "0.5rem",
                  }}
                />
              ))}
            </div>

            <button
              onClick={() =>
                handlePageChange(Math.min(totalPages - 1, activePage + 1))
              }
              disabled={activePage >= totalPages - 1}
              aria-label="Next"
              className="w-10 h-10 rounded-full border border-gray-200 bg-white flex items-center justify-center disabled:opacity-30 disabled:cursor-not-allowed transition-all hover:shadow-md hover:border-tp cursor-pointer"
              style={{ color: "var(--t-primary)" }}
            >
              <CaretRight className="w-4 h-4" weight="bold" />
            </button>
          </div>
        )}
      </div>
    </section>
  );
}
