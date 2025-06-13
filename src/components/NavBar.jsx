import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthContext } from '../hooks/UseAuthContext';
import Button from './Button';

const Navbar = () => {
    const { isAuthenticated } = useAuthContext();
    const navigate = useNavigate();

    const handleLogout = () => {
        navigate('/logout', { replace: true });
    };

    return (
        <nav className='flex justify-end items-center m-4'>
            <Button variant='naviTransparentW' onClick={() => navigate('/mybookings')}>Find Bookings</Button>
            {isAuthenticated ? (
                <Button variant='navi' onClick={handleLogout}>Logout</Button>
            ) : (
                <Button variant='navi' onClick={() => navigate('/login')}>Sign in</Button>
            )}
        </nav>
    );
};

export default Navbar;
