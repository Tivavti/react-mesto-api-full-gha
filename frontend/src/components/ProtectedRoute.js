import React from 'react';
import { Navigate } from "react-router-dom";

const ProtectedRouteElement = ({ element: Component, isLoggedIn, ...props }) => {
  return (
    isLoggedIn ? <Component {...props} /> : <Navigate to="/signin" replace />
  )
};

export default ProtectedRouteElement;