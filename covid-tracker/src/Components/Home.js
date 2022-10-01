import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import ChartBar from './ChartBar';
import Tabs from './Tabs';

function Home() {
  const navigate = useNavigate();
  useEffect(() => {
    if (!localStorage.getItem('token')) {
      navigate('/');
    }
  }, []);
  return (
    <>
    <Tabs/>
    <div className='mt-8 scale-85 translate-y-2'>
      <ChartBar/>
    </div>
    </>
  )
}

export default Home

