import { getAdminMiddleware } from '../../../../Middleware/adminMiddleware';
import { NextResponse } from 'next/server';
import { getAdminProductsController } from '../../../../Controller/adminController';

export const GET = async(req: Request,res: NextResponse) => {
    const {userEmail} = await getAdminMiddleware(req);
    const result = await getAdminProductsController(userEmail);

    return NextResponse.json({products: result.products,message: result.message}, {status: result.status});
}