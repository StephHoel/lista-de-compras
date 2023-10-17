import MD5 from 'crypto-js/md5'
import { useEffect, useState } from 'react'
import { api } from '../lib/axios'

export default function Home() {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const [isValidUser, setIsValidUser] = useState(true)
  const [isValidPass, setIsValidPass] = useState(true)

  useEffect(() => {
    document.title = 'Home | Lista de Compras'
  }, [])

  return (
    <main className="text-center justify-center items-center">
      <p className="text-4xl mb-8">
        Anote sua lista de compras e saiba exatamente quanto vai pagar no final!
      </p>

      <p className="text-4xl mb-8">Registre-se abaixo para começar a anotar!</p>

      <form className="grid w-[80%] mx-auto mt-12 text-left">
        <label>Usuário</label>
        <input
          className={`${
            !isValidUser ? 'border-red-600 border-2' : ''
          } rounded outline-none text-black p-1 mb-2`}
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
          <div className="text-red-600 select-none">
            O usuário deve ter pelo menos 4 letras
          </div>
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
        {!isValidPass && (
          <div className="text-red-500 select-none">A senha é obrigatória</div>
        )}

        <button
          className={`rounded p-1 my-8 bg-slate-800 hover:bg-slate-500 ${
            !isValidUser || !isValidPass
              ? 'cursor-not-allowed bg-slate-500'
              : ''
          }`}
          onClick={async (e) => {
            e.preventDefault()

            const user = await api.post('/user', {
              username,
              password: MD5(password).toString(),
            })

            if (user.status === 201) {
              sessionStorage.setItem('idUser', user.data.idUser)
              window.location.reload()
            }
          }}
        >
          Registrar
        </button>
      </form>
    </main>
  )
}