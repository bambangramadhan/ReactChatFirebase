import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { signin, signInWithGoogle, signInWithGitHub } from "../helpers/auth";

const Login = () => {
  const [error, setError] = useState(null);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      await signin(email, password);
    } catch (error) {
      setError(error.message);
    }
  }

  return (
    <div>
      <form
        autoComplete="off"
        onSubmit={handleSubmit}
      >
        <h1>
          Login to
        <Link to="/">Chatty</Link>
        </h1>
        <p>Fill in the form below to login to your account.</p>
        <div>
          <input placeholder="Email" name="email" type="email" onChange={(e) => setEmail(e.target.name)} value={email}></input>
        </div>
        <div>
          <input placeholder="Password" name="password" type="password" onChange={(e) => setPassword(e.target.password)} value={password}></input>
        </div>
        <div>
          {error ? <p>{error}</p> : null}
          <button type="submit">Login</button>
        </div>
        <hr></hr>
        <p>Don't have an account <Link to="/signup">Sign Up</Link></p>
      </form>
    </div>
  )
};

export default Login;