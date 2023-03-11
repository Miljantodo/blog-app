import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Posts from "./pages/posts/Posts";
import Users from "./pages/users/Users";
import Root from "./pages/Root";
import ErrorPage from "./pages/notfound/ErrorPage";
import SingleUser from "./pages/users/single-user/SingleUser";
import SinglePost from "./pages/posts/single-post/SinglePost";

const App = () => {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Root />,
      children: [
        { path: "/", element: <Users /> },
        { path: "/users", element: <Users /> },
        { path: "/posts", element: <Posts /> },
        { path: "/users/:userID", element: <SingleUser /> },
        { path: "/posts/:postID", element: <SinglePost /> },
        { path: "*", element: <ErrorPage /> },
      ],
    },
  ]);

  return <RouterProvider router={router}></RouterProvider>;
};

export default App;
