// ============================================================
// HACKER HOUSE GOA 2026 — High Resolution Canvas Renderer
// Renders dynamic Builder ID cards for all 3 Vibes × 5 Frame Formats
// Guarantees reliable export in PNG or JPG format
// ============================================================

export interface RenderOptions {
  photo: string | null;
  name: string;
  stack: string;
  builderClass: string;
  builderId: string;
  vibe?: string; // 'forest-wave' | 'sunburst' | 'sunset-pink'
  frame?: string; // 'portrait' | 'landscape' | 'circle' | 'arch' | 'slim' | 'ornate'
  teamName?: string;
  frameStyle?: string;
  zoom?: number;
  position?: { x: number; y: number };
  format?: 'png' | 'jpg' | 'jpeg';
}

function loadImage(src: string): Promise<HTMLImageElement | null> {
  return new Promise((resolve) => {
    if (!src) {
      resolve(null);
      return;
    }
    const img = new Image();
    if (src.startsWith('http://') || src.startsWith('https://')) {
      if (typeof window !== 'undefined' && !src.includes(window.location.host)) {
        img.crossOrigin = 'anonymous';
      }
    }
    img.onload = () => resolve(img);
    img.onerror = () => resolve(null);
    img.src = src;
  });
}

function getVibeColors(vibe: string = 'forest-wave') {
  const v = (vibe || 'forest-wave').toLowerCase();
  if (v.includes('sunburst')) {
    return {
      bg: '#C77D0A',
      borderOuter: '#5C2800',
      borderInner: '#FDE047',
      primaryText: '#FDE047',
      secondaryText: '#FFFBEB',
      stampBg: '#A16207',
      stampText: '#FDE047',
      photoBoxBg: '#7C2D12',
    };
  }
  if (v.includes('sunset')) {
    return {
      bg: '#BE123C',
      borderOuter: '#4C0519',
      borderInner: '#F5DD3B',
      primaryText: '#F5DD3B',
      secondaryText: '#FFF1F2',
      stampBg: '#9F1239',
      stampText: '#F5DD3B',
      photoBoxBg: '#881337',
    };
  }
  // Default: forest-wave
  return {
    bg: '#163D28',
    borderOuter: '#17251C',
    borderInner: '#F5DD3B',
    primaryText: '#F5DD3B',
    secondaryText: '#F6F0D8',
    stampBg: '#163D28',
    stampText: '#F5DD3B',
    photoBoxBg: '#0F2E1D',
  };
}

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
 * Master Canvas Drawing Engine supporting all 3 Vibes × 5 Formats
 */
