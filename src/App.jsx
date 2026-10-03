import React from "react";
import { createBrowserRouter, createHashRouter, RouterProvider } from "react-router-dom";

import Layout from "./Pages/Layout";
import Feed from "./Pages/Feed";
import Profile from "./Pages/Profile";
import Notifications from "./Pages/Notifications";
import Auth from "./Pages/Auth";
import Login from "./components/Login";
import Register from "./components/Register";
import PostPreview from "./components/PostPreview";
import Settings from "./Pages/Settings";
import { QueryClient , QueryClientProvider} from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import Suggestions from "./Pages/Suggestions";
import ProtectedRouting from "./Pages/ProtectedRouting";
const client = new QueryClient()
const routes = createHashRouter([
  {
    path: "/",
    element: <Auth />,
    children: [
      {
        
       index:true
        ,

        element: <Login />,
      },
      {
        path: "register",
        element: <Register />,
      },
    ],
  },

  {
    path: "/app",
    element: <Layout />,
    children: [
      {
        index: true,
        element:<ProtectedRouting> <Feed /> </ProtectedRouting>,
      },
      {
        path: "feed",
        element:<ProtectedRouting> <Feed /> </ProtectedRouting>,
      },
    ],
  },

  {
    path: "/PostPreview/:id",
    element: <ProtectedRouting><PostPreview /> </ProtectedRouting>,
  },

  {
    path: "/profile",
    element: <ProtectedRouting><Profile /> </ProtectedRouting>,
  },
  {
    path: "/suggestions",
    element: <ProtectedRouting><Suggestions /></ProtectedRouting>,
  },
  {
    path: "/settings",
    element:<ProtectedRouting> <Settings /></ProtectedRouting>,
  },
  {
    path: "/profile/:id",
    element: <ProtectedRouting><Profile /> </ProtectedRouting>,
  },

  {
    path: "/notifications",
    element: <ProtectedRouting><Notifications /> </ProtectedRouting>,
  },
]);

export default function App() {
  return<QueryClientProvider client={client}>
   <RouterProvider router={routes} />
  <ReactQueryDevtools initialIsOpen={false} />
  </QueryClientProvider>
}
