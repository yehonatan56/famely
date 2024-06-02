import React from "react";
import { Route, Routes } from "react-router-dom";
import { LoginPage } from "./LoginPage";
import { RegisterPage } from "./RegisterPage";

// import Forms from "../components/auth/forms";
// import Chat from "../components/chat/chat";
import ImageUploader from "../components/image-uploader/imageUploader";
import Welcome from "../components/welcome/welcome";

export const RoutePages = () => {
  return (
    <Routes>
      <Route path="*" Component={<div>404</div>} />
      <Route path="/login" Component={LoginPage} />
      <Route path="/register" Component={RegisterPage} />
      {/*<Route path="/chat" Component={Chat} />*/}
      {/* <Route path='/calendar' Component={Calendar}/> */}
      {/*<Route path="/imageUploader" Component={ImageUploader} />*/}
      {/*<Route path="/welcome" Component={Welcome} />*/}
    </Routes>
  );
};
