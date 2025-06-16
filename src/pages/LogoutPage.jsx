import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuthContext } from "../hooks/useAuthContext";

const LogoutPage = () => {
    const navigate = useNavigate();
    const { logout } = useAuthContext();

    useEffect(() => {
        // 清除认证信息
        logout();
        // 跳转到首页
        navigate('/', { replace: true });
    }, [navigate]);

    return null;
}

export default LogoutPage;
