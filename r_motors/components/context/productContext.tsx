"use client"
import { createContext, useContext } from 'react';
import { CarsDataProps } from '../features/search/searchPageFilter';
import React from 'react';
import {useState} from 'react';

type ProductContextProps = {
    products: CarsDataProps[],
    setProducts: React.Dispatch<React.SetStateAction<CarsDataProps[]>>
}

const Context = createContext<ProductContextProps | undefined>(undefined)


export const ProductContextProvider = ({children,getProducts}: {children: React.ReactNode, getProducts: CarsDataProps[]}) => {

    const [products,setProducts] = useState<CarsDataProps[]>(getProducts)

    return(
        <Context.Provider value={{
            products,
            setProducts,
        }}
        
        >
            {children}
        </Context.Provider>
    )
}

export const useProductContext = () => {
    const context = useContext(Context)
    if(!context){
        throw new Error("Use context within provider.");
    }
    return context;
}