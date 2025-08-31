import React from 'react'
import OrderComponent from '../../../components/features/orders/orderComponent';
import Link from 'next/link';

const Orders = () => {
  const arr = [
    {title: "t", id: 1},
    {title: "t", id: 2},
    {title: "t", id: 3},
    {title: "t", id: 4},
    {title: "t", id: 5},
  ]

  return (
    <section className='w-full p-2 flexClass bg-gray-200'>
      <div className='w-full min-h-[450px] max-h-[500px] flex justify-start items-center flex-col max-w-[1020px]  overflow-y-auto p-2' style={{scrollbarWidth: "none"}}>
      <h2 className='flexClass flex-col text-xl font-bold'>Orders</h2>
      {arr?.map((item) => (
        <Link key={item.id} href={`/products/${item.id}`} className='w-full'>
          <OrderComponent key={item.id} price={item.id} title={item.title} />
        </Link>
      ))

      }
      </div>
    </section>
  )
}

export default Orders
