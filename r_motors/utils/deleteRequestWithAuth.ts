"use server"
import { getCookies } from './getCookies';

export const deleteRequestWithAuth = async(url: string,data: object) => {
    const backend_url = process.env.BACKEND_URL!;

    const req = await fetch(`${backend_url!}/api/${url}`, {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${await getCookies("token")}`
            
        },
        body: JSON.stringify(data)
        
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

