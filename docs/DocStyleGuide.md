# PANDUAN FORMAT WORD — SCOPE OF WORK RUMIO.ID

Panduan ini khusus mengatur tampilan dan format dokumen **Scope of Work (SOW) — RUMIO.ID** saat dicetak atau disimpan dalam format **Microsoft Word (.docx)**.

---

## 1. PENGATURAN HALAMAN

| Properti | Nilai |
| --- | --- |
| **Ukuran Kertas** | A4 (210 × 297 mm) |
| **Orientasi** | Portrait |
| **Margin Atas** | 2,5 cm |
| **Margin Bawah** | 2,5 cm |
| **Margin Kiri** | 3 cm *(untuk jilid/binding)* |
| **Margin Kanan** | 2,5 cm |

---

## 2. TIPOGRAFI

| Elemen | Font | Ukuran | Style |
| --- | --- | --- | --- |
| **Judul Dokumen** | Times New Roman | 16 pt | Bold, Center, Uppercase |
| **Bab / Seksi (H2)** | Times New Roman | 13 pt | Bold, Uppercase |
| **Sub-bab (H3)** | Times New Roman | 12 pt | Bold |
| **Sub-sub-bab (H4)** | Times New Roman | 12 pt | Bold Italic |
| **Body Text** | Times New Roman | 12 pt | Regular |
| **Isi Tabel** | Times New Roman | 11 pt | Regular |
| **Header Tabel** | Times New Roman | 11 pt | Bold |
| **Footer / Catatan** | Times New Roman | 10 pt | Italic |

---

## 3. SPASI & JARAK

### Spasi Baris (Line Spacing)

| Elemen | Spasi |
| --- | --- |
| **Body Text** | 1,5 |
| **Heading** | Single (1,0) |
| **Isi Tabel** | Single (1,0) |

### Spasi Antar Paragraf

| Elemen | Space Before | Space After |
| --- | --- | --- |
| **Judul Dokumen (H1)** | 0 pt | 18 pt |
| **Bab (H2)** | 18 pt | 6 pt |
| **Sub-bab (H3)** | 12 pt | 6 pt |
| **Body Text** | 0 pt | 6 pt |

### Indentasi

| Elemen | Indentasi |
| --- | --- |
| **Paragraf** | First Line: 1,25 cm |
| **Poin Daftar** | Hanging: 0,75 cm |
| **Sub-poin** | Tambah 0,75 cm dari induk |

---

## 4. STRUKTUR HEADING SOW

Sesuai struktur dokumen `ScopeOfWork.md`:

```
H1  → "SCOPE OF WORK — RUMIO.ID"
      16pt · Bold · Center · Uppercase · Times New Roman

H2  → "1. RINGKASAN PROYEK", "2. TUJUAN & DESKRIPSI PRODUK", dst.
      13pt · Bold · Uppercase · Times New Roman

H3  → "3.1 Halaman Publik", "3.2 Landing Page Properti", dst.
      12pt · Bold · Times New Roman

H4  → "a. Virtual Tour 360°", "b. QR Code Generator", dst.
      12pt · Bold Italic · Times New Roman
```

---

## 5. TABEL

| Properti | Ketentuan |
| --- | --- |
| **Border** | Solid, 0,5 pt, hitam |
| **Header Row** | Background `#D9D9D9`, Bold, Center |
| **Alignment** | Header: Center · Isi teks: Left · Isi angka: Center |
| **Padding Sel** | 0,15 cm atas-bawah · 0,25 cm kiri-kanan |
| **Lebar Kolom** | Proporsional sesuai konten |

---

## 6. DAFTAR POIN & CHECKLIST

### Daftar Bernomor
- Level 1: `1.` `2.` `3.`
- Level 2: `a.` `b.` `c.`
- Level 3: `i.` `ii.` `iii.`

### Daftar Bullet
- Level 1: `•`
- Level 2: `–`

### Checklist (untuk deliverables & kewajiban klien)
- Gunakan kotak centang Word: `☐` (belum) / `☑` (sudah)

---

## 7. HEADER & FOOTER

### Header
| Posisi | Isi |
| --- | --- |
| **Kiri** | `Scope of Work — RUMIO.ID` |
| **Kanan** | Versi dokumen (contoh: `v1.0`) |
| **Font** | Times New Roman, 10 pt, Italic |
| **Separator** | Garis bawah tipis 0,5 pt |

### Footer
| Posisi | Isi |
| --- | --- |
| **Kiri** | Tanggal (contoh: `22 Juni 2026`) |
| **Kanan** | `Halaman X dari Y` |
| **Font** | Times New Roman, 10 pt |

---

## 8. WARNA AKSEN

| Nama | Hex | Digunakan Pada |
| --- | --- | --- |
| **Merah Rumio** | `#E53935` | Judul dokumen, garis aksen, highlight penting |
| **Biru Rumio** | `#1565C0` | Hyperlink, catatan teknis |
| **Abu Header** | `#D9D9D9` | Background header tabel |
| **Hitam Teks** | `#212121` | Semua teks utama |

---

## 9. NAMA FILE

Format penamaan saat disimpan sebagai Word:

```
SOW_RumioID_v[versi]_[tanggal].docx
```

**Contoh:** `SOW_RumioID_v1_22Jun2026.docx`

---

*Panduan ini khusus untuk dokumen Scope of Work RUMIO.ID, dibuat pada **22 Juni 2026**.*
