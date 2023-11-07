/* eslint-disable @typescript-eslint/no-explicit-any */
import { Style } from './props'

export function ValidateText(text: any) {
  return text !== ''
}

export function ValidateNumber(number: any) {
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
