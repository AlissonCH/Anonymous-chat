import express from 'express';
import http from 'http';
import { Server } from 'socket.io';

const app = express();

const server = http.createServer(app);
const io = new Server(server, { cors: { origin: 'http://localhost:3000' } });

io.on('connection', (socket) => {
  console.info('Cliente conectado');
  let currentRoom = 0;
  socket.on('join_room', ({ room, username }) => {
    socket.join(room);
    currentRoom = room;
    console.info(`User with ID : ${socket.id} and username ${username} joined to room ${room}`);
  });
  socket.on('send_message', (data) => {
    if (currentRoom === data.roomId) {
      socket.to(data.roomId).emit('receive_message', data);
    }
  });

  socket.on('disconnect', () => {
    console.info('User disconnected', socket.id);
  });
});

server.listen(5000, () => console.info('Server started on port 5000...'));
