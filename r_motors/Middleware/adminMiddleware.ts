import joi, { number } from "joi";
import { jwtTokenVerifier } from '../lib/jwtTokenVerifier';
import { devLogger } from '../utils/devLogger';


// GET Requests
export const getAdminMiddleware = async(req: Request) => {
    const decode = jwtTokenVerifier(req);

    return decode;

}

// POST Requests
export const addAdminProductsMiddleware = async(req: Request) => {
    const formData = await req.formData();
    jwtTokenVerifier(req);

    const body = {
        userEmail: formData.get("userEmail") as string, 
        productTitle: formData.get("carTitle") as string,
        productDescription: formData.get("carDescription") as string,
        productPrice: Number(formData.get("carPrice")),
        productCost: Number(formData.get("carCost")),
        productAvailability: formData.get("carAvailability") as string, 
        productCategory: formData.get("carCategory") as string,
        productTransmission: formData.get("carTransmission") as string,
        productYear: formData.get("carYear") as string,
        productLocation: formData.get("carLocation") as string,
        productTotalMiles: formData.get("carTotalMiles") as string,
        productPriceBeforeDiscount: Number(formData.get("carPriceBeforeDiscount")),
    }
    const schema = joi.object({
        userEmail: joi.string().required(),
        productTitle: joi.string().required(),
        productDescription: joi.string().required(),
        productPrice: joi.number().required(),
        productCost: joi.number().required(),
        productAvailability: joi.string().valid("Available","Pending","Sold").required(),
        productCategory: joi.string().valid("Petrol","Diesel", "Electric", "Hybrid").optional(),
        productTransmission: joi.string().valid("Automatic","Manual","Hybrid").required(),
        productYear: joi.string().required(),
        productLocation: joi.string().required(),
        productTotalMiles: joi.string().required(),
        productPriceBeforeDiscount: joi.number().required(),
    }).prefs({convert: true})
    const { error } =  schema.validate(body, {abortEarly: false});
    if(error)
    {   
        devLogger(error)
        throw new Error("Please enter valid data.");
    }

    const files: File[] = [];
    formData.getAll("files").forEach((file) => {
        if(file instanceof File) files.push(file);
    });

    return {body, files};
}



// UPDATE Requests
export const updateAdminProductsMiddleware = async(req: Request) => {
    const body = await req.json();
    jwtTokenVerifier(req)
    const schema = joi.object({
        userEmail: joi.string().required(),
        productId: joi.string().required(),
        data: joi.object({
            productTitle: joi.string().optional(),
            productDescription: joi.string().optional(),
            productPrice: joi.number().optional(),
            productCost: joi.number().optional(),
            productAvailability: joi.string().valid("Available","Sold","Pending").optional(),
            productCategory: joi.string().optional(),
            productQuantity: joi.number().min(1).optional(),
            productTransmission: joi.string().valid("Automatic","Manual","Hybrid").optional(),
            productYear: joi.string().optional(),
            productLocation: joi.string().optional(),
            productTotalMiles: joi.string().optional(),
            productPriceBeforeDiscount: joi.number().optional(),
        }).min(1)
    })
    const { error } = await schema.validate(body, {abortEarly: false});
    if(error)
    {
        throw new Error("Please enter valid data.");
    }
    const {userEmail,productId, data} = body
    return {userEmail,productId,data};
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
export const updateAdminOrderMiddleware = async(req: Request) => {
    const body = await req.json();
    jwtTokenVerifier(req)
    const schema = joi.object({
        userEmail: joi.string().required(),
        orderId: joi.string().required(),
        data: joi.object({
            orderStatus: joi.string().optional(),
            deliveryDate: joi.string().optional(),
            
        }).min(1)
    })
    const { error } =  schema.validate(body, {abortEarly: false});
    if(error)
    {
        devLogger(error)
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