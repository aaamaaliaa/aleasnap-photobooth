// Centralized frame collection with diverse themes and colors
export const FRAME_CATEGORIES = [
  { id: 'all', label: 'All Frames' },
  { id: 'special', label: 'Special Edition' },
  { id: 'cute', label: 'Coquette & Sweet' },
  { id: 'vintage', label: 'Vintage & Retro' },
  { id: 'floral', label: 'Floral & Botanical' },
  { id: 'minimalist', label: 'Minimalist Clean' },
  { id: 'y2k', label: 'Y2K Aesthetic' },
  { id: 'colorful', label: 'Vibrant Colors' },
];

export const FRAMES_LIST = [
  // 1. Signature ALEASNAP Burgundy (Featured Primary)
  {
    id: 'aleasnap-signature',
    title: 'ALEASNAP Signature Burgundy',
    category: 'special',
    themeColor: '#4A1727',
    bgStyle: 'linear-gradient(135deg, #4A1727 0%, #702D42 100%)',
    borderColor: '#EAD9D5',
    textColor: '#FFFDFB',
    description: 'Palet Deep Burgundy khas ALEASNAP dengan border Dusty Rose yang mewah, modern, dan elegan.',
    tags: ['Signature', 'Burgundy', 'Studio', 'Special Edition'],
    isPopular: true,
    slots: 4,
    decorations: {
      headerText: 'ALEASNAP • STUDIO',
      footerStamp: 'A MOMENT WORTH KEEPING'
    }
  },

  // 2. User Reference: Cherry Coquette & Chibi Girl
  {
    id: 'cherry-coquette',
    title: 'Cherry Coquette Chibi',
    category: 'cute',
    themeColor: '#871626',
    bgStyle: 'linear-gradient(135deg, #7A1220 0%, #520B15 100%)',
    borderColor: '#871626',
    textColor: '#FFFFFF',
    description: 'Polka dot burgundy dengan chibi girl, gingham ribbon, dan cherry bow accents.',
    tags: ['Special Edition', 'Cherry', 'Coquette', 'Chibi'],
    isPopular: true,
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
      footerStamp: 'STRAWBERRY EDITION'
    }
  },

  // 3. User Reference: Retro Airmail & Polaroid
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

  // 4. Seoul Clean Ivory
  {
    id: 'minimal-cream',
    title: 'Warm Ivory Editorial',
    category: 'minimalist',
    themeColor: '#702D42',
    bgStyle: 'linear-gradient(135deg, #FFFDFB 0%, #F8F3EF 100%)',
    borderColor: '#EAD9D5',
    textColor: '#4A1727',
    description: 'Tata letak editorial ultra-clean dengan warm ivory, border tipis, dan tipografi serif elegan.',
    tags: ['Editorial', 'Ivory', 'Clean', 'Minimalist'],
    isPopular: true,
    slots: 4,
    decorations: {
      headerText: 'ALEASNAP ARCHIVE',
      footerStamp: 'A MOMENT WORTH KEEPING'
    }
  },

  // 5. Sakura Petals
  {
    id: 'sakura-blossom',
    title: 'Sakura Petals',
    category: 'floral',
    themeColor: '#E88B9E',
    bgStyle: 'linear-gradient(135deg, #FFF0F3 0%, #FFD6DF 100%)',
    borderColor: '#F299AC',
    textColor: '#6B2D3B',
    description: 'Kelopak bunga sakura lembut dengan latar pastel pink romantis.',
    tags: ['Floral', 'Pink', 'Romantic'],
    isPopular: false,
    slots: 4,
    decorations: {
      headerText: 'SAKURA MOMENTS',
      footerStamp: 'SPRING BLOSSOM'
    }
  },

  // 6. 1998 Analog Film
  {
    id: 'vintage-sepia-film',
    title: '1998 Analog Film',
    category: 'vintage',
    themeColor: '#9C7A58',
    bgStyle: 'linear-gradient(135deg, #F5EFEB 0%, #E6DAC8 100%)',
    borderColor: '#A88968',
    textColor: '#4A3521',
    description: 'Border film analog bernuansa vintage dengan date stamp autentik.',
    tags: ['Film', 'Analog', 'Nostalgia'],
    isPopular: false,
    slots: 4,
    decorations: {
      headerText: 'ANALOG FILM 1998',
      footerStamp: 'ISO 400 • EXPOSURE'
    }
  },

  // 7. Y2K Cyber Pop
  {
    id: 'y2k-cyber-pop',
    title: 'Y2K Cyber Violet',
    category: 'y2k',
    themeColor: '#9381FF',
    bgStyle: 'linear-gradient(135deg, #F3EEFF 0%, #D8CEFF 100%)',
    borderColor: '#9381FF',
    textColor: '#3C2E77',
    description: 'Nuansa lavender futuristik Y2K dengan garis border krom minimalis.',
    tags: ['Y2K', 'Cyber', 'Pastel Violet'],
    isPopular: false,
    slots: 4,
    decorations: {
      headerText: 'CYBER ARCHIVE 2000',
      footerStamp: 'DIGITAL EDITION'
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
    description: 'Warna kuning butter hangat yang cerah dengan border bersih bernuansa musim panas.',
    tags: ['Cheerful', 'Yellow', 'Warmth'],
    isPopular: false,
    slots: 4,
    decorations: {
      headerText: 'SUNSHINE EDITION',
      footerStamp: 'SUMMER ARCHIVE'
    }
  },

  // 9. Winter Glacier Blue
  {
    id: 'winter-snow-magic',
    title: 'Glacier Pastel Blue',
    category: 'cute',
    themeColor: '#5B92E5',
    bgStyle: 'linear-gradient(135deg, #F0F7FF 0%, #D6EAFF 100%)',
    borderColor: '#7BACF0',
    textColor: '#1A4280',
    description: 'Biru pastel sejuk nan tenang yang memberikan nuansa sejuk dan bersih.',
    tags: ['Winter', 'Pastel Blue', 'Clean'],
    isPopular: false,
    slots: 4,
    decorations: {
      headerText: 'WINTER ARCHIVE',
      footerStamp: 'SEASONAL EDITION'
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
    description: 'Gaya editorial monokrom klasik menyerupai tata letak koran cetak vintage.',
    tags: ['Editorial', 'Monochrome', 'Vintage'],
    isPopular: false,
    slots: 4,
    decorations: {
      headerText: 'THE STUDIO GAZETTE',
      footerStamp: 'ARCHIVE NO. 1024'
    }
  }
];

export function createCustomFrame({ id, title, category = 'cute', themeColor = '#4A1727', bgStyle, borderColor, textColor, description = '', imageOverlayUrl = null }) {
  return {
    id: id || `custom-frame-${Date.now()}`,
    title: title || 'Custom Frame',
    category,
    themeColor,
    bgStyle: bgStyle || `linear-gradient(135deg, #FFFDFB 0%, #F8F3EF 100%)`,
    borderColor: borderColor || themeColor,
    textColor: textColor || '#4A1727',
    description,
    tags: ['Custom', category],
    isPopular: false,
    slots: 4,
    imageOverlayUrl,
    decorations: {
      headerText: (title || 'ALEASNAP').toUpperCase(),
      footerStamp: 'SPECIAL EDITION'
    }
  };
}
