"use client";

import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import PropertyCard from "@/components/ui/property-card";
import { Filter, X, Search, ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import Breadcrumbs from "@/components/ui/breadcrumbs";
import { Property } from "@prisma/client";

interface PropertiesClientProps {
  initialProperties: Property[];
  totalProperties: number;
  totalPages: number;
  currentPage: number;
}

export default function PropertiesClient({
  initialProperties,
  totalProperties,
  totalPages,
  currentPage,
}: PropertiesClientProps) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [transactionType, setTransactionType] = useState<string[]>(searchParams.get("transaction") ? searchParams.get("transaction")!.split(",") : []);
  const [propertyType, setPropertyType] = useState<string[]>(searchParams.get("type") ? searchParams.get("type")!.split(",") : []);
  const [minPrice, setMinPrice] = useState<string>(searchParams.get("minPrice") || "");
  const [maxPrice, setMaxPrice] = useState<string>(searchParams.get("maxPrice") || "");
  const [minBuildingArea, setMinBuildingArea] = useState<string>(searchParams.get("minArea") || "");
  const [maxBuildingArea, setMaxBuildingArea] = useState<string>(searchParams.get("maxArea") || "");
  const [minLandArea, setMinLandArea] = useState<string>(searchParams.get("minLand") || "");
  const [maxLandArea, setMaxLandArea] = useState<string>(searchParams.get("maxLand") || "");
  const [bedrooms, setBedrooms] = useState<number | null>(searchParams.get("beds") ? parseInt(searchParams.get("beds")!) : null);
  const [searchQuery, setSearchQuery] = useState<string>(searchParams.get("q") || "");

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

  const handleApplyFilter = () => {
    const params = new URLSearchParams();
    if (searchQuery) params.set("q", searchQuery);
    if (transactionType.length > 0) params.set("transaction", transactionType.join(","));
    if (propertyType.length > 0) params.set("type", propertyType.join(","));
    if (minPrice) params.set("minPrice", minPrice);
    if (maxPrice) params.set("maxPrice", maxPrice);
    if (minBuildingArea) params.set("minArea", minBuildingArea);
    if (maxBuildingArea) params.set("maxArea", maxBuildingArea);
    if (minLandArea) params.set("minLand", minLandArea);
    if (maxLandArea) params.set("maxLand", maxLandArea);
    if (bedrooms) params.set("beds", bedrooms.toString());
    
    // reset to page 1 on filter
    params.set("page", "1");
    
    router.push(`/properti?${params.toString()}`);
    setIsFilterOpen(false);
  };

  const handleSearchSubmit = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleApplyFilter();
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
    setSearchQuery("");
    
    router.push("/properti");
    setIsFilterOpen(false);
  };

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

      {/* Actions */}
      <div className="pt-4 border-t border-slate-100 flex flex-col gap-3">
        <Button
          className="w-full bg-[#0B1528] hover:bg-[#1a2b4c] text-white h-11 rounded-lg"
          onClick={handleApplyFilter}
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
              Menampilkan {totalProperties} properti yang sesuai
              dengan kriteria Anda
            </p>
          </div>

          <div className="flex items-center gap-3 w-full lg:w-auto">
            <div className="relative flex-1 lg:w-[320px]">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <input
                type="text"
                placeholder="Cari lokasi, nama properti... (Tekan Enter)"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onKeyDown={handleSearchSubmit}
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

          {/* Main Content */}
          <div className="flex-1">
            {initialProperties.length > 0 ? (
              <>
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                  {initialProperties.map((property) => (
                    <PropertyCard
                      key={property.slug}
                      image={property.featuredImage || "/placeholder-image.jpg"}
                      title={property.title}
                      location={property.location}
                      beds={property.bedrooms}
                      baths={property.bathrooms}
                      cars={0}
                      area={property.buildingArea}
                      priceNumeric={property.price}
                      link={`/properti/${property.slug}`}
                      status={property.status}
                    />
                  ))}
                </div>

                {/* Pagination Controls */}
                {totalPages > 1 && (
                  <div className="flex items-center justify-center gap-2 mt-12">
                    <Button
                      variant="outline"
                      size="icon"
                      disabled={currentPage <= 1}
                      onClick={() => {
                        const params = new URLSearchParams(searchParams.toString());
                        params.set("page", (currentPage - 1).toString());
                        router.push(`/properti?${params.toString()}`);
                      }}
                    >
                      <ChevronLeft className="w-5 h-5" />
                    </Button>

                    <div className="flex items-center gap-2 overflow-x-auto max-w-[200px] sm:max-w-none no-scrollbar">
                      {Array.from({ length: totalPages }).map((_, i) => (
                        <button
                          key={i}
                          onClick={() => {
                            const params = new URLSearchParams(searchParams.toString());
                            params.set("page", (i + 1).toString());
                            router.push(`/properti?${params.toString()}`);
                          }}
                          className={`w-10 h-10 shrink-0 flex items-center justify-center rounded-lg border font-semibold text-sm transition-colors ${
                            currentPage === i + 1
                              ? "bg-[#0B1528] border-[#0B1528] text-white pointer-events-none"
                              : "border-slate-200 text-slate-600 hover:bg-slate-50"
                          }`}
                        >
                          {i + 1}
                        </button>
                      ))}
                    </div>

                    <Button
                      variant="outline"
                      size="icon"
                      disabled={currentPage >= totalPages}
                      onClick={() => {
                        const params = new URLSearchParams(searchParams.toString());
                        params.set("page", (currentPage + 1).toString());
                        router.push(`/properti?${params.toString()}`);
                      }}
                    >
                      <ChevronRight className="w-5 h-5" />
                    </Button>
                  </div>
                )}
              </>
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
