import Image from "next/image";

export default function HeroSection({ phone }: { phone?: string | null }) {
  return (
    <section className="relative min-h-[480px] sm:min-h-[520px] flex items-center overflow-hidden bg-[#2d3e8c] pt-16">
      {/* Diagonal wave lines decoration (bottom right) */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <svg
          className="absolute bottom-0 right-0 w-[55%] h-full opacity-20"
          viewBox="0 0 400 400"
          preserveAspectRatio="xMaxYMax slice"
          fill="none"
        >
          {Array.from({ length: 12 }).map((_, i) => (
            <ellipse
              key={i}
              cx="400"
              cy="400"
              rx={80 + i * 28}
              ry={80 + i * 28}
              stroke="white"
              strokeWidth="1.5"
            />
          ))}
        </svg>
      </div>

      <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 w-full py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 items-center gap-8 text-center">
          {/* Left: text */}
          <div className="text-center">
            <h1 className="text-5xl sm:text-6xl lg:text-[64px] font-bold italic text-white leading-tight mb-6 text-center">
              Sewa Mobil Bandung Mudah &amp; Terpercaya
            </h1>
            <p className="text-white/90 font-semibold text-lg sm:text-xl md:text-2xl mb-10 leading-relaxed text-center">
              Pilihan armada lengkap untuk perjalanan bisnis, wisata, maupun
              kebutuhan harian.
            </p>
            <a
              href={`https://wa.me/${phone || "6281234567890"}?text=Halo%20Adhitama89!%20Saya%20ingin%20booking%20mobil`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block bg-[#1a2b5e] hover:bg-[#0f1d45] text-white font-black text-lg sm:text-xl uppercase tracking-widest px-12 py-5 rounded-xl transition-colors duration-200 shadow-xl"
            >
              Booking Sekarang!
            </a>
          </div>

          {/* Right: diagonal side-by-side cars */}
          <div className="relative flex items-center justify-center md:justify-end py-8">
            {/* Container sized to fit both images with overlap */}
            <div className="relative w-full max-w-lg h-72 sm:h-80 md:h-96">
              {/* Car 1 — top-left, slightly rotated */}
              <div className="absolute bottom-0 -right-24 drop-shadow-2xl">
                <Image
                  src="/3.png"
                  alt="Armada Adhitama89 — SUV premium"
                  width={400}
                  height={260}
                  className="object-contain w-full h-auto"
                  priority
                />
              </div>

              {/* Car 2 — bottom-right, opposite slight tilt, overlaps car 1 */}
              <div className="absolute top-0 -left-24 w-[120%] drop-shadow-2xl">
                <Image
                  src="/4.png"
                  alt="Armada Adhitama89 — MPV premium"
                  width={400}
                  height={260}
                  className="object-contain w-full h-auto"
                  priority
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
