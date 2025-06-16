import axios from 'axios';
import { getToken } from '../utils/AuthUtils';

// API实例
const instance = axios.create({
    baseURL: import.meta.env.VITE_API_BASE_URL, // 基础路径
    headers: { 'Content-Type': 'application/json' }
});

// 请求拦截器：自动添加认证令牌
instance.interceptors.request.use(config => {
    // 定义不需要 token 的 API 路径数组
    const publicApis = ['/api/auth/**']; // 公开 API

    // 如果当前请求不在公开 API 列表中，则添加 token
    if (!publicApis.some(api => config.url.includes(api))) {
        const token = getToken();
        if (token) config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
});

// 响应拦截器：统一错误处理
// instance.interceptors.response.use(
//     response => response,
//     async error => {
//       const originalRequest = error.config;

//       if (error.response.status === 401 && !originalRequest._retry) {
//         originalRequest._retry = true;

//         try {
//           const refreshToken = localStorage.getItem('refreshToken');
//           const response = await axios.post('/auth/refresh', { refreshToken });

//           storeToken(response.token);
//           api.defaults.headers.common['Authorization'] = `Bearer ${response.token}`;

//           return api(originalRequest);
//         } catch (e) {
//           removeToken();
//           window.location.href = '/login';
//         }
//       }

//       return Promise.reject(error);
//     }
//   );

export default instance;
