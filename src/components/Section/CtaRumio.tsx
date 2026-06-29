import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { getSettings } from "@/app/admin/settings/actions";

export default async function CtaRumio() {
  const { data } = await getSettings(["contact_whatsapp"]);
  const waNumberRaw = data?.contact_whatsapp || "";
  const waNumber = waNumberRaw.replace(/[^0-9]/g, "");
  
  const waText = encodeURIComponent("Halo Admin Rumio, saya ingin berdiskusi lebih lanjut tentang layanan dari Rumio.id.");
  const waLink = waNumber ? `https://wa.me/${waNumber}?text=${waText}` : "#";

  return (
    <section className="py-12 bg-white pb-24">
      <div className="container mx-auto px-6 max-w-[1500px]">
        <div className="relative w-full rounded-3xl overflow-hidden bg-[#0B1528] flex flex-col md:flex-row">
          
          {/* Image Container (Far Left) */}
          <div className="relative w-full md:w-[35%] h-[250px] md:h-auto shrink-0">
            <div
              className="absolute inset-0 bg-cover bg-center"
              style={{
                backgroundImage: 'url("/Section-HeroBeranda.webp")',
              }}
            />
            {/* Gradient to blend with dark blue on the right */}
            <div className="absolute inset-0 bg-linear-to-r from-transparent via-[#0B1528]/50 to-[#0B1528]" />
            {/* Gradient to blend with dark blue on the bottom (for mobile) */}
            <div className="absolute inset-0 bg-linear-to-b from-transparent via-[#0B1528]/0 to-[#0B1528] md:hidden" />
          </div>

          {/* Content Wrapper (Middle and Right) */}
          <div className="flex-1 flex flex-col lg:flex-row items-center justify-between p-8 md:py-12 md:pr-12 lg:pr-16 gap-8 z-10 -mt-10 md:mt-0">
            
            {/* Center Text Content */}
            <div className="w-full lg:w-[60%] text-white text-center md:text-left">
              <h2 className="text-2xl md:text-3xl lg:text-[32px] font-bold mb-4 leading-tight">
                Siap Tampilkan Properti Anda Lebih Profesional?
              </h2>
              <p className="text-slate-300 text-sm md:text-base leading-relaxed">
                Bergabunglah dengan ratusan pemilik properti yang telah merasakan
                manfaat Rumio untuk menjual atau menyewakan properti lebih cepat.
              </p>
            </div>

            {/* Right Buttons */}
            <div className="w-full lg:w-auto flex flex-col gap-3 shrink-0 min-w-[240px]">
              <Link href="/pricing" className="w-full">
                <Button variant="amber" size="hero" className="w-full inline-flex gap-1.5 sm:gap-2 shadow-lg shadow-amber-900/20">
                  <span className="text-center leading-tight">
                    Mulai Sekarang
                  </span>
                  <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 shrink-0" />
                </Button>
              </Link>
              <Link href={waLink} target="_blank" rel="noopener noreferrer" className="w-full">
                <Button size="hero" className="w-full inline-flex gap-1.5 sm:gap-2 bg-transparent border border-slate-600 hover:bg-white/5 text-white shadow-none transition-colors">
                  <svg
                    viewBox="0 0 24 24"
                    width="20"
                    height="20"
                    fill="currentColor"
                    className="shrink-0"
                  >
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 0 0-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.82 9.82 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.81 11.81 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.88 11.88 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.82 11.82 0 0 0-3.48-8.413Z" />
                  </svg>
                  <span className="text-center leading-tight">
                    Hubungi via WhatsApp
                  </span>
                </Button>
              </Link>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
}
