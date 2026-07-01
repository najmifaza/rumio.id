import Link from 'next/link';
import { Home, Search, MapPinOff } from 'lucide-react';

export default function NotFound() {
  return (
    <>
      <style>{`
        header, footer { display: none !important; }
        body { overflow: hidden !important; }
      `}</style>
      <div className="fixed inset-0 z-[9999] bg-[#0B1528] flex flex-col font-sans overflow-y-auto w-full h-full">
      {/* Custom Header for 404 */}
      <div className="w-full max-w-[1600px] mx-auto px-6 lg:px-12 py-8 relative z-20 flex-shrink-0">
        <Link href="/">
          <img src="/logo-footer.svg" alt="Rumio.id" className="h-10 md:h-12 w-auto" />
        </Link>
      </div>

      <div className="flex-1 flex items-center relative w-full">
        {/* Background decorations */}
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-amber-500/10 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/3 pointer-events-none"></div>
        <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-blue-500/10 rounded-full blur-[100px] translate-y-1/3 -translate-x-1/4 pointer-events-none"></div>

        <div className="max-w-[1600px] w-full mx-auto px-6 lg:px-12 py-12 lg:py-20 relative z-10">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-16 lg:gap-24">
          
          {/* Text Content */}
          <div className="w-full lg:w-1/2 flex flex-col items-start text-white">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 text-slate-300 text-sm font-medium mb-8 backdrop-blur-md">
              <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse"></span>
              Error Code: 404 Not Found
            </div>
            
            <h1 className="text-4xl md:text-5xl lg:text-[56px] font-bold leading-[1.15] mb-6">
              Maaf, halaman ini tidak tersedia <span className="text-amber-500">untuk sementara</span>
            </h1>
            
            <p className="text-slate-400 text-lg md:text-xl mb-12 max-w-xl leading-relaxed">
              Hal ini bisa terjadi karena halaman tersebut tidak ada, URL salah, atau sedang terjadi gangguan teknis sementara.
            </p>

            <div className="flex flex-wrap gap-4 w-full">
              <Link 
                href="/"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-white text-[#0B1528] hover:bg-slate-100 rounded-xl font-bold transition-all shadow-lg shadow-white/10"
              >
                <Home className="w-5 h-5" />
                Kembali ke Beranda
              </Link>
              
              <Link 
                href="/properti?type=Dijual"
                className="inline-flex items-center justify-center gap-2 px-6 py-4 bg-transparent text-white border border-white/20 hover:bg-white/5 rounded-xl font-medium transition-all"
              >
                <Search className="w-4 h-4" />
                Cari Properti Dijual
              </Link>

              <Link 
                href="/properti?type=Disewa"
                className="inline-flex items-center justify-center gap-2 px-6 py-4 bg-transparent text-white border border-white/20 hover:bg-white/5 rounded-xl font-medium transition-all"
              >
                <Search className="w-4 h-4" />
                Cari Properti Disewa
              </Link>
            </div>
          </div>

          {/* Illustration / Graphic */}
          <div className="w-full lg:w-5/12 flex justify-center lg:justify-end">
            <div className="relative w-full max-w-[450px] aspect-square flex items-center justify-center">
              
              {/* Main glowing orb */}
              <div className="absolute inset-0 bg-amber-500/20 rounded-full blur-[80px]"></div>
              
              {/* Floating House / Broken representation */}
              <div className="relative z-10 w-full h-full flex items-center justify-center">
                
                {/* Central Glassmorphism Card */}
                <div className="relative z-20 w-64 h-64 bg-white/5 border border-white/10 backdrop-blur-xl rounded-3xl flex items-center justify-center shadow-2xl transform rotate-3 hover:rotate-0 transition-transform duration-500">
                  <MapPinOff className="w-28 h-28 text-white/90 drop-shadow-lg" strokeWidth={1.5} />
                </div>
                
                {/* Floating particles */}
                <div className="absolute top-10 right-10 w-24 h-24 bg-gradient-to-br from-amber-400 to-amber-600 rounded-2xl rotate-12 blur-[1px] opacity-90 animate-bounce shadow-xl flex items-center justify-center" style={{ animationDuration: '3.5s' }}>
                  <span className="text-white/90 font-extrabold text-4xl transform -rotate-12">4</span>
                </div>
                
                <div className="absolute bottom-12 left-8 w-20 h-20 bg-gradient-to-br from-blue-400 to-blue-600 rounded-full blur-[1px] opacity-90 shadow-xl flex items-center justify-center animate-bounce" style={{ animationDuration: '4s', animationDelay: '0.5s' }}>
                  <span className="text-white/90 font-extrabold text-3xl">0</span>
                </div>
                
                <div className="absolute -bottom-4 right-20 w-16 h-16 bg-gradient-to-br from-slate-400 to-slate-600 rounded-xl -rotate-12 blur-[1px] opacity-90 shadow-xl flex items-center justify-center animate-bounce" style={{ animationDuration: '3s', animationDelay: '1s' }}>
                  <span className="text-white/90 font-extrabold text-2xl transform rotate-12">4</span>
                </div>

                {/* Small floating dots */}
                <div className="absolute top-20 left-12 w-6 h-6 bg-white/30 rounded-full blur-[1px] animate-ping" style={{ animationDuration: '3s' }}></div>
                <div className="absolute bottom-32 right-4 w-4 h-4 bg-amber-300/40 rounded-full blur-[1px] animate-ping" style={{ animationDuration: '2s' }}></div>

              </div>

            </div>
          </div>

        </div>
      </div>
    </div>
  </div>
  </>
  );
}
