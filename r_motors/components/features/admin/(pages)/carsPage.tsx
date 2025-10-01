import React from 'react'
import ReusableNavbarRenderingComponent from '../reusableNavbarRenderingComponent';
import { getRequestWithAuth } from '../../../../utils/getRequestWithAuth';
import { confirmAction, serverAlert } from '../../../../utils/sweetAleart';
import ReusableActionComponent from '../reusableActionComponent';
import { getCookies } from '../../../../utils/getCookies';
import { deleteRequestWithAuth } from '../../../../utils/deleteRequestWithAuth';
import { updateRequestWithAuth } from '@/utils/updateRequestWithAuth';

export const deleteCarFunction = async(productId: string) => {
  const userEmail = await getCookies("userEmail");
  const res = await deleteRequestWithAuth("admin/products", {userEmail,productId});
  if(res.success)
  {
    serverAlert(
      "success",
      "product deleted successfully.",
      true
    )
  }
  else{
    serverAlert(
      "Failed",
      "unable to deleted product.",
      true
    )
    
  }
}

export const editProductFunction = async(productId: string,data: {productTitle?: string,productDescription?: string,productPrice?: number,productCost?: number,productCategory?: string,productAvailability?: string,productQuantity?: number,productTransmission?: string,productYear?: string,productLocation?: string,productTotalMiles?: string,productPriceBeforeDiscount?: number}) => {
  const userEmail = await getCookies("userEmail");
  const res = await updateRequestWithAuth("admin/products", {userEmail,productId,data});
  if(res.success)
  {
    serverAlert(
      "Success",
      "product updated successfully.",
      true
    )
  }
  else{
    serverAlert(
      "Failed",
      "unable to update product.",
      true
    )
    
  }
}


const CarsPage = async() => {
  const res = await getRequestWithAuth("admin/products",60);
  const getCars = res.res.data;


  

  
  const columns = [
    {header: "Cars", key: "productTitle"},
    {header: "Category", key: "productCategory"},
    {header: "Price", key: "productPrice"},
    {header: "Cost", key: "productCost"},
    {header: "Stock", key: "productQuantity"},
    {header: "Status", key: "productAvailability"},
    {header: "Actions", key: "Not Yet Know", render: (data: {id: string}) => <ReusableActionComponent data={data} callingComponentName='product'/>},
  ]
  return <ReusableNavbarRenderingComponent data={getCars} column={columns} success={res.success} message={res.res.message}/>
  
}

export default CarsPage