async function drawCardOnCanvas(canvas: HTMLCanvasElement, options: RenderOptions): Promise<void> {
  const ctx = canvas.getContext('2d')!;
  const vibeKey = options.vibe || options.frameStyle || 'forest-wave';
  const colors = getVibeColors(vibeKey);
  const fmt = (options.frame || 'portrait').toLowerCase();

  const nameVal = (options.name || 'PRIYANSHU KHARE').toUpperCase();
  const stackVal = (options.stack || 'AI/ML // PYTHON // NEXT.JS').toUpperCase();
  const classVal = (options.builderClass || 'NEURAL NOMAD').toUpperCase();
  const idVal = options.builderId || 'HH-26-0241';
  const imgObj = options.photo ? await loadImage(options.photo) : null;

  // -------------------------------------------------------------
  // FORMAT 01: LANDSCAPE (1600 x 1000)
  // -------------------------------------------------------------
  if (fmt === 'landscape') {
    canvas.width = 1600;
    canvas.height = 1000;

    // Background & Borders
    ctx.fillStyle = colors.bg;
    ctx.fillRect(0, 0, 1600, 1000);

    ctx.strokeStyle = colors.borderOuter;
    ctx.lineWidth = 16;
    ctx.strokeRect(8, 8, 1584, 984);

    ctx.strokeStyle = colors.borderInner;
    ctx.lineWidth = 4;
    ctx.strokeRect(28, 28, 1544, 944);

    // Photo Box Left
    const pSize = 650;
    const pX = 60;
    const pY = 175;

    ctx.fillStyle = colors.photoBoxBg;
    ctx.fillRect(pX, pY, pSize, pSize);
    ctx.strokeStyle = colors.borderOuter;
    ctx.lineWidth = 6;
    ctx.strokeRect(pX, pY, pSize, pSize);

    if (imgObj) {
      ctx.save();
      ctx.beginPath();
      ctx.rect(pX, pY, pSize, pSize);
      ctx.clip();
      ctx.drawImage(imgObj, pX, pY, pSize, pSize);
      ctx.restore();
    }

    // Header Logo Top Left
    ctx.fillStyle = colors.primaryText;
    ctx.font = '900 48px serif';
    ctx.fillText('HH GOA 2026', 60, 115);

    // Right Column Info
    const rX = 760;
    let rY = 250;

    ctx.fillStyle = colors.primaryText;
    ctx.font = '900 64px serif';
    ctx.fillText(nameVal, rX, rY);

    rY += 60;
    ctx.fillStyle = colors.secondaryText;
    ctx.font = '600 30px monospace';
    ctx.fillText(stackVal, rX, rY);

    rY += 65;
    ctx.fillStyle = colors.primaryText;
    ctx.font = '800 36px monospace';
    ctx.fillText(`⚡ ${classVal}`, rX, rY);

    // Right Circular Stamp
    const stampX = 1400;
    const stampY = 320;
    ctx.strokeStyle = colors.borderInner;
    ctx.lineWidth = 5;
    ctx.beginPath();
    ctx.arc(stampX, stampY, 70, 0, Math.PI * 2);
    ctx.stroke();

    ctx.fillStyle = colors.primaryText;
    ctx.font = '800 16px monospace';
    ctx.textAlign = 'center';
    ctx.fillText('BUILDER OF', stampX, stampY - 15);
    ctx.font = '900 italic 28px serif';
    ctx.fillStyle = colors.secondaryText;
    ctx.fillText('GOA 2026', stampX, stampY + 20);
    ctx.textAlign = 'left';

    // Bottom Footer Strip
    const bY = 900;
    ctx.strokeStyle = colors.borderInner;
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(60, bY);
    ctx.lineTo(1540, bY);
    ctx.stroke();

    ctx.fillStyle = colors.secondaryText;
    ctx.font = '800 36px monospace';
    ctx.fillText(idVal, 60, bY + 50);

    // Barcode Right
    let bx = 1200;
    const bars = [4, 2, 6, 2, 4, 8, 2, 4, 2, 6, 4, 2, 8, 2, 4, 6];
    ctx.fillStyle = colors.secondaryText;
    for (const b of bars) {
      ctx.fillRect(bx, bY + 20, b, 40);
      bx += b + 4;
    }
    return;
  }

  // -------------------------------------------------------------
  // FORMAT 03: CIRCLE PFP (1200 x 1200)
  // -------------------------------------------------------------
  if (fmt === 'circle' || fmt === 'pfp') {
    canvas.width = 1200;
    canvas.height = 1200;

    ctx.fillStyle = colors.bg;
    ctx.fillRect(0, 0, 1200, 1200);

    // Outer Circle Ring
    ctx.strokeStyle = colors.borderInner;
    ctx.lineWidth = 16;
    ctx.beginPath();
    ctx.arc(600, 600, 560, 0, Math.PI * 2);
    ctx.stroke();

    // Circular Photo
    const cRadius = 340;
    const cX = 600;
    const cY = 500;

    ctx.save();
    ctx.beginPath();
    ctx.arc(cX, cY, cRadius, 0, Math.PI * 2);
    ctx.clip();
    ctx.fillStyle = colors.photoBoxBg;
    ctx.fillRect(cX - cRadius, cY - cRadius, cRadius * 2, cRadius * 2);

    if (imgObj) {
      ctx.drawImage(imgObj, cX - cRadius, cY - cRadius, cRadius * 2, cRadius * 2);
    }
    ctx.restore();

    ctx.strokeStyle = colors.borderInner;
    ctx.lineWidth = 8;
    ctx.beginPath();
    ctx.arc(cX, cY, cRadius, 0, Math.PI * 2);
    ctx.stroke();

    // Name at Bottom
    ctx.fillStyle = colors.primaryText;
    ctx.font = '900 58px serif';
    ctx.textAlign = 'center';
    ctx.fillText(nameVal, 600, 930);

    ctx.font = '800 32px monospace';
    ctx.fillText(`⚡ ${classVal}`, 600, 990);

    ctx.fillStyle = colors.secondaryText;
    ctx.font = '700 28px monospace';
    ctx.fillText(`HH GOA 2026 · ${idVal}`, 600, 1045);
    ctx.textAlign = 'left';
    return;
  }

  // -------------------------------------------------------------
  // FORMAT 04: ARCH BADGE (1200 x 1500)
  // -------------------------------------------------------------
  if (fmt === 'arch') {
    canvas.width = 1200;
    canvas.height = 1500;

    ctx.fillStyle = colors.bg;
    ctx.fillRect(0, 0, 1200, 1500);

    // Arch Outer Frame
    ctx.strokeStyle = colors.borderInner;
    ctx.lineWidth = 12;
    ctx.beginPath();
    ctx.arc(600, 450, 480, Math.PI, 0, false);
    ctx.lineTo(1080, 1400);
    ctx.lineTo(120, 1400);
    ctx.closePath();
    ctx.stroke();

    // Arch Title Header
    ctx.fillStyle = colors.primaryText;
    ctx.font = '900 54px serif';
    ctx.textAlign = 'center';
    ctx.fillText('HACKER HOUSE GOA', 600, 160);

    // Photo Box Inside Arch
    const pSize = 640;
    const pX = 280;
    const pY = 220;

    ctx.fillStyle = colors.photoBoxBg;
    ctx.fillRect(pX, pY, pSize, pSize);
    ctx.strokeStyle = colors.borderOuter;
    ctx.lineWidth = 6;
    ctx.strokeRect(pX, pY, pSize, pSize);

    if (imgObj) {
      ctx.save();
      ctx.beginPath();
      ctx.rect(pX, pY, pSize, pSize);
      ctx.clip();
      ctx.drawImage(imgObj, pX, pY, pSize, pSize);
      ctx.restore();
    }

    // Name & Details
    const iY = pY + pSize + 90;
    ctx.fillStyle = colors.primaryText;
    ctx.font = '900 62px serif';
    ctx.fillText(nameVal, 600, iY);

    ctx.fillStyle = colors.secondaryText;
    ctx.font = '600 30px monospace';
    ctx.fillText(stackVal, 600, iY + 55);

    ctx.fillStyle = colors.primaryText;
    ctx.font = '800 34px monospace';
    ctx.fillText(`⚡ ${classVal}`, 600, iY + 110);

    ctx.fillStyle = colors.secondaryText;
    ctx.font = '800 36px monospace';
    ctx.fillText(idVal, 600, iY + 165);
    ctx.textAlign = 'left';
    return;
  }

  // -------------------------------------------------------------
  // FORMAT 05: SLIM BADGE (800 x 1600)
  // -------------------------------------------------------------
  if (fmt === 'slim') {
    canvas.width = 800;
    canvas.height = 1600;

    ctx.fillStyle = colors.bg;
    ctx.fillRect(0, 0, 800, 1600);

    ctx.strokeStyle = colors.borderOuter;
    ctx.lineWidth = 14;
    ctx.strokeRect(7, 7, 786, 1586);

    ctx.strokeStyle = colors.borderInner;
    ctx.lineWidth = 4;
    ctx.strokeRect(24, 24, 752, 1552);

    // Slim Header
    ctx.fillStyle = colors.primaryText;
    ctx.font = '900 60px serif';
    ctx.textAlign = 'center';
    ctx.fillText('HH GOA', 400, 120);

    // Photo Box Center
    const pSize = 620;
    const pX = 90;
    const pY = 170;

    ctx.fillStyle = colors.photoBoxBg;
    ctx.fillRect(pX, pY, pSize, pSize);
    ctx.strokeStyle = colors.borderOuter;
    ctx.lineWidth = 6;
    ctx.strokeRect(pX, pY, pSize, pSize);

    if (imgObj) {
      ctx.save();
      ctx.beginPath();
      ctx.rect(pX, pY, pSize, pSize);
      ctx.clip();
      ctx.drawImage(imgObj, pX, pY, pSize, pSize);
      ctx.restore();
    }

    // Name & Details
    let iY = pY + pSize + 85;
    ctx.fillStyle = colors.primaryText;
    ctx.font = '900 52px serif';
    ctx.fillText(nameVal, 400, iY);

    iY += 55;
    ctx.fillStyle = colors.secondaryText;
    ctx.font = '600 24px monospace';
    ctx.fillText(stackVal, 400, iY);

    iY += 60;
    ctx.fillStyle = colors.primaryText;
    ctx.font = '800 30px monospace';
    ctx.fillText(`⚡ ${classVal}`, 400, iY);

    iY += 80;
    ctx.fillStyle = colors.secondaryText;
    ctx.font = '800 38px monospace';
    ctx.fillText(idVal, 400, iY);
    ctx.textAlign = 'left';
    return;
  }

  // -------------------------------------------------------------
  // DEFAULT / FORMAT 01: PORTRAIT (1200 x 1600)
  // -------------------------------------------------------------
  canvas.width = 1200;
  canvas.height = 1600;

  // Background & Borders
  ctx.fillStyle = colors.bg;
  ctx.fillRect(0, 0, 1200, 1600);

  ctx.strokeStyle = colors.borderOuter;
  ctx.lineWidth = 16;
  ctx.strokeRect(8, 8, 1184, 1584);

  ctx.strokeStyle = colors.borderInner;
  ctx.lineWidth = 4;
  ctx.strokeRect(32, 32, 1136, 1536);

  // Logo Header
  ctx.fillStyle = colors.primaryText;
  ctx.font = '900 84px serif';
  ctx.fillText('HH', 70, 140);

  ctx.fillStyle = colors.secondaryText;
  ctx.font = '900 48px serif';
  ctx.fillText('GOA', 70, 200);

  ctx.fillStyle = colors.primaryText;
  ctx.font = '700 32px monospace';
  ctx.fillText('2026', 70, 245);

  // Circular Stamp Top Right
  ctx.fillStyle = colors.primaryText;
  ctx.beginPath();
  ctx.arc(1060, 140, 50, 0, Math.PI * 2);
  ctx.fill();

  ctx.fillStyle = colors.stampBg;
  ctx.font = '800 16px monospace';
  ctx.textAlign = 'center';
  ctx.fillText('BUILDER', 1060, 135);
  ctx.font = '900 italic 20px serif';
  ctx.fillText('GOA', 1060, 155);
  ctx.textAlign = 'left';

  // Photo Frame Box
  const photoSize = 780;
  const photoX = (1200 - photoSize) / 2;
  const photoY = 280;

  ctx.fillStyle = colors.photoBoxBg;
  ctx.fillRect(photoX, photoY, photoSize, photoSize);
  ctx.strokeStyle = colors.borderOuter;
  ctx.lineWidth = 8;
  ctx.strokeRect(photoX, photoY, photoSize, photoSize);

  if (imgObj) {
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

    ctx.drawImage(imgObj, drawX, drawY, drawW, drawH);
    ctx.restore();
  }

  // Name & Details
  const infoY = photoY + photoSize + 90;
  ctx.fillStyle = colors.primaryText;
  ctx.font = '900 68px serif';
  ctx.fillText(nameVal, 70, infoY);

  ctx.fillStyle = colors.secondaryText;
  ctx.font = '600 32px monospace';
  ctx.fillText(stackVal, 70, infoY + 60);

  ctx.fillStyle = colors.primaryText;
  ctx.font = '800 38px monospace';
  ctx.fillText(`⚡ ${classVal}`, 70, infoY + 115);

  // Circular Stamp Right
  const stampX = 1040;
  const stampY = infoY + 40;
  ctx.strokeStyle = colors.borderInner;
  ctx.lineWidth = 6;
  ctx.beginPath();
  ctx.arc(stampX, stampY, 75, 0, Math.PI * 2);
  ctx.stroke();

  ctx.fillStyle = colors.primaryText;
  ctx.font = '800 18px monospace';
  ctx.textAlign = 'center';
  ctx.fillText('BUILDER OF', stampX, stampY - 20);
  ctx.font = '900 italic 32px serif';
  ctx.fillStyle = colors.secondaryText;
  ctx.fillText('GOA', stampX, stampY + 10);
  ctx.font = '700 18px monospace';
  ctx.fillStyle = colors.primaryText;
  ctx.fillText('2026', stampX, stampY + 38);
  ctx.textAlign = 'left';

  // Bottom Line & Barcode
  const bottomY = 1500;
  ctx.strokeStyle = colors.borderInner;
  ctx.lineWidth = 2;
  ctx.beginPath();
  ctx.moveTo(70, bottomY);
  ctx.lineTo(1130, bottomY);
  ctx.stroke();

  ctx.fillStyle = colors.secondaryText;
  ctx.font = '800 44px monospace';
  ctx.fillText(idVal, 70, bottomY + 50);

  let barcodeX = 880;
  const bars = [4, 2, 6, 2, 4, 8, 2, 4, 2, 6, 4, 2, 8, 2, 4, 6];
  ctx.fillStyle = colors.secondaryText;
  for (const b of bars) {
    ctx.fillRect(barcodeX, bottomY + 15, b, 45);
    barcodeX += b + 4;
  }
}

