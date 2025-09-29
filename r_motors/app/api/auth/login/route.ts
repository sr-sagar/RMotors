import { NextResponse } from "next/server";
import { loginMiddleware } from "../../../../Middleware/userMiddleware";
import { loginController } from '../../../../Controller/userController';
import { AnyError, getErrorMessage } from "@/utils/anySolver";


export const POST = async(req: Request) => {
    try{
        const {email,password} = await loginMiddleware(req);

        const result = await loginController(email,password);

        const isProd = process.env.NODE_ENV === "production"

        const res = NextResponse.json(result,{status: 200});
        res.cookies.set("token", result.token ?? "",{
                httpOnly: true,
                secure: isProd,
                sameSite: 'lax',
                path: "/",
                maxAge: 7 * 60 * 60,
            }

        );
        res.cookies.set("userEmail", email ?? "", {
           httpOnly: true,
           secure: isProd,
           sameSite: "lax",
           path: "/",
           maxAge: 7 * 60 * 60, 
        })
        res.cookies.set("userId", result.userId ?? "", {
            httpOnly: true,
            secure: isProd,
            sameSite: "lax",
            path: "/",
            maxAge: 7 * 60 * 60,
        })
        res.cookies.set("userRole", result.userRole ?? "", {
            httpOnly: true,
            secure: isProd,
            sameSite: "lax",
            path: "/",
            maxAge: 7 * 60 * 60,
        })
        res.cookies.set("userName", result.userName ?? "",{
            httpOnly: true,
            secure: isProd,
            sameSite: "lax",
            path: "/",
            maxAge: 7 * 60 * 60,
        })
        res.cookies.set("userPhoneNumber", result.userPhoneNumber ?? "",{
            httpOnly: true,
            secure: isProd,
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