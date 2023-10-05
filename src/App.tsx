import { Route, Routes } from 'react-router-dom'

import Home from './Home'
import './index.css'

export default function App() {
  return (
    <Routes>
      <Route path="/" index element={<Home />} />

      <Route path="lista-de-compras/" element={<Home />} />
    </Routes>
  )
}
