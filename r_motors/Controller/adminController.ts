import { string } from 'joi';
import { prisma } from '../lib/prisma';
import { Decimal } from '@prisma/client/runtime/library';
import cloudinary from '../lib/cloudinary';
import { resolve } from 'path';
import { addAdminProductsMiddleware } from '../Middleware/adminMiddleware';
import { ProductAvailability, ProductTransmission } from '@prisma/client';
import { devLogger } from '../utils/devLogger';

type ApiResponseProps<T,> = {
    data: T | null,
    message: string,
    status: number,
    success: boolean

}


// GET Requests
export const getAdminProductsController = async(userEmail: string) => {
    const user = await prisma.user.findUnique({where: {userEmail}});
    if(!user)
    {
        return {data: null,message: "user email not found. Please sign up.",status: 404, success: false};
    }
    if(user.userRole !== "admin")
    {
        return {data: null,message: "unauthorized access.",status: 401, success: false};
    }
    
    const getProducts  = await prisma.product.findMany({select: {id: true,productTitle: true, productDescription: true, productPrice: true,productCategory: true,productCost: true, productAvailability: true,productQuantity: true}});
    return {data: getProducts,message: "products retrived successfully.",status: 200, success: true};
}
export const getAdminUsersController = async(userEmail: string) => {
    const user = await prisma.user.findUnique({where: {userEmail}});
    if(!user)
    {
        return {data: null,message: "user email not found. Please sign up.",status: 404, success: false};
    }
    if(user.userRole !== "admin")
    {
        return {data: null,message: "unauthorized access.",status: 401, success: false};
    }
    
    const getUsers  = await prisma.user.findMany({select: {id: true,userName: true, userEmail: true, userPhoneNumber: true, userRole: true}});
    return {data: getUsers,message: "users retrived successfully.",status: 200, success: true};
}

export const getAdminOrdersController = async(userEmail: string) => {
    const user = await prisma.user.findUnique({where: {userEmail}});
    if(!user)
    {
        return {data: null,message: "user email not found. Please sign up.",status: 404, success: false};
    }
    if(user.userRole !== "admin")
    {
        return {data: null,message: "unauthorized access.",status: 401, success: false};
    }
    const getOrders  = await prisma.order.findMany({select: {id: true, userId: true, orderedAt: true, orderStatus: true,deliveryDate: true,order: {select: {product: {select: {productTitle: true}}}}}});
    const serializedOrders = getOrders.map((item) => ({
        ...item,
        productTitle: item.order.map(i => i.product.productTitle)
    }))
    return {data: serializedOrders,message: "orders retrived successfully.",status: 200, success: true};

}


export const getAdminUserCount = async(userEmail: string) => {
    const user = await prisma.user.findUnique({where: {userEmail}});
    if(!user)
    {
        return {data: null,message: "user email not found. Please sign up.",status: 404, success: false};
    }
    if(user.userRole !== "admin")
    {
        return {data: null,message: "unauthorized access.",status: 401, success: false};
    }
    
    const userCount = await prisma.user.count()
    if(!userCount)
    {
        return {data: null, message: "unable to get count as no user exists.", status: 404, success: false}
    }

    return {data: userCount, message: "user count fetched successfully.", status: 200, success: true};

}
export const getAdminProductExtraData = async(userEmail: string) => {
    const user = await prisma.user.findUnique({where: {userEmail}});
    if(!user)
    {
        return {data: null,message: "user email not found. Please sign up.",status: 404, success: false};
    }
    if(user.userRole !== "admin")
    {
        return {data: null,message: "unauthorized access.",status: 401, success: false};
    }
    
    const productExtraData = await prisma.$transaction([
        prisma.$queryRaw`
        SELECT
            TO_CHAR(DATE_TRUNC('month', "createdAt"), 'Mon') as month,
            SUM("productPrice") as totalSales,
            SUM("productCost") as totalCost,
            SUM("productPrice" - "productCost") as profit
        FROM "Product"
        WHERE "productAvailability" =  'Sold'
        GROUP BY DATE_TRUNC('month', "createdAt")
        ORDER BY month ASC;
        `,
        prisma.product.aggregate({where: {productAvailability: "Sold"}, _sum: {productPrice: true,productCost : true}}),
        prisma.product.count(),
        prisma.product.count({where: {productAvailability: "Sold"}})
    ])
    if(!productExtraData)
    {
        return {data: null, message: "unable to get product extra details.", status: 400, success: false}
    }

    return {data: productExtraData, message: "product count fetched successfully.", status: 200, success: true};

}

