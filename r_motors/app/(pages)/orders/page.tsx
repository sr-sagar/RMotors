import React from 'react'
import InternalNavbarComponent from '../../../components/(common)/internalNavbarComponent';
import { getRequestWithAuth } from '../../../utils/getRequestWithAuth';
import ToastComponent from '@/components/(common)/toastComponent';
import AllOrdersPage from '@/components/features/orders/(pages)/allOrdersPage';
import InternalNavbarForOrderPage from '../../../components/features/orders/internalNavbarForOrderPage';
import DeliveredPage from '../../../components/features/orders/(pages)/deliveredPage';
import PendingPage from '../../../components/features/orders/(pages)/pendingPage';
import DispatchedPage from '../../../components/features/orders/(pages)/dispatchedPage';
import CanceledPage from '../../../components/features/orders/(pages)/canceledPage';
import { postRequestWithAuth } from '../../../utils/postRequestWithAuth';
import { getCookies } from '../../../utils/getCookies';
import { serverAlert } from '../../../utils/sweetAleart';




export type OrderItemProps = {
  id: string, 
  productTitle: string,
  productPrice: number,
  productQuantity: number,
  productImageURLs: string[],
  productYear: string,
  productId: string,


}
export type OrderProps = {
  id: string,
  orderStatus: string,
  userId: string,
  order: OrderItemProps[],
  orderedAt: string, 
  deliveryDate: string
}



export const createOrderFunction = async(productId: string) => {
  const userEmail = await getCookies("userEmail");
  if(userEmail && userEmail !== undefined)
  {
    const res = await postRequestWithAuth("order", {userEmail,productId})
    if(res.success)
    {
      await serverAlert(
        "Success",
        "order placed successfully.",
        true,
      )
    }
    else{
      await serverAlert(
        "Failed",
        "unable to place order.",
        true,
      )
      
    }

  }else{
    await serverAlert(
      "Info!",
      "Please login to place this order.",
      true
    )
  }
  
} 

const Orders = async() => {
  

  const res = await getRequestWithAuth("order");
  const getOrders = res?.res?.data;
  



  const completedStatusData = getOrders?.filter((order: OrderProps) => order.orderStatus === "Delivered")
  const pendingStatusData = getOrders?.filter((order: OrderProps) => order.orderStatus === "Pending")
  const canceledStatusData = getOrders?.filter((order: OrderProps) => order.orderStatus === "Canceled")
  const dispatchedStatusData = getOrders?.filter((order: OrderProps) => order.orderStatus === "Dispatched")

  
  const navbarNameArray = [
    "all",
    "pending",
    "delivered",
    "dispatched",
    "canceled",
  ]

  const internalNavbarComponents = {
    "all": <AllOrdersPage deliveredOrders={completedStatusData} pendingOrders={pendingStatusData} canceledOrders={canceledStatusData} dispatchedOrders={dispatchedStatusData}/>,
    "pending" : <PendingPage  pendingOrders={pendingStatusData} />,
    "delivered": <DeliveredPage deliveredOrders={completedStatusData} />,
    "dispatched": <DispatchedPage  dispatchedOrders={dispatchedStatusData}/>,
    "canceled": <CanceledPage  canceledOrders={canceledStatusData} />,
  }

  return (

    <section className='w-full p-12 flexClass flex-col gap-y-2'>
      <ToastComponent success={res.success} message={res.res.message}/>
      <div className='w-full h-max flexClass flex-col p-2 md:p-4 md:px-12 gap-y-2'>
        <h2 className='w-full text-left  text-xl font-bold'>My Orders</h2>
        <InternalNavbarComponent stateNameArray={navbarNameArray}/>
      </div>
      <div className='w-full min-h-[450px] max-h-[500px] flex justify-start items-center flex-col max-w-[1020px]  overflow-y-auto p-2 gap-y-4' style={{scrollbarWidth: "none"}}>
          <InternalNavbarForOrderPage currentComponent={internalNavbarComponents} />
      </div>
    </section>
  )
}

export default Orders
