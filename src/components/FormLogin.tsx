import { FormEvent, useState } from 'react'

import MD5 from 'crypto-js/md5'
import { useNavigate } from 'react-router-dom'
import { api } from '../lib/axios'
import { Page } from '../lib/enums'
import { setUser } from '../lib/storage'
import Button from './Button'
import DivPass from './Div/DivPass'
import DivUser from './Div/DivUser'

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
      <DivUser onChange={setUsername} onValid={setIsValidUser} />

      <DivPass onChange={setPassword} onValid={setIsValidPass} />

      <Button
        validateClass={!isValidUser || !isValidPass || isLoading}
        validateText={!isValidUser || !isValidPass}
        validateLoading={isLoading}
        text={'Entrar / Registrar'}
      />
    </form>
  )
}
