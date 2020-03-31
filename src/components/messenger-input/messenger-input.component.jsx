import React, { useState } from 'react';
import axios from "axios";
import Cookies from 'universal-cookie';

import './messenger-input.styles.scss';

const MessengerInput = ({ conversationId, otherProps }) => {
    const [input, setInput] = useState(null);

    const submitInput = message => {
        const token = new Cookies().get('authToken')
        axios({
            method: 'POST',
            url: `http://localhost:5000/messages/${conversationId}/new`,
            data: {
                message
            },
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        }).then(({ data}) => {
            setInput('');
            console.log(data)
        }).catch(err => console.log(err))
    }

    return ( 
        <div className='messenger-input'>
            <input 
                className='input' 
                id='message'
                { ...otherProps } 
                value={input}
                onChange={e => {
                    setInput(e.target.value);
                }} 
            />
            <button className='button' onClick={() => submitInput(input)}>Send</button>
        </div>
     );
}
 
export default MessengerInput;