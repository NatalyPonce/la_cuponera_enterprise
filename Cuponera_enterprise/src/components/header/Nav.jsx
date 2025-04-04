import React from 'react'
import { NavLink } from 'react-router'

export const Nav = () => {
    return (
        <nav className="peer-checked:flex hidden absolute z-20 top-full left-0 w-full bg-white flex-col items-center shadow-lg md:relative md:top-0 md:flex md:flex-row md:w-auto md:space-x-10 md:bg-transparent md:shadow-none">
            <NavLink to="/</CategoryContext>" className={({ isActive }) => isActive ? "text-primary font-bold" : "text-black"}>
                Promociones
            </NavLink>

            <NavLink to="/marcas" className={({ isActive }) => isActive ? "text-primary font-bold" : "text-black"}>
                Marca
            </NavLink>
        </nav>
    )
}

export default Nav;