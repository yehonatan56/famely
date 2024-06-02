import React, { useState } from 'react';
import { writeToStore } from './store';
import { useNavigate } from 'react-router-dom';

function RegisterForm({ onRegistrationSuccess }) {
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!name || !password) {
      setErrorMessage('Please fill in all fields.');
      return;
    }
    if (password.length < 6) {
      setErrorMessage('Password must be at least 6 characters.');
      return;
    }

    try {
      const response = await fetch('http://localhost:3009/famelys/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, pass: password, famely: { images: [] } })
      });

      const data = await response.json();
      if (data.error) {
        setErrorMessage(data.error);
      } else {
        console.log('Registration successful:', data);
        writeToStore("user" , user)
        useNavigate("/welcome")
      }
    } catch (error) {
      console.error('Registration error:', error);
      setErrorMessage('Failed to register. Please try again later.');
    }
  };

  return (
    <div className="form-container">
      <form className="register" onSubmit={handleSubmit}>
        <h2>Register</h2>
        <div className="input-group">
          <label htmlFor="name">Name</label>
          <input type="text" id="name" name="name" value={name} onChange={e => setName(e.target.value)} required />
        </div>
        <div className="input-group">
          <label htmlFor="password">Password</label>
          <input type="password" id="password" name="password" value={password} onChange={e => setPassword(e.target.value)} required />
        </div>
        {errorMessage && <p className="error">{errorMessage}</p>}
        <button type="submit">Register</button>
      </form>
    </div>
  );
}

export default RegisterForm;
