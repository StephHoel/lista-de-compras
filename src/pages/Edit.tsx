import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { api } from '../lib/axios'
import { ValidateNumber, ValidateText } from '../lib/validate'

export default function Edit() {
  const [token] = useState(sessionStorage.getItem('idUser'))
  const navigate = useNavigate()

  const itemStorage = localStorage.getItem('item')
  const items = itemStorage?.split('|')

  const [idItem, setIdItem] = useState('')
  const [idUser, setIdUser] = useState('')
  const [item, setItem] = useState('')
  const [qtd, setQtd] = useState('')
  const [price, setPrice] = useState('')

  const [isValidItem, setIsValidItem] = useState(true)
  const [isValidQtd, setIsValidQtd] = useState(true)
  const [isValidPrice, setIsValidPrice] = useState(true)

  useEffect(() => {
    if (items) {
      setIdItem(items[0])
      setIdUser(items[1])
      setItem(items[2])
      setQtd(items[3])
      setPrice(items[4])
    }

    document.title = 'Edit | Lista de Compras'
  }, [])

  return (
    <main>
      {/* <h1>Edit</h1> */}

      {items && (
        <>
          {/* <div>{items[0]}</div>
          <div>{items[1]}</div>
          <div>{items[2]}</div>
          <div>{items[3]}</div>
          <div>{items[4]}</div> */}

          {/* <form>
            <div>
              <label htmlFor="">Item</label>
              <input type="text" value={items[2]} />
            </div>
            <div>
              <label htmlFor=""></label>
              <input type="text" value={items[3]} />
            </div>
            <div>
              <label htmlFor=""></label>
              <input type="text" value={items[4]} />
            </div>
            <button>Atualizar</button>
          </form> */}

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

                if (idUser === token) {
                  const response = await api.put(
                    '/items',
                    {
                      idItem,
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

                  if (response.status === 204) {
                    setIdItem('')
                    setItem('')
                    setQtd('')
                    setPrice('')

                    navigate('/')
                  } else {
                    alert(
                      'Não foi possível editar o item, tente novamente mais tarde',
                    )
                    navigate('/')
                  }
                } else {
                  alert(
                    'Não foi possível editar o item, tente novamente mais tarde',
                  )
                  navigate('/')
                }
              }}
              className="my-8 p-2 rounded bg-slate-700 hover:bg-slate-800"
            >
              Adicionar Item
            </button>
          </form>
        </>
      )}
    </main>
  )
}
