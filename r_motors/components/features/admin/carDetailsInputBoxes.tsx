import InputBox from '@/components/(common)/inputBox'
import React from 'react'
import {useState} from 'react';

const CarDetailsInputBoxes = () => {
    const [carDetails,setCarDetails] = useState({
        carTitle: "",
        carPrice: "",
        carAvailability: "",
    })

    const handleCarDetails = (key: string, val: string) => {
        setCarDetails((prev) => ({...prev,[key]: val}));
    }

    const carInputBoxArray = [
        {title: "Car Title", placeHolder: "e.g, 2024 Telsa Model 3",key: "carTitle", id: 1},
        {title: "Price", placeHolder: "e.g, 45999",key: "carPrice", id: 2},
    ] 
  return (
    <div className='w-full min-h-[100px] flexClass flex-col gap-y-2'>
        {carInputBoxArray.map((item) => (
            <div key={item.id} className='w-full h-max flexClass flex-col'>
                <p>{item.title}</p>
                <InputBox inputPlaceholder={item.placeHolder} value={carDetails[item.key as keyof typeof carDetails]} setValue={handleCarDetails} name={item.key} inputWidth={100}/>
            </div>

        ))}
        <div className='w-full h-max flexClass flex-col'>
            <p>Availability</p>
            <select className='w-full max-w-[300px] h-max rounded-md shadow-md' value={carDetails["carAvailability" as keyof typeof carDetails]} onChange={(e) => {handleCarDetails("carAvailability",e.target.value)}}>
                <option value="Available">Available</option>
                <option value="Sold">Sold</option>
                <option value="Pending">Pending</option>
            </select>

        </div>

    </div>
  )
}

export default CarDetailsInputBoxes