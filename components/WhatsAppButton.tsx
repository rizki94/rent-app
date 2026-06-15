"use client";

import { useState, useEffect } from "react";
import { WhatsappLogoIcon } from "@phosphor-icons/react";

export default function WhatsAppButton({ phone }: { phone?: string | null }) {
  const [visible, setVisible] = useState(false);
  const [pulse, setPulse] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setVisible(true), 1500);
    const pulseTimer = setTimeout(() => setPulse(false), 5000);
    return () => {
      clearTimeout(timer);
      clearTimeout(pulseTimer);
    };
  }, []);

  const waNumber = phone || "6281234567890";
  const waMessage = encodeURIComponent(
    "Halo Adhitama89! Saya ingin menanyakan informasi sewa mobil.",
  );

  return (
    <a
      id="whatsapp-float-btn"
      href={`https://wa.me/${waNumber}?text=${waMessage}`}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat via WhatsApp"
      className={`fixed bottom-6 right-6 z-50 flex items-center gap-3 group transition-all duration-500 ${
        visible
          ? "opacity-100 translate-y-0"
          : "opacity-0 translate-y-8 pointer-events-none"
      }`}
    >
      {/* Tooltip */}
      <span className="bg-slate-900 text-white text-xs font-medium px-3 py-1.5 rounded-full shadow-xl opacity-0 group-hover:opacity-100 transition-all duration-300 whitespace-nowrap -translate-x-2 group-hover:translate-x-0 pointer-events-none">
        Chat via WhatsApp
      </span>

      {/* Button */}
      <div className="relative">
        {/* Pulse rings */}
        {pulse && (
          <>
            <span className="absolute inset-0 rounded-full bg-green-400 animate-ping opacity-30" />
            <span
              className="absolute inset-0 rounded-full bg-green-400 animate-ping opacity-20"
              style={{ animationDelay: "150ms" }}
            />
          </>
        )}
        <div className="relative w-14 h-14 rounded-full bg-gradient-to-br from-green-400 to-green-600 shadow-2xl shadow-green-500/40 hover:shadow-green-500/60 flex items-center justify-center hover:scale-110 active:scale-95 transition-all duration-300">
          <WhatsappLogoIcon className="w-7 h-7 text-white" weight="fill" />
        </div>
      </div>
    </a>
  );
}
