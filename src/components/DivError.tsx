import { PropsWithChildren } from 'react'

export default function DivError({ children }: PropsWithChildren) {
  return <div className="text-red-500 select-none">{children}</div>
}
