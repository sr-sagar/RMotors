import React from 'react'
import Image from 'next/image';
import Button from '../../(common)/button';

const SearchItems = ({title,price}: {title: string, price: string}) => {
  return (
    <div className='aspect-[4/3] flexClass flex-col rounded-md shadow-xs md:shadow-none hover:shadow-xl transition-all duration-300 ease-in-out p-2 gap-y-2 bg-[]'>
        <div className='w-full min-h-[60%] flexClass relative '>
            <Image src={"/beetImage.jpg"} height={192} width={1140} alt='red car' className='w-full h-full object-cover rounded-md'/>
        </div>
        <div className='w-full h-max flex justify-start items-start flex-col text-sm gap-y-1'>
            <p className='turncate'>{"2024"} {title}</p>
            <div className='w-max h-max flexClass gap-x-2'>
              <p className='text-sm md:text-md p-1 rounded-md bg-gray-200'>{"categoty"}</p>
              <p className='text-sm md:text-md'>{"2024>18,000 miles"}</p>
            </div>
            <div className='w-full h-max flex justify-between items-center'>
              <p className='font-bold'>{price}RS</p>
                <Button btnText='Contact Dealer' className='h-[80px]' btnWidth={50}/>
            </div>
        </div>
    </div>
  )
}

export default SearchItems
