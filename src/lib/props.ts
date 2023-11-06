export interface ItemProps {
  item: string
  qtd: number
  price: number
}

export interface ItemsProps {
  idItem: string
  idUser: string
  item: string
  qtd: number
  price: number
  createdAt: Date
  updatedAt: Date
}

export enum Pages {
  'home' = '/lista-de-compras',
  'dash' = '/lista-de-compras/dash',
  'add' = '/lista-de-compras/add',
  'edit' = '/lista-de-compras/edit',
}

export enum Buttons {
  'all' = 'rounded p-1 my-8 select-none flex items-center justify-center gap-2',
  'not' = 'bg-slate-600 pointer-events-none',
  'yes' = 'bg-slate-800 hover:bg-slate-500 pointer-events-auto',
}
