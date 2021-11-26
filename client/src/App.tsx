import React, { useRef, useEffect, useState } from 'react';
// import logo from '../assets/logo.svg';
import { io, Socket } from 'socket.io-client';
import './styles/App.css';

function App() {
  // const [username, setUsername] = useState('');
  // const [connected, setConnected] = useState(false);
  const socketClient = useRef<Socket>();

  useEffect(() => {
    socketClient.current = io('http://localhost:5000');

    if (socketClient.current) {
      // setConnected(true);
      // socketClient.current.on('username-submitted-successfully', () => {
      //   setConnected(true);
      // });
      // socketClient.current.on('username-taken', () => {
      //   toast.error('Username is taken');
      // });
      // socketClient.current.on('get-connected-users', (connectedUsers: { id: string; username: string }[]) => {
      //   setConnectedUsers(connectedUsers.filter((user) => user.username !== username));
      // });
      // socketClient.current.on('receive-message', (message: { message: string; username: string }) => {
      //   setMessages((prev) => [...prev, message]);
      // });
    }

    // return () => {
    //   socketClient.current?.disconnect();
    //   socketClient.current = undefined;
    // };
  }, []);

  // const handleConnection = () => {
  //   if (socketClient.current) {
  //     socketClient.current.emit('handle-connection', username);
  //   }
  // };

  return (
    <div className='App'>
      <h1>Hola</h1>
    </div>
  );
}

export default App;
