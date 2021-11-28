import { useRef, useEffect, useState } from 'react';
import { Route, Routes } from 'react-router';
import { HashRouter } from 'react-router-dom';
import { io, Socket } from 'socket.io-client';
import GrupalChats from './pages/GrupalChats';
import Nav from './components/Nav';
import './styles/App.css';
import { getRandomArbitrary } from './utils/utils';

function App() {
  // const [connected, setConnected] = useState(false);
  interface StateProperties {
    roomId: number;
    author: string;
    message: string;
    time: any;
  }
  interface RoomProperties {
    id: number;
    name: string;
  }
  const socketClient = useRef<Socket>();
  const [room, setRoom] = useState<RoomProperties>({ id: 0, name: '' });
  const [currentMessage, setCurrentMessage] = useState('');
  const [allMessages, setAllMessages] = useState<StateProperties[]>([]);
  const [username, setUsername] = useState('');

  const messageData = {
    roomId: room?.id,
    author: username,
    message: currentMessage,
    time:
      new Date(Date.now()).getHours() +
      ':' +
      new Date(Date.now()).getMinutes() +
      ':' +
      new Date(Date.now()).getSeconds(),
  };
  useEffect(() => {
    socketClient.current = io('http://localhost:5000');
    if (socketClient.current) {
      if (room.id !== 0) {
        const messages = JSON.parse(localStorage.getItem(`${room.id}`) || '[]');
        socketClient.current.emit('join_room', room.id);
        if (messages?.length !== 0) {
          setAllMessages(messages);
        } else {
          setAllMessages([]);
        }
      }

      // localStorage.setItem(`room${}`)

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
  }, [room]);

  useEffect(() => {
    setUsername(`Anónimo${getRandomArbitrary()}`);
    localStorage.clear();
  }, []);

  useEffect(() => {
    if (socketClient.current) {
      if (currentMessage !== '') {
        setAllMessages([...allMessages, messageData]);
        socketClient.current.emit('send_message', messageData);
        localStorage.setItem(`${room.id}`, JSON.stringify([...allMessages, messageData]));
      }
      socketClient.current.on('receive_message', (data: any) => {
        setAllMessages([...allMessages, data]);
        localStorage.setItem(`${room.id}`, JSON.stringify([...allMessages, data]));
      });
    }
    return () => {
      socketClient.current?.off();
      setCurrentMessage('');
    };
  }, [allMessages, currentMessage]);
  return (
    <HashRouter>
      <Nav />
      <Routes>
        <Route
          path='/'
          element={
            <GrupalChats
              username={username}
              setUsername={setUsername}
              room={room}
              setRoom={setRoom}
              currentMessage={currentMessage}
              setCurrentMessage={setCurrentMessage}
              allMessages={allMessages}
            />
          }
        ></Route>
        <Route path='/chats'></Route>
        <Route path='/usuarios'></Route>
      </Routes>
    </HashRouter>
  );
}

export default App;
