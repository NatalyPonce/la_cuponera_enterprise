import React from 'react';
import { NavLink } from 'react-router';


const Navigation = () => {

    return (
        <>
            <nav className="peer-checked:flex hidden absolute z-20 top-full left-0 w-full bg-white flex-col items-center shadow-lg md:relative md:top-0 md:flex md:flex-row md:w-auto md:space-x-6 md:bg-transparent md:shadow-none">
            {
                <>
                <NavLink to="/gestionEmpleado" className={({ isActive }) => `inline-flex items-center text-black ${isActive ? "text-primary font-bold text-2xl" : ""}`}>
                    Gestión de empleados
                </NavLink>

                <NavLink to="/redeem" className={({ isActive }) => `inline-flex items-center text-black ${isActive ? "text-primary font-bold text-2xl" : ""}`}>
                    Canjear
                </NavLink>

                <NavLink to="/home" className={({ isActive }) => `inline-flex items-center text-black ${isActive ? "text-primary font-bold text-2xl" : ""}`}>
                    Ofertas
                </NavLink>
                </>
            }
            </nav>
        </> 
);
}

export default Navigation
