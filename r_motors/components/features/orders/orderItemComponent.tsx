import React from 'react'
import Image from 'next/image';

const OrderItemComponent = ({title,price,quantity,imageURL}: {title: string,price: number,quantity: number,imageURL: string}) => {
  return (
    <div className='w-full h-max p-1 flex  gap-x-4 shadow-md mt-4 bg-gray-200  rounded-md'>
        <div className=''>
            <Image src={imageURL ?? "/beet.jpg"} width={100} height={100}  alt={title} className='rounded-md'/>
        </div>
        <div className='w-full h-max flex justify-between items-center'>
          <div className='w-max h-max flexClass flex-col'>
            <p className='text-xl'>{title}</p>
            <p className='text-sm'>{quantity} * ${price}</p>
          </div>
          <div className='w-max h-max flexClass'>
            <p>{price}</p>
          </div>
        </div>
    </div>
  )
}

export default OrderItemComponent