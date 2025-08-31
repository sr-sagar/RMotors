import { NextResponse } from 'next/server';


export const POST = async(request: Request) => {

    const body = await request.json();
    const {url,data} = await body;
    const backend_url = process.env.BACKEND_URL!;
    const req = await fetch(`${backend_url!}/api/auth/${url}`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
        credentials: "include",
    });

    const responseHeader = await req.text();
    const response = new NextResponse(responseHeader, {
        status: req.status,
        headers: req.headers,
    });

    return response;
}