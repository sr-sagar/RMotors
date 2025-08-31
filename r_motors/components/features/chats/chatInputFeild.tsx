"use client"
import InputBox from '@/components/(common)/inputBox'
import React from 'react'
import Button from '@/components/(common)/button';
import {useState} from 'react';
import { handleChat } from '@/utils/messageFetcher';
import { useSocket } from '../../hooks/useSocket';
import { handleChatProps } from '../../../utils/messageFetcher';
import { useStateContext } from '@/components/context/useStateContext';
import { getCookies } from '../../../utils/getCookies';


  const ChatInputFeild = () => {
    const [chat,setChat] = useState("")
    const {messageOwnerId,messageReceiverId,chatRoomId,setMsg} = useStateContext()
    const socketRef =  useSocket(chatRoomId)
    const handleMessageSend = () => {
      if(!socketRef.current || !chat.trim()) return;

      const msg: handleChatProps = {
        id: crypto.randomUUID(),
        message: chat,
        ownerId: messageOwnerId,
        receiverId: messageReceiverId,
      }

      socketRef.current.emit("sendMessage", msg, chatRoomId);
      setMsg((prev) => [...prev,msg])
      setChat("")
    }
    
    const handleFunctions = async() => {
      if(!chat.trim()) return;
      const encodedMessageUserEmail: string | undefined = await getCookies("userEmail") 
      const decodedMessageUserEmail: string | undefined = encodedMessageUserEmail? decodeURIComponent(encodedMessageUserEmail) : undefined
      await handleChat(chat,decodedMessageUserEmail,messageReceiverId)
      handleMessageSend()
    }
  return (
    <div className='w-full h-full flexClass p-1'>
        <div className='w-full h-[90%] flex justify-around items-center gap-x-2 px-2'>
            <input placeholder='Type a message...' type='text' value={chat} onChange={(e) => {setChat(e.target.value)}} className='w-full border-1 border-gray-300 rounded-md  p-1'/>
            <div className='w-1/4 h-full flexClass'>
                <Button btnText='>' btnWidth={80} onClickFunc={handleFunctions} />
            </div>
        </div>
    </div>

  )
}

export default ChatInputFeild