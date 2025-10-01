"use client"
import React, { useState } from 'react'
import { NormalizedChatProp } from '../../../utils/messageFetcher';
import { useEffect } from 'react';
import { useSocket } from '../../hooks/useSocket';

import { useStateContext } from '../../context/useStateContext';
import { getCookies } from '../../../utils/getCookies';
import { updateRequestWithAuth } from '../../../utils/updateRequestWithAuth';
import { devLogger } from '../../../utils/devLogger';

type messageProps = {
  id: string,
  message: string,
  ownerId: string,
  receiverId: string,
  roomId: string,
  sentAt: Date,
}

const ChatDisplayComponent = ({roomId,messages}: {roomId: string,messages: NormalizedChatProp[]}) => {
  const {chatRoomId,msg,setMsg} = useStateContext()
  const socketRef = useSocket(roomId)
  const [currentOwner, setCurrentOwner] = useState<string | null>(null);
  




  useEffect(() => {
    
      const fetchMessages = async() => {
        setMsg(messages)  
      }
      fetchMessages()
    },[roomId])
    
  useEffect(() => {
    (async () => {
      const userId = await getCookies("userId");
      setCurrentOwner(userId)
      
      // this updates the readStatus in every message after the user enter the room.  
      const res = await updateRequestWithAuth(`message/${roomId}`, {roomId});
    })();
  },[])
    
    useEffect(() => {
      if(!socketRef.current || !currentOwner) return;
      
      const socket = socketRef.current;
      const handleNewMessages = (newMsg: NormalizedChatProp) => {
        if(newMsg.senderId !== currentOwner){
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
        {msg && msg.length > 0?
        (

          msg.map((item) => {
            const isOwner = item.senderId === currentOwner 
            devLogger(isOwner)
            return(
              <p key={item.id} className={`w-full h-max flex items-center rounded-md p-2  ${isOwner ? "justify-end text-green-400" : "justify-start text-blue-400"}`}><span className={`w-max rounded-md p-2 text-white ${isOwner? "bg-blue-400" : "bg-gray-400"}`}>{item.message}</span></p>
              
              )
          })
        )
        :
        (
          <p>No Messages Yet.</p>
        )
      }
      </div>

)
}

export default ChatDisplayComponent