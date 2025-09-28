import React from 'react'
import { Calendar } from "lucide-react"
const MemberCard = ({memberSince}: {memberSince: string}) => {
  return (
    <div className='w-full h-full bg-white rounded-md shadow-md flexClass flex-col text-blue-600'>
        <Calendar />
        <p className='text-md md:text-lg font-bold '>{memberSince}</p>
        <p className='w-full text-center text-sm md:text-md'>Member Since</p>
    </div>
  )
}

export default MemberCard
