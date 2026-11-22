// Canvas rendering engine to draw high-resolution photo strips with clean frame styles & filters (Stickers removed per request)

function loadImage(src) {
  return new Promise((resolve) => {
    if (!src) {
      resolve(null);
      return;
    }
    const img = new Image();
    img.crossOrigin = 'anonymous';
    img.onload = () => resolve(img);
    img.onerror = () => resolve(null);
    img.src = src;
  });
}

// Draw image covering slot maintaining aspect ratio (object-fit: cover)
function drawImageCover(ctx, img, x, y, w, h) {
  const imgRatio = img.width / img.height;
  const slotRatio = w / h;

  let sx, sy, sw, sh;

  if (imgRatio > slotRatio) {
    sh = img.height;
    sw = img.height * slotRatio;
    sx = (img.width - sw) / 2;
    sy = 0;
  } else {
    sw = img.width;
    sh = img.width / slotRatio;
    sx = 0;
    sy = (img.height - sh) / 2;
  }

  ctx.drawImage(img, sx, sy, sw, sh, x, y, w, h);
}

// Draw rounded rectangle helper
function drawRoundedRect(ctx, x, y, width, height, radius) {
  ctx.beginPath();
  if (ctx.roundRect) {
    ctx.roundRect(x, y, width, height, radius);
  } else {
    ctx.moveTo(x + radius, y);
    ctx.lineTo(x + width - radius, y);
    ctx.quadraticCurveTo(x + width, y, x + width, y + radius);
    ctx.lineTo(x + width, y + height - radius);
    ctx.quadraticCurveTo(x + width, y + height, x + width - radius, y + height);
    ctx.lineTo(x + radius, y + height);
    ctx.quadraticCurveTo(x, y + height, x, y + height - radius);
    ctx.lineTo(x, y + radius);
    ctx.quadraticCurveTo(x, y, x + radius, y);
    ctx.closePath();
  }
}

