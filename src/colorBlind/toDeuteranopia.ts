import { BaseColor, ColorFormats, Rgb } from '../types'
import converter from '../convert'
import { identifyFormat } from '../utils/identifyFormat'

/**
 * Simulate Deuteranopia color blindness.
 * 
 * @param {BaseColor} color - The color to be simulated.
 * @returns {BaseColor} A color blindness simulation of the input color.
 * @throws {Error} If the parameter color does not follow its format requirements.
*/
function toDeuteranopia(color: BaseColor): BaseColor {
  const format = identifyFormat(color) as keyof ColorFormats
  let deuteranopiaColor: BaseColor
  let r: number
  let g: number
  let b: number

  // Get RGB to manipulate color
  if (format === 'rgb') {
    ({ r, g, b } = color as Rgb)
  } else {
    ({ r, g, b } = converter.colorFormatConverter(color, {
      currentFormat: format,
      targetFormat: ['rgb']
    }).rgb as Rgb)
  }

  // Calculate Deuteranopia value
  const newRed = Math.floor((0.625 * r) + (0.375 * g))
  const newGreen = Math.floor((0.7 * r) + (0.3 * g))
  const newBlue = Math.floor((0.3 * g) + (0.7 * b))

  const newColorRgb = {
    r: newRed,
    g: newGreen,
    b: newBlue
  }

  // Convert to base format
  if (format === 'rgb') {
    deuteranopiaColor = newColorRgb
  } else {
    deuteranopiaColor = converter.colorFormatConverter(newColorRgb, {
      currentFormat: 'rgb',
      targetFormat: [format]
    })[format] as BaseColor
  }

  return deuteranopiaColor
}

export { toDeuteranopia }