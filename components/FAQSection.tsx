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
    <section id="faq" className="py-20 bg-slate-50 relative overflow-hidden">
      {/* Decorative side accent blur */}
      <div className="absolute bottom-0 right-0 w-80 h-80 rounded-full bg-blue-500/5 blur-[90px] pointer-events-none" />
 
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section header */}
        <div className="text-center mb-16 select-none">
          <div className="inline-flex items-center gap-1.5 bg-[#2d3e8c]/5 border border-[#2d3e8c]/10 px-4.5 py-2 rounded-full mb-4">
            <span className="text-[#2d3e8c] font-black text-xs sm:text-sm uppercase tracking-widest">
              Tanya Jawab
            </span>
          </div>
          <h2 className="text-5xl sm:text-6xl font-black italic text-[#2d3e8c] mb-4 tracking-tight">
            Frequently Asked Questions
          </h2>
          <div className="w-20 h-1 bg-gradient-to-r from-blue-400 to-[#2d3e8c] mx-auto mb-4" />
          <p className="text-gray-500 text-lg sm:text-xl max-w-2xl mx-auto">
            Punya pertanyaan mengenai sewa mobil? Temukan jawabannya di bawah ini.
          </p>
        </div>
 
        {/* Accordion list with card layouts */}
        <Accordion type="single" collapsible className="w-full space-y-4">
          {faqs.map((faq, index) => (
            <AccordionItem
              key={index}
              value={`faq-${index}`}
              className="bg-white border border-slate-100 rounded-2xl px-6 shadow-sm hover:border-[#2d3e8c]/20 hover:shadow-md transition-all duration-300"
            >
              <AccordionTrigger className="text-left text-gray-900 hover:text-[#2d3e8c] font-black text-lg sm:text-xl py-5 hover:no-underline [&>svg]:text-[#2d3e8c] [&>svg]:w-5 [&>svg]:h-5 [&>svg]:transition-transform [&>svg]:duration-200">
                {faq.question}
              </AccordionTrigger>
              <AccordionContent className="text-gray-500 text-base sm:text-lg leading-relaxed pb-5 pt-1 border-t border-slate-50 mt-1">
                {faq.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
}
