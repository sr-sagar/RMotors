import { prisma } from "@/lib/prisma";
import bcrypt from "bcrypt";
import { jwtTokenIssuer } from '../lib/jwtTokenIssuer';
import { Decimal } from "@prisma/client/runtime/library";
import { devLogger } from '../utils/devLogger';
export const loginController = async(email:string, password:string) => {

        
        const user = await  prisma.user.findFirst({where: {userEmail: email}});
        if(!user){
            return {message: "Email not found. Please Sign Up.", status: 404, success: false};

        }
        const isMatch = await bcrypt.compare(password, user.userPassword);
        if(!isMatch)
        {
            return {message: "incorrect password. Please try again.", status: 400, success: false};
        }
        const token = jwtTokenIssuer({userEmail: email, userName: user.userName,userRole: user.userRole},12);
        return {message: "login sucessfull.", token, userId: user.id, userRole: user.userRole,userName: user.userName, userPhoneNumber: user.userPhoneNumber, success: true};
    
    
}

export const signupController = async(email: string,userName: string,phoneNumber: string,password: string) => {    
    const user = await prisma.user.findFirst({where: {userEmail: email}});
    if(user)
    {
        devLogger("user already exists.")
        return {message: "Email already exists.", status: 401, success: false};

    }

    const hash = await bcrypt.hash(password, 10);

    const newUser = await prisma.user.create({
        data: {
            userEmail: email,
            userName: userName,
            userPhoneNumber: phoneNumber,
            userPassword: hash,
        }
    })


    const token = jwtTokenIssuer({userEmail: email,userName,userRole: newUser.userRole}, 12)

    return {
        message: "user created successfully.",
        userEmail: email,
        userName: userName,
        token: token,
        userId: newUser.id,
        userRole: newUser.userRole,
        success: true
    }
}

interface Products {
    id: string,
    productTitle: string,
    productDescription: string,
    productPrice: Decimal,
    productImageURLs: string[], 
    createdAt: Date,
}

interface ProductsResponse {
    data: Products[] | null,
    message: string,
    status: number,   
    success: boolean,
}



// GET REQUESTS
export const getOrdersController = async(userEmail: string) => {
    const user = await prisma.user.findUnique({where: {userEmail}});
    if(!user)
    {
        return {data: null, message: "User Email Does Not Exists. Please Sign Up.", status: 404, success: false};
    }
    const order = await prisma.order.findMany({
        where: {
            userId: user.id,
        },
        select: {
            id: true,
            orderStatus: true,
            orderedAt: true,
            userId: true,
            deliveryDate: true,
            order: {
                select: {
                    id: true, 
                    productId: true,
                    product: {
                        select: {
                            productTitle: true,
                            productPrice: true,
                            productImageURLs: true,
                            productQuantity: true,
                            productYear: true,
        }}}}}});
        if(!order || order.length === 0)
        {  
            return {data: null, message: "no orders yet!", status: 404, success: false};
        }

    const serilizedOrders = order.map((item) => ({
        ...item,
        order: item.order.map((i) => ({
            ...i.product,
            id: i.id,
            productId: i.productId,
            productPrice: Number(i.product.productPrice),
        }))
    }))
    
    return {data: serilizedOrders, message: "orders fetched successfully.", status: 200, success: true};
}

export const getRoomMessagesController = async(userEmail: string, roomId: string) => {
    const user = await prisma.user.findUnique({where: {userEmail}});
    if(!user)
    {
        return {data: null, message: "User Email Does Not Exists. Please Sign Up.", status: 404, success: false};
    }
    const room = await prisma.room.findUnique({where: {id: roomId}, select: {customerId: true, productOwnerId: true,message: {select: {id: true,message: true, receiverId: true, senderId: true}}, product: {select: {productTitle: true ,productUploaderId: true, uploader: {select: {userName: true}}}}}})
    if(!room)
    {
        return {data: null, message: "Room id does not exists.", status: 404, success: false};
    }

    return {data: room, message: "room messages fetched successfully.", status: 200, success: true}
}

