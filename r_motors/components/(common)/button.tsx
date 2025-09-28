"use client"
import React from 'react'


type Props = {
    btnText?: string,
    btnWidth?: number,
    className?: string,
    bgColor?: string,
    textColor?: string,
    onClickFunc?: (chat?: string) => void | Promise<void> ,
}
const Button = ({btnText = "Click",btnWidth,className,bgColor,textColor,onClickFunc}: Props) => {
  return (
        <button 
            className={`button h-[90%] rounded-md shadow-md active:scale-95 transition transform p-1 text-white flex justify-center items-center cursor-pointer ${className ?? ""}`} 
            style={{width: btnWidth? btnWidth + "%": "80%", backgroundColor: bgColor ?? undefined, color: textColor ?? undefined}}
            onClick={() => {onClickFunc?.()}}
        >{btnText}</button>
  )
}

export default Button