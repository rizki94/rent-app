import {
  WrenchIcon,
  SteeringWheelIcon,
  DeviceMobileIcon,
  Key,
  CarProfileIcon,
  ClockIcon,
} from "@phosphor-icons/react/dist/ssr";

const services = [
  {
    icon: WrenchIcon,
    title: "Armada Terawat",
    description: "Selalu dicek dan diservis secara berkala agar selalu prima.",
    color: "from-blue-500 to-blue-600",
  },
  {
    icon: SteeringWheelIcon,
    title: "Driver Profesional",
    description: "Ramah, berpengalaman, dan tepat waktu untuk setiap perjalanan.",
    color: "from-violet-500 to-violet-600",
  },
  {
    icon: DeviceMobileIcon,
    title: "Booking Mudah",
    description: "Pesan mobil cukup melalui WhatsApp, cepat dan mudah.",
    color: "from-emerald-500 to-emerald-600",
  },
  {
    icon: Key,
    title: "Lepas Kunci",
    description: "Menyediakan layanan sewa bebas lepas kunci tanpa driver.",
    color: "from-amber-500 to-amber-600",
  },
  {
    icon: CarProfileIcon,
    title: "Antar Jemput",
    description: "Layanan antar jemput ke lokasi Anda di seluruh Bandung.",
    color: "from-rose-500 to-rose-600",
  },
  {
    icon: ClockIcon,
    title: "Siap 24 Jam",
    description: "Layanan cepat, responsif, dan tersedia kapan saja.",
    color: "from-cyan-500 to-cyan-600",
  },
];

export default function FeaturesSection() {
  return (
    <section
      id="layanan"
      className="py-24 relative overflow-hidden"
      style={{ background: "linear-gradient(135deg, var(--t-hero-from), var(--t-hero-to))" }}
    >
      {/* Decorative elements */}
      <div className="absolute top-0 left-1/4 w-72 h-72 bg-blue-400/10 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-amber-400/10 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section header */}
        <div className="mb-16 text-center">
          <span
            className="inline-block text-xs font-bold uppercase tracking-[0.2em] mb-4"
            style={{ color: "var(--t-accent)" }}
          >
            Yang Kami Tawarkan
          </span>
          <h2 className="text-4xl sm:text-5xl font-extrabold text-white mb-5">
            Fasilitas &amp; Layanan
          </h2>
          <div
            className="w-16 h-1 mx-auto rounded-full mb-5"
            style={{
              background:
                "linear-gradient(to right, var(--t-accent), color-mix(in srgb, var(--t-accent) 80%, white 20%))",
            }}
          />
          <p className="text-white/60 text-base max-w-xl mx-auto">
            Adhitama89 hadir dengan layanan sewa lengkap dan fasilitas terbaik untuk perjalanan tanpa hambatan.
          </p>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service) => {
            const Icon = service.icon;
            return (
              <div
                key={service.title}
                className="group relative bg-white/5 hover:bg-white/10 border border-white/10 hover:border-white/20 p-7 transition-all duration-500 hover:-translate-y-2 overflow-hidden"
                style={{ borderRadius: "var(--t-radius, 1rem)" }}
              >
                {/* Subtle gradient glow on hover */}
                <div className={`absolute inset-0 bg-gradient-to-br ${service.color} opacity-0 group-hover:opacity-8 transition-opacity duration-300`} />

                {/* Diagonal gloss sweep */}
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none overflow-hidden"
                  style={{ borderRadius: "inherit" }}>
                  <div className="absolute top-0 left-[-100%] w-2/3 h-full bg-gradient-to-r from-transparent via-white/10 to-transparent skew-x-[-20deg] group-hover:left-[150%] transition-all duration-700 ease-in-out" />
                </div>

                <div
                  className={`w-14 h-14 bg-gradient-to-br ${service.color} flex items-center justify-center mb-5 shadow-lg transition-all duration-500 group-hover:scale-110 group-hover:rotate-3`}
                  style={{ borderRadius: "calc(var(--t-radius, 1rem) * 0.8)" }}
                >
                  <Icon className="w-7 h-7 text-white" weight="fill" />
                </div>
                <h3 className="text-white font-bold text-[19px] mb-2 relative z-10">
                  {service.title}
                </h3>
                <p className="text-white/55 text-[14px] leading-relaxed relative z-10">
                  {service.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
