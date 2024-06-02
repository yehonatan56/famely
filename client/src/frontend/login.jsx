import React, { useState } from 'react';
import { writeToStore } from './store';
import { useNavigate } from 'react-router-dom';
// import bcrypt from "bcrypt";

function LoginForm({ onLoginSuccess }) {
  const [name, setName] = useState('abb');
  const [password, setPassword] = useState('11001100');
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log('Attempting to login:', name, password);

    if (!name || !password) {
      setErrorMessage('Please fill in all fields.');
      return;
    }

    if (password.length < 6) {
      setErrorMessage('Password must be at least 6 characters.');
      return;
    }

    try {
      const response = await fetch('http://localhost:3009/famelys/checkValidity', {
        method: "POST",
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({ name: name , pass: password })
      });
      const user = await response.json();

      // let user = users.find(user => user.name === name && bcrypt.compare(user.pass, password));
      if (user._id) {
        console.log('Login successful:', user);
        writeToStore("user" , user);
        navigate("/welcome")
      } else {
        setErrorMessage('Invalid username or password.');
      }
    } catch (error) {
      console.error('Login error:', error);
      setErrorMessage('Failed to login. Please try again later.');
    } 
  };

  return (
    <div className="form-container">
      <form className="login" onSubmit={handleSubmit}>
        <h2>Login</h2>
        <div className="input-group">
          <label htmlFor="name">Name</label>
          <input
            type="text"
            id="name"
            name="name"
            value={name}
            onChange={e => setName(e.target.value)}
            required
          />
        </div>
        <div className="input-group">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            name="password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            required
          />
        </div>
        {errorMessage && <p className="error">{errorMessage}</p>}
        <button type="submit">Login</button>
      </form>
    </div>
  );
}

export default LoginForm;
