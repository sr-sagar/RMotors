import type { Server } from "http"
import type { Server as IOServer } from "socket.io";
import type { NextApiResponse } from "next";

export type NextApiResponseServerIO = NextApiResponse & {
    socket: NextApiResponse["socket"] & {
        server: Server & {
            io?: IOServer;
        };
    };
};
