import { useEffect, useState } from 'react'
import { Style } from '../../lib/enums'
import { ValidateInput, ValidatePass } from '../../lib/validate'
import { DivProps } from '../../lib/interfaces'

export default function DivPass({ onChange, onValid, value = '' }: DivProps) {
  const [isValid, setIsValid] = useState(true)
  const [item, setItem] = useState('')

  useEffect(() => {
    setItem(value)
  }, [])

  return (
    <>
      <label>Senha</label>
      <input
        className={ValidateInput(isValid)}
        type="password"
        autoComplete="current-password"
        placeholder="Senha"
        onChange={(e) => {
          const value = e.currentTarget.value
          setItem(value)
          onChange(value)

          const isValid = ValidatePass(value)
          setIsValid(isValid)
          onValid(isValid)
        }}
        value={item}
      />
      {!isValid && <div className={Style.divError}>A senha é obrigatória</div>}
    </>
  )
}
