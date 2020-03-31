import React, { useState } from 'react';
import axios from 'axios';
import Cookies from 'universal-cookie';

import './login.styles.scss';

const Login = ({ setUser }) => {
    const [credentials, setCredentials] = useState({
        email: '',
        password: ''
    });
    const { email, password } = credentials;

    const login = (email, password) => {
        axios({
            method: 'POST',
            url: 'http://localhost:5000/auth/login',
            data: { email, password },
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(({ data }) => {
            setUser(data.user);
            new Cookies().set('authToken', data.token, { 
				path: '/',
				domain: 'localhost'
			});
            console.log(data)
        }).catch(err => console.log(err))
    }
    return (
        <div className='login'>
            <div className='input-container'>
                <h2>Login</h2>
                <input
                    name='email'
                    type='email'
                    placeholder='email'
                    onChange={e => {
                        setCredentials({
                            ...credentials,
                            email: e.target.value
                        })
                    }}
                />
                <input
                    name='password'
                    type='password'
                    placeholder='password'
                    onChange={e => {
                        setCredentials({
                            ...credentials,
                            password: e.target.value
                        })
                    }}
                />
                <button onClick={() => login(email, password)}>Login</button>
            </div>
        </div>
     );
}
 
export default Login;