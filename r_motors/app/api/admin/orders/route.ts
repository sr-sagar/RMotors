import { getAdminMiddleware } from '../../../../Middleware/adminMiddleware';
import { NextResponse } from 'next/server';
import { getAdminOrdersController } from '../../../../Controller/adminController';

export const GET = async(req: Request,res: NextResponse) => {
    const {userEmail} = await getAdminMiddleware(req);
    const result = await getAdminOrdersController(userEmail);

    return NextResponse.json({orders: result.orders,message: result.message}, {status: result.status});
}