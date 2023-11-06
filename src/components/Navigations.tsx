import { ArrowCircleLeft, PlusCircle, SignOut } from '@phosphor-icons/react'
import { useNavigate } from 'react-router-dom'
import { Pages } from '../lib/props'

export function ToAdd() {
  const navigate = useNavigate()

  return (
    <PlusCircle
      className="text-6xl cursor-pointer hover:text-slate-800"
      onClick={() => {
        navigate(Pages.add)
      }}
    />
  )
}

export function ToOut() {
  const navigate = useNavigate()

  return (
    <SignOut
      className="text-6xl cursor-pointer hover:text-slate-800"
      onClick={() => {
        sessionStorage.removeItem('idUser')
        navigate(Pages.home)
      }}
    />
  )
}

export function ToDash() {
  const navigate = useNavigate()

  return (
    <ArrowCircleLeft
      className="text-6xl cursor-pointer hover:text-slate-800"
      onClick={() => {
        navigate(Pages.dash)
      }}
    />
  )
}
