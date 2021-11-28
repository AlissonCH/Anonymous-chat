import { useState } from 'react';
import Chat from '../components/Chat';
import styled from 'styled-components';
import SideBar from '../components/SideBar';

const Wrapper = styled.section`
  display: flex;
  width: 100%;
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
}: {
  username: string;
  setUsername: any;
  room: any;
  setRoom: any;
  currentMessage: string;
  setCurrentMessage: any;
  allMessages: any;
  allUsers: any;
}) {
  return (
    <Wrapper>
      <SideBar username={username} room={room} setRoom={setRoom} allUsers={allUsers} />
      <Chat
        room={room}
        setRoom={setRoom}
        username={username}
        setUsername={setUsername}
        currentMessage={currentMessage}
        setCurrentMessage={setCurrentMessage}
        allMessages={allMessages}
      />
    </Wrapper>
  );
}

export default GrupalChats;
