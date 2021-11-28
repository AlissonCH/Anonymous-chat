import express from 'express';
import http from 'http';
import { Server } from 'socket.io';
// import { userJoin, userLeft, getUsers } from './util/users';

const app = express();

const server = http.createServer(app);
const io = new Server(server, { cors: { origin: 'http://localhost:3000' } });

io.on('connection', (socket) => {
  console.log('Cliente conectado');
  // socket.join('myChat');
  let currentRoom = 0;
  socket.on('join_room', (data) => {
    socket.join(data.id);
    currentRoom = data.id;
    console.info(`User with ID : ${socket.id} joined to room ${data.id}`);
  });
  socket.on('send_message', (data) => {
    console.log(currentRoom, data);
    if (currentRoom === data.id) {
      socket.to(data.room).emit('receive_message', data);
    }
  });

  // socket.on('handle-connection', (username: string) => {
  //   console.log(username);

  //   if (!userJoin(socket.id, username)) {
  //     socket.emit('username-taken');
  //   } else {
  //     socket.emit('username-submitted-successfully');
  //     io.to('myChat').emit('get-connected-users', getUsers());
  //   }
  // });

  // socket.on('message', (message: { message: string; username: string }) => {
  //   socket.broadcast.to('myChat').emit('receive-message', message);
  // });

  socket.on('disconnect', () => {
    console.log('User disconnected', socket.id);
  });
});

server.listen(5000, () => console.log('Server started on port 5000...'));
