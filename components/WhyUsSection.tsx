"use client";

import { useState } from "react";
import { Star, CaretLeft, CaretRight } from "@phosphor-icons/react";

interface TestimonialType {
  id: number;
  name: string;
  stars: number;
  comment: string;
}

const defaultTestimonials = [
  {
    name: "Andi",
    comment:
      "Pelayanannya cepat dan responsif. Mobil yang datang bersih, nyaman, dan sesuai dengan foto. Proses booking juga mudah. Recommended!",
    stars: 5,
  },
  {
    name: "Rina",
    comment:
      "Sewa Avanza untuk perjalanan keluarga ke Garut. Kondisi mobil sangat baik dan tidak ada kendala selama perjalanan. Pasti akan menggunakan jasa rental ini lagi.",
    stars: 5,
  },
  {
    name: "Dedi",
    comment:
      "Sudah beberapa kali rental di sini dan selalu puas. Harga sesuai, unit bersih, dan admin cepat merespon.",
    stars: 5,
  },
  {
    name: "Sari",
    comment:
      "Sangat puas dengan pelayanan Adhitama89! Mobil tepat waktu, kondisi prima, dan harga sangat terjangkau. Sudah rekomendasikan ke teman-teman.",
    stars: 5,
  },
  {
    name: "Budi",
    comment:
      "Booking lewat WA sangat mudah. Armada bersih terawat. Pas banget untuk perjalanan bisnis ke luar kota. Terima kasih Adhitama89!",
    stars: 5,
  },
];

interface WhyUsSectionProps {
  initialTestimonials?: TestimonialType[];
}

export default function WhyUsSection({
  initialTestimonials,
}: WhyUsSectionProps) {
  const [page, setPage] = useState(0);
  const testimonials =
    initialTestimonials && initialTestimonials.length > 0
      ? initialTestimonials
      : defaultTestimonials;

  const perPage = 3;
  const totalPages = Math.ceil(testimonials.length / perPage);
  const visible = testimonials.slice(page * perPage, page * perPage + perPage);

  return (
    <section id="testimoni" className="py-20 bg-white relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <div className="text-center mb-16 select-none">
          <div className="inline-flex items-center gap-1.5 bg-[#2d3e8c]/5 border border-[#2d3e8c]/10 px-4.5 py-2 rounded-full mb-4">
            <span className="text-[#2d3e8c] font-black text-xs sm:text-sm uppercase tracking-widest">
              Ulasan Pelanggan
            </span>
          </div>
          <h2 className="text-5xl sm:text-6xl font-black italic text-[#2d3e8c] mb-4 tracking-tight">
            Apa Kata Mereka?
          </h2>
          <div className="w-20 h-1 bg-gradient-to-r from-blue-400 to-[#2d3e8c] mx-auto mb-4" />
          <p className="text-gray-500 text-lg sm:text-xl max-w-3xl mx-auto">
            Dengarkan pengalaman nyata dari pelanggan setia kami yang telah menggunakan jasa sewa mobil Adhitama89.
          </p>
        </div>
 
        {/* Carousel */}
        <div className="relative flex items-center gap-4">
          {/* Prev */}
          <button
            onClick={() => setPage((p) => Math.max(0, p - 1))}
            disabled={page === 0}
            aria-label="Previous testimonial"
            className="shrink-0 w-11 h-11 rounded-2xl border border-slate-100 bg-white shadow-sm flex items-center justify-center text-gray-600 hover:border-[#2d3e8c] hover:text-[#2d3e8c] disabled:opacity-30 disabled:cursor-not-allowed transition-all hover:shadow-md cursor-pointer"
          >
            <CaretLeft className="w-5 h-5" weight="bold" />
          </button>
 
          {/* Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 flex-1">
            {visible.map((t, index) => (
              <div
                key={t.name + "-" + index}
                className="bg-white border border-slate-100 rounded-3xl p-8 flex flex-col justify-between items-start text-left relative overflow-hidden shadow-sm hover:shadow-md transition-shadow min-h-60"
              >
                {/* Decorative Giant Quote */}
                <span className="absolute -top-4 -right-1 text-slate-100 font-serif text-[130px] leading-none pointer-events-none select-none font-bold opacity-75">
                  &ldquo;
                </span>

                <div className="relative z-10 w-full flex flex-col justify-between h-full">
                  <div>
                    {/* Stars */}
                    <div className="flex gap-0.5 mb-5">
                      {Array.from({ length: t.stars }).map((_, i) => (
                        <Star
                          key={i}
                          className="w-4.5 h-4.5 text-amber-400"
                          weight="fill"
                        />
                      ))}
                    </div>
                    
                    {/* Comment */}
                    <p className="text-gray-600 text-base leading-relaxed mb-6 italic">
                      &ldquo;{t.comment}&rdquo;
                    </p>
                  </div>

                  {/* Customer Name */}
                  <h3 className="text-gray-900 font-black text-lg uppercase tracking-wider mt-auto border-t border-slate-50 pt-4 w-full">
                    {t.name}
                  </h3>
                </div>
              </div>
            ))}
          </div>
 
          {/* Next */}
          <button
            onClick={() => setPage((p) => Math.min(totalPages - 1, p + 1))}
            disabled={page >= totalPages - 1}
            aria-label="Next testimonial"
            className="shrink-0 w-11 h-11 rounded-2xl border border-slate-100 bg-white shadow-sm flex items-center justify-center text-gray-600 hover:border-[#2d3e8c] hover:text-[#2d3e8c] disabled:opacity-30 disabled:cursor-not-allowed transition-all hover:shadow-md cursor-pointer"
          >
            <CaretRight className="w-5 h-5" weight="bold" />
          </button>
        </div>
 
        {/* Dots */}
        {totalPages > 1 && (
          <div className="flex justify-center gap-2.5 mt-10">
            {Array.from({ length: totalPages }).map((_, i) => (
              <button
                key={i}
                onClick={() => setPage(i)}
                aria-label={`Testimonial page ${i + 1}`}
                className={`h-2.5 rounded-full transition-all duration-300 cursor-pointer ${
                  i === page ? "bg-[#2d3e8c] w-8 shadow-sm" : "bg-gray-300 w-2.5 hover:bg-gray-400"
                }`}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
