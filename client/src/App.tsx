import { useRef, useEffect, useState } from 'react';
import { Route, Routes } from 'react-router';
import { HashRouter } from 'react-router-dom';
import { io, Socket } from 'socket.io-client';
import GrupalChats from './pages/GrupalChats';
import Nav from './components/Nav';
import './styles/App.css';
import { getRandomArbitrary } from './utils/utils';

function App() {
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
  interface UsersProperties {
    username: string;
  }

  const socketClient = useRef<Socket>();
  const [room, setRoom] = useState<RoomProperties>({ id: 0, name: '' });
  const [currentMessage, setCurrentMessage] = useState('');
  const [allMessages, setAllMessages] = useState<StateProperties[]>([]);
  const [username, setUsername] = useState('');
  const [allUsers, setAllUsers] = useState<UsersProperties[]>([]);

  const messageData = {
    roomId: room.id,
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
    socketClient.current = io('http://localhost:5000', {
      reconnection: true,
    });
    socketClient.current.on('connect', () => {
      if (socketClient.current?.connected) {
        if (room.id !== 0) {
          const messages = JSON.parse(localStorage.getItem(`${room.id}`) || '[]');
          socketClient.current.emit('join_room', { room: room.id, username });
          if (messages?.length !== 0) {
            setAllMessages(messages);
          } else {
            setAllMessages([]);
          }
        }
      }
    });

    return () => {
      socketClient.current?.disconnect();
      socketClient.current?.off();
      socketClient.current;
    };
  }, [room, username]);

  useEffect(() => {
    setUsername(`Anónimo${getRandomArbitrary()}`);
    localStorage.clear();
  }, []);
  useEffect(() => {
    if (socketClient.current?.connected) {
      if (currentMessage !== '') {
        setAllMessages([...allMessages, messageData]);
        socketClient.current.emit('send_message', messageData);
        localStorage.setItem(`${room.id}`, JSON.stringify([...allMessages, messageData]));
      }
      socketClient.current.on('receive_message', (data: any) => {
        const unique: any = [];
        [...allUsers, { username: data.author }].forEach((item) => {
          const i = unique.findIndex((x: any) => x.username == item.username);
          if (i <= -1) {
            unique.push({ username: item.username });
          }
        });
        setAllUsers(unique);
        setAllMessages([...allMessages, data]);
        localStorage.setItem(`${room.id}`, JSON.stringify([...allMessages, data]));
      });
    }
    return () => {
      socketClient.current?.off();
      setCurrentMessage('');
    };
  }, [allMessages, currentMessage]);
  console.log(allUsers);
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
              allUsers={allUsers}
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
