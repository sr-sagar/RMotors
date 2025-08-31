"use client"
import React from 'react'
import { useContext,createContext } from 'react'
import {useState} from 'react';
import { handleChatProps } from '../../utils/messageFetcher';

type contextType = {
    authLoginOrSignup: boolean,
    setAuthLoginOrSignup: React.Dispatch<React.SetStateAction<boolean>>,
    messageOwnerId: string,
    setMessageOwnerId: React.Dispatch<React.SetStateAction<string>>
    messageReceiverId: string,
    setMessageReceiverId: React.Dispatch<React.SetStateAction<string>>
    chatRoomId: string,
    setChatRoomId: React.Dispatch<React.SetStateAction<string>>
    msg: handleChatProps[],
    setMsg: React.Dispatch<React.SetStateAction<handleChatProps[]>>
    onSettings: boolean,
    setOnSettings: React.Dispatch<React.SetStateAction<boolean>>
    activeTab: string,
    setActiveTab: React.Dispatch<React.SetStateAction<string>>

}
const StateVariableContext = createContext<contextType | undefined>(undefined);

export const StateContextProvider = ({children}: {children: React.ReactNode}) => {
    const [authLoginOrSignup,setAuthLoginOrSignup] = useState(false)
    const [messageOwnerId,setMessageOwnerId] = useState("")
    const [messageReceiverId,setMessageReceiverId] = useState("")
    const [chatRoomId,setChatRoomId] = useState("")
    const [msg,setMsg] = useState<handleChatProps[]>([])
    const [onSettings,setOnSettings] = useState(false)
    const [activeTab,setActiveTab] = useState("")
    return (
    <StateVariableContext.Provider value={{authLoginOrSignup,setAuthLoginOrSignup, messageOwnerId,setMessageOwnerId,messageReceiverId,setMessageReceiverId,chatRoomId,setChatRoomId,msg,setMsg,onSettings,setOnSettings,activeTab,setActiveTab}}>
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

