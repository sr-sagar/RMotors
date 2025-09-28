"use client"
import React, { useRef } from 'react'

type InputBoxSingle = {
  inputType?: string,
  inputPlaceholder?: string,
  inputWidth?: number,
  inputMaxWidth?: number,
  value: string,
  setValue: (value: string) => void,
  name?: undefined,
  className?: string,
  isDisabled? : boolean,
}
type InputBoxMap = {
  inputType?: string,
  inputPlaceholder?: string,
  inputWidth?: number,
  inputMaxWidth?: number,
  value: string | number,
  name: string,
  setValue: (key: string ,val: string) => void,
  className?: string,
  isDisabled? : boolean
}
type InputBoxProp = InputBoxSingle | InputBoxMap
const InputBox = <T extends string>({inputType,inputPlaceholder,inputWidth,inputMaxWidth,value,setValue,name,className,isDisabled}: InputBoxProp) => {
  const ref = useRef<HTMLInputElement | null>(null);
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let newValue = e.target.value as T
    if(name !== undefined)
    { 
      setValue(name,newValue)
    }
    else{
      setValue(newValue)
    }
  }
  return (
    <div className={`w-full h-full flexClass  ${className? className : ""}`}>
      <input 
        className='p-1 rounded-md shadow-md h-[90%] border-black max-w-[300px] cursor-pointer'
        ref={ref}
        type={`${inputType || "text"}`} 
        placeholder={`${inputPlaceholder || "What are you looking for?"}`} 
        style={{width: `${inputWidth ?? 50}%`, maxWidth: `${inputMaxWidth ?? 300}px`}}
        value={value}
        onChange={handleChange}
        disabled={isDisabled?? false}
        
      />
    </div>
  )
}

export default InputBox
