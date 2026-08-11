// ============================================================
// HACKER HOUSE GOA 2026 — High Resolution Canvas Renderer
// Renders the complete ID Badge card at 1200x1600 output resolution
// Guarantees reliable export in PNG or JPG format
// ============================================================

export interface RenderOptions {
  photo: string | null;
  name: string;
  stack: string;
  builderClass: string;
  builderId: string;
  frameStyle?: string;
  zoom?: number;
  position?: { x: number; y: number };
  format?: 'png' | 'jpg' | 'jpeg';
}

const CANVAS_W = 1200;
const CANVAS_H = 1600;

function loadImage(src: string): Promise<HTMLImageElement | null> {
  return new Promise((resolve) => {
    if (!src) {
      resolve(null);
      return;
    }
    const img = new Image();
    // Only set crossOrigin if loading from external domain
    if (src.startsWith('http://') || src.startsWith('https://')) {
      if (typeof window !== 'undefined' && !src.includes(window.location.host)) {
        img.crossOrigin = 'anonymous';
      }
    }
    img.onload = () => resolve(img);
    img.onerror = () => resolve(null); // Never reject, return null on error
    img.src = src;
  });
}

/**
 * Validates binary signature of a Blob to guarantee it contains authentic PNG or JPEG bytes.
 * PNG magic bytes: 89 50 4E 47 0D 0A 1A 0A
 * JPEG magic bytes: FF D8 FF
 */
async function validateImageBinary(
  blob: Blob,
  expectedFormat: 'png' | 'jpg'
): Promise<{ valid: boolean; detectedFormat: string; signatureHex: string; sampleText: string }> {
  const buffer = await blob.arrayBuffer();
  const bytes = new Uint8Array(buffer);

  const hexArray: string[] = [];
  const maxHeader = Math.min(bytes.length, 12);
  for (let i = 0; i < maxHeader; i++) {
    hexArray.push(bytes[i].toString(16).padStart(2, '0').toUpperCase());
  }
  const signatureHex = hexArray.join(' ');

  let sampleText = '';
  try {
    const textDecoder = new TextDecoder('utf-8');
    sampleText = textDecoder.decode(bytes.subarray(0, 100));
  } catch {
    sampleText = '';
  }

  const isPng =
    bytes.length >= 8 &&
    bytes[0] === 0x89 &&
    bytes[1] === 0x50 &&
    bytes[2] === 0x4e &&
    bytes[3] === 0x47 &&
    bytes[4] === 0x0d &&
    bytes[5] === 0x0a &&
    bytes[6] === 0x1a &&
    bytes[7] === 0x0a;

  const isJpeg =
    bytes.length >= 3 &&
    bytes[0] === 0xff &&
    bytes[1] === 0xd8 &&
    bytes[2] === 0xff;

  const valid = (expectedFormat === 'png' && isPng) || (expectedFormat === 'jpg' && isJpeg);
  const detectedFormat = isPng ? 'image/png' : isJpeg ? 'image/jpeg' : 'non-image/text/html/json';

  return { valid, detectedFormat, signatureHex, sampleText };
}

/**
 * Render ID Card to base64 Data URL (used for preview / legacy calls)
 */