// Main Canvas Renderer
export async function renderPhotoStripCanvas({
  photos = [],
  frame,
  layout,
  filter = 'none',
  brightness = 100,
  contrast = 100,
  customText = ''
}) {
  // Preload photo images
  const loadedPhotos = await Promise.all(photos.map(p => loadImage(p)));

  // SPECIAL EDITION: Custom PNG Overlay Frames (Cherry Coquette, Airmail Polaroid, etc.)
  if (frame?.imageOverlayUrl && frame?.slotCoords) {
    const scale = 2; // 2x scale for 1152 x 2048 high definition
    const canvasWidth = (frame.sourceDimensions?.w || 576) * scale;
    const canvasHeight = (frame.sourceDimensions?.h || 1024) * scale;

    const canvas = document.createElement('canvas');
    canvas.width = canvasWidth;
    canvas.height = canvasHeight;
    const ctx = canvas.getContext('2d');
    if (!ctx) return null;

    // 1. Draw solid background
    ctx.fillStyle = frame.themeColor || '#4A1727';
    ctx.fillRect(0, 0, canvasWidth, canvasHeight);

    // 2. Draw user photos behind the cutout windows
    frame.slotCoords.forEach((coord, idx) => {
      const sx = coord.x * scale;
      const sy = coord.y * scale;
      const sw = coord.w * scale;
      const sh = coord.h * scale;

      renderSlot(ctx, loadedPhotos[idx], sx, sy, sw, sh, filter, brightness, contrast, idx + 1, 8);
    });

    // 3. Draw the custom frame artwork overlay directly ON TOP
    const overlayImg = await loadImage(frame.imageOverlayUrl);
    if (overlayImg) {
      ctx.drawImage(overlayImg, 0, 0, canvasWidth, canvasHeight);
    }

    // 4. Optional custom text on bottom/top if specified
    if (customText.trim()) {
      ctx.font = 'bold 30px "Playfair Display", Georgia, serif';
      ctx.fillStyle = '#FFFFFF';
      ctx.textAlign = 'center';
      ctx.shadowColor = 'rgba(0, 0, 0, 0.8)';
      ctx.shadowBlur = 8;
      ctx.fillText(customText, canvasWidth / 2, canvasHeight - 40);
      ctx.shadowBlur = 0;
    }

    return canvas.toDataURL('image/png', 0.95);
  }

  // PROGRAMMATIC FRAMES (ALEASNAP Signature, Warm Ivory, Sakura, 1998 Film, etc.)
  const isGrid = layout?.type === 'grid';
  const slotsCount = layout?.slots || 4;

  const canvasWidth = isGrid ? 1200 : 800;
  const canvasHeight = isGrid ? 1500 : 540 + (slotsCount * 460);

  const canvas = document.createElement('canvas');
  canvas.width = canvasWidth;
  canvas.height = canvasHeight;
  const ctx = canvas.getContext('2d');
  if (!ctx) return null;

  const themeColor = frame?.themeColor || '#4A1727';
  const borderColor = frame?.borderColor || '#EAD9D5';
  const textColor = frame?.textColor || '#FFFDFB';

  // Background Gradient
  const bgGrad = ctx.createLinearGradient(0, 0, canvasWidth, canvasHeight);
  if (frame?.id === 'aleasnap-signature') {
    bgGrad.addColorStop(0, '#4A1727');
    bgGrad.addColorStop(1, '#702D42');
  } else if (frame?.id === 'minimal-cream') {
    bgGrad.addColorStop(0, '#FFFDFB');
    bgGrad.addColorStop(1, '#F8F3EF');
  } else if (frame?.id === 'sakura-blossom') {
    bgGrad.addColorStop(0, '#FFF0F3');
    bgGrad.addColorStop(1, '#FFD6DF');
  } else if (frame?.id === 'vintage-sepia-film') {
    bgGrad.addColorStop(0, '#F5EFEB');
    bgGrad.addColorStop(1, '#E6DAC8');
  } else if (frame?.id === 'y2k-cyber-pop') {
    bgGrad.addColorStop(0, '#F3EEFF');
    bgGrad.addColorStop(1, '#D8CEFF');
  } else if (frame?.id === 'colorful-butter-pop') {
    bgGrad.addColorStop(0, '#FFFDE8');
    bgGrad.addColorStop(1, '#FFF2A6');
  } else if (frame?.id === 'winter-snow-magic') {
    bgGrad.addColorStop(0, '#F0F7FF');
    bgGrad.addColorStop(1, '#D6EAFF');
  } else if (frame?.id === 'mono-newspaper') {
    bgGrad.addColorStop(0, '#F8F7F4');
    bgGrad.addColorStop(1, '#EFECE6');
  } else {
    bgGrad.addColorStop(0, '#4A1727');
    bgGrad.addColorStop(1, '#702D42');
  }

  ctx.fillStyle = bgGrad;
  ctx.fillRect(0, 0, canvasWidth, canvasHeight);

  // Outer Border
  ctx.lineWidth = 14;
  ctx.strokeStyle = borderColor;
  drawRoundedRect(ctx, 16, 16, canvasWidth - 32, canvasHeight - 32, 28);
  ctx.stroke();

  // Subtle inner border
  ctx.lineWidth = 2;
  ctx.strokeStyle = 'rgba(234, 217, 213, 0.3)';
  drawRoundedRect(ctx, 32, 32, canvasWidth - 64, canvasHeight - 64, 20);
  ctx.stroke();

  // Header Title
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';

  const headerTitle = customText.trim() ? customText : (frame?.decorations?.headerText || 'ALEASNAP • STUDIO');
  ctx.font = 'bold 34px "Playfair Display", Georgia, serif';
  ctx.fillStyle = textColor;
  ctx.fillText(headerTitle, canvasWidth / 2, 70);

  const todayStr = new Date().toLocaleDateString('en-GB', {
    day: '2-digit',
    month: 'short',
    year: 'numeric'
  }).toUpperCase();

  ctx.font = '600 16px "Plus Jakarta Sans", sans-serif';
  ctx.fillStyle = textColor;
  ctx.globalAlpha = 0.75;
  ctx.fillText(`${todayStr} • A MOMENT WORTH KEEPING`, canvasWidth / 2, 105);
  ctx.globalAlpha = 1.0;

  // Photo Slots
  const slotPadding = 48;
  const contentTop = 135;
  const contentBottom = canvasHeight - 140;
  const availableHeight = contentBottom - contentTop;

  if (isGrid) {
    const cols = 2, rows = 2, gap = 24;
    const slotW = (canvasWidth - (slotPadding * 2) - gap) / 2;
    const slotH = (availableHeight - gap) / 2;

    for (let r = 0; r < rows; r++) {
      for (let c = 0; c < cols; c++) {
        const idx = r * cols + c;
        const x = slotPadding + c * (slotW + gap);
        const y = contentTop + r * (slotH + gap);
        renderSlot(ctx, loadedPhotos[idx], x, y, slotW, slotH, filter, brightness, contrast, idx + 1);
      }
    }
  } else {
    const gap = 20;
    const totalGaps = (slotsCount - 1) * gap;
    const slotW = canvasWidth - (slotPadding * 2);
    const slotH = (availableHeight - totalGaps) / slotsCount;

    for (let i = 0; i < slotsCount; i++) {
      const x = slotPadding;
      const y = contentTop + i * (slotH + gap);
      renderSlot(ctx, loadedPhotos[i], x, y, slotW, slotH, filter, brightness, contrast, i + 1);
    }
  }

  // Footer: Barcode & Clean Stamp
  const footerY = canvasHeight - 90;
  const barcodeX = slotPadding + 20;
  const barHeights = [4, 2, 5, 1, 3, 6, 2, 4, 1, 3, 5, 2, 4, 1, 3, 2];
  ctx.fillStyle = textColor;
  for (let b = 0; b < barHeights.length; b++) {
    const barW = barHeights[b];
    ctx.fillRect(barcodeX + (b * 9), footerY, barW, 36);
  }

  const stampText = frame?.decorations?.footerStamp || 'ALEASNAP';
  ctx.save();
  ctx.translate(canvasWidth - 210, footerY + 18);
  ctx.strokeStyle = borderColor;
  ctx.lineWidth = 2.5;
  drawRoundedRect(ctx, -75, -18, 160, 36, 6);
  ctx.stroke();

  ctx.font = 'bold 16px "Playfair Display", Georgia, serif';
  ctx.fillStyle = textColor;
  ctx.textAlign = 'center';
  ctx.fillText(stampText, 5, 2);
  ctx.restore();

  return canvas.toDataURL('image/png', 0.95);
}

