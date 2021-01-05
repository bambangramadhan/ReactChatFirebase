import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { signup, signInWithGoogle, signInWithGitHub } from '../helpers/auth';

const SignUp = () => {
  const [error, setError] = useState(null);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      await signup(email, password);
    } catch (error) {
      setError(error.message);
    }
  }

  const googleSignIn = async () => {
    try {
      await signInWithGoogle();
    } catch (error) {
      setError(error.message);
    }
  }

  const githubSignIn = async () => {
    try {
      await signInWithGitHub();
    } catch (error) {
      setError(error.message);
    }
  }

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <h1>
          Sign Up to
        <Link to="/">Chatty</Link>
        </h1>
        <p>Fill in the form below to create an account.</p>
        <div>
          <input placeholder="Email" name="email" type="email" onChange={(e) => setEmail(e.target.name)} value={email}></input>
        </div>
        <div>
          <input placeholder="Password" name="password" type="password" onChange={(e) => setPassword(e.target.password)} value={password}></input>
        </div>
        <div>
          {error ? <p>{error}</p> : null}
          <button type="submit">Sign up</button>
          <p>Or</p>
          <button onClick={googleSignIn} type="button">
            Sign up with Google
          </button>
          <button type="button" onClick={this.githubSignIn}>
            Sign up with GitHub
          </button>
        </div>
        <hr></hr>
        <p>Already have an account? <Link to="/login">Login</Link></p>
      </form>
    </div>
  )
};

export default SignUp;