import React, { useState, useEffect } from 'react';
import { UserCircleIcon } from '@heroicons/react/24/outline';
import { NavLink, Outlet, useNavigate } from 'react-router';
import Logo from './Logo';
import Navigation from './Navigation';
import AuthButtons from './AuthButtons';

const Header = () => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [menuOpen, setMenuOpen] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        setIsLoggedIn(!!localStorage.getItem("token"));
    }, [localStorage.getItem("token")]);

    const handleLogout = () => {
        localStorage.removeItem("token");
        setIsLoggedIn(false);
        setMenuOpen(false);
        navigate("/");
    };

    return (
        <>
            <header className="flex justify-between items-center bg-white p-4 px-20 shadow-md relative">
                <Logo />
                <Navigation />

                <div className="hidden md:flex space-x-4 items-center">
                    {isLoggedIn ? (
                        <>
                            <UserMenu />
                            <div className="relative">
                                <UserCircleIcon className="w-10 h-10 text-primary cursor-pointer" onClick={() => setMenuOpen(!menuOpen)} />
                                {menuOpen && (
                                    <div className="absolute right-0 mt-2 w-40 bg-white shadow-lg rounded-md p-2">
                                        <NavLink to="/cliente/perfil" className="block px-4 py-2 text-black hover:bg-gray-200">Mi Perfil</NavLink>
                                        <button onClick={handleLogout} className="block w-full text-left px-4 py-2 text-black hover:bg-gray-200">
                                            Cerrar Sesión
                                        </button>
                                    </div>

                                )}
                            </div>
                        </>
                    ) : (
                        <AuthButtons />
                    )}
                </div>
            </header>

            <Outlet />
        </>
    );
};

export default Header;
