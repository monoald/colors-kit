import { Rgb, Lab } from '../../types'
import { validateRgb } from '../../validate'
import { rgbToXyz } from './rgbToXyz'

/**
 * Converts an RGB color to LAB format.
 * 
 * @param {Rgb} rgb - RGB color.
 * @returns {Lab} A LAB color.
 * @throws {Error} If a RGB value is missing, is not a number, or is outside of its respective range.
*/
function rgbToLab(rgb: Rgb): Lab {
  validateRgb(rgb)

  // Convert RGB to XYZ
  const { x, y, z } = rgbToXyz(rgb)

  // Normalize the values by dividing them by the reference white values
  const var_X = x / 95.047
  const var_Y = y / 100
  const var_Z = z / 108.883

  // Non-linear transformation
  const var_X3 = var_X > 0.008856 ? Math.pow(var_X, 1 / 3) : 7.787 * var_X + 16 / 116
  const var_Y3 = var_Y > 0.008856 ? Math.pow(var_Y, 1 / 3) : 7.787 * var_Y + 16 / 116
  const var_Z3 = var_Z > 0.008856 ? Math.pow(var_Z, 1 / 3) : 7.787 * var_Z + 16 / 116

  // Calculate LAB values
  let l = Math.round(116 * var_Y3 - 16)
  let a = Math.round(500 * (var_X3 - var_Y3))
  let b = Math.round(200 * (var_Y3 - var_Z3))

  // Fix negative -0
  if (l.toString() === '0') l = 0
  if (a.toString() === '0') a = 0
  if (b.toString() === '0') b = 0

  return { l, a, b }
}

export { rgbToLab }