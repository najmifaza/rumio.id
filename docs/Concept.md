# RUMIO.ID
**Platform Virtual Tour & Listing Properti**

## KONSEP UMUM
Rumio adalah platform yang membantu pemilik properti, agen properti, developer, dan konsultan pemasaran untuk menampilkan properti secara lebih profesional melalui Virtual Tour 360°, landing page properti, dan QR Code pemasaran.

Rumio bukan marketplace seperti Rumah123 atau OLX, melainkan platform visualisasi dan pemasaran properti berbasis Virtual Tour.

## TARGET PENGGUNA
1. Developer Perumahan
2. Agen Properti
3. Marketing In House Developer
4. Pemilik Rumah
5. Investor Properti
6. Hotel, Villa, dan Penginapan

## FITUR UTAMA

### 1. Landing Page Properti
Setiap properti memiliki halaman khusus dengan URL unik.

**Contoh:** `rumio.id/property/rumah-modern-purwokerto`

**Konten:**
- Foto utama
- Judul properti
- Harga
- Lokasi
- Deskripsi
- Spesifikasi
- Fitur properti
- Virtual Tour
- Video
- Peta lokasi
- Tombol WhatsApp

---

### 2. Virtual Tour 360
Self-Hosted Virtual Tour (Tanpa Layanan Eksternal). Render foto panorama 360° (*equirectangular*) secara mandiri langsung di web menggunakan library internal (misalnya `pannellum` atau `photo-sphere-viewer`).

**Fitur:**
- 100% Data milik sendiri (Tanpa *iframe* pihak ketiga)
- Tampilan menyatu dengan *website*
- Fullscreen
- Mobile Friendly (Mendukung sentuhan & *gyroscope*)
- Hotspot navigasi
- Auto rotate
- Share link

---

### 3. QR Code Properti
Setiap listing otomatis memiliki QR Code.

**QR digunakan pada:**
- Banner depan rumah
- Brosur
- Flyer
- Kartu nama marketing

Ketika discan: langsung menuju landing page properti.

---

### 4. Tombol WhatsApp
Tombol WhatsApp selalu terlihat (floating button).

**Fungsi:**
- Tanya properti
- Booking survey
- Hubungi marketing

**Format pesan otomatis:**
> Halo, saya tertarik dengan properti:  
> [Nama Properti]

---

### 5. Form Lead
Calon pembeli dapat mengisi:
- Nama
- Nomor HP
- Email
- Catatan

Data masuk ke dashboard admin.

---

### 6. Dashboard Admin
Admin dapat:
- Tambah properti
- Edit properti
- Hapus properti
- Upload foto
- Upload video
- Generate QR Code
- Lihat data lead

## HALAMAN WEBSITE

### 1. Homepage
**Section:** Hero Banner

**Judul:**
Visualisasikan Properti Anda Secara Profesional

**Subjudul:**
Virtual Tour 360, Landing Page Properti, dan QR Code Marketing.

**Tombol:**
- Lihat Demo
- Hubungi Kami

---

### 2. Tentang Kami
Menjelaskan Rumio sebagai solusi pemasaran properti modern.

---

### 3. Layanan
- Virtual Tour 360
- Landing Page Properti
- QR Banner Properti
- Dokumentasi Properti
- Digital Marketing Properti

---

### 4. Portfolio
Daftar project yang pernah dikerjakan.

**Filter:**
- Rumah
- Villa
- Hotel
- Apartemen
- Komersial

---

### 5. Pricing
- Paket Starter
- Paket Professional
- Paket Enterprise

---

### 6. Blog
**Artikel:**
- Tips Jual Rumah
- Marketing Properti
- Virtual Tour
- Interior Design

---

### 7. Contact
- Form kontak
- WhatsApp
- Google Maps

## DESAIN VISUAL

- **Style:** Modern, Premium, Clean
- **Warna utama:** Merah (`#E53935`)
- **Warna sekunder:** Biru (`#1565C0`)
- **Background:** Putih dan Abu Muda
- **Font:** Poppins / Montserrat
- **Gaya visual:** Minimalis seperti Airbnb dan Matterport.

## STRUKTUR DATABASE SEDERHANA

### Property
- `id`
- `title`
- `slug`
- `price`
- `location`
- `description`
- `virtual_tour_url`
- `whatsapp_number`
- `featured_image`

### Lead
- `id`
- `property_id`
- `nama`
- `hp`
- `email`
- `pesan`
- `created_at`

## INTEGRASI
- WhatsApp
- Google Maps
- Google Analytics
- Meta Pixel
- Cloudflare
- OneDrive (opsional untuk penyimpanan file)

## TARGET VERSI 1.0
**Fokus pada:**
- Landing Page Properti
- Virtual Tour
- QR Code
- WhatsApp

*Marketplace dan fitur agen dapat dikembangkan pada versi berikutnya.*
