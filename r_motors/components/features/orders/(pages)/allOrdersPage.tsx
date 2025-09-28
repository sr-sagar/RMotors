import React from 'react'
import { OrderProps } from '@/app/(pages)/orders/page'
import OrderComponent from '../orderComponent'
const AllOrdersPage = ({deliveredOrders,pendingOrders,dispatchedOrders,canceledOrders} : {deliveredOrders: OrderProps[],pendingOrders: OrderProps[], dispatchedOrders: OrderProps[],canceledOrders: OrderProps[]}) => {
  


  return (
    <section className='w-full h-max flexClass flex-col gap-y-4'>
        <div className='w-full h-max flexClass flex-col gap-y-2'>
          <h2 className='my-2'>Delevered</h2>
          {deliveredOrders && deliveredOrders.length > 0 &&
            (deliveredOrders.map((item,index) => (
              <OrderComponent key={item.id} orderedAt={item.orderedAt} id={item.id} expectedDeliveryDate={item.deliveryDate} order={item.order} productYear={item.order[0]?.productYear ?? "N/A"} index={index} productPrice={item.order[0]?.productPrice} productId={item.order[0]?.productId}/>
            )))
          }
        </div>
        <div className='w-full h-max flexClass flex-col gap-y-2'>
          <h2 className='my-2'>Dispatched</h2>
          {dispatchedOrders && dispatchedOrders.length > 0 &&
            (dispatchedOrders.map((item,index) => (
              <OrderComponent key={item.id} orderedAt={item.orderedAt} id={item.id} expectedDeliveryDate={item.deliveryDate} order={item.order} productYear={item.order[0]?.productYear ?? "N/A"}  index={index} productPrice={item.order[0]?.productPrice} productId={item.order[0]?.productId}/>
            )))
          }
        </div>
        <div className='w-full h-max flexClass flex-col gap-y-2'>
          <h2 className='my-2'>Canceled</h2>
          {canceledOrders && canceledOrders.length > 0 &&
            (canceledOrders.map((item,index) => (
              <OrderComponent key={item.id} orderedAt={item.orderedAt} id={item.id} expectedDeliveryDate={item.deliveryDate} order={item.order} productYear={item.order[0]?.productYear ?? "N/A"} index={index} productPrice={item.order[0]?.productPrice} productId={item.order[0]?.productId}/>
            )))
          }
        </div>
        <div className='w-full h-max flexClass flex-col gap-y-2'>
          <h2 className='my-2'>Pending</h2>
          {pendingOrders && pendingOrders.length > 0 &&
            (pendingOrders.map((item,index) => (
              <OrderComponent key={item.id} orderedAt={item.orderedAt} id={item.id} expectedDeliveryDate={item.deliveryDate} order={item.order} productYear={item.order[0]?.productYear ?? "N/A"} index={index} productPrice={item.order[0]?.productPrice} productId={item.order[0]?.productId}/>
            )))
          }
        </div>
    </section>
  )
}

export default AllOrdersPage
