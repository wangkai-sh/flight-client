import React, { useEffect } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuthContext } from '../hooks/UseAuthContext';

const PrivateRoute = ({ children }) => {
    const location = useLocation();
    const { isAuthenticated, isLoggingOut, clearLogoutFlag } = useAuthContext();

    useEffect(() => {
        // 登出完成后清除标记
        if (isLoggingOut) {
            clearLogoutFlag();
        }
    }, [isLoggingOut, clearLogoutFlag]);

    return isAuthenticated ? (
        children
    ) : (
        <Navigate to={isLoggingOut ? '/' : '/login'} state={{ from: location }} replace />
    );
};

export default PrivateRoute;
