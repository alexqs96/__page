import Head from 'next/head'
import { Children } from 'react'
import useSWR from 'swr'

export default function Home() {
  const { data:strapi, error, isLoading } = useSWR('/api/strapi')

  if (error) {
    <p>Hubo un error desde Strapi</p>
  }

  return (
    <>
      <Head>
        <title>Inicio</title>
      </Head>
      <h2 className='text-3xl font-bold mb-3'>Productos</h2>
      {
        isLoading?
        <p>Cargando..</p>
        :
        <div className='flex flex-col gap-2'>
          {
            strapi?.data?
            Children.toArray(
              strapi.data.map(e => (
                <div className='border p-2 rounded-md transition hover:bg-black/10 hover:dark:bg-white/20'>
                  <b>{e.attributes.nombre}</b>
                  <p>Descripcion</p>
                  <p>{e.attributes.descripcion}</p>
                </div>
              ))
            )
            :
            <p>Sin Datos</p>
          }
        </div>
      }
    </>
  )
}
