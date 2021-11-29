import React from 'react';
import Moment from 'react-moment';
import { MessageReceived, MessageSended, Time } from '../styled/Chat.styled';

const Message = ({ message }: { message: any }) => {
  console.log(message);
  return (
    <div>
      {message?.messageReceived ? (
        <MessageReceived key={message.time} className={message.messageReceived ? 'message received' : 'message sended'}>
          <div className='message-info'>
            <span>{message.author}</span>
            <Time>
              <Moment format='MM/DD/YYYY h:mm:ss'>{Date.now()}</Moment>
            </Time>
          </div>
          <p>{message.message}</p>
        </MessageReceived>
      ) : (
        <MessageSended key={message.time} className={message.messageReceived ? 'message received' : 'message sended'}>
          <div className='message-info'>
            <span>{message.author}</span>{' '}
            <Time>
              <Moment format='MM/DD/YYYY h:mm:ss'>{Date.now()}</Moment>
            </Time>
          </div>
          <p>{message.message}</p>
        </MessageSended>
      )}
    </div>
  );
};

export default Message;
