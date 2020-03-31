import React from 'react';

import './message-list.styles.scss';

const MessageList = ({ messages, user }) => {
    return ( 
        <div className='message-list'>
            {
                messages &&
                messages.map(message => {
                    const isMe = message.user === user._id;
                    return (
                        <div className={`message ${isMe ? 'me' : 'recipient'}`} key={message._id}>
                            <p>{message.message}</p>
                            <span>{new Date(message.timestamp).toLocaleTimeString('en-US')}</span>
                        </div>
                    )
                })
            }
        </div>
     );
}
 
export default MessageList;