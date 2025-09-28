import { getAdminMiddleware, deleteAdminUsersMiddleware, updateAdminUserRoleMiddleware } from '../../../../Middleware/adminMiddleware';
import { NextResponse } from 'next/server';
import { getAdminUsersController, deleteAdminUserController, updateAdminUserRoleController } from '../../../../Controller/adminController';
import { AnyError, getErrorMessage } from '@/utils/anySolver';

export const GET = async(req: Request) => {
    try{

        const {userEmail} = await getAdminMiddleware(req);
        const result = await getAdminUsersController(userEmail);
        
        return NextResponse.json(result, {status: result.status});
    }catch(error: AnyError)
    {
        return NextResponse.json({message: getErrorMessage(error)}, {status: 500});
    }
}

export const DELETE = async(req: Request) => {
    try{
        const {userEmail, userId} = await deleteAdminUsersMiddleware(req);
        const result = await deleteAdminUserController(userEmail,userId);
        return NextResponse.json(result, {status: result.status});

    }catch(error: AnyError)
    {
        return NextResponse.json({message: getErrorMessage(error)}, {status: 500});
    }
}

export const PATCH = async(req: Request) => {
    try{
        const {userEmail, userId,newUserRole} = await updateAdminUserRoleMiddleware(req);
        const result = await updateAdminUserRoleController(userEmail,userId,newUserRole);
        return NextResponse.json(result, {status: result.status});

    }catch(error: AnyError)
    {
        return NextResponse.json({message: getErrorMessage(error)}, {status: 500});
    }
}