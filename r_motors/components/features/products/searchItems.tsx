import React from 'react'
import Image from 'next/image';
import Link from 'next/link';
import ContactOwnerButton from '../search/contactOwnerButton';

const SearchItems = ({title,price,id,productOwnerId,imgURL,productCategory,productYear,productTotalMiles}: {title: string, price: string,id: string,productOwnerId: string,imgURL: string,productCategory: string,productYear: string,productTotalMiles: string}) => {
  return (
    <div className='w-full max-w-[400px] h-max flexClass flex-col rounded-md shadow-xs md:shadow-none hover:shadow-xl transition-all duration-300 ease-in-out p-2 gap-y-2 '>

        <Link href={`/products/${id.toString()}`} className='w-full h-max'>
          <div className='w-full h-[150px] lg:h-[200px] relative overflow-hidden rounded-md'>
            <Image src={imgURL} fill sizes='(max-width: 768px) 100vw,33vw' alt={title} priority  className='rounded-md object-cover object-[center]'/>
          </div>
        </Link>

        <div className='w-full h-max flex justify-start items-start flex-col text-sm gap-y-1'>
            <Link href={`/products/${id.toString()}`} className='w-full h-max'>

              <p className='truncate'>{title ?? "N/A"}</p>
              <div className='w-full h-max flex justify-between items-center gap-x-2 flex-1 '>
                <p className='text-sm md:text-md p-1 rounded-md bg-[#0054FF]' style={{color: "white"}}>{productCategory ?? "N/A"}</p>
                <p className='text-sm md:text-md'>{`${productYear ?? "N/A"} ${productTotalMiles ?? "N/A"} miles`}</p>
              </div>
            </Link>
            <div className='w-full h-max flex justify-between items-center'>
              <p className='font-bold'>{price.toString()}RS</p>
              <ContactOwnerButton id={id} productOwnerId={productOwnerId}/>
            </div>
        </div>
    </div>
  )
}

export default SearchItems
