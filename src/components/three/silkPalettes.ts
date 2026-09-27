export type SilkPalette = 'ivory' | 'wine' | 'burgundy'

export type SilkTone = {
  deep: string
  base: string
  light: string
  sheen: string
  bg: string
  amplitude: number
  fadeBottom: number
  fadeTop: number
}

export const SILK_TONES: Record<SilkPalette, SilkTone> = {
  ivory: {
    deep: '#d6c8b3',
    base: '#ede5d8',
    light: '#faf6ef',
    sheen: '#fffdf9',
    bg: '#f3ede3',
    amplitude: 0.34,
    fadeBottom: 0.22,
    fadeTop: 0.08,
  },
  wine: {
    deep: '#2b0d16',
    base: '#5c2332',
    light: '#86404f',
    sheen: '#c98f8f',
    bg: '#6d3140',
    amplitude: 0.42,
    fadeBottom: 0.1,
    fadeTop: 0.16,
  },
  burgundy: {
    deep: '#1a0509',
    base: '#3e0d15',
    light: '#54121e',
    sheen: '#8c4a52',
    bg: '#3e0d15',
    amplitude: 0.3,
    fadeBottom: 0.18,
    fadeTop: 0.22,
  },
}
