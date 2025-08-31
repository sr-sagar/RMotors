import { useEffect,useRef } from 'react';
import {Socket, io} from "socket.io-client";
import { handleChatProps } from '../../utils/messageFetcher';

type ServerToClient = {
    message: (msg: handleChatProps) => void
}

type ClientToServer = {
    sendMessage: (msg: handleChatProps, roomId: string) => void,
    joinRoom: (room: string) => void,
    // leaveRoom: (room: string) => void
}

export const useSocket = (roomId: string) => {
    const socketRef = useRef<Socket<ServerToClient,ClientToServer> | null>(null)
    const serverPath = "/";
    useEffect(() => {
        if(socketRef.current) return
        socketRef.current = io("http://localhost:3001", {transports: ["websocket", "polling"],});

        socketRef.current.emit("joinRoom", roomId);

        // socketRef.current.emit("sendMessage", )


        

        
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
