# Flowchart Sistem Rumio.id (Full Hostinger)

Dokumen ini memvisualisasikan alur sistem secara keseluruhan dengan asumsi aplikasi di-_deploy_ **100% pada ekosistem Hostinger** (Aplikasi Next.js berjalan di Node.js Server/VPS Hostinger, dan Database menggunakan MySQL Hostinger).

## 1. Arsitektur Infrastruktur (Hosting & Server)

Menjelaskan bagaimana setiap komponen berjalan dan saling terhubung di dalam server Hostinger yang sama.

```mermaid
graph TD
    Client[Browser Pengguna]

    subgraph Hostinger_Server [Server Hostinger]
        NextApp[Next.js App Server / API]
        DB[(MySQL Database)]
        Prisma[Prisma ORM]
    end
    Local_Storage[(Local Storage \n public/uploads)]

    Client -- 1. Request Halaman (HTTP) --> NextApp
    NextApp -- 2. Upload/Kelola Foto --> Local_Storage
    NextApp -- 3. Request Data --> Prisma
    Prisma -- 4. Eksekusi Query --> DB
    NextApp -- 5. Serve File Gambar --> Client
```

---

## 2. Alur Pengunjung (Visitor Flow)

Alur interaksi ketika calon pembeli menelusuri website, melihat properti, hingga memberikan data prospek (Lead) atau mengirim pesan WhatsApp.

```mermaid
sequenceDiagram
    participant User as Calon Pembeli
    participant Next as Next.js (Server)
    participant DB as MySQL (via Prisma)
    participant WA as WhatsApp API

    User->>Next: Buka Landing Page Properti
    Next->>DB: Ambil data properti (Judul, Harga, dll)
    DB-->>Next: Kembalikan data JSON
    Next-->>User: Tampilkan UI (Foto, Deskripsi, Tour 360)

    alt Mengisi Form Leads
        User->>Next: Submit (Nama, HP, Pesan)
        Next->>DB: INSERT data ke tabel 'leads'
        Next-->>User: Tampilkan Notifikasi "Terkirim"
    else Klik Tombol WhatsApp
        User->>Next: Klik "Hubungi via WhatsApp"
        Next->>WA: Buka link (wa.me/nomor?text=halo...)
        WA-->>User: Buka aplikasi WhatsApp di HP/PC
    end
```

---

## 3. Alur CMS Admin & Upload File

Alur bagi Admin untuk masuk ke _dashboard_, membuat daftar properti/blog baru, dan mengunggah gambar yang akan disimpan secara lokal di server Hostinger (`public/uploads`).

```mermaid
flowchart TD
    Admin([Admin])

    Admin -->|Login via /admin| Auth{NextAuth.js\nCek Kredensial}
    Auth -- Gagal --> LoginUI[Kembali ke Form Login]
    Auth -- Berhasil --> Dashboard[Masuk ke Dashboard Admin]

    Dashboard --> Action1(Manajemen Properti)
    Dashboard --> Action2(Manajemen Blog)
    Dashboard --> Action3(Lihat Tabel Leads)

    Action1 --> Form(Isi Form & Pilih Foto)
    Action2 --> Form

    Form --> UploadCheck{Ada file gambar?}

    UploadCheck -- Ya --> APIUpload[API Next.js menerima file]
    APIUpload --> UploadLocal[Simpan file gambar di\ndirektori lokal public/uploads]
    UploadLocal --> SaveDB[Prisma menyimpan path gambar\n& data teks ke MySQL]

    UploadCheck -- Tidak --> SaveDB

    SaveDB --> Success[Tampilkan Notifikasi Sukses\ndan Update Tabel]
```
