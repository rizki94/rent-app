"use client";

import { useState } from "react";
import Image from "next/image";
import { CaretLeftIcon, CaretRightIcon } from "@phosphor-icons/react";

interface CarType {
  id: number;
  name: string;
  price: string;
  qty: number;
  pricePer: string;
  image: string;
}

const defaultCars = [
  {
    id: 1,
    name: "Toyota Alphard",
    image: "/car_sedan.png",
    price: "1.200.000",
    pricePer: "day",
    qty: 5,
  },
  {
    id: 2,
    name: "Toyota Fortuner",
    image: "/car_suv.png",
    price: "950.000",
    pricePer: "day",
    qty: 4,
  },
  {
    id: 3,
    name: "Toyota Innova Zenix",
    image: "/car_mpv.png",
    price: "250.000 - 375.000",
    pricePer: "day",
    qty: 8,
  },
];

function formatPrice(price: string) {
  if (price.includes(".") || price.includes("-") || price.includes(" ")) {
    return price;
  }
  const num = parseInt(price);
  if (!isNaN(num)) {
    return num.toLocaleString("id-ID");
  }
  return price;
}

function CarCard({
  car,
  phone,
}: {
  car: CarType | (typeof defaultCars)[0];
  phone: string;
}) {
  return (
    <article
      id={`car-${car.id}`}
      className="bg-white border border-slate-100 rounded-3xl overflow-hidden shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col min-w-0 w-full"
    >
      {/* Car image area with spotlight background */}
      <div className="relative bg-gradient-to-b from-slate-50 to-white flex items-center justify-center px-4 py-8 overflow-hidden h-48">
        {/* Glow backdrop */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(45,62,140,0.05)_0%,transparent_70%)] pointer-events-none" />
        {/* Urgent unit stock badge
        {car.qty <= 2 ? (
          <div className="absolute top-4 left-4 bg-rose-500 text-white font-black text-[11px] uppercase tracking-widest px-3 py-1.5 rounded-full z-10 animate-pulse">
            Sisa {car.qty} Unit!
          </div>
        ) : (
          <div className="absolute top-4 left-4 bg-emerald-500/10 text-emerald-600 border border-emerald-500/20 font-black text-[11px] uppercase tracking-widest px-3 py-1.5 rounded-full z-10">
            Tersedia
          </div>
        )} */}
        <div className="relative w-full h-36 transform hover:scale-105 transition-transform duration-500">
          <Image
            src={car.image}
            alt={car.name}
            fill
            className="object-contain"
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          />
        </div>
      </div>

      {/* Info & Price */}
      <div className="p-6 flex-1 flex flex-col justify-between border-t border-slate-50">
        <div className="mb-5">
          <h3 className="text-gray-900 font-black text-2xl mb-2 tracking-tight">
            {car.name}
          </h3>
          <div className="flex items-center gap-1.5 text-sm text-gray-500">
            <span>Kategori:</span>
            <span className="font-bold text-gray-700">Premium armada</span>
          </div>
        </div>

        {/* Pricing & CTA */}
        <div className="flex items-center justify-between border-t border-slate-50 pt-4">
          <div>
            <span className="text-gray-400 text-xs font-semibold block uppercase tracking-wider mb-0.5">
              Mulai dari
            </span>
            <div className="flex items-baseline gap-1">
              <span className="text-[#2d3e8c] font-black text-md tracking-tight">
                Rp {formatPrice(car.price)}
              </span>
              <span className="text-gray-500 text-sm">
                /{car.pricePer || "day"}
              </span>
            </div>
          </div>
          <a
            href={`https://wa.me/${phone}?text=Halo%20Adhitama89!%20Saya%20ingin%20menyewa%20${encodeURIComponent(car.name)}`}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-[#2d3e8c] hover:bg-[#1e2d6e] text-white font-black text-sm uppercase tracking-widest px-5 py-3.5 rounded-xl transition-all duration-300 shadow-md hover:shadow-lg hover:-translate-y-0.5"
          >
            Booking
          </a>
        </div>
      </div>
    </article>
  );
}

interface CarListSectionProps {
  initialCars?: CarType[];
  phone?: string | null;
}

export default function CarListSection({
  initialCars,
  phone,
}: CarListSectionProps) {
  const [page, setPage] = useState(0);
  const cars =
    initialCars && initialCars.length > 0 ? initialCars : defaultCars;
  const activePhone = phone || "6281234567890";

  const perPage = 3;
  const totalPages = Math.ceil(cars.length / perPage);
  const visible = cars.slice(page * perPage, page * perPage + perPage);

  return (
    <section
      id="cars"
      className="py-20 bg-gradient-to-b from-slate-50 to-white relative"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <div className="text-center mb-16 select-none">
          <div className="inline-flex items-center gap-1.5 bg-[#2d3e8c]/5 border border-[#2d3e8c]/10 px-4.5 py-2 rounded-full mb-4">
            <span className="text-[#2d3e8c] font-black text-xs sm:text-sm uppercase tracking-widest">
              Price List &amp; Katalog
            </span>
          </div>
          <h2 className="text-5xl sm:text-6xl font-black italic text-[#2d3e8c] mb-4 tracking-tight">
            Armada Pilihan Terpopuler
          </h2>
          <div className="w-20 h-1 bg-gradient-to-r from-blue-400 to-[#2d3e8c] mx-auto mb-4" />
          <p className="text-gray-500 text-lg sm:text-xl max-w-3xl mx-auto">
            Temukan unit kendaraan sewa terbaik dengan harga murah transparan.
            Semua mobil dalam kondisi prima dan bersih terawat.
          </p>
        </div>

        {/* Carousel Container */}
        <div className="relative flex items-center gap-4">
          {/* Prev Arrow */}
          <button
            onClick={() => setPage((p) => Math.max(0, p - 1))}
            disabled={page === 0}
            aria-label="Previous"
            className="shrink-0 w-11 h-11 rounded-2xl border border-slate-100 bg-white shadow-sm flex items-center justify-center text-gray-600 hover:border-[#2d3e8c] hover:text-[#2d3e8c] disabled:opacity-30 disabled:cursor-not-allowed transition-all hover:shadow-md cursor-pointer"
          >
            <CaretLeftIcon className="w-5 h-5" weight="bold" />
          </button>

          {/* Cards Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 flex-1">
            {visible.map((car) => (
              <CarCard key={car.id} car={car} phone={activePhone} />
            ))}
          </div>

          {/* Next Arrow */}
          <button
            onClick={() => setPage((p) => Math.min(totalPages - 1, p + 1))}
            disabled={page >= totalPages - 1}
            aria-label="Next"
            className="shrink-0 w-11 h-11 rounded-2xl border border-slate-100 bg-white shadow-sm flex items-center justify-center text-gray-600 hover:border-[#2d3e8c] hover:text-[#2d3e8c] disabled:opacity-30 disabled:cursor-not-allowed transition-all hover:shadow-md cursor-pointer"
          >
            <CaretRightIcon className="w-5 h-5" weight="bold" />
          </button>
        </div>

        {/* Dots Pagination */}
        {totalPages > 1 && (
          <div className="flex justify-center gap-2.5 mt-10">
            {Array.from({ length: totalPages }).map((_, i) => (
              <button
                key={i}
                onClick={() => setPage(i)}
                aria-label={`Page ${i + 1}`}
                className={`h-2.5 rounded-full transition-all duration-300 cursor-pointer ${
                  i === page
                    ? "bg-[#2d3e8c] w-8 shadow-sm"
                    : "bg-gray-300 w-2.5 hover:bg-gray-400"
                }`}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
