// src/components/AuthGuard.js
import React from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

const AuthGuard = ({ children }) => {
  const { isAuthenticated } = useSelector((state) => state.auth);

  if (!localStorage.getItem("jwtToken")) {
    return <Navigate to="/login" />;
  }

  return children;
};

export default AuthGuard;
