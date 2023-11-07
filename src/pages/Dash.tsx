import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

import { api } from '../lib/axios'
import { ItemsProps, Page } from '../lib/props'
import { getUser } from '../lib/storage'

import Header from '../components/Header'
import LinesList from '../components/LinesList'
import { ToAdd, ToOut } from '../components/Navigations'

export default function Dash() {
  const [total, setTotal] = useState(localStorage.getItem('total'))
  const [list, setList] = useState<ItemsProps[]>([])

  const navigate = useNavigate()

  useEffect(() => {
    document.title = 'Dashboard | Lista de Compras'
  }, [])

  useEffect(() => {
    if (!getUser()) return navigate(Page.home)

    localStorage.removeItem('item')
    localStorage.removeItem('total')
    getList()
  }, [])

  async function getList() {
    const lista = await api.get('/items', {
      headers: {
        idUser: getUser(),
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
        idUser: getUser(),
      },
    })

    getList()
  }

  return (
    <>
      <Header>
        <ToAdd />

        <ToOut />
      </Header>

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
            <LinesList item={'Item'} qtd={'Qtd'} uni={'Uni'} total={'Total'} />

            {list.map((line) => {
              return (
                <>
                  <LinesList
                    firstLine={false}
                    item={line.item}
                    qtd={line.qtd.toString().replace('.', ',')}
                    uni={line.price.toFixed(2).toString().replace('.', ',')}
                    total={(line.price * line.qtd)
                      .toFixed(2)
                      .toString()
                      .replace('.', ',')}
                    clickTrash={() => {
                      deleteItem(line.idItem)
                    }}
                    clickPencil={() => {
                      localStorage.setItem(
                        'item',
                        `${line.idItem}|${line.idUser}|${line.item}|${line.qtd}|${line.price}`,
                      )
                      navigate(Page.edit)
                    }}
                  />
                </>
              )
            })}
          </div>
        )}
      </main>
    </>
  )
}
