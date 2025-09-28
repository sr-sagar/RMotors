import { updateUserDetailsMiddleware,getUserMiddleware, deleteUserProfileMiddleware } from "@/Middleware/userMiddleware"
import { updateUserDetailsController,getUserController, deleteUserProfileController } from '../../../Controller/userController';
import { NextResponse } from 'next/server';



export const GET = async(req: Request) => {
    try{

        const {userEmail} = await getUserMiddleware(req);
        const result = await getUserController(userEmail)
        return NextResponse.json(result,{status: result.status});
    }catch(error: any)
    {
        return NextResponse.json({message: error.message},{status: 500});
        
    }
}

export const PATCH = async(req: Request) => {
    try{

        const {email,data} = await updateUserDetailsMiddleware(req);
        const result = await updateUserDetailsController(email,data);
        return NextResponse.json(result, {status: result.status});
    }catch(error: any)
    {
        return NextResponse.json({message: error.message}, {status: 500})
    }
    
}


export const DELETE = async(req: Request) => {
    try{
        
        const {userEmail} = await deleteUserProfileMiddleware(req);
        const result = await deleteUserProfileController(userEmail);
        return NextResponse.json(result, {status: result.status});
    }catch(error: any)
    {
        return NextResponse.json({message: error.message}, {status: 500})
    }
        
}

