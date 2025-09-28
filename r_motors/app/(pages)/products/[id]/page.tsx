import React from 'react'
import Image from 'next/image';
import Button from '@/components/(common)/button';
import { Gauge, Calendar, Fuel, Settings } from 'lucide-react';
import { prisma } from '../../../../lib/prisma';
import ButtonSection from '@/components/features/productsPage/buttonSection';
import ImageScrollerForMobile from '../../../../components/features/productsPage/imageScrollerForMobile';
import { CarsDataProps } from '../../../../components/features/search/searchPageFilter';

export type GetCarDataProps = CarsDataProps & {
  productTransmission: string,
  productLocation: string,
  productPriceBeforeDiscount: number,
  uploader: {
    userLocation: string,
    userName: string,
  }  
  
}
const productsPage = async({params}: {params: {id: string}}) => {
  
  const {id} = await params
  const getCar = await prisma.product.findFirst({where: {id: id}, select: {id: true,productTitle: true,productAvailability: true,productCategory: true,productDescription: true,productPrice: true, productImageURLs: true, productUploaderId: true,productTransmission: true,productYear: true,productLocation: true,productTotalMiles: true,productPriceBeforeDiscount: true, uploader: {select: {userLocation: true, userName: true}}}})
  const serilizedGetCar = {
    ...getCar,
    id: getCar?.id ?? "",
    productTitle: getCar?.productTitle ?? "N/A",
    productAvailability: getCar?.productAvailability ?? "N/A",
    productCategory: getCar?.productCategory ?? "N/A",
    productDescription: getCar?.productDescription ?? "N/A",
    productPrice: Number(getCar?.productPrice ?? 0),
    productPriceBeforeDiscount: Number(getCar?.productPriceBeforeDiscount ?? 0),
    productImageURLs: getCar?.productImageURLs ?? [],
    productUploaderId: getCar?.productUploaderId ?? "",
    productTransmission: getCar?.productTransmission ?? "Petrol", 
    productYear: getCar?.productYear ?? "N/A",
    productLocation: getCar?.productLocation ?? "N/A",
    productTotalMiles: getCar?.productTotalMiles ?? "N/A",
    uploader: getCar?.uploader ?? { userName: "N/A", userLocation: "N/A" }
  }

  const save = Number(getCar?.productPriceBeforeDiscount) - Number(getCar?.productPrice)
  return (
    <section className='w-full h-max grid grid-cols-1 md:grid-cols-3 p-6 md:p-12'>

      <section className='w-full min-h-[450px] col-span-2 space-y-6 p-4'>

        <section  className='w-full h-max flex  justify-start items-center p-2 overflow-x-auto flex-shrink-0 gap-x-4' style={{scrollbarWidth: "none"}}>
            <ImageScrollerForMobile getCar={serilizedGetCar}/>    
          </section>
        <section className='w-full h-max flex justify-center items-start flex-col gap-y-2 mt-2 p-2'>
          <div className='w-full h-max flex justify-start items-center'>
            <span className='w-max h-max p-1 px-2 rounded-lg bg-blue-400'>{getCar?.productCategory ?? "N/A"}</span>
          </div>
            <p>{getCar?.productTitle ?? "N/A"}</p>
          <div className='w-full h-max flex justify-start items-center gap-x-4 text-sm'>
            <p>{getCar?.productLocation}</p>
            <p className='w-max h-max flex gap-x-1'><Gauge width={20} height={20}/>{getCar?.productTotalMiles ?? "N/A"} miles</p>
          </div>
        </section>
        <section className='w-full h-max flexClass flex-col gap-y-2'>
          <h3 className='w-full h-max text-start'>Specifications</h3>
          <div className='w-full h-max flex flex-col md:flex-row justify-between items-center text-xs md:text-md'>
          
            <div className='orderSpecifications'>
              <Calendar height={50}/>
              <div className='col-span-1 '>
                <p>Year</p>
                <p>{getCar?.productYear ?? "N/A"}</p>
              </div>
            </div>

            <div className='orderSpecifications '>
              <Fuel height={50} />
              <div className='col-span-1 '>
                <p>Fule Type</p>
                <p>{getCar?.productCategory ?? "N/A"}</p>
              </div>
            </div>

            <div className='orderSpecifications'>
              <Settings height={50} />
              <div className='col-span-1'>
                <p>Transmission</p>
                <p>{getCar?.productTransmission ?? "N/A"}</p>
              </div>
            </div>

            <div className='orderSpecifications'>
              <Gauge height={50}/>
              <div className='col-span-1'>
                <p>Mileage</p>
                <p>{getCar?.productTotalMiles ?? "N/A"} miles</p>
              </div>
            </div>
          </div>
        </section>
        <section>
          <h3>Description</h3>
          <p className="truncate">{getCar?.productDescription ?? "N/A"}</p>

        </section>
      </section>
      <section className='w-full col-span-1 h-max gap-y-4 flexClass flex-col mb-4  p-2 sticky top-22'>
          <div className='w-full h-max flexClass flex-col '>
            <p className='text-md md:text-[20px]'><s>{String(getCar?.productPriceBeforeDiscount) ?? "N/A"}RS</s></p>
            <p className='text-md md:text-[24px]'>{String(getCar?.productPrice) ?? "N/A"}Rs</p>
            <p className='text-sm opacity-30'>Save {save}RS</p>
          </div>
          <div className='w-full h-max flexClass border-y-2  border-gray-200 py-4'>
            <ButtonSection id={getCar?.id ?? "N/A"} uploaderId={getCar?.productUploaderId ?? "N/A"}/>
          </div>
          <div className='w-full h-max flexClass '>
            <div className='w-[70%] h-max flex justift-center items-start flex-col'>
            <p>Dealer Information</p>
            <p>{getCar?.uploader.userName ?? "N/A"}</p>
            <p>{getCar?.uploader.userLocation ?? "N/A"}</p>
            </div>

          </div>
      </section>
    </section>

  )
}

export default productsPage
