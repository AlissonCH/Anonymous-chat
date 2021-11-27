import React, { useEffect, useState } from 'react';
import styled from 'styled-components';

function Chat({ socket, username, room }: { socket: any; username: any; room: any }) {
  const [currentMessage, setCurrentMessage] = useState('');

  const sendMessage = async () => {
    if (currentMessage !== '') {
      const messageData = {
        room,
        author: username,
        message: currentMessage,
        time: new Date(Date.now()).getHours() + ':' + new Date(Date.now()).getMinutes(),
      };
      await socket.emit('send_message', messageData);
    }
  };
  useEffect(() => {
    if (socket) {
      socket.on('receive_message', (data: { data: any }) => {
        console.log(data);
      });
    }
  }, [socket]);

  const Title = styled.h1`
    font-size: 1.5em;
    text-align: center;
    color: palevioletred;
  `;

  const Wrapper = styled.section`
    padding: 4em;
    background: papayawhip;
  `;

  return (
    <div>
      <Wrapper>
        <Title>Chat grupal</Title>
      </Wrapper>
      <div>
        <input
          type='text'
          placeholder='Hola...'
          onChange={(e) => {
            setCurrentMessage(e.target.value);
          }}
        />
        <button onClick={sendMessage}>Enviar</button>
      </div>
    </div>
  );
}

export default Chat;
