import React from 'react'
import OrderItemComponent from './orderItemComponent';
import { OrderItemProps } from '../../../app/(pages)/orders/page';
import ViewDetailsButton from './viewDetailsButton';
import { itemAxisPredicate } from 'recharts/types/state/selectors/axisSelectors';


const OrderComponent = ({orderedAt,expectedDeliveryDate,id,order,productYear,index,productPrice,productId}: {orderedAt: string,expectedDeliveryDate: string,id: string, order: OrderItemProps[], productYear: string,index: number,productPrice: number,productId: string}) => {
  return (
    <div className='w-full h-max flexClass flex-col gap-y-2'>
      <div className='w-full h-max flex justify-between items-center'>
        <div className='w-full h-max flex justify-center items-start flex-col '>
            <p>#CAR-{productYear}-{index}</p>
            <p>Placed on {orderedAt.split("T")[0]} {orderedAt.split("T")[1].slice(0,5)}</p>
        </div>
        <div className='w-full h-max flex justify-center items-end flex-col'>
            <p>{productPrice}</p>
            <p>{1} item</p>
        </div>        
      </div>
      <div className='w-full h-max flexClass pb-2'>
        {order && order.length > 0? 
        ( 
          order.map((item) => (
            <OrderItemComponent key={item.id} title={item.productTitle} price={item.productPrice} quantity={item.productQuantity} imageURL={item.productImageURLs[0]}/>
          ))
        )
        :
        (
          <p>No Items in this order.</p>
        )
          
        }
      </div>
      <div className='w-full h-max flexClass border-t-2 border-gray-200 p-1 py-2'>
        <div className='w-full h-max flex justify-center items-start flex-col '>
          <p className='text-[8px] md:text-md'>Tracking: {id}</p>
          <p className='text-[8px] md:text-md'>Expected Delivery: {expectedDeliveryDate}</p>
        </div>
        <div className='w-full h-max flex justify-end items-center gap-x-2 text-xs md:text-md'>
          <ViewDetailsButton id={productId}/>
        </div>
      </div>
    </div>
  )
}

export default OrderComponent
