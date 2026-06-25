import http from "http";
import app from "./app.js";
import { Server } from "socket.io";
import db from "./db.js";

const server = http.createServer(app);

const io = new Server(server, {
    cors: {
        origin: "*"
    }
});

io.on("connection", (socket) => {
    console.log("User connected:", socket.id);

    socket.on("send_message", async (data) => {
        const { sender_id, receiver_id, message } = data;

        await db.query(
            "INSERT INTO messages(sender_id, receiver_id, message) VALUES (?, ?, ?)",
            [sender_id, receiver_id, message]
        );

        io.emit("receive_message", {
            sender_id,
            receiver_id,
            message
        });
    });

    socket.on("disconnect", () => {
        console.log("User disconnected:", socket.id);
    });
});

const PORT = process.env.PORT || 3000;

server.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});