"use server"
import { cookies } from "next/headers"

export const getCookies = async(name: string) => {
    const getCookie = await cookies()
    const cookie = getCookie.get(name);
    return cookie?.value;
}