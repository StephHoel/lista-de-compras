import { useEffect, useState } from 'react'
import { Style } from '../../lib/enums'
import { ValidateInput, ValidateNumber } from '../../lib/validate'
import { DivProps } from '../../lib/interfaces'

export default function DivQtd({ onChange, onValid, value = '' }: DivProps) {
  const [isValid, setIsValid] = useState(true)
  const [qtd, setQtd] = useState('')

  useEffect(() => {
    setQtd(value)
  }, [])

  return (
    <div className="grid">
      <label className="p-1">Quantidade</label>
      <input
        type="text"
        placeholder="1"
        className={ValidateInput(isValid)}
        value={qtd}
        onChange={(e) => {
          const value = e.currentTarget.value
          setQtd(value)
          onChange(value)

          const isValid = ValidateNumber(value)
          setIsValid(isValid)
          onValid(isValid)
        }}
      />
      {!isValid && (
        <div className={Style.divError}>
          Apenas dígitos de 0 a 9 são permitidos.
        </div>
      )}
    </div>
  )
}
