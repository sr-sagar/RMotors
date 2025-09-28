export const revalidate = 1;

import React from 'react'
import ReusableNavbarRenderingComponent from '../reusableNavbarRenderingComponent';
import { getRequestWithAuth } from '../../../../utils/getRequestWithAuth';
import ReusableActionComponent from '../reusableActionComponent';
import { getCookies } from '@/utils/getCookies';
import { serverAlert } from '@/utils/sweetAleart';
import { deleteRequestWithAuth } from '@/utils/deleteRequestWithAuth';
import { updateRequestWithAuth } from '@/utils/updateRequestWithAuth';
import StatusChangeComponent from '../statusChangeComponent';


export const deleteUserFunction = async(userId: string) => {
  const userEmail = await getCookies("userEmail");
  const res = await deleteRequestWithAuth("admin/users", {userEmail,userId});
  if(res.success)
  {
    serverAlert(
      "success",
      "user deleted successfully.",
      true
    )
  }
  else{
    serverAlert(
      "Failed",
      "unable to deleted user.",
      true
    )
    
  }
}
export const editUserFunction = async(userId: string,newUserRole: string) => {
  const userEmail = await getCookies("userEmail");
  const res = await updateRequestWithAuth("admin/users", {userEmail,userId,newUserRole});
  if(res.success)
  {
    serverAlert(
      "success",
      "user updated successfully.",
      true
    )
    return {success: true}

  }
  else{
    serverAlert(
      "Failed",
      "unable to update user.",
      true
    )
    return {success: false}

    
  }
}

const UsersPage = async() => {
  const res = await getRequestWithAuth('admin/users')
  const getUser = res.res.data;
  
  const columns = [
    {header: "Name", key: "userName"},
    {header: "Email", key: "userEmail"},
    {header: "Role", key: "userRole", render: (data: {userRole: string,id: string}) => <StatusChangeComponent data={data}/>},
    {header: "Phone", key: "userPhoneNumber"},
    {header: "Actions", key: "Not Yet Know", render: (data: {id: string}) => <ReusableActionComponent data={data} callingComponentName='user' isEdit={false}/>},
  ]
  return <ReusableNavbarRenderingComponent data={getUser} column={columns} success={res.success} message={res.res.message}/>
  
}

export default UsersPage