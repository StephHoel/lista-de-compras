import { FormEvent, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

import { api } from '../lib/axios'
import { Page } from '../lib/enums'
import { getUser, storageGet, storageRemove } from '../lib/storage'

import Button from '../components/Button'
import DivItem from '../components/Div/DivItem'
import DivPreco from '../components/Div/DivPreco'
import DivQtd from '../components/Div/DivQtd'
import Header from '../components/Header'
import { ToDash } from '../components/Navigations'
import { convertBRLtoUSD } from '../lib/utils'

export default function Edit() {
  const [idItem, setIdItem] = useState('')
  const [idUser, setIdUser] = useState('')
  const [item, setItem] = useState('')
  const [qtd, setQtd] = useState('')
  const [price, setPrice] = useState('')

  const [isValidItem, setIsValidItem] = useState(true)
  const [isValidQtd, setIsValidQtd] = useState(true)
  const [isValidPrice, setIsValidPrice] = useState(true)

  const [isLoading, setIsLoading] = useState(false)

  const navigate = useNavigate()

  useEffect(() => {
    const itemStorage = storageGet('item')
    const items = itemStorage?.split('|')

    if (items?.length !== undefined) {
      setIdItem(items[0])
      setIdUser(items[1])
      setItem(items[2])
      setQtd(items[3])
      setPrice(items[4])

      setIsValidItem(true)
      setIsValidQtd(true)
      setIsValidPrice(true)

      storageRemove('item')
    }

    document.title = 'Edit | Lista de Compras'

    if (!getUser()) {
      return navigate(Page.home)
    }
  }, [])

  async function handleSubmit(e: FormEvent) {
    e.preventDefault()
    setIsLoading(true)

    const preco = Number.parseFloat(convertBRLtoUSD(price))
    const qtds = Number.parseFloat(convertBRLtoUSD(qtd))

    if (idUser !== getUser() && (!item || !preco || !qtds)) {
      console.log('erro')
      alert('Não foi possível editar o item, tente novamente mais tarde')
    } else {
      const response = await api.put(
        '/items',
        {
          idItem,
          item: item.toString().trim(),
          qtd: qtds,
          price: preco,
        },
        {
          headers: {
            idUser: getUser(),
          },
        },
      )

      if (response.status === 204) {
        setIdItem('')
        setItem('')
        setQtd('')
        setPrice('')
      } else {
        alert('Não foi possível editar o item, tente novamente mais tarde')
      }
      navigate(Page.dash)
    }

    setIsLoading(false)
  }

  return (
    <>
      <Header>
        <ToDash />
      </Header>

      <main>
        {idItem && (
          <form
            className="grid mx-auto gap-4 items-center"
            onSubmit={handleSubmit}
          >
            <DivItem onChange={setItem} onValid={setIsValidItem} value={item} />

            <DivQtd onChange={setQtd} onValid={setIsValidQtd} value={qtd} />

            <DivPreco
              onChange={setPrice}
              onValid={setIsValidPrice}
              value={price}
            />

            <Button
              validateClass={
                !isValidItem || !isValidPrice || !isValidQtd || isLoading
              }
              validateText={!isValidItem || !isValidPrice || !isValidQtd}
              validateLoading={isLoading}
              text={'Editar Item'}
            />
          </form>
        )}
      </main>
    </>
  )
}
