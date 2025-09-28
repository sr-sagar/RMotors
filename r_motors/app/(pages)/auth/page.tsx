import React from 'react'
import AuthForm from '@/components/(common)/authForm';



const LogInAndSignUpPage = () => {
  
  return (
    <section className='w-full p-2 flexClass mt-4 mb-6'>
        <div className='flexClass w-[400px] min-h-[450px] p-2 mt-4 rounded-md shadow-sm  border-1 border-gray-200'>
          <div className='w-full h-full flexClass p-4 md:p-0'>
            <AuthForm  />            
          </div>
        </div>
    </section>
  )
}

export default LogInAndSignUpPage
