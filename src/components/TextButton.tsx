/* eslint-disable prettier/prettier */
export default function TextButton(
  campo: boolean,
  loading: boolean,
  text: string,
) {
  return (
    <>
      {campo
        ? 'Preencha os campos antes de clicar aqui'
        : loading
          ? 'Aguarde, carregando...'
          : text}
    </>
  )
}
