"use client"
import Button from '@/components/(common)/button'
import {useRouter} from 'next/navigation'
import React from 'react'
import { postRequestWithAuth } from '../../../utils/postRequestWithAuth';
import { getCookies } from '../../../utils/getCookies';
import toast from 'react-hot-toast';

const ContactOwnerButton = ({id,productOwnerId}: {id: string,productOwnerId: string}) => {
    const router = useRouter()
    const handleCreateMessageRoom = async() => {
      const userEmail = await getCookies("userEmail");
      if(userEmail && userEmail !== undefined)
      {

        const res = await postRequestWithAuth("messageRoom",{userEmail,productId: id, productOwnerId});
        
        const roomId: string | undefined = res.res.data.id
        if(roomId)
        {
          router.push(`/chats/${roomId}`)
          
        }
      }else{
        toast.error("Please login first to use this feature.");

      }

    }
  return (
    <div className='w-max h-max flexClass'>
        <Button btnText='Contact Dealer' className='h-[80px]' btnWidth={100} onClickFunc={handleCreateMessageRoom}/>
    </div>
  )
}

export default ContactOwnerButton