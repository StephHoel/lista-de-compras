import { Style } from './enums'
import { convertBRLtoUSD } from './utils'

export function ValidateText(text: string) {
  return text !== ''
}

export function ValidateNumber(number: number | string, price = false) {
  number = convertBRLtoUSD(number)
  console.log('price', price)
  console.log('number', number)
  console.log('converted number', Number.parseFloat(number))

  if (price && !Number.isNaN(Number.parseFloat(number))) return true

  if (!Number.parseFloat(number) || number === '') {
    return false
  } else return true
}

export function ValidateInput(validField: boolean) {
  return Style.input + (!validField && Style.inputError)
}

export function ValidateButton(validFields: boolean) {
  return Style.all + (validFields ? Style.not : Style.yes)
}

export function ValidateUser(user: string) {
  if (user.length < 4) return false
  else return true
}

export function ValidatePass(pass: string) {
  if (pass.length === 0) return false
  else return true
}
