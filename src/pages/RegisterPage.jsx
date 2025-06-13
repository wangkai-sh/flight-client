import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../components/Button';
import DropdownMenu from '../components/DropdownMenu';
import TextInput from '../components/TextInput';
import { useAuthContext } from '../hooks/UseAuthContext';
import { registerApi } from '../services/authApi';
import { isEmpty } from '../utils/StringUtils';

const RegisterPage = () => {
    const { formData, updateFormData } = useAuthContext

    // 保存检查时发生的错误内容
    const [errors, setErrors] = useState({})

    // 保存用户注册信息
    const [localForm, setLocalForm] = useState({
        email: '',
        password: '',
        firstName: '',
        lastName: '',
        country: 'china',
        phone: ''
    })

    // 页面跳转
    const navigator = useNavigate();

    const options = {
        Asia: [
            { value: 'Tokyo', label: 'Tokyo' },
            { value: 'Manila', label: 'Manila' },
            { value: 'Bangkok', label: 'Bangkok' },
            { value: 'Seoul', label: 'Seoul' },
            { value: 'Istanbul', label: 'Istanbul' },
            { value: 'Singapore', label: 'Singapore' },
        ],
        Europe: [
            { value: 'London', label: 'London' },
            { value: 'Rome', label: 'Rome' },
            { value: 'Barcelona', label: 'Barcelona' },
            { value: 'Madrid', label: 'Madrid' },
            { value: 'Paris', label: 'Paris' },
        ]
    }

    const handleChange = (e) => {
        const { name, value } = e.target
        setLocalForm(prev => ({ ...prev, [name]: value }))
    }

    // 检查用户注册信息
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

        // 检查用户名长度
        if (localForm.firstName.length > 50)
            newErrors.firstName = 'First name must be 1 to 50 characters'
        // 用户名是否是英数字
        else if (!/[a-zA-Z0-9]/.test(localForm.firstName))
            newErrors.firstName = 'First name can only contain letters or digits';
        // 检查用户名长度
        if (localForm.lastName.length > 50)
            newErrors.lastName = 'Last name must be 1 to 50 characters'
        // 用户名是否是英数字
        else if (!/[a-zA-Z0-9]/.test(localForm.lastName))
            newErrors.lastName = 'Last name can only contain letters or digits';

        // 检查国家
        if (isEmpty(localForm.country))
            newErrors.country = 'Country can not be null'

        // 输入手机号时
        if (!isEmpty(localForm.phone)) {
            // 检查手机号长度
            if (localForm.phone.length != 11)
                newErrors.phone = 'Phone number must be 11-digit number'
            // 检查手机号格式
            else if (!/\d/.test(localForm.phone))
                newErrors.phonenuphonember = 'Phone number can only contain digits'

        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    }

    // 注册
    const handleRegister = async (e) => {
        e.preventDefault()

        // 检查用户注册信息
        if (validateForm()) {
            // 登录用户注册信息
            updateFormData(localForm);
            try {
                await registerApi(localForm)
                alert('Registration succeeded')
                // 注册成功后跳转登录页面
                navigator('/login')
            } catch (error) {
                // 调试用代码
                console.error(error)
            }
        }
    }

    return (
        <div className='container mx-auto p-4'>
            <div className='flex flex-col mb-[1.5vh] md:p-[25px] bg-white rounded-2xl'>
                <form className='space-y-6' onSubmit={handleRegister}>
                    <div className='flex flex-col mb-6'>
                        <h1 className='text-3xl font-bold text-center mb-8 text-gray-800'>Create your account</h1>
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
                        <TextInput
                            label='First Name'
                            name='firstName'
                            placeholder='Enter your first name'
                            value={localForm.firstName}
                            onChange={handleChange}
                            required
                            errorMessage={errors.firstName}
                        />
                        <TextInput
                            label='Last Name'
                            name='lastName'
                            placeholder='Enter your last name'
                            value={localForm.lastName}
                            onChange={handleChange}
                            required
                            errorMessage={errors.lastName}
                        />
                        <div className='flex flex-col' >
                            <label htmlFor='country' className='text-sm text-left text-gray-800 required'>
                                Coutry/Region
                                <span className='required'>*</span>
                            </label>
                            <DropdownMenu
                                options={options}
                                name='country'
                                placeholder='Select your coutry/region'
                                required
                                onChange={handleChange}
                            />
                        </div>
                        <TextInput label='Phone number'
                            typeVaule='number'
                            name='phone'
                            placeholder='Enter your phone number'
                            // inputmode='numeric'
                            value={localForm.phone}
                            onChange={handleChange}
                            errorMessage={errors.phone}
                        />
                        <Button custumizedStyle='max-w-xs'>Register</Button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default RegisterPage;
