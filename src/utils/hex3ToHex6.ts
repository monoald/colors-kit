function hex3ToHex6(hex: string) {
  // Extract values
  let hexR = hex.substring(1, 2)
  let hexG = hex.substring(2, 3)
  let hexB = hex.substring(3, 4)

  // Duplicate values
  hexR = hexR + hexR
  hexG = hexG + hexG
  hexB = hexB + hexB

  return '#' + hexR + hexG + hexB
}

export { hex3ToHex6 }