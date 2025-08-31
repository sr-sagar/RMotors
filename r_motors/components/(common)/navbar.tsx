"use client"
import React, { useEffect, useState } from 'react'
import Logo from './logo'
import { useScreenSize } from '../context/ScreenSizeContext';
import Link from 'next/link';
import Button from './button';
import { getCookies } from '../../utils/getCookies';
const Navbar = () => {
  const [showNavBar,setShowNavBar] = useState(false);
  const [token,setToken] = useState<string | undefined>(undefined);
  const [userRole,setUserRole] = useState<string | undefined>(undefined);
  const { isMobile } = useScreenSize();

  const getCookieValues = async() => {
    const token = await getCookies("token");
    setToken(token);
    const userRole = await getCookies('userRole');
    setUserRole(userRole)

  }

  useEffect(() => {
    getCookieValues()

  },[token,userRole])
  return (
    <div className='flexClass w-full h-[20%]  p-2 mb-2 p-2'>
      {isMobile? 
      <>
        <div className='w-[90%] h-full'>
          <Logo />
        </div>
        <div className='w-[10%%] h-full flex justify-center items-center  p-2'>
          <Button btnText='Show' btnWidth={100} onClickFunc={() => setShowNavBar(prev => !prev)}/>
        </div>
          {showNavBar&& (
            <div className='w-[40%] h-full bg-gray-600 flex flex-col space-y-2 transform transition z-100 absolute right-0 top-[10%]'>

              <ul className='w-full h-full flex flex-col justify-start items-center p-1 space-y-2'>
                <Link className='w-full' href={'/'}><li className='navbarItems '>Home</li></Link>
                <Link className='w-full' href={'/search'}><li className='navbarItems'>Search</li></Link>
                <Link className='w-full' href={'/chats'}><li className='navbarItems'>Chats</li></Link>
                <Link className='w-full' href={'/orders'}><li className='navbarItems'>Orders</li></Link>
                <Link className='w-full' href={'/profile'}><li className='navbarItems'>Profile</li></Link>
              </ul>
            </div>
          )}

      </>
      :
      <>
        <div className='min-w-[30%] h-full'>
          <Logo />
        </div>
        <div className='min-w-[70%] h-full flex justify-between items-center   p-2'>
          <ul className='min-w-[50%] h-full flex justify-between items-center'>
            <Link href={"/"}><li className='navbarItems'>Home</li></Link>
            <Link href={"/search"}><li className='navbarItems'>Search</li></Link>
            <Link href={"/chats"}><li className='navbarItems'>Chats</li></Link>
            <Link href={"/orders"}><li className='navbarItems'>Orders</li></Link>
            <Link href={"/profile"}><li className='navbarItems'>Profile</li></Link>
            {userRole&& userRole === "admin" && (
              
              <Link href={"/admin"}><li className='navbarItems'>Admin</li></Link>
            )
            
            }
          </ul>
          {token === undefined &&

            <ul className='min-w-[20%] h-full flex justify-around items-center   p-2 gap-x-6'>
              <Link href={"/auth"}><li className='navbarItems '>SignIn</li></Link>
              <Link href={"/auth"}><li className='navbarItems bg-[#4a3aff] p-1 rounded-md text-white'>Login</li></Link>
            </ul>
          }
        </div>
      </>
    }

    </div>
  )
}

export default Navbar
