import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const faqs = [
  {
    question: "Lokasi Adhitama89 rentcar dimana?",
    answer:
      "Jl. Turangga Barat Baru No.4, Lkr. Sel., Kec. Lengkong, Kota Bandung, Jawa Barat 43261",
  },
  {
    question: "Syarat Sewanya apa saja?",
    answer:
      "KTP asli, SIM A yang masih berlaku, dan deposit sesuai jenis kendaraan. Untuk sewa dengan driver tidak diperlukan SIM. Pembayaran dapat dilakukan tunai maupun transfer.",
  },
  {
    question: "Apa bisa antar jemput?",
    answer:
      "Bisa! Kami menyediakan layanan antar jemput ke lokasi Anda — baik alamat rumah, hotel, maupun bandara. Biaya antar jemput menyesuaikan jarak lokasi.",
  },
  {
    question: "Apakah bisa lepas kunci?",
    answer:
      "Bisa, dengan syarat memiliki SIM A yang masih berlaku dan KTP asli. Untuk wilayah tertentu mungkin diperlukan jaminan tambahan.",
  },
];

export default function FAQSection() {
  return (
    <section id="faq" className="py-16 bg-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <div className="text-center mb-10">
          <h2 className="text-5xl font-black italic text-[#2d3e8c] mb-3">
            FAQ
          </h2>
          <div className="w-16 h-1 bg-[#2d3e8c] mx-auto mb-4" />
          <p className="text-gray-500 text-lg sm:text-xl">
            Pertanyaan Yang Sering Diajukan
          </p>
        </div>

        {/* Accordion */}
        <Accordion type="single" collapsible className="w-full space-y-0">
          {faqs.map((faq, index) => (
            <AccordionItem
              key={index}
              value={`faq-${index}`}
              className="border-b border-gray-200 last:border-b"
            >
              <AccordionTrigger className="text-left text-[#2d3e8c] font-bold text-lg sm:text-xl py-5 hover:no-underline hover:text-[#1e2d6e] [&>svg]:text-[#2d3e8c] [&>svg]:w-6 [&>svg]:h-6">
                {faq.question}
              </AccordionTrigger>
              <AccordionContent className="text-gray-600 text-base sm:text-lg leading-relaxed pb-5">
                {faq.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
}
