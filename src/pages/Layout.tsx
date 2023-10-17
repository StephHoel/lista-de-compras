import { useState } from 'react'

import type { LinkProps } from 'react-router-dom'
import { Link, Outlet, useMatch, useResolvedPath } from 'react-router-dom'

import { ArrowCircleLeft, PlusCircle, SignOut } from '@phosphor-icons/react'
import Home from './Home'

export default function Layout() {
  const [token, setToken] = useState(sessionStorage.getItem('idUser'))

  const [page, setPage] = useState('')

  return (
    <div className="p-4 lg:w-1/2 lg:m-auto" id="body">
      <header className="flex justify-between items-center pl-4 pb-2 mb-6 border-b border-gray-50">
        <div className="text-4xl grid gap-2">
          <p>Lista de Compras</p>
        </div>

        <nav className="flex gap-4 justify-center text-center items-center">
          {token ? (
            page.includes('Add') ? (
              <CustomLink to="/" onClick={() => setPage('')}>
                <ArrowCircleLeft className="text-6xl cursor-pointer hover:text-slate-800" />
              </CustomLink>
            ) : (
              <>
                <CustomLink
                  to="/add"
                  onClick={() => {
                    setPage('Add')
                  }}
                >
                  <PlusCircle className="text-6xl cursor-pointer hover:text-slate-800" />
                </CustomLink>
                <CustomLink
                  to="/"
                  onClick={() => {
                    sessionStorage.removeItem('idUser')
                    setToken('')
                  }}
                >
                  <SignOut className="text-6xl cursor-pointer hover:text-slate-800" />
                </CustomLink>
              </>
            )
          ) : null}
        </nav>
      </header>

      {token ? <Outlet /> : <Home />}

      <footer className="text-center items-center justify-center text-gray-400 text-xs mt-1">
        Feito por Steph Hoel @2023
      </footer>
    </div>
  )
}

export function CustomLink({ children, to, ...props }: LinkProps) {
  const resolved = useResolvedPath(to)
  const match = useMatch({ path: resolved.pathname, end: true })

  const host = document.location.origin
  const path = '/lista-de-compras/'
  const docHref = document.location.href.split('/')
  const newDocHref = docHref[docHref.length - 1]
  const newPath = host + path + newDocHref

  window.history.pushState({}, '', newPath)

  return (
    <div>
      <Link
        style={{ textDecoration: match ? 'underline' : 'none' }}
        to={to}
        {...props}
      >
        {children}
      </Link>
    </div>
  )
}
