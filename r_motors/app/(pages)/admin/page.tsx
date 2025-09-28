import React from 'react'
import InternalNavbarComponent from '../../../components/(common)/internalNavbarComponent';
import InternalNavbarPages from '../../../components/features/admin/internalNavbarPages';
import dynamic from 'next/dynamic';
import UsersPage from '../../../components/features/admin/(pages)/usersPage';
import OrdersPage from '@/components/features/admin/(pages)/ordersPage';
import AnalyticsPage from '@/components/features/admin/(pages)/analyticsPage';
import AddCarsPage from '@/components/features/admin/(pages)/addCarsPage';
import { getRequestWithAuth } from '../../../utils/getRequestWithAuth';
import { getCookies } from '../../../utils/getCookies';
import ToastComponent from '../../../components/(common)/toastComponent';
const OverviewGraphs = dynamic(() => import('../../../components/features/admin/(pages)/overviewGraphs'))
const CarsPage = dynamic(() => import('../../../components/features/admin/(pages)/carsPage'))

const AdminPage = async() => {

    const userRole = await getCookies("userRole")
    if(userRole !== "admin")
    { 
      return  <ToastComponent success={false} message='You are unauthorized to access this page. please go back.' isNavigate={true} url='/'/>
      
    }
    const stateNameArray = ["overview","cars","addCars","users","orders","analytics"]
    
    
    const getCars = await getRequestWithAuth("admin/products/count");
    const getCarsDetails = getCars?.res?.data

    const getUsers = await getRequestWithAuth("admin/users/count");
    const getUsersCount = getUsers?.res?.data

    const {_sum} = getCarsDetails && getCarsDetails[1]
    const {productPrice} = getCarsDetails && _sum

    const currentTabContent  = {
      overview: <OverviewGraphs totalUsersCount={getUsersCount} totalCarsCount={getCarsDetails[2]} totalCarSales={getCarsDetails[3]} totalRevenue={productPrice} data={getCarsDetails[0]}/>,
      cars: <CarsPage />,
      addCars: <AddCarsPage />,
      users: <UsersPage />,
      orders: <OrdersPage />,
      analytics: <AnalyticsPage />

  }
  return (
    <section className='w-full min-h-[300px] p-4 flexClass flex-col'>
      <section className='w-full min-h-max max-w-[90%] md:max-w-[80%] shadow-md border-md  p-4 flexClass flex-col '>
        <InternalNavbarComponent stateNameArray={stateNameArray}/>
      </section>
      
      <section className='w-full min-h-max max-w-[90%] md:max-w-[80%] shadow-md border-md  p-4 flexClass flex-col '>
          <InternalNavbarPages currentTabContent={currentTabContent}/>
      </section>
    </section>
  )
}

export default AdminPage
