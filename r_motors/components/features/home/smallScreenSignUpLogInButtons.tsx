"use client"
import React from 'react'
import Button from '../../(common)/button'
import { useScreenSize } from '../../context/ScreenSizeContext';
import { useRouter } from 'next/navigation';

const SmallScreenSignUpLogInButtons = ({btnText1,btnText2}: {btnText1?: string,btnText2?: string}) => {
    const {isMobile} = useScreenSize()
    const router = useRouter()
  return (
    <>
    {isMobile  && (
        
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
