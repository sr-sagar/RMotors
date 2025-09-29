import { Socket, Server } from "socket.io";
import express from "express";
import cors from "cors";
import { createServer } from "http";



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


app.get("/healthz", (_req, res) => res.sendStatus(200));

const io = new Server(httpServer, {
    cors: {
        origin: ["https://rmotors-theta.vercel.app","http://localhost:3000"],
        methods: ["GET", "POST"],
        credentials: true,
    }
})

io.on("connection", (socket: Socket) => {
    console.log("Connected",socket.id)

    socket.on("joinRoom", (roomId: string) => {
        socket.join(roomId)
        console.log(`Socket id ${socket.id} connected to the room ${roomId}`)

        

    })

    socket.on("sendMessage", (msg: handleChatProps,roomId: string ) => {
        console.log("message received", msg)
        socket.to(roomId).emit("message", msg)
         

        // io.to(roomId).emit("unreadMessage", roomId, 1);
    })


    socket.on("disconnect", () => {
        console.log("Client Disconnected", socket.id)
    })

})

const PORT = process.env.PORT || 3001;
httpServer.listen(PORT, () => {
    console.log(`server running  on port ${PORT}`)
})