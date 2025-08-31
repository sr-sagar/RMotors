"use client"
import React from 'react'
import { CartesianGrid, Legend, Bar, BarChart, ResponsiveContainer, Tooltip, XAxis, YAxis, PieChart, Pie } from "recharts";
import { useScreenSize } from '../../../context/ScreenSizeContext';
import Cards from '../cards';
import { Box, ShoppingCart, TrendingUp, User } from 'lucide-react';
const OverviewGraphs = () => {


    const {isMobile, width} = useScreenSize()


    const data = [
        { name: 'Jan', sales: 4000, profit: 2400 },
        { name: 'Feb', sales: 3000, profit: 1398 },
        { name: 'Mar', sales: 2000, profit: 9800 },
        { name: 'Apr', sales: 2780, profit: 3908 },
        { name: 'May', sales: 1890, profit: 4800 },
        { name: 'Jun', sales: 2390, profit: 3800 },
        { name: 'Jul', sales: 3490, profit: 4300 },
    ]
    const cardsArray = [
        {title: "Total Cars", totalAmt: "1,847", lastMonthPercent: "+12",iconName: Box},
        {title: "Active Users", totalAmt: "18,291", lastMonthPercent: "+8",iconName: User},
        {title: "Car Sales", totalAmt: "2,429", lastMonthPercent: "+23",iconName: ShoppingCart},
        {title: "Revenue", totalAmt: "$2.4M", lastMonthPercent: "+15",iconName: TrendingUp},
      ]
  return (
    <div className='w-full h-max flexClass flex-col gap-y-2 md:gap-x-2'>
        <section className='w-full shadow-md border-md p-4 flex flex-col gap-y-4 md:flex-row justify-around items-center '>
            {cardsArray.map((item,id) => (
              <Cards  key={id} title={item.title} totalAmt={item.totalAmt} lastMonthPercent={item.lastMonthPercent}>
                <item.iconName />
              </Cards>
            ))}
        </section>
        <section className='w-full h-max flexClass flex-col md:flex-row gap-y-2 md:gap-x-2'>

            <div className='w-full md:w-1/2 h-max shadow-md border-gray-200 border-3 rounded-md flexClass ' >
                <ResponsiveContainer width='100%' height={isMobile? 300 : 400}>
                    <BarChart data={data} margin={{left: 0, right: 15}}>
                        <CartesianGrid strokeDasharray="3 3"/>
                        <XAxis dataKey={'name'}/>
                        <YAxis dataKey={'profit'}/>
                        <Tooltip />
                        <Legend />
                        <Bar dataKey={'sales'} />
                        <Bar dataKey={'profit'} fill='#8884d8'/>
                    </BarChart>
                </ResponsiveContainer>
            </div>
            <div className='w-full md:w-1/2 h-max shadow-md rounded-md flexClass border-gray-200 border-3'>

                <ResponsiveContainer width={'100%'} height={isMobile? 300 : 400}>
                    <PieChart>
                        <Pie 
                        data={data}
                        dataKey={'sales'}
                        nameKey={'name'}
                        cx={'50%'}
                        cy={'50%'}
                        outerRadius={width > 786? 100 : 50}
                        fill='#8884d8'
                        label
                        />
                        <Tooltip />
                        <Legend />
                    </PieChart>
                </ResponsiveContainer>
            </div>
        </section>

    </div>
  )
}

export default OverviewGraphs
