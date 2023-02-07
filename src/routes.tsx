import { createBrowserRouter } from "react-router-dom";
import { BaseLayout } from "./layout";
import { CreatePostPage } from "./pages/CreatePost";
import { HomePage } from "./pages/Home";
import { LoginPage } from "./pages/Login";
import { PostDetail } from "./pages/PostDetail";
import { SignUpPage } from "./pages/SignUp";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <BaseLayout />,
    children: [
      {
        path: "/",
        element: <HomePage />,
      },
      {
        path: "/signin",
        element: <LoginPage />,
      },
      {
        path: "/signup",
        element: <SignUpPage />,
      },
      {
        path: "/post",
        children: [
          {
            path: "create",
            element: <CreatePostPage />,
          },
          {
            path: "detail",
            element: <PostDetail />,
          },
        ],
      },
    ],
  },
]);
