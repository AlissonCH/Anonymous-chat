import { useRef, useEffect, useState } from 'react';
import { Route, Routes } from 'react-router';
import { BrowserRouter } from 'react-router-dom';
import { io, Socket } from 'socket.io-client';
import Chat from './components/Chat';
import Nav from './components/Nav';
import './styles/App.css';

function App() {
  const [username, setUsername] = useState('');
  const [room, setRoom] = useState('');
  // const [connected, setConnected] = useState(false);
  const socketClient = useRef<Socket>();

  useEffect(() => {
    socketClient.current = io('http://localhost:5000');

    if (socketClient.current) {
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

    return () => {
      socketClient.current?.disconnect();
      socketClient.current;
    };
  }, []);

  const joinRoom = () => {
    if (socketClient.current) {
      socketClient.current.emit('join_room', room);
    }
  };
  return (
    <BrowserRouter>
      <Nav />
      <Routes>
        <Route path='/' element={<Chat socket={socketClient.current} username={username} room={room} />}></Route>
        <Route path='/chats'></Route>
        <Route path='/usuarios'></Route>
      </Routes>
      <h1>Hola</h1>
      <input
        onChange={(e) => {
          setUsername(e.target.value);
        }}
      />
      <input
        onChange={(e) => {
          setRoom(e.target.value);
        }}
      />
      <button onClick={joinRoom}>Unirse a la sala</button>
    </BrowserRouter>
  );
}

export default App;
