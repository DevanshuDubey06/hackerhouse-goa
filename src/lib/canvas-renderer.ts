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
      // Photo placeholder if image fails to load
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

  // Determine export mime type
  const targetFormat = (options.format || 'png').toLowerCase();
  const mimeType = targetFormat === 'jpg' || targetFormat === 'jpeg' ? 'image/jpeg' : 'image/png';

  // Return Data URL directly
  return canvas.toDataURL(mimeType, 0.95);
}

/**
 * Triggers file download by submitting a hidden HTML form to /api/download-id.
 * The server responds with HTTP Content-Disposition headers, forcing Chrome
 * to save the file with the exact name and extension (.png or .jpg).
 */
export function triggerFileDownload(dataUrl: string, filename: string, format: 'png' | 'jpg' = 'png'): void {
  try {
    const form = document.createElement('form');
    form.method = 'POST';
    form.action = '/api/download-id';
    form.style.display = 'none';

    const inputData = document.createElement('input');
    inputData.type = 'hidden';
    inputData.name = 'dataUrl';
    inputData.value = dataUrl;
    form.appendChild(inputData);

    const inputName = document.createElement('input');
    inputName.type = 'hidden';
    inputName.name = 'filename';
    inputName.value = filename;
    form.appendChild(inputName);

    const inputFormat = document.createElement('input');
    inputFormat.type = 'hidden';
    inputFormat.name = 'format';
    inputFormat.value = format;
    form.appendChild(inputFormat);

    document.body.appendChild(form);
    form.submit();

    setTimeout(() => {
      if (document.body.contains(form)) {
        document.body.removeChild(form);
      }
    }, 2000);
  } catch (err) {
    console.error('Form download error:', err);
    // Fallback: direct anchor click
    const a = document.createElement('a');
    a.href = dataUrl;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    setTimeout(() => {
      if (document.body.contains(a)) document.body.removeChild(a);
    }, 2000);
  }
}
