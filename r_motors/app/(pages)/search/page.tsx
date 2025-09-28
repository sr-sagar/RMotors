import SearchPageFilter from '@/components/features/search/searchPageFilter'
import React from 'react'
import { prisma } from '../../../lib/prisma';
import SearchItemsDisplayComponent from '../../../components/features/search/searchItemsDisplayComponent';
import { ProductContextProvider } from '../../../components/context/productContext';


const Search = async() => {
  const getProducts = await prisma.product.findMany({select: {id: true, productTitle: true, productDescription: true, productPrice: true,productImageURLs: true,productUploaderId: true,productCategory: true,productYear: true, productTotalMiles: true}})
  const getProductCount = await prisma.product.count({ select: {id: true}})
    
  const serilizedCars = getProducts.map((item) => ({
    ...item,
    productPrice: item.productPrice.toNumber()
  }))

  return (
    <ProductContextProvider getProducts={serilizedCars}>

      <section className="w-full p-4 md:mt-0 mb-2 flexClass flex-col">
        <section className='w-full h-max max-w-[90%] md:max-w-[80%]  p-4'>
          <h3 className='text-lg text-start'>Search Cars</h3>
          <div className='w-full h-max  flexClass'>
            <SearchPageFilter carsData={serilizedCars}/>
          </div>
        </section>
        <section className='w-full h-max flexClass flex-col max-w-[90%] md:max-w-[80%] '>
          <p className='w-full text-start pl-1'>{getProductCount.id} Cars found</p>
          <div className='w-full mt-2 p-1'>
            <SearchItemsDisplayComponent/> 
          </div>
        </section>
      </section> 
    </ProductContextProvider>
  )
}


export default Search
