import React from 'react'
import { ShoppingCart } from "lucide-react"
const CartCard = ({cart}: {cart: string}) => {
  return (
    <div className='w-full h-full bg-white rounded-md shadow-md flexClass flex-col text-blue-600'>
        <ShoppingCart />
        <p className='text-lg font-bold'>{cart}</p>
        <p className='w-full text-center'>cart</p>
    </div>
  )
}

export default CartCard
