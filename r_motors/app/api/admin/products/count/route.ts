import { getAdminProductExtraData } from '@/Controller/adminController';
import { getAdminMiddleware } from '../../../../../Middleware/adminMiddleware';
import { NextResponse } from 'next/server';

export const GET = async(req: Request) => {
    try{

        const {userEmail} = await getAdminMiddleware(req);
        const result = await getAdminProductExtraData(userEmail);
        return NextResponse.json(result, {status: result.status});
    }catch(error: any)
    {
        return NextResponse.json({message: error.message}, {status: 500});
    }
}