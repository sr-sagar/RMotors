"use client"
import React, { useEffect, useState } from 'react'
import Logo from './logo'
import { useScreenSize } from '../context/ScreenSizeContext';
import Link from 'next/link';
import Button from './button';
import toast from 'react-hot-toast';
import useSWR from "swr"
const fetcher = async(url: string) => {
  const res = await fetch(url);
  if(!res.ok) toast.error("Failed to fetch token.");
  return res.json();

}

const Navbar = () => {
  const [showNavBar,setShowNavBar] = useState(false);
  const [activeTab,setActiveTab] = useState<"home" | "search" | "chats" | "orders" | "profile" | "admin" | undefined>()
  const { isMobile } = useScreenSize();

  

  useEffect(() => {
    const currentPage = location.href.split("/")[3]
    setActiveTab((currentPage as "home" | "search" | "chats" | "orders" | "profile" | "admin"))
  },[])
  

  const {error, data, } = useSWR("/api/session", fetcher, {revalidateOnFocus: true, dedupingInterval: 10000});
  
  useEffect(() => {
    if(error) toast.error("something went wrong while getting your details.")

  },[error])
  const token = data?.token;
  const userRole = data?.userRole;

  

  return (
    <div className='flexClass w-full h-[20%]  p-2 mb-2 p-2 shadow-md'>
      {isMobile? 
      <>
        <div className='w-[90%] h-full'>
          <Logo />
        </div>
        <div className='w-[10%%] h-full flex justify-center items-center  p-2'>
          <Button btnText={`${showNavBar? "Hide" : "Show"}`} btnWidth={100} onClickFunc={() => setShowNavBar(prev => !prev)}/>
        </div>
          {showNavBar&& (
            <div className='w-[40%] h-full bg-[#f5f5f7] flex flex-col space-y-2 transform transition z-100 absolute right-0 top-[10%]'>

              <ul className='w-full h-full flex flex-col justify-start items-center p-1 space-y-2'>
                <Link className='w-full' href={'/'}><li className={`navbarItems ${activeTab === "home"? "bg-[#0054FF] rounded-md p-1 text-white" : ""}`} onClick={() => {setActiveTab("home")}}>Home</li></Link>
                <Link className='w-full' href={'/search'}><li className={`navbarItems ${activeTab === "search"? "bg-[#0054FF] rounded-md p-1 text-white" : ""}`} onClick={() => {setActiveTab("search")}}>Search</li></Link>
                <Link className='w-full' href={'/chats'}><li className={`navbarItems ${activeTab === "chats"? "bg-[#0054FF] rounded-md p-1 text-white" : ""}`} onClick={() => {setActiveTab("chats")}}>Chats</li></Link>
                <Link className='w-full' href={'/orders'}><li className={`navbarItems ${activeTab === "orders"? "bg-[#0054FF] rounded-md p-1 text-white" : ""}`} onClick={() => {setActiveTab("orders")}}>Orders</li></Link>
                <Link className='w-full' href={'/profile'}><li className={`navbarItems ${activeTab === "profile"? "bg-[#0054FF] rounded-md p-1 text-white" : ""}`} onClick={() => {setActiveTab("profile")}}>Profile</li></Link>
                {userRole && userRole === "admin" && (
              
                  <Link href={"/admin"}><li className={`navbarItems ${activeTab === "admin"? "bg-[#0054FF] rounded-md p-1 text-white" : ""}`} onClick={() => {setActiveTab("admin")}}>Admin</li></Link>
                )
            
                }
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
          <ul className='min-w-[50%] h-full flex justify-between items-center md:gap-x-2 lg:gap-x-4'>
            <Link href={"/"}><li className={`navbarItems ${activeTab === "home"? "bg-[#0054FF] rounded-md p-2 text-white" : ""}`} onClick={() => {setActiveTab("home")}}>Home</li></Link>
            <Link href={"/search"}><li className={`navbarItems ${activeTab === "search"? "bg-[#0054FF] rounded-md p-2 text-white" : ""}`} onClick={() => {setActiveTab("search")}}>Search</li></Link>
            <Link href={"/chats"}><li className={`navbarItems ${activeTab === "chats"? "bg-[#0054FF] rounded-md p-2 text-white" : ""}`} onClick={() => {setActiveTab("chats")}}>Chats</li></Link>
            <Link href={"/orders"}><li className={`navbarItems ${activeTab === "orders"? "bg-[#0054FF] rounded-md p-2 text-white" : ""}`} onClick={() => {setActiveTab("orders")}}>Orders</li></Link>
            <Link href={"/profile"}><li className={`navbarItems ${activeTab === "profile"? "bg-[#0054FF] rounded-md p-2 text-white" : ""}`} onClick={() => {setActiveTab("profile")}}>Profile</li></Link>
            {userRole && userRole === "admin" && (
              
              <Link href={"/admin"}><li className={`navbarItems ${activeTab === "admin"? "bg-[#0054FF] rounded-md p-2 text-white" : ""}`} onClick={() => {setActiveTab("admin")}}>Admin</li></Link>
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
