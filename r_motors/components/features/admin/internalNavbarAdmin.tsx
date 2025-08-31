"use client"
import React from 'react'
import { useState, useEffect } from 'react';
import { useStateContext } from '../../context/useStateContext';

const InternalNavbarAdmin = ({stateNameArray}: {stateNameArray: string[]}) => {
    const {activeTab,setActiveTab} = useStateContext()
    useEffect(() => {
        setActiveTab(stateNameArray[0])

    },[])


    const handleOnClick = (name: string) => {
        setActiveTab(name)
    }

    return (
    <div className='w-full h-max rounded-md shadow-md'>
        <ul className='w-full h-full flex justify-around items-center p-1 rounded-md bg-gray-200'>
            {stateNameArray.map((name) => (
                 <li key={name} className={`profileListItems text-[8px] font-bold md:text-md  lg:text-lg px-1 ${activeTab === name ? "bg-white" : "" }`} onClick={() => {handleOnClick(name)}}>{name.charAt(0).toUpperCase() + name.slice(1)}</li> 
            ))}
        </ul>
    </div>
  )
}

export default InternalNavbarAdmin
