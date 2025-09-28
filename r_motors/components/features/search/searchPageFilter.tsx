"use client"
import React from 'react'
import { useState, useEffect } from 'react';
import { useProductContext } from '../../context/productContext';

export type CarsDataProps = {
  id: string,
  productTitle: string, 
  productDescription: string, 
  productPrice: number,
  productImageURLs: string[],
  productUploaderId: string,
  productCategory: string,
  productYear: string,
  productTotalMiles: string,
}

const SearchPageFilter = ({padding,carsData}: {padding?: string,carsData:CarsDataProps[] }) => {
    const [searchValue,setSearchValue] = useState<string>('')
    const [selectValue,setSelectValue] = useState<string>('')
    const {setProducts} = useProductContext()
    
    
    useEffect(() => {
      let filtered = [...carsData]
      const timeout = setTimeout(() => {
        if(searchValue !== ""){
          filtered = filtered.filter((item) => item.productTitle.toLowerCase().includes(searchValue.toLowerCase().trim()))
          setProducts(filtered)
        }
        
        if(selectValue === "High-to-Low"){
          filtered = filtered.sort((a,b) => b.productPrice - a.productPrice)
        }else if(selectValue === "Low-to-High"){
          filtered = filtered.sort((a,b) => a.productPrice - b.productPrice)
          
        }else if(searchValue === "Relavence"){
          setProducts(filtered)

        }
        
        setProducts(filtered)
      },400)

      return () => clearTimeout(timeout)
    },[searchValue,selectValue,carsData])

  return (
    <div className='w-full h-max flexClass  gap-x-2' style={{padding}}>
        <input type="text" className='w-full h-max rounded-md border-1 border-gray-200 p-1 ' placeholder='Search for cars, by make, model, or category...' value={searchValue} onChange={(e) => {setSearchValue(e.target.value)}}/>
        <select className='w-1/3 h-max p-1 rounded-md border-1 border-gray-200 transition transform smooth' value={selectValue} onChange={(e) => {setSelectValue(e.target.value)}}>
            <option value="Relavence">Relavence</option>
            <option value="High-to-Low">High-to-Low</option>
            <option value="Low-to-High">Low-to-High</option>
        </select>
    </div>
  )
}

export default SearchPageFilter
