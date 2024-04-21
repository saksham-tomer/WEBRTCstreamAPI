
import express from 'express'
import cors from 'cors'
import bodyParser from 'body-parser'
import {createServer} from 'http'
import {Server} from 'socket.io'
import handleRoom from './handleRoom'


const app = express()
const httpServer = createServer(app)
app.use(cors())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({entended: false})
const io = new Server(httpServer,{
  maxDisconnectonDuration: 2*60*1000,
  cors: {
    origin: ["http://localhost:3000"]
  },
})

// io.socketsJoin("consultancy");
io.on("connection",(socket)=>{
  const clientCount = io.engine.clientsCount;
  console.log("Successfully connected to the server");
  roomHandler(socket)
  socket.on("disconnect",()=>{
        console.log("No of clients ${clientCount}")
        console.log("user disconnected")
      })

// io.emit("id",(socket)=>{
// io.engine.generateId = (req)=>{
//   return uuid.v4();
// }   
//   }
  // socket.on('iceCandidate',(candidate,room)=>{
  //   socket.to(room).emit('iceCandidate',candidate);
  // })
  // socket.on('joinRoom',(room)=>{
  //   socket.join(room);
  // })
  // socket.on('leaveRoom',(room)=>{
  //   socket.leave(room)
  // })
  //
  // socket.on('disconnect',()=>{
  //   console.log("user disconnected")
  //   socket.in(room).disconnectSockets();
  // })
  // )
  
})



httpServer.listen(4000);


// server.js
// const express = require('express');
// const http = require('http');
// const socketIo = require('socket.io');
//
// const app = express();
// const server = http.createServer(app);
// const io = socketIo(server);
//
// const PORT = process.env.PORT || 3000;
//
// // Store connected peers and their rooms
// const peers = {};
//
// // Socket.io connection logic
// io.on('connection', (socket) => {
//     console.log('a user connected');
//
//     // Handle joining a room
//     socket.on('joinRoom', (roomId, userId) => {
//         socket.join(roomId);
//         peers[socket.id] = { roomId, userId };
//
//         // Notify other clients in the room about the new user
//         socket.to(roomId).emit('userJoined', userId);
//     });
//
//     // Handle offer from a client
//     socket.on('offer', (offer, targetUserId) => {
//         const { roomId } = peers[socket.id];
//
//         // Send the offer to the target user
//         socket.to(roomId).emit('offer', offer, targetUserId);
//     });
//
//     // Handle answer from a client
//     socket.on('answer', (answer, targetUserId) => {
//         const { roomId } = peers[socket.id];
//
//         // Send the answer to the target user
//         socket.to(roomId).emit('answer', answer, targetUserId);
//     });
//
//     // Handle ICE candidate from a client
//     socket.on('iceCandidate', (candidate, targetUserId) => {
//         const { roomId } = peers[socket.id];
//
//         // Send the ICE candidate to the target user
//         socket.to(roomId).emit('iceCandidate', candidate, targetUserId);
//     });
//
//     // Handle disconnect
//     socket.on('disconnect', () => {
//         console.log('user disconnected');
//
//         const { roomId, userId } = peers[socket.id];
//         delete peers[socket.id];
//
//         // Notify other clients in the room about the disconnected user
//         socket.to(roomId).emit('userLeft', userId);
//     });
// });
//
// server.listen(PORT, () => {
//     console.log(`Server is running on port ${PORT}`);
// });

