"use client"
import React from 'react'
import { useContext,createContext } from 'react'
import {useState} from 'react';
import { NormalizedChatProp } from '../../utils/messageFetcher';
import { CarsDataProps } from '../features/search/searchPageFilter';
import { string } from 'joi';

type profileInputValueTypeProps = {
    userName: string,
    userEmail: string,
    userPhoneNumber: string,
    userLocation: string,
    userBio: string
}

type UnreadCountProps = {
    roomId: string,
}

type contextType = {
    authLoginOrSignup: boolean,
    setAuthLoginOrSignup: React.Dispatch<React.SetStateAction<boolean>>,
    chatRoomId: string,
    setChatRoomId: React.Dispatch<React.SetStateAction<string>>
    msg: NormalizedChatProp[],
    setMsg: React.Dispatch<React.SetStateAction<NormalizedChatProp[]>>
    onSettings: boolean,
    setOnSettings: React.Dispatch<React.SetStateAction<boolean>>
    activeTab: string,
    setActiveTab: React.Dispatch<React.SetStateAction<string>>,
    isProfileEditing: boolean,
    setIsProfileEditing: React.Dispatch<React.SetStateAction<boolean>>,
    inputvalue: profileInputValueTypeProps,
    setInputValue: React.Dispatch<React.SetStateAction<profileInputValueTypeProps>>
}
const StateVariableContext = createContext<contextType | undefined>(undefined);

export const StateContextProvider = ({children}: {children: React.ReactNode}) => {
    const [authLoginOrSignup,setAuthLoginOrSignup] = useState(false)
    const [chatRoomId,setChatRoomId] = useState("")
    const [msg,setMsg] = useState<NormalizedChatProp[]>([])
    const [onSettings,setOnSettings] = useState(false)
    const [activeTab,setActiveTab] = useState("")
    const [isProfileEditing,setIsProfileEditing] = useState(false)
    const [inputvalue,setInputValue] = useState({
        userName: "",
        userEmail: "",
        userPhoneNumber: "",
        userLocation: "",
        userBio: "",
    })

    

    return (
    <StateVariableContext.Provider value={{
        authLoginOrSignup,
        setAuthLoginOrSignup, 
        chatRoomId,
        setChatRoomId,
        msg,
        setMsg,
        onSettings,
        setOnSettings,
        activeTab,
        setActiveTab,
        isProfileEditing,
        setIsProfileEditing,
        inputvalue,
        setInputValue,
    }}>
        {children}
    </StateVariableContext.Provider>
  )
}

export const useStateContext = () => {
    const context = useContext(StateVariableContext)
    if(!context){
        throw new Error("use useStateContext inside StateContextProvider");
    }
    return context;
}

