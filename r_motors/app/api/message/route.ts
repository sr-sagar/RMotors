import { NextResponse } from 'next/server';
import { messageMiddleware } from '../../../Middleware/userMiddleware';
import { messageController, messageGetController } from '../../../Controller/userController';
import { jwtTokenVerifier } from '../../../lib/jwtTokenVerifier';
export const POST = async(req: Request) => {
    try{
        const {userEmail,userMessage,receiverId} = await messageMiddleware(req);
        const result = await messageController(userEmail,userMessage,receiverId);
        return NextResponse.json(result, {status: result.status})
    }catch(err){
        console.log(err)
        return NextResponse.json({message: "Internal Sever Error,"}, {status: 500});
    }
}

export const GET = async(req: Request) => {
    try{
     const {userEmail} = jwtTokenVerifier(req)   
     const result = await messageGetController(userEmail);
     return NextResponse.json(result, {status: result.status})

    }catch(err){
        console.log(err)
        return NextResponse.json({message: "Internal Sever Error,"}, {status: 500});
    }
}