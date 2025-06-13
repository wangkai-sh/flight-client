import { createContext, useCallback, useEffect, useState } from "react";
import { getToken, removeToken, storeToken } from "../utils/AuthUtils";
import instance from "../services/http";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    const checkAuth = useCallback(async () => {
        const token = getToken();
        if (!token) {
            setIsAuthenticated(false);
            return false;
        }

        try {
            const response = await instance.get('/auth/check');
            const authStatus = response.data.authenticated;
            setIsAuthenticated(authStatus);
            return authStatus;
        } catch (error) {
            console.error('Authentication check failed:', error);
            removeToken();
            setIsAuthenticated(false);
            return false;
        }
    }, []);

    // 登录成功后更新状态
    const login = useCallback(async (token) => {
        storeToken(token)
        setIsAuthenticated(true);
    }, []);

    // 登出
    const logout = useCallback(() => {
        removeToken();
        setIsAuthenticated(false);
    }, []);

    // 初始化时检查认证状态
    useEffect(() => {
        checkAuth();
    }, [checkAuth]);

    return (
        <AuthContext.Provider value={{
            isAuthenticated,
            checkAuth,
            login,
            logout
        }}>
            {children}
        </AuthContext.Provider>
    )
}
