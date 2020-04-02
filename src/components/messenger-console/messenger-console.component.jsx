import React, { useState, useEffect, useRef } from 'react';
import { withRouter } from 'react-router-dom';
import openSocket from 'socket.io-client';
import axios from "axios";
import Cookies from 'universal-cookie';

import MessengerInput from "../messenger-input/messenger-input.component";
import MessageList from "../message-list/message-list.component";

import './messenger-console.styles.scss';

const MessengerConsole = ({ match, user }) => {
    const [messages, setMessages] = useState([]);
    const [token, setToken] = useState('');
    const [totalMessages, setTotalMessages] = useState(0);
    const [currentPage, setCurrentPage] = useState(0);

    const conversationId = match.params.conversationId;

    useEffect(() => {
        const token = new Cookies().get('authToken')
        setToken(token);
        axios({
            method: 'GET',
            url: `http://localhost:5000/messages/${conversationId}?page=0`,
            headers: {
                'Authorization': `Bearer ${token}`
            }
        }).then(({ data }) => {
            setMessages(data.messages.reverse());
            setTotalMessages(data.totalMessages);
        }).catch(err => console.log(err))
        const socket = openSocket('http://localhost:5000')
        socket.on('connect', () => {      
            socket.emit('subscribe', conversationId);
      }); 
        


        socket.on('message', data => {
            console.log(data)
            if (data.action === 'create') {
                updateMessage(data.message);
            }
        })
    }, [conversationId])

    const prevMessageRef = useRef(null);
    useEffect(() => {
        prevMessageRef.current = messages;
    });

    const updateMessage = message => {
        console.log(message, prevMessageRef.current)
        setMessages([...prevMessageRef.current, message]);
    }

    const loadMoreMessages = () => {
        axios({
            method: 'GET',
            url: `http://localhost:5000/messages/${conversationId}?page=${currentPage + 1}`,
            headers: {
                'Authorization': `Bearer ${token}`
            }
        }).then(({ data }) => {
            setMessages([...data.messages.reverse(), ...messages]);
            setCurrentPage(currentPage + 1);
        }).catch(err => console.log(err))
    }

    return ( 
        <div className='messenger-console'>
            <MessageList messages={messages} user={user} totalMessages={totalMessages} loadMoreMessages={loadMoreMessages} />
            <MessengerInput conversationId={conversationId} />
        </div>
     );
}
 
export default withRouter(MessengerConsole);