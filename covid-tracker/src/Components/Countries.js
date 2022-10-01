import React, { useEffect, useState } from 'react'
import Tabs from './Tabs'
import CountryList from './CountryList'

function Countries(props) {
    const [summary, setSummary] = useState({ Countries: [] });
    async function getCountries() {
        const response = await fetch('https://coviid-tracker.herokuapp.com/api/covid/summary', {
            method: 'GET',
            headers: {
                'Accept': '*/*',
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Headers': '*',
            },
        });
        const json = await response.json();
        setSummary(json);
    }
    useEffect(() => {
        getCountries();
      }, []);
    return (
        <>
            <Tabs />
                <div className="overflow-x-auto">
                    <table className="min-w-full text-sm border border-blue-100 divide-y-2 divide-blue-200 table-auto">
                        <thead>
                            <tr className="divide-x divide-blue-300">
                                <th className="px-4 py-2 font-medium text-left text-gray-900 whitespace-nowrap">Name</th>
                                <th className="px-4 py-2 font-medium text-left text-gray-900 whitespace-nowrap">Total Confirmed</th>
                                <th className="px-4 py-2 font-medium text-left text-gray-900 whitespace-nowrap">Confirmed (New)</th>
                                <th className="px-4 py-2 font-medium text-left text-gray-900 whitespace-nowrap">Total Deaths</th>
                                <th className="px-4 py-2 font-medium text-left text-gray-900 whitespace-nowrap">Deaths (New)</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-blue-200">
                            {summary.Countries.map((countryList) => { return <><CountryList key={countryList.sno} data={countryList} /></> })}
                        </tbody>
                    </table>
                </div>
        </>
    )
}

export default Countries
