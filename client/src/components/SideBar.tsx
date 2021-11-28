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

function SideBar({ username, room, setRoom, allUsers }: { username: String; room: any; setRoom: any; allUsers: any }) {
  interface StateProperties {
    name: string;
    id: number;
  }
  const initialCategories = [
    {
      name: 'Harry Potter',
      id: 10001,
    },
    {
      name: 'Naruto',
      id: 10002,
    },
    {
      name: 'BTS',
      id: 10003,
    },
  ];
  const [allRooms, setAllRooms] = useState<StateProperties[]>(initialCategories);
  const [newCategorieName, setNewCategorieName] = useState('');

  const createCategory = () => {
    const allRoomsUpdated = [...allRooms, { name: newCategorieName, id: getRandomArbitrary() }];
    setAllRooms(allRoomsUpdated);
  };

  useEffect(() => {
    setRoom(initialCategories[0]);
  }, []);

  const showAllCategories = allRooms.map((room: any) => (
    <div
      key={room.id}
      onClick={() => {
        setRoom(room);
      }}
    >
      {room.name}
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
