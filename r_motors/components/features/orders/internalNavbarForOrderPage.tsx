"use client"
import React from 'react'
import { useStateContext } from '../../context/useStateContext';

type InternalNavbarOrderProps = {
    currentComponent: Record<"all"| "pending" | "delivered" | "dispatched" | "canceled", React.ReactNode>
}
const InternalNavbarForOrderPage = ({currentComponent}: InternalNavbarOrderProps ) => {
    const { activeTab } = useStateContext() as {activeTab: "all"| "pending" | "delivered" | "dispatched" | "canceled"} 
  return (
    <div className='w-full'>
      {currentComponent[activeTab]}
    </div>
  )
}

export default InternalNavbarForOrderPage
