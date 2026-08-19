import fs from "fs";
import path from "path";

/**
 * Storage Abstraction
 * Saves a File object to a target folder and returns its public URL.
 * Designed to be provider-friendly (can be updated to use Cloudflare R2/S3).
 */
export async function saveFile(file: File, folder: string): Promise<string> {
  const bytes = await file.arrayBuffer();
  const buffer = Buffer.from(bytes);

  // Local public uploads path
  const uploadsDir = path.join(process.cwd(), "public", "uploads", folder);

  // Ensure directory exists
  if (!fs.existsSync(uploadsDir)) {
    fs.mkdirSync(uploadsDir, { recursive: true });
  }

  // Create clean unique filename
  const rawExtension = path.extname(file.name) || "";
  // Fallback to standard extensions if mime type allows
  let extension = rawExtension.toLowerCase();
  if (!extension) {
    if (file.type === "image/png") extension = ".png";
    else if (file.type === "image/gif") extension = ".gif";
    else if (file.type === "image/webp") extension = ".webp";
    else extension = ".jpg";
  }

  const fileName = `${Date.now()}-${Math.random().toString(36).substring(2, 9)}${extension}`;
  const filePath = path.join(uploadsDir, fileName);

  // Write buffer to local disk
  fs.writeFileSync(filePath, buffer);

  // Return relative web URL
  return `/uploads/${folder}/${fileName}`;
}
