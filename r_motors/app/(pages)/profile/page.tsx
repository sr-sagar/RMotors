import React from 'react'
import Image from 'next/image';
import Button from '@/components/(common)/button';
import ShoppingCard from '../../../components/features/profile/shoppingCard';
import MemberCard from '../../../components/features/profile/memberCard';
import CartCard from '../../../components/features/profile/cartCard';
import ProfileSettingsNavBar from '../../../components/features/profile/profileSettingsNavBar';

const Profile = () => {
  return (
    <section className='w-full min-h-[300px] p-4  flexClass flex-col  gap-y-4'>
      <section className='w-full min-h-[100px]  max-w-[90%] md:max-w-[80%] shadow-md border-md  p-4 flexClass flex-col gap-y-6 my-4 rounded-md'>

        <section className='w-full flex flex-col md:flex-row justify-center md:justify-around items-center gap-x-4 '>
          <div className='w-[80px] h-[80px] rounded-full shadow-md p-[2px]'>
            <Image src={"/beetImage.jpg"} alt='This the profile photo' width={60} height={60} className='w-full h-full object-fill object-[center_center] rounded-full'/>
          </div>
          <div className='w-full md:w-max flex justify-center items-center md:items-start flex-col gap-y-4'>
            <h3 className='text-md md:text-lg '>Alex Martin Luther</h3>
            <p className='text-small turncate md:text-md text-center md:text-start'>I am a tech industry expert that made this awasome website!</p>
            <p className='text-small turncate md:text-md text-center md:text-start'>India, Maharashtra   example@gmail.com</p>
          </div>
          <div className='w-[100px]  h-[50px] mt-4 md:mt-0 flexClass'>
            <Button btnText='Edit' btnWidth={100}/>
          </div>
        </section>
        <section className='w-full h-[110px] md:h-[100px]  flex justify-around items-center gap-x-2 md:gap-x-6'>
          <div className='w-full h-full p-1 '>
            <ShoppingCard />
          </div>
          <div className='w-full h-full p-1 '>
            <CartCard />
          </div>
          <div className='w-full h-full p-1 '>
            <MemberCard />
          </div>
        </section>
      </section>
      <section className='w-full min-h-[100px]  max-w-[90%] md:max-w-[80%] shadow-md border-md  p-4 flexClass flex-col rounded-md mb-4'>
        <div className='w-full'>
          <ProfileSettingsNavBar />
        </div>
      </section>



    </section>
  )
}

export default Profile
