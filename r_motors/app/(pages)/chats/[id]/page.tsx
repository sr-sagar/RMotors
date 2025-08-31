import React from 'react'
import ChatDisplayComponent from '../../../../components/features/chats/chatDisplayComponent';
import ChatInputFeild from '../../../../components/features/chats/chatInputFeild';

type chatTypes = {
  chat: string,
  id: number,
}


const ChatFunctionComponent = async() => {
  const arr:chatTypes[] = [
    {chat: "new", id: 1},
    {chat: "new", id: 2},
    {chat: "new", id: 3},
    {chat: "new", id: 4},
  ]
  


  return (
    <section className='w-full min-h-[400px] flexClass flex-col'>
      <div className='h-[500px] w-full max-w-[800px]  rounded-md border-1 border-gray-300'>

        <div className='w-full h-[50px]  rounded-t-md flex justify-start items-center border-b-1 border-gray-300 p-1 flex flex-col justify-center items-start'>
          <h3 className='text-md'>Sarah Wilson</h3>
          <h3 className='text-sm'>Beet 2013 Model</h3>
        </div>
        <div className='w-full h-[400px]'>
          <ChatDisplayComponent />
        </div>
        <div className='w-full h-[50px] border-1 border-gray-300'>
          <ChatInputFeild />
        </div>
      </div>
    </section>
  )
}

export default ChatFunctionComponent
