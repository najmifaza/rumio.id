# 🔍 Audit Keamanan & Efisiensi — Rumio.id

**Auditor:** Senior Code Review  
**Tanggal:** 30 Juni 2026  
**Cakupan:** Server Actions, API Routes, Auth, Database, File Upload, Frontend

---

## Ringkasan Eksekutif

| Severity | Jumlah | Status |
|----------|--------|--------|
| 🔴 CRITICAL | 3 | Harus segera diperbaiki |
| 🟠 HIGH | 4 | Perbaiki sebelum production |
| 🟡 MEDIUM | 4 | Perbaiki dalam sprint berikutnya |
| 🔵 LOW | 4 | Nice-to-have / technical debt |

---

## 🔴 CRITICAL — Harus Segera Diperbaiki

### C1. `submitPackageOrder` Tidak Ada Auth Guard & Rate Limiter

**File:** [order.ts](file:///d:/Coding/GitHub/rumio.id/src/app/actions/order.ts#L10-L81)

```diff
 export async function submitPackageOrder(formData: FormData) {
   try {
+    // Rate limiting
+    const headersList = await headers();
+    const ip = headersList.get("x-forwarded-for")?.split(",")[0]?.trim() || "unknown";
+    const rateCheck = formLimiter.check(`order:${ip}`);
+    if (!rateCheck.allowed) {
+      return { success: false, error: "Terlalu banyak permintaan." };
+    }
+
     const planId = formData.get("planId") as string;
```

> [!CAUTION]
> Action ini **terbuka untuk siapa saja** tanpa autentikasi dan tanpa rate limiting. Seorang attacker bisa:
> - Spam ribuan pesanan palsu ke database → **DB penuh**
> - Upload file besar tanpa batas → **disk penuh di server**
> - Membanjiri admin dengan notifikasi palsu

**Bandingkan dengan:** `submitInquiry` dan `registerScout` yang **sudah** memiliki rate limiter.

---

### C2. `trackWhatsAppClick` Tidak Ada Rate Limiter — Counter Bisa Dimanipulasi

**File:** [property.ts](file:///d:/Coding/GitHub/rumio.id/src/app/actions/property.ts#L5-L16)

```typescript
// MASALAH: Siapa saja bisa panggil ini berulang kali tanpa batas
export async function trackWhatsAppClick(propertySlug: string) {
  await prisma.property.update({
    where: { slug: propertySlug },
    data: { whatsappClicks: { increment: 1 } },
  });
}
```

> [!CAUTION]
> Seorang kompetitor atau bot bisa memanggil Server Action ini ribuan kali per detik untuk:
> - **Menggelembungkan** statistik WA click sebuah properti → data analytics tidak valid
> - Membuat **write-storm** ke database → potensi performance degradation

**Fix:** Tambahkan rate limiter seperti `viewLimiter` yang sudah ada di view count API.

---

### C3. Tidak Ada File Size & Type Validation pada Upload

**File:** [order.ts](file:///d:/Coding/GitHub/rumio.id/src/app/actions/order.ts#L21-L49) dan [media/actions.ts](file:///d:/Coding/GitHub/rumio.id/src/app/admin/media/actions.ts#L19-L71)

```typescript
// MASALAH: Tidak ada pengecekan ukuran file SAMA SEKALI
const file = formData.get("proofOfPayment") as File;
// ... langsung proses tanpa cek file.size, file.type
const bytes = await file.arrayBuffer(); // Bisa 500MB → OOM crash
```

> [!CAUTION]
> - **Denial of Service:** User bisa upload file 500MB → server kehabisan memory (`Buffer.from(bytes)` memuat SELURUH file ke RAM)
> - **File type spoofing:** `file.type` berasal dari client dan bisa dipalsukan. File berbahaya (`.exe`, `.php`) bisa di-upload karena **tidak ada whitelist MIME type**
> - Ini berlaku juga untuk `uploadMedia` di media actions (admin-only, tapi tetap risiko)

**Fix yang direkomendasikan:**
```typescript
const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10MB
const ALLOWED_TYPES = ['image/jpeg', 'image/png', 'image/webp'];

if (file.size > MAX_FILE_SIZE) {
  return { success: false, error: "Ukuran file maksimal 10MB" };
}
if (!ALLOWED_TYPES.includes(file.type)) {
  return { success: false, error: "Format file tidak didukung" };
}
```

---

## 🟠 HIGH — Perbaiki Sebelum Production

### H1. Tidak Ada Next.js Middleware untuk Proteksi Route `/admin`

Saat ini proteksi admin **hanya** dilakukan di `layout.tsx` server component. Ini berarti:
- Tidak ada proteksi di level **edge/network** → request tetap sampai ke server
- Setiap halaman admin tetap harus menunggu `getServerSession()` → **latency tambahan**
- API routes di bawah `/admin` **tidak otomatis terproteksi**

**Fix:** Buat `middleware.ts` di root project:
```typescript
// middleware.ts
export { default } from "next-auth/middleware";

export const config = {
  matcher: ["/admin/:path*"],
};
```

---

### H2. `saveProperty` — Auth Check Hanya di Create, Tidak di Update

**File:** [properties/actions.ts](file:///d:/Coding/GitHub/rumio.id/src/app/admin/properties/actions.ts#L62-L215)

```typescript
export async function saveProperty(formData: FormData, id?: string) {
  // ⚠️ TIDAK ADA auth check di sini untuk UPDATE!
  // Auth check hanya ada di branch `else` (create baru) di line 185-188
  
  if (id) {
    // UPDATE — siapa saja yang tahu ID bisa update properti!
    await prisma.property.update({ where: { id }, data: updateData });
  } else {
    // CREATE — ada auth check
    const session = await getServerSession(authOptions);
    if (!session?.user?.id || session.user.role !== "ADMIN") {
      throw new Error("Unauthorized");
    }
  }
}
```

> [!WARNING]
> Server Action ini bisa dipanggil oleh siapa saja dengan `id` properti yang valid untuk **mengubah data properti** tanpa login. Auth check harus dipindahkan ke **awal fungsi**, sebelum logic create/update.

---

### H3. `saveBlog` Tidak Menggunakan `sanitizeBlogContent`

**File:** [blogs/actions.ts](file:///d:/Coding/GitHub/rumio.id/src/app/admin/blogs/actions.ts#L38-L97)

```typescript
// Konten blog disimpan mentah ke DB tanpa sanitasi
const content = formData.get("content")?.toString().trim();
// ...
const payload = { title, slug, category, content, author, featuredImage };
await prisma.blog.create({ data: payload });
```

Anda sudah punya `sanitizeBlogContent()` di `lib/sanitize.ts` dan sudah memakainya saat **render** (`dangerouslySetInnerHTML`). Namun data mentah yang **tersimpan di DB** tetap bisa mengandung script berbahaya.

> [!WARNING]
> **Best practice:** Sanitize **saat menyimpan** (write-time), bukan hanya saat render. Jika ada endpoint lain yang membaca konten blog (API, RSS, email), mereka akan terekspos ke XSS.

```diff
+import { sanitizeBlogContent } from "@/lib/sanitize";
 
 const payload = {
   title,
   slug,
   category,
-  content,
+  content: sanitizeBlogContent(content),
   author,
   featuredImage,
 };
```

---

### H4. Fungsi `requireAdmin()` Diduplikasi di 4 File

**Files:** `blogs/actions.ts`, `media/actions.ts`, `pricing/actions.ts`, `users/actions.ts`

Fungsi yang **identik** di-copy-paste 4 kali:
```typescript
async function requireAdmin() {
  const session = await getServerSession(authOptions);
  if (!session || (session.user as any).role !== "ADMIN") {
    throw new Error("Akses ditolak...");
  }
  return session;
}
```

> [!IMPORTANT]
> Ini bukan hanya masalah DRY principle — jika ada perubahan logic auth (misalnya menambah role baru), Anda harus mengubah **4 file**. Risiko lupa sangat tinggi.

**Fix:** Pindahkan ke `lib/auth.ts` sebagai export:
```typescript
// lib/auth.ts
export async function requireAdmin() { ... }
```

---

## 🟡 MEDIUM

### M1. `saveSettings` Tidak Validate Key — Arbitrary DB Write

**File:** [settings/actions.ts](file:///d:/Coding/GitHub/rumio.id/src/app/admin/settings/actions.ts#L8-L33)

```typescript
export async function saveSettings(data: Record<string, string>) {
  // Admin bisa menulis key APAPUN ke tabel Setting
  const updates = Object.entries(data).map(async ([key, value]) => {
    return prisma.setting.upsert({ where: { key }, update: { value }, create: { key, value } });
  });
}
```

Meskipun sudah di-guard oleh `requireAdmin()`, tidak ada **whitelist** untuk key yang valid. Sebuah injeksi bisa membuat setting palsu yang merusak logika frontend.

**Fix:**
```typescript
const ALLOWED_KEYS = ["contact_whatsapp", "contact_email", "social_instagram", ...];
const filtered = Object.fromEntries(
  Object.entries(data).filter(([key]) => ALLOWED_KEYS.includes(key))
);
```

---

### M2. `updateOrderStatus` Tidak Validate Status Value

**File:** [order.ts](file:///d:/Coding/GitHub/rumio.id/src/app/actions/order.ts#L83-L98)

```typescript
export async function updateOrderStatus(id: string, status: string) {
  // Status bisa diisi string APAPUN — "HACKED", "DROP_TABLE", dll.
  await prisma.packageOrder.update({
    where: { id },
    data: { status }, // ← No validation
  });
}
```

**Fix:**
```typescript
const VALID_STATUSES = ["PENDING", "CONFIRMED", "REJECTED"];
if (!VALID_STATUSES.includes(status)) {
  return { success: false, error: "Status tidak valid" };
}
```

---

### M3. Slug Generation Loop Bisa Infinite — `saveProperty`

**File:** [properties/actions.ts](file:///d:/Coding/GitHub/rumio.id/src/app/admin/properties/actions.ts#L97-L103)

```typescript
while (true) {
  const existing = await prisma.property.findUnique({ where: { slug } });
  if (!existing || existing.id === id) break;
  slug = `${baseSlug}-${counter}`;
  counter++;
  // ⚠️ Tidak ada batas counter — bisa loop selamanya
}
```

Meskipun secara praktis tidak mungkin infinite, ini tetap risiko. Tambahkan `if (counter > 100) throw new Error(...)`.

---

### M4. `TypeScript` `as any` pada Session User — Type Safety Hilang

**File:** [auth.ts](file:///d:/Coding/GitHub/rumio.id/src/lib/auth.ts#L48-L56)

```typescript
// @ts-ignore
token.role = user.role;
// ...
(session.user as any).id = token.id;
(session.user as any).role = token.role;
```

> [!NOTE]
> Ini membuat compiler TypeScript **buta** terhadap tipe `role` dan `id`. Gunakan module augmentation:
> ```typescript
> // types/next-auth.d.ts
> declare module "next-auth" {
>   interface User { role: string; }
>   interface Session { user: User & { id: string; role: string; } }
> }
> declare module "next-auth/jwt" {
>   interface JWT { id: string; role: string; }
> }
> ```

---

## 🔵 LOW — Technical Debt

### L1. Admin Layout Melakukan 3 DB Count Query Tanpa Cache

**File:** [admin/layout.tsx](file:///d:/Coding/GitHub/rumio.id/src/app/admin/layout.tsx#L26-L28)

```typescript
const newInquiriesCount = isAdmin ? await prisma.inquiry.count({ where: { status: "NEW" } }) : 0;
const newScoutsCount = isAdmin ? await prisma.propertyScout.count({ where: { status: "NEW" } }) : 0;
const newOrdersCount = isAdmin ? await prisma.packageOrder.count({ where: { status: "PENDING" } }) : 0;
```

Tiga query berurutan ini dieksekusi di **setiap navigasi admin**. Gunakan `Promise.all()` dan pertimbangkan caching.

```diff
-const newInquiriesCount = isAdmin ? await prisma.inquiry.count(...) : 0;
-const newScoutsCount = isAdmin ? await prisma.propertyScout.count(...) : 0;
-const newOrdersCount = isAdmin ? await prisma.packageOrder.count(...) : 0;
+const [newInquiriesCount, newScoutsCount, newOrdersCount] = isAdmin
+  ? await Promise.all([
+      prisma.inquiry.count({ where: { status: "NEW" } }),
+      prisma.propertyScout.count({ where: { status: "NEW" } }),
+      prisma.packageOrder.count({ where: { status: "PENDING" } }),
+    ])
+  : [0, 0, 0];
```

---

### L2. `deleteOrder` Tidak Menghapus File `proofUrl` dari Disk

**File:** [order.ts](file:///d:/Coding/GitHub/rumio.id/src/app/actions/order.ts#L100-L114)

```typescript
export async function deleteOrder(id: string) {
  // ⚠️ Hanya hapus dari DB, file bukti bayar tetap di disk → disk leak
  await prisma.packageOrder.delete({ where: { id } });
}
```

**Bandingkan dengan** `deleteMedia` yang sudah benar: hapus file dulu dari disk dengan `unlink()`, baru hapus dari DB.

---

### L3. `deleteProperty` Tidak Menghapus File Gambar dari Disk

**File:** [properties/actions.ts](file:///d:/Coding/GitHub/rumio.id/src/app/admin/properties/actions.ts#L12-L33)

Sama seperti L2 — gambar properti & virtual tour di `public/uploads/` tidak dihapus saat properti dihapus. Seiring waktu, ini akan menjadi **disk space leak** yang signifikan.

---

### L4. OG Image Fallback Masih `.jpg` padahal Sudah Migrasi ke `.webp`

**File:** [properti/[slug]/page.tsx](file:///d:/Coding/GitHub/rumio.id/src/app/properti/%5Bslug%5D/page.tsx#L54)

```typescript
const image = property.featuredImage || "https://rumio.id/og-image.jpg";
//                                                              ^^^^ seharusnya .webp
```

---

## 📋 Prioritas Implementasi

| # | Item | Effort | Impact |
|---|------|--------|--------|
| 1 | **C1** — Rate limit `submitPackageOrder` | 15 min | 🔴 Mencegah spam/DoS |
| 2 | **C3** — File size/type validation | 20 min | 🔴 Mencegah crash & exploit |
| 3 | **H2** — Auth check `saveProperty` update | 5 min | 🟠 Mencegah unauthorized edit |
| 4 | **C2** — Rate limit `trackWhatsAppClick` | 10 min | 🔴 Melindungi data analytics |
| 5 | **H3** — Sanitize blog saat save | 5 min | 🟠 Mencegah stored XSS |
| 6 | **H1** — Tambah middleware.ts | 10 min | 🟠 Defense in depth |
| 7 | **M2** — Validate order status | 5 min | 🟡 Integritas data |
| 8 | **M1** — Whitelist settings key | 10 min | 🟡 Integritas data |
| 9 | **H4** — Centralize requireAdmin | 15 min | 🟠 Maintainability |
| 10 | **L1-L4** — Quick fixes | 30 min | 🔵 Cleanup |

> [!TIP]
> Item 1-6 bisa diselesaikan dalam **1 sesi kerja (~1 jam)**. Saya rekomendasikan untuk langsung eksekusi semua perbaikan CRITICAL dan HIGH terlebih dahulu.
