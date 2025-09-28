"use client"
import Button from '@/components/(common)/button'
import React from 'react'
import { useRouter } from 'next/navigation';

const ViewDetailsButton = ({id}: {id: string}) => {
    const router = useRouter()
  return (
    <div className='w-max h-max flexClass'>
        <Button btnText='View Details' onClickFunc={() => {router.push(`/products/${id}`)}} btnWidth={100}/>
    </div>
  )
}

export default ViewDetailsButton