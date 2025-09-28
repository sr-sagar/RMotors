"use client"
import React from 'react'
import SearchItems from '../products/searchItems';
import { useProductContext } from '../../context/productContext';

const SearchItemsDisplayComponent = () => {
  const {products} = useProductContext()
  return (
    <div className='w-full grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-2 p-1'>
        {products && products.length > 0? (
          
          products?.map((item) => (
              <SearchItems key={item.id} title={item.productTitle} price={item.productPrice.toString()} id={item.id} productOwnerId={item.productUploaderId} imgURL={item.productImageURLs[item.productImageURLs.length -1]} productCategory={item.productCategory} productYear={item.productYear} productTotalMiles={item.productTotalMiles}/>
          ))
          )
          :
          ( 
            <p>No Products Found</p>
            )

        }
    </div>
  )
}

export default SearchItemsDisplayComponent
