"use client"
import React from 'react'
import InputBox from '../../(common)/inputBox'
import {useState} from 'react';
import { getRequest } from '../../../utils/getRequest';

const SearchPageFilter = () => {
    const [searchValue,setSearchValue] = useState<string>('')
    const [selectValue,setSelectValue] = useState<string>('')

    
  return (
    <div className='w-full h-max flexClass p-4 gap-x-2'>
        <input type="text" className='w-full h-max rounded-md border-1 border-gray-200 p-1 ' placeholder='Search for cars, by make, model, or category...' value={searchValue} onChange={(e) => {setSearchValue(e.target.value)}}/>
        <select className='w-1/3 h-max p-1 rounded-md border-1 border-gray-200 transition transform smooth' value={selectValue} onChange={(e) => {setSelectValue(e.target.value)}}>
            <option value="Relavence">Relavence</option>
            <option value="High-to-Low">High-to-Low</option>
            <option value="Low-to-High">Low-to-High</option>
            <option value="Highest Rated">Highest Rated</option>
        </select>
    </div>
  )
}

export default SearchPageFilter
