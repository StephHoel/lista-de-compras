import { useEffect, useState } from 'react'
import { Style } from '../../lib/enums'
import { ValidateInput, ValidateNumber } from '../../lib/validate'
import { DivProps } from '../../lib/interfaces'

export default function DivPreco({ onChange, onValid, value = '' }: DivProps) {
  const [isValidPrice, setIsValidPrice] = useState(true)
  const [price, setPrice] = useState('')

  useEffect(() => {
    setPrice(value)
  }, [])

  return (
    <div className="grid">
      <label className="p-1">Preço</label>
      <input
        type="text"
        placeholder="2.99"
        className={ValidateInput(isValidPrice)}
        value={price}
        onChange={(e) => {
          const value = e.currentTarget.value
          setPrice(value)
          onChange(value)

          const isValid = ValidateNumber(value, true)
          setIsValidPrice(isValid)
          onValid(isValid)
        }}
      />
      {!isValidPrice && (
        <div className={Style.divError}>
          Apenas dígitos de 0 a 9 são permitidos.
        </div>
      )}
    </div>
  )
}