/**
 * Render ID Card to Data URL
 */
export async function renderIDCard(options: RenderOptions): Promise<string> {
  const canvas = document.createElement('canvas');
  await drawCardOnCanvas(canvas, options);
  const targetFormat = (options.format || 'png').toLowerCase();
  const mimeType = targetFormat === 'jpg' || targetFormat === 'jpeg' ? 'image/jpeg' : 'image/png';
  return canvas.toDataURL(mimeType, 0.95);
}

/**
 * Direct binary export pipeline with showSaveFilePicker & magic signature checks.
 * Formats clean filenames: HH-GOA-2026-[NAME].png or HH-GOA-2026-[NAME].jpg
 */
export async function exportIDCard(
  options: RenderOptions,
  format: 'png' | 'jpg' = 'png'
): Promise<void> {
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

  // 2. Render canvas dynamically
  const canvas = document.createElement('canvas');
  await drawCardOnCanvas(canvas, options);

  // 3. Convert to binary Blob
  const dataUrl = canvas.toDataURL(mimeType, 0.95);
  const parts = dataUrl.split(';base64,');
  const raw = window.atob(parts[1]);
  const uInt8Array = new Uint8Array(raw.length);
  for (let i = 0; i < raw.length; i++) {
    uInt8Array[i] = raw.charCodeAt(i);
  }

  const blob = new Blob([uInt8Array], { type: mimeType });

  // 4. Magic byte signature check
  const sig = await validateImageBinary(blob, ext as 'png' | 'jpg');
  console.log(`[Export Diagnostic]: Filename=${filename}, Size=${blob.size} bytes, ValidSignature=${sig.valid}, DetectedFormat=${sig.detectedFormat}, MagicHex=${sig.signatureHex}`);

  if (!sig.valid) {
    throw new Error(`[Export Failed]: Magic byte signature validation failed for ${filename}`);
  }

  // 5. Native File System Access API (showSaveFilePicker)
  if (typeof window !== 'undefined' && 'showSaveFilePicker' in window) {
    try {
      const handle = await (window as any).showSaveFilePicker({
        suggestedName: filename,
        types: [
          {
            description: isJpeg ? 'JPEG Image (*.jpg)' : 'PNG Image (*.png)',
            accept: { [mimeType]: [`.${ext}`] },
          },
        ],
      });
      const writable = await handle.createWritable();
      await writable.write(blob);
      await writable.close();
      return;
    } catch (pickerErr: any) {
      if (pickerErr.name === 'AbortError') return;
    }
  }

  // 6. Anchor download fallback
  const blobUrl = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.style.display = 'none';
  a.href = blobUrl;
  a.download = filename;
  a.setAttribute('download', filename);
  document.body.appendChild(a);
  a.click();

  setTimeout(() => {
    if (document.body.contains(a)) document.body.removeChild(a);
    URL.revokeObjectURL(blobUrl);
  }, 5000);
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
