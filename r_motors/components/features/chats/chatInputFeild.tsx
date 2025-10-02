"use client"
import React from 'react'
import Button from '@/components/(common)/button';
import {useState} from 'react';
import { handleChat, NormalizedChatProp } from '@/utils/messageFetcher';
import { useSocket } from '../../hooks/useSocket';
import { useStateContext } from '@/components/context/useStateContext';
import { getCookies } from '../../../utils/getCookies';


  const ChatInputFeild = ({receiverId,senderId,roomId,userId} : {receiverId: string,senderId: string,roomId: string,userId: string}) => {
    const [chat,setChat] = useState("")
    const {setMsg} = useStateContext()
    const socketRef =  useSocket(roomId,userId)

    
    const handleMessageSend = () => {
      if(!socketRef.current || !chat.trim()) return;
      const msg: NormalizedChatProp = {
        id: crypto.randomUUID(),
        message: chat,
        senderId,
        receiverId,
        roomId,
      }

      socketRef.current.emit("sendMessage", msg, roomId);
      setMsg((prev) => [...prev,msg])
      setChat("")
    }
    
    const handleFunctions = async() => {
      if(!chat.trim()) return;

      const encodedMessageUserEmail: string | undefined = await getCookies("userEmail") 
      const decodedMessageUserEmail: string | undefined = encodedMessageUserEmail? decodeURIComponent(encodedMessageUserEmail) : undefined


      await handleChat(chat,decodedMessageUserEmail,receiverId,roomId)
      handleMessageSend()
    }
  return (
    <div className='w-full h-full flexClass p-1'>
        <div className='w-full h-[90%] flex justify-around items-center gap-x-2 px-2'>
            <input placeholder='Type a message...' type='text' value={chat} onChange={(e) => {setChat(e.target.value)}} onKeyDown={(e) => {e.key === "Enter" && handleFunctions?.()} } className='w-full border-1 border-gray-300 rounded-md  p-1'/>
            <div className='w-1/4 h-full flexClass'>
                <Button btnText='>' btnWidth={80} onClickFunc={handleFunctions} />
            </div>
        </div>
    </div>

  )
}

export default ChatInputFeild