//--------------COLORS-----------

export interface Cmyk {
  c: number
  m: number
  y: number
  k: number
}

export type Hex = string
export interface Hsl {
  h: number
  s: number
  l: number
}

export interface Hsv {
  h: number
  s: number
  v: number
}

export interface Lab {
  l: number
  a: number
  b: number
}

export interface Rgb {
  r: number
  g: number
  b: number
}

export interface Xyz {
  x: number
  y: number
  z: number
}

export interface ColorFormats {
  cmyk?: Cmyk
  hex?: string
  hsl?: Hsl
  hsv?: Hsv
  lab?: Lab
  rgb?: Rgb
  xyz?: Xyz
}

export interface Range {
  min: number,
  max: number
}

export type BaseColor = Cmyk | string | Hsl | Hsv | Rgb

export type Color = Cmyk | string | Hsl | Hsv | Lab | Rgb | Xyz

export type Colors = Array<Color>

export type K = number

//----------WCAG-----------
export interface Level {
  smallTextMinimum: number
  smallText: boolean

  largeTextMinimum: number
  largeText: boolean

  uiComponentMinimum: number
  uiComponent: boolean
}

export interface WCAGRequierements {
  contrastValue: number
  AA: Level
  AAA: Level
}

//----------SELECTION-----------
export type ColorBlindness = 'achromatomaly' | 'achromatopsia' | 'deuteranomaly' | 'deuteranopia' | 'protanomaly' | 'protanopia' | 'tritanomaly' | 'tritanopia'

export type Palette = 'analogous' | 'complementary' | 'monochromatic' | 'split-complementary' | 'square' | 'tetradic' | 'triadic' | 'random' | 'shades' | 'mixed'

export type Format = 'hex' | 'cmyk' | 'hsl' | 'hsv' | 'rgb' | 'lab' | 'xyz'