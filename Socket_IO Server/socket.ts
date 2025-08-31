import { Socket, Server } from "socket.io";
import express from "express";
import cors from "cors";
import { createServer } from "http";
import { count } from "console";


type handleChatProps = {
    id?: string,
    ownerId: string,
    receiverId: string,
    message: string,
    sentAt?: Date
}

const app = express();
app.use(cors())
app.use(express.json())
const httpServer = createServer(app);




const io = new Server(httpServer, {
    cors: {
        origin: "*",
        methods: ["GET", "POST"],
    }
})

io.on("connection", (socket: Socket) => {
    console.log("Connected",socket.id)

    socket.on("joinRoom", (roomId: string) => {
        socket.join(roomId)
        console.log(`Socket id ${socket.id} connected to the room ${roomId}`)

        const room = io.sockets.adapter.rooms.get(roomId)
        const socketCount = room? room.size : 0;
        

    })

    socket.on("sendMessage", (msg: handleChatProps, roomId: string) => {
        console.log("message received", msg)
        socket.to(roomId).emit("message", msg)

    })
    socket.on("disconnect", () => {
        console.log("Client Disconnected", socket.id)
    })

})

const PORT = 3001;
httpServer.listen(PORT, () => {
    console.log(`server running  on port ${PORT}`)
})