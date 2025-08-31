"use server"

import { getCookies } from "./getCookies";

export const getRequestWithAuth = async(url: string) => {
    const backend_url = process.env.BACKEND_URL!;

    const req = await fetch(`${backend_url!}/api/${url}`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            "Authorization":  `Bearer ${await getCookies("token")}`
        },
  });

  const res = await req.json();
  if(req.status === 200)
  {

    // console.log(res)
    return {res: res, status: req.status};
  }
  else{
    throw new Error("Internal Server Error")
  }
}

