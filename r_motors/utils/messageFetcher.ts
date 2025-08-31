import { postRequestWithAuth } from "./postRequestWithAuth"
 
export type handleChatProps = {
    id?: string,
    ownerId: string,
    receiverId: string,
    message: string,
}

export const handleChat = async(chat?: string | undefined,userEmail?: string,receiverID?: string): Promise<handleChatProps> => {
    const sendChatRequest = await postRequestWithAuth("message",{userEmail: userEmail, userMessage: chat, receiverId: receiverID} )
    const { id,ownerId,receiverId,message } = await sendChatRequest.res.Message; 
    return {id, ownerId,receiverId,message}
    
  }