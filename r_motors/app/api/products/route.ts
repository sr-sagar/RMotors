import { NextRequest, NextResponse } from 'next/server';
import { getProductsController } from '../../../Controller/userController';
export const GET = async(req: NextRequest) => {
    try{
        const result = await getProductsController()
        return NextResponse.json(result ,{status: result.status});

    }catch(err)
    {
        console.log(err)
        return NextResponse.json({message: "Internal server error"}, {status: 500})
    }

} 