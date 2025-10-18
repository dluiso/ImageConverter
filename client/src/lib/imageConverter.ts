import type { ImageFormat } from "@/components/FormatSelector";

export async function convertImage(
  file: File,
  targetFormat: ImageFormat,
  onProgress: (progress: number) => void
): Promise<Blob> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    const reader = new FileReader();

    reader.onload = (e) => {
      img.src = e.target?.result as string;
    };

    reader.onerror = () => {
      reject(new Error("Failed to read file"));
    };

    img.onload = () => {
      try {
        onProgress(30);

        const canvas = document.createElement("canvas");
        canvas.width = img.width;
        canvas.height = img.height;

        const ctx = canvas.getContext("2d");
        if (!ctx) {
          reject(new Error("Failed to get canvas context"));
          return;
        }

        onProgress(50);

        ctx.drawImage(img, 0, 0);

        onProgress(70);

        const mimeType = getMimeType(targetFormat);
        const quality = getQuality(targetFormat);

        canvas.toBlob(
          (blob) => {
            if (blob) {
              onProgress(100);
              resolve(blob);
            } else {
              reject(new Error("Failed to convert image"));
            }
          },
          mimeType,
          quality
        );
      } catch (error) {
        reject(error);
      }
    };

    img.onerror = () => {
      reject(new Error("Failed to load image"));
    };

    reader.readAsDataURL(file);
  });
}

function getMimeType(format: ImageFormat): string {
  const mimeTypes: Record<ImageFormat, string> = {
    jpeg: "image/jpeg",
    png: "image/png",
    webp: "image/webp",
    gif: "image/gif",
    bmp: "image/bmp",
    tiff: "image/tiff",
    ico: "image/x-icon",
  };
  return mimeTypes[format] || "image/png";
}

function getQuality(format: ImageFormat): number {
  const qualities: Record<ImageFormat, number> = {
    jpeg: 0.92,
    png: 1.0,
    webp: 0.90,
    gif: 1.0,
    bmp: 1.0,
    tiff: 1.0,
    ico: 1.0,
  };
  return qualities[format] || 0.92;
}

export function generateFileName(originalName: string, targetFormat: ImageFormat): string {
  const nameWithoutExt = originalName.replace(/\.[^/.]+$/, "");
  return `${nameWithoutExt}.${targetFormat === "jpeg" ? "jpg" : targetFormat}`;
}
