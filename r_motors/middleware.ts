import { NextRequest, NextResponse } from 'next/server';
const allowedOrigins = new Set([
    "http://localhost:3000",
    "https://rmotors-theta.vercel.app"
])
export const middleware = async(req: NextRequest) => {
    const origin = req.headers.get("origin");
    const res = NextResponse.next();

    if(origin && allowedOrigins.has(origin))
    {
        res.headers.set("Access-Control-Allow-Origin", origin);
        res.headers.set("Vary", "Origin");
    }

    res.headers.set("Access-Control-Allow-Methods", "GET,POST,PATCH,DELETE,OPTIONS");
    res.headers.set("Access-Control-Allow-Headers", "Content-Type, Authorization");
    res.headers.set("Access-Control-Allow-Credentials", "true");



    if(req.method === "OPTIONS")
    {
        return new NextResponse(null,{status: 204,headers: res.headers});
    }

    return res;
}

export const config = {
    matcher: "/:path*",
}