"use client";

import { useState, useEffect } from "react";
import { List, X, WhatsappLogo } from "@phosphor-icons/react";
import Image from "next/image";
import { useIsMobile } from "./hooks/use-mobile";

const navLinks = [
  { label: "Price List", href: "#cars" },
  { label: "Layanan", href: "#layanan" },
  { label: "Tentang Kami", href: "#about" },
  { label: "Testimoni", href: "#testimoni" },
  { label: "FAQ", href: "#faq" },
];

export default function Header({ phone }: { phone?: string | null }) {
  const isMobile = useIsMobile();
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 10);
    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleNavClick = (
    e: React.MouseEvent<HTMLAnchorElement>,
    href: string,
  ) => {
    e.preventDefault();
    const checkbox = document.getElementById(
      "mobile-menu-checkbox",
    ) as HTMLInputElement;
    if (checkbox) checkbox.checked = false;
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-white md:backdrop-blur-lg shadow-[0_4px_30px_rgba(0,0,0,0.08)] py-3"
          : "bg-white md:bg-transparent md:backdrop-blur-none shadow-[0_4px_30px_rgba(0,0,0,0.05)] md:shadow-none py-3 md:py-5"
      }`}
    >
      {/* Pure CSS Checkbox Toggle */}
      <input
        type="checkbox"
        id="mobile-menu-checkbox"
        className="peer hidden"
      />

      {/* Sibling CSS to toggle Hamburger/Close icons based on checkbox state */}
      <style
        dangerouslySetInnerHTML={{
          __html: `
        #mobile-menu-checkbox:checked ~ * .menu-icon-list { display: none !important; }
        #mobile-menu-checkbox:checked ~ * .menu-icon-x { display: block !important; }
      `,
        }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <a href="#" className="flex items-center group">
            <Image
              src={isScrolled || isMobile ? "/logo.svg" : "/logo-white.svg"}
              alt="Adhitama 89 Rental Car"
              width={130}
              height={55}
              priority
              className="h-8 sm:h-12 w-auto object-contain"
            />
          </a>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={(e) => handleNavClick(e, link.href)}
                className={`relative text-[14px] font-medium transition-colors duration-200 py-1 group ${
                  isScrolled
                    ? "text-[#0A274E] hover:text-amber-500"
                    : "text-white/90 hover:text-white"
                }`}
              >
                {link.label}
                <span className="absolute bottom-0 left-0 w-0 h-[2px] bg-amber-400 group-hover:w-full transition-all duration-300 rounded-full" />
              </a>
            ))}
          </nav>

          {/* Right Action Controls */}
          <div className="flex items-center gap-1.5 sm:gap-3 shrink-0">
            <a
              href={`https://wa.me/${phone || "6281234567890"}?text=Halo,%20saya%20ingin%20menyewa%20mobil`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1 sm:gap-2 bg-[#0A274E] hover:bg-[#0d336a] text-white font-bold text-[10px] sm:text-[13px] md:text-[14px] px-2.5 sm:px-6 py-1.5 sm:py-2.5 rounded-full transition-all duration-300 hover:shadow-lg hover:-translate-y-0.5"
            >
              <WhatsappLogo
                className="w-3.5 h-3.5 sm:w-4 sm:h-4"
                weight="fill"
              />
              <span>Hubungi Kami</span>
            </a>

            {/* Mobile Toggle (Label targeting the checkbox) */}
            <label
              htmlFor="mobile-menu-checkbox"
              id="mobile-menu-toggle"
              className="md:hidden w-12 h-12 flex items-center justify-center rounded-xl transition-colors text-[#0A274E] hover:bg-slate-100 relative z-[60] cursor-pointer"
              aria-label="Toggle menu"
            >
              <List
                className="w-6 h-6 pointer-events-none menu-icon-list block"
                weight="bold"
              />
              <X
                className="w-6 h-6 pointer-events-none menu-icon-x hidden"
                weight="bold"
              />
            </label>
          </div>
        </div>
      </div>

      {/* Mobile Menu (Controlled purely via CSS peer selector) */}
      <div className="mobile-menu-dropdown hidden peer-checked:block md:hidden bg-white">
        <div className="px-6 py-4 flex flex-col gap-1">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              onClick={(e) => handleNavClick(e, link.href)}
              className="px-4 py-3 text-[15px] font-medium rounded-xl text-[#0A274E] hover:bg-slate-50 hover:text-amber-500 transition-all"
            >
              {link.label}
            </a>
          ))}
          <div className="mt-2 pt-3 border-t border-slate-100">
            <a
              href={`https://wa.me/${phone || "6281234567890"}?text=Halo,%20saya%20ingin%20menyewa%20mobil`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 w-full text-[15px] font-semibold px-6 py-3.5 rounded-full bg-[#0A274E] hover:bg-[#0d336a] text-white transition-all"
            >
              <WhatsappLogo className="w-4 h-4" weight="fill" />
              Hubungi Admin
            </a>
          </div>
        </div>
      </div>
    </header>
  );
}
