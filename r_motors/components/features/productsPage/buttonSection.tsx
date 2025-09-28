"use client"
import Button from '@/components/(common)/button'
import { getCookies } from '@/utils/getCookies'
import { postRequestWithAuth } from '@/utils/postRequestWithAuth'
import React from 'react'
import toast from 'react-hot-toast';
import { useRouter } from 'next/navigation';
import { createOrderFunction } from '../../../app/(pages)/orders/page';


const ButtonSection = ({id,uploaderId}: {id: string, uploaderId: string}) => {

    const router = useRouter()
    const handleCreateMessageRoom = async() => {
        const userEmail = await getCookies("userEmail");
        if(userEmail && userEmail !== undefined)
        {

            const res = await postRequestWithAuth("messageRoom",{userEmail,productId: id, productOwnerId: uploaderId});
            
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
    <div className='w-full h-max flexClass flex-col gap-y-4'>
        <Button btnText='Contact Dealer' btnWidth={70} />
        <Button btnText='Start Chat' btnWidth={70} onClickFunc={handleCreateMessageRoom}/>
        <Button btnText='Buy' btnWidth={70} onClickFunc={() => {createOrderFunction(id)}}/>
    </div>
  )
}

export default ButtonSection
