"use client";

import { useState } from "react";
import { Plus, Minus, ChatCircle } from "@phosphor-icons/react";

const faqs = [
  {
    question: "Lokasi Adhitama89 Rental dimana?",
    answer:
      "Jl. Turangga Barat Baru No.4, Lkr. Sel., Kec. Lengkong, Kota Bandung, Jawa Barat 43261. Kami juga menyediakan layanan antar-jemput ke seluruh wilayah Bandung.",
  },
  {
    question: "Syarat sewa kendaraan apa saja?",
    answer:
      `Dokumen wajib:
• SIM A yang masih berlaku
• KTP / ID Card
• Kartu Keluarga (KK)

Dokumen pendukung (jika memiliki):
• NPWP
• KTA
• ID Kepegawaian
• Bukti booking hotel (untuk penyewa dari luar kota)

Untuk penyewa berdomisili Bandung, diwajibkan memberikan jaminan berupa sepeda motor atau deposit. Alternatif jaminan lainnya dapat disesuaikan berdasarkan kesepakatan bersama.

Pihak rental berhak meminta dokumen atau jaminan tambahan sesuai hasil verifikasi data dan wilayah penggunaan kendaraan.`,
  },
  {
    question: "Apa bisa antar jemput?",
    answer:
      "Bisa! Kami menyediakan layanan antar jemput ke lokasi Anda — baik alamat rumah, hotel, maupun bandara. Biaya antar jemput menyesuaikan jarak lokasi.",
  },
  {
    question: "Apakah bisa sewa lepas kunci (tanpa driver)?",
    answer:
      "Bisa, dengan syarat memiliki SIM A, Foto KK, Foto Sim A, ID Card, NPWP, KTA, Foto ID Kepegawaian PNS, Fto Booking Hotel. Untuk Domisili Bandung wajib menyimpan jaminan sepeda motor atau dengan deposit menyimpan data lainnya sesuai kesepakatan bersama. Untuk wilayah tertentu mungkin diperlukan jaminan tambahan.",
  },
  {
    question: "Berapa lama minimal masa sewa?",
    answer:
      "Kami menyediakan paket 12 jam dan 24 jam sesuai kebutuhan Anda. Untuk perjalanan ke luar kota, terdapat ketentuan durasi minimum tersendiri.",
  },
];

export default function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section id="faq" className="py-24 bg-white relative overflow-hidden">
      <div className="absolute bottom-0 left-0 w-[500px] h-[400px] bg-blue-50 rounded-full blur-[150px] opacity-60 pointer-events-none translate-y-1/2 -translate-x-1/4" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-16 items-start">
          {/* Left: Header */}
          <div className="lg:col-span-2 lg:sticky lg:top-32">
            <span
              className="inline-block text-xs font-bold uppercase tracking-[0.2em] mb-4"
              style={{ color: "var(--t-accent)" }}
            >
              FAQ
            </span>
            <h2
              className="text-4xl sm:text-5xl font-extrabold leading-[1.15] mb-5"
              style={{ color: "var(--t-primary)" }}
            >
              Pertanyaan yang Sering Ditanyakan
            </h2>
            <div
              className="w-16 h-1 rounded-full mb-6"
              style={{
                background:
                  "linear-gradient(to right, var(--t-accent), color-mix(in srgb, var(--t-accent) 80%, white 20%))",
              }}
            />
            <p className="text-gray-500 text-base leading-relaxed mb-8">
              Tidak menemukan jawaban yang Anda cari? Hubungi kami langsung
              melalui WhatsApp.
            </p>
            <a
              href="#contact"
              className="inline-flex items-center gap-2.5 text-white font-semibold px-7 py-3.5 transition-all duration-300 hover:shadow-lg hover:-translate-y-0.5 hover:brightness-90"
              style={{
                backgroundColor: "var(--t-primary)",
                borderRadius: "calc(var(--t-radius, 1rem) * 1.5)",
              }}
            >
              <ChatCircle className="w-5 h-5" weight="fill" />
              Tanya Sekarang
            </a>
          </div>

          {/* Right: Accordion */}
          <div className="lg:col-span-3 space-y-3">
            {faqs.map((faq, index) => {
              const isOpen = openIndex === index;
              return (
                <div
                  key={index}
                  className="border transition-all duration-300 overflow-hidden bg-white/50"
                  style={{
                    borderRadius: "var(--t-radius, 1rem)",
                    borderColor: isOpen
                      ? "color-mix(in srgb, var(--t-primary) 20%, transparent)"
                      : "#f3f4f6",
                    boxShadow: isOpen ? "0 4px 6px -1px rgb(0 0 0 / 0.05)" : "none",
                  }}
                >
                  <button
                    className="w-full text-left px-6 py-5 flex items-center justify-between focus:outline-none cursor-pointer"
                    onClick={() => setOpenIndex(isOpen ? null : index)}
                  >
                    <span
                      className="font-semibold text-[15px] pr-6 transition-colors"
                      style={{ color: isOpen ? "var(--t-primary)" : "#374151" }}
                    >
                      {faq.question}
                    </span>
                    <span
                      className="flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center transition-all duration-300"
                      style={{
                        backgroundColor: isOpen ? "var(--t-primary)" : "#f3f4f6",
                        color: isOpen ? "#ffffff" : "#6b7280",
                      }}
                    >
                      {isOpen ? (
                        <Minus className="w-4 h-4" weight="bold" />
                      ) : (
                        <Plus className="w-4 h-4" weight="bold" />
                      )}
                    </span>
                  </button>
                  <div
                    className={`px-6 overflow-hidden transition-all duration-500 ease-in-out ${
                      isOpen ? "max-h-[500px] pb-6 opacity-100" : "max-h-0 opacity-0"
                    }`}
                  >
                    <p className="whitespace-pre-line text-gray-500 text-[14px] leading-relaxed border-t border-gray-100 pt-4">
                      {faq.answer}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
