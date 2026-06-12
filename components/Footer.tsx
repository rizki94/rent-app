import {
  WhatsappLogo,
  InstagramLogo,
  TiktokLogo,
  MapPin,
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

export default function Footer({ config }: FooterProps) {
  const displayPhone = config?.phone
    ? config.phone.startsWith("62")
      ? "0" + config.phone.slice(2)
      : config.phone
    : "0812-3456-7890";

  const instagramLink = config?.instagramAccount
    ? `https://instagram.com/${config.instagramAccount.replace("@", "")}`
    : "#";

  const tiktokLink = config?.tiktokAccount
    ? `https://tiktok.com/@${config.tiktokAccount.replace("@", "")}`
    : "#";

  const mapUrl =
    config?.mapPinPoint ||
    "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3960.558806684784!2d107.6622432!3d-6.943187!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e68e7c1b2c4554b%3A0xe54e6fa3a992a9f2!2sBandung%2C%20West%20Java!5e0!3m2!1sen!2sid!4v1718058216822!5m2!1sen!2sid";

  return (
    <footer id="contact" className="bg-[#0b132b] text-white border-t border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">
          {/* Left Columns (Logo & Brand / Info / Social) - taking 6 spans */}
          <div className="lg:col-span-6 space-y-8">
            {/* Logo */}
            <div>
              <Image
                src="/logo-white.svg"
                alt="Adhitama 89 Rental Car"
                width={150}
                height={66}
                className="h-14 w-auto object-contain transition-transform duration-300 hover:scale-105"
              />
            </div>
 
            <p className="text-white/60 text-base leading-relaxed max-w-md">
              Perjalanan Anda lebih nyaman, aman, dan tenang bersama layanan rental mobil Adhitama89 yang selalu siap melayani dengan armada premium terawat kapan saja.
            </p>
 
            {/* Contact Details */}
             <div className="space-y-4 pt-2">
              <h3 className="font-bold text-white text-sm uppercase tracking-widest text-white/90">Kontak Hubungi</h3>
              <div className="space-y-3">
                <a
                  href={`https://wa.me/${config?.phone || "6281234567890"}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-3 text-base text-white/70 hover:text-[#5bc0be] transition-colors"
                >
                  <WhatsappLogo className="w-5 h-5 shrink-0 text-[#5bc0be]" weight="fill" />
                  <span className="font-semibold">{displayPhone}</span>
                </a>
                <div className="flex items-start gap-3 text-base text-white/70">
                  <MapPin className="w-5 h-5 shrink-0 mt-0.5 text-blue-400" weight="fill" />
                  <span>{config?.address || "Jl. Turangga Barat Baru No.4, Lkr. Sel., Kec. Lengkong, Kota Bandung, Jawa Barat 40263"}</span>
                </div>
              </div>
            </div>
 
            {/* Social Links */}
            <div className="space-y-3">
              <h3 className="font-bold text-white text-sm uppercase tracking-widest text-white/90">Ikuti Sosial Media</h3>
              <div className="flex gap-4">
                <a
                  href={instagramLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Instagram"
                  className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-white/70 hover:text-white hover:bg-[#e1306c] hover:border-transparent transition-all duration-300 hover:scale-110"
                >
                  <InstagramLogo className="w-5 h-5" weight="fill" />
                </a>
                <a
                  href={tiktokLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="TikTok"
                  className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-white/70 hover:text-white hover:bg-black hover:border-transparent transition-all duration-300 hover:scale-110"
                >
                  <TiktokLogo className="w-5 h-5" weight="fill" />
                </a>
              </div>
            </div>
          </div>
 
          {/* Right Column (Google Maps embed) - taking 6 spans */}
          <div className="lg:col-span-6 w-full">
            <div className="rounded-3xl overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.3)] border border-white/5 h-80 lg:h-[360px] min-h-[300px]">
              <iframe
                title="Lokasi Adhitama89"
                src={mapUrl}
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </div>
        </div>
 
        {/* Bottom copyright bar */}
        <div className="border-t border-white/10 mt-16 pt-8 text-center flex flex-col sm:flex-row justify-between items-center gap-4 text-white/40">
          <p className="text-sm">
            © {new Date().getFullYear()} Adhitama 89 Rental Car. Semua hak dilindungi.
          </p>
          <div className="flex gap-6 text-xs sm:text-sm font-bold uppercase tracking-wider">
            <a href="#cars" className="hover:text-white transition-colors">Armada</a>
            <a href="#layanan" className="hover:text-white transition-colors">Layanan</a>
            <a href="#testimoni" className="hover:text-white transition-colors">Testimoni</a>
            <a href="#faq" className="hover:text-white transition-colors">FAQ</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
