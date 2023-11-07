import { FormEvent, useState } from 'react'

import MD5 from 'crypto-js/md5'
import { useNavigate } from 'react-router-dom'
import { api } from '../lib/axios'
import { Page } from '../lib/props'
import { setUser } from '../lib/storage'
import { ValidateButton, ValidateInput } from '../lib/validate'
import DivError from './DivError'
import TextButton from './TextButton'

export default function FormLogin() {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const [isValidUser, setIsValidUser] = useState(true)
  const [isValidPass, setIsValidPass] = useState(true)

  const [isLoading, setIsLoading] = useState(false)

  const navigate = useNavigate()

  async function handleSubmit(e: FormEvent) {
    e.preventDefault()
    setIsLoading(true)

    if (username.trim() !== '' && password.trim() !== '') {
      try {
        const user = await api.post('/user', {
          username: username.toString().trim(),
          password: MD5(password).toString(),
        })

        if (user.status === 201) {
          setUser(user.data)
          navigate(Page.dash)
        } else
          alert('Não foi possível fazer o login, tente novamente mais tarde')
      } catch (err) {
        console.log(err)
      }
      setIsLoading(false)
    } else {
      setIsValidUser(false)
      setIsValidPass(false)
      setIsLoading(false)
    }
  }

  return (
    <form
      className="grid w-[80%] mx-auto mt-12 text-left"
      onSubmit={handleSubmit}
    >
      <label>Usuário</label>
      <input
        className={ValidateInput(isValidUser)}
        type="text"
        autoComplete="username"
        placeholder="Usuário"
        onChange={(e) => {
          const value = e.currentTarget.value

          setUsername(value)

          if (value.length < 4) setIsValidUser(false)
          else setIsValidUser(true)
        }}
        value={username}
      />
      {!isValidUser && (
        <DivError>O usuário deve ter pelo menos 4 letras</DivError>
      )}

      <label>Senha</label>
      <input
        className={ValidateInput(isValidPass)}
        type="password"
        autoComplete="current-password"
        placeholder="Senha"
        onChange={(e) => {
          const value = e.currentTarget.value

          setPassword(value)

          if (value.length === 0) setIsValidPass(false)
          else setIsValidPass(true)
        }}
        value={password}
      />
      {!isValidPass && <DivError>A senha é obrigatória</DivError>}

      <button
        className={ValidateButton(!isValidUser || !isValidPass || isLoading)}
        type="submit"
      >
        {TextButton(
          !isValidUser || !isValidPass,
          isLoading,
          'Entrar / Registrar',
        )}
      </button>
    </form>
  )
}
