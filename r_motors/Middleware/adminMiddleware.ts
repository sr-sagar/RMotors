import joi from "joi";
import { jwtTokenVerifier } from '../lib/jwtTokenVerifier';


// GET Requests
export const getAdminMiddleware = async(req: Request) => {
    const decode = jwtTokenVerifier(req);

    return decode;

}

// POST Requests
export const addAdminProductsMiddleware = async(req: Request) => {
    const body = await req.json();
    jwtTokenVerifier(req);
    const schema = joi.object({
        userEmail: joi.string().required(),
        productTitle: joi.string().required(),
        productDescription: joi.string().required(),
        productPrice: joi.string().required(),
        productImageURLs: joi.array().items(joi.string()).required(),
    })
    const { error } = await schema.validate(body, {abortEarly: false});
    if(error)
    {
        throw new Error("Please enter valid data.");
    }

    return body;
}


// UPDATE Requests
export const updateAdminProductsMiddleware = async(req: Request) => {
    const body = await req.json();
    jwtTokenVerifier(req)
    const schema = joi.object({
        userEmail: joi.string().required(),
        productId: joi.string().required(),
        productTitle: joi.string().optional(),
        productDescription: joi.string().optional(),
        productPrice: joi.string().optional(),
        productImageURLs: joi.array().items(joi.string()).optional(),
    })
    const { error } = await schema.validate(body, {abortEarly: false});
    if(error)
    {
        throw new Error("Please enter valid data.");
    }

    return body;
}
export const updateAdminUserRoleMiddleware = async(req: Request) => {
    const body = await req.json();
    jwtTokenVerifier(req)
    const schema = joi.object({
        userEmail: joi.string().email().required(),
        userId: joi.string().required(),
        newUserRole: joi.string().required(),
    })
    const { error } = await schema.validate(body, {abortEarly: false});
    if(error)
    {
        throw new Error("Please enter valid data.");
    }

    return body;
}
export const updateAdminOrderStatusMiddleware = async(req: Request) => {
    const body = await req.json();
    jwtTokenVerifier(req)
    const schema = joi.object({
        userEmail: joi.string().required(),
        orderId: joi.string().required(),
        newOrderStatus: joi.string().required(),
    })
    const { error } = await schema.validate(body, {abortEarly: false});
    if(error)
    {
        throw new Error("Please enter valid data.");
    }

    return body;
}

// DELETE Requests
export const deleteAdminProductsMiddleware = async(req: Request) => {
    const body = await req.json();
    jwtTokenVerifier(req)
    const schema = joi.object({
        userEmail: joi.string().required(),
        productId: joi.string().required(),
    })
    const { error } = await schema.validate(body, {abortEarly: false});
    if(error)
    {
        throw new Error("Please enter valid data.");
    }

    return body;
}
export const deleteAdminUsersMiddleware = async(req: Request) => {
    const body = await req.json();
    jwtTokenVerifier(req)
    const schema = joi.object({
        userEmail: joi.string().required(),
        userId: joi.string().required(),
    })
    const { error } = await schema.validate(body, {abortEarly: false});
    if(error)
    {
        throw new Error("Please enter valid data.");
    }

    return body;
}
export const deleteAdminOrdersMiddleware = async(req: Request) => {
    const body = await req.json();
    jwtTokenVerifier(req)
    const schema = joi.object({
        userEmail: joi.string().required(),
        orderId: joi.string().required(),

    })
    const { error } = await schema.validate(body, {abortEarly: false});
    if(error)
    {
        throw new Error("Please enter valid data.");
    }

    return body;
}