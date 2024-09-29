import React from 'react';
import { Outlet, Navigate } from 'react-router-dom';
import { isLoggedIn } from '../auth'; // Assuming you have a function that checks if user is logged in

const PrivateRoute = () => {
  return isLoggedIn() ? <Outlet /> : <Navigate to="/team" />;
};

export default PrivateRoute;
