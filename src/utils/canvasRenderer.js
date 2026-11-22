// Canvas rendering engine to draw high-resolution photo strips with full frame styles, stickers & layouts

function loadImage(src) {
  return new Promise((resolve, reject) => {
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
  const isGrid = layout?.type === 'grid';
  const slotsCount = layout?.slots || 4;

  // High-res output dimensions
  const canvasWidth = isGrid ? 1200 : 800;
  const canvasHeight = isGrid ? 1500 : 600 + (slotsCount * 480);

  const canvas = document.createElement('canvas');
  canvas.width = canvasWidth;
  canvas.height = canvasHeight;
  const ctx = canvas.getContext('2d');
  if (!ctx) return null;

  // 1. Draw Background
  const themeColor = frame?.themeColor || '#769864';
  const borderColor = frame?.borderColor || '#769864';
  const textColor = frame?.textColor || '#273322';

  // Create gradient background
  const bgGrad = ctx.createLinearGradient(0, 0, canvasWidth, canvasHeight);
  if (frame?.id === 'sakura-blossom') {
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
  } else {
    // Default Matcha / Natural
    bgGrad.addColorStop(0, '#F9FAF5');
    bgGrad.addColorStop(1, '#EBF2E3');
  }

  ctx.fillStyle = bgGrad;
  ctx.fillRect(0, 0, canvasWidth, canvasHeight);

  // If custom frame image overlay exists, draw it
  if (frame?.imageOverlayUrl) {
    const overlayImg = await loadImage(frame.imageOverlayUrl);
    if (overlayImg) {
      ctx.drawImage(overlayImg, 0, 0, canvasWidth, canvasHeight);
    }
  }

  // 2. Draw Outer Aesthetic Border
  ctx.lineWidth = 14;
  ctx.strokeStyle = borderColor;
  drawRoundedRect(ctx, 16, 16, canvasWidth - 32, canvasHeight - 32, 28);
  ctx.stroke();

  // Draw subtle inner dashed line
  ctx.lineWidth = 2;
  ctx.strokeStyle = 'rgba(0, 0, 0, 0.12)';
  ctx.setLineDash([8, 8]);
  drawRoundedRect(ctx, 32, 32, canvasWidth - 64, canvasHeight - 64, 20);
  ctx.stroke();
  ctx.setLineDash([]); // reset dash

  // 3. Draw Header Title & Brand
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';

  const headerTitle = customText || frame?.decorations?.headerText || 'MATCHABOX • KOREAN PHOTOBOOTH';
  ctx.font = 'bold 34px "Fredoka", sans-serif';
  ctx.fillStyle = textColor;
  ctx.fillText(headerTitle, canvasWidth / 2, 75);

  const todayStr = new Date().toLocaleDateString('en-GB', {
    day: '2-digit',
    month: 'short',
    year: 'numeric'
  }).toUpperCase();

  ctx.font = '600 20px "Plus Jakarta Sans", sans-serif';
  ctx.fillStyle = 'rgba(0, 0, 0, 0.5)';
  ctx.fillText(`${todayStr} • SEOUL MEMORIES`, canvasWidth / 2, 115);

  // Top Decorative Stickers
  const stickers = frame?.decorations?.stickers || ['🍵', '✨'];
  ctx.font = '36px sans-serif';
  ctx.fillText(stickers[0] || '✨', 80, 85);
  ctx.fillText(stickers[1] || '♡', canvasWidth - 80, 85);

  // 4. Calculate Photo Slot Boundaries
  const slotPadding = 48;
  const contentTop = 150;
  const contentBottom = canvasHeight - 160;
  const availableHeight = contentBottom - contentTop;

  // Preload all photo images
  const loadedImages = await Promise.all(photos.map(p => loadImage(p)));

  if (isGrid) {
    // 2x2 Grid Layout
    const cols = 2;
    const rows = 2;
    const gap = 24;
    const slotW = (canvasWidth - (slotPadding * 2) - gap) / 2;
    const slotH = (availableHeight - gap) / 2;

    for (let r = 0; r < rows; r++) {
      for (let c = 0; c < cols; c++) {
        const idx = r * cols + c;
        const x = slotPadding + c * (slotW + gap);
        const y = contentTop + r * (slotH + gap);
        renderSlot(ctx, loadedImages[idx], x, y, slotW, slotH, filter, brightness, contrast, idx + 1);
      }
    }
  } else {
    // Vertical Strip Layout (2, 3, or 4 slots)
    const gap = 20;
    const totalGaps = (slotsCount - 1) * gap;
    const slotW = canvasWidth - (slotPadding * 2);
    const slotH = (availableHeight - totalGaps) / slotsCount;

    for (let i = 0; i < slotsCount; i++) {
      const x = slotPadding;
      const y = contentTop + i * (slotH + gap);
      renderSlot(ctx, loadedImages[i], x, y, slotW, slotH, filter, brightness, contrast, i + 1);
    }
  }

  // 5. Draw Footer (Barcode, Stamp, Copyright)
  const footerY = canvasHeight - 100;

  // Draw simulated barcode
  const barcodeX = slotPadding + 20;
  const barHeights = [4, 2, 5, 1, 3, 6, 2, 4, 1, 3, 5, 2, 4, 1, 3, 2];
  ctx.fillStyle = textColor;
  for (let b = 0; b < barHeights.length; b++) {
    const barW = barHeights[b];
    ctx.fillRect(barcodeX + (b * 9), footerY, barW, 40);
  }

  // Draw Cute Stamp Box
  const stampText = frame?.decorations?.footerStamp || 'MATCHABOX ♡';
  ctx.save();
  ctx.translate(canvasWidth - 220, footerY + 20);
  ctx.rotate(-0.06); // slight playful tilt
  ctx.strokeStyle = borderColor;
  ctx.lineWidth = 3;
  drawRoundedRect(ctx, -80, -20, 180, 42, 8);
  ctx.stroke();

  ctx.font = 'bold 20px "Fredoka", sans-serif';
  ctx.fillStyle = borderColor;
  ctx.textAlign = 'center';
  ctx.fillText(stampText, 10, 4);
  ctx.restore();

  // Return generated Data URL
  return canvas.toDataURL('image/png', 0.95);
}

// Render individual photo slot with rounded borders, filters, and fallback
function renderSlot(ctx, img, x, y, w, h, filter, brightness, contrast, index) {
  const slotRadius = 14;

  ctx.save();
  drawRoundedRect(ctx, x, y, w, h, slotRadius);
  ctx.clip(); // Clip photo inside rounded slot

  if (img) {
    // Build filter string
    let filterString = `brightness(${brightness}%) contrast(${contrast}%)`;
    if (filter === 'warm') filterString += ' sepia(25%) saturate(120%)';
    if (filter === 'cool') filterString += ' hue-rotate(180deg) saturate(90%)';
    if (filter === 'bw') filterString += ' grayscale(100%)';
    if (filter === 'sepia') filterString += ' sepia(80%)';
    if (filter === 'vintage') filterString += ' sepia(35%) contrast(110%) brightness(95%)';

    ctx.filter = filterString;
    drawImageCover(ctx, img, x, y, w, h);
    ctx.filter = 'none';
  } else {
    // Empty placeholder slot
    ctx.fillStyle = '#E5E0D8';
    ctx.fillRect(x, y, w, h);
    ctx.fillStyle = '#9C9488';
    ctx.font = 'bold 36px "Fredoka", sans-serif';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText(`Slot #${index}`, x + (w / 2), y + (h / 2));
  }

  ctx.restore();

  // Subtle photo slot outline
  ctx.strokeStyle = 'rgba(0, 0, 0, 0.15)';
  ctx.lineWidth = 2;
  drawRoundedRect(ctx, x, y, w, h, slotRadius);
  ctx.stroke();
}
