import React from "react";
import { createHashRouter, RouterProvider } from "react-router-dom";

import Layout from "./Pages/Layout";
import Feed from "./Pages/Feed";
import Profile from "./Pages/Profile";
import Notifications from "./Pages/Notifications";
import Auth from "./Pages/Auth";
import Login from "./components/Login";
import Register from "./components/Register";
import PostPreview from "./components/PostPreview";
import Settings from "./Pages/Settings";
import Suggestions from "./Pages/Suggestions";
import ProtectedRouting from "./Pages/ProtectedRouting";

import {
  QueryClient,
  QueryClientProvider,
} from "@tanstack/react-query";

import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

const client = new QueryClient();

const routes = createHashRouter([
  {
    path: "/",
    element: <Auth />,
    children: [
      {
        index: true,
        element: <Login />,
      },
      {
        path: "register",
        element: <Register />,
      },
    ],
  },

  {
    element: <ProtectedRouting />,
    children: [
      {
        path: "/app",
        element: <Layout />,
        children: [
          {
            index: true,
            element: <Feed />,
          },
          {
            path: "feed",
            element: <Feed />,
          },
        ],
      },

      {
        path: "/PostPreview/:id",
        element: <PostPreview />,
      },

      {
        path: "/profile",
        element: <Profile />,
      },

      {
        path: "/profile/:id",
        element: <Profile />,
      },

      {
        path: "/suggestions",
        element: <Suggestions />,
      },

      {
        path: "/settings",
        element: <Settings />,
      },

      {
        path: "/notifications",
        element: <Notifications />,
      },
    ],
  },
]);

export default function App() {
  return (
    <QueryClientProvider client={client}>
      <RouterProvider router={routes} />

      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
}