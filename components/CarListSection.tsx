"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { Tag, CaretLeft, CaretRight } from "@phosphor-icons/react";

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
    category: "Luxury",
    seats: 7,
    transmission: "Otomatis",
  },
  {
    id: 2,
    name: "Toyota Fortuner",
    image: "/car_suv.png",
    price: "950.000",
    pricePer: "day",
    qty: 4,
    category: "SUV",
    seats: 7,
    transmission: "Otomatis",
  },
  {
    id: 3,
    name: "Toyota Innova Zenix",
    image: "/car_mpv.png",
    price: "250.000",
    pricePer: "day",
    qty: 8,
    category: "MPV",
    seats: 7,
    transmission: "Otomatis",
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
  car: (typeof defaultCars)[0] & Partial<CarType>;
  phone: string;
}) {
  const priceFormatted = formatPrice(car.price);
  const category = (car as (typeof defaultCars)[0]).category;

  return (
    <article
      id={`car-${car.id}`}
      className="group bg-white rounded-2xl overflow-hidden flex flex-col shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border border-gray-100"
    >
      {/* Badge + Image area */}
      <div className="relative bg-gradient-to-br from-slate-50 to-slate-100 h-52 flex items-center justify-center overflow-hidden">
        {category && (
          <span className="absolute top-4 left-4 z-10 bg-[#0A274E] text-white text-[11px] font-bold uppercase tracking-wider px-3 py-1 rounded-full">
            {category}
          </span>
        )}
        <div className="relative w-full h-64 px-4 transform group-hover:scale-105 transition-transform duration-500">
          <Image
            src={car.image}
            alt={car.name}
            fill
            className="object-contain drop-shadow-md"
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          />
        </div>
      </div>

      {/* Content */}
      <div className="flex flex-col flex-1 p-6">
        <h3 className="text-[#0A274E] font-bold text-[20px] mb-3">
          {car.name}
        </h3>

        {/* Pricing + CTA */}
        <div className="flex items-end justify-between mt-auto">
          <div>
            <div className="flex items-center gap-1 text-gray-400 text-[12px] mb-1">
              <Tag className="w-3 h-3" weight="bold" />
              <span>Mulai dari</span>
            </div>
            <div className="flex items-baseline gap-1">
              <span className="text-gray-500 text-[13px]">Rp</span>
              <span className="text-[24px] font-extrabold text-[#0A274E] leading-none">
                {priceFormatted}
              </span>
            </div>
            <span className="text-gray-400 text-[12px]">/ 24 Jam</span>
          </div>
          <a
            href={`https://wa.me/${phone}?text=Halo%20Adhitama89!%20Saya%20ingin%20menyewa%20${encodeURIComponent(car.name)}`}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-[#0A274E] hover:bg-[#0d336a] text-white font-semibold text-[13px] px-5 py-2.5 rounded-xl transition-all duration-200 hover:shadow-lg"
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

  const cars =
    initialCars && initialCars.length > 0
      ? initialCars.map((c) => ({
          ...c,
          seats: 7,
          transmission: "Otomatis",
          category: "Rental",
        }))
      : defaultCars;
  const activePhone = phone || "6281234567890";

  const totalPages = !isMounted
    ? 1
    : isMobile
      ? cars.length
      : Math.ceil(cars.length / 3);
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

  return (
    <section
      id="cars"
      className="py-24 bg-gradient-to-b from-slate-50 to-white"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <div className="mb-14 text-center">
          <span className="inline-block text-xs font-bold uppercase tracking-[0.2em] text-amber-500 mb-3">
            Armada Pilihan
          </span>
          <h2 className="text-4xl sm:text-5xl font-extrabold text-[#0A274E] mb-4">
            Best Seller
          </h2>
          <div className="w-16 h-1 bg-gradient-to-r from-amber-400 to-amber-500 mx-auto rounded-full mb-5" />
          <p className="text-gray-500 text-base max-w-xl mx-auto">
            Unit yang paling sering disewa — terawat, nyaman, dan siap menemani
            perjalananmu.
          </p>
        </div>

        {/* Desktop Grid (hidden on mobile) */}
        <div className="hidden sm:grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {cars.slice(activePage * 3, activePage * 3 + 3).map((car) => (
            <CarCard key={car.id} car={car} phone={activePhone} />
          ))}
        </div>

        {/* Mobile Horizontal Snap-Scroll Slider */}
        <div
          ref={scrollRef}
          onScroll={handleScroll}
          className="sm:hidden flex overflow-x-auto snap-x snap-mandatory gap-6 pb-6 px-4 -mx-4 scrollbar-none scroll-smooth"
        >
          {cars.map((car) => (
            <div key={car.id} className="w-[85vw] shrink-0 snap-center">
              <CarCard car={car} phone={activePhone} />
            </div>
          ))}
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex items-center justify-center gap-4 mt-12">
            <button
              onClick={() => handlePageChange(Math.max(0, activePage - 1))}
              disabled={activePage === 0}
              aria-label="Previous"
              className="w-10 h-10 rounded-full border border-gray-200 bg-white flex items-center justify-center text-[#0A274E] hover:border-[#0A274E] disabled:opacity-30 disabled:cursor-not-allowed transition-all hover:shadow-md cursor-pointer"
            >
              <CaretLeft className="w-4 h-4" weight="bold" />
            </button>

            <div className="flex gap-2">
              {Array.from({ length: totalPages }).map((_, i) => (
                <button
                  key={i}
                  onClick={() => handlePageChange(i)}
                  aria-label={`Page ${i + 1}`}
                  className={`h-2 rounded-full transition-all duration-300 cursor-pointer ${
                    i === activePage
                      ? "bg-[#0A274E] w-8"
                      : "bg-gray-300 w-2 hover:bg-gray-400"
                  }`}
                />
              ))}
            </div>

            <button
              onClick={() =>
                handlePageChange(Math.min(totalPages - 1, activePage + 1))
              }
              disabled={activePage >= totalPages - 1}
              aria-label="Next"
              className="w-10 h-10 rounded-full border border-gray-200 bg-white flex items-center justify-center text-[#0A274E] hover:border-[#0A274E] disabled:opacity-30 disabled:cursor-not-allowed transition-all hover:shadow-md cursor-pointer"
            >
              <CaretRight className="w-4 h-4" weight="bold" />
            </button>
          </div>
        )}
      </div>
    </section>
  );
}
