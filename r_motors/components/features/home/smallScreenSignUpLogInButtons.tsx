"use client"
import React from 'react'
import Button from '../../(common)/button'
import { useScreenSize } from '../../context/ScreenSizeContext';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';
import useSWR from 'swr';
import { useEffect } from 'react';

const fetcher = async(url: string) => {
  const res = await fetch(url);
  if(!res.ok) toast.error("Failed to fetch token.");
  return res.json();

}
const SmallScreenSignUpLogInButtons = ({btnText1,btnText2}: {btnText1?: string,btnText2?: string}) => {
    const {isMobile} = useScreenSize()
    const router = useRouter()

    const {error, data} = useSWR("/api/session", fetcher, {revalidateOnFocus: true, dedupingInterval: 10000});
    useEffect(() => {
      if(error) toast.error("something went wrong.")
    },[error])
    const token = data?.token ?? undefined;
  return (
    <>
    {isMobile && token === undefined && (
        
        <div className='w-full h-full flex justify-center items-center py-2 gap-x-2 '>
        
                <Button btnText={`${btnText1 ?? "SignUp"}`} btnWidth={40} onClickFunc={() => {router.push("/auth")}}/>
                <Button btnText={`${btnText2 ?? "LogIn"}`} btnWidth={40} onClickFunc={() => {router.push("/auth")}}/>
        </div>
        )
    }
    </>
  )
}

export default SmallScreenSignUpLogInButtons
