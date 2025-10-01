import { NextRequest, NextResponse } from 'next/server';

export const GET = async(req: NextRequest) => {
    const token = req.cookies.get("token")?.value ?? null
    const userRole = req.cookies.get("userRole")?.value ?? null
    return NextResponse.json({token, userRole})
}