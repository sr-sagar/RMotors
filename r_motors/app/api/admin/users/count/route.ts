import { getAdminUserCount } from '@/Controller/adminController';
import { getAdminMiddleware } from '../../../../../Middleware/adminMiddleware';
import { NextResponse } from 'next/server';
import { AnyError, getErrorMessage } from '@/utils/anySolver';

export const GET = async(req: Request) => {
    try{

        const {userEmail} = await getAdminMiddleware(req);
        const result = await getAdminUserCount(userEmail);
        return NextResponse.json(result, {status: result.status});
    }catch(error: AnyError)
    {
        return NextResponse.json({message: getErrorMessage(error)}, {status: 500});
    }
}