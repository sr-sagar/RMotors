import React from 'react'
import AuthForm from '@/components/(common)/authForm';
import { postRequestForLoginAndSignup } from '../../../utils/postRequestForLoginAndSignup';


const LogInAndSignUpPage = () => {
  
  return (
    <section className='w-full p-2 flexClass mt-4 mb-6'>
        <div className='flexClass w-[80%] min-h-[450px] p-2 rounded-md shadow-md '>
          <div className='w-full h-full flexClass'>
            <AuthForm  />            
          </div>
        </div>
    </section>
  )
}

export default LogInAndSignUpPage
