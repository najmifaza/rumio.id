# RUMIO.ID - Development Plan

Dokumen ini berisi rencana pengembangan untuk **Rumio.id** menggunakan arsitektur **Next.js (Fullstack - App Router)** dan **MySQL (Hostinger)** sebagai Database utama dengan bantuan **Prisma ORM**.

## 🛠 Tech Stack

- **Frontend & API Routes:** Next.js (App Router)
- **Database:** MySQL / MariaDB (Hostinger)
- **ORM:** Prisma ORM
- **Authentication:** NextAuth.js (Auth.js)
- **Styling:** CSS Modules / Vanilla CSS (sesuai standar desain modern & premium)
- **Deployment:** Hostinger (Fullstack Node.js / VPS)

---

## 🔗 Referensi & Inspirasi

- **Referensi Penerapan 360:** [360property.lk](https://360property.lk/property-details/land-for-sale-near-piliyandala-86) (Sebagai acuan utama dalam penerapan fitur interaktif Virtual Tour 360 pada halaman detail properti).
- **Referensi UI & Kelengkapan Fitur:** [Lamudi.co.id](https://www.lamudi.co.id/), [Rumah123.com](https://www.rumah123.com/) dan [ERA Indonesia](https://eraindonesia.com/) (Sebagai patokan standar industri untuk komponen UI pencarian, filter, dan estetika korporat platform properti).

### Referensi Desain per Halaman

| Halaman                       | URL Referensi                                                                                                                  | Keterangan                                                     |
| ----------------------------- | ------------------------------------------------------------------------------------------------------------------------------ | -------------------------------------------------------------- |
| **Homepage**                  | [vistahaven.framer.website](https://vistahaven.framer.website/)                                                                | Referensi desain hero, layout, dan estetika halaman utama.     |
| **Listing / Search Properti** | [homplus.framer.website/search](https://homplus.framer.website/search)                                                         | Referensi tampilan daftar properti, filter, dan card layout.   |
| **Detail Properti**           | [homplus.framer.website/property-details/smart-glass-house](https://homplus.framer.website/property-details/smart-glass-house) | Referensi struktur dan komponen halaman landing page properti. |

---

## 📦 Layanan Eksternal & Library Utama

### Layanan Eksternal & Infrastruktur

- **Hostinger:** Penyedia infrastruktur tunggal (Hosting Database MySQL, _Server_ Next.js, dan Penyimpanan File Lokal untuk aset gambar/media).
- **WhatsApp (API link):** _wa.me_ link dinamis untuk menghubungkan pengguna dengan fitur tanya/booking secara langsung.
- **Google Maps (Embed/API):** Untuk menampilkan lokasi titik properti di halaman landing page.
- **Google Analytics & Meta Pixel:** Untuk melacak metrik pengunjung dan efektivitas pemasaran.
- **Cloudflare (Opsional):** Manajemen DNS dan proteksi keamanan jaringan/DDoS.

### Library Utama (Dependencies)

- **`next`**: Framework utama (React).
- **`prisma` & `@prisma/client`**: ORM untuk berinteraksi dengan database MySQL secara _type-safe_.
- **`next-auth`**: Library standar untuk menangani autentikasi dan _session_ (Admin Login).
- **`@photo-sphere-viewer/core`**: Library utama yang direkomendasikan untuk me-render gambar panorama (_equirectangular_) menjadi Virtual Tour 360° yang interaktif. Akan menggunakan `virtual-tour-plugin` untuk navigasi antar ruangan. (Sistem berjalan 100% _self-hosted_).
- **`react-markdown`** atau **`next-mdx-remote`**: Untuk merender konten artikel blog dari format Markdown ke HTML di frontend.
- **`qrcode.react`**: Untuk men-_generate_ QR code URL properti secara otomatis di sisi klien.
- **`lucide-react`** atau **`react-icons`**: Kumpulan ikon SVG modern untuk kebutuhan UI.
- **Markdown Editor (CMS):** Menggunakan library `easymde` (via `react-simplemde-editor`) khusus untuk kemudahan menulis dan memformat artikel Markdown di Dashboard Admin.

---

## 🚀 Fase Pengembangan

### Phase 1: Setup & Konfigurasi Awal

1. **Inisialisasi Proyek:** Setup Next.js menggunakan `create-next-app`.
2. **Setup Database Lokal:**
   - Menjalankan MySQL lokal (XAMPP/Laragon).
   - Inisialisasi Prisma (`npx prisma init`).
3. **Instalasi Dependensi:** Install `prisma`, `@prisma/client`, dan `next-auth`.
4. **Environment Variables:** Mengatur `.env.local` untuk kredensial `DATABASE_URL` (MySQL) dan konfigurasi `NEXTAUTH_SECRET`.

### Phase 2: Desain Database (Prisma Schema)

Membuat definisi tabel di dalam file `schema.prisma` dan melakukan migrasi ke MySQL.

- **Model `User` (Admin & Owner):**
  - Kolom: `id`, `name`, `email`, `password`, `role` (Enum: ADMIN, OWNER), `created_at`.
- **Model `Property`:**
  - Kolom: `id`, `owner_id` (Relasi ke User), `title`, `slug`, `price`, `location`, `property_type`, `listing_type`, `condition`, `bedrooms`, `bathrooms`, `floors`, `land_area`, `building_area`, `electricity`, `water_supply`, `facing`, `build_year`, `certificate`, `description`, `view_count` (Default: 0), `virtual_tour_data`, `video_url`, `featured_image`, `created_at`.
- **Model `PropertyImage` (Galeri):**
  - Kolom: `id`, `property_id` (Relasi ke Property), `image_url`, `created_at`.
- **Model `Setting` (Konfigurasi Global):**
  - Kolom: `id`, `key` (misal: `whatsapp_number`, `dynamic_pricing`), `value`, `updated_at`.
- **Model `Blog`:**
  - Kolom: `id`, `title`, `slug`, `content`, `author`, `featured_image`, `view_count` (Default: 0), `created_at`.
- **Storage:** Menggunakan sistem direktori lokal (`public/uploads`) pada server Hostinger untuk menyimpan _upload_ file foto dari Admin.
  - _Catatan Development:_ Saat pengujian lokal (`localhost`), gambar akan tersimpan langsung di folder `public/uploads` pada laptop/komputer developer. Saat di-deploy ke Hostinger, gambar akan tersimpan di dalam _storage_ server Hostinger. Database MySQL hanya akan menyimpan path gambar (contoh: `/uploads/properti-1.jpg`).

### Phase 3: Pengembangan UI/UX (Frontend)

Membangun antarmuka yang _Modern, Premium, dan Clean_ dengan warna utama Merah (`#E53935`) dan Biru (`#1565C0`).

1. **Sistem Desain:** Setup Global CSS, tipografi (Poppins/Montserrat), dan komponen reusable (Button, Card Properti, Input Form).
2. **Halaman Publik:**
   - **Homepage:** Hero banner, bagian tentang layanan, dan daftar properti pilihan.
   - **Layanan / Portfolio / Blog / Contact:** Halaman informatif perusahaan.
3. **Halaman Properti (Dynamic Route `property/[slug]`):**
   - Layout landing page khusus per properti.
   - Integrasi renderer Virtual Tour 360° (Self-Hosted).
   - Floating Button WhatsApp.
   - Tombol Booking / Hubungi Kami (Direct to WhatsApp).
4. **Halaman Blog:**
   - **List Blog (`/blog`):** Menampilkan daftar artikel edukasi/promosi.
   - **Detail Blog (`/blog/[slug]`):** Menampilkan konten artikel penuh.

### Phase 4: Integrasi Backend & Fitur Utama

1. **Data Fetching:** Menarik data dari tabel `properties` dan `blogs` untuk ditampilkan di antarmuka publik.
2. **QR Code & Banner Template:** Membuat generator QR Code yang langsung di-embed ke dalam template banner siap cetak per properti.
3. **Fungsi WhatsApp Dinamis:** _Action Link_ yang diarahkan ke **satu nomor WA utama** (diambil dari tabel `Setting`), dengan format pesan otomatis yang dinamis menyesuaikan nama properti.
4. **Page View Tracking:** Logika untuk menambahkan `view_count` (+1) pada tabel `Property` dan tabel `Blog` setiap kali halaman detail terkait dikunjungi oleh publik.

### Phase 5: Dashboard (Admin & Owner)

1. **Autentikasi & Otorisasi:** Implementasi **NextAuth.js** dengan Role-Based Access Control (Admin & Owner).
2. **Dashboard Owner:** Antarmuka bagi pemilik properti untuk melihat **Statistik Kunjungan** (`view_count`) dari halaman properti mereka.
3. **Manajemen Properti & Pengaturan:**
   - CRUD properti beserta upload foto.
   - **Dynamic Pricing:** Pengaturan harga layanan/paket oleh Admin yang dapat berubah secara dinamis.
   - Pengaturan nomor WhatsApp utama platform.
4. **Virtual Tour Builder (Interaktif):**
   - Antarmuka khusus bagi Admin untuk membangun tur 360 tanpa _coding_.
   - Menggunakan _Click Listener_ dari `@photo-sphere-viewer/core`.
5. **Manajemen Blog:** Editor artikel untuk Admin.
6. **QR & Banner Builder:** Fitur untuk mengunduh QR Code dan template banner promosi dari dashboard.

### Phase 6: Optimasi, SEO & Deployment

1. **SEO:** Implementasi Metadata API Next.js (Title, Description, Open Graph) agar setiap URL properti dan artikel blog optimal ketika dibagikan (Share link).
2. **Tracking:** Memasang script Google Analytics dan Meta Pixel.
3. **Testing:** Uji coba end-to-end fitur QR Code, rendering Virtual Tour, dan integrasi WhatsApp.
4. **Deploy:** Mengunggah kode ke GitHub dan melakukan _deployment_ penuh ke server **Hostinger** (memanfaatkan fitur Node.js App atau VPS).

---

## 🎯 Target Versi 1.0 (MVP)

Fokus pengerjaan untuk tahap awal akan dibatasi pada:

1. Landing Page Properti dinamis.
2. Rendering Virtual Tour 360 (Self-Hosted).
3. Generator QR Code.
4. Tombol WhatsApp Dinamis.
5. Fitur Blog & Artikel.
6. CMS Admin Sederhana (Manajemen Properti & Blog).

_(Fitur seperti integrasi pembayaran atau multi-agen dapat ditambahkan pada versi selanjutnya)._