export async function renderIDCard(options: RenderOptions): Promise<string> {
  const canvas = document.createElement('canvas');
  canvas.width = CANVAS_W;
  canvas.height = CANVAS_H;
  const ctx = canvas.getContext('2d')!;

  // 1. Main Card Background - Deep Goa Green (#163D28)
  ctx.fillStyle = '#163D28';
  ctx.fillRect(0, 0, CANVAS_W, CANVAS_H);

  // 2. Outer Border & Frame (#17251C)
  ctx.strokeStyle = '#17251C';
  ctx.lineWidth = 16;
  ctx.strokeRect(8, 8, CANVAS_W - 16, CANVAS_H - 16);

  // 3. Inner Decorative Gold Border (#F5DD3B)
  ctx.strokeStyle = '#F5DD3B';
  ctx.lineWidth = 4;
  ctx.strokeRect(32, 32, CANVAS_W - 64, CANVAS_H - 64);

  // 4. Header Logo (HH GOA 2026)
  ctx.fillStyle = '#F5DD3B';
  ctx.font = '900 84px serif';
  ctx.fillText('HH', 70, 140);

  ctx.fillStyle = '#F6F0D8';
  ctx.font = '900 48px serif';
  ctx.fillText('GOA', 70, 200);

  ctx.fillStyle = '#F5DD3B';
  ctx.font = '700 32px monospace';
  ctx.fillText('2026', 70, 245);

  // Top Right Botanical Circular Stamp
  ctx.fillStyle = '#F5DD3B';
  ctx.beginPath();
  ctx.arc(CANVAS_W - 140, 140, 50, 0, Math.PI * 2);
  ctx.fill();

  ctx.fillStyle = '#163D28';
  ctx.font = '800 16px monospace';
  ctx.textAlign = 'center';
  ctx.fillText('BUILDER', CANVAS_W - 140, 135);
  ctx.font = '900 italic 20px serif';
  ctx.fillText('GOA', CANVAS_W - 140, 155);
  ctx.textAlign = 'left';

  // 5. Photo Box Frame
  const photoSize = 780;
  const photoX = (CANVAS_W - photoSize) / 2;
  const photoY = 280;

  ctx.fillStyle = '#0F2E1D';
  ctx.fillRect(photoX, photoY, photoSize, photoSize);
  ctx.strokeStyle = '#17251C';
  ctx.lineWidth = 8;
  ctx.strokeRect(photoX, photoY, photoSize, photoSize);

  // Draw Photo
  if (options.photo) {
    const img = await loadImage(options.photo);
    if (img) {
      ctx.save();
      ctx.beginPath();
      ctx.rect(photoX, photoY, photoSize, photoSize);
      ctx.clip();

      const scale = options.zoom || 1;
      const posX = options.position?.x || 0;
      const posY = options.position?.y || 0;

      const drawW = photoSize * scale;
      const drawH = photoSize * scale;
      const drawX = photoX + (photoSize - drawW) / 2 + posX * (photoSize / 300);
      const drawY = photoY + (photoSize - drawH) / 2 + posY * (photoSize / 300);

      ctx.drawImage(img, drawX, drawY, drawW, drawH);
      ctx.restore();
    } else {
      ctx.fillStyle = '#1E5B3A';
      ctx.fillRect(photoX + 20, photoY + 20, photoSize - 40, photoSize - 40);
    }
  }

  // 6. Name (Yellow Display Text)
  const infoY = photoY + photoSize + 90;
  ctx.fillStyle = '#F5DD3B';
  ctx.font = '900 68px serif';
  const nameText = (options.name || 'PRIYANSHU KHARE').toUpperCase();
  ctx.fillText(nameText, 70, infoY);

  // 7. Stack / Role (White Monospace Text)
  ctx.fillStyle = '#F6F0D8';
  ctx.font = '600 32px monospace';
  const stackText = (options.stack || 'AI/ML // PYTHON // NEXT.JS').toUpperCase();
  ctx.fillText(stackText, 70, infoY + 60);

  // 8. Builder Class (Yellow Bold Monospace)
  ctx.fillStyle = '#F5DD3B';
  ctx.font = '800 38px monospace';
  const classText = `⚡ ${(options.builderClass || 'NEURAL NOMAD').toUpperCase()}`;
  ctx.fillText(classText, 70, infoY + 115);

  // 9. Right Gold Circular Stamp
  const stampX = CANVAS_W - 160;
  const stampY = infoY + 40;
  ctx.strokeStyle = '#F5DD3B';
  ctx.lineWidth = 6;
  ctx.beginPath();
  ctx.arc(stampX, stampY, 75, 0, Math.PI * 2);
  ctx.stroke();

  ctx.fillStyle = '#F5DD3B';
  ctx.font = '800 18px monospace';
  ctx.textAlign = 'center';
  ctx.fillText('BUILDER OF', stampX, stampY - 20);
  ctx.font = '900 italic 32px serif';
  ctx.fillStyle = '#F6F0D8';
  ctx.fillText('GOA', stampX, stampY + 10);
  ctx.font = '700 18px monospace';
  ctx.fillStyle = '#F5DD3B';
  ctx.fillText('2026', stampX, stampY + 38);
  ctx.textAlign = 'left';

  // 10. Bottom Separator Line
  const bottomY = CANVAS_H - 100;
  ctx.strokeStyle = '#F5DD3B';
  ctx.lineWidth = 2;
  ctx.beginPath();
  ctx.moveTo(70, bottomY);
  ctx.lineTo(CANVAS_W - 70, bottomY);
  ctx.stroke();

  // 11. Builder ID Code
  ctx.fillStyle = '#F6F0D8';
  ctx.font = '800 44px monospace';
  ctx.fillText(options.builderId || 'HH-26-0241', 70, bottomY + 50);

  // 12. Simulated Barcode
  let barcodeX = CANVAS_W - 320;
  const barcodeY = bottomY + 15;
  const barcodeHeight = 45;
  const bars = [4, 2, 6, 2, 4, 8, 2, 4, 2, 6, 4, 2, 8, 2, 4, 6];

  ctx.fillStyle = '#F6F0D8';
  for (const b of bars) {
    ctx.fillRect(barcodeX, barcodeY, b, barcodeHeight);
    barcodeX += b + 4;
  }

  const targetFormat = (options.format || 'png').toLowerCase();
  const mimeType = targetFormat === 'jpg' || targetFormat === 'jpeg' ? 'image/jpeg' : 'image/png';
  return canvas.toDataURL(mimeType, 0.95);
}

