import { addAdminProductsMiddleware, getAdminMiddleware, deleteAdminProductsMiddleware, updateAdminProductsMiddleware } from '../../../../Middleware/adminMiddleware';
import { NextResponse } from 'next/server';
import { addAdminProductsController, getAdminProductsController, deleteAdminProductsController, updateAdminProductsController } from '../../../../Controller/adminController';
import { devLogger } from '../../../../utils/devLogger';

export const GET = async(req: Request) => {
    try{

        const {userEmail} = await getAdminMiddleware(req);
        const result = await getAdminProductsController(userEmail);
        
        return NextResponse.json(result, {status: result.status});
    }catch(error: any)
    {
        return NextResponse.json({message: error.message}, {status: 500});
    }
}

export const POST = async(req: Request) => {
    try{
        const {body, files} = await addAdminProductsMiddleware(req);
        const result = await addAdminProductsController({body, files});
        return NextResponse.json(result,{status: result.status});
        
    }catch(error: any)
    {
        devLogger(error)
        return NextResponse.json({message: error.message}, {status: 500});
    }
}

export const DELETE = async(req: Request) => {
    try{
        const {userEmail,productId} = await deleteAdminProductsMiddleware(req);
        const result = await deleteAdminProductsController(userEmail,productId);
        return NextResponse.json(result, {status: result.status})
    }catch(error: any)
    {
        
        
        devLogger(error)
        return NextResponse.json({message: error.message}, {status: 500});
    }
}


export const PATCH = async(req: Request) => {
    try{
        const {userEmail, productId,data } = await updateAdminProductsMiddleware(req);

        const result = await updateAdminProductsController(userEmail,productId,data);
        return NextResponse.json(result, {status: result.status});

    }catch(error: any)
    {
        devLogger(error)

        return NextResponse.json({message: error.message}, {status: 500});
    }
}