import React, { useEffect } from 'react'
import { useLocation } from 'react-router-dom';

function Tabs() {
    let location = useLocation();
    return (
        <div>
            <ul className="flex border-b bg-blue-200 border-gray-100">
                <li className="flex-1">
                    <a className="relative block p-4" href="/home">
                        {location.pathname == '/home' ? <span className="absolute inset-x-0 w-full h-px bg-pink-600 -bottom-px"></span> : <></>
                        }
                        <div className="flex items-center justify-center">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="flex-shrink-0 w-5 h-5 text-gray-500"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4"
                                />
                            </svg>

                            <span className="ml-3 text-sm font-medium text-gray-900"> Dashboard </span>
                        </div>
                    </a>
                </li>

                <li className="flex-1">
                    <a className="relative block p-4" href="/countries">
                        {location.pathname == '/countries' ? <span className="absolute inset-x-0 w-full h-px bg-pink-600 -bottom-px"></span> : <></>
                        }
                        <div className="flex items-center justify-center">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="flex-shrink-0 w-5 h-5 text-gray-500"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                                />
                            </svg>

                            <span className="ml-3 text-sm font-medium text-gray-900"> Countries </span>
                        </div>
                    </a>
                </li>
            </ul>
        </div>
    )
}

export default Tabs
