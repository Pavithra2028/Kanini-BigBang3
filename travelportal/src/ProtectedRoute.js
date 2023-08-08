import React from 'react';
import { Route, Navigate } from 'react-router-dom';
import jwtDecode from 'jwt-decode';

const getUserRoleFromToken = () => {
  const token = localStorage.getItem('token');
  if (token) {
    const decodedToken = jwtDecode(token);
    const role = decodedToken['http://schemas.microsoft.com/ws/2008/06/identity/claims/role'];
    console.log('Role:', role);
    return role;
  }
  return null;
};

const ProtectedRoute = ({ component: Component, roles, ...rest }) => {
  const token = localStorage.getItem('token')

  if (!token) {
    return <Navigate to="/tlogin" />;
  }
  const userRole = getUserRoleFromToken(); 
  if (roles && roles.indexOf(userRole) === -1) {
    return <Navigate to="/unauthorized" />;
  }
  return ( <Component {...rest} />);
};

export default ProtectedRoute;