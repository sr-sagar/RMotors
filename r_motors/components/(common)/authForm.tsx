"use client"
import React from 'react'
import { useStateContext } from '../context/useStateContext';
import InputBox from './inputBox';
import Button from './button';
import {useState} from 'react';
import { postRequestForLoginAndSignup } from '@/utils/postRequestForLoginAndSignup';
import { useRouter } from 'next/navigation';

type authType  = {
    type: string,
    placeHolder: string,
    key: string,
    id: number,
}
const AuthForm = () => {
    const router = useRouter()
    const {authLoginOrSignup,setAuthLoginOrSignup} = useStateContext();

    const [loginValue,setLoginValue] = useState({
        email: "",
        password: "",
    })
    const [signupValue,setSignupValue] = useState({
        email: "",
        userName: "",
        phoneNumber: "",
        password: "",
        confirmPassword: "",
    })

    const handleSetLoginValue = (key: string,value: string) => {
        setLoginValue((prev) => ({...prev, [key]: value}))
    }
    const handleSetSignupValue = (key: string,value: string) => {
        setSignupValue((prev) => ({...prev, [key]: value}))
    }
    
    const login: authType[] = [
        {type: "text", placeHolder: "Email", key: "email",id: 1},
        {type: "password", placeHolder: "Password", key: "password",id: 2},
    ]
    const signup: authType[] = [
        {type: "text", placeHolder: "Email", key: "email",id: 1},
        {type: "text", placeHolder: "User Name", key: "userName",id: 2},
        {type: "text", placeHolder: "Phone Number", key: "phoneNumber",id: 3},
        {type: "password", placeHolder: "Password", key: "password",id: 4},
        {type: "password", placeHolder: "Confirm Password", key: "confirmPassword",id: 5},
    ]

    const values = authLoginOrSignup ? loginValue : signupValue;
    const setValues = authLoginOrSignup? handleSetLoginValue : handleSetSignupValue;

    const handleLoginAndSignup = async(data: object, isLogin: boolean) => {
        const url = isLogin? "login" : "signup"
        const req = await postRequestForLoginAndSignup(data, url);
        if(req.status === 201 || req.status === 200)
        {
            console.log(`${url === "login"? "login successfull." : "signup successfull."}`)
            router.push("/");
            
        }
        
      }
      const handleBtnClick = () => {
        if(authLoginOrSignup)
        {
            const data = {
                email: loginValue.email,
                password: loginValue.password
            }
            handleLoginAndSignup(data, true)
        }
        else{
            const data = {
                email: signupValue.email,
                userName: signupValue.userName,
                phoneNumber: signupValue.phoneNumber,
                password: signupValue.password,
                confirmPassword: signupValue.confirmPassword,

            }
            handleLoginAndSignup(data, false)

        }
    }
  return (
    <div className='w-full h-full flexClass flex-col'>
        <h2 className='mb-6'>{authLoginOrSignup? "Login" : "SignUp"}</h2>
        <div className='w-full h-full flexClass flex-col gap-y-4 max-w-[350px]'>
            {(authLoginOrSignup? login : signup).map((item) => (
                <InputBox key={item.id} inputType={item.type}  inputPlaceholder={item.placeHolder} inputWidth={100} value={values[item.key as keyof typeof values]} setValue={setValues} name={item.key}/>
            ))
            }
            <div className=' w-full h-full mt-2 flexClass flex-col'>
                <Button btnText='Submit' btnWidth={100} onClickFunc={handleBtnClick}/>
                {authLoginOrSignup? 
                    <p>Don't have an account?<span onClick={() => setAuthLoginOrSignup(false)} className='text-blue-400'>SignUp</span></p>
                    :
                    <p>Have an account?<span onClick={() => setAuthLoginOrSignup(true)} className='text-blue-400'>LogIn</span></p>
                }
            </div>

        </div>
    </div>
  )
}

export default AuthForm
