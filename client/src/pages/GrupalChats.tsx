import { useState } from 'react';
import Chat from '../components/Chat';

function GrupalChats({ socket }: { socket: any }) {
  const [username, setUsername] = useState('');
  const [room, setRoom] = useState('');
  const joinRoom = () => {
    if (socket) {
      socket.emit('join_room', room);
    }
  };
  return (
    <div>
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
      <Chat socket={socket} room={room} username={username} />
    </div>
  );
}

export default GrupalChats;
