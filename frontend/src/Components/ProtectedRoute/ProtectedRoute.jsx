import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useGlobalContext } from '../../GlobalContext/GlobalContext';
import { useEffect } from 'react';

const ProtectedRoute = () => {
  const { setError } = useGlobalContext();
  const isLoggedIn = window.localStorage.getItem('isLoggedIn');

  if (!isLoggedIn) {
    setError("You are not logged in, please log in");
    return <Navigate to="/login" />;
  }

  return <Outlet />;
};

export default ProtectedRoute;
