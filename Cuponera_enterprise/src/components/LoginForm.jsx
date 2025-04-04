import React, { useState } from 'react'
import { BASE_URL } from '../api/api';
import { useNavigate } from 'react-router';

const LoginForm = () => {

    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });

    const handleOnSubmit = async (e) => {
        e.preventDefault();
        // Handle form submission logic here


        const res = await fetch(BASE_URL + "login", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData),
        });

        if (!res.ok) {
            console.error('Login failed:', res.statusText);
            return;
        } 

        await res.json().then((data) => {
            localStorage.setItem('token', data.token);
        });

        // Reset form data after submission if needed
        setFormData({
            email: '',
            password: ''
        });

        // Redirect to home page or show success message
        navigate('/home');
    }

    const handleOnChange = (e) => {
        // Handle input changes here if needed
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    }

    return (
        <>
            <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
                <h1 className="text-3xl font-bold mb-6">La Cuponera</h1>
                <form className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 w-full max-w-sm"
                onSubmit={handleOnSubmit}>
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="username">
                            Email
                        </label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            placeholder="Enter your email"
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            onChange={handleOnChange}
                        />
                    </div>
                    <div>
                        <label className="block text-gray-700 text-sm font-bold" htmlFor="password">
                            Password
                        </label>
                        <input
                            type="password"
                            id="password"
                            name="password"
                            placeholder="Enter your password"
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            onChange={handleOnChange}
                        />
                    </div>
                    <div>
                        {/* Forgot password? */}
                        <p className="text-right mb-4">
                            <a href="#" className="text-blue-500 hover:text-blue-800 text-sm">Forgot Password?</a>
                        </p>
                    </div>
                    <button
                        type="submit"
                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-full"
                    >
                        Login
                    </button>
                </form>
            </div>
        </>
    )
}

export default LoginForm