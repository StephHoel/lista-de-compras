import { Route, Routes } from 'react-router-dom'

import Add from './pages/Add'
import Dash from './pages/Dash'
import Edit from './pages/Edit'
import Layout from './pages/Layout'
import NoMath from './pages/NoMath'

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Dash />} />
        <Route path="add" element={<Add />} />
        <Route path="edit" element={<Edit />} />
        <Route path="*" element={<NoMath />} />

        {/* <Route path="lista-de-compras/" element={<Home />} />
        <Route path="lista-de-compras/add" element={<Add />} />
        <Route path="lista-de-compras/login" element={<Login />} /> */}
      </Route>
    </Routes>
  )
}
