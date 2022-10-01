import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom';

function Signup() {
    const navigate = useNavigate();
    useEffect(() => {
        if (localStorage.getItem('token')) {
            navigate('/home');
        }
    });
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [pass, setPass] = useState("");
    const submit = async (e) => {
        e.preventDefault();
        if (!email || !pass || !name) {
            alert("One or more fields are empty!");
        }
        else {
            const response = await fetch('https://coviid-tracker.herokuapp.com/api/auth/createuser', {
                method: 'POST',
                headers: {
                    'Accept': '*/*',
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': '*',
                    'Access-Control-Allow-Headers': '*',
                },
                body: JSON.stringify({ name: `${name}`, email: `${email}`, password: `${pass}` })
            });
            const json = await response.json();
            if (json.success == true) {
                localStorage.setItem('token', json.authToken);
                navigate('/home');
            }
            else {
                alert("An account with this email already exists!");
            }
        }
    }
    return (
        <div className="flex items-center min-h-screen">
            <div className="flex-1 h-full max-w-4xl mx-auto bg-slate-300 rounded-lg shadow-xl">
                <div className="flex flex-col md:flex-row">
                    <div className="h-32 md:h-auto md:w-1/2">
                        <img className="object-cover w-full h-full" src="./covid3.png"
                            alt="img" />
                    </div>
                    <div className="flex items-center justify-center p-6 sm:p-12 md:w-1/2">
                        <form className="w-full" onSubmit={submit}>
                            <div className="flex justify-center">
                                <img src='./login.png' height='30' width='30'></img>
                                {/* <svg xmlns="http://www.w3.org/2000/svg" className="w-20 h-20 text-blue-600" fill="none"
                                    viewBox="0 0 24 24" stroke="currentColor">
                                    <path d="M12 14l9-5-9-5-9 5 9 5z" />
                                    <path
                                        d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" />
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                                        d="M12 14l9-5-9-5-9 5 9 5zm0 0l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14zm-4 6v-7.5l4-2.222" />
                                </svg> */}
                            </div>
                            <h1 className="mb-4 text-2xl font-bold text-center text-gray-700">
                                Sign up
                            </h1>
                            <div>
                                <label className="block text-sm">
                                    Name
                                </label>
                                <input type="text"
                                    className="w-full px-4 py-2 text-sm border rounded-md focus:border-blue-400 focus:outline-none focus:ring-1 focus:ring-blue-600"
                                    placeholder="Name" onChange={(e) => { setName(e.target.value) }} />
                            </div>
                            <div className="mt-4">
                                <label className="block text-sm">
                                    Email
                                </label>
                                <input type="email"
                                    className="w-full px-4 py-2 text-sm border rounded-md focus:border-blue-400 focus:outline-none focus:ring-1 focus:ring-blue-600"
                                    placeholder="Email Address" onChange={(e) => { setEmail(e.target.value) }} />
                            </div>
                            <div>
                                <label className="block mt-4 text-sm">
                                    Password
                                </label>
                                <input
                                    className="w-full px-4 py-2 text-sm border rounded-md focus:border-blue-400 focus:outline-none focus:ring-1 focus:ring-blue-600"
                                    placeholder="Password" type="password" onChange={(e) => { setPass(e.target.value) }} />
                            </div>
                            <button
                                className="block w-full px-4 py-2 mt-4 text-sm font-medium leading-5 text-center text-white transition-colors duration-150 bg-blue-600 border border-transparent rounded-lg active:bg-blue-600 hover:bg-blue-700 focus:outline-none focus:shadow-outline-blue"
                                href="#" onSubmit={submit}>
                                Sign up
                            </button>

                            <div className="mt-4 text-center">
                                <p className="text-sm">Already have an account? <a href="/login"
                                    className="text-blue-600 hover:underline"> Log in.</a></p>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Signup
