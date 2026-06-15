"use client";

const whyUs = [
  {
    icon: "⏱️",
    title: "Sewa Fleksibel",
    description:
      "Sistem sewa 6 jam, 12 jam, atau 24 jam sesuai kebutuhan tanpa terikat harian penuh.",
    accent: "bg-amber-50 border-amber-100",
    iconBg: "bg-amber-100",
  },
  {
    icon: "👨‍💼",
    title: "Tim Profesional",
    description:
      "Sumber daya terbaik untuk melayani Anda — pemesanan cepat, ramah, dan berpengalaman.",
    accent: "bg-blue-50 border-blue-100",
    iconBg: "bg-blue-100",
  },
  {
    icon: "🚗",
    title: "Unit Terawat",
    description:
      "Semua kendaraan dicek dan diservis berkala agar selalu dalam kondisi prima dan nyaman.",
    accent: "bg-emerald-50 border-emerald-100",
    iconBg: "bg-emerald-100",
  },
  {
    icon: "📞",
    title: "CS 24 Jam",
    description:
      "Tim kami siap melayani kapan saja — dari pemesanan hingga bantuan darurat di jalan.",
    accent: "bg-violet-50 border-violet-100",
    iconBg: "bg-violet-100",
  },
];

export default function WhyUsFeatureSection() {
  return (
    <section id="kenapa-kami" className="py-24 bg-white relative overflow-hidden">
      {/* Subtle grid texture */}
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI0MCIgaGVpZ2h0PSI0MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAwIDEwIEwgNDAgMTAgTSAxMCAwIEwgMTAgNDAgTSAwIDIwIEwgNDAgMjAgTSAyMCAwIEwgMjAgNDAgTSAwIDMwIEwgNDAgMzAgTSAzMCAwIEwgMzAgNDAiIGZpbGw9Im5vbmUiIHN0cm9rZT0iI2UyZThmMCIgc3Ryb2tlLXdpZHRoPSIxIi8+PC9wYXR0ZXJuPjwvZGVmcz48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSJ1cmwoI2dyaWQpIi8+PC9zdmc+')] opacity-40 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <div className="mb-16 text-center">
          <span className="inline-block text-xs font-bold uppercase tracking-[0.2em] text-amber-500 mb-4">
            Keunggulan Kami
          </span>
          <h2 className="text-4xl sm:text-5xl font-extrabold text-[#0A274E] mb-5">
            Kenapa Harus Kami?
          </h2>
          <div className="w-16 h-1 bg-gradient-to-r from-amber-400 to-amber-500 mx-auto rounded-full" />
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {whyUs.map((item, idx) => (
            <div
              key={item.title}
              className={`group rounded-2xl border p-7 hover:shadow-xl transition-all duration-300 hover:-translate-y-1 ${item.accent}`}
            >
              <div className={`w-14 h-14 rounded-2xl ${item.iconBg} flex items-center justify-center text-3xl mb-5`}>
                {item.icon}
              </div>
              <h3 className="text-[#0A274E] font-bold text-[18px] mb-3">{item.title}</h3>
              <p className="text-gray-500 text-[14px] leading-relaxed">
                {item.description}
              </p>
              <div className="mt-5 flex items-center gap-1.5 text-[#0A274E] text-[13px] font-semibold opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <span>0{idx + 1}</span>
                <div className="flex-1 h-px bg-[#0A274E]/30" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
