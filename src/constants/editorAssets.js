export const PHOTO_FILTERS = [
  { id: 'none', label: 'Original', icon: 'NAT', cssFilter: 'none' },
  { id: 'warm', label: 'Warm Glow', icon: 'WARM', cssFilter: 'sepia(25%) saturate(125%)' },
  { id: 'cool', label: 'Cool Tones', icon: 'COOL', cssFilter: 'hue-rotate(180deg) saturate(90%)' },
  { id: 'vintage', label: 'Vintage 90s', icon: '90s', cssFilter: 'sepia(35%) contrast(110%) brightness(95%)' },
  { id: 'soft_pink', label: 'Rosy Pink', icon: 'ROSE', cssFilter: 'hue-rotate(330deg) saturate(115%) brightness(105%)' },
  { id: 'bw', label: 'Mono B&W', icon: 'B&W', cssFilter: 'grayscale(100%)' },
  { id: 'sepia', label: 'Sepia Film', icon: 'FILM', cssFilter: 'sepia(85%)' },
  { id: 'vivid', label: 'Vivid Pop', icon: 'VIVID', cssFilter: 'saturate(150%) contrast(115%)' }
];
