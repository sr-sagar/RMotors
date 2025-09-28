"use client"
import { devLogger } from './devLogger';
export const postRequestForLoginAndSignup = async(data: object,url: string) => {
  const req = await fetch(`http://localhost:3000/api/auth/loginAndSignupWrapper`, {
    method: "POST",
    headers: {
        "Content-Type": "application/json",
    },
    body: JSON.stringify({data,url}),
  });

  const res = await req.json();
  if(res.success)
  {
    devLogger(res)
    return {res: res, status: req.status, success: res.success};
  }
  else{
    return {res: res,success: res.success};

    
  }
}

