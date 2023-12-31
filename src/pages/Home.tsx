import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import FormLogin from '../components/FormLogin'
import Header from '../components/Header'
import { Page } from '../lib/enums'
import { getUser, storageGet, storageRemove } from '../lib/storage'

export default function Home() {
  const navigate = useNavigate()

  useEffect(() => {
    document.title = 'Home | Lista de Compras'

    const redirect = storageGet('redirect')
    storageRemove('redirect')

    if (redirect !== undefined && redirect !== null) {
      if (getUser()) {
        navigate(Page.dash)
      } else navigate(redirect)
    }
  }, [])

  return (
    <>
      <Header>{null}</Header>

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
