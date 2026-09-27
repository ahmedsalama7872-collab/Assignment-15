import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import Layout from "./Pages/Layout";
import Feed from "./Pages/Feed";
import Profile from "./Pages/Profile";
import Notifications from "./Pages/Notifications";
import Auth from "./Pages/auth";
import Login from "./components/Login";
import Register from "./components/Register";
import PostPreview from "./components/PostPreview";
import Settings from "./Pages/Settings";
import { QueryClient , QueryClientProvider} from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
const client = new QueryClient()
const routes = createBrowserRouter([
  // Authentication
  {
    path: "/",
    element: <Auth />,
    children: [
      {
        path: "login",
        element: <Login />,
      },
      {
        path: "register",
        element: <Register />,
      },
    ],
  },

  // Main App
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

  // Post Preview - مستقل عن Layout
  {
    path: "/PostPreview/:id",
    element: <PostPreview />,
  },

  // Profile
  {
    path: "/profile",
    element: <Profile />,
  },
  {
    path: "/settings",
    element: <Settings />,
  },
  {
    path: "/profile/:id",
    element: <Profile />,
  },

  // Notifications
  {
    path: "/notifications",
    element: <Notifications />,
  },
]);

export default function App() {
  return<QueryClientProvider client={client}>
   <RouterProvider router={routes} />;
  <ReactQueryDevtools initialIsOpen={false} />
  </QueryClientProvider>
}