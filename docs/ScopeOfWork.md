# SCOPE OF WORK — RUMIO.ID

---

## 1. RINGKASAN PROYEK

| Atribut                  | Detail                                    |
| ------------------------ | ----------------------------------------- |
| **Nama Proyek**          | RUMIO.ID                                  |
| **Tipe Platform**        | Platform Visualisasi & Pemasaran Properti |
| **Tanggal Kontrak**      | 22 Juni 2026                              |
| **Durasi Pengerjaan**    | 30 hari kalender                          |
| **Garansi (Bug Fixing)** | 3 bulan setelah website _live_            |
| **Tech Stack Utama**     | Next.js (App Router) + MySQL + Prisma ORM |
| **Deployment**           | Hostinger (Node.js App)                   |

---

## 2. TUJUAN & DESKRIPSI PRODUK

**RUMIO.ID** adalah platform pemasaran properti berbasis web yang memungkinkan pemilik properti, agen, dan developer untuk menampilkan properti secara profesional. Platform ini **bukan** marketplace jual-beli, melainkan alat visualisasi dan pemasaran yang mengintegrasikan:

- **Virtual Tour 360°** interaktif yang di-_host_ secara mandiri (_self-hosted_).
- **Landing Page Properti** individual dengan URL unik per properti.
- **QR Code** otomatis untuk keperluan brosur, banner, dan kartu nama.
- **Integrasi WhatsApp** dinamis untuk konversi prospek secara instan.
- **Blog & Artikel** edukasi seputar properti, tips jual-beli, dan tren pasar.
- **CMS (Dashboard Admin)** untuk manajemen konten oleh admin tanpa keahlian teknis.

### Target Pengguna

- Developer Perumahan & Kontraktor
- Agen Properti & Marketing _In-House_
- Pemilik Rumah yang ingin menjual/menyewakan
- Investor Properti
- Pengelola Hotel, Villa, dan Penginapan

---

## 3. RUANG LINGKUP PEKERJAAN (IN-SCOPE)

Berikut adalah seluruh fitur dan halaman yang **termasuk** dalam kontrak pengerjaan ini.

### 3.1 Halaman Publik (Frontend)

| #   | Halaman / Komponen             | Deskripsi                                                                                                                                                                                                                                             |
| --- | ------------------------------ | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 1   | **Homepage**                   | Hero banner, penjelasan layanan (Virtual Tour 360, Landing Page, QR Banner, dll.), dan daftar properti unggulan (_featured_).                                                                                                                         |
| 2   | **Halaman Tentang Kami**       | Narasi perusahaan dan nilai-nilai Rumio.                                                                                                                                                                                                              |
| 3   | **Halaman Blog (List)**        | Daftar artikel kategori tips properti, marketing, dan interior.                                                                                                                                                                                       |
| 4   | **Halaman Detail Blog**        | Konten artikel penuh yang dirender dari format Markdown.                                                                                                                                                                                              |
| 5   | **Halaman Contact**            | Form kontak, link WhatsApp, dan embed Google Maps.                                                                                                                                                                                                    |
| 6   | **Daftarkan Properti**         | Halaman publik bagi pemilik/agen untuk mengajukan pendaftaran properti baru ke platform Rumio.                                                                                                                                                        |
| 7   | **Carikan Properti (Request)** | Halaman publik bagi calon pembeli/penyewa untuk mengirimkan permintaan kriteria properti yang dicari.                                                                                                                                                 |
| 8   | **Rumio Property Scout**       | Halaman rekrutmen mitra resmi Rumio. Mengajak masyarakat umum bergabung sebagai Property Scout (pencari properti freelance) dengan fleksibilitas waktu, tanpa modal, dan potensi penghasilan tambahan. Berisi CTA pendaftaran dan penjelasan program. |

### 3.2 Landing Page Properti (Dynamic Route)

Setiap properti memiliki halaman mandiri dengan URL unik:  
`rumio.id/property/[slug]`

Komponen yang wajib ada pada setiap landing page properti:

- [ ] Foto utama (_featured image_) + galeri foto
- [ ] Judul, Harga, dan Lokasi properti
- [ ] Deskripsi dan Spesifikasi lengkap
- [ ] **Embed Virtual Tour 360°** (self-hosted, fullscreen, mobile-friendly)
- [ ] Embed Google Maps (berdasarkan lokasi)
- [ ] **Form Lead** (Nama, No. HP, Email, Catatan)
- [ ] **Floating Button WhatsApp** dengan format pesan otomatis
- [ ] **Generator QR Code** otomatis (berdasarkan URL properti)

