"use server"

import { getCookies } from '../../../../utils/getCookies';
import { devLogger } from '../../../../utils/devLogger';

export const addCarAction = async(data: FormData) => {
    const userEmail = await getCookies("userEmail")
    data.append("userEmail", userEmail!);
    const req = await fetch(`${process.env.BACKEND_URL}/api/admin/products`, {
        method: "POST",
        headers: {
            "Authorization": `Bearer ${await getCookies("token")}`
        },
        body: data,
    })

    const res = await req.json();
    if(res.success)
    {
        devLogger(res)
        return {res: res, status: req.status, success: res.success};

    }
    else{
        return {res: res, success: res.success};
    }
}