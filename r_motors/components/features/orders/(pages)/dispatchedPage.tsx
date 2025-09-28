import React from 'react'
import { OrderProps } from '../../../../app/(pages)/orders/page';
import OrderComponent from '@/components/features/orders/orderComponent';

const DispatchedPage = ({dispatchedOrders} : {dispatchedOrders: OrderProps[]}) => {
  return (
    <section className='w-full h-max flexClass'>
      <div className='w-full h-max flexClass flex-col'>
        {dispatchedOrders && dispatchedOrders.length > 0?
        (dispatchedOrders.map((item,index) => (
            <OrderComponent key={item.id} orderedAt={item.orderedAt} id={item.id} expectedDeliveryDate={item.deliveryDate} order={item.order} productYear={item.order[0]?.productYear ?? "N/A"} index={index} productPrice={item.order[0]?.productPrice} productId={item.order[0]?.productId} />
        ))
        )
        : 
        (
            <p>No Orders Yet</p>
        )
        }
      </div>
    </section>
  )
}

export default DispatchedPage
