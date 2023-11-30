/* eslint-disable prettier/prettier */
import { Style } from '../lib/enums'

interface ButtonProps {
  validateClass: boolean
  validateText: boolean
  validateLoading: boolean
  text: string
}

export default function Button({
  validateClass,
  validateText,
  validateLoading,
  text,
}: ButtonProps) {
  return (
    <button
      className={Style.all + (validateClass ? Style.not : Style.yes)}
      type="submit"
    >
      {validateText
        ? 'Preencha os campos antes de clicar aqui'
        : validateLoading
          ? 'Aguarde, carregando...'
          : text}
    </button>
  )
}
