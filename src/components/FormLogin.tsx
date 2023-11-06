import { useState } from 'react'

import MD5 from 'crypto-js/md5'
import { useNavigate } from 'react-router-dom'
import { api } from '../lib/axios'
import { Buttons } from '../lib/props'
import DivError from './DivError'

export default function FormLogin() {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const [isValidUser, setIsValidUser] = useState(true)
  const [isValidPass, setIsValidPass] = useState(true)

  const [isLoading, setIsLoading] = useState(false)

  const navigate = useNavigate()

  return (
    <form className="grid w-[80%] mx-auto mt-12 text-left">
      <label>Usuário</label>
      <input
        className={`${
          !isValidUser ? 'border-red-600 border-2' : ''
        } rounded outline-none text-black p-1`}
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
        className={`${
          !isValidPass ? 'border-red-500 border-2' : ''
        } rounded outline-none text-black p-1`}
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
        className={`${Buttons.all} ${
          !isValidUser || !isValidPass || isLoading ? Buttons.not : Buttons.yes
        }`}
        onClick={async (e) => {
          e.preventDefault()
          setIsLoading(true)

          if (username.trim() !== '' && password.trim() !== '') {
            try {
              const user = await api.post('/user', {
                username: username.toString().trim(),
                password: MD5(password).toString(),
              })

              // console.log('idUser', user.data)
              if (user.status === 201) {
                sessionStorage.setItem('idUser', user.data.idUser)
                navigate('/lista-de-compras/dash')
              }
              setIsLoading(false)
            } catch (err) {
              console.log(err)
            }
          } else {
            setIsValidUser(false)
            setIsValidPass(false)
            setIsLoading(false)
          }
        }}
      >
        {isLoading ? 'Carregando...' : 'Entrar / Registrar'}
      </button>
    </form>
  )
}
