import { FormEvent, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

import { api } from '../lib/axios'
import { Page } from '../lib/enums'
import { getUser } from '../lib/storage'

import Button from '../components/Button'
import DivItem from '../components/Div/DivItem'
import DivPreco from '../components/Div/DivPreco'
import DivQtd from '../components/Div/DivQtd'
import Header from '../components/Header'
import { ToDash } from '../components/Navigations'
import { convertBRLtoUSD } from '../lib/utils'

export default function Add() {
  const [token] = useState(getUser())

  const [isValidItem, setIsValidItem] = useState(true)
  const [isValidQtd, setIsValidQtd] = useState(true)
  const [isValidPrice, setIsValidPrice] = useState(true)

  const [isLoading, setIsLoading] = useState(false)

  const [item, setItem] = useState('')
  const [qtd, setQtd] = useState('')
  const [price, setPrice] = useState('')

  const navigate = useNavigate()

  useEffect(() => {
    document.title = 'Add | Lista de Compras'

    if (!getUser()) {
      return navigate(Page.home)
    }
  }, [])

  async function handleSubmit(e: FormEvent) {
    e.preventDefault()
    setIsLoading(true)

    const preco = Number.parseFloat(convertBRLtoUSD(price))
    const qtds = Number.parseFloat(convertBRLtoUSD(qtd))

    if (!item || !preco || !qtds) {
      setIsValidItem(item !== '')
      setIsValidPrice(price !== '')
      setIsValidQtd(qtd !== '')
      setIsLoading(false)
    } else {
      const response = await api.post(
        '/items',
        {
          item: item.toString().trim(),
          qtd: qtds,
          price: preco,
        },
        {
          headers: {
            idUser: token,
          },
        },
      )

      if (response.status === 200) {
        setItem('')
        setQtd('')
        setPrice('')

        navigate(Page.dash)
      } else
        alert('Não foi possível adicionar o item, tente novamente mais tarde')
    }
  }

  return (
    <>
      <Header>
        <ToDash />
      </Header>

      <main className="">
        <form
          className="grid mx-auto gap-4 items-center"
          onSubmit={handleSubmit}
        >
          <DivItem onChange={setItem} onValid={setIsValidItem} />

          <DivQtd onChange={setQtd} onValid={setIsValidQtd} />

          <DivPreco onChange={setPrice} onValid={setIsValidPrice} />

          <Button
            validateClass={
              !isValidItem || !isValidPrice || !isValidQtd || isLoading
            }
            validateText={!isValidItem || !isValidPrice || !isValidQtd}
            validateLoading={isLoading}
            text={'Adicionar Item'}
          />
        </form>
      </main>
    </>
  )
}
