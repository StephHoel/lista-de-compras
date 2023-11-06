import { useEffect, useState } from 'react'
import { api } from '../lib/axios'

import { useNavigate } from 'react-router-dom'
import DivError from '../components/DivError'
import Header from '../components/Header'
import { ToDash } from '../components/Navigations'
import { Buttons, Pages } from '../lib/props'
import { ValidateNumber, ValidateText } from '../lib/validate'

export default function Add() {
  const [token] = useState(sessionStorage.getItem('idUser'))

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

    if (!token) {
      return navigate(Pages.home)
    }
  }, [])

  return (
    <>
      <Header>
        <ToDash />
      </Header>

      <main className="">
        <form className="grid mx-auto gap-4 items-center">
          <div className="grid">
            <label className="p-1">Item</label>
            <input
              type="text"
              placeholder="Item"
              className={`${
                isValidItem ? '' : 'border-red-500 border-2'
              } rounded text-black p-1 outline-none`}
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
              className={`${
                isValidQtd ? '' : 'border-red-500 border-2'
              } rounded text-black p-1 outline-none`}
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
              className={`${
                isValidPrice ? '' : 'border-red-500 border-2'
              } rounded text-black p-1 outline-none`}
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
            className={`${Buttons.all} ${
              !isValidItem || !isValidPrice || !isValidQtd || isLoading
                ? Buttons.not
                : Buttons.yes
            }`}
            onClick={async (e) => {
              e.preventDefault()
              setIsLoading(true)

              const preco = Number.parseFloat(
                price.replace(',', '.').toString().trim(),
              )
              const qtds = Number.parseFloat(
                qtd.replace(',', '.').toString().trim(),
              )

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

                  const href = window.location.href
                  const location = href.split('add')[0]

                  window.location.href = location
                }
              }
            }}
          >
            {isLoading ? 'Carregando...' : 'Adicionar Item'}
          </button>
        </form>
      </main>
    </>
  )
}
