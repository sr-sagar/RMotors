"use client"
import Button from '@/components/(common)/button'
import React from 'react'
import { useRouter } from 'next/navigation';

const ExplorMoreButton = ({text,link,bgColor,className,textColor} : {text: string,link: string,bgColor?: string,className?: string,textColor?: string}) => {
    const router = useRouter()
  return (
    <div className='w-max h-max flexClass'>
        <Button btnText={text ?? "Button"} btnWidth={100} onClickFunc={() => {router.push(link)}} bgColor={bgColor} className={className} textColor={textColor}/>
    </div>
  )
}

export default ExplorMoreButton
