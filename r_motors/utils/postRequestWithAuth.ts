"use server"
import { getCookies } from './getCookies';

export const postRequestWithAuth = async(url: string,data: object) => {
    const backend_url = process.env.BACKEND_URL!;

    const req = await fetch(`${backend_url!}/api/${url}`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${await getCookies("token")}`
            
        },
        body: JSON.stringify(data)
        
  });

  const res = await req.json();
  if(req.status === 200 || req.status === 201)
  {
    console.log(res)
    return {res: res, status: req.status};
  }
  else{
    throw new Error("Internal Server Error")
  }
}

