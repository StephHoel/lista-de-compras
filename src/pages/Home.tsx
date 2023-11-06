import { useEffect } from 'react'
import { redirect } from 'react-router-dom'
import FormLogin from '../components/FormLogin'

export default function Home() {
  useEffect(() => {
    document.title = 'Home | Lista de Compras'

    if (sessionStorage.getItem('idUser')) {
      redirect('/dash')
    }
  }, [])

  return (
    <>
      <header className="flex justify-between items-center pl-4 pb-2 mb-6 border-b border-gray-50">
        <div className="text-4xl grid gap-2">
          <p>Lista de Compras</p>
        </div>

        <nav className="flex gap-4 justify-center text-center items-center" />
      </header>
      <main className="text-center justify-center items-center">
        <p className="text-4xl mb-8">
          Anote sua lista de compras e saiba exatamente quanto vai pagar no
          final!
        </p>

        <p className="text-4xl mb-8">
          Registre-se abaixo para começar a anotar!
        </p>

        <FormLogin />
      </main>
    </>
  )
}
