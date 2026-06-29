export default function KisahRumio() {
  return (
    <section className="py-24 bg-white">
      <div className="container mx-auto px-6 max-w-[1500px]">
        <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-20">
          {/* Image */}
          <div className="w-full lg:w-1/2">
            <div className="relative w-full aspect-[16/9] rounded-3xl overflow-hidden shadow-sm">
              <img
                src="/Section-HeroPropertyScout.webp" // Placeholder, user can change later
                alt="Tim Rumio"
                className="w-full h-full object-cover object-center"
              />
            </div>
          </div>

          {/* Text Content */}
          <div className="w-full lg:w-1/2 flex flex-col justify-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-8 text-[#0B1528]">
              Kisah <span className="text-amber-600">Rumio</span>
            </h2>

            <div className="space-y-6 text-slate-600 text-base md:text-lg leading-relaxed">
              <p>
                Rumio berawal dari pengalaman kami melihat banyak properti
                berkualitas sulit mendapatkan perhatian yang layak karena cara
                pemasarannya masih konvensional. Foto seadanya, informasi
                terbatas, dan proses komunikasi yang lambat membuat banyak
                peluang terlewatkan.
              </p>

              <p>
                Kami percaya, setiap properti memiliki cerita dan potensi besar.
                Melalui teknologi visual 360°, strategi digital, dan layanan
                yang berorientasi pada konversi, Rumio hadir untuk mengubah cara
                properti dipasarkan di era digital.
              </p>

              <p className="font-semibold text-[#0B1528]">
                Rumio bukan sekadar penyedia jasa, tapi partner pertumbuhan
                properti Anda.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
