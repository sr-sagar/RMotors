"use client"
import React from 'react'
import { CarsDataProps } from '../search/searchPageFilter';
import { useScreenSize } from '../../context/ScreenSizeContext';
import Image from "next/image"
import { GetCarDataProps } from '../../../app/(pages)/products/[id]/page';
const ImageScrollerForMobile = ({getCar} : {getCar: GetCarDataProps}) => {
    const {isMobile} = useScreenSize()
  return (
    // <div className='w-full h-full flexClass'>
        getCar && getCar?.productImageURLs.length > 1? 
            getCar?.productImageURLs.map((item,index) => (
                isMobile?
                    <Image key={index} src={item ??  "/beet.jpg"}   height={768} width={768} priority alt={getCar?.productTitle ?? "N/A"} className=' w-full h-full rounded-lg'/>

                :
                    <div key={index} className='w-[400px] h-[200px] lg:w-[500px] lg:h-[200px] xl:w-[768px] relative xl:h-[400px]  flexClass flex-shrink-0 '>
                        <Image  src={item ??  "/beet.jpg"}   fill priority  alt={getCar?.productTitle ?? "N/A"} className=' w-full h-full rounded-lg object-contain'/>
                    </div>     
            ))
            :
            <Image  src={getCar?.productImageURLs[0] ??  "/beet.jpg"} priority  height={768} width={768}  alt={getCar?.productTitle ?? "N/A"} className=' w-full h-full rounded-lg'/>
          
    // </div>
  )
}

export default ImageScrollerForMobile