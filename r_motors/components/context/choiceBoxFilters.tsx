"use client"
import React from 'react'
import { useState,useContext,createContext} from 'react';

type useChoiceBoxFilterContextType = {
    selectValue: string,
    setSelectValue: React.Dispatch<React.SetStateAction<string>>;
    inputValue: string,
    setInputValue: React.Dispatch<React.SetStateAction<string>>;
}
const ChoiceBoxFilterContext = createContext<useChoiceBoxFilterContextType | undefined>(undefined);
export const ChoiceBoxFilterProvider = ({children}: {children: React.ReactNode}) => {
    const [selectValue,setSelectValue] = useState<string>("");
    const [inputValue,setInputValue] = useState<string>("");
  return (
    <ChoiceBoxFilterContext.Provider value={{selectValue,setSelectValue,inputValue,setInputValue}}>
      {children}
    </ChoiceBoxFilterContext.Provider>
  )
}

export const useChoiceBoxFilter = () => {
    const context = useContext(ChoiceBoxFilterContext);
    if(!context)
    {
        throw new Error("useChoiceBoxFilter inside ChoiceBoxFilterProvider.")
    }
    return context;
};
