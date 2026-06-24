import { Check } from "lucide-react";
import { comparisonFeatures } from "@/data/pricing";

export default function ComparisonSection() {
  return (
    <section className="py-20 bg-slate-50 px-6 lg:px-12 xl:px-0">
      <div className="max-w-[1000px] mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <p className="text-amber-600 font-bold text-sm tracking-widest uppercase mb-3">
            PERBANDINGAN PAKET
          </p>
          <h2 className="text-3xl md:text-4xl font-bold text-[#0B1528]">
            Bandingkan Fitur Setiap Paket
          </h2>
        </div>

        {/* Table Container */}
        <div className="bg-white rounded-2xl md:rounded-[24px] shadow-sm border border-slate-200 overflow-hidden overflow-x-auto">
          <table className="w-full text-left border-collapse min-w-[800px]">
            <thead>
              <tr className="bg-[#0B1528] text-white">
                <th className="py-5 px-6 font-semibold w-1/4">Fitur</th>
                <th className="py-5 px-6 font-semibold text-center w-1/4 border-l border-slate-700">
                  Starter
                </th>
                <th className="py-5 px-6 font-semibold text-center w-1/4 border-l border-r border-amber-400 bg-[#0F1E38] relative">
                  <div className="flex items-center justify-center gap-2">
                    Pro
                    <span className="bg-amber-500 text-white text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-full whitespace-nowrap">
                      ★ Populer
                    </span>
                  </div>
                </th>
                <th className="py-5 px-6 font-semibold text-center w-1/4">
                  Signature
                </th>
              </tr>
            </thead>
            <tbody>
              {comparisonFeatures.map((feature, idx) => (
                <tr
                  key={idx}
                  className="border-b border-slate-100 last:border-0 hover:bg-slate-50/50 transition-colors"
                >
                  <td className="py-4 px-6 text-slate-700 font-medium text-sm">
                    {feature.name}
                  </td>
                  <td className="py-4 px-6 text-center text-slate-600 text-sm">
                    {renderValue(feature.starter)}
                  </td>
                  <td className="py-4 px-6 text-center text-slate-600 text-sm border-l border-r border-amber-200 bg-amber-50/30">
                    {renderValue(feature.pro)}
                  </td>
                  <td className="py-4 px-6 text-center text-slate-600 text-sm">
                    {renderValue(feature.signature)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}

function renderValue(value: string | boolean) {
  if (typeof value === "boolean") {
    return value ? (
      <Check className="w-5 h-5 text-green-500 mx-auto stroke-[3]" />
    ) : (
      <span className="text-slate-300 font-bold">-</span>
    );
  }
  return value;
}
