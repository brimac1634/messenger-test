import React, { useState, useEffect } from 'react';
import { Switch, Route, Redirect, withRouter } from 'react-router-dom';
import axios from 'axios';
import Cookies from 'universal-cookie';

import MessageConsole from "../messenger-console/messenger-console.component.jsx";

import './conversations.styles.scss'

const Conversations = ({ user, match, history }) => {
    const [conversations, setConversations] = useState(null);

    useEffect(() => {
        const token = new Cookies().get('authToken')
        axios({
            method: 'GET',
            url: 'http://localhost:5000/conversations?page=0',
            headers: {
                'Authorization': `Bearer ${token}`
            }
        }).then(({ data }) => {
            console.log(data)
            setConversations(data.conversations)
        }).catch(err => console.log(err))
    }, [])
    return ( 
        <div className='conversations'>
            <Switch>
                <Route exact path={match.path} render={()=>(
                    <div className='container'>
                        <h2>Conversations</h2>
                        {
                            conversations &&
                            conversations.map((con, i) => {
                                const recipient = con.users.filter(conUser => conUser._id !== user._id)[0];
                                console.log(con)
                                return (
                                    <button key={i} onClick={() => history.push(`${match.path}/${con._id}`)}>
                                        <span className='conversation'>{recipient.name}</span>
                                    </button>
                                )
                            })
                        }
                    </div>
                )}/>
                <Route path={`${match.path}/:conversationId`} render={() => <MessageConsole user={user} />}/>
                <Redirect to={match.path} />
            </Switch>
        </div>
     );
}
 
export default withRouter(Conversations);