import { FormEvent, useEffect, useState } from 'react'

import { addDoc, collection, deleteDoc, doc, getDocs } from 'firebase/firestore'
import db from './firebase'

import {
  ArrowCircleLeft,
  PencilSimple,
  PlusCircle,
} from '@phosphor-icons/react'

interface ListProps {
  id: string
  item: string
  qtd: number
  price: number
}

export default function Home() {
  const [page, setPage] = useState('Home')

  const [id, setId] = useState('')
  const [item, setItem] = useState('')
  const [qtd, setQtd] = useState(0)
  const [price, setPrice] = useState(0)

  const [list, setList] = useState<ListProps[]>([])

  const collec = 'buy-list'

  async function GetDocs(collec: string) {
    await getDocs(collection(db, collec)).then((querySnapshot) => {
      const lista: ListProps[] = []

      querySnapshot.forEach((doc) => {
        if (
          doc.data().item === '' &&
          doc.data().price === '' &&
          doc.data().qtd === ''
        ) {
          DeleteDoc(collec, doc.id)
        } else {
          lista.push({
            id: doc.id,
            item: doc.data().item,
            price: doc.data().price,
            qtd: doc.data().qtd,
          })
        }
      })

      lista.sort((a, b) => a.item.localeCompare(b.item))

      setList([])
      setList(lista)
    })
  }

  async function DeleteDoc(collec: string, docId: string) {
    await deleteDoc(doc(db, collec, docId))
  }

  useEffect(() => {
    async function fetchData() {
      await GetDocs('buy-list')
    }
    fetchData()
  }, [false])

  async function AddItem(e: FormEvent) {
    e.preventDefault()

    if (item !== '' || qtd !== 0 || price !== 0) {
      try {
        await addDoc(collection(db, collec), {
          item,
          qtd,
          price,
        })

        setItem('')
        setQtd(0)
        setPrice(0)

        if (id !== '') {
          DeleteDoc(collec, id)
          setId('')
        }

        await GetDocs(collec)

        setPage('Home')
      } catch (err) {
        console.error('Erro ao adicionar um documento: ', err)
      }
    } else {
      alert('Informe um item, quantidade e preço antes de adicionar um item!')
    }
  }

  // Pages
  function PageHome() {
    GetDocs(collec)

    return (
      <main className="mb-1">
        {list.length === 0 ? (
          <div className="text-center text-4xl">
            Adicione itens à sua lista de compras
          </div>
        ) : (
          <div id="list" className="text-2xl">
            <div className="w-max mr-2 pr-2 border-r border-black">
              <PencilSimple className="text-4xl text-[#545454]" />
            </div>
            <div className="mr-2 pr-2 border-r border-black">Item</div>
            <div className="mr-2 pr-2 border-r border-black text-center">
              Qtd
            </div>
            <div className="mr-2 pr-2 border-r border-black text-center">
              $ Uni
            </div>
            <div className=" text-center">$ Total</div>

            {list.map((line) => {
              return (
                <>
                  <div className="w-max mr-2 pr-2 border-r border-black">
                    <PencilSimple
                      className="text-4xl cursor-pointer hover:text-slate-800"
                      onClick={() => {
                        setId(line.id)
                        setItem(line.item)
                        setQtd(line.qtd)
                        setPrice(line.price)
                        setPage('Add')
                      }}
                    />
                  </div>
                  <div className="mr-2 pr-2 border-r border-black">
                    {line.item}
                  </div>
                  <div className="mr-2 pr-2 border-r border-black text-center">
                    {line.qtd}
                  </div>
                  <div className="mr-2 pr-2 border-r border-black flex gap-2">
                    <div>R$</div>
                    <div className="w-full text-right">
                      {line.price.toString().replace('.', ',')}
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

  function PageAdd() {
    return (
      <main className="my-1">
        <form className="grid">
          <label className="p-1">Item</label>
          <input
            type="text"
            placeholder="Item"
            className="rounded text-black p-1"
            onChange={(value) => setItem(value.currentTarget.value)}
            value={item}
          />

          <label className="p-1">Quantidade</label>
          <input
            type="number"
            placeholder="1"
            min={0}
            className="rounded text-black p-1"
            onChange={(value) => setQtd(value.currentTarget.valueAsNumber)}
            value={qtd}
          />

          <label className="p-1">Preço</label>
          <input
            type="number"
            placeholder="2.99"
            min={0}
            className="rounded text-black p-1"
            onChange={(value) => setPrice(value.currentTarget.valueAsNumber)}
            value={price}
          />

          <button
            onClick={AddItem}
            className="my-8 p-2 rounded bg-slate-700 hover:bg-slate-800"
          >
            Adicionar Item
          </button>
        </form>
      </main>
    )
  }

  return (
    <div className="p-4" id="body">
      <header className="flex justify-between items-center pl-4 pb-2 mb-1 border-b border-gray-50">
        <div className="text-5xl">Lista de Compras</div>
        <nav className="flex gap-4 justify-center text-center">
          {page === 'Home' ? (
            <PlusCircle
              className="text-6xl cursor-pointer hover:text-slate-800"
              onClick={() => {
                setPage('Add')
              }}
            />
          ) : (
            <ArrowCircleLeft
              className="text-6xl cursor-pointer hover:text-slate-800"
              onClick={() => {
                setPage('Home')
              }}
            />
          )}
        </nav>
      </header>

      {page === 'Home' ? PageHome() : page === 'Add' ? PageAdd() : null}

      <footer className="text-center items-center justify-center text-gray-400 text-xs">
        Feito por Steph Hoel @2023
      </footer>
    </div>
  )
}
