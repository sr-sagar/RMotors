"use client"
export const postRequestForLoginAndSignup = async(data: object,url: string) => {
  const req = await fetch(`http://localhost:3000/api/auth/loginAndSignupWrapper`, {
    method: "POST",
    headers: {
        "Content-Type": "application/json",
    },
    body: JSON.stringify({data,url}),
  });

  const res = await req.json();
  if(req.status === 201 || req.status === 200)
  {
    console.log(res)
    return {res: res, status: req.status};
  }
  else{
    throw new Error(res.message)
  }
}

