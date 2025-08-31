import React from 'react'
import InternalNavbarAdmin from '../../../components/features/admin/internalNavbarAdmin';
import InternalNavbarPages from '../../../components/features/admin/internalNavbarPages';
import dynamic from 'next/dynamic';
import UsersPage from '../../../components/features/admin/(pages)/usersPage';
import OrdersPage from '@/components/features/admin/(pages)/ordersPage';
import AnalyticsPage from '@/components/features/admin/(pages)/analyticsPage';
import AddCarsPage from '@/components/features/admin/(pages)/addCarsPage';
const OverviewGraphs = dynamic(() => import('../../../components/features/admin/(pages)/overviewGraphs'))
const CarsPage = dynamic(() => import('../../../components/features/admin/(pages)/carsPage'))


const AdminPage = () => {
    const stateNameArray = ["overview","cars","addCars","users","orders","analytics"]

    const currentTabContent  = {
      overview: <OverviewGraphs />,
      cars: <CarsPage />,
      addCars: <AddCarsPage />,
      users: <UsersPage />,
      orders: <OrdersPage />,
      analytics: <AnalyticsPage />

  }
  return (
    <section className='w-full min-h-[300px] p-4 flexClass flex-col'>
      <section className='w-full min-h-max max-w-[90%] md:max-w-[80%] shadow-md border-md  p-4 flexClass flex-col '>
        <InternalNavbarAdmin stateNameArray={stateNameArray}/>
      </section>
      
      <section className='w-full min-h-max max-w-[90%] md:max-w-[80%] shadow-md border-md  p-4 flexClass flex-col '>
          <InternalNavbarPages currentTabContent={currentTabContent}/>
      </section>
    </section>
  )
}

export default AdminPage
