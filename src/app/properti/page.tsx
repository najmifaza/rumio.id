"use client";

import { useState } from "react";
import { mockProperties } from "@/data/properties";
import PropertyCard from "@/components/ui/property-card";
import { Filter, X, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import Breadcrumbs from "@/components/ui/breadcrumbs";

export default function PropertiesPage() {
  const [transactionType, setTransactionType] = useState<string[]>([]);
  const [propertyType, setPropertyType] = useState<string[]>([]);
  const [minPrice, setMinPrice] = useState<string>("");
  const [maxPrice, setMaxPrice] = useState<string>("");
  const [minBuildingArea, setMinBuildingArea] = useState<string>("");
  const [maxBuildingArea, setMaxBuildingArea] = useState<string>("");
  const [minLandArea, setMinLandArea] = useState<string>("");
  const [maxLandArea, setMaxLandArea] = useState<string>("");
  const [bedrooms, setBedrooms] = useState<number | null>(null);
  const [features, setFeatures] = useState<string[]>([]);
  const [searchQuery, setSearchQuery] = useState<string>("");

  // Mobile filter toggle
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  const toggleArrayItem = (
    array: string[],
    item: string,
    setter: React.Dispatch<React.SetStateAction<string[]>>,
  ) => {
    if (array.includes(item)) {
      setter(array.filter((i) => i !== item));
    } else {
      setter([...array, item]);
    }
  };

  const handleReset = () => {
    setTransactionType([]);
    setPropertyType([]);
    setMinPrice("");
    setMaxPrice("");
    setMinBuildingArea("");
    setMaxBuildingArea("");
    setMinLandArea("");
    setMaxLandArea("");
    setBedrooms(null);
    setFeatures([]);
    setSearchQuery("");
  };

  const filteredProperties = mockProperties.filter((p) => {
    // Pencarian Text
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      const matchTitle = p.title.toLowerCase().includes(query);
      const matchLocation = p.location.toLowerCase().includes(query);
      if (!matchTitle && !matchLocation) return false;
    }

    // Tipe Transaksi
    if (
      transactionType.length > 0 &&
      (!p.listingType || !transactionType.includes(p.listingType))
    )
      return false;

    // Jenis Properti
    if (
      propertyType.length > 0 &&
      (!p.propertyType || !propertyType.includes(p.propertyType))
    )
      return false;

    // Rentang Harga
    if (minPrice && p.priceNumeric < parseInt(minPrice)) return false;
    if (maxPrice && p.priceNumeric > parseInt(maxPrice)) return false;

    // Luas Bangunan
    if (minBuildingArea && (p.area || 0) < parseInt(minBuildingArea))
      return false;
    if (maxBuildingArea && (p.area || 0) > parseInt(maxBuildingArea))
      return false;

    // Luas Tanah
    if (minLandArea && (p.landArea || 0) < parseInt(minLandArea)) return false;
    if (maxLandArea && (p.landArea || 0) > parseInt(maxLandArea)) return false;

    // Kamar Tidur
    if (bedrooms !== null && (p.beds || 0) < bedrooms) return false;

    // Fitur Unggulan
    if (features.length > 0) {
      if (!p.features) return false;
      const hasAllFeatures = features.every((f) => p.features!.includes(f));
      if (!hasAllFeatures) return false;
    }

    return true;
  });

  const renderFilterContent = () => (
    <div className="space-y-8">
      {/* Tipe Transaksi */}
      <div>
        <h3 className="text-sm font-bold text-[#0B1528] mb-3">
          Tipe Transaksi
        </h3>
        <div className="space-y-2.5">
          {["Dijual", "Disewakan", "Keduanya"].map((type) => (
            <label
              key={type}
              className="flex items-center gap-3 cursor-pointer group"
            >
              <input
                type="checkbox"
                checked={transactionType.includes(type)}
                onChange={() =>
                  toggleArrayItem(transactionType, type, setTransactionType)
                }
                className="w-4 h-4 rounded border-slate-300 accent-[#0B1528] cursor-pointer"
              />
              <span className="text-sm text-slate-600 group-hover:text-[#0B1528]">
                {type}
              </span>
            </label>
          ))}
        </div>
      </div>

      {/* Jenis Properti */}
      <div>
        <h3 className="text-sm font-bold text-[#0B1528] mb-3">
          Jenis Properti
        </h3>
        <div className="space-y-2.5">
          {[
            "Rumah",
            "Apartemen",
            "Ruko",
            "Tanah",
            "Villa",
            "Gudang",
            "Kost",
          ].map((type) => (
            <label
              key={type}
              className="flex items-center gap-3 cursor-pointer group"
            >
              <input
                type="checkbox"
                checked={propertyType.includes(type)}
                onChange={() =>
                  toggleArrayItem(propertyType, type, setPropertyType)
                }
                className="w-4 h-4 rounded border-slate-300 accent-[#0B1528] cursor-pointer"
              />
              <span className="text-sm text-slate-600 group-hover:text-[#0B1528]">
                {type}
              </span>
            </label>
          ))}
        </div>
      </div>

      {/* Rentang Harga */}
      <div>
        <h3 className="text-sm font-bold text-[#0B1528] mb-3">Rentang Harga</h3>
        <div className="space-y-3">
          <select
            value={minPrice}
            onChange={(e) => setMinPrice(e.target.value)}
            className="w-full h-10 px-3 text-sm border border-slate-200 rounded-lg focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500 outline-none text-slate-600 bg-white"
          >
            <option value="">Harga Minimum</option>
            <option value="100000000">Rp 100 Juta</option>
            <option value="500000000">Rp 500 Juta</option>
            <option value="1000000000">Rp 1 Miliar</option>
            <option value="2000000000">Rp 2 Miliar</option>
          </select>
          <select
            value={maxPrice}
            onChange={(e) => setMaxPrice(e.target.value)}
            className="w-full h-10 px-3 text-sm border border-slate-200 rounded-lg focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500 outline-none text-slate-600 bg-white"
          >
            <option value="">Harga Maksimum</option>
            <option value="500000000">Rp 500 Juta</option>
            <option value="1000000000">Rp 1 Miliar</option>
            <option value="2000000000">Rp 2 Miliar</option>
            <option value="5000000000">Rp 5 Miliar</option>
          </select>
        </div>
      </div>

      {/* Luas Bangunan */}
      <div>
        <h3 className="text-sm font-bold text-[#0B1528] mb-3">Luas Bangunan</h3>
        <div className="flex items-center gap-3">
          <div className="relative flex-1">
            <input
              type="number"
              placeholder="Min"
              value={minBuildingArea}
              onChange={(e) => setMinBuildingArea(e.target.value)}
              className="w-full h-10 pl-3 pr-8 text-sm border border-slate-200 rounded-lg focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500 outline-none text-slate-600"
            />
            <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs font-medium text-slate-400">
              m²
            </span>
          </div>
          <div className="relative flex-1">
            <input
              type="number"
              placeholder="Max"
              value={maxBuildingArea}
              onChange={(e) => setMaxBuildingArea(e.target.value)}
              className="w-full h-10 pl-3 pr-8 text-sm border border-slate-200 rounded-lg focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500 outline-none text-slate-600"
            />
            <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs font-medium text-slate-400">
              m²
            </span>
          </div>
        </div>
      </div>

      {/* Luas Tanah */}
      <div>
        <h3 className="text-sm font-bold text-[#0B1528] mb-3">Luas Tanah</h3>
        <div className="flex items-center gap-3">
          <div className="relative flex-1">
            <input
              type="number"
              placeholder="Min"
              value={minLandArea}
              onChange={(e) => setMinLandArea(e.target.value)}
              className="w-full h-10 pl-3 pr-8 text-sm border border-slate-200 rounded-lg focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500 outline-none text-slate-600"
            />
            <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs font-medium text-slate-400">
              m²
            </span>
          </div>
          <div className="relative flex-1">
            <input
              type="number"
              placeholder="Max"
              value={maxLandArea}
              onChange={(e) => setMaxLandArea(e.target.value)}
              className="w-full h-10 pl-3 pr-8 text-sm border border-slate-200 rounded-lg focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500 outline-none text-slate-600"
            />
            <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs font-medium text-slate-400">
              m²
            </span>
          </div>
        </div>
      </div>

      {/* Kamar Tidur */}
      <div>
        <h3 className="text-sm font-bold text-[#0B1528] mb-3">Kamar Tidur</h3>
        <div className="grid grid-cols-4 gap-2">
          {[1, 2, 3, 4].map((num) => (
            <button
              key={num}
              onClick={() => setBedrooms(bedrooms === num ? null : num)}
              className={`h-10 text-sm font-medium rounded-lg border transition-colors ${
                bedrooms === num
                  ? "bg-amber-50 border-amber-500 text-amber-700"
                  : "bg-white border-slate-200 text-slate-600 hover:border-amber-200 hover:bg-slate-50"
              }`}
            >
              {num}+
            </button>
          ))}
        </div>
      </div>

      {/* Fitur Unggulan */}
      <div>
        <h3 className="text-sm font-bold text-[#0B1528] mb-3">
          Fitur Unggulan
        </h3>
        <div className="space-y-2.5">
          {[
            "Carport",
            "Taman",
            "Kolam Renang",
            "Keamanan 24 Jam",
            "Dekat Sekolah",
            "Dekat Mall",
          ].map((feature) => (
            <label
              key={feature}
              className="flex items-center gap-3 cursor-pointer group"
            >
              <input
                type="checkbox"
                checked={features.includes(feature)}
                onChange={() => toggleArrayItem(features, feature, setFeatures)}
                className="w-4 h-4 rounded border-slate-300 accent-[#0B1528] cursor-pointer"
              />
              <span className="text-sm text-slate-600 group-hover:text-[#0B1528]">
                {feature}
              </span>
            </label>
          ))}
        </div>
      </div>

      {/* Actions */}
      <div className="pt-4 border-t border-slate-100 flex flex-col gap-3">
        <Button
          className="w-full bg-[#0B1528] hover:bg-[#1a2b4c] text-white h-11 rounded-lg"
          onClick={() => setIsFilterOpen(false)}
        >
          Terapkan Filter
        </Button>
        <Button
          variant="outline"
          className="w-full h-11 rounded-lg border-amber-200 text-amber-700 hover:bg-amber-50 hover:text-amber-800"
          onClick={handleReset}
        >
          Reset Filter
        </Button>
      </div>
    </div>
  );

  return (
    <main className="min-h-screen bg-slate-50 pb-20 font-sans pt-20">
      <div className="max-w-[1600px] mx-auto px-6 lg:px-12 xl:px-0 mt-8">
        {/* Breadcrumb */}
        <Breadcrumbs
          className="mb-6"
          items={[{ label: "Beranda", href: "/" }, { label: "Properti" }]}
        />

        <div className="flex flex-col lg:flex-row lg:justify-between lg:items-end gap-6 mb-8">
          <div>
            <h1 className="text-3xl md:text-[34px] font-bold text-[#0B1528] tracking-tight mb-2">
              Cari Properti Impian
            </h1>
            <p className="text-slate-500">
              Menampilkan {filteredProperties.length} properti yang sesuai
              dengan kriteria Anda
            </p>
          </div>

          {/* Search Bar + Mobile Filter Button */}
          <div className="flex items-center gap-3 w-full lg:w-auto">
            <div className="relative flex-1 lg:w-[320px]">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <input
                type="text"
                placeholder="Cari lokasi, nama properti..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full h-11 pl-10 pr-4 text-sm border border-slate-200 rounded-lg focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500 outline-none text-slate-600 bg-white"
              />
            </div>
            <Button
              className="lg:hidden flex items-center justify-center gap-2 bg-white text-[#0B1528] border border-slate-200 hover:bg-slate-50 h-11 px-5"
              onClick={() => setIsFilterOpen(true)}
              variant="outline"
            >
              <Filter className="w-4 h-4" />
              <span className="hidden sm:inline">Filter</span>
            </Button>
          </div>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Desktop Sidebar Filter */}
          <div className="hidden lg:block w-[300px] xl:w-[320px] shrink-0">
            <div
              className="bg-white rounded-2xl border border-slate-100 shadow-sm p-6 sticky top-28 max-h-[85vh] overflow-y-auto no-scrollbar"
              data-lenis-prevent
            >
              <h2 className="text-lg font-bold text-[#0B1528] mb-6 flex flex-row gap-3 items-center">
                <Filter className="w-4 h-4" /> Filter
              </h2>
              {renderFilterContent()}
            </div>
          </div>

          {/* Mobile Sidebar Overlay */}
          {isFilterOpen && (
            <div className="fixed inset-0 z-50 flex lg:hidden">
              <div
                className="fixed inset-0 bg-black/50 transition-opacity"
                onClick={() => setIsFilterOpen(false)}
              ></div>
              <div className="relative w-[85%] max-w-sm h-full bg-white ml-auto overflow-y-auto p-6 shadow-xl flex flex-col">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-lg font-bold text-[#0B1528]">Filter</h2>
                  <button
                    onClick={() => setIsFilterOpen(false)}
                    className="p-2 -mr-2 text-slate-400 hover:text-slate-600 rounded-full hover:bg-slate-100"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>
                {renderFilterContent()}
              </div>
            </div>
          )}

          {/* Main Content: Property List */}
          <div className="flex-1">
            {filteredProperties.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                {filteredProperties.map((property) => (
                  <PropertyCard
                    key={property.slug}
                    image={property.image}
                    title={property.title}
                    location={property.location}
                    beds={property.beds || 0}
                    baths={property.baths || 0}
                    cars={property.cars || 0}
                    area={property.area || 0}
                    priceNumeric={property.priceNumeric}
                    link={property.link}
                    badge={property.badge}
                  />
                ))}
              </div>
            ) : (
              <div className="bg-white rounded-2xl border border-slate-100 p-12 text-center shadow-sm">
                <div className="w-16 h-16 bg-slate-50 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Filter className="w-8 h-8 text-slate-400" />
                </div>
                <h3 className="text-lg font-bold text-[#0B1528] mb-2">
                  Properti tidak ditemukan
                </h3>
                <p className="text-slate-500 text-sm mb-6 max-w-sm mx-auto">
                  Coba sesuaikan filter Anda dengan mengubah rentang harga,
                  lokasi, atau tipe properti.
                </p>
                <Button
                  onClick={handleReset}
                  className="bg-amber-100 text-amber-700 hover:bg-amber-200 px-6"
                >
                  Reset Filter
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>
    </main>
  );
}
