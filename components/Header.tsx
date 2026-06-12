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
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 bg-white ${
        isScrolled ? "shadow-md" : "border-b border-gray-100"
      }`}
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-24">
          {/* Logo */}
          <a href="#" className="flex items-center">
            <Image
              src="/logo.svg"
              alt="Adhitama 89 Rental Car"
              width={106}
              height={48}
              priority
              className="h-20 w-auto object-contain"
            />
          </a>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={(e) => handleNavClick(e, link.href)}
                className="text-lg font-bold text-gray-700 hover:text-[#2d3e8c] tracking-wide uppercase transition-colors duration-200 hover:border-b-2 hover:border-[#2d3e8c]"
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
              className="bg-[#2d3e8c] hover:bg-[#1e2d6e] text-white text-sm font-bold uppercase tracking-wider px-6 py-2.5 rounded-lg transition-colors duration-200"
            >
              Hubungi Kami
            </a>
          </div>

          {/* Mobile Toggle */}
          <button
            id="mobile-menu-toggle"
            className="md:hidden p-2 rounded-lg text-gray-600 hover:text-[#2d3e8c] hover:bg-gray-50 transition-all"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle menu"
          >
            {menuOpen ? (
              <X className="w-5 h-5" weight="bold" />
            ) : (
              <List className="w-5 h-5" weight="bold" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        className={`md:hidden transition-all duration-300 overflow-hidden ${
          menuOpen ? "max-h-80 opacity-100" : "max-h-0 opacity-0"
        } bg-white border-t border-gray-100`}
      >
        <div className="px-4 py-3 flex flex-col gap-1">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              onClick={(e) => handleNavClick(e, link.href)}
              className="px-4 py-3 text-sm font-bold text-gray-700 hover:text-[#2d3e8c] uppercase tracking-wide rounded-lg hover:bg-blue-50 transition-all"
            >
              {link.label}
            </a>
          ))}
          <div className="mt-2 pt-2 border-t border-gray-100">
            <a
              href={`https://wa.me/${phone || "6281234567890"}?text=Halo,%20saya%20ingin%20menyewa%20mobil`}
              target="_blank"
              rel="noopener noreferrer"
              className="block text-center bg-[#2d3e8c] text-white text-lg font-bold uppercase tracking-wider px-6 py-3 rounded-lg"
            >
              Hubungi Kami
            </a>
          </div>
        </div>
      </div>
    </header>
  );
}
