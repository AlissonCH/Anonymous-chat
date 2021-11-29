import Chat from '../components/Chat';
import styled from 'styled-components';
import SideBar from '../components/SideBar';

const Wrapper = styled.section`
  display: flex;
  width: 100%;
  height: 100vh;
`;

function GrupalChats({
  username,
  setUsername,
  room,
  setRoom,
  currentMessage,
  setCurrentMessage,
  allMessages,
  allUsers,
  allRooms,
  setAllRooms,
}: {
  username: string;
  setUsername: any;
  room: any;
  setRoom: any;
  currentMessage: string;
  setCurrentMessage: any;
  allMessages: any;
  allUsers: any;
  allRooms: any;
  setAllRooms: any;
}) {
  return (
    <Wrapper>
      <SideBar
        username={username}
        setUsername={setUsername}
        setRoom={setRoom}
        allUsers={allUsers}
        allRooms={allRooms}
        setAllRooms={setAllRooms}
      />
      <Chat
        room={room}
        currentMessage={currentMessage}
        setCurrentMessage={setCurrentMessage}
        allMessages={allMessages}
      />
    </Wrapper>
  );
}

export default GrupalChats;
