"use client"
import React from 'react'
import { createContext,useContext } from 'react'
import {useState, useEffect} from 'react';

type ScreenContextType = {
    isMobile: boolean,
    width: number,
}
const ScreenSizeContext = createContext<ScreenContextType>({
    isMobile: false,
    width: 1024,
});

export const ScreenSizeContextProvider = ({children}: {children: React.ReactNode }) => {
    const [width,setWidth] = useState<number>(1024);
    const [isClient,setIsClient] = useState(false);
    useEffect(() => {
        const handleResize = () => setWidth(window.innerWidth);
        handleResize()
        window.addEventListener('resize', handleResize);
        setIsClient(true);

        return () => window.removeEventListener('resize', handleResize)
    },[])

    const isMobile = width < 768;

    if(!isClient) return null;
    return(
        <ScreenSizeContext.Provider value={{isMobile,width}}>
            {children}
        </ScreenSizeContext.Provider>
    )
}

export const useScreenSize = () => useContext(ScreenSizeContext)
