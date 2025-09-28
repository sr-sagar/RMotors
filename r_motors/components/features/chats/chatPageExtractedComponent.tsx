import Link from 'next/link'
import React from 'react'
import ChatComponent from './chatComponent'
import ToastComponent from '@/components/(common)/toastComponent'
import { RoomProps } from '../../../app/(pages)/chats/page';
import { getCookies } from '../../../utils/getCookies';

const ChatPageExtractedComponent = async({success,message,rooms} : {success: boolean, message: string,rooms: RoomProps[]}) => {

  const userId = await getCookies("userId")
  const unreadCount = rooms?.map((item) => {
    return item.message.filter((msg) => msg.senderId !== userId && msg.readStatus === false).length
  })
  return (
    <section className='w-full h-max '>
      <ToastComponent success={success} message={message}/>
      <div className='w-full md:w-xs lg:w-sm h-max flexClass my-4  '>
        <h3 className='text-center text-lg font-bold'>Chats</h3>
      </div>
      <div className='w-full md:max-w-xs lg:max-w-sm md:border-r-[1px] border-gray-300  h-[550px] flex justify-start items-center flex-col gap-y-2 overflow-y-auto ' style={{scrollbarWidth: "none"}}>
        {rooms && rooms.length > 0?
        (

          rooms.map((item: RoomProps,index) => (
            <Link key={item.id} href={`/chats/${item.id}`} className='w-full h-max last-of-type-mb-4 md:active:bg-gray-100'>
              <ChatComponent  chatTitle={item.product.productTitle} unreadCount={unreadCount[index]}  messageDetails={item.message} />
            </Link>
          ))
        )
        :
        (
          <p className='mt-4 text-center'>No Rooms Available Yet</p>
        )
        }
      </div>
    </section>
  )
}

export default ChatPageExtractedComponent