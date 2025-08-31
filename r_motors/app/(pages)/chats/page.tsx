import React from 'react'
import ChatComponent from '../../../components/features/chats/chatComponent';
import Link from 'next/link';

const Chats = () => {
  const arr = [
    {title: "h", id: 1},
    {title: "h", id: 2},
    {title: "h", id: 3},
    {title: "h", id: 4},
    {title: "h", id: 6},
    {title: "h", id: 7},
  ]
  return (
    <section className='w-full h-max '>
      <div className='w-full md:w-sm h-max flexClass my-4'>
        <h3 className='text-center text-lg font-bold'>Chats</h3>
      </div>
      <div className='w-full md:max-w-sm md:border-r-[1px] border-gray-300  h-[550px] flexClass flex-col gap-y-2 overflow-y-auto ' style={{scrollbarWidth: "none"}}>
        {arr.map((item) => (
          <Link key={item.id} href={`/chats/${item.id}`} className='w-full h-max  last-of-type-mb-4 md:active:bg-gray-100'>
            <ChatComponent roomId={item.id.toString()}/>
          </Link>
        ))}
      </div>
    </section>
  )
}

export default Chats
