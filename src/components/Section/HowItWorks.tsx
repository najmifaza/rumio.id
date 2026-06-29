import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { stepsData } from "@/data/how-it-works";

export default function HowItWorks() {
  return (
    <section className="w-full bg-[#FAFAFA] py-24 px-6 lg:px-12 xl:px-0 font-sans">
      <div className="max-w-[1200px] mx-auto">
        <div className="flex flex-col lg:flex-row gap-16 lg:gap-8 items-center lg:items-start">
          {/* Left Column */}
          <div className="lg:w-1/3 flex flex-col items-center lg:items-start text-center lg:text-left shrink-0">
            <span className="text-xs font-bold text-amber-600 tracking-[0.15em] uppercase mb-4 block">
              Cara Kerja
            </span>
            <h2 className="text-3xl md:text-4xl font-extrabold text-[#0B1528] tracking-tight leading-[1.2] mb-8">
              3 Langkah Mudah
              <br className="hidden lg:block" /> Bersama Rumio
            </h2>
            <Link href="/pricing">
              <Button className="flex gap-2 px-6 py-4 h-auto text-sm rounded-lg w-fit">
                Lihat Paket Langganan
                <ArrowRight className="w-4 h-4" />
              </Button>
            </Link>
          </div>

          {/* Right Column - Steps */}
          <div className="lg:w-2/3 w-full relative pt-4 lg:pt-0">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
              {stepsData.map((step, index) => (
                <div
                  key={index}
                  className="flex flex-col items-center text-center relative"
                >
                  {/* Connecting Line to Next Step (Desktop & Tablet) */}
                  {index < stepsData.length - 1 && (
                    <div className="hidden md:block absolute top-[44px] left-[50%] w-[calc(100%+2.5rem)] pointer-events-none">
                      <div className="absolute left-[60px] right-[60px] h-[1px] border-t border-dashed border-slate-300">
                        <svg
                          className="absolute -right-2 -top-[5px] text-slate-300 w-2.5 h-2.5"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="3"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <path d="m9 18 6-6-6-6" />
                        </svg>
                      </div>
                    </div>
                  )}

                  {/* Icon Container */}
                  <div className="relative w-[88px] h-[88px] bg-white rounded-full flex items-center justify-center shadow-[0_8px_30px_rgb(0,0,0,0.06)] mb-8 mx-auto z-10">
                    {/* Number Badge */}
                    <div className="absolute top-0 left-0 -translate-x-1 -translate-y-1 w-8 h-8 bg-amber-500 text-white font-bold rounded-full flex items-center justify-center text-sm ring-4 ring-[#FAFAFA]">
                      {step.number}
                    </div>
                    {/* Icon */}
                    <step.icon className="w-8 h-8 text-[#0B1528]" />
                  </div>

                  {/* Text */}
                  <h3 className="text-[17px] font-bold text-[#0B1528] mb-3">
                    {step.title}
                  </h3>
                  <p className="text-sm text-slate-500 leading-relaxed max-w-[250px] mx-auto">
                    {step.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
