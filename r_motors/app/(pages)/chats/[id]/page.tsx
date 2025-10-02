import ChatInputFeild from '@/components/features/chats/chatInputFeild'
import React from 'react'
import { getRequestWithAuth } from '@/utils/getRequestWithAuth';
import { getCookies } from '../../../../utils/getCookies';
import ToastComponent from '@/components/(common)/toastComponent';
import ChatList from '@/components/features/chats/chatList';
import dynamic from 'next/dynamic';
const ChatDisplayComponent = dynamic(() => import('@/components/features/chats/chatDisplayComponent'),{loading: () => <p>Loading...</p>})


type Props = {
  params: Promise<{id: string}>
}
const ChatFunctionComponent = async({params}: Props) => {
  

    const {id} = await params;
    const roomId = id
    const res = await getRequestWithAuth(`message/${roomId}`);
    const roomMessages = res.res.data;
    
    

    const userId = await getCookies("userId");
    if(!userId)
    {
      throw new Error("UserId not availabe")
    }

    if(!roomMessages)
    {
      return <p className='w-full text-center '>No messages yet</p>
    }
    
    
    const receiverId = userId === roomMessages.productOwnerId? roomMessages.customerId : roomMessages.productOwnerId


  return (
    <section className='w-full h-max flexClass lg:gap-x-2'>
      <section className='w-full h-max hidden md:block  md:max-w-xs '>
        <ChatList />
      </section>
      <section className='w-full min-h-[400px] flexClass flex-col  p-2'>
        <ToastComponent success={res.success} message={res.res.message}/>
        <div className='h-[500px] w-full  rounded-md '>
          <div className='w-full h-[50px]  rounded-t-md border-b-1 border-gray-300 p-1 flex flex-col justify-center items-start'>
            <h3 className='text-md'>{roomMessages.product.uploader.userName ?? "N/A"}</h3>
            <h3 className='text-sm'>{roomMessages.product.productTitle ?? "no title available"}</h3>
          </div>
          <div className='w-full h-[400px]'>
              <ChatDisplayComponent roomId={roomId} messages={roomMessages.message} userId={userId}/>
          </div>
          <div className='w-full h-[50px] border-1 border-gray-300'>
            <ChatInputFeild receiverId={receiverId} senderId={userId} roomId={roomId} userId={userId}/>
          </div>
        </div>
      </section>
    </section>
    
  )
}

export default ChatFunctionComponent
