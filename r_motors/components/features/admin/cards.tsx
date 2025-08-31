import React from 'react'

const Cards = ({children, title, totalAmt, lastMonthPercent}: {children: React.ReactNode,title: string, totalAmt: string, lastMonthPercent: string}) => {
  return (
    <div className='w-max h-max min-w-[200px] md:min-w-0 md:h-[195px] lg:h-max flexClass flex-col p-4 rounded-md shadow-md'>
        <div className='flex justify-end items-center w-full'>
            {children}
        </div>
        <div className='flex justify-center items-start flex-col'>
            <p className='text-sm md:text-md'>{title}</p>
            <p className='text-md md:text-lg'>{totalAmt}</p>
            <p><span className='text-sm text-blue-400'>{lastMonthPercent}</span> from the last month</p>
        </div>
    </div>
  )
}

export default Cards
