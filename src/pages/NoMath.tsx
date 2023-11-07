import { useEffect } from 'react'
import Header from '../components/Header'

export default function NoMath() {
  useEffect(() => {
    document.title = 'Lista de Compras'
  }, [])
  return (
    <>
      <Header>{null}</Header>

      <main className="text-center">
        <h1>404 - Nothing to See Here!</h1>
      </main>
    </>
  )
}
