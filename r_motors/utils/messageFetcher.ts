import { postRequestWithAuth } from "./postRequestWithAuth"
 
export type NormalizedChatProp = {
    id?: string,
    senderId: string,
    receiverId: string,
    message: string,
    roomId?: string,
    productUploaderId?: string
}



export const handleChat = async(chat?: string | undefined,userEmail?: string,receiverID?: string,roomID?: string): Promise<NormalizedChatProp> => {

    const sendChatRequest = await postRequestWithAuth(`message/${roomID}`,{userEmail: userEmail, userMessage: chat, receiverId: receiverID,roomId: roomID} )

    const { id,senderId,receiverId,message,roomId} = await sendChatRequest.res.data; 

    return {id, senderId,receiverId,message,roomId}
    
  }