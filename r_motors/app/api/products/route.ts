import { NextRequest, NextResponse } from 'next/server';
import { getProductsController } from '../../../Controller/userController';
import { devLogger } from '@/utils/devLogger';
export const GET = async(req: NextRequest) => {
    try{
        const result = await getProductsController()
        return NextResponse.json(result ,{status: result.status});

    }catch(err: any)
    {
        
        devLogger(err)
        return NextResponse.json({message: err.message}, {status: 500})
    }

} 