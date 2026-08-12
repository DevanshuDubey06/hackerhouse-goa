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
  const savedVibe = localStorage.getItem('hh_builder_palette');
  const vibe = normalizeVibeKey(savedVibe || 'forest-wave');
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

function normalizeVibeKey(vibe: string | undefined): string {
  const key = (vibe || 'forest-wave').toLowerCase().trim();
  return key.includes('sunburest') ? key.replace(/sunburest/g, 'sunburst') : key;
}

function getVibeColors(vibe: string = 'forest-wave') {
  const v = normalizeVibeKey(vibe);
  if (v.includes('sunburst')) {
    return {
      bg: '#3B1306',
      borderOuter: '#1A0802',
      borderInner: '#FFD700',
      primaryText: '#FFE566',
      secondaryText: '#FFF5D6',
      stampBg: '#2A0B03',
      stampText: '#FFD700',
      photoBoxBg: '#1C0802',
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
  const v = normalizeVibeKey(vibe);

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

  // 2. SUNBURST: Warm Golden Sunset + Sun Disk + Rays + Palms + Sailboat (High Text Contrast)
  if (v.includes('sunburst')) {
    const grad = ctx.createLinearGradient(0, 0, width, height);
    grad.addColorStop(0, '#3B1306');
    grad.addColorStop(0.5, '#6E2208');
    grad.addColorStop(1, '#210A03');
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, width, height);

    // 24 Radiating Golden Sunburst Rays on dark mahogany
    const centerX = width / 2;
    const centerY = height * 0.35;
    const rayCount = 24;
    const angleStep = (Math.PI * 2) / rayCount;

    for (let i = 0; i < rayCount; i += 2) {
      const startAngle = i * angleStep;
      const endAngle = (i + 1) * angleStep;

      ctx.fillStyle = i % 4 === 0 ? 'rgba(255, 215, 0, 0.16)' : 'rgba(255, 180, 0, 0.08)';
      ctx.beginPath();
      ctx.moveTo(centerX, centerY);
      ctx.arc(centerX, centerY, Math.max(width, height) * 1.5, startAngle, endAngle);
      ctx.closePath();
      ctx.fill();
    }

    // Sun Disk Glow
    const sunGrad = ctx.createRadialGradient(centerX, centerY, 20, centerX, centerY, 300);
    sunGrad.addColorStop(0, 'rgba(255, 215, 0, 0.28)');
    sunGrad.addColorStop(1, 'rgba(59, 19, 6, 0)');
    ctx.fillStyle = sunGrad;
    ctx.beginPath();
    ctx.arc(centerX, centerY, 300, 0, Math.PI * 2);
    ctx.fill();

    drawGoaOceanBeachScene(ctx, width, height, '#1C0802', 'rgba(255, 215, 0, 0.65)');

    // Goan Palm Trees Silhouettes
    drawPalmTreeArt(ctx, 70, height, 1.2, 'rgba(26, 8, 2, 0.7)');
    drawPalmTreeArt(ctx, width - 100, height, 1.3, 'rgba(26, 8, 2, 0.7)');
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

const FONT_DISPLAY = '"Bodoni Moda", "Syne", "Space Grotesk", Georgia, serif';
const FONT_MONO = '"IBM Plex Mono", "JetBrains Mono", "SFMono-Regular", Consolas, monospace';

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
  colors: ReturnType<typeof getVibeColors>,
  align: CanvasTextAlign = 'left'
) {
  ctx.save();
  const drawX = align === 'center' ? x - w / 2 : align === 'right' ? x - w : x;

  ctx.fillStyle = colors.photoBoxBg;
  ctx.fillRect(drawX, y, w, h);
  ctx.strokeStyle = colors.borderInner;
  ctx.lineWidth = 2;
  ctx.strokeRect(drawX, y, w, h);

  const safeText = (idText || 'HH-26-7407').toUpperCase();
  ctx.fillStyle = colors.primaryText;
  ctx.font = `900 22px ${FONT_MONO}`;
  ctx.textAlign = 'center';
  ctx.fillText(safeText, drawX + w / 2, y + h / 2 + 7);
  ctx.restore();
}

/**
 * Draws Builder Class Pill Badge
 */
function drawClassBadgePill(
  ctx: CanvasRenderingContext2D,
  classText: string,
  x: number,
  y: number,
  h: number,
  colors: ReturnType<typeof getVibeColors>,
  align: CanvasTextAlign = 'left'
) {
  ctx.save();
  const text = `BUILDER ⚡ ${(classText || 'DATA DRIFTER').toUpperCase()}`;
  ctx.font = `700 22px ${FONT_MONO}`;
  const textWidth = ctx.measureText(text).width;
  const paddingX = 22;
  const w = textWidth + paddingX * 2;
  const drawX = align === 'center' ? x - w / 2 : align === 'right' ? x - w : x;

  ctx.fillStyle = colors.stampBg;
  ctx.fillRect(drawX, y, w, h);

  ctx.strokeStyle = colors.borderInner;
  ctx.lineWidth = 2;
  ctx.strokeRect(drawX, y, w, h);

  ctx.fillStyle = colors.primaryText;
  ctx.textAlign = 'left';
  ctx.fillText(text, drawX + paddingX, y + h / 2 + 7);
  ctx.restore();
}

/**
 * Draws Circular Stamp Seal
 */
function drawCircularStampSeal(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  radius: number,
  colors: ReturnType<typeof getVibeColors>,
  rotation = 6
) {
  ctx.save();
  ctx.translate(x, y);
  ctx.rotate((rotation * Math.PI) / 180);

  ctx.fillStyle = colors.stampBg;
  ctx.beginPath();
  ctx.arc(0, 0, radius, 0, Math.PI * 2);
  ctx.fill();

  ctx.strokeStyle = colors.borderInner;
  ctx.lineWidth = 4;
  ctx.stroke();

  ctx.beginPath();
  ctx.arc(0, 0, radius - 6, 0, Math.PI * 2);
  ctx.lineWidth = 1.5;
  ctx.stroke();

  ctx.fillStyle = colors.primaryText;
  ctx.font = `800 ${Math.round(radius * 0.22)}px ${FONT_MONO}`;
  ctx.textAlign = 'center';
  ctx.fillText('HACKER HOUSE', 0, -radius * 0.22);

  ctx.fillStyle = colors.secondaryText;
  ctx.font = `900 italic ${Math.round(radius * 0.42)}px ${FONT_DISPLAY}`;
  ctx.fillText('GOA 2026', 0, radius * 0.32);

  ctx.restore();
}

/**
 * Draws canvas text with crisp drop shadow
 */
function drawCanvasTextWithShadow(
  ctx: CanvasRenderingContext2D,
  text: string,
  x: number,
  y: number,
  font: string,
  color: string,
  align: CanvasTextAlign = 'left',
  shadowColor = 'rgba(0, 0, 0, 0.45)',
  shadowBlur = 8,
  shadowOffsetY = 4
) {
  ctx.save();
  ctx.font = font;
  ctx.textAlign = align;
  ctx.shadowColor = shadowColor;
  ctx.shadowBlur = shadowBlur;
  ctx.shadowOffsetX = 0;
  ctx.shadowOffsetY = shadowOffsetY;
  ctx.fillStyle = color;
  ctx.fillText(text, x, y);
  ctx.restore();
}

function fitCanvasText(
  ctx: CanvasRenderingContext2D,
  text: string,
  maxWidth: number,
  baseSize: number,
  minSize: number,
  family: string,
  weight: number,
  allowBreaks = false
): { text: string; size: number } {
  const normalized = (text || '').toUpperCase();
  if (!normalized) return { text: '', size: baseSize };

  let size = baseSize;
  let displayText = normalized;
  ctx.font = `${weight} ${size}px ${family}`;

  while (size > minSize && ctx.measureText(displayText).width > maxWidth) {
    size -= 2;
    ctx.font = `${weight} ${size}px ${family}`;

    if (allowBreaks && displayText.length > 18) {
      const words = normalized.split(' ');
      if (words.length > 1) {
        const line = words.slice(0, Math.max(1, words.length - 1)).join(' ');
        if (ctx.measureText(line).width <= maxWidth) {
          displayText = line;
        }
      }
    }
  }

  return { text: displayText, size };
}

function drawFlexibleText(
  ctx: CanvasRenderingContext2D,
  text: string,
  x: number,
  y: number,
  maxWidth: number,
  baseSize: number,
  minSize: number,
  family: string,
  weight: number,
  lineHeight: number,
  align: CanvasTextAlign = 'left'
): void {
  const words = (text || '').trim().split(/\s+/).filter(Boolean);
  if (!words.length) return;

  ctx.textAlign = align;
  const lines: string[] = [];
  let current = words[0];

  for (let i = 1; i < words.length; i++) {
    const candidate = `${current} ${words[i]}`;
    ctx.font = `${weight} ${baseSize}px ${family}`;
    if (ctx.measureText(candidate).width <= maxWidth) {
      current = candidate;
    } else {
      lines.push(current);
      current = words[i];
    }
  }
  lines.push(current);

  const finalLines = lines.slice(0, 3).map((line) => line.toUpperCase());
  const startY = y - ((finalLines.length - 1) * lineHeight) / 2;

  finalLines.forEach((line, index) => {
    let lineSize = baseSize;
    ctx.font = `${weight} ${lineSize}px ${family}`;
    while (lineSize > minSize && ctx.measureText(line).width > maxWidth) {
      lineSize -= 2;
      ctx.font = `${weight} ${lineSize}px ${family}`;
    }
    const px = align === 'center' ? x : x;
    ctx.fillText(line, px, startY + index * lineHeight + lineHeight * 0.8);
  });
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
 * TEMPLATE 01: PORTRAIT (1200 x 1600)
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
  drawCanvasTextWithShadow(ctx, 'HH GOA 2026', 70, 135, `900 68px ${FONT_DISPLAY}`, colors.primaryText);
  drawCanvasTextWithShadow(ctx, 'HACKER HOUSE GOA', 70, 180, `800 24px ${FONT_MONO}`, colors.secondaryText);

  // Top Right Circular Stamp
  drawCircularStampSeal(ctx, 1050, 140, 60, colors, -6);

  // Photo Frame Box
  const photoSize = 760;
  const photoX = (1200 - photoSize) / 2;
  const photoY = 240;

  ctx.fillStyle = colors.photoBoxBg;
  ctx.fillRect(photoX, photoY, photoSize, photoSize);
  ctx.strokeStyle = colors.borderOuter;
  ctx.lineWidth = 8;
  ctx.strokeRect(photoX, photoY, photoSize, photoSize);

  ctx.strokeStyle = colors.borderInner;
  ctx.lineWidth = 3;
  ctx.strokeRect(photoX + 6, photoY + 6, photoSize - 12, photoSize - 12);

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

  // Details
  const infoY = photoY + photoSize + 90;
  const nameText = (options.name || 'PRIYANSHU KHARE').toUpperCase();
  const stackText = (options.stack || 'PYTHON // NEXT.JS').toUpperCase();

  // Name Title
  ctx.font = `900 68px ${FONT_DISPLAY}`;
  const nameFit = fitCanvasText(ctx, nameText, 1060, 68, 38, FONT_DISPLAY, 900);
  drawCanvasTextWithShadow(ctx, nameFit.text, 70, infoY, `900 ${nameFit.size}px ${FONT_DISPLAY}`, colors.primaryText);

  // Builder Class Badge Pill
  drawClassBadgePill(ctx, options.builderClass || 'DATA DRIFTER', 70, infoY + 25, 48, colors);

  // Stack Tech Text
  ctx.font = `600 24px ${FONT_MONO}`;
  const stackFit = fitCanvasText(ctx, stackText, 1020, 24, 15, FONT_MONO, 600);
  drawCanvasTextWithShadow(ctx, stackFit.text, 70, infoY + 115, `600 ${stackFit.size}px ${FONT_MONO}`, colors.secondaryText);

  // Builder ID Pill Badge
  drawBuilderIdPill(ctx, options.builderId || 'HH-26-7407', 70, infoY + 145, 280, 52, colors);

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
 * TEMPLATE 02: LANDSCAPE (1600 x 1000)
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

  // Outer & Inner Borders
  ctx.strokeStyle = colors.borderOuter;
  ctx.lineWidth = 16;
  ctx.strokeRect(8, 8, 1584, 984);

  ctx.strokeStyle = colors.borderInner;
  ctx.lineWidth = 4;
  ctx.strokeRect(28, 28, 1544, 944);

  // Top Left Header
  drawCanvasTextWithShadow(ctx, 'HH GOA 2026', 80, 110, `900 48px ${FONT_DISPLAY}`, colors.primaryText);

  // Top Right Official Pass Badge
  ctx.fillStyle = colors.borderInner;
  ctx.fillRect(1240, 70, 280, 40);
  ctx.strokeStyle = colors.borderOuter;
  ctx.lineWidth = 2;
  ctx.strokeRect(1240, 70, 280, 40);

  ctx.fillStyle = colors.stampBg;
  ctx.font = `800 15px ${FONT_MONO}`;
  ctx.textAlign = 'center';
  ctx.fillText('OFFICIAL BUILDER PASS', 1380, 96);
  ctx.textAlign = 'left';

  // Photo Box Left
  const pSize = 620;
  const pX = 80;
  const pY = 140;

  ctx.fillStyle = colors.photoBoxBg;
  ctx.fillRect(pX, pY, pSize, pSize);
  ctx.strokeStyle = colors.borderOuter;
  ctx.lineWidth = 8;
  ctx.strokeRect(pX, pY, pSize, pSize);

  ctx.strokeStyle = colors.borderInner;
  ctx.lineWidth = 3;
  ctx.strokeRect(pX + 6, pY + 6, pSize - 12, pSize - 12);

  const imgObj = options.photo ? await loadImage(options.photo) : null;
  if (imgObj) {
    ctx.save();
    ctx.beginPath();
    ctx.rect(pX, pY, pSize, pSize);
    ctx.clip();
    const scale = options.zoom || 1;
    const posX = options.position?.x || 0;
    const posY = options.position?.y || 0;
    const drawW = pSize * scale;
    const drawH = pSize * scale;
    const drawX = pX + (pSize - drawW) / 2 + posX * (pSize / 300);
    const drawY = pY + (pSize - drawH) / 2 + posY * (pSize / 300);
    ctx.drawImage(imgObj, drawX, drawY, drawW, drawH);
    ctx.restore();
  }

  // Right Column Info Panel
  const rX = 750;
  const nameText = (options.name || 'PRIYANSHU KHARE').toUpperCase();
  const stackText = (options.stack || 'PYTHON // NEXT.JS').toUpperCase();

  // Name Title
  ctx.font = `900 66px ${FONT_DISPLAY}`;
  const nameFit = fitCanvasText(ctx, nameText, 760, 66, 32, FONT_DISPLAY, 900);
  drawCanvasTextWithShadow(ctx, nameFit.text, rX, 230, `900 ${nameFit.size}px ${FONT_DISPLAY}`, colors.primaryText);

  // Builder Class Badge Pill
  drawClassBadgePill(ctx, options.builderClass || 'DATA DRIFTER', rX, 280, 52, colors);

  // Stack Tech Text
  ctx.font = `600 24px ${FONT_MONO}`;
  const stackFit = fitCanvasText(ctx, stackText, 720, 24, 15, FONT_MONO, 600);
  drawCanvasTextWithShadow(ctx, stackFit.text, rX, 385, `600 ${stackFit.size}px ${FONT_MONO}`, colors.secondaryText);

  // Builder ID Badge Pill
  drawBuilderIdPill(ctx, options.builderId || 'HH-26-7407', rX, 425, 280, 54, colors);

  // Circular Stamp Seal (Positioned beside ID Pill in Right Panel)
  drawCircularStampSeal(ctx, 1370, 440, 72, colors, 8);

  // Bottom Footer Bar
  const bY = 800;
  ctx.strokeStyle = colors.borderInner;
  ctx.lineWidth = 3;
  ctx.beginPath();
  ctx.moveTo(80, bY);
  ctx.lineTo(1520, bY);
  ctx.stroke();

  drawCanvasTextWithShadow(
    ctx,
    'GOA, INDIA · 28—31 OCT 2026 · 4 DAYS · 500 BUILDERS',
    80,
    bY + 58,
    `700 24px ${FONT_MONO}`,
    colors.secondaryText
  );

  let bx = 1180;
  const bars = [4, 2, 6, 2, 4, 8, 2, 4, 2, 6, 4, 2, 8, 2, 4, 6, 4, 2, 8];
  ctx.fillStyle = colors.secondaryText;
  for (const b of bars) {
    ctx.fillRect(bx, bY + 25, b, 48);
    bx += b + 4;
  }
}

/**
 * -------------------------------------------------------------
 * TEMPLATE 03A: SQUARE CARD (1200 x 1200)
 * -------------------------------------------------------------
 */
async function renderSquareTemplate(
  canvas: HTMLCanvasElement,
  ctx: CanvasRenderingContext2D,
  options: RenderOptions,
  vibeKey: string,
  colors: ReturnType<typeof getVibeColors>
) {
  canvas.width = 1200;
  canvas.height = 1200;

  drawVibeBackground(ctx, 1200, 1200, vibeKey, colors);

  ctx.strokeStyle = colors.borderOuter;
  ctx.lineWidth = 16;
  ctx.strokeRect(8, 8, 1184, 1184);

  ctx.strokeStyle = colors.borderInner;
  ctx.lineWidth = 4;
  ctx.strokeRect(28, 28, 1144, 1144);

  // Header Title
  drawCanvasTextWithShadow(ctx, 'HH GOA 2026', 80, 110, `900 44px ${FONT_DISPLAY}`, colors.primaryText);

  // Top Right Stamp
  drawCircularStampSeal(ctx, 1050, 140, 58, colors, -6);

  const nameText = (options.name || 'PRIYANSHU KHARE').toUpperCase();
  const stackText = (options.stack || 'PYTHON // NEXT.JS').toUpperCase();

  const photoSize = 600;
  const photoX = (1200 - photoSize) / 2;
  const photoY = 150;

  ctx.fillStyle = colors.photoBoxBg;
  ctx.fillRect(photoX, photoY, photoSize, photoSize);
  ctx.strokeStyle = colors.borderOuter;
  ctx.lineWidth = 8;
  ctx.strokeRect(photoX, photoY, photoSize, photoSize);

  ctx.strokeStyle = colors.borderInner;
  ctx.lineWidth = 3;
  ctx.strokeRect(photoX + 6, photoY + 6, photoSize - 12, photoSize - 12);

  const imgObj = options.photo ? await loadImage(options.photo) : null;
  if (imgObj) {
    ctx.save();
    ctx.beginPath();
    ctx.rect(photoX, photoY, photoSize, photoSize);
    ctx.clip();
    ctx.drawImage(imgObj, photoX, photoY, photoSize, photoSize);
    ctx.restore();
  }

  // Info Section
  const infoY = photoY + photoSize + 75;

  ctx.font = `900 58px ${FONT_DISPLAY}`;
  const nameFit = fitCanvasText(ctx, nameText, 1040, 58, 28, FONT_DISPLAY, 900);
  drawCanvasTextWithShadow(ctx, nameFit.text, 80, infoY, `900 ${nameFit.size}px ${FONT_DISPLAY}`, colors.primaryText);

  drawClassBadgePill(ctx, options.builderClass || 'DATA DRIFTER', 80, infoY + 20, 48, colors);

  ctx.font = `600 22px ${FONT_MONO}`;
  const stackFit = fitCanvasText(ctx, stackText, 1000, 22, 14, FONT_MONO, 600);
  drawCanvasTextWithShadow(ctx, stackFit.text, 80, infoY + 105, `600 ${stackFit.size}px ${FONT_MONO}`, colors.secondaryText);

  drawBuilderIdPill(ctx, options.builderId || 'HH-26-7407', 80, infoY + 135, 270, 50, colors);
}

/**
 * -------------------------------------------------------------
 * TEMPLATE 03B: STORY / FULL-HEIGHT CARD (1080 x 1920)
 * -------------------------------------------------------------
 */
async function renderStoryTemplate(
  canvas: HTMLCanvasElement,
  ctx: CanvasRenderingContext2D,
  options: RenderOptions,
  vibeKey: string,
  colors: ReturnType<typeof getVibeColors>
) {
  canvas.width = 1080;
  canvas.height = 1920;

  drawVibeBackground(ctx, 1080, 1920, vibeKey, colors);

  ctx.strokeStyle = colors.borderOuter;
  ctx.lineWidth = 16;
  ctx.strokeRect(10, 10, 1060, 1900);

  ctx.strokeStyle = colors.borderInner;
  ctx.lineWidth = 4;
  ctx.strokeRect(36, 36, 1008, 1848);

  drawCanvasTextWithShadow(ctx, 'HH GOA 2026', 80, 140, `900 68px ${FONT_DISPLAY}`, colors.primaryText);
  drawCanvasTextWithShadow(ctx, 'OFFICIAL BUILDER PASS', 80, 190, `800 24px ${FONT_MONO}`, colors.secondaryText);

  const photoSize = 760;
  const photoX = (1080 - photoSize) / 2;
  const photoY = 260;

  ctx.fillStyle = colors.photoBoxBg;
  ctx.fillRect(photoX, photoY, photoSize, photoSize);
  ctx.strokeStyle = colors.borderOuter;
  ctx.lineWidth = 8;
  ctx.strokeRect(photoX, photoY, photoSize, photoSize);

  ctx.strokeStyle = colors.borderInner;
  ctx.lineWidth = 3;
  ctx.strokeRect(photoX + 6, photoY + 6, photoSize - 12, photoSize - 12);

  const imgObj = options.photo ? await loadImage(options.photo) : null;
  if (imgObj) {
    ctx.save();
    ctx.beginPath();
    ctx.rect(photoX, photoY, photoSize, photoSize);
    ctx.clip();
    ctx.drawImage(imgObj, photoX, photoY, photoSize, photoSize);
    ctx.restore();
  }

  const nameText = (options.name || 'PRIYANSHU KHARE').toUpperCase();
  const stackText = (options.stack || 'PYTHON // NEXT.JS').toUpperCase();

  const infoY = photoY + photoSize + 90;

  ctx.font = `900 68px ${FONT_DISPLAY}`;
  const nameFit = fitCanvasText(ctx, nameText, 920, 68, 32, FONT_DISPLAY, 900);
  drawCanvasTextWithShadow(ctx, nameFit.text, 80, infoY, `900 ${nameFit.size}px ${FONT_DISPLAY}`, colors.primaryText);

  drawClassBadgePill(ctx, options.builderClass || 'DATA DRIFTER', 80, infoY + 25, 52, colors);

  ctx.font = `600 26px ${FONT_MONO}`;
  const stackFit = fitCanvasText(ctx, stackText, 900, 26, 16, FONT_MONO, 600);
  drawCanvasTextWithShadow(ctx, stackFit.text, 80, infoY + 120, `600 ${stackFit.size}px ${FONT_MONO}`, colors.secondaryText);

  drawBuilderIdPill(ctx, options.builderId || 'HH-26-7407', 80, infoY + 160, 300, 56, colors);

  drawCircularStampSeal(ctx, 880, infoY + 160, 72, colors, 8);

  // Barcode
  let bx = 120;
  const bars = [4, 2, 6, 2, 4, 8, 2, 4, 2, 6, 4, 2, 8, 2, 4, 6, 4, 2, 8, 4, 2, 6];
  ctx.fillStyle = colors.secondaryText;
  for (const b of bars) {
    ctx.fillRect(bx, 1750, b, 54);
    bx += b + 4;
  }
}

/**
 * -------------------------------------------------------------
 * TEMPLATE 03: CIRCLE PFP (1200 x 1200)
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

  ctx.save();
  ctx.beginPath();
  ctx.arc(600, 600, 580, 0, Math.PI * 2);
  ctx.clip();

  drawVibeBackground(ctx, 1200, 1200, vibeKey, colors);

  ctx.strokeStyle = colors.borderInner;
  ctx.lineWidth = 18;
  ctx.beginPath();
  ctx.arc(600, 600, 560, 0, Math.PI * 2);
  ctx.stroke();

  drawCanvasTextWithShadow(ctx, 'HH GOA 2026', 600, 135, `900 46px ${FONT_DISPLAY}`, colors.primaryText, 'center');

  const cRadius = 300;
  const cX = 600;
  const cY = 490;

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

  const nameText = (options.name || 'PRIYANSHU KHARE').toUpperCase();
  const stackText = (options.stack || 'PYTHON // NEXT.JS').toUpperCase();

  ctx.font = `900 58px ${FONT_DISPLAY}`;
  const nameFit = fitCanvasText(ctx, nameText, 760, 58, 24, FONT_DISPLAY, 900);
  drawCanvasTextWithShadow(ctx, nameFit.text, 600, 875, `900 ${nameFit.size}px ${FONT_DISPLAY}`, colors.primaryText, 'center');

  drawClassBadgePill(ctx, options.builderClass || 'DATA DRIFTER', 600, 915, 48, colors, 'center');

  ctx.font = `600 22px ${FONT_MONO}`;
  const stackFit = fitCanvasText(ctx, stackText, 720, 22, 12, FONT_MONO, 600);
  drawCanvasTextWithShadow(ctx, stackFit.text, 600, 995, `600 ${stackFit.size}px ${FONT_MONO}`, colors.secondaryText, 'center');

  drawBuilderIdPill(ctx, options.builderId || 'HH-26-7407', 600, 1025, 260, 48, colors, 'center');

  ctx.restore();
}

/**
 * -------------------------------------------------------------
 * TEMPLATE 04: ARCH BADGE (1200 x 1500)
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

  ctx.save();
  ctx.beginPath();
  ctx.arc(600, 460, 460, Math.PI, 0, false);
  ctx.lineTo(1060, 1420);
  ctx.lineTo(140, 1420);
  ctx.closePath();
  ctx.clip();

  drawVibeBackground(ctx, 1200, 1500, vibeKey, colors);

  ctx.strokeStyle = colors.borderInner;
  ctx.lineWidth = 14;
  ctx.stroke();

  drawCanvasTextWithShadow(ctx, 'HH GOA 2026', 600, 150, `900 56px ${FONT_DISPLAY}`, colors.primaryText, 'center');

  const pSize = 580;
  const pX = 310;
  const pY = 210;

  ctx.fillStyle = colors.photoBoxBg;
  ctx.fillRect(pX, pY, pSize, pSize);
  ctx.strokeStyle = colors.borderOuter;
  ctx.lineWidth = 8;
  ctx.strokeRect(pX, pY, pSize, pSize);

  ctx.strokeStyle = colors.borderInner;
  ctx.lineWidth = 3;
  ctx.strokeRect(pX + 6, pY + 6, pSize - 12, pSize - 12);

  const imgObj = options.photo ? await loadImage(options.photo) : null;
  if (imgObj) {
    ctx.save();
    ctx.beginPath();
    ctx.rect(pX, pY, pSize, pSize);
    ctx.clip();
    ctx.drawImage(imgObj, pX, pY, pSize, pSize);
    ctx.restore();
  }

  drawCircularStampSeal(ctx, 950, 640, 60, colors, 6);

  const nameText = (options.name || 'PRIYANSHU KHARE').toUpperCase();
  const stackText = (options.stack || 'PYTHON // NEXT.JS').toUpperCase();

  ctx.font = `900 62px ${FONT_DISPLAY}`;
  const nameFit = fitCanvasText(ctx, nameText, 760, 62, 26, FONT_DISPLAY, 900);
  drawCanvasTextWithShadow(ctx, nameFit.text, 600, 875, `900 ${nameFit.size}px ${FONT_DISPLAY}`, colors.primaryText, 'center');

  drawClassBadgePill(ctx, options.builderClass || 'DATA DRIFTER', 600, 915, 50, colors, 'center');

  ctx.font = `600 24px ${FONT_MONO}`;
  const stackFit = fitCanvasText(ctx, stackText, 700, 24, 12, FONT_MONO, 600);
  drawCanvasTextWithShadow(ctx, stackFit.text, 600, 995, `600 ${stackFit.size}px ${FONT_MONO}`, colors.secondaryText, 'center');

  drawBuilderIdPill(ctx, options.builderId || 'HH-26-7407', 600, 1030, 270, 50, colors, 'center');

  const bottomY = 1380;
  let barcodeX = 350;
  const bars = [4, 2, 6, 2, 4, 8, 2, 4, 2, 6, 4, 2, 8, 2, 4, 6, 4, 2, 8, 4];
  ctx.fillStyle = colors.secondaryText;
  for (const b of bars) {
    ctx.fillRect(barcodeX, bottomY - 30, b, 40);
    barcodeX += b + 4;
  }

  ctx.restore();
}

/**
 * -------------------------------------------------------------
 * TEMPLATE 05: SLIM BADGE (1600 x 600)
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

  const pSize = 440;
  const pX = 60;
  const pY = 80;

  ctx.fillStyle = colors.photoBoxBg;
  ctx.fillRect(pX, pY, pSize, pSize);
  ctx.strokeStyle = colors.borderOuter;
  ctx.lineWidth = 8;
  ctx.strokeRect(pX, pY, pSize, pSize);

  ctx.strokeStyle = colors.borderInner;
  ctx.lineWidth = 3;
  ctx.strokeRect(pX + 6, pY + 6, pSize - 12, pSize - 12);

  const imgObj = options.photo ? await loadImage(options.photo) : null;
  if (imgObj) {
    ctx.save();
    ctx.beginPath();
    ctx.rect(pX, pY, pSize, pSize);
    ctx.clip();
    ctx.drawImage(imgObj, pX, pY, pSize, pSize);
    ctx.restore();
  }

  const rX = 560;
  const nameText = (options.name || 'PRIYANSHU KHARE').toUpperCase();
  const stackText = (options.stack || 'PYTHON // NEXT.JS').toUpperCase();

  // Header Subtitle for Slim Badge
  drawCanvasTextWithShadow(ctx, 'HH GOA 2026 · HACKER HOUSE GOA', rX, 90, `800 22px ${FONT_MONO}`, colors.secondaryText);

  ctx.font = `900 62px ${FONT_DISPLAY}`;
  const nameFit = fitCanvasText(ctx, nameText, 800, 62, 26, FONT_DISPLAY, 900);
  drawCanvasTextWithShadow(ctx, nameFit.text, rX, 160, `900 ${nameFit.size}px ${FONT_DISPLAY}`, colors.primaryText);

  drawClassBadgePill(ctx, options.builderClass || 'DATA DRIFTER', rX, 195, 48, colors);

  ctx.font = `600 24px ${FONT_MONO}`;
  const stackFit = fitCanvasText(ctx, stackText, 760, 24, 12, FONT_MONO, 600);
  drawCanvasTextWithShadow(ctx, stackFit.text, rX, 280, `600 ${stackFit.size}px ${FONT_MONO}`, colors.secondaryText);

  drawBuilderIdPill(ctx, options.builderId || 'HH-26-7407', rX, 315, 260, 48, colors);

  drawCircularStampSeal(ctx, 1420, 250, 70, colors, 8);

  let bx = 1180;
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
  if (fmt === 'square') {
    await renderSquareTemplate(canvas, ctx, options, vibeKey, colors);
    return;
  }
  if (fmt === 'story') {
    await renderStoryTemplate(canvas, ctx, options, vibeKey, colors);
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
