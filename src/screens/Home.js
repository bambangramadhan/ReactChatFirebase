import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div>
      <h1>
        <Link to="/">Chatty</Link>
      </h1>
      <h1>
        <Link to="/chat">Group Chat</Link>
      </h1>
      <h1>
        <Link to="/signup">Signup</Link>
      </h1>
      <h1>
        <Link to="/login">Login</Link>
      </h1>
    </div>
  );
};

export default Home;