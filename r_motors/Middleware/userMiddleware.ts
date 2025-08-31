import joi from "joi";
import { jwtTokenVerifier } from '../lib/jwtTokenVerifier';
export const loginMiddleware = async(req:Request) => {

    const body = await req.json()
    const schema = joi.object({
        email: joi.string().email().required(),
        password: joi.string().min(6).required()
    })

    const { error } = schema.validate(body, {abortEarly: false})
    if(error)
    {
        console.log(error);
        throw new Error("Please enter valid data.");
    }

    return body;
} 

export const signupMiddleware = async(req: Request) => {
    const body = await req.json();
    const schema = joi.object({
        email: joi.string().email().required(),
        userName: joi.string().required(),
        phoneNumber: joi.string().pattern(/^[6-9]\d{9}$/).required().messages({"any.one": "Phone Number Should be valid."}),
        password: joi.string().required(),
        confirmPassword: joi.valid(joi.ref("password")).required().messages({"any.one": "Password does not match."}),
    })

    const { error } = schema.validate(body, {abortEarly: false});
    if(error)
    {
        console.log(error)
        throw new Error("Please enter valid data.")
    }

    return body;
}

type messageMiddlewareProps = {
    userEmail: string,
    userMessage: string,
    receiverId: string,
}
export const messageMiddleware = async(req: Request): Promise<messageMiddlewareProps> => {
    const body = await req.json()
    jwtTokenVerifier(req);


    const schema = joi.object({
        userEmail: joi.string().email().required(),
        userMessage: joi.string().required().min(1),
        receiverId: joi.string().required(),

    })

    const {error} = schema.validate(body, {abortEarly: false});
    if(error)
    {
        console.log(error)
        throw new Error("Please enter valid data.")
    }
    return body;
}
