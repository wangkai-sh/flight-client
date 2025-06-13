import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Button from '../components/Button';
import TextInput from '../components/TextInput';
import { useAuthContext } from '../hooks/UseAuthContext';
import { loginApi } from '../services/authApi';

const LoginPage = () => {

    // 页面跳转
    const navigate = useNavigate()

    // 判断是否来自注册页
    const isFromRegister = document.referrer.includes('/register') ||
        location.state?.from === '/register'

    // 保存检查时发生的错误内容
    const [errors, setErrors] = useState({})

    // 保存用户登录信息
    const [localForm, setLocalForm] = useState({
        email: '',
        password: ''
    })

    // 登录状态
    const { login } = useAuthContext()

    const handleChange = (e) => {
        const { name, value } = e.target
        setLocalForm(prev => ({ ...prev, [name]: value }))
    }

    // 检查用户登录信息
    const validateForm = () => {
        const newErrors = {};

        // 检查邮箱长度
        if (localForm.email.length > 100)
            newErrors.email = 'E-mail be 1-100 characters‌'
        // 检查邮箱格式
        else if (!/^\S+@\S+\.\S+$/.test(localForm.email))
            newErrors.email = 'E-mail format is not correct‌'

        // 检查密码长度
        if (localForm.password.length < 8 || localForm.password.length > 20)
            newErrors.password = 'Password must be 8-20 characters'
        // 密码是否包含数字
        else if (!/\d/.test(localForm.password))
            newErrors.password = 'Password must contain numbers'
        // 密码是否包含小写字母
        else if (!/[A-Z]/.test(localForm.password))
            newErrors.password = 'Password must contain uppercase letter';
        // 密码是否包含大写字母
        else if (!/[a-z]/.test(localForm.password))
            newErrors.password = 'Password must contain lowercase letter';
        // 密码是否包含特殊字符
        else if (!/[^a-zA-Z0-9]/.test(localForm.password))
            newErrors.password = 'Password must contain symbol';

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    }

    // 登录
    const handleLogin = async (e) => {
        e.preventDefault()

        // 检查用户注册信息
        if (validateForm()) {
            try {
                const response = await loginApi(localForm);
                // 存储Token
                login(response.data.token);

                // 判断是否来自注册页
                if (isFromRegister) {
                    // 跳转首页
                    navigate('/');
                } else {
                    // 返回上一页
                    navigate(-1);
                }
            } catch (error) {
                // 调试用代码
                console.error(error);
            }
        }
    }

    return (
        <div className='container mx-auto p-4'>
            <div className='flex flex-col mb-[1.5vh] md:p-[25px] bg-white rounded-2xl'>
                <form className='space-y-6' onSubmit={handleLogin}>
                    <div className='flex flex-col mb-6'>
                        <h1 className='text-3xl font-bold text-center mb-8 text-gray-800'>Welcome Back</h1>
                        <TextInput
                            label='Email address'
                            name='email'
                            placeholder='Enter your email address'
                            value={localForm.email}
                            onChange={handleChange}
                            required
                            errorMessage={errors.email}
                        />
                        <TextInput
                            label='Password'
                            type='password'
                            name='password'
                            placeholder='Create a password'
                            value={localForm.password}
                            onChange={handleChange}
                            required
                            errorMessage={errors.password}
                        />
                        <Button type='submit' custumizedStyle='max-w-xs'>Login</Button>
                    </div>
                    <div className='text-center text-gray-500'>
                        Don't have an account?
                        <Link to='/register' className='ml-1 text-blue-500 hover:text-blue-700 hover:underline'>
                            Sign up
                        </Link>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default LoginPage;
