import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthContext } from '../hooks/useAuthContext';
import Button from './Button';
import { Link } from 'react-router-dom';

const Navbar = () => {
    const { isAuthenticated } = useAuthContext();
    const navigate = useNavigate();

    const handleLogout = () => {
        navigate('/logout', { replace: true });
    };

    return (
        <nav className='flex justify-end items-center m-4'>
            <Link className='text-white text-base font-bold mb-3 focus:outline-none' to="/">Home</Link>
            <Link className='text-white text-base font-bold mb-3 px-4 py-2 focus:outline-none' to="/mybookings">Find Bookings</Link>
            {isAuthenticated ? (
                <Button variant='navi' onClick={handleLogout}>Logout</Button>
            ) : (
                <Button variant='navi' onClick={() => navigate('/login')}>Sign in</Button>
            )}
        </nav>
    );
};

export default Navbar;
