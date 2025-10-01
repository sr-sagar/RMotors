
import ChatList from '@/components/features/chats/chatList'
import { getCookies } from '@/utils/getCookies'
import React from 'react'
import Image from "next/image"

export type RoomProps = {
  id: string,
  productId: string,
  product: {
    productTitle: string,
    productImageURLs: string[],
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


  if(!(await getCookies("token"))){
    return(
      <div className='w-full h-max flexClass flex-col'>
        <Image src={"/profileImg.png"} height={300} width={400}  alt='this is the image that appers when user click on the profile while they are logged out.'  className='object-[center_center] object-contain'/>
        <h3 className='text-md md:text-lg font-bold'>Please Login/Signup to view this page.</h3>
      </div>
    );
  }
  
  return <ChatList />
}

export default Chats