// POST Requests

type Product = {
    id: string,
    productTitle: string,
    productDescription: string,
    productPrice: Decimal,
    productCost: Decimal,
    productImageURLs: string[],
    productUploaderId: string,
    productAvailability: string,
    productCategory: string,
    createdAt: Date,
}

type addAdminProductsControllerProps = {
    data: Product | null,
    message: string,
    status: number,
    success: boolean
}

export const addAdminProductsController = async({body,files}: {body: {userEmail: string,productTitle: string,productDescription: string,productPrice: number,productCost: number,productAvailability: string,productCategory?: string,productTransmission: string,productYear: string,productLocation: string,productTotalMiles: string,productPriceBeforeDiscount: number}, files: File[]}): Promise<addAdminProductsControllerProps> => {
    const {userEmail,productTitle,productDescription,productPrice,productCost,productAvailability,productCategory,productTransmission,productYear,productLocation,productTotalMiles,productPriceBeforeDiscount} =  body;
    const user = await prisma.user.findUnique({where: {userEmail}});
    if(!user)
    {
        return {data: null,message: "user email not found. Please sign up.", status: 404, success: false}
        
    }
    if(user.userRole !== "admin")
    {
        return {data: null,message: "unauthorized access.", status: 401, success: false}
    }
    
    try{
        const uploadPromise = files.map(async (file) => {
            const buffer = Buffer.from(await file.arrayBuffer());
            return new Promise((resolve,reject) => {
                cloudinary.uploader.upload_stream({folder: "RMotor"}, (error,result) => {
                    if(error) reject(error)
                    else resolve(result?.secure_url)
                }).end(buffer)
            });

        })

        const imageUrl= (await Promise.all(uploadPromise)).filter(Boolean) as string[];
        
        const product = await prisma.product.create({
            data: {
                
                productTitle,
                productDescription,
                productPrice,
                productCost,
                productImageURLs: imageUrl as string[], 
                productUploaderId: user.id,
                productAvailability: productAvailability as ProductAvailability,
                productCategory, 
                productTransmission: productTransmission as ProductTransmission,
                productYear,
                productLocation,
                productTotalMiles,
                productPriceBeforeDiscount,
            }
        })

        return {data: product,message: "product created successfully.", status: 201, success: true}
        
    }catch(error)
    {
        return {data: null,message: "unable to create product.", status: 400, success: false}

    }

}


// UPDATE Requests

type UpdateProduct = {
    productTitle?: string,
    productDescription?: string,
    productPrice?: Decimal,
    productCost?: Decimal,
    productAvailability?: ProductAvailability,
    productCategory?: string,
    productTransmission?: ProductTransmission,
    productYear?: string,
    productLocation?: string,
    productTotalMiles?: string,
    productPriceBeforeDiscount?: Decimal,
}

type UpdateAdminProductsControllerProps = {
    data: UpdateProduct | null,
    message: string,
    status: number,
    success: boolean

}
export const updateAdminProductsController = async(userEmail: string,productId: string, data: UpdateProduct): Promise<UpdateAdminProductsControllerProps> => {
    const user = await prisma.user.findUnique({where: {userEmail}});
    if(!user)
    {
        return {data: null,message: "user email not found. Please sign up.", status: 404, success: false}
        
    }
    if(user.userRole !== "admin")
    {
        return {data: null,message: "unauthorized access.", status: 401, success: false}


    }

    
    try{
        const product = await prisma.product.update({
            where: { id: productId},
            data,
        })

        return {data: product,message: "product updated successfully.", status: 200, success: true}

    }catch(error)
    {
        devLogger(error)
        return {data: null,message: "unable to update product.", status: 400, success: false}


    }

}


