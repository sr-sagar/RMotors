"use client"
import React from 'react'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faCheck, faTag,faWallet } from '@fortawesome/free-solid-svg-icons';

import { useScreenSize } from '../../context/ScreenSizeContext';
import Image from 'next/image';
import Button from '../../(common)/button';

const ServiceDescription = () => {
    const {isMobile} = useScreenSize();
  return (
    <div className='flexClass flex-col md:flex-row w-full h-full'>
    {isMobile?
    <>

        <div className='w-full h-full flexClass relative'>
            <div className={`bg-[#4d9300] h-[90%] absolute  z-10 rounded-md w-[60%] left-[20%] `}></div>
            <Image src={"/beetImage_NOBG.png"} alt="red suv image" width={620} height={324} className='z-10'/>
        </div> 
        <div className='flexClass flex-col w-full my-4 '>
            <h2 className='mb-4 text-2xl '><span className='border-b-4 border-yellow-400'>F</span>eel the best experience</h2>
            <div className='flex flex-col justify-start'>

            <p>
                <FontAwesomeIcon icon={faTag} className='text-gray-700 w-6 h-6'/>
                Premium vehicals for Great Deals</p>
            <p>
                <FontAwesomeIcon icon={faWallet} className='text-gray-700 w-6 h-6'/>
                Best Price on the market</p>
            <p>
                <FontAwesomeIcon icon={faCheck} className='text-gray-700 w-6 h-6'/>
                Check Personally</p>
            </div>
        </div>
        <div className='flexClass w-full mb-4 mt-2'>
            <Button btnText="Search your's now!" btnWidth={50}/>
        </div> 
    </>
    :
    <>
       <div className='w-full h-full flexClass relative'>
            <div className={`xxl bg-[#4d9300] h-[80%]   absolute  z-10 rounded-md  w-[60%] xl:w-[55%]  left-[20%] `}></div>
            <Image src={"/beetImage_NOBG.png"} alt="red suv image" width={620} height={324} className='z-10'/>
        </div> 
        <div className='flexClass flex-col w-full'>
            <h2 className='mb-4 text-2xl '><span className='border-b-4 border-yellow-400'>F</span>eel the best experience</h2>
            <p>
                <FontAwesomeIcon icon={faTag} className='text-red-700 w-6 h-6'/>
                Premium vehicals for Great Deals</p>
            <p>
                <FontAwesomeIcon icon={faWallet} className='text-red-700 w-6 h-6'/>
                Best Price on the market</p>
            <p>
                <FontAwesomeIcon icon={faCheck} className='text-red-700 w-6 h-6'/>
                Check Personally</p>
            <div className='flexClass w-full mt-2 lg:w-[70%] btn'>
                <Button btnText="Search your's now!" btnWidth={50}/>
            </div> 
        </div>
    </>   
        
        
    }
    </div>
  )
}

export default ServiceDescription