import Image from "next/image";

const highlights = [
  { value: "10+", label: "Tahun Pengalaman" },
  { value: "100+", label: "Unit Armada" },
  { value: "150K+", label: "Pelanggan Puas" },
];

export default function AboutUsSection() {
  return (
    <section id="about" className="py-24 bg-white relative overflow-hidden">
      {/* Decorative background blobs */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-amber-50 rounded-full blur-[120px] opacity-60 pointer-events-none -translate-y-1/2 translate-x-1/4" />
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-blue-50 rounded-full blur-[100px] opacity-50 pointer-events-none translate-y-1/3 -translate-x-1/4" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

          {/* Left: Image with floating stats */}
          <div className="relative">
            <div
              data-scroll-speed="-0.04"
              className="relative w-full aspect-[4/3] overflow-hidden shadow-2xl premium-tilt"
              style={{ borderRadius: "var(--t-radius, 1.5rem)" }}
            >
              <Image
                src="/hero_bg.png"
                alt="Tentang Kami - Adhitama89 Rental Mobil Bandung"
                fill
                className="object-cover inner-image"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
              {/* Overlay gradient */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent pointer-events-none" />
            </div>

            {/* Floating stat card */}
            <div
              data-scroll-speed="0.05"
              className="absolute -bottom-8 -right-6 bg-white shadow-xl p-5 border border-gray-100 hidden sm:block"
              style={{ borderRadius: "var(--t-radius, 1rem)" }}
            >
              <div className="flex items-center gap-3">
                <div
                  className="w-12 h-12 flex items-center justify-center shrink-0"
                  style={{
                    backgroundColor: "var(--t-accent)",
                    borderRadius: "calc(var(--t-radius, 1rem) * 0.8)",
                  }}
                >
                  <svg
                    className="w-6 h-6"
                    fill="currentColor"
                    viewBox="0 0 512 512"
                    style={{ color: "var(--t-accent-fg)" }}
                  >
                    <path d="M223.75 130.75L154.62 15.54A31.997 31.997 0 0 0 127.18 0H16.03C3.08 0-4.5 14.57 2.92 25.18l111.27 158.96c29.72-27.77 67.52-46.83 109.56-53.39zM495.97 0H384.82c-11.24 0-21.66 5.9-27.44 15.54l-69.13 115.21c42.04 6.56 79.84 25.62 109.56 53.38L509.08 25.18C516.5 14.57 508.92 0 495.97 0zM256 160c-97.2 0-176 78.8-176 176s78.8 176 176 176 176-78.8 176-176-78.8-176-176-176z" />
                  </svg>
                </div>
                <div>
                  <p className="text-2xl font-extrabold" style={{ color: "var(--t-primary)" }}>
                    2500+
                  </p>
                  <p className="text-xs text-gray-500 font-medium">Member Aktif</p>
                </div>
              </div>
            </div>

            {/* Year badge */}
            <div
              className="absolute -top-5 -left-5 text-white shadow-lg p-4 hidden sm:block"
              style={{
                backgroundColor: "var(--t-primary)",
                borderRadius: "var(--t-radius, 1rem)",
              }}
            >
              <p className="text-3xl font-extrabold leading-none">10+</p>
              <p className="text-xs text-white/70 mt-1">Tahun</p>
            </div>
          </div>

          {/* Right: Content */}
          <div className="space-y-6">
            <span
              className="inline-block text-xs font-bold uppercase tracking-[0.2em]"
              style={{ color: "var(--t-accent)" }}
            >
              Tentang Kami
            </span>
            <h2
              className="text-4xl sm:text-5xl font-extrabold leading-[1.15] tracking-tight"
              style={{ color: "var(--t-primary)" }}
            >
              Solusi Transportasi Terpercaya di Bandung
            </h2>
            <p className="text-gray-500 text-base leading-relaxed">
              Sejak 2016, Adhitama89 hadir sebagai solusi transportasi terbaik di Bandung. 
              Kami menyediakan lebih dari 100+ armada motor & mobil terbaru, terawat, dan 
              siap menemani perjalananmu — mulai dari liburan, kuliah, hingga perjalanan bisnis.
            </p>

            {/* Highlights */}
            <div className="grid grid-cols-3 gap-4 py-4">
              {highlights.map((h) => (
                <div
                  key={h.label}
                  className="bg-slate-50 p-4 text-center border border-slate-100"
                  style={{ borderRadius: "var(--t-radius, 1rem)" }}
                >
                  <p className="text-2xl font-extrabold" style={{ color: "var(--t-primary)" }}>
                    {h.value}
                  </p>
                  <p className="text-xs text-gray-500 mt-1">{h.label}</p>
                </div>
              ))}
            </div>

            <div className="flex gap-4 pt-2">
              <a
                href="#cars"
                className="group inline-flex items-center gap-3 text-white font-semibold px-8 py-4 bg-tp hover:bg-tp-dark transition-all duration-300 hover:shadow-lg hover:-translate-y-0.5"
                style={{
                  borderRadius: "calc(var(--t-radius, 1.5rem) * 1.5)",
                }}
              >
                Lihat Armada
                <svg className="w-5 h-5 transform group-hover:translate-x-1 transition-transform" fill="currentColor" viewBox="0 0 512 512">
                  <path d="M256 8c137 0 248 111 248 248S393 504 256 504 8 393 8 256 119 8 256 8zM140 300h116v70.9c0 10.7 13 16.1 20.5 8.5l114.3-114.9c4.7-4.7 4.7-12.2 0-16.9l-114.3-115c-7.6-7.6-20.5-2.2-20.5 8.5V212H140c-6.6 0-12 5.4-12 12v64c0 6.6 5.4 12 12 12z"/>
                </svg>
              </a>
              <a
                href="#contact"
                className="inline-flex items-center gap-2 border-2 font-semibold px-8 py-4 text-tp border-tp hover:bg-tp hover:text-white transition-all duration-300"
                style={{
                  borderRadius: "calc(var(--t-radius, 1.5rem) * 1.5)",
                }}
              >
                Hubungi Kami
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
