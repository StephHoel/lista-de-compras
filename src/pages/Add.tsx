import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { api } from '../lib/axios'
import { ValidateNumber, ValidateText } from '../lib/validate'

export default function Add() {
  const [token] = useState(sessionStorage.getItem('idUser'))
  const navigate = useNavigate()

  const [isValidItem, setIsValidItem] = useState(true)
  const [isValidQtd, setIsValidQtd] = useState(true)
  const [isValidPrice, setIsValidPrice] = useState(true)

  const [item, setItem] = useState('')
  const [qtd, setQtd] = useState('')
  const [price, setPrice] = useState('')

  useEffect(() => {
    document.title = 'Add | Lista de Compras'
  }, [])

  return (
    <main className="">
      <form className="grid mx-auto gap-4 items-center">
        <div className="grid">
          <label className="p-1">Item</label>
          <input
            type="text"
            placeholder="Item"
            className={`${
              isValidItem ? '' : 'border-red-600 border-2'
            } rounded text-black p-1 outline-none`}
            value={item}
            onChange={(e) => {
              const value = e.currentTarget.value
              setItem(value)
              setIsValidItem(ValidateText(value))
            }}
          />
          {!isValidItem && (
            <p style={{ color: 'red' }}>
              Um nome é necessário para o item ser adicionado.
            </p>
          )}
        </div>

        <div className="grid">
          <label className="p-1">Quantidade</label>
          <input
            type="text"
            placeholder="1"
            className={`${
              isValidQtd ? '' : 'border-red-600 border-2'
            } rounded text-black p-1 outline-none`}
            value={qtd}
            onChange={(e) => {
              const value = e.currentTarget.value
              setQtd(value)
              setIsValidQtd(ValidateNumber(value))
            }}
          />
          {!isValidQtd && (
            <p style={{ color: 'red' }}>
              Apenas dígitos de 0 a 9 são permitidos.
            </p>
          )}
        </div>

        <div className="grid">
          <label className="p-1">Preço</label>
          <input
            type="text"
            placeholder="2.99"
            className={`${
              isValidPrice ? '' : 'border-red-600 border-2'
            } rounded text-black p-1 outline-none`}
            value={price}
            onChange={(e) => {
              const value = e.currentTarget.value
              setPrice(value)
              setIsValidPrice(ValidateNumber(value))
            }}
          />
          {!isValidPrice && (
            <p style={{ color: 'red' }}>
              Apenas dígitos de 0 a 9 são permitidos.
            </p>
          )}
        </div>

        <button
          onClick={async (e) => {
            e.preventDefault()

            const preco = Number.parseFloat(price.replace(',', '.'))
            const qtds = Number.parseFloat(qtd.replace(',', '.'))

            if (!item && !preco && !qtds) {
              alert('Item, quantidade e preço necessários!')
            } else {
              const response = await api.post(
                '/items',
                {
                  item,
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

                navigate('/')
              }
            }
          }}
          className="my-8 p-2 rounded bg-slate-700 hover:bg-slate-800"
        >
          Adicionar Item
        </button>
      </form>
    </main>
  )
}
