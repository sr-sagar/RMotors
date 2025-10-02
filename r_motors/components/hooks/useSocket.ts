import { useEffect,useRef } from 'react';
import {Socket, io} from "socket.io-client";
import { NormalizedChatProp } from '../../utils/messageFetcher';
import { showNotification } from '@/utils/showNotification';

type ServerToClient = {
    message: (msg: NormalizedChatProp) => void
}

type ClientToServer = {
    sendMessage: (msg: NormalizedChatProp, roomId: string) => void,
    joinRoom: (room: string) => void,
    // leaveRoom: (room: string) => void
}



export const useSocket = (roomId: string,userId: string) => {
    const socketRef = useRef<Socket<ServerToClient,ClientToServer> | null>(null)
    const serverPath = "/";
    useEffect(() => {
        if(socketRef.current) return
        socketRef.current = io("https://rmotors.onrender.com", {transports: ["websocket", "polling"],});

        socketRef.current.emit("joinRoom", roomId);

        socketRef.current.on("message", (newMsg : NormalizedChatProp) => {
            if(newMsg.senderId !== userId)
            {
                showNotification("New Chat", newMsg.message)

            }
        })

        

        
        return(() => {
            if(socketRef.current){
                socketRef.current?.disconnect();
                console.log("Socket Disconnected..");
                socketRef.current = null;
            }
        })

    },[roomId])

  return socketRef;
};


// export const useUnreadMsgCounter = (handler: (roomId: string,count: number) => void) => {
//     const socket = useRef<Socket | null>(null)
//     useEffect(() => {
//         socket.current = io("http://localhost:3001", {transports: ["websocket","pooling"]});

//         socket.current.on("unreadMessages", (roomId: string,count: number) => {
//             console.log("unreadMessages", roomId, count)
//             handler(roomId,count)
//         })

//         return () => {
//             socket.current?.disconnect();
//         }
//     },[])

//     return socket;
// }
