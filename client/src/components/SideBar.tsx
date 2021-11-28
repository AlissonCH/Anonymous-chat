import { useEffect, useState } from 'react';
import styled from 'styled-components';
import { getRandomArbitrary } from '../utils/utils';

const Title = styled.h1`
  font-size: 1.5em;
  text-align: center;
  color: palevioletred;
`;

const Wrapper = styled.section`
  width: 30%;
`;

function SideBar({
  username,
  room,
  setRoom,
  allUsers,
  allRooms,
  setAllRooms,
}: {
  username: String;
  room: any;
  setRoom: any;
  allUsers: any;
  allRooms: any;
  setAllRooms: any;
}) {
  const [newCategorieName, setNewCategorieName] = useState('');

  const createCategory = () => {
    const allRoomsUpdated = [...allRooms, { roomName: newCategorieName, roomId: getRandomArbitrary() }];
    setAllRooms(allRoomsUpdated);
    setRoom({ roomName: newCategorieName, roomId: getRandomArbitrary() });
    localStorage.setItem('room', JSON.stringify({ roomName: newCategorieName, roomId: getRandomArbitrary() }));
  };

  useEffect(() => {
    setRoom({
      roomName: 'Harry Potter',
      roomId: 10001,
    });
  }, []);

  const showAllCategories = allRooms.map((room: any) => (
    <div
      key={room.roomId}
      onClick={() => {
        setRoom(room);
      }}
    >
      {room.roomName}
    </div>
  ));
  const showAllUsers = allUsers.map((user: any) => (
    <div
      key={user.username}
      // onClick={() => {
      //   setRoom(room);
      // }}
    >
      {user.username}
    </div>
  ));
  return (
    <Wrapper>
      <label>{username}</label>
      <input placeholder='buscar...' />
      <button>Crear nueva categoría</button>
      <input
        type='text'
        placeholder='Nombre de nueva categoría'
        onChange={(e) => {
          setNewCategorieName(e.target.value);
        }}
      />
      <button onClick={createCategory}>Guardar</button>
      <ul>{showAllCategories}</ul>
      <div>
        <p>Usuarios en línea</p>
        {showAllUsers}
      </div>
    </Wrapper>
  );
}

export default SideBar;
