// Centralized frame collection with diverse themes and colors (not only green)
export const FRAME_CATEGORIES = [
  { id: 'all', label: 'All Frames' },
  { id: 'special', label: 'Special Edition ⭐' },
  { id: 'cute', label: 'Cute & Coquette 🎀' },
  { id: 'vintage', label: 'Vintage & Retro 📷' },
  { id: 'floral', label: 'Floral & Nature 🌸' },
  { id: 'minimalist', label: 'Minimalist Clean 🤍' },
  { id: 'y2k', label: 'Y2K Aesthetic 💿' },
  { id: 'doodle', label: 'Doodle & Playful ✏️' },
  { id: 'colorful', label: 'Colorful Pop 🎨' },
];

export const FRAMES_LIST = [
  // 1. User Reference: Cherry Coquette & Chibi Girl
  {
    id: 'cherry-coquette',
    title: 'Cherry Coquette Chibi',
    category: 'cute',
    themeColor: '#871626',
    bgStyle: 'linear-gradient(135deg, #7A1220 0%, #520B15 100%)',
    borderColor: '#871626',
    textColor: '#FFFFFF',
    description: 'Polka dot burgundy dengan chibi girl, gingham heart, dan cherry bow accents.',
    tags: ['Special Edition', 'Cherry', 'Coquette', 'Chibi'],
    isPopular: true,
    stickerSample: '🍒',
    slots: 3,
    imageOverlayUrl: '/frames/cherry_coquette_cutout.png',
    previewThumbUrl: '/frames/cherry_coquette_strip.png',
    slotCoords: [
      { x: 55, y: 101, w: 252, h: 185 },
      { x: 55, y: 306, w: 252, h: 183 },
      { x: 55, y: 510, w: 252, h: 177 }
    ],
    sourceDimensions: { w: 576, h: 1024 },
    decorations: {
      headerText: 'CHERRY COQUETTE',
      footerStamp: 'STRAWBERRY MILK ♡'
    }
  },

  // 2. User Reference: Retro Airmail & Polaroid
  {
    id: 'airmail-polaroid',
    title: 'Retro Airmail & Polaroid',
    category: 'vintage',
    themeColor: '#B23A2B',
    bgStyle: 'linear-gradient(135deg, #F8F5EF 0%, #E8E2D6 100%)',
    borderColor: '#3B5998',
    textColor: '#273322',
    description: 'Surat pos udara klasik dengan kamera Polaroid OneStep, telepon retro, dan stempel pos.',
    tags: ['Special Edition', 'Polaroid', 'Airmail', 'Retro'],
    isPopular: true,
    stickerSample: '📷',
    slots: 3,
    imageOverlayUrl: '/frames/airmail_polaroid_cutout.png',
    previewThumbUrl: '/frames/airmail_polaroid_strip.png',
    slotCoords: [
      { x: 198, y: 286, w: 170, h: 137 },
      { x: 198, y: 432, w: 170, h: 138 },
      { x: 198, y: 580, w: 170, h: 137 }
    ],
    sourceDimensions: { w: 576, h: 1024 },
    decorations: {
      headerText: 'AIRMAIL POSTCARD',
      footerStamp: 'ONE STEP POLAROID'
    }
  },

  // 3. Signature Matcha Green
  {
    id: 'matcha-classic',
    title: 'Matcha Signature',
    category: 'cute',
    themeColor: '#769864',
    bgStyle: 'linear-gradient(135deg, #E9F2E2 0%, #D4E6C7 100%)',
    borderColor: '#769864',
    textColor: '#334426',
    description: 'Fresh matcha aesthetic with clean Korean photobooth typography.',
    tags: ['Matcha', 'Clean', 'Signature'],
    isPopular: true,
    stickerSample: '🍵',
    slots: 4,
    decorations: {
      headerText: 'MATCHABOX • 말차',
      footerStamp: 'SEOUL MEMORIES'
    }
  },

  // 4. Sakura Petals
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
      footerStamp: 'SPRING BLOSSOM'
    }
  },

  // 5. 1998 Analog Film
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
      footerStamp: 'ISO 400 • EXPOSURE'
    }
  },

  // 6. Y2K Cyber Heart
  {
    id: 'y2k-cyber-pop',
    title: 'Y2K Cyber Heart',
    category: 'y2k',
    themeColor: '#9381FF',
    bgStyle: 'linear-gradient(135deg, #F3EEFF 0%, #D8CEFF 100%)',
    borderColor: '#9381FF',
    textColor: '#3C2E77',
    description: 'Holographic pastel violet with chrome bubble hearts and cyber aesthetics.',
    tags: ['Y2K', 'Cyber', 'Pastel Violet'],
    isPopular: true,
    stickerSample: '💿',
    slots: 4,
    decorations: {
      headerText: 'CYBER ANGEL 2000',
      footerStamp: 'DIGITAL HEART'
    }
  },

  // 7. Seoul Clean Ivory
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
      footerStamp: 'MINIMAL MEMORY'
    }
  },

  // 8. Sunshine Butter Pop
  {
    id: 'colorful-butter-pop',
    title: 'Sunshine Butter Pop',
    category: 'colorful',
    themeColor: '#E6A700',
    bgStyle: 'linear-gradient(135deg, #FFFDE8 0%, #FFF2A6 100%)',
    borderColor: '#FFD700',
    textColor: '#5E4700',
    description: 'Vibrant cheerful butter yellow with clean minimal borders and sunny energy.',
    tags: ['Cheerful', 'Yellow', 'Summer'],
    isPopular: true,
    stickerSample: '☀️',
    slots: 4,
    decorations: {
      headerText: 'SUNNY DAY VIBES',
      footerStamp: 'SMILE BRIGHT'
    }
  },

  // 9. Winter Wonderland
  {
    id: 'winter-snow-magic',
    title: 'Winter Wonderland',
    category: 'cute',
    themeColor: '#5B92E5',
    bgStyle: 'linear-gradient(135deg, #F0F7FF 0%, #D6EAFF 100%)',
    borderColor: '#7BACF0',
    textColor: '#1A4280',
    description: 'Crisp winter wonderland with sparkling icy pastel blues.',
    tags: ['Winter', 'Snow', 'Pastel Blue'],
    isPopular: false,
    stickerSample: '❄️',
    slots: 4,
    decorations: {
      headerText: 'WINTER HOLIDAYS • 눈꽃',
      footerStamp: 'WARM COZY WINTER'
    }
  },

  // 10. Vintage Gazette Newspaper
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
      footerStamp: 'EDITION NO. 1024'
    }
  }
];

export function createCustomFrame({ id, title, category = 'cute', themeColor = '#769864', bgStyle, borderColor, textColor, description = '', imageOverlayUrl = null }) {
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
    stickerSample: '🎨',
    slots: 4,
    imageOverlayUrl,
    decorations: {
      headerText: title.toUpperCase(),
      footerStamp: 'SPECIAL EDITION'
    }
  };
}
