import { AppContext } from '@/context/auth'
import Head from 'next/head'
import { Children, useContext } from 'react'

export default function Home() {

  const { strapi } = useContext(AppContext)

  return (
    <>
      <Head>
        <title>Inicio</title>
      </Head>
      <h2>Productos</h2>
      <div className='flex flex-col gap-2'>
        {
          strapi?.data?
          Children.toArray(
            strapi.data.map(e => (
              <div className='border p-2 rounded-md'>
                <b>Producto: {e.attributes.nombre}</b>
                <p>Breve Descripcion del Producto:</p>
                <p>{e.attributes.descripcion}</p>
              </div>
            ))
          )
          :
          <p>Cargando</p>
        }
      </div>
    </>
  )
}
