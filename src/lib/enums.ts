export enum Page {
  'home' = '/lista-de-compras',
  'dash' = '/lista-de-compras/dash',
  'add' = '/lista-de-compras/add',
  'edit' = '/lista-de-compras/edit',
}

export enum Style {
  'all' = 'rounded p-1 my-8 select-none flex items-center justify-center gap-2 ',
  'not' = 'bg-slate-600 pointer-events-none ',
  'yes' = 'bg-slate-800 hover:bg-slate-500 pointer-events-auto ',

  'icons' = 'lg:text-4xl sm:text-6xl ',
  'iconsInactive' = 'text-transparent pointer-events-none ',
  'iconsActive' = 'cursor-pointer hover:text-slate-800 pointer-events-auto  ',
  'div' = 'items-center flex ',
  'divBorder' = 'mr-2 pr-2 border-r border-black  ',

  'inputError' = 'border-red-600 border-2 ',
  'input' = 'rounded text-black p-1 outline-none ',

  'divError' = 'text-red-500 select-none',
}
