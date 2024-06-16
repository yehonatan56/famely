import React from "react";
import { Route, Routes } from "react-router-dom";
import { LoginPage } from "./LoginPage";
import { RegisterPage } from "./RegisterPage";

// import Forms from "../components/auth/forms";
import Home from "../components/home/home";
import Chat from "../components/chat/chat";
import ImageUploader from "../components/image-uploader/imageUploader";
import ErrorConnect from "./errorConnect";

export const RoutePages = () => {
  return (
    <Routes>
      {/* <Route path="*" Component={<div>404</div>} /> */}
      <Route path="/" Component={Home} />
      <Route path="/errorConnect" Component={ErrorConnect} />
      <Route path="/login" Component={LoginPage} />
      <Route path="/register" Component={RegisterPage} />
      <Route path="/chat" Component={Chat} />
      {/* <Route path='/calendar' Component={Calendar}/> */}
      <Route path="/image-uploader" Component={ImageUploader} />
    </Routes>
  );
};
