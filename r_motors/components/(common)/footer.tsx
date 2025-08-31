import Link from 'next/link'
import React from 'react'

const Footer = () => {
  return (
    <footer className='flexClass  relative w-full min-h-[100px]   gap-x-2 border- t-[0.1px] border-gray-200 p-2 '>
      <div className='w-full h-full flexClass text-sm'>
        <h2>RMotors</h2>

      </div>
        <ul className='flex flex-col justify-around items-center w-full h-full text-sm gap-1'>
            <Link href={"/"}><li className='listItems'>Home</li></Link>
            <Link href={"/search"}><li className='listItems'>Search</li></Link>
            <Link href={"/chats"}><li className='listItems'>Chats</li></Link>
            <Link href={"/profile"}><li className='listItems'>Profile</li></Link>
        </ul>
      <ul className='w-full h-full text-sm flexClass flex-col '>
        <li>+919890260000</li>
        <li>example@gmail.com</li>
        <li>Sharanpur road, rd circle, nashik.</li>
      </ul>
    </footer>
  )
}

export default Footer