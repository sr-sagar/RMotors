"use client"
import Button from '@/components/(common)/button'
import { Car } from 'lucide-react'
import React, { useState } from 'react'
import DragAndDropComponent from '../dragAndDropComponent';
import CarDetailsInputBoxes from '../carDetailsInputBoxes';
import { addCarAction } from '../serverActions/addCarServerAction';


const AddCarsPage = () => {
    const [carDetails,setCarDetails] = useState({
        carTitle: "",
        carPrice: "",
        carCost: "",
        carAvailability: "",
        carCategory: "",
        carLocation: "",
        carYear: "",
        carTransmission: "",
        carTotalMiles: "",
        carPriceBeforeDiscount: "",
    })

    const [carDesc,setCarDesc] = useState("");

    const [files,setFiles] = useState<File[]>([])
    
    const handleUpload = () => {
        const formData = new FormData();
        formData.append("carTitle", carDetails.carTitle);
        formData.append("carDescription", carDesc);
        formData.append("carPrice", carDetails.carPrice);
        formData.append("carCost", carDetails.carCost);
        formData.append("carAvailability", carDetails.carAvailability);
        formData.append("carCategory", carDetails.carCategory)
        formData.append("carLocation", carDetails.carLocation)
        formData.append("carYear", carDetails.carYear)
        formData.append("carTransmission", carDetails.carTransmission)
        formData.append("carTotalMiles", carDetails.carTotalMiles)
        formData.append("carPriceBeforeDiscount", carDetails.carPriceBeforeDiscount)
        files.forEach((item) => {
            formData.append("files", item)
        })

        addCarAction(formData)

    }
  return (
    <section className='w-full  h-max shadow-md rounded-md p-4 gap-y-4 grid  md:grid-cols-2'>
        <div className='flex flex-col justify-center items-start w-full h-max col-span-full'>
            <Car />
            <h3>Add New Car</h3>
            <p>Add a new car to your inventory</p>
        </div>
        <div className='w-full h-max flex justify-center md:justify-between items-center flex-col md:flex-row col-span-full gap-y-4 md:gap-x-2'>
            <DragAndDropComponent files={files} setFiles={setFiles} handleUpload={handleUpload}/>
            <CarDetailsInputBoxes carDetails={carDetails} setCarDetails={setCarDetails}/>
        </div>
        <div className='w-full h-max flex justify-center items-start flex-col gap-y-2 col-span-full'>
            <p>Description</p>
            <input type="text" placeholder='Enter detailed description of the car...' className='w-full min-h-[100px] p-1 border-1 border-gray-200 active:border-blue-400 rounded-md' value={carDesc} onChange={(e) => {setCarDesc(e.target.value)}}/>
        </div>
        <div className='w-full h-max flex justify-center md:justify-end items-center  col-span-full'>
            <div className='w-full md:h-max md:w-1/3 flexClass gap-x-2'>
                <Button btnText='Cancel' btnWidth={100}/> 
                <Button btnText='Add Car' onClickFunc={() => {handleUpload()}} btnWidth={100}/> 
            </div>
        </div>
      
    </section>
  )
}

export default AddCarsPage  
