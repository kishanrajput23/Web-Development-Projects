import React, { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";

function Login() {
    const navigate = useNavigate();
    useEffect(() => {
        if (localStorage.getItem('token')) {
            navigate('/home');
        }
    });
    const [email, setEmail] = useState("");
    const [pass, setPass] = useState("");
    const submit = async (e) => {
        e.preventDefault();
        if (!email || !pass) {
            alert("Email or Password is missing!");
        }
        else {
            const response = await fetch('https://coviid-tracker.herokuapp.com/api/auth/login/', {
                method: 'POST',
                headers: {
                    'Accept': '*/*',
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': '*',
                    'Access-Control-Allow-Headers': '*',
                },
                body: JSON.stringify({ email: `${email}`, password: `${pass}` })
            });
            const json = await response.json();
            if (json.success == true) {
                localStorage.setItem('token', json.authToken);
                navigate('/home');
            }
            else {
                alert("Invalid credentials!");
            }
        }
    }
    return (
        <>
            <div className="relative flex flex-col justify-center min-h-screen overflow-hidden">
                <div
                    className="w-full p-6 m-auto bg-slate-300 border-t border-purple-600 rounded shadow-lg shadow-purple-800/50 lg:max-w-md">
                    <h1 className="text-3xl font-semibold text-center text-gray-800">Log in</h1>

                    <form className="mt-6" onSubmit={submit}>
                        <div>
                            <label htmlFor="email" className="block text-sm text-gray-800">Email</label>
                            <input type="email"
                                className="block w-full px-4 py-2 mt-2 text-blue-600 bg-white border rounded-md focus:border-purple-400 focus:ring-purple-300 focus:outline-none focus:ring focus:ring-opacity-40" onChange={(e) => { setEmail(e.target.value) }} />
                        </div>
                        <div className="mt-4">
                            <div>
                                <label htmlFor="password" className="block text-sm text-gray-800">Password</label>
                                <input type="password"
                                    className="block w-full px-4 py-2 mt-2 text-purple-700 bg-white border rounded-md focus:border-purple-400 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40" onChange={(e) => { setPass(e.target.value) }} />
                            </div>
                            {/* <a href="#" className="text-xs text-gray-600 hover:underline">Forget Password?</a> */}
                            <div className="mt-6">
                                <button
                                    className="w-full px-4 py-2 tracking-wide text-white transition-colors duration-200 transform bg-blue-600 rounded-md hover:bg-blue-700 focus:outline-none focus:bg-blue-600" onSubmit={submit}>
                                    Login
                                </button>
                            </div>
                        </div>
                    </form>
                    <p className="mt-8 text-xs font-light text-center text-gray-700"> Don't have an account? <a href="/signup"
                        className="font-medium text-blue-600 hover:underline">Sign up</a></p>
                </div>
            </div>
        </>)
}

export default Login
