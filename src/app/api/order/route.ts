import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { processAndSaveImage } from "@/lib/upload";
import { headers } from "next/headers";
import { formLimiter } from "@/lib/rate-limit";
import { OrderSchema } from "@/lib/schemas";

export async function POST(req: Request) {
  try {
    // Rate limiting: max 5 per minute per IP
    const headersList = await headers();
    const ip = headersList.get("x-forwarded-for")?.split(",")[0]?.trim() || "unknown";
    const rateCheck = formLimiter.check(`order:${ip}`);
    if (!rateCheck.allowed) {
      return NextResponse.json({ success: false, error: "Terlalu banyak permintaan. Silakan coba lagi nanti." }, { status: 429 });
    }

    const formData = await req.formData();

    // Validate text fields with Zod
    const rawOrder = {
      planId: formData.get("planId"),
      planName: formData.get("planName"),
      customerName: formData.get("customerName"),
      whatsapp: formData.get("whatsapp"),
      propertyType: formData.get("propertyType"),
      location: formData.get("location"),
      paymentMethod: formData.get("paymentMethod"),
      totalPrice: parseFloat(formData.get("totalPrice") as string),
      addons: (() => {
        try { return JSON.parse(formData.get("addons") as string || "[]"); } catch { return []; }
      })(),
    };

    const parsedOrder = OrderSchema.safeParse(rawOrder);
    if (!parsedOrder.success) {
      const message = parsedOrder.error.issues[0]?.message ?? "Input tidak valid.";
      return NextResponse.json({ success: false, error: message }, { status: 400 });
    }

    const { planId, planName, customerName, whatsapp, propertyType, location, paymentMethod, totalPrice, addons } = parsedOrder.data;
    const addonsJson = formData.get("addons") as string;
    const file = formData.get("proofOfPayment") as File;

    if (!file || file.size === 0) {
      return NextResponse.json({ success: false, error: "Bukti pembayaran wajib diunggah." }, { status: 400 });
    }

    const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10MB
    const ALLOWED_TYPES = ['image/jpeg', 'image/png', 'image/webp', 'image/gif'];

    if (file.size > MAX_FILE_SIZE) {
      return NextResponse.json({ success: false, error: "Ukuran file maksimal 10MB." }, { status: 400 });
    }

    if (!ALLOWED_TYPES.includes(file.type)) {
      return NextResponse.json({ success: false, error: "Format file tidak didukung. Harap unggah gambar (JPG, PNG, WEBP)." }, { status: 400 });
    }

    // Process file upload
    const uploadResult = await processAndSaveImage(file, "payments");
    const proofUrl = uploadResult.url;

    // addons already validated and parsed via Zod — use as-is
    void addonsJson; // kept in scope above for reference

    // Save to DB
    const order = await prisma.packageOrder.create({
      data: {
        planId,
        planName,
        customerName,
        whatsapp,
        propertyType,
        location,
        paymentMethod,
        totalPrice,
        proofUrl,
        addons: addons as any,
      }
    });

    return NextResponse.json({ success: true, orderId: order.id });
  } catch (error) {
    console.error("Order submission failed:", error);
    return NextResponse.json({ success: false, error: "Terjadi kesalahan saat memproses pesanan." }, { status: 500 });
  }
}