export const getMessageRoomController = async(userEmail: string) => {
    const user = await prisma.user.findUnique({where: {userEmail}});
    if(!user)
    {
        return {data: null, message: "User Email Does Not Exists. Please Sign Up.", status: 404, success: false}
    }
    
    const room = await prisma.room.findMany({
        where: {OR: [{customerId: user.id},{productOwnerId: user.id}]},
        select: {id: true, productId: true, product: {select: {productTitle: true,productImageURLs: true}},customer: {select: {userName: true}}, message: {select: {message: true, sentAt: true, readStatus: true, senderId: true}}},
    })


    if(!room || room.length === 0)
    {
        
        return {data: null, message: "No Rooms Yet.", status: 404, success: false}
    }

    const serilizedRooms = room.map((item) => ({
        ...item,
        message: item.message.map((i) => ({
            ...i,
            sentAt: String(i.sentAt)
        }))
    }))

    return {data: serilizedRooms, message: "Messages fetched successfully.", status: 200, success: true}
}

export const getProductsController = async(): Promise<ProductsResponse> => {
    const products = await prisma.product.findMany({where: {}});
    if(!products || products.length === 0)
    {
        return {data: null, message: "No products available yet.", status: 404, success: false};
    }
    
    return {data: products, message: "products retrived successfully.", status: 200, success: true};
}

export const getUserController = async(userEmail: string) => {
    const user = await prisma.user.findUnique({where: {userEmail}, select:{id: true,userEmail: true,userName: true,userPhoneNumber: true,userLocation: true, userBio: true, userRole: true,createdAt: true, _count: {select: {order: true}}}});
    if(!user)
    {
        return {data: null,message: "email not found, please sing up.", status: 404, success: false};
    }
    
    return {data: user, message: "user details fetched successfully.", status: 200, success: true};
}

 


// POST REQUESTS
export const createOrderController = async(userEmail: string, productId: string) => {
    const user = await prisma.user.findUnique({where: {userEmail}});
    if(!user)
    {
        return {data: null, message: "User Email Does Not Exists. Please Sign Up.", status: 404, success: false};
    }

    try{
        const newOrder = await prisma.order.create({
            data: {
                userId: user.id,
                order: {
                    create: {
                        productId: productId,
                    }
                }
            }
        })

        return {data: newOrder, message: "order placed successfully.", status: 201, success: true};

    }catch(error)
    {
        return {data: null, message: "something went wrong while placing order. please try again after some time.", status: 400, success: false};
    }
}

export const createMessageRoomController = async(userEmail: string, productId: string, productOwnerId: string) => {
    const user = await prisma.user.findUnique({where: {userEmail}});
    if(!user)
    {
        return {data: null, message: "User Email Does Not Exists. Please Sign Up.", status: 404, success: false};

    }
    const product = await prisma.product.findFirst({where: {id: productId}});
    if(!product)
    {
        return {data: null, message: "Product not found.", status: 404, success: false};

    }
    
    try{

        const room = await prisma.room.upsert({
            where: {
                productId_customerId: { productId, customerId: user.id}
            },
            create: {
                    productId: productId,
                    productOwnerId: productOwnerId,
                    customerId: user.id,
                
            },
            update: {}
        });

        const isNew = room.createdAt.getTime() === room.updatedAt.getTime();

        return {data: room, message: isNew? "room created successfully" : "room already exists", status: isNew? 201 : 200, success: true}
    }catch(error)
    {
        devLogger(error)
        return {data: null, message: "unable to create new room.", status: 400, success: false};
    }

}

export const messageController = async(userEmail: string, userMessage: string,receiverId: string,roomId: string) => {

    const user = await prisma.user.findUnique({
        where: {userEmail}
    })
    if(!user)
    {
        return {data: null, message: "Email Not Found. Please Sign In.", status: 404, success: false}
    }
    
    const receiver = await prisma.user.findUnique({where: {id: receiverId} });
    if(!receiver)
    {        
        return {data: null, message: "Receiver Id Not Found.", status: 404, success: false}
    }

    const message = await prisma.message.create({data: {message: userMessage, senderId: user.id, receiverId: receiver.id, roomId: roomId}})
    if(!message)
    {
        return {data: null, message: "Unable to add message.", status: 400, success: false}

    }

    return {data: message, message: "Message created successfully.", status: 201, success: true}
} 


