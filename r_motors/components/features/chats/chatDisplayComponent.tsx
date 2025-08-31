"use client"
import React, { useState } from 'react'
import { handleChatProps } from '../../../utils/messageFetcher';
import { useEffect } from 'react';
import { useSocket } from '../../hooks/useSocket';
import { getRequestWithAuth } from '@/utils/getRequestWithAuth';
import { useStateContext } from '../../context/useStateContext';
import { getCookies } from '../../../utils/getCookies';


const ChatDisplayComponent = () => {
  const {setMessageOwnerId,setMessageReceiverId,chatRoomId,msg,setMsg} = useStateContext()
  const socketRef = useSocket(chatRoomId)
  const [currentOwner, setCurrentOwner] = useState<string | null>("");

  
  useEffect(() => {
    
      const fetchMessages = async() => {
        const initialMessage = await getRequestWithAuth("message")
        const {res} = initialMessage;
        setMsg(res.messages)
        console.log(msg)
        if(res.messages.length > 0)
        {
          let messageLength = res.messages.length
          setMessageOwnerId(res.messages[messageLength-1].ownerId)
          setMessageReceiverId(res.messages[messageLength-1].receiverId)

        }
        const userId = await getCookies("userId");
        setCurrentOwner(userId ?? null)
        
      }
      fetchMessages()
    },[chatRoomId])
    
    
    useEffect(() => {
      if(!socketRef.current || !currentOwner) return;
      
      const socket = socketRef.current;
      const handleNewMessages = (newMsg: handleChatProps) => {
        if(newMsg.ownerId !== currentOwner){
          setMsg((prev) => [...prev,newMsg])

        }
      }
      
      socket.on("message", handleNewMessages)
      return () => {
        socket.off("message", handleNewMessages)
      }
      
    },[socketRef.current, currentOwner])
    
    
    return (
      <div className='w-full h-full flexClass flex-col gap-y-2 overflow-y-auto p-2' style={{scrollbarWidth: "none"}}>
        {msg.map((item) => {
        const isOwner = item.ownerId === currentOwner
        console.log(item.message)
          return(
            <p key={item.id} className={`w-full h-max flex items-center rounded-md p-2  ${isOwner ? "justify-end text-green-400" : "justify-start text-blue-400"}`}><span className={`w-max rounded-md p-2 text-white ${isOwner? "bg-blue-400" : "bg-gray-400"}`}>{item.message}</span></p>

            )
        })}
      </div>

)
}

export default ChatDisplayComponent