type UpdateUserRole = {
    userRole: string,
}

type UpdateAdminUserRoleControllerProps = {
    data: UpdateUserRole | null,
    message: string,
    status: number,
    success: boolean
}
export const updateAdminUserRoleController = async(userEmail: string,userId: string,newUserRole: string): Promise<UpdateAdminUserRoleControllerProps> => {
    const user = await prisma.user.findUnique({where: {userEmail}});
    if(!user)
    {
        return {data: null,message: "user email not found. Please sign up.", status: 404, success: false}
        
    }
    if(user.userRole !== "admin")
    {
        return {data: null,message: "unauthorized access.", status: 401, success: false}

    }



    try{

        const user = await prisma.user.update({
            where: { id: userId},
            data: {
                userRole: newUserRole,
            },
        })

        return {data: user,message: "user updated successfully.", status: 200, success: true}
        
    }catch(error)
    {
        return {data: null,message: "unable to update user.", status: 400, success: false}

    }

}


type UpdateOrderStatus = {
    orderStatus?: string,
    deliveryDate?: string,
}

type UpdateAdminOrderStatusControllerProps = {
    data: UpdateOrderStatus | null,
    message: string,
    status: number,
    success: boolean,
}
export const updateAdminOrderController = async(userEmail: string,orderId: string, data:{ orderStatus?: "Delivered" | "Pending" | "Canceled" | "Dispatched", deliveryDate?: string}): Promise<UpdateAdminOrderStatusControllerProps> => {
    const user = await prisma.user.findUnique({where: {userEmail}});
  
    if(!user)
    {
        return {data: null,message: "user email not found. Please sign up.", status: 404, success: false}
        
    }
    if(user.userRole !== "admin")
    {
        return {data: null,message: "unauthorized access.", status: 401, success: false}

    }


    try{

        const order = await prisma.order.update({
            where: { id: orderId},
            data,
        })

        return {data: order,message: "order updated successfully.", status: 200, success: true}
        
    }catch(error)
    {
        return {data: null,message: "unable to update order.", status: 400, success: false}

    }

}

// DELETE Requests


export const deleteAdminProductsController = async(userEmail: string,productId: string) => {
    const user = await prisma.user.findUnique({where: {userEmail}});
    if(!user)
    {
        return {data: null,message: "user email not found. Please sign up.", status: 404, success: false}
        
    }
    if(user.userRole !== "admin")
    {
        return {data: null,message: "unauthorized access.", status: 401, success: false}

    }


    try{

        const product = await prisma.product.delete({
            where: { id: productId }
        })

        return {data: product,message: "product deleted successfully.", status: 200, success: true}

    }catch(error)
    {
        return {data: null,message: "unable to delete product.", status: 400, success: false}


    }

}

export const deleteAdminUserController = async(userEmail: string,userId: string) => {
    const user = await prisma.user.findUnique({where: {userEmail}});
    if(!user)
    {
        return {data: null,message: "user email not found. Please sign up.", status: 404, success: false}

        
    }
    if(user.userRole !== "admin")
    {
        return {data: null,message: "unauthorized access.", status: 401, success: false}

    }


    try{

        const user = await prisma.user.delete({
            where: { id: userId }
        })

        return {data: user,message: "user deleted successfully.", status: 200,success: true}


    }catch(error)
    {
        return {data: null,message: "unable to delete user.", status: 400, success: false}


    }

}
export const deleteAdminOrderController = async(userEmail: string,orderId: string) => {
    const user = await prisma.user.findUnique({where: {userEmail}});
    if(!user)
    {
        return {data: null,message: "user email not found. Please sign up.", status: 404, success: false}
        
    }
    if(user.userRole !== "admin")
    {
        return {data: null,message: "unauthorized access.", status: 401, success: false}

    }


    try{

        const order = await prisma.order.delete({
            where: { id: orderId }
        })

        return {data: order,message: "order deleted successfully.", status: 200,success: true}
        
    }catch(error)
    {
        return {data: null,message: "unable to delete order.", status: 400, success: false}

    }

}


