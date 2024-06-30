import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { LoginPage } from "./LoginPage";
import { RegisterPage } from "./RegisterPage";
import { Loader } from "@mantine/core";

// import Forms from "../components/auth/forms";
import Home from "../components/home/home";
import Chat from "../components/chat/chat";
import ImageUploaderLayout from "../components/image-uploader/imageUploaderLayout";
import ErrorConnect from "./errorConnect";
import AuthenticatedPage from "../components/auth/AuthenticatedPage";

export const RoutePages = () => {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Home />,
    },
    {
      path: "/error",
      element: <ErrorConnect />,
    },
    {
      path: "/login",
      element: <LoginPage />,
    },
    {
      path: "/register",
      element: <RegisterPage />,
    },
    {
      path: "/chat",
      element: (
        <AuthenticatedPage>
          <Chat />
        </AuthenticatedPage>
      ),
    },
    {
      path: "/image-uploader",
      element: (
        <AuthenticatedPage>
          <ImageUploaderLayout />
        </AuthenticatedPage>
      ),
    },
  ]);

  return <RouterProvider router={router} />;
};
