import { useEffect } from 'react'
import { redirect } from 'react-router-dom'

export default function NoMath() {
  useEffect(() => {
    document.title = 'Lista de Compras'

    if (sessionStorage.getItem('idUser')) {
      redirect('/dash')
    } else redirect('/')
  }, [])
  return (
    <>
      <header className="flex justify-between items-center pl-4 pb-2 mb-6 border-b border-gray-50">
        <div className="text-4xl grid gap-2">
          <p>Lista de Compras</p>
        </div>

        <nav className="flex gap-4 justify-center text-center items-center">
          {null}
        </nav>
      </header>

      <main>
        <h1>404 - Nothing to See Here!</h1>
      </main>
    </>
  )
}
