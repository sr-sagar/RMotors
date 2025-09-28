import { NextResponse } from 'next/server';
import { getMessageRoomMiddleware, createMessageRoomMiddleware } from '../../../Middleware/userMiddleware';
import { getMessageRoomController, createMessageRoomController } from '../../../Controller/userController';


export const GET = async(req: Request) => {
    try{

        const {userEmail} = await getMessageRoomMiddleware(req);
        const result = await getMessageRoomController(userEmail);
        return NextResponse.json(result , {status: result.status})

    }catch(error: any)
    {
        return NextResponse.json({message: error.message}, {status: 500});
    }
}


export const POST = async(req: Request) => {
    try{
        const {userEmail,productId, productOwnerId} = await createMessageRoomMiddleware(req);
        const result = await createMessageRoomController(userEmail,productId,productOwnerId);
        return NextResponse.json(result, {status: result.status});
    }catch(error: any)
    {
        return NextResponse.json({message: error.message}, {status: 500});
    }
}