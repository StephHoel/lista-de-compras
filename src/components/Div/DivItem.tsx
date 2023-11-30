import { useEffect, useState } from 'react'
import { Style } from '../../lib/enums'
import { ValidateInput, ValidateText } from '../../lib/validate'
import { DivProps } from '../../lib/interfaces'

export default function DivItem({ onChange, onValid, value = '' }: DivProps) {
  const [isValid, setIsValid] = useState(true)
  const [item, setItem] = useState('')

  useEffect(() => {
    setItem(value)
  }, [])

  return (
    <div className="grid">
      <label className="p-1">Item</label>
      <input
        type="text"
        placeholder="Item"
        className={ValidateInput(isValid)}
        value={item}
        onChange={(e) => {
          const value = e.currentTarget.value
          setItem(value)
          onChange(value)

          const isValid = ValidateText(value)

          setIsValid(isValid)
          onValid(isValid)
        }}
      />
      {!isValid && (
        <div className={Style.divError}>
          Um nome é necessário para o item ser adicionado.
        </div>
      )}
    </div>
  )
}
