import { getRoomMessagesMiddleware, messageMiddleware, updateMessageReadStatusMiddleware } from '../../../../Middleware/userMiddleware';
import { getRoomMessagesController, messageController, updateMessageReadStatusController } from '../../../../Controller/userController';
import { NextResponse } from 'next/server';
import { devLogger } from '@/utils/devLogger';
import { AnyError, getErrorMessage } from '@/utils/anySolver';


export const POST = async(req: Request) => {
    try{
        const {userEmail,userMessage,receiverId,roomId} = await messageMiddleware(req);
        const result = await messageController(userEmail,userMessage,receiverId,roomId);
        return NextResponse.json(result, {status: result.status})
    }catch(error: AnyError)
    {
        return NextResponse.json({message: getErrorMessage(error)}, {status: 500});
    }
}

export const GET = async(req: Request, {params}: {params: {roomId: string}}) => {
    try{
        const {roomId} = await params;
        const {userEmail} = await getRoomMessagesMiddleware(req);
        const result = await getRoomMessagesController(userEmail,roomId)
        return NextResponse.json(result,{status: result.status})
    }catch(error: AnyError)
    {
        return NextResponse.json({message: getErrorMessage(error)}, {status: 500});
    }
}


export const PATCH = async(req: Request) => {
    try{
        
        const {userEmail,roomId} = await updateMessageReadStatusMiddleware(req);
        const result = await updateMessageReadStatusController(userEmail,roomId);
        return NextResponse.json(result,{status: result.status});
    }catch(error: AnyError)
    {
        devLogger(error)
        return NextResponse.json({message: getErrorMessage(error)}, {status: 500});
    }
}