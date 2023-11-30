import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

import { api } from '../lib/axios'
import { Page } from '../lib/enums'
import { ItemsProps } from '../lib/interfaces'
import { getUser, storageGet, storageRemove, storageSet } from '../lib/storage'
import { convertUSDtoBRL } from '../lib/utils'

import Header from '../components/Header'
import LinesList from '../components/LinesList'
import { ToAdd, ToOut } from '../components/Navigations'

export default function Dash() {
  const [total, setTotal] = useState(storageGet('total'))
  const [list, setList] = useState<ItemsProps[]>([])

  const navigate = useNavigate()

  useEffect(() => {
    document.title = 'Dashboard | Lista de Compras'
  }, [])

  useEffect(() => {
    if (!getUser()) return navigate(Page.home)

    storageRemove('item')
    storageRemove('total')
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
    storageSet('total', convertUSDtoBRL(valorTotal.toFixed(2)))
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
          <p className="-mt-4 mb-4">Total: R$ {convertUSDtoBRL(total)}</p>
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
                    qtd={convertUSDtoBRL(line.qtd)}
                    uni={convertUSDtoBRL(line.price.toFixed(2))}
                    total={convertUSDtoBRL((line.price * line.qtd).toFixed(2))}
                    clickTrash={() => {
                      deleteItem(line.idItem)
                    }}
                    clickPencil={() => {
                      storageSet(
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
