import { getAdminMiddleware } from '../../../../Middleware/adminMiddleware';
import { NextResponse } from 'next/server';
import { getAdminUsersController } from '../../../../Controller/adminController';

export const GET = async(req: Request,res: NextResponse) => {
    const {userEmail} = await getAdminMiddleware(req);
    const result = await getAdminUsersController(userEmail);

    return NextResponse.json({users: result.users,message: result.message}, {status: result.status});
}