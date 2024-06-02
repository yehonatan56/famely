import React, { useState } from 'react'
import LoginForm from './login';
import ImageUploader from './imageUploader'; // This would be your main UI component after login

import RegisterForm from './register';

export default function Forms() {
    const [user, setUser] = useState(null);
    const handleLoginSuccess = (userData) => {
      setUser(userData); // Set the user data upon successful login
    };

  return (
    <div>
        
        {!user ? (
        <div>
        <RegisterForm onRegistrationSuccess={handleLoginSuccess} />
        <LoginForm onLoginSuccess={handleLoginSuccess} />
        </div>
      ) : (
        <ImageUploader user={user} />
      )} 
    </div>
  )
}
