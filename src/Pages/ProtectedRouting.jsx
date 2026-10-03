import React from "react";
import { Navigate, Outlet } from "react-router-dom";

export default function ProtectedRouting() {
  if (localStorage.getItem("userToken")) {
    return <Outlet />;
  }

  return <Navigate to="/" replace />;
}