"use client"
import React from 'react'
import { useStateContext } from '../../context/useStateContext';

type Props = {currentTabContent: Record<"overview" | "cars" | "addCars" | "users" | "orders" | "analytics", React.ReactNode>}
const InternalNavbarPages = ({currentTabContent}: Props) => {
    const {activeTab} = useStateContext() as {activeTab: "overview" | "cars" | "addCars" | "users" | "orders" | "analytics"}

    
    return (
        <div className='w-full'>
            {currentTabContent[activeTab]}
        </div>

    
  )
}

export default InternalNavbarPages
