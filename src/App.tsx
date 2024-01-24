import { useEffect } from 'react'
import { Route, Routes } from 'react-router-dom'

import { api } from './lib/axios'

import Layout from './Layout'
import Add from './pages/Add'
import Dash from './pages/Dash'
import Edit from './pages/Edit'
import Home from './pages/Home'
import NoMath from './pages/NoMath'

export default function App() {
  useEffect(() => {
    async function awake() {
      console.log((await api.get('/')).data)
    }

    awake()
  }, [])

  return (
    <Routes>
      <Route path="/lista-de-compras" element={<Layout />}>
        <Route index element={<Home />} />

        <Route path="dash" element={<Dash />} />
        <Route path="add" element={<Add />} />
        <Route path="edit" element={<Edit />} />

        <Route path="*" element={<NoMath />} />
      </Route>
    </Routes>
  )
}
