import { z } from "zod";

// ─────────────────────────────────────────────
// Public-facing form schemas
// ─────────────────────────────────────────────

export const InquirySchema = z.object({
  type: z.string().min(1, "Tipe permintaan wajib diisi"),
  name: z
    .string()
    .min(2, "Nama minimal 2 karakter")
    .max(100, "Nama terlalu panjang"),
  phone: z
    .string()
    .min(8, "Nomor telepon minimal 8 digit")
    .max(20, "Nomor telepon terlalu panjang")
    .regex(/^[0-9+\-\s()]+$/, "Format nomor telepon tidak valid"),
  transactionType: z.string().min(1, "Tipe transaksi wajib diisi"),
  propertyType: z.string().min(1, "Tipe properti wajib diisi"),
  location: z.string().min(2, "Lokasi wajib diisi").max(300),
  budgetOrPrice: z.string().optional(), // nullable in Prisma
});

export const ScoutSchema = z.object({
  fullName: z
    .string()
    .min(2, "Nama lengkap minimal 2 karakter")
    .max(100, "Nama terlalu panjang"),
  whatsapp: z
    .string()
    .min(8, "Nomor WhatsApp minimal 8 digit")
    .max(20, "Nomor WhatsApp terlalu panjang")
    .regex(/^[0-9+\-\s()]+$/, "Format nomor WhatsApp tidak valid"),
  email: z.string().email("Format email tidak valid").max(200),
  city: z.string().min(2, "Kota/kabupaten wajib diisi").max(100),
  district: z.string().max(100).optional(),
});

export const OrderSchema = z.object({
  planId: z.string().min(1, "ID paket wajib diisi"),
  planName: z.string().min(1, "Nama paket wajib diisi"),
  customerName: z.string().min(2, "Nama pelanggan minimal 2 karakter").max(100),
  whatsapp: z
    .string()
    .min(8, "Nomor WhatsApp minimal 8 digit")
    .max(20)
    .regex(/^[0-9+\-\s()]+$/, "Format nomor WhatsApp tidak valid"),
  propertyType: z.string().min(1, "Tipe properti wajib diisi").max(100),
  location: z.string().min(2, "Lokasi wajib diisi").max(200),
  paymentMethod: z.string().min(1, "Metode pembayaran wajib dipilih"),
  totalPrice: z
    .number({ message: "Harga harus berupa angka" })
    .positive("Harga harus lebih dari 0"),
  addons: z.array(z.string()).optional().default([]),
});

// ─────────────────────────────────────────────
// Admin — User management
// ─────────────────────────────────────────────

export const CreateUserSchema = z.object({
  name: z.string().min(2, "Nama minimal 2 karakter").max(100),
  email: z.string().email("Format email tidak valid").max(200),
  password: z
    .string()
    .min(8, "Password minimal 8 karakter")
    .max(100, "Password terlalu panjang"),
  role: z.enum(["ADMIN", "OWNER"]).default("OWNER"),
});

export const ResetPasswordSchema = z.object({
  newPassword: z
    .string()
    .min(8, "Password minimal 8 karakter")
    .max(100, "Password terlalu panjang"),
});

// ─────────────────────────────────────────────
// Admin — Blog management
// ─────────────────────────────────────────────

export const SaveBlogSchema = z.object({
  title: z
    .string()
    .min(3, "Judul minimal 3 karakter")
    .max(200, "Judul terlalu panjang"),
  category: z.string().min(1, "Kategori wajib diisi").max(100),
  content: z.string().min(10, "Konten terlalu pendek"),
  author: z.string().min(2, "Nama penulis minimal 2 karakter").max(100),
  slug: z.string().max(250).optional(),
  featuredImage: z.string().optional(),
});

// ─────────────────────────────────────────────
// Admin — Pricing management
// ─────────────────────────────────────────────

export const SaveAddonSchema = z.object({
  name: z.string().min(2, "Nama addon minimal 2 karakter").max(100),
  description: z.string().min(5, "Deskripsi terlalu pendek").max(500),
  price: z
    .string()
    .min(1, "Harga wajib diisi")
    .transform((val) => parseFloat(val.replace(/[^0-9.-]+/g, "")))
    .pipe(z.number().positive("Harga harus lebih dari 0")),
  priceSuffix: z.string().max(50).optional(),
  imageUrl: z
    .string()
    .url("URL gambar tidak valid")
    .optional()
    .or(z.literal("")),
});

export const SavePlanSchema = z.object({
  name: z.string().min(2, "Nama paket minimal 2 karakter").max(100),
  description: z.string().min(5, "Deskripsi terlalu pendek").max(500),
  price: z
    .string()
    .min(1, "Harga wajib diisi")
    .transform((val) => parseFloat(val.replace(/[^0-9.-]+/g, "")))
    .pipe(z.number().nonnegative("Harga tidak boleh negatif")),
  icon: z.string().max(50).optional().default("Check"),
  isPopular: z.boolean().optional().default(false),
  features: z.string().optional(), // raw JSON string — parsed separately
});

// ─────────────────────────────────────────────
// Admin — Property management
// ─────────────────────────────────────────────

export const SavePropertySchema = z.object({
  title: z.string().min(5, "Judul minimal 5 karakter").max(200),
  price: z
    .string()
    .min(1, "Harga wajib diisi")
    .transform((val) => parseFloat(val))
    .pipe(z.number().positive("Harga harus lebih dari 0")),
  location: z.string().min(5, "Lokasi minimal 5 karakter").max(300),
  propertyType: z.string().min(1, "Tipe properti wajib dipilih"),
  listingType: z.string().min(1, "Tipe listing wajib dipilih"),
  condition: z.string().default(""),
  bedrooms: z
    .string()
    .transform((v) => parseInt(v))
    .pipe(z.number().int().nonnegative()),
  bathrooms: z
    .string()
    .transform((v) => parseInt(v))
    .pipe(z.number().int().nonnegative()),
  floors: z
    .string()
    .transform((v) => parseInt(v))
    .pipe(z.number().int().nonnegative()),
  landArea: z
    .string()
    .transform((v) => parseFloat(v))
    .pipe(z.number().nonnegative("Luas tanah tidak boleh negatif")),
  buildingArea: z
    .string()
    .transform((v) => parseFloat(v))
    .pipe(z.number().nonnegative()),
  electricity: z
    .string()
    .transform((v) => parseInt(v))
    .pipe(z.number().int().nonnegative()),
  waterSupply: z.string().default(""),
  facing: z.string().default(""),
  buildYear: z
    .string()
    .transform((v) => parseInt(v))
    .pipe(
      z
        .number()
        .int()
        .min(1900)
        .max(new Date().getFullYear() + 1),
    ),
  certificate: z.string().default(""),
  description: z.string().min(20, "Deskripsi minimal 20 karakter"),
  mapsUrl: z.string().default(""),
  status: z
    .enum(["AVAILABLE", "SOLD", "RENTED"])
    .optional()
    .default("AVAILABLE"),
});
