// ============================================================
// HACKER HOUSE GOA 2026 — High Resolution Canvas Renderer
// Renders dynamic Builder ID cards for all 3 Vibes × 5 Frame Formats
// 100% Match to Official Reference Image Matrix (3 Vibes × 5 Formats)
// ============================================================

export interface RenderOptions {
  photo: string | null;
  name: string;
  stack: string;
  builderClass: string;
  builderId: string;
  vibe?: string; // 'forest-wave' | 'sunburst' | 'sunset-pink'
  frame?: string; // 'portrait' | 'landscape' | 'circle' | 'arch' | 'slim'
  teamName?: string;
  frameStyle?: string;
  zoom?: number;
  position?: { x: number; y: number };
  format?: 'png' | 'jpg' | 'jpeg';
}

/**
 * Synchronously retrieves current builder identity configuration from storage
 * to guarantee zero stale state on first generate click.
 */
export function getCurrentBuilderOptions(): RenderOptions {
  if (typeof window === 'undefined') {
    return {
      name: 'PRIYANSHU KHARE',
      stack: 'PYTHON // NEXT.JS',
      builderClass: 'DATA DRIFTER',
      photo: '/builder-solo.png',
      builderId: 'HH-26-7407',
      vibe: 'forest-wave',
      frame: 'portrait',
    };
  }

  const name = localStorage.getItem('hh_builder_name') || 'PRIYANSHU KHARE';
  const stack = localStorage.getItem('hh_builder_stack') || 'PYTHON // NEXT.JS';
  const builderClass = localStorage.getItem('hh_builder_class') || 'DATA DRIFTER';
  const photo = localStorage.getItem('hh_builder_photo') || '/builder-solo.png';
  const vibe = localStorage.getItem('hh_builder_palette') || 'forest-wave';
  const frame = localStorage.getItem('hh_builder_format') || 'portrait';

  let builderId = localStorage.getItem('hh_builder_id');
  if (!builderId) {
    const randSuffix = Math.floor(1000 + Math.random() * 9000).toString();
    builderId = `HH-26-${randSuffix}`;
    localStorage.setItem('hh_builder_id', builderId);
  }

  return {
    name,
    stack,
    builderClass,
    photo,
    builderId,
    vibe,
    frame,
  };
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
  // Default: forest-wave (REFERENCE UNTOUCHED)
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

/**
 * Draws vintage print stipple texture overlay
 */
function drawVintagePrintTexture(ctx: CanvasRenderingContext2D, width: number, height: number) {
  ctx.save();
  ctx.fillStyle = 'rgba(23, 37, 28, 0.04)';
  for (let x = 0; x < width; x += 12) {
    for (let y = 0; y < height; y += 12) {
      if ((x * 7 + y * 13) % 5 === 0) {
        ctx.fillRect(x, y, 2, 2);
      }
    }
  }
  ctx.restore();
}

/**
 * Draws Goan Palm Tree Silhouette Art
 */
function drawPalmTreeArt(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  scale: number = 1,
  color: string = 'rgba(15, 46, 29, 0.55)'
) {
  ctx.save();
  ctx.translate(x, y);
  ctx.scale(scale, scale);
  ctx.fillStyle = color;
  ctx.strokeStyle = color;
  ctx.lineWidth = 10;

  // Curved Trunk
  ctx.beginPath();
  ctx.moveTo(0, 0);
  ctx.quadraticCurveTo(30, -120, 25, -240);
  ctx.stroke();

  // Palm Fronds
  const angles = [-0.85, -0.45, 0, 0.45, 0.85, 1.2, -1.2];
  for (const a of angles) {
    ctx.save();
    ctx.translate(25, -240);
    ctx.rotate(a);
    ctx.beginPath();
    ctx.moveTo(0, 0);
    ctx.quadraticCurveTo(60, -30, 120, 20);
    ctx.quadraticCurveTo(60, 20, 0, 0);
    ctx.fill();
    ctx.restore();
  }
  ctx.restore();
}

/**
 * Draws Goan Beach Ocean Scene (Waves, Horizon & Small Sailboat)
 */
function drawGoaOceanBeachScene(
  ctx: CanvasRenderingContext2D,
  width: number,
  height: number,
  waveColor: string,
  boatColor: string
) {
  ctx.save();
  const oceanY = height * 0.72;

  // Ocean Horizon Water Fill
  ctx.fillStyle = waveColor;
  ctx.fillRect(0, oceanY, width, height - oceanY);

  // Ocean Wave Lines
  ctx.strokeStyle = 'rgba(245, 221, 59, 0.25)';
  ctx.lineWidth = 3;
  for (let y = oceanY + 20; y < height; y += 40) {
    ctx.beginPath();
    ctx.moveTo(0, y);
    ctx.bezierCurveTo(width * 0.25, y - 15, width * 0.5, y + 15, width * 0.75, y - 10);
    ctx.bezierCurveTo(width * 0.85, y - 5, width * 0.95, y + 5, width, y);
    ctx.stroke();
  }

  // Small Vintage Goan Sailboat Silhouette on Water
  const boatX = width * 0.75;
  const boatY = oceanY + 30;
  ctx.fillStyle = boatColor;
  ctx.beginPath();
  ctx.ellipse(boatX, boatY, 25, 8, 0, 0, Math.PI);
  ctx.fill();

  // Sail
  ctx.beginPath();
  ctx.moveTo(boatX, boatY - 4);
  ctx.lineTo(boatX + 15, boatY - 35);
  ctx.lineTo(boatX - 5, boatY - 35);
  ctx.closePath();
  ctx.fill();

  ctx.restore();
}

/**
 * Render Vibe-Specific Background Artworks matching Reference Image Matrix
 */
function drawVibeBackground(
  ctx: CanvasRenderingContext2D,
  width: number,
  height: number,
  vibe: string,
  colors: ReturnType<typeof getVibeColors>
) {
  const v = (vibe || 'forest-wave').toLowerCase();

  // 1. FOREST WAVE: Deep Goa Forest Green + Waves + Palms + Sailboat
  if (v.includes('forest')) {
    ctx.fillStyle = colors.bg;
    ctx.fillRect(0, 0, width, height);

    drawGoaOceanBeachScene(ctx, width, height, '#0F2E1D', 'rgba(245, 221, 59, 0.5)');

    // Goan Palm Trees Artwork
    drawPalmTreeArt(ctx, 60, height, 1.3, 'rgba(15, 46, 29, 0.6)');
    drawPalmTreeArt(ctx, width - 120, height, 1.4, 'rgba(15, 46, 29, 0.6)');
    drawVintagePrintTexture(ctx, width, height);
    return;
  }

  // 2. SUNBURST: Warm Golden Sunset + Sun Disk + Rays + Palms + Sailboat
  if (v.includes('sunburst')) {
    const grad = ctx.createLinearGradient(0, 0, width, height);
    grad.addColorStop(0, '#EA580C');
    grad.addColorStop(0.5, '#C77D0A');
    grad.addColorStop(1, '#92400E');
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, width, height);

    // 24 Radiating Golden Sunburst Rays
    const centerX = width / 2;
    const centerY = height * 0.35;
    const rayCount = 24;
    const angleStep = (Math.PI * 2) / rayCount;

    for (let i = 0; i < rayCount; i += 2) {
      const startAngle = i * angleStep;
      const endAngle = (i + 1) * angleStep;

      ctx.fillStyle = i % 4 === 0 ? 'rgba(254, 240, 138, 0.28)' : 'rgba(253, 224, 71, 0.14)';
      ctx.beginPath();
      ctx.moveTo(centerX, centerY);
      ctx.arc(centerX, centerY, Math.max(width, height) * 1.5, startAngle, endAngle);
      ctx.closePath();
      ctx.fill();
    }

    // Sun Disk Glow
    const sunGrad = ctx.createRadialGradient(centerX, centerY, 20, centerX, centerY, 300);
    sunGrad.addColorStop(0, 'rgba(254, 240, 138, 0.45)');
    sunGrad.addColorStop(1, 'rgba(199, 125, 10, 0)');
    ctx.fillStyle = sunGrad;
    ctx.beginPath();
    ctx.arc(centerX, centerY, 300, 0, Math.PI * 2);
    ctx.fill();

    drawGoaOceanBeachScene(ctx, width, height, '#7C2D12', 'rgba(253, 224, 71, 0.6)');

    // Goan Palm Trees Silhouettes
    drawPalmTreeArt(ctx, 70, height, 1.2, 'rgba(92, 40, 14, 0.65)');
    drawPalmTreeArt(ctx, width - 100, height, 1.3, 'rgba(92, 40, 14, 0.65)');
    drawVintagePrintTexture(ctx, width, height);
    return;
  }

  // 3. SUNSET PINK: Muted Coral Sunset + Sun Arc + Stars + Palms + Sailboat
  if (v.includes('sunset')) {
    const grad = ctx.createLinearGradient(0, 0, 0, height);
    grad.addColorStop(0, '#F43F5E');
    grad.addColorStop(0.5, '#BE123C');
    grad.addColorStop(1, '#581C87');
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, width, height);

    // Sunset Sun Horizon Glow Arc
    const sunGrad = ctx.createRadialGradient(width / 2, height * 0.72, 60, width / 2, height * 0.72, 500);
    sunGrad.addColorStop(0, 'rgba(253, 224, 71, 0.45)');
    sunGrad.addColorStop(1, 'rgba(190, 18, 60, 0)');
    ctx.fillStyle = sunGrad;
    ctx.beginPath();
    ctx.arc(width / 2, height * 0.72, 500, 0, Math.PI * 2);
    ctx.fill();

    // Starry Sky Sparkles
    ctx.fillStyle = 'rgba(255, 241, 242, 0.85)';
    const stars = [
      { x: width * 0.12, y: height * 0.12, r: 3.5 },
      { x: width * 0.85, y: height * 0.08, r: 4.5 },
      { x: width * 0.88, y: height * 0.22, r: 2.5 },
      { x: width * 0.08, y: height * 0.3, r: 4 },
      { x: width * 0.78, y: height * 0.38, r: 3 },
    ];
    for (const star of stars) {
      ctx.beginPath();
      ctx.arc(star.x, star.y, star.r, 0, Math.PI * 2);
      ctx.fill();
    }

    drawGoaOceanBeachScene(ctx, width, height, '#4C0519', 'rgba(245, 221, 59, 0.6)');

    // Goan Palm Silhouettes
    drawPalmTreeArt(ctx, 60, height, 1.2, 'rgba(76, 5, 25, 0.65)');
    drawPalmTreeArt(ctx, width - 110, height, 1.35, 'rgba(76, 5, 25, 0.65)');
    drawVintagePrintTexture(ctx, width, height);
    return;
  }

  ctx.fillStyle = colors.bg;
  ctx.fillRect(0, 0, width, height);
  drawVintagePrintTexture(ctx, width, height);
}