// Render individual photo slot
function renderSlot(ctx, img, x, y, w, h, filter, brightness, contrast, index, radius = 10) {
  ctx.save();
  drawRoundedRect(ctx, x, y, w, h, radius);
  ctx.clip();

  if (img) {
    let filterString = `brightness(${brightness}%) contrast(${contrast}%)`;
    if (filter === 'warm') filterString += ' sepia(25%) saturate(125%)';
    if (filter === 'cool') filterString += ' hue-rotate(180deg) saturate(90%)';
    if (filter === 'vintage') filterString += ' sepia(35%) contrast(110%) brightness(95%)';
    if (filter === 'bw') filterString += ' grayscale(100%)';
    if (filter === 'sepia') filterString += ' sepia(85%)';
    if (filter === 'soft_pink') filterString += ' hue-rotate(330deg) saturate(115%) brightness(105%)';
    if (filter === 'vivid') filterString += ' saturate(150%) contrast(115%)';

    ctx.filter = filterString;
    drawImageCover(ctx, img, x, y, w, h);
    ctx.filter = 'none';
  } else {
    ctx.fillStyle = '#EAE5DE';
    ctx.fillRect(x, y, w, h);
    ctx.fillStyle = '#9C9488';
    ctx.font = 'bold 24px "Playfair Display", Georgia, serif';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText(`PORTRAIT #${index}`, x + (w / 2), y + (h / 2));
  }

  ctx.restore();

  ctx.strokeStyle = 'rgba(0, 0, 0, 0.12)';
  ctx.lineWidth = 2;
  drawRoundedRect(ctx, x, y, w, h, radius);
  ctx.stroke();
}
