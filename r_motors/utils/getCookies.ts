"use server"
import { cookies } from "next/headers"

export const getCookies = async(name: string) => {
    const getCookie = await cookies()
    const cookie = getCookie.get(name);
    return cookie?.value ?? undefined;
}



export const deleteCookies = async(name: string) => {
    const deleteCookie = await cookies()
    const cookie = deleteCookie.delete(name)
    return cookie;
}

export const clearAllCookies = async() => {
    const Cookies = await cookies()
    const allCookies = Cookies.getAll()
    allCookies.forEach((c) => {
        Cookies.delete(c.name)
        
    })
    return {success: true, message: "all cookies deleted."};
}

