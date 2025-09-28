import ChatList from '@/components/features/chats/chatList'
import React from 'react'

export type RoomProps = {
  id: string,
  productId: string,
  product: {
    productTitle: string,
  },
  customer: {
    userName: string,
  },
  message: {
    message: string,
    sentAt: string,
    readStatus: boolean,
    senderId: string,
  }[]
}
const Chats = async() => {


  
  return <ChatList />
}

export default Chats
