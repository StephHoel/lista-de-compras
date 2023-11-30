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

export interface DivProps {
  onChange: (value: string) => void
  onValid: (value: boolean) => void
  value?: string
}
