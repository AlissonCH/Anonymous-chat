import { useRef, useEffect } from 'react';
import { Route, Routes } from 'react-router';
import { HashRouter } from 'react-router-dom';
import { io, Socket } from 'socket.io-client';
import GrupalChats from './pages/GrupalChats';
import Nav from './components/Nav';
import './styles/App.css';

function App() {
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

  return (
    <HashRouter>
      <Nav />
      <Routes>
        <Route path='/' element={<GrupalChats socket={socketClient.current} />}></Route>
        <Route path='/chats'></Route>
        <Route path='/usuarios'></Route>
      </Routes>
    </HashRouter>
  );
}

export default App;