### 3.3 Fitur Inti (Core Features)

#### a. Virtual Tour 360° (Self-Hosted)

- Render foto panorama _equirectangular_ menggunakan library `@photo-sphere-viewer/core`.
- Navigasi antar ruangan menggunakan `virtual-tour-plugin` dengan hotspot klik.
- Dukungan mode _fullscreen_, rotasi otomatis (_auto-rotate_), dan kontrol sentuh/giroskop (_mobile-friendly_).
- Seluruh data & aset disimpan di server sendiri (tanpa _iframe_ pihak ketiga).

#### b. QR Code Generator

- Setiap properti secara otomatis memiliki QR Code yang dihasilkan di sisi klien menggunakan `qrcode.react`.
- QR Code dapat diunduh oleh Admin untuk kebutuhan cetak (brosur, banner, kartu nama).

#### c. Integrasi WhatsApp Dinamis

- Floating button WhatsApp selalu tampil di setiap halaman properti.
- Membuka WhatsApp dengan format pesan pre-fill otomatis:
  > _"Halo, saya tertarik dengan properti: [Nama Properti]"_

#### d. Form Lead & Notifikasi

- Form kontak tertanam di halaman properti.
- Data tersimpan ke tabel `leads` di database MySQL melalui API Route Next.js + Prisma.
- Data leads dapat dikelola melalui Dashboard Admin.

### 3.4 Dashboard Admin (CMS)

Akses melalui route yang dilindungi: `/admin`

| Modul                    | Fitur                                                                                                           |
| ------------------------ | --------------------------------------------------------------------------------------------------------------- |
| **Autentikasi**          | Login aman menggunakan NextAuth.js (Credential Provider).                                                       |
| **Manajemen Properti**   | CRUD (Tambah, Edit, Hapus) data properti; upload foto (disimpan di server Hostinger, dikonversi ke WebP).       |
| **Virtual Tour Builder** | Antarmuka visual untuk Admin membangun tur 360°.                                                                |
| **Manajemen Leads**      | Tabel data prospek/calon pembeli dari form, lengkap dengan filter dan status.                                   |
| **Manajemen Blog**       | Editor _rich-text_ (menggunakan `react-quill` / `tiptap`) untuk menulis, mengedit, dan mempublikasikan artikel. |
| **Generator QR Code**    | Tampilkan dan unduh QR Code untuk setiap properti dari dalam dashboard.                                         |

### 3.5 Integrasi Layanan Eksternal

| Layanan                 | Fungsi                                                                           |
| ----------------------- | -------------------------------------------------------------------------------- |
| **Hostinger**           | Infrastruktur utama: MySQL database, Node.js server, dan penyimpanan file/media. |
| **WhatsApp (wa.me)**    | Link dinamis untuk konversi prospek.                                             |
| **Google Maps (Embed)** | Menampilkan lokasi titik properti.                                               |
| **Google Analytics**    | Melacak metrik dan perilaku pengunjung.                                          |
|                         |

---

## 5. TECH STACK & ARSITEKTUR

### Stack Teknologi

| Layer             | Teknologi                                           |
| ----------------- | --------------------------------------------------- |
| **Framework**     | Next.js (App Router)                                |
| **Database**      | MySQL / MariaDB (Hostinger)                         |
| **ORM**           | Prisma ORM                                          |
| **Autentikasi**   | NextAuth.js (Auth.js)                               |
| **Styling**       | CSS Modules / Vanilla CSS                           |
| **Virtual Tour**  | `@photo-sphere-viewer/core` + `virtual-tour-plugin` |
| **QR Code**       | `qrcode.react`                                      |
| **Form Handling** | `react-hook-form` + `zod`                           |
| **Blog Editor**   | `react-quill` / `tiptap`                            |
| **Ikon**          | `lucide-react` / `react-icons`                      |
| **Deployment**    | Hostinger (Node.js App)                             |

### Desain Visual

