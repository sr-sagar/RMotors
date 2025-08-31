import React from 'react'
import Image from 'next/image';

const OrderComponent = ({price,title}: {price: number, title: string}) => {
  return (
    <div className='w-full h-[100px] md:h-[130px] p-1 flex  gap-x-4 shadow-md mt-4 bg-[#f5f5f7] hover:border-2 hover:border-b-6 hover:border-r-6 transition translation '>
        <div className='flex justify-start'>
            <Image src="/beetImage.jpg" width={300} height={100} alt='red car' className='w-[160px] md:w-[300px]'/>
        </div>
        <div className='flexClass flex-col gap-y-1'>
            <p>{title}</p>
            <p>{price}</p>
        </div>
    </div>
  )
}

export default OrderComponent