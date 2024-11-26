import axios from 'axios';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import loader from '../assets/loader.gif';
import './Login.css'; 

const Login = () => {
  const [userName, setUserName] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setLoading] = useState(false);
  const [hasError, setHasError] = useState(false);
  const [error, setError] = useState('');

  let navigate = useNavigate();

  const submitHandler = (event) => {
    event.preventDefault();
    setLoading(true);
    axios
      .post('http://localhost:3000/user/login', {
        userName: userName,
        password: password,
      })
      .then((res) => {
        setLoading(false);
        console.log(res.data);
        localStorage.setItem('token', res.data.token);
        localStorage.setItem('userName', res.data.userName);
        setHasError(false);
        navigate('/dashboard');
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
        setHasError(true);
        setError(err.response?.data?.msg || 'An error occurred');
      });
  };

  return (
    <div className="login-container">
      {isLoading && (
        <div className="loader">
          <img src={loader} alt="Loading..." />
        </div>
      )}

      {!isLoading && (
        <div className="login-card">
          <h1>Login</h1>
          <form onSubmit={submitHandler}>
            <input
              type="text"
              placeholder="Username"
              value={userName}
              onChange={(e) => setUserName(e.target.value)}
            />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <button type="submit">Login</button>
          </form>

          {hasError && <p className="error-message">Error: {error}</p>}
        </div>
      )}
    </div>
  );
};

export default Login
