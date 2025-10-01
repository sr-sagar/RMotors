"use server"

import { getCookies } from "./getCookies";

export const getRequestWithAuth = async(url: string,isCache?: number ) => {
    const backend_url = process.env.BACKEND_URL!;

    const req = await fetch(`${backend_url!}/api/${url}`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            "Authorization":  `Bearer ${await getCookies("token")}`
        },
        next: {
          revalidate: isCache ?? false
        }
        
  });

  const res = await req.json();
  if(res.success)
  {

    return {res: res, status: req.status, success: res.success};
    
    
  }
  else{
    
    return {res: res,success: res.success};

    
  }
}

