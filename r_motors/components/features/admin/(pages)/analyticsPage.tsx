"use client"
import React from 'react'
import { Line, LineChart, ResponsiveContainer, CartesianGrid, Tooltip, Legend, XAxis, YAxis } from 'recharts';

const AnalyticsPage = () => {
    const data = [
        { name: 'Jan', sales: 4000, profit: 2400 },
        { name: 'Feb', sales: 3000, profit: 1398 },
        { name: 'Mar', sales: 2000, profit: 9800 },
        { name: 'Apr', sales: 2780, profit: 3908 },
        { name: 'May', sales: 1890, profit: 4800 },
        { name: 'Jun', sales: 2390, profit: 3800 },
        { name: 'Jul', sales: 3490, profit: 4300 },
    ]
  return (
    <div className='w-full h-max  shadow-md rounded-md p-4 flexClass flex-col gap-y-4'>
        <ResponsiveContainer width={'100%'} height={300}>
            <LineChart data={data}>
                <CartesianGrid />
                <XAxis dataKey={'name'}/>
                <YAxis dataKey={'profit'}/>
                <Line dataKey={'sales'} activeDot={{r: 6, fill: "red"}}/>
                <Tooltip />
                <Legend />
            </LineChart>
        </ResponsiveContainer>

    </div>
  )
}

export default AnalyticsPage