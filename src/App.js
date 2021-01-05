import logo from './logo.svg';
import './App.css';
import React, { Component, useEffect, useState } from 'react';
import {
  Route,
  BrowserRouter as Router,
  Switch,
  Redirect,
} from "react-router-dom";
import Home from './screens/Home';
import Chat from './screens/Chat';
import Signup from './screens/Signup';
import Login from './screens/Login';
import { auth } from './services/firebase';

const PrivateRoute = ({ component: Component, authenticated, ...rest }) => {
  return (
    <Route
      {...rest}
      render={(props) => authenticated ? <Component {...props} /> : <Redirect to={{ pathname: '/login', state: { from: props.location } }} />}
    />
  )
}

const PublicRoute = ({ component: Component, authenticated, ...rest }) => {
  return (
    <Route
      {...rest}
      render={(props) => !authenticated ? <Component {...props} /> : <Redirect to='/chat' />}
    />
  )
}

const App = () => {
  const [authenticated, setAuthenticated] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    auth().onAuthStateChanged((user) => {
      if (user) {
        setAuthenticated(true);
        setLoading(false);
      } else {
        setAuthenticated(false);
        setLoading(false);
      }
    })
  }, [])

  if (loading) {
    return <h2>Loading...</h2>
  } else {
    return (
      <Router>
        <Switch>
          <Route exact path="/" component={Home} />
          <PrivateRoute path="/chat" authenticated={authenticated} />
          <PublicRoute path="/signup" authenticated={authenticated} />
          <PublicRoute path="/login" authenticated={authenticated} />
        </Switch>
      </Router>
      // <h2>12</h2>
    );
  };
}

export default App;
