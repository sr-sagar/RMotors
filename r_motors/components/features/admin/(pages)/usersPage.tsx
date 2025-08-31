export const revalidate = 1;

import React from 'react'
import ReusableNavbarRenderingComponent from '../reusableNavbarRenderingComponent';
import { getRequestWithAuth } from '../../../../utils/getRequestWithAuth';
const UsersPage = async() => {
  const res = await getRequestWithAuth('admin/users')
  const getUser = res?.res?.users;
  
  const columns = [
    {header: "Name", key: "userName"},
    {header: "Email", key: "userEmail"},
    {header: "Role", key: "userRole"},
    {header: "Phone", key: "userPhoneNumber"},
    {header: "Actions", key: "Not Yet Know"},
  ]
  return <ReusableNavbarRenderingComponent data={getUser} column={columns}/>
  
}

export default UsersPage