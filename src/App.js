import React, { useState, useEffect } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import axios from 'axios';
import Cookies from 'universal-cookie';

import Conversations from "./components/conversations/conversations.component.jsx";
import Login from "./components/login/login.component.jsx";

function App() {
  const [user, setUser] = useState();

  useEffect(() => {
    const token = new Cookies().get('authToken')
    axios({
      method: 'GET',
      url: 'http://localhost:5000/user',
      headers: {
        'Authorization': `Bearer ${token}`
      }
    }).then(({ data }) => {
      console.log(data)
      setUser(data.user);
    }).catch(err => console.log(err))
  }, [])

  return (
    <div className="App">
      <Switch>
        <Route 
          path='/conversations' 
          render={()=>
            user ? (
              <Conversations user={user} />
            ) : (
              <Redirect to={'/login'}/>
            )
          }/>
        <Route 
            path='/login' 
            render={() => 
                user ? (
                  <Redirect to={'/conversations'}/>
                ) : (
                  <Login setUser={setUser} />
                )
            }
        />
        <Redirect to='/conversations' />
    </Switch>
    </div>
  );
}

export default App;
