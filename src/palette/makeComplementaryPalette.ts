import { AnyFormat, BaseColor, ColorFormats, Hsl } from '../types'
import { colorFormatConverter } from '../convert'
import { identifyFormat } from '../utils/identifyFormat'


function makeComplementaryPalette(color: BaseColor): Array<AnyFormat> {
  const format = identifyFormat(color) as keyof ColorFormats
  let h: number
  let s: number
  let l: number

  // Get HSL value to manipulate Hue
  if (format === 'hsl') {
    ({ h, s, l } = color as Hsl)
  } else {
    ({ h, s, l} = colorFormatConverter(color, {
      currentFormat: format, targetFormat: ['hsl']
    }).hsl)
  }

  // Calculate complementary hue
  const complementaryHue = (h + 180) % 360
  let complementaryRgb: ColorFormats = {
    hsl: { h: complementaryHue, s, l }
  }

  if (format !== 'hsl') {
    complementaryRgb = colorFormatConverter(complementaryRgb.hsl, {
      currentFormat: 'hsl',
      targetFormat: [format]
    })
  }

  return [color, complementaryRgb[format]]
}

export { makeComplementaryPalette }