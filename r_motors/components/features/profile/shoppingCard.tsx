import React from 'react'
import { ShoppingBag } from "lucide-react"
const ShoppingCard = () => {
  return (
    <div className='w-full h-full bg-white rounded-md shadow-md flexClass flex-col text-blue-600'>
        <ShoppingBag />
        <p className='text-lg font-bold'>24</p>
        <p className='w-full text-center'>orders</p>
    </div>
  )
}

export default ShoppingCard
