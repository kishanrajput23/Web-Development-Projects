import React from 'react'
import { useNavigate } from 'react-router-dom';

function CountryList(props) {
    const navigate = useNavigate();
    const country=(e)=>{
        navigate('/country', { state: {name : props.data.Country} })
    }
    return (
        <tr className="divide-x divide-blue-300 text-center">
            <td className="px-4 py-2 font-medium text-gray-900 whitespace-nowrap hover:underline hover:bg-blue-500 hover:text-white rounded-lg" onClick={country}>{props.data.Country}</td>
            <td className="px-4 py-2 text-gray-700 whitespace-nowrap">{props.data.TotalConfirmed}</td>
            <td className="px-4 py-2 text-gray-700 whitespace-nowrap">{props.data.NewConfirmed}</td>
            <td className="px-4 py-2 text-gray-700 whitespace-nowrap">{props.data.TotalDeaths}</td>
            <td className="px-4 py-2 text-gray-700 whitespace-nowrap">{props.data.NewDeaths}</td>
        </tr>
    )
}

export default CountryList
