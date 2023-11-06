import { Route, Routes } from 'react-router-dom'

import Layout from './Layout'
import Add from './pages/Add'
import Dash from './pages/Dash'
import Edit from './pages/Edit'
import Home from './pages/Home'
import NoMath from './pages/NoMath'

export default function App() {
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
