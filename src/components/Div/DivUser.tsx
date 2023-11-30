import { useEffect, useState } from 'react'
import { Style } from '../../lib/enums'
import { ValidateInput, ValidateUser } from '../../lib/validate'
import { DivProps } from '../../lib/interfaces'

export default function DivUser({ onChange, onValid, value = '' }: DivProps) {
  const [isValid, setIsValid] = useState(true)
  const [item, setItem] = useState('')

  useEffect(() => {
    setItem(value)
  }, [])

  return (
    <>
      <label>Usuário</label>
      <input
        className={ValidateInput(isValid)}
        type="text"
        autoComplete="username"
        placeholder="Usuário"
        onChange={(e) => {
          const value = e.currentTarget.value
          setItem(value)
          onChange(value)

          const isValid = ValidateUser(value)
          setIsValid(isValid)
          onValid(isValid)
        }}
        value={item}
      />
      {!isValid && (
        <div className={Style.divError}>
          O usuário deve ter pelo menos 4 letras
        </div>
      )}
    </>
  )
}
