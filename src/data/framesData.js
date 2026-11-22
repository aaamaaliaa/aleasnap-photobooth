// Centralized frame collection with diverse themes and colors (not only green)
export const FRAME_CATEGORIES = [
  { id: 'all', label: 'All Frames' },
  { id: 'cute', label: 'Cute & Kawaii 🧸' },
  { id: 'floral', label: 'Floral & Nature 🌸' },
  { id: 'vintage', label: 'Vintage & Film 🎞️' },
  { id: 'retro', label: 'Retro 90s 📼' },
  { id: 'minimalist', label: 'Minimalist 🤍' },
  { id: 'y2k', label: 'Y2K Cyber 💿' },
  { id: 'doodle', label: 'Doodle & Playful ✏️' },
  { id: 'seasonal', label: 'Seasonal & Holiday ❄️' },
  { id: 'colorful', label: 'Colorful Pop 🎨' },
];

export const FRAMES_LIST = [
  {
    id: 'matcha-classic',
    title: 'Matcha Signature',
    category: 'cute',
    themeColor: '#769864',
    bgStyle: 'linear-gradient(135deg, #E9F2E2 0%, #D4E6C7 100%)',
    borderColor: '#769864',
    textColor: '#334426',
    description: 'Fresh matcha aesthetic with cute leaf motifs & minimal Korean typography.',
    tags: ['Matcha', 'Cute', 'Signature'],
    isPopular: true,
    stickerSample: '🍵',
    slots: 4,
    decorations: {
      headerText: 'MATCHABOX • 말차',
      footerStamp: 'FRESH MATCHA ♡',
      stickers: ['🍵', '🍃', '✨', '💚'],
      pattern: 'leaves'
    }
  },
  {
    id: 'sakura-blossom',
    title: 'Sakura Petals',
    category: 'floral',
    themeColor: '#E88B9E',
    bgStyle: 'linear-gradient(135deg, #FFF0F3 0%, #FFD6DF 100%)',
    borderColor: '#F299AC',
    textColor: '#6B2D3B',
    description: 'Romantic pastel cherry blossom petals falling gently on soft pink border.',
    tags: ['Floral', 'Pink', 'Romantic'],
    isPopular: true,
    stickerSample: '🌸',
    slots: 4,
    decorations: {
      headerText: 'SAKURA MOMENTS • 벚꽃',
      footerStamp: 'SWEET BLOSSOM ♡',
      stickers: ['🌸', '🌷', '🎀', '💖'],
      pattern: 'dots'
    }
  },
  {
    id: 'vintage-sepia-film',
    title: '1998 Analog Film',
    category: 'vintage',
    themeColor: '#9C7A58',
    bgStyle: 'linear-gradient(135deg, #F5EFEB 0%, #E6DAC8 100%)',
    borderColor: '#A88968',
    textColor: '#4A3521',
    description: 'Grainy film borders with authentic light leaks and retro date timestamp.',
    tags: ['Film', 'Analog', 'Nostalgia'],
    isPopular: true,
    stickerSample: '🎞️',
    slots: 4,
    decorations: {
      headerText: 'ANALOG FILM 1998',
      footerStamp: 'ISO 400 • EXPOSURE',
      stickers: ['🎞️', '☕', '📜', '🕰️'],
      pattern: 'sprockets'
    }
  },
  {
    id: 'y2k-cyber-pop',
    title: 'Y2K Cyber Heart',
    category: 'y2k',
    themeColor: '#9381FF',
    bgStyle: 'linear-gradient(135deg, #F3EEFF 0%, #D8CEFF 100%)',
    borderColor: '#9381FF',
    textColor: '#3C2E77',
    description: 'Holographic silver stars, chrome bubble hearts & cyber aesthetics.',
    tags: ['Y2K', 'Cyber', 'Pastel Violet'],
    isPopular: true,
    stickerSample: '💿',
    slots: 4,
    decorations: {
      headerText: 'CYBER ANGEL 2000',
      footerStamp: '★ PIXEL HEART ★',
      stickers: ['💿', '👾', '✨', '💜'],
      pattern: 'grid'
    }
  },
  {
    id: 'minimal-cream',
    title: 'Seoul Clean Ivory',
    category: 'minimalist',
    themeColor: '#8C827A',
    bgStyle: 'linear-gradient(135deg, #FFFFFF 0%, #F9F6F0 100%)',
    borderColor: '#E8E1D7',
    textColor: '#3A3530',
    description: 'Ultra-clean, modern gallery layout with generous whitespace & elegant serif accents.',
    tags: ['Clean', 'Minimal', 'Neutral'],
    isPopular: false,
    stickerSample: '🤍',
    slots: 4,
    decorations: {
      headerText: 'STUDIO ESSENTIALS',
      footerStamp: 'MINIMAL MEMORY',
      stickers: ['🤍', '🕊️', '🌿'],
      pattern: 'clean'
    }
  },
  {
    id: 'doodle-bear-party',
    title: 'Teddy Bear Picnic',
    category: 'cute',
    themeColor: '#D19C65',
    bgStyle: 'linear-gradient(135deg, #FFF9F2 0%, #FFE9D1 100%)',
    borderColor: '#E8B684',
    textColor: '#573719',
    description: 'Hand-drawn brown teddy bears, cookie doodles, and cheerful stickers.',
    tags: ['Teddy', 'Cute', 'Warm'],
    isPopular: true,
    stickerSample: '🧸',
    slots: 4,
    decorations: {
      headerText: 'BEAR & FRIENDS ♡',
      footerStamp: 'WARM HUGS ONLY',
      stickers: ['🧸', '🍪', '🍯', '🐾'],
      pattern: 'dots'
    }
  },
  {
    id: 'retro-arcade',
    title: 'Pixel Pixel Arcade',
    category: 'retro',
    themeColor: '#3A86FF',
    bgStyle: 'linear-gradient(135deg, #EBF3FF 0%, #CCE3FE 100%)',
    borderColor: '#3A86FF',
    textColor: '#15356E',
    description: '8-bit retro gaming motifs, neon arcade grid lines, and pixel heart sprites.',
    tags: ['Pixel', 'Retro', 'Arcade'],
    isPopular: false,
    stickerSample: '👾',
    slots: 4,
    decorations: {
      headerText: 'LEVEL UP! • INSERT COIN',
      footerStamp: 'HIGH SCORE 99999',
      stickers: ['👾', '🕹️', '⭐', '⚡'],
      pattern: 'grid'
    }
  },
  {
    id: 'doodle-crayon-sky',
    title: 'Crayon Clouds',
    category: 'doodle',
    themeColor: '#53A9E8',
    bgStyle: 'linear-gradient(135deg, #EDF7FF 0%, #D2EDFF 100%)',
    borderColor: '#6EBAF5',
    textColor: '#1B4769',
    description: 'Whimsical sky with hand-drawn puffy clouds, stars, and rainbow doodles.',
    tags: ['Doodle', 'Clouds', 'Blue'],
    isPopular: false,
    stickerSample: '☁️',
    slots: 4,
    decorations: {
      headerText: 'DAYDREAM CLOUDS',
      footerStamp: 'STAY DREAMY ♡',
      stickers: ['☁️', '🌈', '⭐', '🎈'],
      pattern: 'dots'
    }
  },
  {
    id: 'colorful-butter-pop',
    title: 'Sunshine Butter Pop',
    category: 'colorful',
    themeColor: '#E6A700',
    bgStyle: 'linear-gradient(135deg, #FFFDE8 0%, #FFF2A6 100%)',
    borderColor: '#FFD700',
    textColor: '#5E4700',
    description: 'Vibrant cheerful butter yellow with smiley faces, daisy flowers, and pops of color.',
    tags: ['Cheerful', 'Yellow', 'Summer'],
    isPopular: true,
    stickerSample: '🌼',
    slots: 4,
    decorations: {
      headerText: 'SUNNY DAY VIBES ☀️',
      footerStamp: 'SMILE BRIGHT ♡',
      stickers: ['🌼', '🌻', '💛', '✨'],
      pattern: 'dots'
    }
  },
  {
    id: 'lavender-dream',
    title: 'Lavender Dreamscape',
    category: 'floral',
    themeColor: '#8E7DBE',
    bgStyle: 'linear-gradient(135deg, #F8F5FF 0%, #E7DCFC 100%)',
    borderColor: '#B9A7E8',
    textColor: '#403361',
    description: 'Calm lavender haze with delicate pressed botanicals and dreamy sparkle elements.',
    tags: ['Floral', 'Purple', 'Dreamy'],
    isPopular: false,
    stickerSample: '💐',
    slots: 4,
    decorations: {
      headerText: 'LAVENDER HAZE ♡',
      footerStamp: 'SWEET REVERIE',
      stickers: ['💐', '💜', '🌙', '✨'],
      pattern: 'dots'
    }
  },
  {
    id: 'winter-snow-magic',
    title: 'Winter Wonderland',
    category: 'seasonal',
    themeColor: '#5B92E5',
    bgStyle: 'linear-gradient(135deg, #F0F7FF 0%, #D6EAFF 100%)',
    borderColor: '#7BACF0',
    textColor: '#1A4280',
    description: 'Crisp winter wonderland with sparkling crystal snowflakes and icy pastel blues.',
    tags: ['Seasonal', 'Winter', 'Snow'],
    isPopular: true,
    stickerSample: '❄️',
    slots: 4,
    decorations: {
      headerText: 'WINTER HOLIDAYS • 눈꽃',
      footerStamp: 'WARM COZY WINTER ♡',
      stickers: ['❄️', '⛄', '🧤', '☕'],
      pattern: 'dots'
    }
  },
  {
    id: 'autumn-maple-warmth',
    title: 'Autumn Maple Breeze',
    category: 'seasonal',
    themeColor: '#C45B28',
    bgStyle: 'linear-gradient(135deg, #FFF4ED 0%, #FED9C6 100%)',
    borderColor: '#E58557',
    textColor: '#662708',
    description: 'Cozy autumn fallen maple leaves, warm spiced cider tones, and amber borders.',
    tags: ['Seasonal', 'Autumn', 'Cozy'],
    isPopular: false,
    stickerSample: '🍁',
    slots: 4,
    decorations: {
      headerText: 'AUTUMN MEMORIES • 단풍',
      footerStamp: 'FALL IN LOVE ♡',
      stickers: ['🍁', '🍂', '🌰', '🧣'],
      pattern: 'dots'
    }
  },
  {
    id: 'mono-newspaper',
    title: 'Vintage Gazette',
    category: 'vintage',
    themeColor: '#454545',
    bgStyle: 'linear-gradient(135deg, #F8F7F4 0%, #EFECE6 100%)',
    borderColor: '#2B2B2B',
    textColor: '#1F1F1F',
    description: 'Classic editorial tabloid styling with vintage newspaper headlines and stamp date.',
    tags: ['Editorial', 'Monochrome', 'Vintage'],
    isPopular: false,
    stickerSample: '📰',
    slots: 4,
    decorations: {
      headerText: 'THE SEOUL DAILY GAZETTE',
      footerStamp: 'EDITION NO. 1024',
      stickers: ['📰', '🗞️', '🖋️', '☕'],
      pattern: 'clean'
    }
  },
  {
    id: 'cyber-matrix-grid',
    title: 'Holo Grid Prism',
    category: 'y2k',
    themeColor: '#00B4D8',
    bgStyle: 'linear-gradient(135deg, #E8FBFF 0%, #CAF0F8 100%)',
    borderColor: '#0096C7',
    textColor: '#023E8A',
    description: 'Iridescent holographic grid perspective with cyber butterfly accents.',
    tags: ['Y2K', 'Cyber', 'Prism'],
    isPopular: false,
    stickerSample: '🦋',
    slots: 4,
    decorations: {
      headerText: 'DIGITAL PARADISE 2.0',
      footerStamp: 'CYBER BUTTERFLY ♡',
      stickers: ['🦋', '💿', '🌐', '💎'],
      pattern: 'grid'
    }
  }
];

// Helper to register a new frame easily at runtime (e.g., from custom user uploads or reference images)
export function createCustomFrame({ id, title, category = 'cute', themeColor = '#769864', bgStyle, borderColor, textColor, description = '', stickers = ['✨'], imageOverlayUrl = null }) {
  return {
    id: id || `custom-frame-${Date.now()}`,
    title: title || 'Custom Frame',
    category,
    themeColor,
    bgStyle: bgStyle || `linear-gradient(135deg, #FFFFFF 0%, #F5F8F2 100%)`,
    borderColor: borderColor || themeColor,
    textColor: textColor || '#2C3527',
    description,
    tags: ['Custom', category],
    isPopular: false,
    stickerSample: stickers[0] || '🎨',
    slots: 4,
    imageOverlayUrl,
    decorations: {
      headerText: title.toUpperCase(),
      footerStamp: 'SPECIAL EDITION ♡',
      stickers,
      pattern: 'clean'
    }
  };
}
