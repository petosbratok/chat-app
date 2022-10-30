const express = require("express");
const app = express();
const http = require("http");
const cors = require("cors");
const { Server } = require("socket.io");
const port = 3001
app.use(cors());

const server = http.createServer(app)

const io = new Server(server, {
  cors: {
    origin: "https://gorgeous-eclair-cdb19b.netlify.app",
    methods: ["GET", "POST"],
  }
})

io.on("connection", (socket) => {
  console.log("User Connected:", socket.id);

  socket.on("join_room", (data) => {
    socket.join(data)
    console.log(`User with id: ${socket.id} joined room: ${data}`)
  })

  socket.on("send_message", (data) => {
    socket.to(data.room).emit("receive_message", data)
  })

  socket.on("disconnect", () => {
    console.log("User Disconnected:", socket.id)
  })
})

server.listen(process.env.PORT ||  port, () => {
  console.log('SERVER RUNNING at', port)
})
