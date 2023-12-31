import { BaseColor, ColorFormats, Rgb } from '../types'
import converter from '../convert'
import { identifyFormat } from '../utils/identifyFormat'

/**
 * Simulate Deuteranomaly color blindness.
 * 
 * @param {BaseColor} color - The color to be simulated.
 * @returns {BaseColor} A color blindness simulation of the input color.
 * @throws {Error} If the parameter color does not follow its format requirements.
*/
function toDeuteranomaly(color: BaseColor): BaseColor {
  const format = identifyFormat(color) as keyof ColorFormats
  let deuteranomalyColor: BaseColor
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

  // Calculate Deuteranomaly values
  const newRed = Math.floor((0.8 * r) + (0.2 * g) + (0.0 * b))
  const newGreen = Math.floor((0.25833 * r) + (0.74167 * g) + (0.0 * b))
  const newBlue = Math.floor((0.0 * r) + (0.14167 * g) + (0.85833 * b))

  const newColorRgb = {
    r: newRed,
    g: newGreen,
    b: newBlue
  }

  // Convert to base format
  if (format === 'rgb') {
    deuteranomalyColor = newColorRgb
  } else {
    deuteranomalyColor = converter.colorFormatConverter(newColorRgb, {
      currentFormat: 'rgb',
      targetFormat: [format]
    })[format] as BaseColor
  }

  return deuteranomalyColor
}

export { toDeuteranomaly }