export const getUnreadMsgCountController = async(userEmail: string, roomId: string) => {

    const user = await prisma.user.findUnique({where: {userEmail}});
    if(!user)
    {
        return {data: null,message: "email not found, please sing up.", status: 404, success: false};
    }
    const room = await prisma.room.findUnique(
        {
            where: {
                id: roomId
            },
        })

    if(!room)
    {
        return {data: null,message: "room not found.", status: 404, success: false};
        
    }
    const message = await prisma.message.findMany({
        where: {
            roomId,
            senderId: {not: user.id},
            readStatus: false
        }})
    
    const unreadCount = message?.length || 0;
    return {data: unreadCount, message: "unread count fetched successfully.", status: 200, success: true}
}  


// UPDATE REQUESTS

export const updateUserDetailsController = async(email: string,data: {userName?: string,userEmail?:string,userPhoneNumber?: string,userLocation?: string,userBio?: string,userPassword?: string}) => {
    const user = await prisma.user.findUnique({where: {userEmail: email}});
    if(!user)
    {
        return {data: null, message: "Email Not Found. Please Sign In.", status: 404, success: false}
        
    }
    try{

        if(data.userEmail && data.userEmail !== email)
        {
            const newEmail = await prisma.user.findUnique({where: {userEmail: data.userEmail}});
            if(newEmail)
            {
                return {data: null, message: "Email already in use.", status: 409, success: false}
            }

        }

        if(data.userPassword)
        {
            data.userPassword = await bcrypt.hash(data.userPassword, 10);
        }

            const updateUser = await prisma.user.update({
                where: {id: user.id}, 
                data,
            })
            return {data: updateUser, message: "user details updated successfully.", status: 200, success: true}
    }
    catch(error)
    {
        return {data: null, message: "unable to update user, please try again.", status: 400, success: false}
    }

}


export const updateMessageReadStatusController = async(userEmail: string,roomId: string) => {
    const user = await prisma.user.findUnique({where: {userEmail}});
    if(!user)
    {
        return {data: null, message: "Email not found, Please signup.", status: 404, success: false};
    }
    
    const room = await prisma.room.findUnique({where: {id: roomId}})
    if(!room)
    {
        return {data: null, message: "room not found.", status: 404, success: false};
    }

    try{
        
        const updateMessageStatus = await prisma.message.updateMany({where: {roomId: room.id, senderId: { not: user.id},readStatus: false}, data: { readStatus: true}});
        return {data: updateMessageStatus, message: "message read status updated successfully.", status: 200, success: true}

    }catch(error)
    {
        return {data: null, message: "unable to update message read status", status: 400, success: false};
    }

}

// DELETE REQUESTS
export const deleteUserProfileController = async(userEmail: string) => {
    const user = await prisma.user.findUnique({where: {userEmail}});
    if(!user)
    {
        return {data: null, message: "Email Not Found. Please Sign In.", status: 404, success: false}
    }

    try{
        const deleteUser = await prisma.user.delete({where: {id: user.id}})

        return {data: deleteUser, message: "user deleted successfully.", status: 200, success: true}
    }catch(error)
    {
        return {data: null, message: "unable to delete user.", status: 400, success: false}
    }
}


export const deleteOrderController = async(userEmail: string,orderId: string) => {
    const user = await prisma.user.findUnique({where: {userEmail}});
    if(!user)
    {
        return {data: null, message: "email not found.", status: 404, success: false}
    }
    const order = await prisma.order.findFirst({where: {id: orderId}})
    if(!order)
    {
        return {data: null, message: "order not found.", status: 404, success: false}

    }
    try{
        const hours48 = 48 * 60 * 60 * 1000
        const orderedAt = new Date(order.orderedAt).getTime()
        const now = Date.now()
        const isCancelAllowed = now - orderedAt <= hours48
        if(isCancelAllowed)
        {
            const deleteOrder = await prisma.order.delete({where: {id: orderId, userId: user.id}})
            return {data: deleteOrder, message: "order deleted successfully.", status: 200, success: true}   
            
        }
        else{
            return {data: null, message: "not allowed to cancel order after 48h. You can contact the owner, if you require any additional help.", status: 400, success: false}   
            
        }
    }
    catch(error)
    {
        return {data: null, message: "unable to delete order", status: 500, success: false}   
        
    }
}