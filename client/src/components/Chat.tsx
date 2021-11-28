import { useEffect, useState } from 'react';
import styled from 'styled-components';

const Title = styled.h1`
  font-size: 1.5em;
  text-align: center;
  color: palevioletred;
`;

const Section = styled.section`
width: 70%;

flex-direction: column
padding: 4em;
background: papayawhip;
`;

function Chat({
  username,
  room,
  setUsername,
  currentMessage,
  setCurrentMessage,
  allMessages,
}: {
  username: String;
  room: any;
  setUsername: any;
  setRoom: any;
  currentMessage: string;
  setCurrentMessage: any;
  allMessages: any;
}) {
  const [messageInput, setMessageInput] = useState('');
  // const sendMessage = async () => {
  //   if (currentMessage !== '') {
  //     const messageData = {
  //       room,
  //       author: username,
  //       message: currentMessage,
  //       time: new Date(Date.now()).getHours() + ':' + new Date(Date.now()).getMinutes(),
  //     };
  //     // await socket.emit('send_message', messageData);
  //   }
  // };
  // useEffect(() => {
  //   if (socket) {
  //     socket.on('receive_message', (data: { data: any }) => {
  //       console.log(data);
  //     });
  //   }
  // }, [socket]);
  const showMessages = allMessages?.map((message: any) => (
    <div key={message.time}>
      <p>{message.author}</p>
      <p>{message.message}</p>
      <p>{message.time}</p>
    </div>
  ));

  return (
    <Section>
      <div>
        <Title>{room.name}</Title>
      </div>
      <div>{showMessages}</div>
      <div>
        <input
          type='text'
          placeholder='Hola...'
          onChange={(e) => {
            setMessageInput(e.target.value);
          }}
        />
        <button onClick={() => setCurrentMessage(messageInput)}>Enviar</button>
      </div>
    </Section>
  );
}

export default Chat;
