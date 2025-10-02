"use client"
import Button from '@/components/(common)/button'
import { getCookies } from '@/utils/getCookies'
import { postRequestWithAuth } from '@/utils/postRequestWithAuth'
import React from 'react'
import toast from 'react-hot-toast';
import { useRouter } from 'next/navigation';
import { createOrderFunction } from '@/utils/orderExportFunctions'
import Swal from 'sweetalert2';
import { confirmAction, serverAlert } from '../../../utils/sweetAleart';

const ButtonSection = ({id,uploaderId}: {id: string, uploaderId: string}) => {

    const router = useRouter()

    const handleContactUs = async() => {
        Swal.fire({

            title: "Contact Us",
            text: "Contact us at +91 12345678910",
            icon: "info",
            cancelButtonText: "Close",
        })
    }

    const handleOrderBtn = async() => {
        const result = await confirmAction(
            "Are You Sure?",
            "you want to order this product?",
            "Yes",
            "No",
        )

        if(result)
        {
            await createOrderFunction(id)
        }
        else{
            await serverAlert(
                "Action Canceled",
                "Order was not placed.",
                true,
            )
        }
    }
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
        <Button btnText='Contact Dealer' btnWidth={70} onClickFunc={handleContactUs}/>
        <Button btnText='Start Chat' btnWidth={70} onClickFunc={handleCreateMessageRoom}/>
        <Button btnText='Buy' btnWidth={70} onClickFunc={handleOrderBtn}/>
    </div>
  )
}

export default ButtonSection
