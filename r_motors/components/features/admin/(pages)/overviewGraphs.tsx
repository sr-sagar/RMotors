"use client"
import React from 'react'
import { CartesianGrid, Legend, Bar, BarChart, ResponsiveContainer, Tooltip, XAxis, YAxis, PieChart, Pie } from "recharts";
import { useScreenSize } from '../../../context/ScreenSizeContext';
import Cards from '../cards';
import { Box, ShoppingCart, TrendingUp, User } from 'lucide-react';

type CarsAnalyticDataProps = {
    month: string,
    totalsales: number,
    totalcost: number,
    profit: number,

}

const OverviewGraphs = ({totalUsersCount,totalCarsCount,totalCarSales,totalRevenue,data} : {totalUsersCount: number,totalCarsCount: number,totalCarSales: number,totalRevenue: number,data: CarsAnalyticDataProps[]}) => {



    const {isMobile, width} = useScreenSize()


    const numricData = data.map((item) => ({
        month: item.month,
        totalsales: Number(item.totalsales),
        totalcost: Number(item.totalcost),
        profit: Number(item.profit)

    }))
    

    const cardsArray = [
        {title: "Total Cars", totalAmt: `${totalCarsCount}`, lastMonthPercent: "+12",iconName: Box},
        {title: "Active Users", totalAmt: `${totalUsersCount}`, lastMonthPercent: "+8",iconName: User},
        {title: "Car Sales", totalAmt: `${totalCarSales}`, lastMonthPercent: "+23",iconName: ShoppingCart},
        {title: "Revenue", totalAmt: `${totalRevenue}`, lastMonthPercent: "+15",iconName: TrendingUp},
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
                    <BarChart data={numricData} margin={{left: 0, right: 15}}>
                        <CartesianGrid strokeDasharray="3 3"/>
                        <XAxis dataKey={'month'}/>
                        <YAxis dataKey={'profit'}/>
                        <Tooltip />
                        <Legend />
                        <Bar dataKey={'totalsales'} />
                        <Bar dataKey={'profit'} fill='#8884d8'/>
                    </BarChart>
                </ResponsiveContainer>
            </div>
            <div className='w-full md:w-1/2 h-max shadow-md rounded-md flexClass border-gray-200 border-3'>

                <ResponsiveContainer width={'100%'} height={isMobile? 300 : 400}>
                    <PieChart>
                        <Pie 
                        data={numricData}
                        dataKey={'totalsales'}
                        nameKey={'month'}
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
