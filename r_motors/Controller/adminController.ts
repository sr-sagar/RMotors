import { string } from 'joi';
import { prisma } from '../lib/prisma';


// GET Requests
export const getAdminProductsController = async(userEmail: string) => {
    const user = await prisma.user.findUnique({where: {userEmail}});
    if(!user)
    {
        throw new Error("user email not found. Please sign up.");
    }
    if(user.userRole !== "admin")
    {
        throw new Error("unauthorized access.");
    }
    const getProducts  = await prisma.product.findMany({select: {id: true,productTitle: true, productDescription: true, productPrice: true}});
    return {products: getProducts,message: "products retrived successfully.",status: 200};
}
export const getAdminUsersController = async(userEmail: string) => {
    const user = await prisma.user.findUnique({where: {userEmail}});
    if(!user)
    {
        throw new Error("user email not found. Please sign up.");
    }
    if(user.userRole !== "admin")
    {
        throw new Error("unauthorized access.");
    }
    const getUsers  = await prisma.user.findMany({select: {id: true,userName: true, userEmail: true, userPhoneNumber: true, userRole: true}});
    return {users: getUsers,message: "users retrived successfully.",status: 200};
}

export const getAdminOrdersController = async(userEmail: string) => {
    const user = await prisma.user.findUnique({where: {userEmail}});
    if(!user)
    {
        throw new Error("user email not found. Please sign up.");
    }
    if(user.userRole !== "admin")
    {
        throw new Error("unauthorized access.");
    }
    const getOrders  = await prisma.order.findMany({select: {id: true,order: true, userId: true, orderedAt: true}});
    return {orders: getOrders,message: "orders retrived successfully.",status: 200};

}


// POST Requests

type Product = {
    id: string,
    productTitle: string,
    productDescription: string,
    productPrice: string,
    productImageURLs: string[],
    createdAt: Date,
}

type addAdminProductsControllerProps = {
    product: Product,
    message: string,
    status: number,
}

export const addAdminProductsController = async(userEmail: string, productTitle: string,productDescription: string, productPrice: string, productImageURLs: string[]): Promise<addAdminProductsControllerProps> => {
    const user = await prisma.user.findUnique({where: {userEmail}});
    if(!user)
    {
        throw new Error("user email not found. Please sign up.");

    }
    if(user.userRole !== "admin")
    {
        throw new Error("unauthorized access.");
    }

    try{

        const product = await prisma.product.create({
            data: {
                
                productTitle,
                productDescription,
                productPrice,
                productImageURLs,  
            }
        })

        return {product: product,message: "product created successfully.", status: 201}

    }catch(error)
    {
        throw new Error("unable to create product.")

    }

}

// UPDATE Requests

type UpdateProduct = {
    productTitle?: string,
    productDescription?: string,
    productPrice?: string,
    productImageURLs?: string[],
}

type UpdateAdminProductsControllerProps = {
    product: UpdateProduct,
    message: string,
    status: number,
}
export const updateAdminProductsController = async(userEmail: string,productId: string, productTitle?: string,productDescription?: string, productPrice?: string, productImageURLs?: string[]): Promise<UpdateAdminProductsControllerProps> => {
    const user = await prisma.user.findUnique({where: {userEmail}});
    if(!user)
    {
        throw new Error("user email not found. Please sign up.");
        
    }
    if(user.userRole !== "admin")
    {
        throw new Error("unauthorized access.");
    }

    const productUpdate: any = {}

    if(productTitle !== undefined) productUpdate.productTitle = productTitle;
    if(productDescription !== undefined) productUpdate.productDescription = productDescription;
    if(productPrice !== undefined) productUpdate.productPrice = productPrice;
    if(productImageURLs !== undefined) productUpdate.productImageURLs = productImageURLs;

    try{

        const product = await prisma.product.update({
            where: { id: productId},
            data: productUpdate,
        })

        return {product,message: "product updated successfully.", status: 200}

    }catch(error)
    {
        throw new Error("unable to update product.")

    }

}


type UpdateUserRole = {
    userRole: string,
}

type UpdateAdminUserRoleControllerProps = {
    user: UpdateUserRole,
    message: string,
    status: number,
}
export const updateAdminUserRoleController = async(userEmail: string,userId: string,newUserRole: string): Promise<UpdateAdminUserRoleControllerProps> => {
    const user = await prisma.user.findUnique({where: {userEmail}});
    if(!user)
    {
        throw new Error("user email not found. Please sign up.");
        
    }
    if(user.userRole !== "admin")
    {
        throw new Error("unauthorized access.");
    }



    try{

        const user = await prisma.user.update({
            where: { id: userId},
            data: {
                userRole: newUserRole,
            },
        })

        return {user,message: "user updated successfully.", status: 200}

    }catch(error)
    {
        throw new Error("unable to update user.")

    }

}


type UpdateOrderStatus = {
    orderStatus: string,
}

type UpdateAdminOrderStatusControllerProps = {
    order: UpdateOrderStatus,
    message: string,
    status: number,
}
export const updateAdminOrderStatusController = async(userEmail: string,orderId: string, newOrderStatus: string): Promise<UpdateAdminOrderStatusControllerProps> => {
    const user = await prisma.user.findUnique({where: {userEmail}});
    if(!user)
    {
        throw new Error("user email not found. Please sign up.");
        
    }
    if(user.userRole !== "admin")
    {
        throw new Error("unauthorized access.");
    }


    try{

        const order = await prisma.order.update({
            where: { id: orderId},
            data: {
                orderStaus: newOrderStatus,
            },
        })

        return {order,message: "order status updated successfully.", status: 200}

    }catch(error)
    {
        throw new Error("unable to update order status.")

    }

}

// DELETE Requests


export const deleteAdminProductsController = async(userEmail: string,productId: string) => {
    const user = await prisma.user.findUnique({where: {userEmail}});
    if(!user)
    {
        throw new Error("user email not found. Please sign up.");
        
    }
    if(user.userRole !== "admin")
    {
        throw new Error("unauthorized access.");
    }


    try{

        const product = await prisma.product.delete({
            where: { id: productId }
        })

        return {product,message: "product deleted successfully.", status: 200}

    }catch(error)
    {
        throw new Error("unable to delete product.")

    }

}

export const deleteAdminUserController = async(userEmail: string,userId: string) => {
    const user = await prisma.user.findUnique({where: {userEmail}});
    if(!user)
    {
        throw new Error("user email not found. Please sign up.");
        
    }
    if(user.userRole !== "admin")
    {
        throw new Error("unauthorized access.");
    }


    try{

        const user = await prisma.user.delete({
            where: { id: userId }
        })

        return {user,message: "user deleted successfully.", status: 200}

    }catch(error)
    {
        throw new Error("unable to delete user.")

    }

}
export const deleteAdminOrderController = async(userEmail: string,orderId: string) => {
    const user = await prisma.user.findUnique({where: {userEmail}});
    if(!user)
    {
        throw new Error("user email not found. Please sign up.");
        
    }
    if(user.userRole !== "admin")
    {
        throw new Error("unauthorized access.");
    }


    try{

        const order = await prisma.order.delete({
            where: { id: orderId }
        })

        return {order,message: "order deleted successfully.", status: 200}

    }catch(error)
    {
        throw new Error("unable to delete order.")

    }

}