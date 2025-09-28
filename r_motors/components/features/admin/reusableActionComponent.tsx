"use client"
import { confirmAction, serverAlert } from '@/utils/sweetAleart'
import { Pen, Trash2 } from 'lucide-react'
import React from 'react'
import { deleteCarFunction, editProductFunction } from './(pages)/carsPage';
import { deleteUserFunction } from './(pages)/usersPage';
import { useRouter } from 'next/navigation';
import { deleteOrderFunction, editOrderFunction } from './(pages)/ordersPage';
import {useState} from 'react';
import Swal from 'sweetalert2';
import withReactContent from "sweetalert2-react-content";

const MySwal = withReactContent(Swal)
// Note to self: refactor this into cleaner code/smaller blocks of code rather than this confusing reusable bock of code.
const ReusableActionComponent = <T extends {id: string}>({data,isEdit = true, callingComponentName,isOrder = false}: {data: T,isEdit?: boolean, callingComponentName: string,isOrder?: boolean}) => {
    const router = useRouter();
    const [newValues,setNewValues] = useState({
      productTitle: "",
      productDescription: "",
      productPrice: "",
      productCost: "",
      productCategory: "",
      productAvailability: "",
      productQuantity: "",
    })
    const [newDeliveryDate,setNewDeliveryDate] = useState("")

    

    const handleProductDelete = async() => {
      const name = callingComponentName === "user"? "user" : callingComponentName === "product"? "product" : callingComponentName === "order"? "order" : "";
        const confirmed = await confirmAction(
          "Are You Sure?",
          `This Will Permanently Delete This ${name}.`,
          "Delete",
          "Cancle",
        )
    
        if(confirmed)
        {
          name === "product"?  await deleteCarFunction(data.id) : name === "user"? await deleteUserFunction(data.id) : name === "order"&& await deleteOrderFunction(data.id)
            await serverAlert(
              "Success",
              `${name} deleted successfully`,
              true
          )
          router.refresh();
          

        }
        else{
          await serverAlert(
            "Canceled",
            `Your ${name} was not deleted.`,
            true
          )
    
        }
      }


      const handleEditingProductData = async() => {
        let formValues = {...newValues}
        const {value} = await MySwal.fire({
          title: "Edit Value",
          html: 
            <div className='w-max h-max p-4 flexClass'>
              <input 
                type="text" 
                className='w-max h-max rounded-md' 
                placeholder='product title here...' 
                defaultValue={newValues.productTitle} 
                onChange={(e) => (formValues.productTitle = e.target.value)} 
              />
              <input 
              type="text"  
                className='w-max h-max rounded-md' 
                placeholder='product description here...' 
                defaultValue={newValues.productDescription} 
                onChange={(e) => (formValues.productDescription = e.target.value)}
              />

              <input 
              type="number"  
                className='w-max h-max rounded-md' 
                placeholder='product price here...' 
                defaultValue={newValues.productPrice} 
                onChange={(e) => (formValues.productPrice = e.target.value)}
              />

              <input 
              type="number"  
                className='w-max h-max rounded-md' 
                placeholder='product cost here...' 
                defaultValue={newValues.productCost} 
                onChange={(e) => (formValues.productCost = e.target.value)}
              />
              <input 
              type="text"  
                className='w-max h-max rounded-md' 
                placeholder='product category here...' 
                defaultValue={newValues.productCategory} 
                onChange={(e) => (formValues.productCategory = e.target.value)}
              />
              <input 
              type="number"  
                className='w-max h-max rounded-md' 
                placeholder='product quantity here...' 
                defaultValue={newValues.productQuantity} 
                onChange={(e) => (formValues.productQuantity = e.target.value)}
              />
              <select 
                className='w-max h-max rounded-md'  
                defaultValue={newValues.productAvailability} 
                onChange={(e) => (formValues.productAvailability = e.target.value)}
                  
              >
                <option value="Available">Available</option>
                <option value="Sold">Sold</option>
                <option value="Pending">Pending</option>
              </select>

            </div>
            ,
          focusConfirm: false,
          showCancelButton: true,
          preConfirm: () => formValues,
          width: "50%",


        })
        if(value){
          const changedValues = Object.fromEntries(
            Object.entries(value).filter(([key,val]) => val !== undefined && val !== "")
          );

          if(Object.keys(changedValues).length > 0)
          {
            await handleProductUpdate(changedValues)
          }
        }
      }
      const handleEditingOrderData = async() => {
        const {value: date} = await MySwal.fire({
          title: "Edit Value",
          inputLabel: "Expected Delivery Date",
          inputPlaceholder: "dd/mm/yyyy format",
          input: "date",
          focusConfirm: false,
          showCancelButton: true,


        })
        if(date){
          if(date !== "")
          {
            await handleProductUpdate(undefined,{deliveryDate: date})
          }          

        }
      }
    
    const handleProductUpdate = async(newDetails?: {productTitle?: string,productDescription?: string,productPrice?: number,productCost?: number,productCategory?: string,productAvailability?: string,productQuantity?: number},orderDetails?: {orderStatus?: string,deliveryDate?: string}) => {

      const confirmed = await confirmAction(
        "Are You Sure?",
        `This will change the current values.`,
        "Update",
        "Cancle",
      )
  
      if(confirmed)
      {
          isOrder? await editOrderFunction(data.id,orderDetails!) : await editProductFunction(data.id,newDetails!)
          await serverAlert(
            "Success",
            `${isOrder? "order" : "product"} edited successfully`,
            true
        )
        router.refresh();
        
      }
      else{
        await serverAlert(
          "Canceled",
          `${isOrder? "order" : "product"} details were not updated.`,
          true
        )
  
      }
    }
  return (
    <span className='w-max h-max flexClass gap-x-2'>
        {isEdit&&
            <span className='active:scale-95  transition transform ease-in-out duration-300 cursor-pointer' onClick={() => {isOrder? handleEditingOrderData() : handleEditingProductData()}}><Pen height={15} width={15} /></span>
        }
        <span className='active:scale-95 transition transform ease-in-out duration-300 cursor-pointer' onClick={() => {handleProductDelete()}}><Trash2 width={15} height={15}/></span>
    </span>
  )
}

export default ReusableActionComponent