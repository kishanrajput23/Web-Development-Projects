import React from 'react'
import { FaGithub } from "react-icons/fa";

export default function Footer() {
    let footerStyle = {
        position: "fixed",
        bottom: "0",
        width: "100%",
    }
    return (
        <div className='sticky top-[100vh]'>
            <footer className="flex-row p-1 bg-white shadow md:flex md:items-center md:justify-center md:p-2 bg-slate-900 gap-1 shadow-xl" style={footerStyle}>
                <a href='https://github.com/siiddhantt' className=''>
                    <div href='https://github.com/siiddhantt' className="text-sm text-gray-500 sm:text-center text-gray-200 hover:text-blue-200"><FaGithub />
                    </div>
                </a>
                <a href='https://github.com/siiddhantt' className=''>
                    <span href='https://github.com/siiddhantt' className="text-sm text-gray-500 sm:text-center text-gray-200 hover:text-blue-200">siiddhantt
                    </span>
                </a>
            </footer>
        </div>
    )
}