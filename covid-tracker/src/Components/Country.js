import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom';
import DatePicker from 'react-datepicker'
import "react-datepicker/dist/react-datepicker.css";
import LastDays from './LastDays';


function Country() {
    const { state } = useLocation();
    const { name } = state;
    const [data, setData] = useState({ countryInfo: {} });
    const [clickk, setClick] = useState(0);
    async function getCovidData() {
        const response = await fetch('https://coviid-tracker.herokuapp.com/api/covid/countryspecific', {
            method: 'POST',
            headers: {
                'Accept': '*/*',
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Headers': '*',
            },
            body: JSON.stringify({ country: `${name}` })
        });
        const json = await response.json();
        setData(json);
    }
    useEffect(() => {
        getCovidData();
    }, [name]);
    const [selectedDate, setSelectedDate] = useState(null);
    const [selectedDate1, setSelectedDate1] = useState(null);
    console.log(new Date(selectedDate))
    const handleClick =(e)=>{
        setClick(clickk+1);
    }
    return (
        <>
            <div className='bg-gradient-to-r from-sky-400 via-sky-200 to-cyan-100 text-center'>
                <a
                    className="relative block p-8 overflow-hidden border border-gray-100 rounded-lg"
                >
                    <span
                        className="absolute inset-x-0 bottom-0 h-1  bg-gradient-to-r from-blue-700 via-sky-500 to-blue-400"
                    ></span>

                    <div className="justify-center gap-5 sm:flex">
                        <div>
                            <h5 className="text-xl font-bold text-gray-900 mt-4">
                                {data.country}
                            </h5>
                            <p className="mt-1 text-xs font-medium text-gray-600">{data.countryInfo.iso2} | {data.continent}</p>
                        </div>

                        <div className="flex-shrink-0 hidden ml-3 sm:block">
                            <img
                                className="object-cover w-16 h-16 rounded-lg shadow-sm"
                                src={data.countryInfo.flag}
                                alt=""
                            />
                        </div>
                    </div>


                    <dl className="flex flex-wrap md:order-2 gap-x-2 gap-y-6 justify-center mt-6">
                        <div className="flex flex-col-reverse">
                            <dt className="font-bold text-2xl text-gray-600">{data.cases}</dt>
                            <dd className="text-sm text-gray-500">Cases</dd>
                        </div>

                        <div className="flex flex-col-reverse ml-3 sm:ml-6">
                            <dt className="text-2xl font-bold text-gray-600">{data.recovered}</dt>
                            <dd className="text-sm text-gray-500">Recovered</dd>
                        </div>
                        <div className="flex flex-col-reverse ml-3 sm:ml-6">
                            <dt className="text-2xl font-bold text-gray-600">{data.deaths}</dt>
                            <dd className="text-sm text-gray-500">Deaths</dd>
                        </div>
                        <div className="flex flex-col-reverse ml-3 sm:ml-6">
                            <dt className="text-2xl font-bold text-gray-600">{data.active}</dt>
                            <dd className="text-sm text-gray-500">Active</dd>
                        </div>
                        <div className="flex flex-col-reverse ml-3 sm:ml-6">
                            <dt className="text-2xl font-bold text-gray-600">{data.critical}</dt>
                            <dd className="text-sm text-gray-500">Critical</dd>
                        </div>
                        <div className="flex flex-col-reverse ml-3 sm:ml-6">
                            <dt className="text-2xl font-bold text-gray-600">{data.todayCases}</dt>
                            <dd className="text-sm text-gray-500">Cases (Today)</dd>
                        </div>
                        <div className="flex flex-col-reverse ml-3 sm:ml-6">
                            <dt className="text-2xl font-bold text-gray-600">{data.todayRecovered}</dt>
                            <dd className="text-sm text-gray-500">Recovered (Today)</dd>
                        </div>
                        <div className="flex flex-col-reverse ml-3 sm:ml-6">
                            <dt className="text-2xl font-bold text-gray-600">{data.todayDeaths}</dt>
                            <dd className="text-sm text-gray-500">Deaths (Today)</dd>
                        </div>
                    </dl>
                </a>
            </div>
            <div className='flex justify-center items-center gap-2 border-sky-200 rounded bg-sky-800'>
                <div className='py-2'>
                <h1 className='text-center text-white font-bold'>Initial date</h1>
                <div className="flex justify-center items-center rounded">
                    <DatePicker selected={selectedDate} onChange={date => setSelectedDate(date)} dateFormat='MM/dd/yy'minDate={new Date(new Date().setDate(new Date().getDate() - 30))} maxDate={new Date()}/>
                </div>
                </div>
                <div className='py-2'>
                <h1 className='text-center text-white font-bold'>Final date</h1>
                <div className="flex justify-center items-center rounded">
                    <DatePicker selected={selectedDate1} onChange={date => setSelectedDate1(date) } dateFormat='MM/dd/yy' minDate={new Date()} maxDate={new Date()}/>
                </div>
                </div>
                <button type="button" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded text-sm px-5 py-1 mt-6 text-center mr-3 md:mr-0 hover:bg-blue-700 focus:ring-blue-800 shadow-xl" onClick={handleClick}>Submit</button>
            </div>
            <div>
                <LastDays name={data.country} iniDate={selectedDate} finDate={selectedDate1} clickk={clickk}/>
            </div>
        </>
    )
}

export default Country
