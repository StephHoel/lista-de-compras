import { PencilSimple, Trash } from '@phosphor-icons/react'
import { Style } from '../lib/enums'

interface LinesProps {
  firstLine?: boolean
  item: string
  qtd: string
  uni: string
  total: string
  clickTrash?: () => void
  clickPencil?: () => void
}

export default function LinesList({
  firstLine = true,
  item,
  qtd,
  uni,
  total,
  clickTrash = () => null,
  clickPencil = () => null,
}: LinesProps) {
  return (
    <>
      <div className={`${Style.div} ${Style.divBorder} w-max `}>
        <Trash
          className={`${Style.icons} 
            ${firstLine ? Style.iconsInactive : Style.iconsActive}
          `}
          onClick={clickTrash}
        />
        <PencilSimple
          className={`${Style.icons}
            ${firstLine ? Style.iconsInactive : Style.iconsActive}
          `}
          onClick={clickPencil}
        />
      </div>
      <div
        className={`${Style.div} ${Style.divBorder} 
            ${firstLine ? 'font-bold justify-center' : 'text-left'} `}
      >
        {item}
      </div>
      <div
        className={`${Style.div} ${Style.divBorder} 
            ${firstLine ? 'text-center font-bold' : 'justify-center'} `}
      >
        {qtd}
      </div>
      <div
        className={`${firstLine ? 'text-center font-bold' : ''} 
        justify-between ${Style.div} ${Style.divBorder} `}
      >
        <div>R$</div>
        <div className="w-full text-right">{uni}</div>
      </div>
      <div
        className={`${firstLine ? 'text-center font-bold' : ''}
        justify-between ${Style.div} `}
      >
        <div>R$</div>
        <div className="w-full text-right">{total}</div>
      </div>
    </>
  )
}
