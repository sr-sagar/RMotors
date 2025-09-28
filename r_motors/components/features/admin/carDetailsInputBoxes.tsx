import InputBox from '@/components/(common)/inputBox'
import React from 'react'

type CarDetails = {
    carTitle: string,
    carPrice: string,
    carCost: string,
    carAvailability: string,
    carCategory: string,
    carLocation: string,
    carYear: string,
    carTransmission: string,
    carTotalMiles: string,
    carPriceBeforeDiscount: string
}
const CarDetailsInputBoxes = ({carDetails,setCarDetails}: {carDetails: CarDetails, setCarDetails: React.Dispatch<React.SetStateAction<CarDetails>>}) => {
    

    const handleCarDetails = (key: string, val: string) => {
        setCarDetails((prev) => ({...prev,[key]: val}));
    }

    const carInputBoxArray = [
        {title: "Car Title", placeHolder: "e.g, 2024 Telsa Model 3",key: "carTitle", id: 1, type: "text"},
        {title: "Price", placeHolder: "e.g, 45999",key: "carPrice", id: 2, type: "text"},
        {title: "Car Cost", placeHolder: "e.g, 45999",key: "carCost", id: 3, type: "text"},
        {title: "Car Price before discount", placeHolder: "e.g, 55999",key: "carPriceBeforeDiscount", id: 4, type: "text"},
        {title: "Car Year", placeHolder: "e.g, 2013",key: "carYear", id: 5, type: "text"},
        {title: "Car Location", placeHolder: "e.g, Nashik, MAH",key: "carLocation", id: 6, type: "text"},
        {title: "Car Total Miles", placeHolder: "e.g, 1000",key: "carTotalMiles", id: 7, type: "text"},
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
            <p>Categoty</p>
            <select className='w-full max-w-[300px] h-max rounded-md shadow-md' value={carDetails["carCategory" as keyof typeof carDetails]} onChange={(e) => {handleCarDetails("carCategory",e.target.value)}}>
                <option value="Petrol">Petrol</option>
                <option value="Diesel">Diesel</option>
                <option value="Electric">Electric</option>
                <option value="Hybrid">Hybrid</option>
            </select>
            <p>Transmission</p>
            <select className='w-full max-w-[300px] h-max rounded-md shadow-md' value={carDetails["carTransmission" as keyof typeof carDetails]} onChange={(e) => {handleCarDetails("carTransmission",e.target.value)}}>
                <option value="Automatic">Automatic</option>
                <option value="Manual">Manual</option>
                <option value="Hybrid">Hybrid</option>
            </select>

        </div>

    </div>
  )
}

export default CarDetailsInputBoxes