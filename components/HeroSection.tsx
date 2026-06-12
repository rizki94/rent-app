import Image from "next/image";
 
export default function HeroSection({ phone }: { phone?: string | null }) {
  return (
    <section className="relative min-h-[580px] sm:min-h-[640px] lg:min-h-[700px] flex items-center overflow-hidden bg-gradient-to-br from-[#0b132b] via-[#1c2541] to-[#2d3e8c] pt-28">
      {/* Decorative ambient glowing backlights */}
      <div className="absolute top-1/4 left-1/4 w-72 h-72 rounded-full bg-blue-500/10 blur-[100px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 rounded-full bg-[#3a506b]/15 blur-[120px] pointer-events-none" />
 
      {/* Diagonal grid lines background */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden opacity-10">
        <svg
          className="absolute bottom-0 right-0 w-[65%] h-full"
          viewBox="0 0 400 400"
          preserveAspectRatio="xMaxYMax slice"
          fill="none"
        >
          {Array.from({ length: 15 }).map((_, i) => (
            <ellipse
              key={i}
              cx="400"
              cy="400"
              rx={100 + i * 32}
              ry={100 + i * 32}
              stroke="white"
              strokeWidth="1.5"
            />
          ))}
        </svg>
      </div>
 
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full py-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 items-center gap-12">
          {/* Left: Text & Badges */}
          <div className="lg:col-span-6 text-center lg:text-left flex flex-col items-center lg:items-start select-none">
            {/* Premium Pill Badge */}
            <div className="inline-flex items-center gap-2 bg-white/5 border border-white/10 backdrop-blur-md px-4 py-2 rounded-full mb-6">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span className="text-white/80 font-black text-sm uppercase tracking-widest">
                #1 Rental Mobil Premium di Bandung
              </span>
            </div>
 
            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-black italic text-white leading-[1.15] mb-6 text-center lg:text-left tracking-tight">
              Sewa Mobil Bandung <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-[#5bc0be]">Mudah &amp; Terpercaya</span>
            </h1>
            <p className="text-white/70 font-normal text-lg sm:text-xl lg:text-2xl mb-10 leading-relaxed text-center lg:text-left max-w-xl">
              Pilihan armada lengkap untuk perjalanan bisnis, wisata, maupun kebutuhan harian dengan kenyamanan dan keamanan terjamin.
            </p>
 
            <div className="flex flex-col sm:flex-row gap-4 w-full justify-center lg:justify-start">
              <a
                href={`https://wa.me/${phone || "6281234567890"}?text=Halo%20Adhitama89!%20Saya%20ingin%20booking%20mobil`}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-gradient-to-r from-[#2d3e8c] to-[#1e2d6e] hover:from-[#1e2d6e] hover:to-[#0f1b4c] text-white font-black text-base uppercase tracking-widest px-10 py-5 rounded-2xl transition-all duration-300 shadow-xl shadow-blue-900/40 text-center hover:-translate-y-0.5"
              >
                Booking Sekarang!
              </a>
              <a
                href="#cars"
                className="bg-white/5 border border-white/10 text-white hover:bg-white/10 font-bold text-base uppercase tracking-widest px-10 py-5 rounded-2xl transition-all duration-300 text-center"
              >
                Lihat Armada
              </a>
            </div>
          </div>
 
          {/* Right: Overlapping dynamic cars with gradient backlight */}
          <div className="lg:col-span-6 relative flex items-center justify-center lg:justify-end py-6">
            {/* Visual Backlight Glow */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 rounded-full bg-blue-500/20 blur-[80px]" />
 
            <div className="relative w-full max-w-lg h-64 sm:h-76 md:h-80 lg:h-96">
              {/* Car 1 — SUV premium (back element) */}
              <div className="absolute bottom-0 right-0 w-[70%] drop-shadow-[0_20px_40px_rgba(0,0,0,0.5)] transform hover:scale-105 hover:-translate-y-2 transition-all duration-500 z-10">
                <Image
                  src="/3.png"
                  alt="Armada Adhitama89 — SUV premium"
                  width={380}
                  height={220}
                  className="object-contain w-full h-auto"
                  priority
                />
              </div>
 
              {/* Car 2 — MPV premium (front overlapping element) */}
              <div className="absolute top-0 left-0 w-[75%] drop-shadow-[0_25px_50px_rgba(0,0,0,0.6)] transform hover:scale-105 hover:-translate-y-2 transition-all duration-500 z-20">
                <Image
                  src="/4.png"
                  alt="Armada Adhitama89 — MPV premium"
                  width={380}
                  height={220}
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
