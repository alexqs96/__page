import { AppContext } from '@/context/auth'
import { Text } from '@geist-ui/core'
import Head from 'next/head'
import Image from 'next/image'
import { Children, useContext } from 'react'
import { Grid, Card} from '@geist-ui/core'

export default function Home() {

  const { strapi } = useContext(AppContext)

  return (
    <>
      <Head>
        <title>Inicio</title>
      </Head>
      <h2>Productos</h2>
      <Grid.Container gap={5}>
        {
          strapi?.data?
          Children.toArray(
            strapi.data.map(e => (
              <Grid xs={6}>
              <Card shadow width="100%" >
              {
                e.attributes.image?
                <Image 
                  width={50}
                  height={50}
                  src={e.attributes.image}
                  unoptimized
                  priority
                  alt='foto'
                />
                :
                <Image 
                  width={50}
                  height={50}
                  src="/img/apu_profile.png"
                  unoptimized
                  priority
                  alt='foto'
                />
              }

              <Text>Producto: {e.attributes.nombre}</Text>
              <Text>Breve Descripcion del Producto:</Text>
              <Text>{e.attributes.descripcion}</Text>
              </Card>
              </Grid>
            ))
          )
          :
          <p>Cargando</p>
        }
      </Grid.Container>
    </>
  )
}
