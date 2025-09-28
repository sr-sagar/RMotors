import { NextResponse } from "next/server";
import { loginMiddleware } from "../../../../Middleware/userMiddleware";
import { loginController } from '../../../../Controller/userController';


export const POST = async(req: Request) => {
    try{
        const {email,password} = await loginMiddleware(req);

        const result = await loginController(email,password);


        const res = NextResponse.json(result,{status: 200});
        res.cookies.set("token", result.token ?? "",{
                httpOnly: true,
                secure: false,
                sameSite: 'lax',
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
        res.cookies.set("userName", result.userName ?? "",{
            httpOnly: true,
            secure: true,
            sameSite: "lax",
            path: "/",
            maxAge: 7 * 60 * 60,
        })
        res.cookies.set("userPhoneNumber", result.userPhoneNumber ?? "",{
            httpOnly: true,
            secure: true,
            sameSite: "lax",
            path: "/",
            maxAge: 7 * 60 * 60,
        })

        return res;
    }catch(error: any)
    {
        return NextResponse.json({message: error.message},{ status: 500 })

    }

}