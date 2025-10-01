export const revalidate = 60;
import React, { Suspense } from 'react'
import InternalNavbarComponent from '../../../components/(common)/internalNavbarComponent';
import { getRequestWithAuth } from '../../../utils/getRequestWithAuth';
import ToastComponent from '@/components/(common)/toastComponent';
import AllOrdersPage from '@/components/features/orders/(pages)/allOrdersPage';
import InternalNavbarForOrderPage from '../../../components/features/orders/internalNavbarForOrderPage';
import DeliveredPage from '../../../components/features/orders/(pages)/deliveredPage';
import PendingPage from '../../../components/features/orders/(pages)/pendingPage';
import DispatchedPage from '../../../components/features/orders/(pages)/dispatchedPage';
import CanceledPage from '../../../components/features/orders/(pages)/canceledPage';
import { getCookies } from '../../../utils/getCookies';
import Image from "next/image"



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





const Orders = async() => {
  

  
  if(!(await getCookies("token"))){
    return(
      <div className='w-full h-max flexClass flex-col'>
        <Image src={"/profileImg.png"} height={300} width={400}  alt='this is the image that appers when user click on the profile while they are logged out.' className='object-[center_center] object-contain'/>
        <h3 className='text-md md:text-lg font-bold'>Please Login/Signup to view this page.</h3>
      </div>
    );
  }
  const res = await getRequestWithAuth("order", 60);
  const getOrders = res?.res?.data;
  



  const completedStatusData: OrderProps[] = [] 
  const pendingStatusData: OrderProps[] = [] 
  const canceledStatusData: OrderProps[] = [] 
  const dispatchedStatusData: OrderProps[] = [] 

  getOrders?.forEach((order: OrderProps) => {
    switch(order.orderStatus){
      case "Delivered" : completedStatusData.push(order); break;
      case "Pending" : pendingStatusData.push(order); break;
      case "Canceled" : canceledStatusData.push(order); break;
      case "Dispatched" : dispatchedStatusData.push(order); break;
    }
  });
  
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
        <Suspense fallback={<p>Loading....</p>}>
          <InternalNavbarForOrderPage currentComponent={internalNavbarComponents} />
        </Suspense>
      </div>
    </section>
  )
}

export default Orders
