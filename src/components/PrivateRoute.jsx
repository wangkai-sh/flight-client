import React, { useEffect } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuthContext } from '../hooks/useAuthContext';

const PrivateRoute = ({ children }) => {
    const location = useLocation();
    const { isAuthenticated } = useAuthContext();

    return isAuthenticated ? (
        children
    ) : (
        <Navigate to='/login' state={{ from: location }} replace />
    );
};

export default PrivateRoute;
