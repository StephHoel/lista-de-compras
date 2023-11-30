import { ArrowCircleLeft, PlusCircle, SignOut } from '@phosphor-icons/react'
import { useNavigate } from 'react-router-dom'
import { Page } from '../lib/enums'
import { removeUser, storageRemove } from '../lib/storage'

export function ToAdd() {
  const navigate = useNavigate()

  return (
    <PlusCircle
      className="text-6xl cursor-pointer hover:text-slate-800"
      onClick={() => {
        navigate(Page.add)
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
        removeUser()
        storageRemove('total')
        navigate(Page.home)
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
        navigate(Page.dash)
      }}
    />
  )
}
