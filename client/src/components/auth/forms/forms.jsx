import React, { useState } from "react";
import ImageUploaderLayout from "../../image-uploader/imageUploaderLayout"; // This would be your main UI component after login
import LoginForm from "./Login";
import RegisterForm from "./Register";

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
        <ImageUploaderLayout user={user} />
      )}
    </div>
  );
}
