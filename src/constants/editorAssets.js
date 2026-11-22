export const PHOTO_FILTERS = [
  { id: 'none', label: 'Original', icon: '✨', cssFilter: 'none' },
  { id: 'warm', label: 'Warm Glow', icon: '☀️', cssFilter: 'sepia(25%) saturate(125%)' },
  { id: 'cool', label: 'Cool Seoul', icon: '❄️', cssFilter: 'hue-rotate(180deg) saturate(90%)' },
  { id: 'vintage', label: 'Vintage 90s', icon: '🎞️', cssFilter: 'sepia(35%) contrast(110%) brightness(95%)' },
  { id: 'soft_pink', label: 'Rosy Pink', icon: '🌸', cssFilter: 'hue-rotate(330deg) saturate(115%) brightness(105%)' },
  { id: 'bw', label: 'Mono B&W', icon: '🖤', cssFilter: 'grayscale(100%)' },
  { id: 'sepia', label: 'Sepia Film', icon: '📜', cssFilter: 'sepia(85%)' },
  { id: 'vivid', label: 'Vivid Pop', icon: '🎨', cssFilter: 'saturate(150%) contrast(115%)' }
];

export const STICKER_COLLECTIONS = [
  {
    category: 'Cute & Korean',
    stickers: ['🫶', '✌️', '💖', '🎀', '🧸', '✨', '⭐', '🍒', '🍭', '🍓']
  },
  {
    category: 'Matcha & Cafe',
    stickers: ['🍵', '🍡', '🧋', '🍰', '🍪', '☕', '🥐', '🥞', '🍮', '🍩']
  },
  {
    category: 'Nature & Floral',
    stickers: ['🌸', '🌷', '🌿', '☁️', '🌈', '🌙', '🦋', '🌻', '🌼', '🐾']
  },
  {
    category: 'Y2K & Fun',
    stickers: ['💿', '👾', '🕶️', '⚡', '🎉', '🎈', '📸', '👑', '💌', '🤍']
  }
];
