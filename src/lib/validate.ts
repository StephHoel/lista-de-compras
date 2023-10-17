export function ValidateText(text: any) {
  return text !== ''
}

export function ValidateNumber(number: any) {
  if (!Number.parseFloat(number) || number === '') {
    return false
  } else return true
}
