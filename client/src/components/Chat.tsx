import { useState } from 'react';
import Message from './messages/Message';
import { Section, ChatSection, Form, Input, Button, Title } from './styled/Chat.styled';

function Chat({
  room,
  setCurrentMessage,
  allMessages,
}: {
  room: any;
  currentMessage: string;
  setCurrentMessage: any;
  allMessages: any;
}) {
  const [messageInput, setMessageInput] = useState('');
  const showMessages = allMessages?.map((message: any) => <Message message={message} />);

  return (
    <Section>
      <ChatSection>
        <Title>{room.roomName}</Title>
        {showMessages}
      </ChatSection>
      <Form
        onSubmit={(e) => {
          e.preventDefault();
          setCurrentMessage(messageInput);
          setMessageInput('');
        }}
      >
        <Input
          type='text'
          placeholder='Hola...'
          onChange={(e) => {
            setMessageInput(e.target.value);
          }}
          value={messageInput}
        />
        <Button>Enviar</Button>
      </Form>
    </Section>
  );
}

export default Chat;
