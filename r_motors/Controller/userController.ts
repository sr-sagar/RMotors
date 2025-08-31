import { prisma } from "@/lib/prisma";
import bcrypt from "bcrypt";
import { jwtTokenIssuer } from '../lib/jwtTokenIssuer';
export const loginController = async(email:string, password:string) => {

        // await pool();
        
        const user = await  prisma.user.findFirst({where: {userEmail: email}});
        if(!user){
            throw new Error("Email not found. Please Sign Up.")
        }
        const isMatch = await bcrypt.compare(password, user.userPassword);
        if(!isMatch)
        {
            throw new Error("incorrect password. Please try again.")
        }
        const token = jwtTokenIssuer({userEmail: email, userName: user.userName,userRole: user.userRole},12);
        return {message: "login sucessfull.", token, userId: user.id, userRole: user.userRole};
    
    
}

export const signupController = async(email: string,userName: string,phoneNumber: string,password: string) => {    
    const user = await prisma.user.findFirst({where: {userEmail: email}});
    if(user)
    {
        console.log("user already exists.");
        throw new Error("Email already exiests.");
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
    }
}

interface Products {
    id: string,
    productTitle: string,
    productDescription: string,
    productPrice: string,
    productImageURLs: string[], 
    createdAt: Date,
}

interface ProductsResponse {
    products: Products[],
    message: string,
    status: number,   
}
export const getProductsController = async(): Promise<ProductsResponse> => {
    const products = await prisma.product.findMany({where: {}});
    if(!products || products.length === 0)
    {
        return {products: [], message: "No products available yet.", status: 404};
    }
    
    return {products: products, message: "products retrived successfully.", status: 200};
}

export const messageController = async(userEmail: string, userMessage: string,receiverId: string) => {

    const user = await prisma.user.findUnique({
        where: {userEmail}
    })
    if(!user)
    {
        throw new Error("Email Not Found. Please Sign In.");
    }
    
    const receiver = await prisma.user.findUnique({where: {id: receiverId} });
    if(!receiver)
    {
        
        throw new Error("Receiver Id Not Found");
    }

    const message = await prisma.message.create({data: {message: userMessage, ownerId: user.id, receiverId: receiver.id}})
    if(!message)
    {
        throw new Error("Unable to add message.");
    }

    return {Message: message, message: "message created successfully.", status: 201}
} 


export const messageGetController = async(userEmail: string) => {
    const user = await prisma.user.findUnique({where: {userEmail}});
    if(!user)
    {
        throw new Error("User Email Does Not Exists. Please Sign Up.");
    }
    
    const messages = await prisma.message.findMany({})
    if(!messages || messages.length === 0)
    {
        
        throw new Error("No Messages Yet/An Error Has Occured.");
    }

    return {messages: messages, message: "Messages fetched successfully.", status: 200}
}