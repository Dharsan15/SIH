import express from "express";
import { createServer } from "http";
import { Server } from "socket.io";
import cors from "cors";

// Create a new Express application
const app = express();
app.use(cors());

// Create an HTTP server
const server = createServer(app);

// Initialize a new instance of Socket.IO by passing the server object
const io = new Server(server, {
  cors: {
    origin: "http://localhost:3000", // Adjust this to match your client app's URL
    methods: ["GET", "POST"],
  },
});

// Handle client connection
io.on("connection", (socket) => {
  console.log("A user connected:", socket.id);

  // Handle joining a room
  socket.on("joinRoom", (roomName) => {
    socket.join(roomName);
    console.log(`User ${socket.id} joined room: ${roomName}`);
  });

  // Handle leaving a room
  socket.on("leaveRoom", (roomName) => {
    socket.leave(roomName);
    console.log(`User ${socket.id} left room: ${roomName}`);
  });

  // Handle sending a text message
  socket.on("sendMessage", ({ roomName, message }) => {
    console.log(`Message from ${socket.id} to room ${roomName}: ${message}`);
    io.to(roomName).emit("message", message);
  });

  // Handle sending an audio message
  socket.on("sendAudioMessage", ({ roomName, audioBuffer }) => {
    console.log(`Audio message from ${socket.id} to room ${roomName}`);
    io.to(roomName).emit("receiveAudioMessage", audioBuffer);
  });

  // Handle client disconnection
  socket.on("disconnect", () => {
    console.log("A user disconnected:", socket.id);
  });
});

// Start the server on port 3000
const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
