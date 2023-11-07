import { PropsWithChildren } from 'react'

export default function Header({ children }: PropsWithChildren) {
  return (
    <header className="flex justify-between items-center pl-4 pb-2 mb-6 border-b border-gray-50 select-none">
      <div className="text-4xl grid gap-2">
        <p>Lista de Compras</p>
      </div>

      <nav className="flex gap-4 justify-center text-center items-center">
        {children}
      </nav>
    </header>
  )
}
