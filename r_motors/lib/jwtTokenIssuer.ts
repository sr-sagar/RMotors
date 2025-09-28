import jwt from "jsonwebtoken";
import { devLogger } from '../utils/devLogger';

export const jwtTokenIssuer = (payload: object ,expiresIn: number): string | undefined => {
    try{
        const secret = process.env.JWT_SECRET!;
        if(!secret) throw new Error("JWT_SECRET not set in environmant variable.");
        const token = jwt.sign(payload,secret,{ expiresIn: `${expiresIn}h` })
        return token;
        }catch(error)
        {
            devLogger("JWT signing error.", error);
            return undefined

        }
}
