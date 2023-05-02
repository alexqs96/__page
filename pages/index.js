import Head from 'next/head'
import { Children } from 'react'
import useSWR from 'swr'
import Image from 'next/image'
import { ShoppingCart } from '@geist-ui/icons'
import Link from 'next/link'

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
        <div className='flex flex-wrap gap-2 max-md:justify-between'>
          {
            strapi?.data?
            Children.toArray(
              strapi.data.map((e,index) => (
                <Link href="/" className={(strapi.data.length-1 === index && strapi.data.length % 2 ? "max-md:mr-auto" : "")+' shadow-lg hover:shadow-xl border border-transparent dark:border-white/20 hover:dark:border-white/50 rounded transition-all duration-300 overflow-hidden max-sm:w-[42vw] w-48'}>
                  <Image
                    width={64}
                    height={64}
                    unoptimized
                    priority
                    className='w-full bg-white'
                    src={e.attributes.foto? e.attributes.foto : "/img/apu_profile.png"}              
                    alt={"Foto de "+e.attributes.nombre}
                  />
                  <div className='p-4 max-md:p-2 flex flex-col gap-y-1.5 max-md:text-sm'>
                    <p className='capitalize font-medium'>{e.attributes.nombre}</p>
                    <p className='font-semibold'> $300 ARS <small className='line-through'>$200</small></p>
                    <button className='p-2 flex justify-center gap-2 items-center flex-wrap bg-indigo-600 text-white rounded'>
                      <ShoppingCart size={20} />
                      <span className='font-semibold'>Comprar</span>
                    </button>
                  </div>
                </Link>
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
