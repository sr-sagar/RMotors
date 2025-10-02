import { NextResponse, NextRequest } from 'next/server';
import { AnyError, getErrorMessage } from '../../../../../utils/anySolver';
import { getUnreadMsgCountController } from '@/Controller/userController';
import { getUnreadMsgCountMiddleware } from '@/Middleware/userMiddleware';
import { devLogger } from '../../../../../utils/devLogger';


export const GET = async(req: NextRequest) => {
    try{
        const { searchParams } = new URL(req.url);
        const roomId = searchParams.get("roomId");
        if(!roomId)
        {
            return NextResponse.json({message: "unbale to get room id"}, {status: 500})
        }
        console.log(roomId)
        const {userEmail} = await getUnreadMsgCountMiddleware(req);
        const result = await getUnreadMsgCountController(userEmail,roomId)
        return NextResponse.json(result, {status: result.status});
    }catch(error: AnyError)
    {
        devLogger(error)
        return NextResponse.json({message: getErrorMessage(error),status: 500});
        
    }
    
}