"use client";

import { useState } from "react";
import Image from "next/image";
import { CaretLeft, CaretRight } from "@phosphor-icons/react";

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

function CarCard({ car, phone }: { car: CarType | (typeof defaultCars)[0]; phone: string }) {
  return (
    <article
      id={`car-${car.id}`}
      className="bg-[#2d3e8c] rounded-2xl overflow-hidden flex flex-col min-w-0 w-full"
    >
      {/* Car name bar */}
      <div className="px-5 pt-5 pb-2">
        <span className="text-white font-semibold text-base">{car.name}</span>
      </div>

      {/* Car image area */}
      <div className="relative bg-[#2d3e8c] flex items-center justify-center px-4 py-4 flex-1">
        <div className="relative w-full h-40">
          <Image
            src={car.image}
            alt={car.name}
            fill
            className="object-contain"
          />
        </div>
      </div>

      {/* Divider */}
      <div className="h-px bg-white/20 mx-5" />

      {/* Price + Booking */}
      <div className="flex items-center justify-between px-5 py-4">
        <div>
          <span className="text-white/70 text-xs">Rp </span>
          <span className="text-white font-black text-lg sm:text-xl block">
            {formatPrice(car.price)}
          </span>
          <div className="text-white/60 text-[11px]">/{car.pricePer || "day"}</div>
        </div>
        <a
          href={`https://wa.me/${phone}?text=Halo%20Adhitama89!%20Saya%20ingin%20menyewa%20${encodeURIComponent(car.name)}`}
          target="_blank"
          rel="noopener noreferrer"
          className="bg-white hover:bg-gray-100 text-[#2d3e8c] font-black text-sm uppercase tracking-wider px-5 py-2.5 rounded-lg transition-colors duration-200"
        >
          Booking
        </a>
      </div>
    </article>
  );
}

interface CarListSectionProps {
  initialCars?: CarType[];
  phone?: string | null;
}

export default function CarListSection({ initialCars, phone }: CarListSectionProps) {
  const [page, setPage] = useState(0);
  const cars = initialCars && initialCars.length > 0 ? initialCars : defaultCars;
  const activePhone = phone || "6281234567890";
  
  const perPage = 3;
  const totalPages = Math.ceil(cars.length / perPage);
  const visible = cars.slice(page * perPage, page * perPage + perPage);

  return (
    <section id="cars" className="py-16 bg-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <div className="text-center mb-10">
          <h2 className="text-4xl font-black italic text-[#2d3e8c] mb-3">
            Best Seller
          </h2>
          <div className="w-16 h-1 bg-[#2d3e8c] mx-auto mb-4" />
          <p className="text-gray-500 text-base">Unit yang sering di sewa</p>
        </div>

        {/* Carousel */}
        <div className="relative flex items-center gap-4">
          {/* Prev */}
          <button
            onClick={() => setPage((p) => Math.max(0, p - 1))}
            disabled={page === 0}
            aria-label="Previous"
            className="shrink-0 w-10 h-10 rounded-full border-2 border-gray-200 flex items-center justify-center text-gray-500 hover:border-[#2d3e8c] hover:text-[#2d3e8c] disabled:opacity-30 disabled:cursor-not-allowed transition-all"
          >
            <CaretLeft className="w-5 h-5" weight="bold" />
          </button>

          {/* Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 flex-1">
            {visible.map((car) => (
              <CarCard key={car.id} car={car} phone={activePhone} />
            ))}
          </div>

          {/* Next */}
          <button
            onClick={() => setPage((p) => Math.min(totalPages - 1, p + 1))}
            disabled={page >= totalPages - 1}
            aria-label="Next"
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
                aria-label={`Page ${i + 1}`}
                className={`w-2.5 h-2.5 rounded-full transition-all duration-200 ${
                  i === page ? "bg-[#2d3e8c] w-6" : "bg-gray-300"
                }`}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