| Atribut            | Nilai                            |
| ------------------ | -------------------------------- |
| **Style**          | Modern, Premium, Clean           |
| **Warna Primer**   | Merah `#E53935`                  |
| **Warna Sekunder** | Biru `#1565C0`                   |
| **Background**     | Putih & Abu Muda                 |
| **Tipografi**      | Poppins / Montserrat             |
| **Acuan UI**       | Airbnb, Matterport, Lamudi.co.id, VistaHaven, HOMPlus |

### Referensi Desain per Halaman

| Halaman | URL Referensi | Keterangan |
| --- | --- | --- |
| **Homepage** | [vistahaven.framer.website](https://vistahaven.framer.website/) | Referensi desain hero, layout, dan estetika halaman utama. |
| **Listing / Search Properti** | [homplus.framer.website/search](https://homplus.framer.website/search) | Referensi tampilan daftar properti, filter, dan card layout. |
| **Detail Properti** | [homplus.framer.website/property-details/smart-glass-house](https://homplus.framer.website/property-details/smart-glass-house) | Referensi struktur dan komponen halaman landing page properti. |

### Schema Database (Ringkasan)

```
User       → id, name, email, password, created_at
Property   → id, title, slug, price, location, description,
             virtual_tour_url, whatsapp_number, featured_image, created_at
Lead       → id, property_id, nama, hp, email, pesan, created_at
Blog       → id, title, slug, content, author, featured_image, created_at
```

---

## 6. FASE PENGEMBANGAN & MILESTONE

| Fase        | Deskripsi                                                                  | Target     |
| ----------- | -------------------------------------------------------------------------- | ---------- |
| **Phase 1** | Setup & Konfigurasi Awal (Next.js, Prisma, `.env`, DB lokal)               | Hari 1–3   |
| **Phase 2** | Desain Database & Migrasi Prisma Schema                                    | Hari 3–5   |
| **Phase 3** | Pengembangan UI/UX Frontend (Sistem Desain, Halaman Publik)                | Hari 5–14  |
| **Phase 4** | Integrasi Backend & Fitur Utama (API Routes, Form Lead, QR Code, WhatsApp) | Hari 14–20 |
| **Phase 5** | Dashboard Admin / CMS (Auth, CRUD Properti, Virtual Tour Builder, Blog)    | Hari 20–27 |
| **Phase 6** | Optimasi, SEO, Testing, & Deployment ke Hostinger                          | Hari 27–30 |

---

## 7. DELIVERABLES (OUTPUT YANG DISERAHKAN)

Setelah proyek selesai, PIHAK KEDUA akan menyerahkan:

1. ✅ **Source Code** lengkap proyek Next.js (via GitHub repository).
2. ✅ **Database Schema** (file migrasi Prisma).
3. ✅ **Website Live** yang sudah ter-_deploy_ di server Hostinger PIHAK PERTAMA.
4. ✅ **Akun Admin** Dashboard CMS yang sudah aktif dan siap digunakan.
5. ✅ **Dokumentasi singkat** cara penggunaan Dashboard Admin (cara tambah properti, upload foto, akses leads, dll.).

---

## 8. KETENTUAN REVISI

- **Revisi Minor** (perubahan warna, teks, penyesuaian posisi UI): Maksimal **3 (tiga) kali** setelah proyek dinyatakan selesai, tanpa biaya tambahan.
- **Revisi Mayor** (perubahan struktur database, penambahan fitur baru di luar Pasal 1 kontrak): Dikenakan biaya tambahan yang disepakati terpisah.
- **Garansi Bug Fixing**: Selama **3 (tiga) bulan** sejak website _live_. Tidak berlaku jika kerusakan disebabkan oleh modifikasi _source code_ sepihak oleh PIHAK PERTAMA.

---

## 9. KEWAJIBAN KLIEN (PIHAK PERTAMA)

Untuk memastikan proyek berjalan sesuai jadwal, PIHAK PERTAMA wajib menyediakan:

- [ ] Logo resmi perusahaan (format SVG / PNG transparan).
- [ ] Teks profil perusahaan (Tentang Kami, Layanan).
- [ ] Foto properti contoh untuk keperluan testing dan pengembangan.
- [ ] Nomor WhatsApp yang akan digunakan sebagai kontak utama.
- [ ] Akun Hostinger (akses cPanel / FTP) untuk keperluan _deployment_.
- [ ] Konfirmasi pembayaran Termin I sebelum pekerjaan resmi dimulai.

---
