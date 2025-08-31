export const revalidate = 1;

import React from 'react'
import { prisma } from '../../../../lib/prisma';
import ReusableNavbarRenderingComponent from '../reusableNavbarRenderingComponent';
import { getRequestWithAuth } from '../../../../utils/getRequestWithAuth';
const CarsPage = async() => {
  const res = await getRequestWithAuth("admin/products");
  const getCars = res?.res?.products;

  
  const columns = [
    {header: "Cars", key: "productTitle"},
    {header: "Category", key: "Not Yet Know"},
    {header: "Price", key: "productPrice"},
    {header: "Stock", key: "Not Yet Know"},
    {header: "Status", key: "Not Yet Know"},
    {header: "Actions", key: "Not Yet Know"},
  ]
  return <ReusableNavbarRenderingComponent data={getCars} column={columns}/>
  
}

export default CarsPage