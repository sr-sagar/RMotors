"use client"
import Button from '@/components/(common)/button'
import React from 'react'
import { useStateContext } from '../../context/useStateContext';
import { confirmAction, serverAlert } from '../../../utils/sweetAleart';
import { getCookies } from '@/utils/getCookies';
import { useRouter } from 'next/navigation';
import { clearAllCookies } from '../../../utils/getCookies';
import { editUserDetailsFunction } from '@/utils/profileExportFunctions';
import { mutate } from 'swr';
const EditProfileButton = () => {
    const {isProfileEditing,setIsProfileEditing,inputvalue,setInputValue} = useStateContext();
    const router = useRouter()
    const handleUpdateUserDetails = async() => {
        const userEmail = await getCookies("userEmail")
        const userName = await getCookies("userName")
        const userPhoneNumber = await getCookies("userPhoneNumber")
        const currentValues = {
            userName,
            userEmail,
            userPhoneNumber,
        }
        const newInputValues = Object.fromEntries(
            Object.entries(inputvalue).filter(([key,val]) => val && val !== currentValues[key as keyof typeof currentValues])
        );

        if(Object.keys(newInputValues).length === 0)
        {
            await serverAlert("No Change", "No account details were changed.", true)
            return;
        }

        const confirm = await confirmAction(
            "Are You Sure?",
            "This will change your account details.",
            "Confirm",
            "Cancel",
        )
        if(confirm)
        {
            await editUserDetailsFunction(newInputValues)
            if(Object.keys(newInputValues).includes("userEmail"))
            {

                localStorage.removeItem("token");
                localStorage.removeItem("isLoggedIn");

                await clearAllCookies()
                mutate("/api/session", {token: null, userRole: null}, false)
                
                window.location.href = "/auth";
                await serverAlert(
                    "You were loggedout",
                    "you need to login again because you changed your email.",
                    true,
                )
            }
            await serverAlert(
                "Success",
                "Account details changed successfully.",
                true
                )
            
            
            setIsProfileEditing(false)
            router.refresh()
        }
        else{
            await serverAlert(
                "Canceled",
                "Account details not changed.",
                true
                )
            }
    }


    const handleBtnClick = () => {
        if(isProfileEditing)
        {
            handleUpdateUserDetails()
        }
        else{
            setIsProfileEditing(true)
        }
    }


  return (
    <div className='w-full h-full flexClass'>
        <Button btnText={`${isProfileEditing? "Save" :"Edit"}`} btnWidth={100} onClickFunc={handleBtnClick}/>
    </div>
  )
}

export default EditProfileButton
