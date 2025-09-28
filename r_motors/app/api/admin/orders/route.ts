import { deleteAdminOrdersMiddleware, getAdminMiddleware, updateAdminOrderMiddleware } from '../../../../Middleware/adminMiddleware';
import { NextResponse } from 'next/server';
import { deleteAdminOrderController, getAdminOrdersController, updateAdminOrderController } from '../../../../Controller/adminController';

export const GET = async(req: Request) => {
    try{

        const {userEmail} = await getAdminMiddleware(req);
        const result = await getAdminOrdersController(userEmail);
        
        return NextResponse.json(result, {status: result.status});
    }catch(error: any)
    {
        return NextResponse.json({message: error.message}, {status: 500});
    }
}


export const DELETE = async(req: Request) => {
    try{
        const {userEmail,orderId} = await deleteAdminOrdersMiddleware(req);
        const result = await deleteAdminOrderController(userEmail,orderId);
        return NextResponse.json(result, {status: result.status})
    }catch(error: any)
    {
        
        return NextResponse.json({message: error.message}, {status: 500});
    }
}


export const PATCH = async(req: Request) => {
    try{
        const {userEmail, orderId,data } = await updateAdminOrderMiddleware(req);

        const result = await updateAdminOrderController(userEmail,orderId,data);
        return NextResponse.json(result, {status: result.status});

    }catch(error: any)
    {
        return NextResponse.json({message: error.message}, {status: 500});
    }
}