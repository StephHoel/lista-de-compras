export function convertUSDtoBRL(price: string | number) {
  return price.toString().replace('.', ',').trim()
}

export function convertBRLtoUSD(price: string | number) {
  return price.toString().replace(',', '.').trim()
}
