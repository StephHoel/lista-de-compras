import { FormEvent, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

import { api } from '../lib/axios'
import { Page } from '../lib/props'
import { getUser } from '../lib/storage'
import {
  ValidateButton,
  ValidateInput,
  ValidateNumber,
  ValidateText,
} from '../lib/validate'

import DivError from '../components/DivError'
import Header from '../components/Header'
import { ToDash } from '../components/Navigations'
import TextButton from '../components/TextButton'

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

    const preco = Number.parseFloat(price.replace(',', '.').toString().trim())
    const qtds = Number.parseFloat(qtd.replace(',', '.').toString().trim())

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
          <div className="grid">
            <label className="p-1">Item</label>
            <input
              type="text"
              placeholder="Item"
              className={ValidateInput(isValidItem)}
              value={item}
              onChange={(e) => {
                const value = e.currentTarget.value
                setItem(value)
                setIsValidItem(ValidateText(value))
              }}
            />
            {!isValidItem && (
              <DivError>
                Um nome é necessário para o item ser adicionado.
              </DivError>
            )}
          </div>

          <div className="grid">
            <label className="p-1">Quantidade</label>
            <input
              type="text"
              placeholder="1"
              className={ValidateInput(isValidQtd)}
              value={qtd}
              onChange={(e) => {
                const value = e.currentTarget.value
                setQtd(value)
                setIsValidQtd(ValidateNumber(value))
              }}
            />
            {!isValidQtd && (
              <DivError>Apenas dígitos de 0 a 9 são permitidos.</DivError>
            )}
          </div>

          <div className="grid">
            <label className="p-1">Preço</label>
            <input
              type="text"
              placeholder="2.99"
              className={ValidateInput(isValidPrice)}
              value={price}
              onChange={(e) => {
                const value = e.currentTarget.value
                setPrice(value)
                setIsValidPrice(ValidateNumber(value))
              }}
            />
            {!isValidPrice && (
              <DivError>Apenas dígitos de 0 a 9 são permitidos.</DivError>
            )}
          </div>

          <button
            className={ValidateButton(
              !isValidItem || !isValidPrice || !isValidQtd || isLoading,
            )}
            type="submit"
          >
            {TextButton(
              !isValidItem || !isValidPrice || !isValidQtd,
              isLoading,
              'Adicionar Item',
            )}
          </button>
        </form>
      </main>
    </>
  )
}
