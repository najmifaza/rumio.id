import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const blogs = [
  {
    title: "10 Tips Fotografi Properti untuk Meningkatkan Penjualan",
    slug: "tips-fotografi-properti",
    category: "Tips Properti",
    content: "Fotografi properti yang baik adalah kunci untuk menarik perhatian calon pembeli. Pastikan pencahayaan cukup, gunakan lensa wide, dan selalu rapikan ruangan sebelum mengambil foto. Gambar yang terang dan jernih dapat meningkatkan minat pembeli hingga 60%.",
    author: "Admin Rumio",
    featuredImage: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&q=80&w=800",
  },
  {
    title: "Memaksimalkan Penggunaan Virtual Tour 360",
    slug: "memaksimalkan-virtual-tour",
    category: "Virtual Tour",
    content: "Virtual tour 360 memberikan pengalaman interaktif bagi calon pembeli tanpa harus datang ke lokasi. Dengan teknologi ini, agen properti dapat menyaring klien yang benar-benar serius, menghemat waktu survei, dan mempercepat proses closing.",
    author: "Admin Rumio",
    featuredImage: "https://images.unsplash.com/photo-1558442074-3c19857bc1dc?auto=format&fit=crop&q=80&w=800",
  },
  {
    title: "Strategi Marketing Properti di Era Digital",
    slug: "strategi-marketing-digital",
    category: "Marketing Properti",
    content: "Di era digital saat ini, agen properti harus memanfaatkan media sosial, SEO, dan platform listing online. Buatlah konten video pendek (Reels/TikTok) yang menampilkan fitur terbaik properti Anda untuk menjangkau audiens milenial.",
    author: "Admin Rumio",
    featuredImage: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=800",
  },
  {
    title: "Panduan Memilih Properti untuk Investasi",
    slug: "panduan-investasi-properti",
    category: "Investasi",
    content: "Investasi properti tetap menjadi salah satu instrumen paling aman. Kuncinya ada pada lokasi, aksesibilitas, dan rencana pembangunan infrastruktur di sekitar kawasan tersebut. Properti di dekat stasiun KRL atau LRT memiliki tingkat apresiasi yang tinggi.",
    author: "Admin Rumio",
    featuredImage: "https://images.unsplash.com/photo-1560518883-ce09059eeffa?auto=format&fit=crop&q=80&w=800",
  },
  {
    title: "Masa Depan Teknologi dalam Real Estate",
    slug: "teknologi-real-estate",
    category: "Teknologi",
    content: "Teknologi seperti AI dan VR semakin mengubah cara kita membeli rumah. AI dapat membantu memprediksi fluktuasi harga, sementara VR memungkinkan pembeli melihat rumah impian mereka sebelum bangunannya jadi.",
    author: "Admin Rumio",
    featuredImage: "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&q=80&w=800",
  },
  {
    title: "Panduan Pemula Membeli Rumah Pertama",
    slug: "panduan-membeli-rumah-pertama",
    category: "Panduan",
    content: "Membeli rumah pertama bisa menjadi hal yang menakutkan. Pastikan Anda sudah menghitung rasio utang terhadap pendapatan, menyiapkan uang muka (DP), dan mengurus BI checking jauh-jauh hari agar proses KPR berjalan lancar.",
    author: "Admin Rumio",
    featuredImage: "https://images.unsplash.com/photo-1516156008625-3a9d045b6e26?auto=format&fit=crop&q=80&w=800",
  },
  {
    title: "Cara Menata Interior Rumah Sempit",
    slug: "tips-interior-rumah",
    category: "Tips Properti",
    content: "Menata interior rumah sempit memerlukan trik khusus. Gunakan furnitur multifungsi, pasang cermin besar untuk menciptakan ilusi ruang, dan manfaatkan cahaya alami semaksimal mungkin.",
    author: "Admin Rumio",
    featuredImage: "https://images.unsplash.com/photo-1493809842364-78817add7ffb?auto=format&fit=crop&q=80&w=800",
  },
  {
    title: "Mengapa Virtual Tour Meningkatkan Closing?",
    slug: "virtual-tour-closing",
    category: "Virtual Tour",
    content: "Pembeli sangat menyukai transparansi. Dengan Virtual Tour, mereka merasa lebih percaya karena dapat mengeksplorasi setiap sudut rumah kapan saja, yang berdampak langsung pada tingkat konversi penjualan agen.",
    author: "Admin Rumio",
    featuredImage: "https://images.unsplash.com/photo-1582268611958-ebfd161ef9cf?auto=format&fit=crop&q=80&w=800",
  },
  {
    title: "Copywriting Efektif untuk Iklan Properti",
    slug: "copywriting-iklan-properti",
    category: "Marketing Properti",
    content: "Kata-kata yang Anda gunakan dalam iklan properti sangat menentukan. Jangan hanya menjual spesifikasi seperti jumlah kamar, tapi juallah 'lifestyle' atau gaya hidup yang akan didapatkan penghuni nantinya.",
    author: "Admin Rumio",
    featuredImage: "https://images.unsplash.com/photo-1432821596592-e2c18b78144f?auto=format&fit=crop&q=80&w=800",
  },
  {
    title: "Kawasan Properti Paling Menguntungkan di 2026",
    slug: "kawasan-properti-2026",
    category: "Investasi",
    content: "Berdasarkan data terkini, kawasan hunian pinggiran kota (suburban) dengan akses tol baru atau jalur kereta cepat diprediksi akan mengalami lonjakan harga tertinggi di tahun 2026.",
    author: "Admin Rumio",
    featuredImage: "https://images.unsplash.com/photo-1479839672679-a46483c0e7c8?auto=format&fit=crop&q=80&w=800",
  }
];

async function main() {
  console.log("Seeding blogs...");
  for (const blog of blogs) {
    await prisma.blog.upsert({
      where: { slug: blog.slug },
      update: { category: blog.category, content: blog.content, title: blog.title, featuredImage: blog.featuredImage },
      create: blog,
    });
  }
  console.log("Seeding finished.");
}

main()
  .catch(e => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
