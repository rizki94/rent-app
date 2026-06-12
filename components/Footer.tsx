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

  const mapUrl = config?.mapPinPoint || "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3960.558806684784!2d107.6622432!3d-6.943187!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e68e7c1b2c4554b%3A0xe54e6fa3a992a9f2!2sBandung%2C%20West%20Java!5e0!3m2!1sen!2sid!4v1718058216822!5m2!1sen!2sid";

  return (
    <footer id="contact" className="bg-[#2d3e8c] text-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Left: brand + contact + social */}
          <div>
            {/* Logo */}
            <div className="mb-5">
              <Image
                src="/logo-white.svg"
                alt="Adhitama 89 Rental Car"
                width={145}
                height={64}
                className="h-16 w-auto object-contain"
              />
            </div>

            <p className="text-white/70 text-sm leading-relaxed max-w-sm mb-8">
              Perjalanan Anda lebih nyaman dan tenang bersama layanan rental
              mobil kami yang selalu siap melayani kapan saja.
            </p>

            {/* Contact */}
            <div className="mb-8">
              <h3 className="font-bold text-white text-base mb-4">Kontak</h3>
              <div className="space-y-3">
                <a
                  href={`https://wa.me/${config?.phone || "6281234567890"}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 text-sm text-white/75 hover:text-white transition-colors"
                >
                  <WhatsappLogo className="w-5 h-5 shrink-0" weight="fill" />
                  {displayPhone}
                </a>
                <div className="flex items-start gap-3 text-sm text-white/75">
                  <MapPin className="w-5 h-5 shrink-0 mt-0.5" weight="fill" />
                  {config?.address || "Jl. Turangga Barat Baru No.4 Lkr Sel Kota Bandung"}
                </div>
              </div>
            </div>

            {/* Social */}
            <div>
              <h3 className="font-bold text-white text-base mb-4">Follow us</h3>
              <div className="flex gap-4">
                <a
                  href={instagramLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Instagram"
                  className="text-white/70 hover:text-white transition-colors"
                >
                  <InstagramLogo className="w-8 h-8" weight="fill" />
                </a>
                <a
                  href={tiktokLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="TikTok"
                  className="text-white/70 hover:text-white transition-colors"
                >
                  <TiktokLogo className="w-8 h-8" weight="fill" />
                </a>
              </div>
            </div>
          </div>

          {/* Right: Google Maps embed */}
          <div className="rounded-2xl overflow-hidden shadow-2xl h-72 lg:h-auto min-h-64">
            <iframe
              title="Lokasi Adhitama89"
              src={mapUrl}
              width="100%"
              height="100%"
              style={{ border: 0, minHeight: "280px" }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-white/15 mt-12 pt-6 text-center">
          <p className="text-white/40 text-xs">
            © {new Date().getFullYear()} Adhitama 89 Rental Car. Semua hak
            dilindungi.
          </p>
        </div>
      </div>
    </footer>
  );
}
