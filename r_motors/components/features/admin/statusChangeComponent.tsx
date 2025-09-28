"use client"
import React from 'react'
import {useState} from 'react';
import { confirmAction, serverAlert } from '../../../utils/sweetAleart';
import { editUserFunction } from './(pages)/usersPage';
import { useRouter } from 'next/navigation';
import { editOrderFunction } from './(pages)/ordersPage';

const StatusChangeComponent = ({data}: {data: {id: string,userRole?: string,orderStatus?: string}}) => {
    const router = useRouter()
    const isUserRole = data.userRole? true : false 
    const [selectValue,setSelectValue] = useState(isUserRole? data.userRole! : data.orderStatus!)


    const options = isUserRole
    ? [
        { value: "user", label: "User" },
        { value: "admin", label: "Admin" },
      ]
    : [
        { value: "Pending", label: "Pending" },
        { value: "Dispatched", label: "Dispatched" },
        { value: "Delivered", label: "Delivered" },
        { value: "Canceled", label: "Canceled" },
      ];
    const handleUpdateUser = async(e: React.ChangeEvent<HTMLSelectElement>) => {
        const newRole = e.target.value
        if(newRole === selectValue)
        {
            await serverAlert("Info", `Select a new ${isUserRole? "role" : "status"} please.`, true)
            return;
        }
        setSelectValue(newRole)
        
        const confirmed = await confirmAction(
            "Are you sure?",
            `This will change the ${isUserRole? "user role" : "order status"} `,
            "Change Status",
            "Cancel"
        )
        if(confirmed)
        {
            const result = isUserRole? await editUserFunction(data.id,newRole) : await editOrderFunction(data.id,{orderStatus: newRole})
            if(result.success)
            {
                setSelectValue(newRole)
                await serverAlert(
                    "success",
                    `${isUserRole? "user" : "order"} statue changed successfully.`,
                    true
                )

            }
            router.refresh()
            
        }
        else{
            setSelectValue(selectValue)
            await serverAlert(
                "failer",
                `unable to change ${isUserRole? "user" : "order"} statue.`,
                true
            )
            
        }
    }
  return (
    <span className='w-max h-max'>
        <select className='rounded-md' value={selectValue}   onChange={(e) => {handleUpdateUser(e)}}>
            {options.map((item) => (
                <option key={item.value} value={item.value}>{item.label}</option>
            ))}
        </select>
    </span>
  )
}

export default StatusChangeComponent
