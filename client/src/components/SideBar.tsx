import { useEffect, useState } from 'react';
import { getRandomArbitrary } from '../utils/utils';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faSearch, faPlus } from '@fortawesome/free-solid-svg-icons';
import {
  Categorie,
  Wrapper,
  Title,
  Input,
  Label,
  InputCustom,
  Display,
  Circle,
  Form,
  Listas,
} from './styled/SideBar.styled';

function SideBar({
  username,
  setRoom,
  allUsers,
  allRooms,
  setAllRooms,
  setUsername,
}: {
  username: String;
  setUsername: any;
  setRoom: any;
  allUsers: any;
  allRooms: any;
  setAllRooms: any;
}) {
  const [newCategorieName, setNewCategorieName] = useState('');
  const [change, setChange] = useState(false);
  const [newCategorie, setNewCategorie] = useState(false);
  const [categoriesFiltered, setCategoriesFiltered] = useState(allRooms);

  useEffect(() => {
    setRoom({
      roomName: 'Harry Potter',
      roomId: 10001,
    });
  }, []);

  const createCategory = (e: any) => {
    e.preventDefault();
    const room = { roomName: newCategorieName, roomId: getRandomArbitrary() };
    const allRoomsUpdated = [...allRooms, room];
    setAllRooms(allRoomsUpdated);
    setRoom(room);
    localStorage.setItem('room', JSON.stringify(room));
  };

  const searchCategorie = (e: any) => {
    setAllRooms(categoriesFiltered);
    if (e.target.value !== '') {
      const roomsFiltered = allRooms.filter((room: any) =>
        room.roomName.toLowerCase().includes(e.target.value.toLowerCase())
      );
      setAllRooms(roomsFiltered);
    } else {
      setAllRooms(categoriesFiltered);
    }
  };

  const showAllCategories = allRooms.map((room: any) => (
    <Categorie
      key={room.roomId}
      onClick={() => {
        setRoom(room);
      }}
    >
      {room.roomName}
    </Categorie>
  ));

  const showAllUsers = allUsers.map((user: any) => <div key={user.username}>{user.username}</div>);
  const toggleState = (setState: any, state: boolean) => {
    if (!state) {
      setState(true);
    } else {
      setState(false);
    }
  };

  return (
    <Wrapper>
      <Title>
        {username}
        <FontAwesomeIcon icon={faEdit} onClick={() => toggleState(setChange, change)} />
      </Title>
      {change ? (
        <Input type='text' placeholder='Nuevo nombre' onChange={(e) => setUsername(e.target.value)} />
      ) : (
        <div />
      )}
      <Label>
        <FontAwesomeIcon icon={faSearch} />
        <InputCustom type='text' placeholder='Buscar...' onChange={searchCategorie} />
      </Label>
      <Display>
        <h4>Todas las categorías</h4>
        <Circle>
          <FontAwesomeIcon icon={faPlus} onClick={() => toggleState(setNewCategorie, newCategorie)} />
        </Circle>
      </Display>
      {newCategorie ? (
        <Form onSubmit={createCategory}>
          <label>Nombre de categoría</label>
          <Input
            type='text'
            placeholder='Música...'
            onChange={(e) => {
              setNewCategorieName(e.target.value);
            }}
          />
        </Form>
      ) : (
        <div />
      )}
      <Listas>{showAllCategories}</Listas>
      <Listas>
        <h4>Usuarios activos</h4>
        {showAllUsers}
      </Listas>
    </Wrapper>
  );
}

export default SideBar;
