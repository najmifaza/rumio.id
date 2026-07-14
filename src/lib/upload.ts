import { writeFile, mkdir } from "fs/promises";
import { join } from "path";
import sharp from "sharp";

export async function processAndSaveImage(
  file: File,
  subFolder: string = "",
  options: { convertToWebp?: boolean; quality?: number } = {}
) {
  const { convertToWebp = true, quality = 80 } = options;
  const bytes = await file.arrayBuffer();
  let buffer = Buffer.from(bytes);

  const uniqueSuffix = `${Date.now()}-${Math.round(Math.random() * 1e9)}`;
  let originalName = file.name.replace(/[^a-zA-Z0-9.-]/g, "_");
  let mimeType = file.type;

  // Convert non-svg images to WebP if requested
  if (convertToWebp && file.type.startsWith("image/") && !file.type.includes("svg")) {
    buffer = (await sharp(buffer).webp({ quality }).toBuffer()) as any;
    originalName = originalName.replace(/\.[^/.]+$/, "") + ".webp";
    mimeType = "image/webp";
  }

  const fileName = `${uniqueSuffix}-${originalName}`;
  const uploadDir = join(process.cwd(), "public/uploads", subFolder);

  try {
    await mkdir(uploadDir, { recursive: true });
  } catch (e: unknown) {
    if ((e as NodeJS.ErrnoException).code !== "EEXIST") throw e;
  }

  const path = join(uploadDir, fileName);
  await writeFile(path, buffer);
  
  // Clean up subFolder for URL to avoid double slashes if it's empty
  const urlSubFolder = subFolder ? `/${subFolder}` : "";
  const url = `/uploads${urlSubFolder}/${fileName}`;

  return { url, fileName, size: buffer.length, mimeType };
}
