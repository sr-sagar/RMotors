import jwt,{JwtPayload} from "jsonwebtoken";
export const jwtTokenVerifier = (req: Request) => {
    const authHeader = req.headers.get("Authorization");
    const token = authHeader?.split(" ")[1];
    if(!token) throw new Error("token not found.");

    try{
        const decode = jwt.verify(token, process.env.JWT_SECRET!) as JwtPayload;
        if(!decode)
        {
            throw new Error("Token either expired or invalid.");
        }
        return decode;
    }catch(error)
    {
        console.log(error)
        throw new Error("something went wrong");
        
    }


}