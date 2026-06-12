"use client";

import { useState, useEffect } from "react";
import { List, X } from "@phosphor-icons/react";
import Image from "next/image";

const navLinks = [
  { label: "Price List", href: "#cars" },
  { label: "Layanan", href: "#layanan" },
  { label: "Testimoni", href: "#testimoni" },
  { label: "FAQ", href: "#faq" },
];

export default function Header({ phone }: { phone?: string | null }) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 10);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleNavClick = (
    e: React.MouseEvent<HTMLAnchorElement>,
    href: string,
  ) => {
    e.preventDefault();
    setMenuOpen(false);
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        isScrolled
          ? "bg-[#1a2b5e]/95 backdrop-blur-lg shadow-xl border-b border-white/5 py-3"
          : "bg-white/90 backdrop-blur-md border-b border-gray-100/80 py-5"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between transition-all duration-300">
          {/* Logo */}
          <a href="#" className="flex items-center group">
            <Image
              src={isScrolled ? "/logo-white.svg" : "/logo.svg"}
              alt="Adhitama 89 Rental Car"
              width={110}
              height={50}
              priority
              className="h-12 sm:h-14 w-auto object-contain transition-transform duration-300 group-hover:scale-105"
            />
          </a>
 
          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={(e) => handleNavClick(e, link.href)}
                className={`text-base font-bold uppercase tracking-wider transition-all duration-350 relative py-1.5 after:absolute after:bottom-0 after:left-0 after:w-0 after:h-[2px] after:transition-all after:duration-300 hover:after:w-full ${
                  isScrolled
                    ? "text-white/85 hover:text-white after:bg-white"
                    : "text-gray-700 hover:text-[#2d3e8c] after:bg-[#2d3e8c]"
                }`}
              >
                {link.label}
              </a>
            ))}
          </nav>
 
          {/* CTA */}
          <div className="hidden md:flex">
            <a
              href={`https://wa.me/${phone || "6281234567890"}?text=Halo,%20saya%20ingin%20menyewa%20mobil`}
              target="_blank"
              rel="noopener noreferrer"
              className={`text-sm font-black uppercase tracking-widest px-7 py-3.5 rounded-xl transition-all duration-300 shadow-md hover:shadow-lg ${
                isScrolled
                  ? "bg-white text-[#1a2b5e] hover:bg-gray-100 hover:-translate-y-0.5"
                  : "bg-[#2d3e8c] text-white hover:bg-[#1e2d6e] hover:-translate-y-0.5"
              }`}
            >
              Hubungi Kami
            </a>
          </div>
 
          {/* Mobile Toggle */}
          <button
            id="mobile-menu-toggle"
            className={`md:hidden p-2 rounded-xl transition-all duration-300 ${
              isScrolled
                ? "text-white hover:bg-white/10"
                : "text-gray-600 hover:text-[#2d3e8c] hover:bg-gray-50"
            }`}
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle menu"
          >
            {menuOpen ? (
              <X className="w-6 h-6" weight="bold" />
            ) : (
              <List className="w-6 h-6" weight="bold" />
            )}
          </button>
        </div>
      </div>
 
      {/* Mobile Menu */}
      <div
        className={`md:hidden transition-all duration-300 ease-in-out overflow-hidden ${
          menuOpen ? "max-h-96 opacity-100 py-3" : "max-h-0 opacity-0 pointer-events-none"
        } ${
          isScrolled
            ? "bg-[#1a2b5e] border-t border-white/10"
            : "bg-white border-t border-gray-100"
        }`}
      >
        <div className="px-6 flex flex-col gap-2">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              onClick={(e) => handleNavClick(e, link.href)}
              className={`px-4 py-3 text-base font-bold uppercase tracking-wider rounded-xl transition-all duration-200 ${
                isScrolled
                  ? "text-white/80 hover:text-white hover:bg-white/10"
                  : "text-gray-700 hover:text-[#2d3e8c] hover:bg-blue-50"
              }`}
            >
              {link.label}
            </a>
          ))}
          <div className="mt-3 pt-3 border-t border-gray-100/10">
            <a
              href={`https://wa.me/${phone || "6281234567890"}?text=Halo,%20saya%20ingin%20menyewa%20mobil`}
              target="_blank"
              rel="noopener noreferrer"
              className={`block text-center text-base font-black uppercase tracking-widest px-6 py-4 rounded-xl shadow-md ${
                isScrolled
                  ? "bg-white text-[#1a2b5e] hover:bg-gray-100"
                  : "bg-[#2d3e8c] text-white hover:bg-[#1e2d6e]"
              }`}
            >
              Hubungi Kami
            </a>
          </div>
        </div>
      </div>
    </header>
  );
}
