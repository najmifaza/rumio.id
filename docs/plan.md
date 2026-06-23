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

| Halaman | URL Referensi | Keterangan |
| --- | --- | --- |
| **Homepage** | [vistahaven.framer.website](https://vistahaven.framer.website/) | Referensi desain hero, layout, dan estetika halaman utama. |
| **Listing / Search Properti** | [homplus.framer.website/search](https://homplus.framer.website/search) | Referensi tampilan daftar properti, filter, dan card layout. |
| **Detail Properti** | [homplus.framer.website/property-details/smart-glass-house](https://homplus.framer.website/property-details/smart-glass-house) | Referensi struktur dan komponen halaman landing page properti. |

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
- **`react-hook-form` & `zod`**: (Disarankan) Untuk menangani validasi dan pengiriman _Form Lead_ secara efisien tanpa _re-render_ berlebih.
- **`lucide-react`** atau **`react-icons`**: Kumpulan ikon SVG modern untuk kebutuhan UI.
- **Rich Text / Markdown Editor (CMS):** Library seperti `react-quill`, `@uiw/react-md-editor`, atau `tiptap` untuk menulis/mengedit artikel di Dashboard Admin.

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

- **Model `User` (Admin):**
  - Kolom: `id`, `name`, `email`, `password`, `created_at`.
- **Model `Property`:**
  - Kolom: `id`, `title`, `slug`, `price`, `location`, `description`, `virtual_tour_url`, `whatsapp_number`, `featured_image`, `created_at`.
- **Model `Lead`:**
  - Kolom: `id`, `property_id`, `nama`, `hp`, `email`, `pesan`, `created_at`.
- **Model `Blog`:**
  - Kolom: `id`, `title`, `slug`, `content`, `author`, `featured_image`, `created_at`.
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
   - Integrasi iframe Virtual Tour 360.
   - Floating Button WhatsApp.
   - Form Lead properti.
4. **Halaman Blog:**
   - **List Blog (`/blog`):** Menampilkan daftar artikel edukasi/promosi.
   - **Detail Blog (`/blog/[slug]`):** Menampilkan konten artikel penuh.

### Phase 4: Integrasi Backend & Fitur Utama

1. **Data Fetching:** Menarik data dari tabel `properties` dan `blogs` untuk ditampilkan di antarmuka publik.
2. **Submit Form Lead:** Menyimpan data leads dari calon pembeli langsung ke tabel MySQL melalui Prisma.
3. **QR Code Generator:** Membuat komponen yang meng-generate QR Code secara otomatis berdasarkan URL `rumio.id/property/[slug]`.
4. **Fungsi WhatsApp:** Membuat _Action Link_ dinamis yang membuka WhatsApp dengan format pesan otomatis yang berisi nama properti.

### Phase 5: Dashboard Admin (CMS)

1. **Autentikasi:** Implementasi **NextAuth.js** (Credential Provider) untuk mengamankan route `/admin`.
2. **Manajemen Properti (CRUD):**
   - Form untuk menambah dan mengedit data properti.
   - Fitur upload foto di mana gambar akan diunggah dan disimpan di server lokal (`public/uploads`), dilengkapi konversi ke format ringan (WebP) di sisi klien.
   - Menampilkan daftar properti yang bisa dihapus/diubah.
3. **Virtual Tour Builder (Interaktif):**
   - Antarmuka khusus bagi Admin untuk membangun tur 360 tanpa _coding_.
   - Menggunakan _Click Listener_ dari `@photo-sphere-viewer/core` di mana Admin dapat mengklik area foto panorama, secara otomatis mendapatkan koordinat (_Pitch_ & _Yaw_), lalu menyambungkannya dengan ruangan lain melalui _Pop-up Modal_.
4. **Manajemen Leads:** Halaman tabel khusus untuk melihat data prospek/calon pembeli yang masuk dari form.
5. **Manajemen Blog:** Editor artikel untuk menulis, mengedit, dan mempublikasikan postingan blog.

### Phase 6: Optimasi, SEO & Deployment

1. **SEO:** Implementasi Metadata API Next.js (Title, Description, Open Graph) agar setiap URL properti dan artikel blog optimal ketika dibagikan (Share link).
2. **Tracking:** Memasang script Google Analytics dan Meta Pixel.
3. **Testing:** Uji coba end-to-end fitur QR Code, Virtual Tour Embed, dan submit form.
4. **Deploy:** Mengunggah kode ke GitHub dan melakukan _deployment_ penuh ke server **Hostinger** (memanfaatkan fitur Node.js App atau VPS).

---

## 🎯 Target Versi 1.0 (MVP)

Fokus pengerjaan untuk tahap awal akan dibatasi pada:

1. Landing Page Properti dinamis.
2. Embed Virtual Tour.
3. Generator QR Code.
4. Tombol WhatsApp dan Form Leads.
5. Fitur Blog & Artikel.
6. CMS Admin Sederhana (Manajemen Properti, Leads, & Blog).

_(Fitur seperti integrasi pembayaran atau multi-agen dapat ditambahkan pada versi selanjutnya)._
