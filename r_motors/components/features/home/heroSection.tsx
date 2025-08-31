"use client"
import { useScreenSize } from '@/components/context/ScreenSizeContext'
import React from 'react'
import Image from "next/image";
import { useEffect } from 'react';
import {useState} from 'react';


const  HeroSection = () => {
  const { isMobile } = useScreenSize()
  const [current,setCurrent] = useState<number>(0)
  const imgArr = [
    "/beetImage_NOBG.png",
    "/homePageCar.png",
  ]

  useEffect(() => {
    const imgLen = imgArr.length
    const interval = setInterval(() => {
        setCurrent((prev) => (prev + 1) % imgLen);
      
    },2000)

    return () => clearInterval(interval)
  },[])
  return (
    <div className='w-full h-full md:min-w-[50%] relative'>
        <div className={`bg-[#ff5f28] h-full absolute  z-[-1] rounded-md ${isMobile? "w-[60%] left-[20%]" : "w-[70%] right-[15%]"}`}></div>
        <Image 
            src={`${imgArr[current]}`} 
            width={1152} 
            height={768}
            priority 
            // fill
            alt="N/A" 
            className="object-contain object-[center_top] "></Image>
    </div>
  )
}

export default HeroSection
