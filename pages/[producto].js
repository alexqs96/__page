import useSWR from 'swr'
import { useRouter } from 'next/router';
import Image from 'next/image'
import { ShoppingCart } from '@geist-ui/icons'
import Loader from '@/components/loader';


export default function ProductId (){
  const router = useRouter();
  const { producto } = router.query;

  const { data:product, error, isLoading } = useSWR(`/api/strapi?producto=${producto}`)

  if (error) {
    <p>Hubo un error desde Strapi</p>
  }

  return (
    <>
    {
      isLoading?
      <Loader />
      :
        product?.data?
        <div className='my-5'>
          <div className='flex max-md:items-center md:justify-between max-lg:flex-wrap gap-5 w-full'>
            <Image
              width={64}
              height={64}
              unoptimized
              priority
              className='w-full bg-white aspect-square lg:max-w-[600px]'
              src={product.data.attributes.foto?.data? product.data.attributes.foto.data.attributes?.url : "/img/apu_profile.png"}              
              alt={"Foto de "+product.data.attributes.nombre}
            />

            <div className='w-full lg:max-w-[600px] min-w-min flex flex-col gap-10'>
              <div className='flex justify-between items-center flex-wrap gap-2'>
                <p className='capitalize font-medium text-5xl'>{product.data.attributes.nombre}</p>

                <p className='font-semibold text-2xl'> $300 ARS <small className='line-through'>$200</small></p>
              </div>
              <button className='p-3 flex justify-center gap-3 items-center flex-wrap bg-indigo-600 text-white rounded'>
                <ShoppingCart size={26} />
                <span className='font-semibold text-2xl'>Comprar</span>
              </button>
            </div>
            
          </div>
        </div>
        :
        undefined
    }
    </>
  )
}