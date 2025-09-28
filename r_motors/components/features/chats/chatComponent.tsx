"use client"
import React from 'react'
import Image from 'next/image'
const ChatComponent = ({chatTitle,unreadCount,messageDetails}: {chatTitle: string, unreadCount: number,  messageDetails: {message: string, sentAt: string} | {message: string, sentAt: string}[]}) => {
  let lastMessage: string;
  let lastSent: string[];

  

  if(messageDetails && Array.isArray(messageDetails))
  {
    lastMessage = messageDetails[messageDetails.length -1]?.message
    lastSent = messageDetails[messageDetails.length -1]?.sentAt.split(" ").slice(0,4);

  }
  else{
    lastMessage = messageDetails.message
    lastSent = messageDetails.sentAt.split(" ").slice(0,4)
  }

  return (
    <div className='w-full h-max p-2 flexClass gap-x-4 '>
        <div className='w-[80px] h-full flexClass p-1'>
          <Image src="/beetImage.jpg" width={50} height={60} alt='red car' className='w-[60px] h-[60px] object-fill rounded-full'/>
        </div>
        <div className='w-full h-max flexClass flex-col'>
          <div className='w-full h-max flex justify-between items-center'>
            <p>{chatTitle}</p>
            <div className='w-max h-max flexClass p-1 gap-x-2'>
              <p className='text-sm md:text-md '>{lastSent? lastSent[0] : "N/A"}</p>
              <p className='w-max h-max rounded-md text-sm md:text-md bg-blue-700 rounded-md px-4 py-1 '>{unreadCount}</p>
            </div>
          </div>
          <p className='w-full text-start'>{lastMessage ?? "N/A"}</p>
        </div>
    </div>
  )
}

export default ChatComponent
