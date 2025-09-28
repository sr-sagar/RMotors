"use client"
import toast  from 'react-hot-toast'
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

const ToastComponent = ({success,message,isNavigate,url}: {success: boolean, message: string, isNavigate?: boolean,url?: string}) => {
    const router = useRouter()
    useEffect(() => {

        if(success)
        {
            toast.success(message)
        }else{

            toast.error(message)
            isNavigate && url && router.replace(url)
        }
    },[success,message])
    
  return null;
}

export default ToastComponent