import SearchItems from '@/components/features/products/searchItems'
import SearchPageFilter from '@/components/features/search/searchPageFilter'
import React from 'react'
import { getRequest } from '../../../utils/getRequest';
import Link from 'next/link';
import { prisma } from '../../../lib/prisma';
type Products = {
  id: string,
  productTitle: string,
  productDescription: string,
  productPrice: string,
  productImgURL: string[]
}
const Search = async() => {
    const getProducts = await prisma.product.findMany({select: {id: true, productTitle: true, productDescription: true, productPrice: true,productImageURLs: true}})
    const getProductCount = await prisma.product.count({ select: {id: true}})
      
  return (
    <section className="w-full p-4 md:mt-0 mb-2 flexClass flex-col">
      <section className='w-full h-max max-w-[90%] md:max-w-[80%]  p-4'>
        <h3 className='text-lg text-start'>Search Cars</h3>
        <div className='w-full h-max  flexClass'>
          <SearchPageFilter />
        </div>
      </section>
      <section className='w-full h-max flexClass flex-col max-w-[90%] md:max-w-[80%] '>
        <p className='w-full text-start pl-1'>{getProductCount.id} Cars found</p>
        <div className='w-full grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-2 mt-2 p-1'>

            {getProducts && getProducts.length > 0? (
          
            getProducts?.map((item) => (
              <Link key={item.id} href={`/products/${item.id.toString()}`}>
                <SearchItems title={item.productTitle} price={item.productPrice}/>
              </Link>

            ))
            )
            :
            ( 
              <p>No Products Found</p>
              )

            }
          </div>
      </section>
    </section> 
  )
}


export default Search
