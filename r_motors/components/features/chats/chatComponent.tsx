"use client"
import React from 'react'
import Image from 'next/image'
import { useStateContext } from '../../context/useStateContext';
import { useEffect } from 'react';
const ChatComponent = ({roomId}:{roomId:string}) => {
    const {setChatRoomId} = useStateContext()
    useEffect(() => {
      setChatRoomId(roomId)
    },[roomId])
  return (
    <div className='w-full h-max p-2 flexClass gap-x-4 '>
        <div className='w-[80px] h-full flexClass p-1'>
          <Image src="/beetImage.jpg" width={50} height={60} alt='red car' className='w-[60px] h-[60px] object-fill rounded-full'/>
        </div>
        <div className='w-full h-max flexClass flex-col'>
          <div className='w-full h-max flex justify-between items-center'>
            <p>Sarah Wilson</p>
            <div className='w-max h-max flexClass p-1 gap-x-2'>
              <p className='text-sm md:text-md '>2 min ago</p>
              <p className='w-max h-max rounded-md text-sm md:text-md bg-blue-700 rounded-md px-4 py-1 '>2</p>
            </div>
          </div>
          <p className='w-full text-start'>whats the price of this car?</p>
        </div>
    </div>
  )
}

export default ChatComponent
