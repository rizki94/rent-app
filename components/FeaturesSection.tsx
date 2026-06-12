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
    <section id="layanan" className="py-16 bg-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <div className="text-center mb-6">
          <h2 className="text-5xl font-black italic text-[#2d3e8c] mb-3">
            Layanan &amp; Fasilitas
          </h2>
          <div className="w-24 h-1 bg-[#2d3e8c] mx-auto mb-5" />
          <p className="text-gray-500 text-lg sm:text-xl max-w-3xl mx-auto">
            Adhitama89 hadir dengan layanan sewa lengkap dan fasilitas terbaik
            untuk perjalanan tanpa ribet. Nikmati pengalaman sewa yang aman,
            nyaman, dan praktis. Percayakan perjalananmu pada kami!
          </p>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-12">
          {services.map((service) => {
            const Icon = service.icon;
            return (
              <div
                key={service.title}
                className="bg-[#2d3e8c] rounded-2xl px-6 py-8 flex flex-col items-center text-center hover:bg-[#1e2d6e] transition-colors duration-200"
              >
                <div className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center mb-5">
                  <Icon className="w-6 h-6 text-white" weight="fill" />
                </div>
                <h3 className="text-white font-bold text-lg sm:text-xl mb-3">
                  {service.title}
                </h3>
                <p className="text-white/70 text-base leading-relaxed">
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
