"use client"
import InputBox from '@/components/(common)/inputBox'
import { useStateContext } from '@/components/context/useStateContext'
import React, { useState } from 'react'
import Button from '@/components/(common)/button';



type profileArrayProps = {
    type: string,
    placeHolder: string,
    key: string,
    id: number,
}
type settingArrayProps = {
    title: string,
    desc: string,
    btnText: string,
    id: number,
}
const ProfileSettingsNavBar = () => {
    const {onSettings,setOnSettings} = useStateContext()
    const [inputvalue,setInputValue] = useState({
        name: "",
        email: "",
        phone: "",
        location: "",
        bio: "",
    })

    const handleInputValues = (key : string,val: string) => {
        setInputValue((prev) => ({...prev,  [key]: val}));
    }

    const profileArray: profileArrayProps[] = [
        {type: "text", placeHolder: "name",key: 'name', id: 1 },
        {type: "text", placeHolder: "email",key: 'email', id: 2 },
        {type: "text", placeHolder: "phone",key: 'phone', id: 3 },
        {type: "text", placeHolder: "location",key: 'location', id: 4 },
        {type: "text", placeHolder: "bio",key: 'bio', id: 5 },
    ]

    const settingsArray: settingArrayProps[] = [
        {title: "Security", desc: "Manage passwords and authentication.",btnText: "Update", id: 1},
        {title: "Delete Account", desc: "Permanently delete your account and data.",btnText: "Delete",id: 2}
    ]
  return (
    <div className='w-full h-full rounded-md flexClass flex-col '>
    {/* change this with the reusable one */}
      <ul className='w-full h-full flex justify-around items-center p-1 bg-gray-200 rounded-md'>
        <li className={`profileListItems ${onSettings? "bg-gray-200" : "bg-white"} `}  onClick={() => {setOnSettings(false)}}>Profile</li>
        <li className={`profileListItems ${onSettings? "bg-white" : "bg-gray-200" } `} onClick={() => {setOnSettings(true)}}>Settings</li>
      </ul>
      <div className='w-full mt-6  '>
        <h3 className=''>{onSettings?"Account Settings" : "Personal Information"}</h3>
        <p>{onSettings? "Manage your account preferences and security" :"Manage your account details and preferences"}</p>
        {onSettings ?
        
        <div className='w-full flexClass flex-col gap-y-4 mt-4'>
            {settingsArray.map((item) => (
                <div key={item.id} className='w-full h-max flex justify-between items-center shadow-md rounded-md p-1'>
                    <div className='flex flex-col justify-start items-start'>
                        <p className='text-md' style={{color: "black"}}>{item.title}</p>
                        <p className='text-sm'>{item.desc}</p>
                    </div>
                    <div>
                        <Button btnText={item.btnText} btnWidth={100} />
                    </div>
                </div>
            ))

            }
        </div>
        
        :
        <div className='grid grid-cols-2 w-full gap-x-2 gap-y-2 mt-2 justify-center items-center'>
            {profileArray.map((item) => (
                <div key={item.id} className='flex flex-col justify-between items-start last:col-span-2 w-full'>
                    <div className='w-full h-full flexClass'>
                        <p className='w-full  max-w-[300px]'>{item.key}</p>
                    </div>
                    <InputBox key={item.id} inputPlaceholder={item.placeHolder} inputType={item.type} inputWidth={100} value={inputvalue[item.key as keyof typeof inputvalue]} setValue={handleInputValues} name={item.key} className='last:col-span-2 '/>
                </div>
            ))

            }
        </div>
        }
      </div>
    </div>
  )
}

export default ProfileSettingsNavBar
