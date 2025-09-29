"use client"
import React from 'react'
import { useStateContext } from '../context/useStateContext';
import InputBox from './inputBox';
import Button from './button';
import {useState} from 'react';
import toast from 'react-hot-toast';
import { AnyError, getErrorMessage } from '../../utils/anySolver';


type authType  = {
    type: string,
    placeHolder: string,
    key: string,
    label: string,
    id: number,
}
const AuthForm = () => {
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
        {type: "text", placeHolder: "Enter your email", key: "email",label: "Email",id: 1},
        {type: "password", placeHolder: "Enter your password", key: "password",label: "Password",id: 2},
    ]
    const signup: authType[] = [
        {type: "text", placeHolder: "Jhon Deo", key: "userName",label: "Username",id: 1},
        {type: "text", placeHolder: "Jhon@example.com", key: "email",label: "Email",id: 2},
        {type: "text", placeHolder: "+91 7890000000", key: "phoneNumber",label: "Phone Number",id: 3},
        {type: "password", placeHolder: "Create a strong password with atlest 6 characters", key: "password",label: "Password",id: 4},
        {type: "password", placeHolder: "Confirm your password", key: "confirmPassword",label: "Confirm Password",id: 5},
    ]

    const values = authLoginOrSignup ? loginValue : signupValue;
    const setValues = authLoginOrSignup? handleSetLoginValue : handleSetSignupValue;

    const handleLoginAndSignup = async(data: object, isLogin: boolean) => {
        try{
            
            const url = isLogin? "/api/auth/login" : "/api/auth/signup"
            const res = await fetch(url, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(data),
                credentials: "include",
            });
            const result = await res.json()
            if(!res.ok)
            {
                return toast.error(result.message || "Something went wrong", {
                    duration: 3000,
                    position: "top-center",
                })
                
            }
            
            const message = url === "/api/auth/login"? "login successfull." : "signup successfull."
            toast.success(message, {
                duration: 3000,
                position: "top-center",
            })
            location.replace("/")
        }catch(error: AnyError)
        {
            toast.error(getErrorMessage(error) || "Something went wrong", {duration: 3000, position: "top-center"})
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
    <div className='w-full h-full flexClass flex-col p-4'>
        <h2 className='mb-2'>{authLoginOrSignup? "Welcome back" : "Create account"}</h2>
        <p className='mb-6 text-center'>{authLoginOrSignup? "Sign in to your account to continue" : "Join us to find your perfect car"}</p>
        <div className='w-full h-full flexClass flex-col gap-y-4 max-w-[350px]'>
            {(authLoginOrSignup? login : signup).map((item) => (
                <div key={item.id} className='space-y-2 w-full'>

                    <p>{item.label}</p>
                    <InputBox key={item.id} inputType={item.type}  inputPlaceholder={item.placeHolder} inputWidth={100} value={values[item.key as keyof typeof values]} setValue={setValues} name={item.key} inputMaxWidth={400}/>
                </div>
            ))
            }
            <div className=' w-full h-full mt-2 flexClass flex-col gap-y-2'>
                <Button btnText={authLoginOrSignup? "Sign In" : "Create Account"} btnWidth={100} onClickFunc={handleBtnClick} />
                {authLoginOrSignup? 
                    <p className='cursor-pointer'>Don&apos;t have an account?<span onClick={() => setAuthLoginOrSignup(false)} className='text-blue-400'>SignUp</span></p>
                    :
                    <p className='cursor-pointer'>Have an account?<span onClick={() => setAuthLoginOrSignup(true)} className='text-blue-400'>LogIn</span></p>
                }
            </div>

        </div>
    </div>
  )
}

export default AuthForm