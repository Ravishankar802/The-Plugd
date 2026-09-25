import jsQR from "jsqr";

/**
 * Decode a QR code from an image File.
 * Attempts native BarcodeDetector first (supported in modern browsers),
 * falling back to client-side canvas + jsQR.
 */
export async function decodeQrCode(file: File): Promise<{ success: boolean; data?: string; error?: string }> {
  try {
    // 1. Try native BarcodeDetector API if available
    if (typeof window !== "undefined" && "BarcodeDetector" in window) {
      try {
        const barcodeDetector = new (window as any).BarcodeDetector({
          formats: ["qr_code"],
        });
        const imageBitmap = await createImageBitmap(file);
        const barcodes = await barcodeDetector.detect(imageBitmap);
        if (barcodes && barcodes.length > 0 && barcodes[0].rawValue) {
          return { success: true, data: barcodes[0].rawValue };
        }
      } catch (err) {
        // Fall back to jsQR
      }
    }

    // 2. Fallback to jsQR using HTML Canvas
    return new Promise((resolve) => {
      const img = new Image();
      const objectUrl = URL.createObjectURL(file);

      img.onload = () => {
        try {
          const canvas = document.createElement("canvas");
          const ctx = canvas.getContext("2d");

          if (!ctx) {
            URL.revokeObjectURL(objectUrl);
            return resolve({
              success: false,
              error: "Could not initialize image processor.",
            });
          }

          // Scale down if image is huge to speed up decoding
          let width = img.naturalWidth || img.width;
          let height = img.naturalHeight || img.height;
          const maxDim = 1200;
          if (width > maxDim || height > maxDim) {
            if (width > height) {
              height = Math.round((height * maxDim) / width);
              width = maxDim;
            } else {
              width = Math.round((width * maxDim) / height);
              height = maxDim;
            }
          }

          canvas.width = width;
          canvas.height = height;
          ctx.drawImage(img, 0, 0, width, height);

          const imageData = ctx.getImageData(0, 0, width, height);
          const qrCode = jsQR(imageData.data, imageData.width, imageData.height, {
            inversionAttempts: "attemptBoth",
          });

          URL.revokeObjectURL(objectUrl);

          if (qrCode && qrCode.data) {
            return resolve({ success: true, data: qrCode.data });
          }

          return resolve({
            success: false,
            error: "Could not detect a QR code from this image. Please ensure the QR is clear and well-lit, or enter your payment link directly.",
          });
        } catch (e: any) {
          URL.revokeObjectURL(objectUrl);
          return resolve({
            success: false,
            error: e?.message || "Failed to process image.",
          });
        }
      };

      img.onerror = () => {
        URL.revokeObjectURL(objectUrl);
        return resolve({
          success: false,
          error: "Could not load the uploaded image file.",
        });
      };

      img.src = objectUrl;
    });
  } catch (error: any) {
    return {
      success: false,
      error: error?.message || "An unexpected error occurred while reading the QR code.",
    };
  }
}
