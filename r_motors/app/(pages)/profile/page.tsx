"use server"
import React from 'react'
import Image from 'next/image';
import ShoppingCard from '../../../components/features/profile/shoppingCard';
import MemberCard from '../../../components/features/profile/memberCard';
import CartCard from '../../../components/features/profile/cartCard';
import ProfileSettingsNavBar from '../../../components/features/profile/profileSettingsNavBar';
import EditProfileButton from '../../../components/features/profile/editProfileButton';
import { updateRequestWithAuth } from '../../../utils/updateRequestWithAuth';
import { serverAlert } from '@/utils/sweetAleart';
import { getCookies } from '../../../utils/getCookies';
import { getRequestWithAuth } from '../../../utils/getRequestWithAuth';
import { deleteRequestWithAuth } from '../../../utils/deleteRequestWithAuth';


export const editUserDetailsFunction = async(data: {userName?: string,userEmail?: string,userPhoneNumber?:string,userLocation?: string,userBio?: string,userPassword?: string}) => {
  const userEmail = await getCookies("userEmail")
  const res = await updateRequestWithAuth("profile",{email: userEmail,data});
  if(res.success === false)
  {
    await serverAlert(
      "Failed",
      "unable to fetch user details.",
      true
    )
  }
}


export const deleteUserProfileFunction = async() => {
  const res = await deleteRequestWithAuth("profile" ,{});
  const deletedUser = res.res.data;
  return deletedUser;
}

const Profile = async() => {
  if(!(await getCookies("token"))){
    return(
      <div className='w-full h-max flexClass flex-col'>
        <Image src={"/profileImg.png"} height={300} width={400}  alt='this is the image that appers when user click on the profile while they are logged out.' className='object-[center_center] object-contain'/>
        <h3 className='text-md md:text-lg font-bold'>Please Login/Signup to view this page.</h3>
      </div>
    );
  }
  const res = await getRequestWithAuth("profile");
  const getUser = res.res.data;
  

  return (
  
    <section className='w-full min-h-[300px] p-4  flexClass flex-col  gap-y-4'>
      <section className='w-full min-h-[100px]  max-w-[90%] md:max-w-[80%] shadow-md border-md  p-4 flexClass flex-col gap-y-6 my-4 rounded-md'>

        <section className='w-full flex flex-col md:flex-row justify-center md:justify-around items-center gap-x-4 '>
          <div className='w-[80px] h-[80px] rounded-full shadow-md p-[2px]'>
            <Image src={"/profilePic.jpg"} alt='This the profile photo' width={60} height={60} className='w-full h-full object-fill object-[center_center] rounded-full'/>
          </div>
          <div className='w-full md:w-max flex justify-center items-center md:items-start flex-col gap-y-4'>
            <h3 className='text-md md:text-lg '>{getUser.userName ?? "User"}</h3>
            <p className='text-small turncate md:text-md text-center md:text-start'>{getUser.userBio !== ""? getUser.userBio : `Hey, I am ${getUser.userName}`}</p>
            <p className='text-small turncate md:text-md text-center md:text-start'>{getUser.userLocation??  "Your Country,"}   {getUser.userEmail ?? "something went wrong, please log back in."}</p>
          </div>
          <div className='w-[100px]  h-[50px] mt-4 md:mt-0 flexClass'>
            <EditProfileButton />
          </div>
        </section>
        <section className='w-full h-[110px] md:h-[100px]  flex justify-around items-center gap-x-2 md:gap-x-6'>
          <div className='w-full h-full p-1 '>
            <ShoppingCard orders={getUser._count.order ?? "0"}/>
          </div>
          <div className='w-full h-full p-1 '>
            <CartCard cart={getUser.cart ?? 0}/>
          </div>
          <div className='w-full h-full p-1 '>
            <MemberCard memberSince={getUser.createdAt.split("-")[0]}/>
          </div>
        </section>
      </section>
      <section className='w-full min-h-[100px]  max-w-[90%] md:max-w-[80%] shadow-md border-md  p-4 flexClass flex-col rounded-md mb-4'>
        <div className='w-full'>
          <ProfileSettingsNavBar initialValues={{
            userName: getUser.userName || "",
              userEmail: getUser.userEmail || "",
              userPhoneNumber: getUser.userPhoneNumber || "",
              userLocation: getUser.userLocation ??  "",
              userBio: getUser.userBio ?? "",
          }}/>
        </div>
      </section>
    </section>
  
  )
}

export default Profile
