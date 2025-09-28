import React from 'react'
import ReusableNavbarRenderingComponent from '../reusableNavbarRenderingComponent';
import { getRequestWithAuth } from '../../../../utils/getRequestWithAuth';
import { getCookies } from '@/utils/getCookies';
import { deleteRequestWithAuth } from '@/utils/deleteRequestWithAuth';
import { serverAlert } from '@/utils/sweetAleart';
import ReusableActionComponent from '../reusableActionComponent';
import { updateRequestWithAuth } from '@/utils/updateRequestWithAuth';
import StatusChangeComponent from '../statusChangeComponent';


export const deleteOrderFunction = async(orderId: string) => {
  const userEmail = await getCookies("userEmail");
  const res = await deleteRequestWithAuth("admin/orders", {userEmail,orderId});
  if(res.success)
  {
    serverAlert(
      "success",
      "order deleted successfully.",
      true
    )
  }
  else{
    serverAlert(
      "Failed",
      "unable to deleted order.",
      true
    )
    
  }
}

export const editOrderFunction = async(orderId: string,data: {orderStatus?: string, deliveryDate?: string}) => {
  const userEmail = await getCookies("userEmail");
  const res = await updateRequestWithAuth("admin/orders", {userEmail,orderId,data});
  if(res.success)
  {
    serverAlert(
      "Success",
      "order status updated successfully.",
      true
    )
    return {success: true}
  }
  else{
    serverAlert(
      "Failed",
      "unable to update order status.",
      true
      )
      return {success: false}
    
  }
}


const OrdersPage = async() => {
    const res = await getRequestWithAuth('admin/orders');
    const getOrder = res.res.data;
  const columns = [
    {header: "CustomerId", key: "userId"},
    {header: "Order", key: "productTitle"},
    {header: "OrderedOn", key: "orderedAt"},
    {header: "Status", key: "orderStatus", render: (data: {id: string,orderStatus: string}) => <StatusChangeComponent data={data}/>},
    {header: "OrderId", key: "id"},
    {header: "Expected Delivery Date", key: "deliveryDate"},
    {header: "Actions", key: "Not Yet Know", render: (data: {id: string}) => <ReusableActionComponent data={data} callingComponentName='order' isOrder={true}/>},
  ]
  return <ReusableNavbarRenderingComponent data={getOrder} column={columns} success={res.success} message={res.res.message}/>
  
}

export default OrdersPage