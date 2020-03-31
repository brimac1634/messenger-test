import React, { useState, useEffect } from 'react';
import { withRouter } from 'react-router-dom';
import axios from "axios";
import Cookies from 'universal-cookie';

import MessengerInput from "../messenger-input/messenger-input.component";
import MessageList from "../message-list/message-list.component";

import './messenger-console.styles.scss';

const MessengerConsole = ({ match, user }) => {
    const [messages, setMessages] = useState(null);

    const conversationId = match.params.conversationId;

    useEffect(() => {
        const token = new Cookies().get('authToken')
        axios({
            method: 'GET',
            url: `http://localhost:5000/messages/${conversationId}?page=0`,
            headers: {
                'Authorization': `Bearer ${token}`
            }
        }).then(({ data }) => {
            console.log(data)
            setMessages(data);
        }).catch(err => console.log(err))
    }, [conversationId])

    return ( 
        <div className='messenger-console'>
            <MessageList messages={messages} user={user} />
            <MessengerInput conversationId={conversationId} />
        </div>
     );
}
 
export default withRouter(MessengerConsole);