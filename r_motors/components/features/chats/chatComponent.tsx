"use client"
import React from 'react'
import Image from 'next/image'






import toast from 'react-hot-toast';
import useSWR from 'swr';
import { useEffect } from 'react';
import { getCookies } from '@/utils/getCookies';
import { confirmAction } from '../../../utils/sweetAleart';


const ChatComponent = ({chatTitle,unreadCount,productImageURL,roomId,messageDetails}: {chatTitle: string, unreadCount: number,productImageURL: string,roomId: string,  messageDetails: {message: string, sentAt: string} | {message: string, sentAt: string}[]}) => {
  let lastMessage: string;
  let lastSent: string[];
  
  const fetcher = async(url: string) => {
    const res = await fetch(url,{
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${await getCookies("token")}`
      }, 
      credentials: "include",
    });

    if(!res.ok) {toast.error("something went wrong while getting the unread count."); return null}
    return res?.json()
  }

  const {error, data} = useSWR(`/api/messageRoom/unreadCount/${roomId}?roomId=${roomId}`, fetcher, {revalidateOnFocus: true, dedupingInterval: 2000})
  useEffect(() => {
    if(error){
      toast.error("something went wrong.")
    }
  },[error])

  const unreadSeverCount = data?.data ?? 0
  


  useEffect(() => {
    (async() => {
      if(Notification.permission !== "granted")
      {

        const result = await confirmAction(
          "Allow Puch Notification?",
          "you will receive notification on any new messages that you receive.",
          "Allow",
          "Cancel",
          )
          
          if(result)
          {
            Notification.requestPermission()
          }
        }
      
    })();
  },[])

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
          <Image src={productImageURL ?? "/beetImage.jpg"} width={50} height={60} alt='red car' className='w-[60px] h-[60px] object-fill rounded-full'/>
        </div>
        <div className='w-full h-max flexClass flex-col'>
          <div className='w-full h-max flex justify-between items-center'>
            <p>{chatTitle}</p>
            <div className='w-max h-max flexClass p-1 gap-x-2'>
              <p className='text-sm md:text-md '>{lastSent? lastSent[0] : "N/A"}</p>
              <p className='w-max h-max rounded-md text-sm md:text-md bg-blue-700 rounded-md px-4 py-1 '>{Math.max(unreadSeverCount,unreadCount)}</p>
            </div>
          </div>
          <p className='w-full text-start'>{lastMessage ?? "N/A"}</p>
        </div>
    </div>
  )
}

export default ChatComponent
