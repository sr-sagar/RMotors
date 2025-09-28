"use client"
import { devLogger } from './devLogger';
import { getBackendUrl } from './urlSetterForLoginAndSignupHelper';
export const postRequestForLoginAndSignup = async(data: object,url: string) => {
  const allowedLinks = [
    "http://localhost:3000",
    "rmotors-theta.vercel.app"
  ]

  const req = await fetch(`${await getBackendUrl()}/api/auth/loginAndSignupWrapper`, {
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

