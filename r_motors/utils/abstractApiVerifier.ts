"use server"


import { devLogger } from './devLogger';


export const handlePhoneValidation = async(phone: string) => {
    try{

        const req = await fetch(`https://phonevalidation.abstractapi.com/v1/?api_key=${process.env.ABSTRACT_PHONE_KEY}&phone=${phone}`)
        const phoneRep = await req.json()
        if(!phoneRep.valid)
        {
            throw new Error("Please enter valid phone number");

        }
        return phoneRep;
    }catch(error)
    {
        throw new Error("Please enter valid phone number");
    }
} 
export const handleEmailValidation = async(email: string) => {
    try{

        const req = await fetch(`https://emailreputation.abstractapi.com/v1/?api_key=${process.env.ABSTRACT_EMAIL_KEY}&email=${email}`)
        const emailRep = await req.json()
        devLogger(emailRep)
        if(!emailRep.email_deliverability || emailRep.email_deliverability.status !== "deliverable")
        {
            throw new Error("Please enter valid email");

        }
        return emailRep;
    }catch(error)
    {
        throw new Error("Please enter valid email");
    }
} 