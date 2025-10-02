import joi from "joi";
import { jwtTokenVerifier } from '../lib/jwtTokenVerifier';
import { handlePhoneValidation, handleEmailValidation } from '../utils/abstractApiVerifier';
import { devLogger } from '../utils/devLogger';
export const loginMiddleware = async(req:Request) => {

    const body = await req.json()
    const schema = joi.object({
        email: joi.string().email().required(),
        password: joi.string().min(6).required()
    })

    const { error } = schema.validate(body, {abortEarly: false})
    if(error)
    {
        devLogger(error);
        throw new Error("Please enter valid data.");
    }

    return body;
} 

export const signupMiddleware = async(req: Request) => {

    const body = await req.json();
    const schema = joi.object({
        email: joi.string().email().required(),
        userName: joi.string().required(),
        phoneNumber: joi.string().pattern(/^[6-9]\d{9}$/).required().messages({"any.only": "Phone Number Should be valid."}),
        password: joi.string().required(),
        confirmPassword: joi.valid(joi.ref("password")).required().messages({"any.only": "Password does not match."}),
    })

    const { error } = schema.validate(body, {abortEarly: false});
    if(error)
    {
        devLogger(error)        
        throw new Error("Please enter valid data.")
    }

    await handlePhoneValidation(body.phoneNumber)
    await handleEmailValidation(body.email)
    
    return body;
}

type messageMiddlewareProps = {
    userEmail: string,
    userMessage: string,
    receiverId: string,
    roomId: string,
}




// GET REQUESTS
export const getRoomMessagesMiddleware = async(req: Request) => {
    const decode = jwtTokenVerifier(req);

    return decode;
}
export const getOrdersMiddleware = async(req: Request) => {
    const decode = jwtTokenVerifier(req);

    return decode;
}

export const getUserMiddleware = async(req: Request) => {
    const decode = jwtTokenVerifier(req);
    
    return decode;
    
}

export const getUnreadMsgCountMiddleware = async(req: Request) => {
    const {userEmail} = jwtTokenVerifier(req);
    
    return {userEmail};
    
}


// POST REQUESTS

export const messageMiddleware = async(req: Request) => {
    const body = await req.json()
    jwtTokenVerifier(req);


    const schema = joi.object({
        userEmail: joi.string().email().required(),
        userMessage: joi.string().required().min(1),
        receiverId: joi.string().required(),
        roomId: joi.string().required(),

    })

    const {error} = schema.validate(body, {abortEarly: false});
    if(error)
    {
        devLogger(error)
        return {Message: [], message: "please enter valid data", status: 400, success: false};

        
    }
    return body;
}

export const getMessageRoomMiddleware = async(req: Request) => {
    const decode = await jwtTokenVerifier(req)
    return decode;
}




export const createMessageRoomMiddleware = async(req: Request) => {
    const body = await req.json();

    jwtTokenVerifier(req);

    const schema = joi.object({
        userEmail: joi.string().email().required(),
        productId: joi.string().required(),
        productOwnerId: joi.string().required(),
    })
    const {error} = schema.validate(body, {abortEarly: false});
    if(error)
    {
        devLogger(error)
        return {room: [], message: "please enter valid data", status: 400, success: false};

    };
    return body;
}



export const createOrderMiddleware = async(req: Request) => {
    const body = await req.json()
    const decode = jwtTokenVerifier(req);
    const schema = joi.object({
        userEmail: joi.string().email().required(),
        productId: joi.string().required(),
    })

    const {error} = await schema.validate(body, {abortEarly: false});
    if(error)
    {
        return {order: [], message: "please enter valid data", status: 400, success: false};
    }
    
    return body;
    
}




// UPDATE REQUESTS

export const updateUserDetailsMiddleware = async(req: Request) => {
    const body = await req.json();
    jwtTokenVerifier(req);
    const schema = joi.object({
        email: joi.string().email().required(),
        data: joi.object({
            userEmail: joi.string().email().optional(),
            userName: joi.string().optional(),
            userPhoneNumber: joi.string().optional(),
            userLocation: joi.string().optional(),
            userBio: joi.string().optional(),
            userPassword: joi.string().optional(),

        }).min(1),
    })
    
    const {error} = schema.validate(body, {abortEarly: false});
    if(error)
    {
        return {data: null, message: "please enter valid data", status: 400, success: false};

    }
    
    return body; 
}


export const updateMessageReadStatusMiddleware = async(req: Request) => {
    const body = await req.json();
    const {userEmail} = jwtTokenVerifier(req)
    const schema = joi.object({
        roomId: joi.string().required(),
    })

    const {error} = schema.validate(body, {abortEarly: false});
    if(error)
    {
        return {data: null,message: "please enter valid data", status: 400, success: false};
    }

    const {roomId} = body
    return {userEmail,roomId};
}

// DELETE REQUESTS
export const deleteUserProfileMiddleware = async(req: Request) => {
    const decode = jwtTokenVerifier(req)
    return decode;
}

export const deleteOrderMiddleware = async(req: Request) => {
    const body = await req.json();
    const {userEmail} = await jwtTokenVerifier(req)
    const scheam = joi.object({
        orderId: joi.string().required(),
    })
    const {error} = scheam.validate(body, {abortEarly: false})
    if(error)
    {
        return {data: null, message: "Please enter valid data.", status: 400, success: false}
    }
    const {orderId} = body
    return {userEmail,orderId}
}