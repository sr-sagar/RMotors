"use client"
import Button from '@/components/(common)/button'
import React from 'react'
import { useRouter } from 'next/navigation';
import { confirmAction, serverAlert } from '../../../utils/sweetAleart';
import { cancelOrderFunction } from './orderComponent';

const CancelOrderBtn = ({id}: {id: string}) => {
    const router = useRouter()
    const handleOrderDelete = async() => {
        const result = await confirmAction(
            "Are You Sure?",
            "This action will cancel this order",
            "Ok",
            "Back",
        )
        if(result)
        {
            await cancelOrderFunction(id);
            router.refresh()
        }
        else{
            await serverAlert(
                "Safe",
                "You're order was not canceled.",
                true,
            )
        }
    }
  return (
    <div className='w-max h-max flexClass'>
        <Button btnText='Cancel Order' onClickFunc={handleOrderDelete} btnWidth={100}/>
    </div>
  )
}

export default CancelOrderBtn