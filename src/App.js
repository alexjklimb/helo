import React from 'react';
import './App.css';
import Nav from './Components/Nav/Nav';
import routes from './routes';
import {Switch} from 'react-router-dom'

function App(props) {
  return (
    <main className='main'>
      <Switch>
        <Nav />
      </Switch>
      {routes}
    </main>
  );
}

export default App;