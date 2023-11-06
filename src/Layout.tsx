import { Outlet } from 'react-router-dom'

export default function Layout() {
  return (
    <div className="p-4 lg:w-1/2 lg:m-auto" id="body">
      <Outlet />

      <footer className="text-center items-center justify-center text-gray-400 text-xs mt-1">
        Feito por Steph Hoel @2023
      </footer>
    </div>
  )
}
