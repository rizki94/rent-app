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
    description: "Selalu dicek dan diservis secara berkala.",
  },
  {
    icon: SteeringWheelIcon,
    title: "Driver Profesional",
    description: "Ramah, berpengalaman, dan tepat waktu.",
  },
  {
    icon: DeviceMobileIcon,
    title: "Booking Mudah",
    description: "Pesan mobil cukup melalui WhatsApp.",
  },
  {
    icon: Key,
    title: "Lepas Kunci",
    description: "Menyediakan bebas lepas kunci.",
  },
  {
    icon: CarProfileIcon,
    title: "Antar Jemput",
    description: "Layanan antar jemput sesuai kebutuhan.",
  },
  {
    icon: ClockIcon,
    title: "Siap Kapan Saja",
    description: "Layanan cepat dan responsif.",
  },
];

export default function FeaturesSection() {
  return (
    <section id="layanan" className="py-20 bg-slate-50 relative overflow-hidden">
      {/* Decorative side accent blur */}
      <div className="absolute top-1/2 left-0 w-72 h-72 rounded-full bg-blue-500/5 blur-[80px] pointer-events-none" />
 
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section header */}
        <div className="text-center mb-16 select-none">
          <div className="inline-flex items-center gap-1.5 bg-[#2d3e8c]/5 border border-[#2d3e8c]/10 px-4.5 py-2 rounded-full mb-4">
            <span className="text-[#2d3e8c] font-black text-xs sm:text-sm uppercase tracking-widest">
              Layanan Utama
            </span>
          </div>
          <h2 className="text-5xl sm:text-6xl font-black italic text-[#2d3e8c] mb-4 tracking-tight">
            Fasilitas &amp; Layanan Terbaik
          </h2>
          <div className="w-20 h-1 bg-gradient-to-r from-blue-400 to-[#2d3e8c] mx-auto mb-4" />
          <p className="text-gray-500 text-lg sm:text-xl max-w-3xl mx-auto">
            Adhitama89 hadir dengan layanan sewa lengkap dan fasilitas terbaik untuk perjalanan tanpa hambatan. Nikmati sewa yang aman, nyaman, dan praktis.
          </p>
        </div>
 
        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service) => {
            const Icon = service.icon;
            return (
              <div
                key={service.title}
                className="group bg-white border border-slate-100/80 rounded-3xl p-8 hover:shadow-xl hover:border-blue-500/20 hover:-translate-y-1 transition-all duration-300 flex flex-col items-start text-left"
              >
                <div className="w-14 h-14 rounded-2xl bg-[#2d3e8c]/5 text-[#2d3e8c] group-hover:bg-[#2d3e8c] group-hover:text-white flex items-center justify-center mb-6 transition-all duration-300">
                  <Icon className="w-6 h-6" weight="bold" />
                </div>
                <h3 className="text-gray-900 font-black text-2xl mb-3 group-hover:text-[#2d3e8c] transition-colors">
                  {service.title}
                </h3>
                <p className="text-gray-500 text-base leading-relaxed">
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
