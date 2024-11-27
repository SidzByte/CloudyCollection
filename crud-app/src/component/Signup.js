import axios from 'axios';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import loader from '../assets/loader.gif';
import './Signup.css'; // Link the CSS file for styles

const Signup = () => {
  const [userName, setUserName] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [isLoading, setLoading] = useState(false);
  const [hasError, setHasError] = useState(false);
  const [error, setError] = useState('');

  let navigate = useNavigate();

  const submitHandler = (event) => {
    event.preventDefault();
    setLoading(true);
    axios
      .post('http://localhost:3000/user/signup', {
        userName: userName,
        password: password,
        email: email,
        phone: phone,
      })
      .then((res) => {
        setLoading(false);
        console.log(res.data);
        setHasError(false);
        navigate('/login');
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
        setHasError(true);
        setError(err.message || 'An error occurred');
      });
  };

  return (
    <div className="signup-container">
      {isLoading && (
        <div className="loader">
          <img src={loader} alt="Loading..." />
        </div>
      )}

      {!isLoading && (
        <div className="signup-card">
          <h1>Create New Account</h1>
          <form onSubmit={submitHandler}>
            <input
              type="text"
              placeholder="Username"
              value={userName}
              onChange={(e) => setUserName(e.target.value)}
              required
            />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <input
              type="tel"
              placeholder="Phone"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              required
            />
            <button type="submit">Sign Up</button>
          </form>

          {hasError && <p className="error-message">Error: {error}</p>}
        </div>
      )}
    </div>
  );
};

export default Signup