"use client";

import {
  WhatsappLogo,
  InstagramLogo,
  TiktokLogo,
  EnvelopeSimple,
  MapPin,
  Clock,
  ArrowRight,
} from "@phosphor-icons/react/dist/ssr";
import Image from "next/image";

interface WebConfigType {
  address: string | null;
  phone: string | null;
  tiktokAccount: string | null;
  instagramAccount: string | null;
  mapPinPoint: string | null;
}

interface FooterProps {
  config?: WebConfigType | null;
}

const navLinks = [
  { label: "Price List", href: "#cars" },
  { label: "Layanan", href: "#layanan" },
  { label: "Tentang Kami", href: "#about" },
  { label: "Testimoni", href: "#testimoni" },
  { label: "FAQ", href: "#faq" },
];

export default function Footer({ config }: FooterProps) {
  const displayPhone = config?.phone
    ? config.phone.startsWith("62")
      ? "0" + config.phone.slice(2)
      : config.phone
    : "081234567890";

  const waPhone = config?.phone || "6281234567890";

  const instagramLink = config?.instagramAccount
    ? `https://instagram.com/${config.instagramAccount.replace("@", "")}`
    : "#";

  const tiktokLink = config?.tiktokAccount
    ? `https://tiktok.com/@${config.tiktokAccount.replace("@", "")}`
    : "#";

  const mapUrl =
    config?.mapPinPoint ||
    "https://maps.google.com/maps?q=adhitama89+rental+bandung&t=m&z=15&output=embed&iwloc=near";

  return (
    <footer id="contact" className="w-full">
      {/* Main footer body */}
      <div className="bg-[#0A274E] text-white pt-20 pb-10 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-14">

            {/* Brand column */}
            <div className="lg:col-span-1">
              <Image
                src="/logo-white.svg"
                alt="Adhitama89 Rental"
                width={160}
                height={50}
                className="h-12 w-auto object-contain mb-5"
                onError={(e) => {
                  // fallback to regular logo if white version doesn't exist
                  (e.target as HTMLImageElement).src = "/logo.svg";
                }}
              />
              <p className="text-white/55 text-[14px] leading-relaxed mb-6">
                Solusi transportasi terpercaya di Bandung sejak 2016. Armada terawat, harga bersahabat, pelayanan 24 jam.
              </p>
              {/* Social icons */}
              <div className="flex gap-3">
                <a
                  href={instagramLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Instagram"
                  className="w-9 h-9 rounded-full bg-white/10 hover:bg-gradient-to-br hover:from-pink-500 hover:to-orange-400 flex items-center justify-center text-white/70 hover:text-white transition-all duration-300"
                >
                  <InstagramLogo className="w-4 h-4" weight="fill" />
                </a>
                <a
                  href={tiktokLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="TikTok"
                  className="w-9 h-9 rounded-full bg-white/10 hover:bg-black flex items-center justify-center text-white/70 hover:text-white transition-all duration-300"
                >
                  <TiktokLogo className="w-4 h-4" weight="fill" />
                </a>
                <a
                  href={`https://wa.me/${waPhone}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="WhatsApp"
                  className="w-9 h-9 rounded-full bg-white/10 hover:bg-green-500 flex items-center justify-center text-white/70 hover:text-white transition-all duration-300"
                >
                  <WhatsappLogo className="w-4 h-4" weight="fill" />
                </a>
              </div>
            </div>

            {/* Quick links */}
            <div>
              <h3 className="text-white font-bold text-[16px] mb-5 pb-3 border-b border-white/10">
                Menu
              </h3>
              <ul className="space-y-3">
                {navLinks.map((link) => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      className="flex items-center gap-2 text-white/55 hover:text-amber-400 text-[14px] transition-colors duration-200 group"
                    >
                      <ArrowRight className="w-3 h-3 opacity-0 group-hover:opacity-100 -translate-x-1 group-hover:translate-x-0 transition-all duration-200" weight="bold" />
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Contact */}
            <div>
              <h3 className="text-white font-bold text-[16px] mb-5 pb-3 border-b border-white/10">
                Kontak
              </h3>
              <ul className="space-y-4">
                <li>
                  <a
                    href="mailto:admin@adhitama89rental.com"
                    className="flex items-start gap-3 text-white/55 hover:text-white transition-colors group"
                  >
                    <EnvelopeSimple className="w-4 h-4 mt-0.5 text-amber-400 shrink-0" weight="fill" />
                    <span className="text-[13px]">admin@adhitama89rental.com</span>
                  </a>
                </li>
                <li>
                  <a
                    href={`https://wa.me/${waPhone}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-start gap-3 text-white/55 hover:text-white transition-colors"
                  >
                    <WhatsappLogo className="w-4 h-4 mt-0.5 text-amber-400 shrink-0" weight="fill" />
                    <span className="text-[13px]">{displayPhone}</span>
                  </a>
                </li>
                <li>
                  <div className="flex items-start gap-3 text-white/55">
                    <MapPin className="w-4 h-4 mt-0.5 text-amber-400 shrink-0" weight="fill" />
                    <span className="text-[13px] leading-relaxed">
                      {config?.address ||
                        "Jl. Turangga Barat Baru No.4, Lkr. Sel., Kec. Lengkong, Kota Bandung, Jawa Barat 40263"}
                    </span>
                  </div>
                </li>
                <li>
                  <div className="flex items-center gap-3 text-white/55">
                    <Clock className="w-4 h-4 text-amber-400 shrink-0" weight="fill" />
                    <span className="text-[13px]">Buka 24 Jam / 7 Hari</span>
                  </div>
                </li>
              </ul>
            </div>

            {/* Map */}
            <div>
              <h3 className="text-white font-bold text-[16px] mb-5 pb-3 border-b border-white/10">
                Lokasi
              </h3>
              <div className="w-full h-48 rounded-2xl overflow-hidden ring-1 ring-white/10">
                <iframe
                  src={mapUrl}
                  className="w-full h-full border-0 grayscale opacity-80 hover:opacity-100 hover:grayscale-0 transition-all duration-500"
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Lokasi Adhitama89"
                />
              </div>
            </div>

          </div>

          {/* Divider */}
          <div className="border-t border-white/10 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="text-white/35 text-[13px] text-center sm:text-left">
              © {new Date().getFullYear()} Adhitama89 Rental. Semua hak dilindungi.
            </p>
            <a
              href={`https://wa.me/${waPhone}?text=Halo%20Adhitama89!%20Saya%20ingin%20booking%20kendaraan`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 bg-amber-400 hover:bg-amber-500 text-[#0A274E] font-bold text-[13px] px-5 py-2.5 rounded-full transition-all hover:shadow-lg"
            >
              <WhatsappLogo className="w-4 h-4" weight="fill" />
              Booking Sekarang
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
