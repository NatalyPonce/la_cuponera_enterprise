import React from 'react';
import { NavLink } from 'react-router';


const Navigation = () => {

    const role = localStorage.getItem('role');

    return (
        <nav className="peer-checked:flex hidden absolute z-20 top-full left-0 w-full bg-white flex-col items-center shadow-lg md:relative md:top-0 md:flex md:flex-row md:w-auto md:space-x-6 md:bg-transparent md:shadow-none">
            {
                role !== "employee" ?
            <NavLink to="/" className={({ isActive }) => `inline-flex items-center text-black ${isActive ? "text-primary font-bold text-2xl" : ""}`}>
                Gestión de empleados
            </NavLink>
            :
            <NavLink to="/empleado/canjear" className={({ isActive }) => `inline-flex items-center text-black ${isActive ? "text-primary font-bold text-2xl" : ""}`}>
                Canjear
            </NavLink>
}
        </nav>
    );
}

export default Navigation;
