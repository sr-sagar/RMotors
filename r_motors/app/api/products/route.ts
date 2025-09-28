import { NextRequest, NextResponse } from 'next/server';
import { getProductsController } from '../../../Controller/userController';
import { devLogger } from '@/utils/devLogger';
import { AnyError, getErrorMessage } from '@/utils/anySolver';
export const GET = async(req: NextRequest) => {
    try{
        const result = await getProductsController()
        return NextResponse.json(result ,{status: result.status});

    }catch(error: AnyError)
    {
        devLogger(error)
        return NextResponse.json({message: getErrorMessage(error)}, {status: 500});
    }

} 