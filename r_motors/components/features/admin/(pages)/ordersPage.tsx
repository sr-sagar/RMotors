export const revalidate = 1;

import React from 'react'
import ReusableNavbarRenderingComponent from '../reusableNavbarRenderingComponent';
import { getRequestWithAuth } from '../../../../utils/getRequestWithAuth';
const UsersPage = async() => {
    const res = await getRequestWithAuth('admin/orders');
    const getOrder = res?.res?.orders;
  
  const columns = [
    {header: "CustomerId", key: "userId"},
    {header: "Order", key: "order"},
    {header: "OrderedOn", key: "orderedAt"},
    {header: "OrderId", key: "id"},
    {header: "Actions", key: "Not Yet Know"},
  ]
  return <ReusableNavbarRenderingComponent data={getOrder} column={columns}/>
  
}

export default UsersPage