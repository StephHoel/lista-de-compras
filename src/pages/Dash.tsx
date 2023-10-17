import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

import { ItemsProps } from '../lib/props'

import { api } from '../lib/axios'

import { PencilSimple, Trash } from '@phosphor-icons/react'

export default function Dash() {
  const [token] = useState(sessionStorage.getItem('idUser'))
  const [total, setTotal] = useState(localStorage.getItem('total'))
  const [list, setList] = useState<ItemsProps[]>([])

  const navigate = useNavigate()

  async function getList() {
    const lista = await api.get('/items', {
      headers: {
        idUser: token,
      },
    })

    setList(lista.data)

    let valorTotal = 0
    lista.data.map((item: ItemsProps) => {
      valorTotal += item.price * item.qtd
    })
    localStorage.setItem(
      'total',
      valorTotal.toFixed(2).toString().replace('.', ','),
    )
    setTotal(valorTotal.toFixed(2).toString())
  }

  async function deleteItem(idItem: string) {
    await api.delete(`/items/${idItem}`, {
      headers: {
        idUser: token,
      },
    })

    getList()
  }

  useEffect(() => {
    localStorage.removeItem('item')
    localStorage.removeItem('total')
    getList()
  }, [token])

  useEffect(() => {
    document.title = 'Dashboard | Lista de Compras'
  }, [])

  return (
    <main className="text-center justify-center items-center">
      {total && (
        <p className="-mt-4 mb-4">Total: R$ {total.replace('.', ',')}</p>
      )}

      {list.length === 0 && !total ? (
        <div className="text-center text-4xl">
          Adicione itens à sua lista de compras
        </div>
      ) : (
        <div id="list" className="text-2xl">
          <div className="w-max mr-2 pr-2 border-r border-black flex">
            <Trash className="text-4xl text-gray-500 cursor-not-allowed" />
            <PencilSimple className="text-4xl text-gray-500 cursor-not-allowed" />
          </div>
          <div className="mr-2 pr-2 border-r border-black font-bold">Item</div>
          <div className="mr-2 pr-2 border-r border-black text-center font-bold">
            Qtd
          </div>
          <div className="mr-2 pr-2 border-r border-black text-center font-bold">
            $ Uni
          </div>
          <div className="text-center font-bold">$ Total</div>

          {list.map((line) => {
            return (
              <>
                <div className="w-max mr-2 pr-2 border-r border-black flex">
                  <Trash
                    className="text-4xl cursor-pointer hover:text-slate-800"
                    onClick={() => {
                      deleteItem(line.idItem)
                    }}
                  />
                  <PencilSimple
                    className="text-4xl cursor-pointer hover:text-slate-800"
                    onClick={() => {
                      localStorage.setItem(
                        'item',
                        `${line.idItem}|${line.idUser}|${line.item}|${line.qtd}|${line.price}`,
                      )
                      navigate('/edit')
                    }}
                  />
                </div>
                <div className="mr-2 pr-2 border-r border-black text-left">
                  {line.item}
                </div>
                <div className="mr-2 pr-2 border-r border-black text-center">
                  {line.qtd.toString().replace('.', ',')}
                </div>
                <div className="mr-2 pr-2 border-r border-black flex gap-2">
                  <div>R$</div>
                  <div className="w-full text-right">
                    {line.price.toFixed(2).toString().replace('.', ',')}
                  </div>
                </div>
                <div className="flex gap-2">
                  <div>R$</div>
                  <div className="w-full text-right">
                    {(line.price * line.qtd)
                      .toFixed(2)
                      .toString()
                      .replace('.', ',')}
                  </div>
                </div>
              </>
            )
          })}
        </div>
      )}
    </main>
  )
}
