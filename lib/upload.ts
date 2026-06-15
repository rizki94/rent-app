import { put } from "@vercel/blob";
import fs from "fs/promises";
import path from "path";

export async function uploadFile(file: File): Promise<string> {
  // If BLOB_READ_WRITE_TOKEN is set, use Vercel Blob
  if (process.env.BLOB_READ_WRITE_TOKEN) {
    try {
      const cleanToken = process.env.BLOB_READ_WRITE_TOKEN.replace(/['"]/g, "");
      const blob = await put(file.name, file, {
        access: "public",
        token: cleanToken,
        addRandomSuffix: true
      });
      return blob.url;
    } catch (e) {
      console.error("Vercel Blob upload failed, falling back to local storage:", e);
    }
  }

  // Fallback to local storage in public/uploads for local development
  const bytes = await file.arrayBuffer();
  const buffer = Buffer.from(bytes);

  const uploadDir = path.join(process.cwd(), "public/uploads");
  // Ensure the directory exists
  await fs.mkdir(uploadDir, { recursive: true });

  const uniqueName = `${Date.now()}-${file.name.replace(/\s+/g, "_")}`;
  const filePath = path.join(uploadDir, uniqueName);
  
  await fs.writeFile(filePath, buffer);
  return `/uploads/${uniqueName}`;
}
