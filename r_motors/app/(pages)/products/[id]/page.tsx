import React from 'react'
import Image from 'next/image';
import Button from '@/components/(common)/button';


const productsPage = () => {
  return (
    <section className='w-full min-h-[450px] shadow-md rounded-md space-y-6 p-2'>
        <section className='flexClass shadow-md max-w-md '>
            <Image src={"/beetImage.jpg"}  priority height="768" width='1024'  alt={"N/A"} />
        </section>
        <section className='shadow-md rounded-md flex justify-center items-start flex-col gap-y-2 mt-2 p-2'>
            <p>Title: Beet 2015 Model</p>
            <p className="turncate">Description: Red Color, 15000 Km driven, in good condition.</p>
            <p className="turncate">Price: 120000Rs</p>
            <p className="turncate">Status: Available.</p>
        </section>
        <section className='gap-y-2 flexClass flex-col mb-4'>
            <Button btnText='Add to cart' btnWidth={40}/>
            <Button btnText='Buy' btnWidth={40}/>
        </section>
    </section>
  )
}

export default productsPage
