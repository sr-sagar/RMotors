"use client"
import InputBox from '@/components/(common)/inputBox'
import { useStateContext } from '@/components/context/useStateContext'
import React from 'react'
import Button from '@/components/(common)/button';
import { useEffect } from 'react';
import { confirmAction, serverAlert } from '../../../utils/sweetAleart';
import { clearAllCookies, deleteCookies } from '../../../utils/getCookies';
import Swal from 'sweetalert2';
import { useRouter } from 'next/navigation';
import { deleteUserProfileFunction, editUserDetailsFunction } from '@/utils/profileExportFunctions';
import { mutate } from 'swr';


type profileArrayProps = {
    type: string,
    placeHolder: string,
    key: string,
    label: string,
    id: number,
}
type settingArrayProps = {
    title: string,
    desc: string,
    btnText: string,
    id: number,
    func: () => Promise<void>,
}
const ProfileSettingsNavBar = ({initialValues}: {initialValues: {userName: string,userEmail: string,userPhoneNumber: string,userLocation: string,userBio: string}}) => {
    
    const router = useRouter()
    // this fetches the current values of the user and sets/shows them in the input feilds.
    useEffect(() => {

        setInputValue(initialValues)

    },[initialValues])
    const {onSettings,setOnSettings,isProfileEditing,inputvalue,setInputValue} = useStateContext()
    

    const handleInputValues = (key : string,val: string) => {
        setInputValue((prev) => ({...prev,  [key]: val}));
    }


    const handleDeleteUser = async() => {
        const confirm = await confirmAction(
            "Are You Sure?",
            "This will permanently delete you account.",
            "Delete",
            "Cancel",
        )

        if(confirm)
        {
            await deleteUserProfileFunction();
            await clearAllCookies()
            localStorage.removeItem("token");
            localStorage.removeItem("isLoggedIn");
            await serverAlert(
                "success",
                "account deleted successfully.",
                true,
            )
            window.location.href = "/";
        }
        else{
            await serverAlert(
                "canceled",
                "account was not deleted.",
                true,
            ) 
        }
    }


    const handleUpdateUserPassword = async() => {
        const confirm = await confirmAction(
            "Are You Sure?",
            "This will change you current password.",
            "Change",
            "Cancel",
        )

        if(confirm)
        {
            const {value: newPassword} = await Swal.fire({
                title: "Enter Your Password.",
                input: "password",
                inputPlaceholder: "Enter your new password",
                showCancelButton: true,
                confirmButtonText: "Change",
                cancelButtonText: "Cancel",
                preConfirm: (value) => {
                    if(!value)
                    {
                        Swal.showValidationMessage("Password cannot be empty.");
                        return false;
                    }
                    return value
                },
            })
            if(newPassword)
            {

                await editUserDetailsFunction({userPassword: newPassword});
                await serverAlert(
                    "success",
                    "password changed successfully.",
                    true,
                )
                router.refresh()
            }
            
        }
        else{
            await serverAlert(
                "canceled",
                "password was not changed.",
                true,
            ) 
        }
    }
    const handleUserLogout = async() => {
        const confirm = await confirmAction(
            "Are You Sure?",
            "This will log you out.",
            "Logout",
            "Cancel",
        )

        if(confirm)
        {            
            await clearAllCookies()
            localStorage.removeItem("token");
            mutate("/api/session", {token: null, userRole: null}, false)
            
            await serverAlert(
                "success",
                "logged-out successfully.",
                true,
            )
            location.href = "/"

            
        }
        else{
            await serverAlert(
                "canceled",
                "you are still logged-in.",
                true,
            ) 
        }
    }

    const profileArray: profileArrayProps[] = [
        {type: "text", placeHolder: "name",key: 'userName',label: "Name" , id: 1 },
        {type: "text", placeHolder: "email",key: 'userEmail',label: "Email" , id: 2 },
        {type: "text", placeHolder: "phone",key: 'userPhoneNumber',label: "Phone" , id: 3 },
        {type: "text", placeHolder: "edit this to enter a location",key: 'userLocation',label: "Location" , id: 4 },
        {type: "text", placeHolder: "edit this to enter a bio",key: 'userBio',label: "Bio" , id: 5 },
    ]

    const settingsArray: settingArrayProps[] = [
        {title: "Security", desc: "Manage passwords and authentication.",btnText: "Update", id: 1, func: handleUpdateUserPassword},
        {title: "Delete Account", desc: "Permanently delete your account and data.",btnText: "Delete",id: 2, func: handleDeleteUser},
        {title: "LogOut", desc: "Logout of your account, you can come back later.",btnText: "Logout", id: 3, func: handleUserLogout},
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
                        <Button btnText={item.btnText} btnWidth={100} onClickFunc={item.func}/>
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
                        <p className='w-full  max-w-[300px]'>{item.label}</p>
                    </div>
                    <InputBox key={item.id} inputPlaceholder={item.placeHolder} inputType={item.type} inputWidth={100} value={inputvalue[item.key as keyof typeof inputvalue]} setValue={handleInputValues} name={item.key} className='last:col-span-2 ' isDisabled={!isProfileEditing}/>
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
