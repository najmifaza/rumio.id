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
  
  // Create FormData for the external PHP server
  const formData = new FormData();
  // Convert Node Buffer to Blob for native FormData
  const blob = new Blob([buffer], { type: mimeType });
  formData.append("file", blob, fileName);
  if (subFolder) {
    formData.append("folder", subFolder);
  }

  // Token rahasia yang sama dengan yang ada di upload.php
  const secretToken = "RUMIO_ASSET_SECRET_2026_xyz"; 
  const uploadUrl = "https://asset.rumio.id/upload.php";

  try {
    const response = await fetch(uploadUrl, {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${secretToken}`
      },
      body: formData,
    });

    if (!response.ok) {
      const errText = await response.text();
      console.error("Asset server error:", response.status, errText);
      throw new Error("Gagal mengupload gambar ke server asset.");
    }

    const data = await response.json();
    
    if (!data.success) {
      throw new Error(data.error || "Gagal menyimpan file");
    }

    return { 
      url: data.url, 
      fileName: data.fileName, 
      size: buffer.length, 
      mimeType 
    };
  } catch (error) {
    console.error("Failed to push image to asset.rumio.id:", error);
    throw error;
  }
}
