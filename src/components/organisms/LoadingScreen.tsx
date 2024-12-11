import Image from 'next/image'
import React from 'react'

const LoadingScreen = () => {
  return (
    <div className='h-screen w-screen bg-primary flex items-center justify-center'>
      <Image  src={"/images/pleq_logo.png"} width={200} height={200} alt={''}/>
    </div>
  )
}

export default LoadingScreen