/**
 * Draws Builder ID Pill Badge
 */
function drawBuilderIdPill(
  ctx: CanvasRenderingContext2D,
  idText: string,
  x: number,
  y: number,
  w: number,
  h: number,
  colors: ReturnType<typeof getVibeColors>
) {
  ctx.save();
  ctx.fillStyle = colors.photoBoxBg;
  ctx.fillRect(x, y, w, h);
  ctx.strokeStyle = colors.borderInner;
  ctx.lineWidth = 2;
  ctx.strokeRect(x, y, w, h);

  ctx.fillStyle = colors.primaryText;
  ctx.font = '800 28px monospace';
  ctx.textAlign = 'center';
  ctx.fillText(idText, x + w / 2, y + h / 2 + 9);
  ctx.textAlign = 'left';
  ctx.restore();
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
 * -------------------------------------------------------------
 * TEMPLATE 01: PORTRAIT (1200 x 1600) — Matching Reference Matrix
 * -------------------------------------------------------------
 */
async function renderPortraitTemplate(
  canvas: HTMLCanvasElement,
  ctx: CanvasRenderingContext2D,
  options: RenderOptions,
  vibeKey: string,
  colors: ReturnType<typeof getVibeColors>
) {
  canvas.width = 1200;
  canvas.height = 1600;

  drawVibeBackground(ctx, 1200, 1600, vibeKey, colors);

  // Outer & Inner Borders
  ctx.strokeStyle = colors.borderOuter;
  ctx.lineWidth = 16;
  ctx.strokeRect(8, 8, 1184, 1584);

  ctx.strokeStyle = colors.borderInner;
  ctx.lineWidth = 4;
  ctx.strokeRect(32, 32, 1136, 1536);

  // Logo Header Left
  ctx.fillStyle = colors.primaryText;
  ctx.font = '900 76px serif';
  ctx.fillText('HH', 70, 145);

  ctx.fillStyle = colors.secondaryText;
  ctx.font = '900 44px serif';
  ctx.fillText('GOA', 70, 205);

  ctx.fillStyle = colors.primaryText;
  ctx.font = '700 28px monospace';
  ctx.fillText('2026', 70, 245);

  // Circular Stamp Top Right
  const topStampX = 1060;
  const topStampY = 150;
  ctx.fillStyle = colors.primaryText;
  ctx.beginPath();
  ctx.arc(topStampX, topStampY, 55, 0, Math.PI * 2);
  ctx.fill();

  ctx.fillStyle = colors.stampBg;
  ctx.font = '800 16px monospace';
  ctx.textAlign = 'center';
  ctx.fillText('BUILDER', topStampX, topStampY - 6);
  ctx.font = '900 italic 22px serif';
  ctx.fillText('GOA 2026', topStampX, topStampY + 18);
  ctx.textAlign = 'left';

  // Photo Frame Box
  const photoSize = 740;
  const photoX = (1200 - photoSize) / 2;
  const photoY = 270;

  ctx.fillStyle = colors.photoBoxBg;
  ctx.fillRect(photoX, photoY, photoSize, photoSize);
  ctx.strokeStyle = colors.borderOuter;
  ctx.lineWidth = 8;
  ctx.strokeRect(photoX, photoY, photoSize, photoSize);

  const imgObj = options.photo ? await loadImage(options.photo) : null;
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
  const infoY = photoY + photoSize + 85;
  ctx.fillStyle = colors.primaryText;
  ctx.font = '900 64px serif';
  ctx.fillText((options.name || 'PRIYANSHU KHARE').toUpperCase(), 70, infoY);

  ctx.fillStyle = colors.secondaryText;
  ctx.font = '700 28px monospace';
  ctx.fillText(`BUILDER ⚡ ${(options.builderClass || 'DATA DRIFTER').toUpperCase()}`, 70, infoY + 55);

  ctx.fillStyle = colors.primaryText;
  ctx.font = '600 26px monospace';
  ctx.fillText((options.stack || 'PYTHON // NEXT.JS').toUpperCase(), 70, infoY + 105);

  // Builder ID Pill Badge
  drawBuilderIdPill(ctx, options.builderId || 'HH-26-7407', 70, infoY + 130, 260, 50, colors);

  // Barcode Bottom
  const bottomY = 1530;
  let barcodeX = 70;
  const bars = [4, 2, 6, 2, 4, 8, 2, 4, 2, 6, 4, 2, 8, 2, 4, 6, 4, 2, 8, 4];
  ctx.fillStyle = colors.secondaryText;
  for (const b of bars) {
    ctx.fillRect(barcodeX, bottomY - 30, b, 40);
    barcodeX += b + 4;
  }
}

/**
 * -------------------------------------------------------------
 * TEMPLATE 02: LANDSCAPE (1600 x 1000) — Matching Reference Matrix
 * -------------------------------------------------------------
 */
async function renderLandscapeTemplate(
  canvas: HTMLCanvasElement,
  ctx: CanvasRenderingContext2D,
  options: RenderOptions,
  vibeKey: string,
  colors: ReturnType<typeof getVibeColors>
) {
  canvas.width = 1600;
  canvas.height = 1000;

  drawVibeBackground(ctx, 1600, 1000, vibeKey, colors);

  ctx.strokeStyle = colors.borderOuter;
  ctx.lineWidth = 16;
  ctx.strokeRect(8, 8, 1584, 984);

  ctx.strokeStyle = colors.borderInner;
  ctx.lineWidth = 4;
  ctx.strokeRect(28, 28, 1544, 944);

  // Top Left Header
  ctx.fillStyle = colors.primaryText;
  ctx.font = '900 48px serif';
  ctx.fillText('HH GOA 2026', 80, 120);

  // Photo Box Left
  const pSize = 560;
  const pX = 80;
  const pY = 150;

  ctx.fillStyle = colors.photoBoxBg;
  ctx.fillRect(pX, pY, pSize, pSize);
  ctx.strokeStyle = colors.borderOuter;
  ctx.lineWidth = 6;
  ctx.strokeRect(pX, pY, pSize, pSize);

  const imgObj = options.photo ? await loadImage(options.photo) : null;
  if (imgObj) {
    ctx.save();
    ctx.beginPath();
    ctx.rect(pX, pY, pSize, pSize);
    ctx.clip();
    ctx.drawImage(imgObj, pX, pY, pSize, pSize);
    ctx.restore();
  }

  // Right Column Info
  const rX = 700;

  ctx.fillStyle = colors.primaryText;
  ctx.font = '900 66px serif';
  ctx.fillText((options.name || 'PRIYANSHU KHARE').toUpperCase(), rX, 230);

  ctx.fillStyle = colors.secondaryText;
  ctx.font = '700 28px monospace';
  ctx.fillText(`BUILDER ⚡ ${(options.builderClass || 'DATA DRIFTER').toUpperCase()}`, rX, 300);

  ctx.fillStyle = colors.primaryText;
  ctx.font = '600 26px monospace';
  ctx.fillText((options.stack || 'PYTHON // NEXT.JS').toUpperCase(), rX, 360);

  // Builder ID Pill Badge
  drawBuilderIdPill(ctx, options.builderId || 'HH-26-7407', rX, 395, 260, 50, colors);

  // Right Circular Stamp
  const stampX = 1320;
  const stampY = 470;
  ctx.strokeStyle = colors.borderInner;
  ctx.lineWidth = 5;
  ctx.beginPath();
  ctx.arc(stampX, stampY, 75, 0, Math.PI * 2);
  ctx.stroke();

  ctx.fillStyle = colors.primaryText;
  ctx.font = '800 18px monospace';
  ctx.textAlign = 'center';
  ctx.fillText('BUILDER OF', stampX, stampY - 15);
  ctx.font = '900 italic 30px serif';
  ctx.fillStyle = colors.secondaryText;
  ctx.fillText('GOA 2026', stampX, stampY + 22);
  ctx.textAlign = 'left';

  // Bottom Footer Bar
  const bY = 850;
  ctx.strokeStyle = colors.borderInner;
  ctx.lineWidth = 2;
  ctx.beginPath();
  ctx.moveTo(80, bY);
  ctx.lineTo(1520, bY);
  ctx.stroke();

  ctx.fillStyle = colors.secondaryText;
  ctx.font = '700 24px monospace';
  ctx.fillText('GOA, INDIA · 28—31 OCT 2026', 80, bY + 55);

  let bx = 1180;
  const bars = [4, 2, 6, 2, 4, 8, 2, 4, 2, 6, 4, 2, 8, 2, 4, 6];
  ctx.fillStyle = colors.secondaryText;
  for (const b of bars) {
    ctx.fillRect(bx, bY + 20, b, 45);
    bx += b + 4;
  }
}

/**
 * -------------------------------------------------------------
 * TEMPLATE 03: CIRCLE PFP (1200 x 1200 Circular Clipped Profile)
 * -------------------------------------------------------------
 */
async function renderCirclePFPTemplate(
  canvas: HTMLCanvasElement,
  ctx: CanvasRenderingContext2D,
  options: RenderOptions,
  vibeKey: string,
  colors: ReturnType<typeof getVibeColors>
) {
  canvas.width = 1200;
  canvas.height = 1200;

  // Clip Canvas into ACTUAL CIRCLE
  ctx.save();
  ctx.beginPath();
  ctx.arc(600, 600, 580, 0, Math.PI * 2);
  ctx.clip();

  drawVibeBackground(ctx, 1200, 1200, vibeKey, colors);

  // Outer Gold Border Ring
  ctx.strokeStyle = colors.borderInner;
  ctx.lineWidth = 18;
  ctx.beginPath();
  ctx.arc(600, 600, 560, 0, Math.PI * 2);
  ctx.stroke();

  // Top Center Arc Header
  ctx.fillStyle = colors.primaryText;
  ctx.font = '900 42px serif';
  ctx.textAlign = 'center';
  ctx.fillText('HH GOA 2026', 600, 130);

  // Center Circular Photo Box
  const cRadius = 300;
  const cX = 600;
  const cY = 500;

  const imgObj = options.photo ? await loadImage(options.photo) : null;
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

  // Name & Class
  ctx.fillStyle = colors.primaryText;
  ctx.font = '900 58px serif';
  ctx.textAlign = 'center';
  ctx.fillText((options.name || 'PRIYANSHU KHARE').toUpperCase(), 600, 890);

  ctx.fillStyle = colors.secondaryText;
  ctx.font = '700 26px monospace';
  ctx.fillText(`BUILDER ⚡ ${(options.builderClass || 'DATA DRIFTER').toUpperCase()}`, 600, 945);

  ctx.fillStyle = colors.primaryText;
  ctx.font = '600 24px monospace';
  ctx.fillText((options.stack || 'PYTHON // NEXT.JS').toUpperCase(), 600, 990);

  // Builder ID Pill Badge
  drawBuilderIdPill(ctx, options.builderId || 'HH-26-7407', 600 - 130, 1015, 260, 48, colors);

  ctx.textAlign = 'left';
  ctx.restore();
}

/**
 * -------------------------------------------------------------
 * TEMPLATE 04: ARCH BADGE (1200 x 1500 Arch Shaped Badge)
 * -------------------------------------------------------------
 */
async function renderArchBadgeTemplate(
  canvas: HTMLCanvasElement,
  ctx: CanvasRenderingContext2D,
  options: RenderOptions,
  vibeKey: string,
  colors: ReturnType<typeof getVibeColors>
) {
  canvas.width = 1200;
  canvas.height = 1500;

  // Clip Canvas into ACTUAL ARCH SHAPE
  ctx.save();
  ctx.beginPath();
  ctx.arc(600, 460, 460, Math.PI, 0, false);
  ctx.lineTo(1060, 1420);
  ctx.lineTo(140, 1420);
  ctx.closePath();
  ctx.clip();

  drawVibeBackground(ctx, 1200, 1500, vibeKey, colors);

  // Outer Arch Border
  ctx.strokeStyle = colors.borderInner;
  ctx.lineWidth = 14;
  ctx.stroke();

  // Arch Header Text
  ctx.fillStyle = colors.primaryText;
  ctx.font = '900 56px serif';
  ctx.textAlign = 'center';
  ctx.fillText('HH GOA 2026', 600, 150);

  // Photo Box Inside Arch
  const pSize = 560;
  const pX = 320;
  const pY = 220;

  ctx.fillStyle = colors.photoBoxBg;
  ctx.fillRect(pX, pY, pSize, pSize);
  ctx.strokeStyle = colors.borderOuter;
  ctx.lineWidth = 6;
  ctx.strokeRect(pX, pY, pSize, pSize);

  const imgObj = options.photo ? await loadImage(options.photo) : null;
  if (imgObj) {
    ctx.save();
    ctx.beginPath();
    ctx.rect(pX, pY, pSize, pSize);
    ctx.clip();
    ctx.drawImage(imgObj, pX, pY, pSize, pSize);
    ctx.restore();
  }

  // Right Circular Stamp
  const stampX = 940;
  const stampY = 650;
  ctx.strokeStyle = colors.borderInner;
  ctx.lineWidth = 4;
  ctx.beginPath();
  ctx.arc(stampX, stampY, 55, 0, Math.PI * 2);
  ctx.stroke();

  ctx.fillStyle = colors.primaryText;
  ctx.font = '800 14px monospace';
  ctx.textAlign = 'center';
  ctx.fillText('BUILDER OF', stampX, stampY - 10);
  ctx.font = '900 italic 22px serif';
  ctx.fillStyle = colors.secondaryText;
  ctx.fillText('GOA 2026', stampX, stampY + 16);

  // Name & Details
  ctx.fillStyle = colors.primaryText;
  ctx.font = '900 62px serif';
  ctx.textAlign = 'center';
  ctx.fillText((options.name || 'PRIYANSHU KHARE').toUpperCase(), 600, 870);

  ctx.fillStyle = colors.secondaryText;
  ctx.font = '700 28px monospace';
  ctx.fillText(`BUILDER ⚡ ${(options.builderClass || 'DATA DRIFTER').toUpperCase()}`, 600, 930);

  ctx.fillStyle = colors.primaryText;
  ctx.font = '600 26px monospace';
  ctx.fillText((options.stack || 'PYTHON // NEXT.JS').toUpperCase(), 600, 980);

  // Builder ID Pill Badge
  drawBuilderIdPill(ctx, options.builderId || 'HH-26-7407', 600 - 130, 1010, 260, 50, colors);

  // Barcode Bottom
  const bottomY = 1380;
  let barcodeX = 350;
  const bars = [4, 2, 6, 2, 4, 8, 2, 4, 2, 6, 4, 2, 8, 2, 4, 6, 4, 2, 8, 4];
  ctx.fillStyle = colors.secondaryText;
  for (const b of bars) {
    ctx.fillRect(barcodeX, bottomY - 30, b, 40);
    barcodeX += b + 4;
  }

  ctx.textAlign = 'left';
  ctx.restore();
}

/**
 * -------------------------------------------------------------
 * TEMPLATE 05: SLIM BADGE (1600 x 600 Narrow Horizontal Badge)
 * -------------------------------------------------------------
 */
async function renderSlimBadgeTemplate(
  canvas: HTMLCanvasElement,
  ctx: CanvasRenderingContext2D,
  options: RenderOptions,
  vibeKey: string,
  colors: ReturnType<typeof getVibeColors>
) {
  canvas.width = 1600;
  canvas.height = 600;

  drawVibeBackground(ctx, 1600, 600, vibeKey, colors);

  ctx.strokeStyle = colors.borderOuter;
  ctx.lineWidth = 14;
  ctx.strokeRect(7, 7, 1586, 586);

  ctx.strokeStyle = colors.borderInner;
  ctx.lineWidth = 4;
  ctx.strokeRect(24, 24, 1552, 552);

  // Photo Box Left
  const pSize = 420;
  const pX = 60;
  const pY = 90;

  ctx.fillStyle = colors.photoBoxBg;
  ctx.fillRect(pX, pY, pSize, pSize);
  ctx.strokeStyle = colors.borderOuter;
  ctx.lineWidth = 6;
  ctx.strokeRect(pX, pY, pSize, pSize);

  const imgObj = options.photo ? await loadImage(options.photo) : null;
  if (imgObj) {
    ctx.save();
    ctx.beginPath();
    ctx.rect(pX, pY, pSize, pSize);
    ctx.clip();
    ctx.drawImage(imgObj, pX, pY, pSize, pSize);
    ctx.restore();
  }

  // Center Column Info
  const rX = 520;

  ctx.fillStyle = colors.primaryText;
  ctx.font = '900 58px serif';
  ctx.fillText((options.name || 'PRIYANSHU KHARE').toUpperCase(), rX, 170);

  ctx.fillStyle = colors.secondaryText;
  ctx.font = '700 26px monospace';
  ctx.fillText(`BUILDER ⚡ ${(options.builderClass || 'DATA DRIFTER').toUpperCase()}`, rX, 230);

  ctx.fillStyle = colors.primaryText;
  ctx.font = '600 24px monospace';
  ctx.fillText((options.stack || 'PYTHON // NEXT.JS').toUpperCase(), rX, 280);

  // Builder ID Pill Badge
  drawBuilderIdPill(ctx, options.builderId || 'HH-26-7407', rX, 310, 240, 48, colors);

  // Right Circular Stamp & Barcode
  const stampX = 1380;
  const stampY = 240;
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

  let bx = 1150;
  const bars = [4, 2, 6, 2, 4, 8, 2, 4, 2, 6, 4, 2, 8, 2, 4, 6];
  ctx.fillStyle = colors.secondaryText;
  for (const b of bars) {
    ctx.fillRect(bx, 440, b, 45);
    bx += b + 4;
  }
}

/**
 * Master Canvas Routing Engine
 */
async function drawCardOnCanvas(canvas: HTMLCanvasElement, options: RenderOptions): Promise<void> {
  const ctx = canvas.getContext('2d')!;
  const vibeKey = options.vibe || options.frameStyle || 'forest-wave';
  const colors = getVibeColors(vibeKey);
  const fmt = (options.frame || 'portrait').toLowerCase();

  if (fmt === 'landscape') {
    await renderLandscapeTemplate(canvas, ctx, options, vibeKey, colors);
    return;
  }
  if (fmt === 'circle' || fmt === 'pfp') {
    await renderCirclePFPTemplate(canvas, ctx, options, vibeKey, colors);
    return;
  }
  if (fmt === 'arch') {
    await renderArchBadgeTemplate(canvas, ctx, options, vibeKey, colors);
    return;
  }
  if (fmt === 'slim') {
    await renderSlimBadgeTemplate(canvas, ctx, options, vibeKey, colors);
    return;
  }

  // Default: Portrait Template
  await renderPortraitTemplate(canvas, ctx, options, vibeKey, colors);
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
