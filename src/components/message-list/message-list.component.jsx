import React, { useRef } from 'react';

import './message-list.styles.scss';
import { useEffect } from 'react';

const MessageList = ({ messages, user }) => {
    const latestMessage = useRef(null);
    
    useEffect(() => {
        if (latestMessage.current) latestMessage.current.scrollIntoView({ behavior: 'smooth' });
    }, [messages])

    return ( 
        <div className='message-list'>
            <div className='list'>
                {
                    messages &&
                    messages.map((message, i) => {
                        const isMe = message.user === user._id;
                        return (
                            <div 
                                className={`message ${isMe ? 'me' : 'recipient'}`} 
                                key={i} 
                                ref={i === messages.length - 1 ? latestMessage : null}
                            >
                                <p>{message.message}</p>
                                <span>{new Date(message.timestamp).toLocaleTimeString('en-US')}</span>
                            </div>
                        )
                    })
                }
            </div>
        </div>
     );
}
 
export default MessageList;