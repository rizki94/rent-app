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

export default function WhyUsSection({ initialTestimonials }: WhyUsSectionProps) {
  const [page, setPage] = useState(0);
  const testimonials = initialTestimonials && initialTestimonials.length > 0 ? initialTestimonials : defaultTestimonials;

  const perPage = 3;
  const totalPages = Math.ceil(testimonials.length / perPage);
  const visible = testimonials.slice(page * perPage, page * perPage + perPage);

  return (
    <section id="testimoni" className="py-16 bg-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <div className="text-center mb-10">
          <h2 className="text-5xl font-black italic text-[#2d3e8c] mb-3">
            Kata Mereka
          </h2>
          <div className="w-20 h-1 bg-[#2d3e8c] mx-auto mb-4" />
          <p className="text-gray-500 text-lg sm:text-xl">
            Beberapa Testimoni dari Google Maps dan Website
          </p>
        </div>

        {/* Carousel */}
        <div className="relative flex items-center gap-4">
          {/* Prev */}
          <button
            onClick={() => setPage((p) => Math.max(0, p - 1))}
            disabled={page === 0}
            aria-label="Previous testimonial"
            className="shrink-0 w-10 h-10 rounded-full border-2 border-gray-200 flex items-center justify-center text-gray-500 hover:border-[#2d3e8c] hover:text-[#2d3e8c] disabled:opacity-30 disabled:cursor-not-allowed transition-all"
          >
            <CaretLeft className="w-5 h-5" weight="bold" />
          </button>

          {/* Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 flex-1">
            {visible.map((t, index) => (
              <div
                key={t.name + "-" + index}
                className="bg-[#2d3e8c] rounded-3xl px-6 py-8 flex flex-col items-center text-center justify-between"
              >
                <div className="flex flex-col items-center w-full">
                  <h3 className="text-white font-black text-2xl mb-3">{t.name}</h3>
                  <div className="flex gap-1 mb-5">
                    {Array.from({ length: t.stars }).map((_, i) => (
                      <Star
                        key={i}
                        className="w-6 h-6 text-amber-400"
                        weight="fill"
                      />
                    ))}
                  </div>
                  <p className="text-white/90 text-base sm:text-lg leading-relaxed italic">
                    "{t.comment}"
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Next */}
          <button
            onClick={() => setPage((p) => Math.min(totalPages - 1, p + 1))}
            disabled={page >= totalPages - 1}
            aria-label="Next testimonial"
            className="shrink-0 w-10 h-10 rounded-full border-2 border-gray-200 flex items-center justify-center text-gray-500 hover:border-[#2d3e8c] hover:text-[#2d3e8c] disabled:opacity-30 disabled:cursor-not-allowed transition-all"
          >
            <CaretRight className="w-5 h-5" weight="bold" />
          </button>
        </div>

        {/* Dots */}
        {totalPages > 1 && (
          <div className="flex justify-center gap-2 mt-6">
            {Array.from({ length: totalPages }).map((_, i) => (
              <button
                key={i}
                onClick={() => setPage(i)}
                aria-label={`Testimonial page ${i + 1}`}
                className={`h-2.5 rounded-full transition-all duration-200 ${
                  i === page ? "bg-[#2d3e8c] w-6" : "bg-gray-300 w-2.5"
                }`}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
