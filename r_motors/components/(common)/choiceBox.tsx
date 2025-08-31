"use client"
import React from 'react'
import { useChoiceBoxFilter } from '../context/choiceBoxFilters';
import Button from './button';


const ChoiceBox = () => {
    const {selectValue,setSelectValue,inputValue,setInputValue} = useChoiceBoxFilter();
  return (
    <div className='w-full h-full flex justify-center items-center gap-x-2 md:justify-around'>
        <select 
            name="choice" 
            value={selectValue} 
            onChange={(e) => setSelectValue(e.target.value)}
            className='w-[30%] h-[25px] rounded-md shadow-md bg-white text-center md:max-w-[20%]'
            
            >
            <option value="">Select an option</option>
            <option value="Buy">Buy</option>
            <option value="Sell">Sell</option>
        </select>
      <input 
        type="text" 
        value={inputValue} 
        onChange={(e) => setInputValue(e.target.value)}
        placeholder='What are you looking for?'
        className='w-[50%] h-[25px] rounded-md shadow-md bg-white p-1 md:max-w-[40%] lg:max-w-[25%] '
        />
      <div className='w-[20%] flex justify-center items-center'>
        <Button btnText='Search' btnWidth={100}/>
      </div>
    </div>
  )
}

export default ChoiceBox
