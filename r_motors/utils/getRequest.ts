"use server"
import { devLogger } from './devLogger';

export const getRequest = async(url: string) => {
    const backend_url = process.env.BACKEND_URL!;

    const req = await fetch(`${backend_url!}/api/${url}`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        },
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

