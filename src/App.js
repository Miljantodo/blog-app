import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Posts from "./pages/posts/Posts";
import Users from "./pages/users/Users";
import Root from "./pages/Root";
import UserInformation from "./pages/users/single-user/UserInformation";
import ErrorPage from "./pages/notfound/ErrorPage";
import PostInformation from "./pages/posts/single-post/PostInformation";

const App = () => {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Root />,
      children: [
        { path: "users", element: <Users /> },
        { path: "posts", element: <Posts /> },
        { path: "users/:userID", element: <UserInformation /> },
        { path: "posts/:postID", element: <PostInformation /> },
        { path: "*", element: <ErrorPage /> },
      ],
    },
  ]);

  return <RouterProvider router={router}></RouterProvider>;
};

export default App;
