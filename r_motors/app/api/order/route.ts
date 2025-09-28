import { getOrdersMiddleware, createOrderMiddleware } from '../../../Middleware/userMiddleware';
import { createOrderController, getOrdersController } from '../../../Controller/userController';
import { NextResponse } from 'next/server';
import { AnyError, getErrorMessage } from '@/utils/anySolver';

export const GET = async(req: Request) => {
    try{
        const {userEmail} = await getOrdersMiddleware(req);
        const result = await getOrdersController(userEmail);
        return NextResponse.json(result, {status: result.status});
    }catch(error: AnyError)
    {
        return NextResponse.json({message: getErrorMessage(error)}, {status: 500});
    }
}

export const POST = async(req: Request) => {
    try{
        const {userEmail,productId} = await createOrderMiddleware(req);
        const result = await createOrderController(userEmail,productId);
        return NextResponse.json(result, {status: result.status});
    }catch(error: AnyError)
    {
        return NextResponse.json({message: getErrorMessage(error)}, {status: 500});
    }
}