/**
 * Direct, binary-validated export & download pipeline.
 * Performs byte-level signature verification before allowing browser download.
 * Formats clean filenames: HH-GOA-2026-[NAME].png or HH-GOA-2026-[NAME].jpg
 */
export function exportIDCard(
  options: RenderOptions,
  format: 'png' | 'jpg' = 'png'
): Promise<void> {
  return new Promise(async (resolve, reject) => {
    try {
      const targetFormat = (format || options.format || 'png').toLowerCase();
      const isJpeg = targetFormat === 'jpg' || targetFormat === 'jpeg';
      const mimeType = isJpeg ? 'image/jpeg' : 'image/png';
      const ext = isJpeg ? 'jpg' : 'png';

      // 1. Format clean filename: HH-GOA-2026-[NAME].[ext]
      const cleanName = (options.name || 'BUILDER')
        .trim()
        .toUpperCase()
        .replace(/[^A-Z0-9]/g, '-')
        .replace(/-+/g, '-')
        .replace(/^-|-$/g, '');

      const filename = `HH-GOA-2026-${cleanName || 'BUILDER'}.${ext}`;

      // 2. Render canvas at 1200x1600
      const canvas = document.createElement('canvas');
      canvas.width = CANVAS_W;
      canvas.height = CANVAS_H;
      const ctx = canvas.getContext('2d')!;

      // Background
      ctx.fillStyle = '#163D28';
      ctx.fillRect(0, 0, CANVAS_W, CANVAS_H);

      // Borders
      ctx.strokeStyle = '#17251C';
      ctx.lineWidth = 16;
      ctx.strokeRect(8, 8, CANVAS_W - 16, CANVAS_H - 16);

      ctx.strokeStyle = '#F5DD3B';
      ctx.lineWidth = 4;
      ctx.strokeRect(32, 32, CANVAS_W - 64, CANVAS_H - 64);

      // Logo Header
      ctx.fillStyle = '#F5DD3B';
      ctx.font = '900 84px serif';
      ctx.fillText('HH', 70, 140);

      ctx.fillStyle = '#F6F0D8';
      ctx.font = '900 48px serif';
      ctx.fillText('GOA', 70, 200);

      ctx.fillStyle = '#F5DD3B';
      ctx.font = '700 32px monospace';
      ctx.fillText('2026', 70, 245);

      // Stamp Top Right
      ctx.fillStyle = '#F5DD3B';
      ctx.beginPath();
      ctx.arc(CANVAS_W - 140, 140, 50, 0, Math.PI * 2);
      ctx.fill();

      ctx.fillStyle = '#163D28';
      ctx.font = '800 16px monospace';
      ctx.textAlign = 'center';
      ctx.fillText('BUILDER', CANVAS_W - 140, 135);
      ctx.font = '900 italic 20px serif';
      ctx.fillText('GOA', CANVAS_W - 140, 155);
      ctx.textAlign = 'left';

      // Photo Box
      const photoSize = 780;
      const photoX = (CANVAS_W - photoSize) / 2;
      const photoY = 280;

      ctx.fillStyle = '#0F2E1D';
      ctx.fillRect(photoX, photoY, photoSize, photoSize);
      ctx.strokeStyle = '#17251C';
      ctx.lineWidth = 8;
      ctx.strokeRect(photoX, photoY, photoSize, photoSize);

      if (options.photo) {
        const img = await loadImage(options.photo);
        if (img) {
          ctx.save();
          ctx.beginPath();
          ctx.rect(photoX, photoY, photoSize, photoSize);
          ctx.clip();

          const scale = options.zoom || 1;
          const posX = options.position?.x || 0;
          const posY = options.position?.y || 0;

          const drawW = photoSize * scale;
          const drawH = photoSize * scale;
          const drawX = photoX + (photoSize - drawW) / 2 + posX * (photoSize / 300);
          const drawY = photoY + (photoSize - drawH) / 2 + posY * (photoSize / 300);

          ctx.drawImage(img, drawX, drawY, drawW, drawH);
          ctx.restore();
        } else {
          ctx.fillStyle = '#1E5B3A';
          ctx.fillRect(photoX + 20, photoY + 20, photoSize - 40, photoSize - 40);
        }
      }

      // Name & Details
      const infoY = photoY + photoSize + 90;
      ctx.fillStyle = '#F5DD3B';
      ctx.font = '900 68px serif';
      ctx.fillText((options.name || 'PRIYANSHU KHARE').toUpperCase(), 70, infoY);

      ctx.fillStyle = '#F6F0D8';
      ctx.font = '600 32px monospace';
      ctx.fillText((options.stack || 'AI/ML // PYTHON // NEXT.JS').toUpperCase(), 70, infoY + 60);

      ctx.fillStyle = '#F5DD3B';
      ctx.font = '800 38px monospace';
      ctx.fillText(`⚡ ${(options.builderClass || 'NEURAL NOMAD').toUpperCase()}`, 70, infoY + 115);

      // Gold Stamp Right
      const stampX = CANVAS_W - 160;
      const stampY = infoY + 40;
      ctx.strokeStyle = '#F5DD3B';
      ctx.lineWidth = 6;
      ctx.beginPath();
      ctx.arc(stampX, stampY, 75, 0, Math.PI * 2);
      ctx.stroke();

      ctx.fillStyle = '#F5DD3B';
      ctx.font = '800 18px monospace';
      ctx.textAlign = 'center';
      ctx.fillText('BUILDER OF', stampX, stampY - 20);
      ctx.font = '900 italic 32px serif';
      ctx.fillStyle = '#F6F0D8';
      ctx.fillText('GOA', stampX, stampY + 10);
      ctx.font = '700 18px monospace';
      ctx.fillStyle = '#F5DD3B';
      ctx.fillText('2026', stampX, stampY + 38);
      ctx.textAlign = 'left';

      // Separator Line
      const bottomY = CANVAS_H - 100;
      ctx.strokeStyle = '#F5DD3B';
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.moveTo(70, bottomY);
      ctx.lineTo(CANVAS_W - 70, bottomY);
      ctx.stroke();

      // Builder ID Code
      ctx.fillStyle = '#F6F0D8';
      ctx.font = '800 44px monospace';
      ctx.fillText(options.builderId || 'HH-26-0241', 70, bottomY + 50);

      // Barcode
      let barcodeX = CANVAS_W - 320;
      const barcodeY = bottomY + 15;
      const barcodeHeight = 45;
      const bars = [4, 2, 6, 2, 4, 8, 2, 4, 2, 6, 4, 2, 8, 2, 4, 6];

      ctx.fillStyle = '#F6F0D8';
      for (const b of bars) {
        ctx.fillRect(barcodeX, barcodeY, b, barcodeHeight);
        barcodeX += b + 4;
      }

      // 3. Export to Blob directly with strict byte-level signature verification
      canvas.toBlob(
        async (blob) => {
          if (!blob) {
            const err = new Error(`[Canvas Export Error]: Failed to create Blob for ${mimeType}`);
            console.error(err);
            reject(err);
            return;
          }

          if (blob.size === 0) {
            const err = new Error(`[Canvas Export Error]: Created Blob for ${mimeType} is 0 bytes`);
            console.error(err);
            reject(err);
            return;
          }

          // Step 3 & Step 7: Byte-level signature check
          const signatureResult = await validateImageBinary(blob, ext as 'png' | 'jpg');
          console.log(
            `[Export Diagnostic]: MIME=${blob.type}, Size=${blob.size} bytes, ValidSignature=${signatureResult.valid}, Detected=${signatureResult.detectedFormat}, MagicBytes=${signatureResult.signatureHex}`
          );

          if (!signatureResult.valid) {
            const err = new Error(
              `[Export Validation Failed]: Received ${signatureResult.detectedFormat} payload instead of ${mimeType}. Header: ${signatureResult.signatureHex}. Sample: ${signatureResult.sampleText.slice(0, 50)}`
            );
            console.error(err);
            reject(err);
            return;
          }

          // Step 9: Verified download
          const blobUrl = URL.createObjectURL(blob);
          const a = document.createElement('a');
          a.style.display = 'none';
          a.href = blobUrl;
          a.download = filename;
          a.setAttribute('download', filename);
          document.body.appendChild(a);
          a.click();

          setTimeout(() => {
            if (document.body.contains(a)) {
              document.body.removeChild(a);
            }
            URL.revokeObjectURL(blobUrl);
          }, 3000);

          resolve();
        },
        mimeType,
        0.95
      );
    } catch (err) {
      console.error('[Export ID Card Exception]:', err);
      reject(err);
    }
  });
}

/**
 * Legacy helper maintained for backwards compatibility
 */
export function triggerFileDownload(dataUrl: string, filename: string, format: 'png' | 'jpg' = 'png'): void {
  const parts = dataUrl.split(';base64,');
  const contentType = parts[0].split(':')[1] || (format === 'jpg' ? 'image/jpeg' : 'image/png');
  const raw = window.atob(parts[1]);
  const uInt8Array = new Uint8Array(raw.length);
  for (let i = 0; i < raw.length; i++) {
    uInt8Array[i] = raw.charCodeAt(i);
  }

  const blob = new Blob([uInt8Array], { type: contentType });
  const url = URL.createObjectURL(blob);

  const a = document.createElement('a');
  a.style.display = 'none';
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();

  setTimeout(() => {
    if (document.body.contains(a)) document.body.removeChild(a);
    URL.revokeObjectURL(url);
  }, 3000);
}
