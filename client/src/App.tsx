import { useRef, useEffect, useState } from 'react';
import { Route, Routes } from 'react-router';
import { HashRouter } from 'react-router-dom';
import { io, Socket } from 'socket.io-client';
import GrupalChats from './pages/GrupalChats';
import Nav from './components/Nav';
import './styles/App.css';
import { getRandomArbitrary, unique } from './utils/utils';
import { MessageProperties, RoomProperties, UsersProperties } from './properties/properties';

function App() {
  const socketClient = useRef<Socket>();
  const initialCategories = [
    {
      roomName: 'Harry Potter',
      roomId: 10001,
    },
    {
      roomName: 'Naruto',
      roomId: 10002,
    },
    {
      roomName: 'BTS',
      roomId: 10003,
    },
  ];
  const newCategories = [...initialCategories, JSON.parse(window.localStorage.getItem('room') || '{}')];
  const [allRooms, setAllRooms] = useState<RoomProperties[]>(newCategories);
  const [room, setRoom] = useState<RoomProperties>({ roomId: 0, roomName: '' });
  const [currentMessage, setCurrentMessage] = useState('');
  const [allMessages, setAllMessages] = useState<MessageProperties[]>([]);
  const [username, setUsername] = useState('');
  const [allUsers, setAllUsers] = useState<UsersProperties[]>([]);

  const messageData = {
    roomName: room.roomName,
    roomId: room.roomId,
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
        if (room.roomId !== 0) {
          const messages = JSON.parse(localStorage.getItem(`${room.roomId}`) || '[]');
          socketClient.current.emit('join_room', { room: room.roomId, username });
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
    // localStorage.clear();
    // allRooms.forEach((room) => localStorage.removeItem(`${room.roomId}`));
  }, []);
  useEffect(() => {
    if (socketClient.current?.connected) {
      if (currentMessage !== '') {
        setAllMessages([...allMessages, messageData]);
        socketClient.current.emit('send_message', messageData);
        localStorage.setItem(`${room.roomId}`, JSON.stringify([...allMessages, messageData]));
      }
      socketClient.current.on('receive_message', (data: any) => {
        setAllUsers(unique(allUsers, data, 'username', 'author'));
        setAllMessages([...allMessages, data]);
        localStorage.setItem(`${room.roomId}`, JSON.stringify([...allMessages, data]));
      });
    }

    return () => {
      socketClient.current?.off();
      setCurrentMessage('');
    };
  }, [allMessages, currentMessage, allRooms, room]);

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
              allRooms={allRooms}
              setAllRooms={setAllRooms}
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
