import { ArrowRight } from "lucide-react";

export default function CtaHelpCard() {
  return (
    <div className="relative rounded-[20px] overflow-hidden p-6 lg:p-8 shadow-md">
      <div
        className="absolute inset-0 bg-cover bg-center z-0"
        style={{
          backgroundImage:
            'url("/ui-cta-help-card.webp")',
        }}
      >
        <div className="absolute inset-0 bg-[#0B1528]/70 backdrop-blur-[2px]"></div>
      </div>

      <div className="relative z-10 flex flex-col gap-4">
        <h3 className="text-[20px] md:text-[22px] font-bold text-white leading-snug">
          Butuh Bantuan Memasarkan Properti Anda?
        </h3>
        <p className="text-white/80 text-[15px] leading-relaxed mb-1">
          Tim Rumio siap membantu menampilkan properti Anda secara profesional.
        </p>

        <button className="w-full bg-[#D98A2C] hover:bg-amber-600 text-white text-[15px] font-bold py-3.5 px-4 rounded-xl flex items-center justify-center gap-2 transition-colors">
          Hubungi Kami via WhatsApp
          <ArrowRight className="w-[18px] h-[18px]" />
        </button>
      </div>
    </div>
  );
}
