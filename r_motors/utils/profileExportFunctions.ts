import { deleteRequestWithAuth } from "./deleteRequestWithAuth";
import { getCookies } from "./getCookies";
import { serverAlert } from "./sweetAleart";
import { updateRequestWithAuth } from "./updateRequestWithAuth";

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