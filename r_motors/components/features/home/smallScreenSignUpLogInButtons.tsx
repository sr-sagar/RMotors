"use client"
import React from 'react'
import Button from '../../(common)/button'
import { useScreenSize } from '../../context/ScreenSizeContext';

const SmallScreenSignUpLogInButtons = () => {
    const {isMobile} = useScreenSize()
  return (
    <>
    {isMobile  && (
        
        <div className='w-full h-full flex justify-center items-center py-2 gap-x-2 '>
        
                <Button btnText='SignUp' btnWidth={40}/>
                <Button btnText='LogIn' btnWidth={40}/>
        </div>
        )
    }
    </>
  )
}

export default SmallScreenSignUpLogInButtons
