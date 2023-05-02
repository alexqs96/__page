import React from 'react'
import { Loader } from '@geist-ui/icons'

const LoaderAnimation = () => {
  return (
    <div className='w-full grid place-items-center text-center h-[50vh]'>
      <span className='animate-spin'>
        <Loader size={32} />
      </span>
    </div>
  )
}

export default LoaderAnimation
