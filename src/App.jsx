import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import Layout from "./Pages/Layout";
import Feed from "./Pages/Feed";
import Profile from "./Pages/Profile";
import Notifications from "./Pages/Notifications";
import Auth from "./Pages/auth";
import Login from "./components/Login";
import Register from "./components/Register";

const routes = createBrowserRouter([
  // 1. مسارات المصادقة (تسجيل الدخول وإنشاء حساب)
  {
    path: '/',
    element: <Auth />,
    children:[
      { path: 'login', element: <Login /> },
      { path: 'register', element: <Register /> }
    ]
  },

  // 2. مسارات التطبيق الرئيسية المرتبطة بالـ Layout (مثل الفيد والإعدادات)
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

  // 3. مسارات البروفايل المستقلة (خارج الـ Layout)
  {
    path: "/profile",
    element: <Profile />,
  },
  {
    path: "/profile/:id",
    element: <Profile />,
  },

  // 4. مسار الإشعارات المستقل (خارج الـ Layout)
  {
    path: "/notifications",
    element: <Notifications />,
  },
]);

export default function App() {
  return <RouterProvider router={routes} />;
}