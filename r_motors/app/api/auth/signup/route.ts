import { NextResponse } from "next/server"
import { signupMiddleware } from '../../../../Middleware/userMiddleware';
import { signupController } from '../../../../Controller/userController';
import { AnyError, getErrorMessage } from "@/utils/anySolver";

export const POST = async(req: Request) => {
    try{
        const {email,userName,phoneNumber,password} = await signupMiddleware(req);
        const result = await signupController(email,userName,phoneNumber,password);


        const res = NextResponse.json(result, {status: 201})
        res.cookies.set("token",result.token ?? "",{
                httpOnly: true,
                secure: false,
                sameSite: "lax",
                path: "/",
                maxAge: 7 * 60 * 60,
            }

        );

        res.cookies.set("userEmail", email ?? "", {
            httpOnly: true,
            secure: true,
            sameSite: "lax",
            path: "/",
            maxAge: 7 * 60 * 60,
        })

        res.cookies.set("userId", result.userId ?? "", {
            httpOnly: true,
            secure: true,
            sameSite: "lax",
            path: "/",
            maxAge: 7 * 60 * 60,
        })
        res.cookies.set("userRole", result.userRole ?? "", {
            httpOnly: true,
            secure: true,
            sameSite: "lax",
            path: "/",
            maxAge: 7 * 60 * 60,
        })
        res.cookies.set("userName", userName ?? "",{
            httpOnly: true,
            secure: true,
            sameSite: "lax",
            path: "/",
            maxAge: 7 * 60 * 60,
        })
        res.cookies.set("userPhoneNumber", phoneNumber ?? "",{
            httpOnly: true,
            secure: true,
            sameSite: "lax",
            path: "/",
            maxAge: 7 * 60 * 60,
        })
        return res;
        
    }catch(error: AnyError)
    {
        return NextResponse.json({message: getErrorMessage(error)}, {status: 500});
    }
} 
