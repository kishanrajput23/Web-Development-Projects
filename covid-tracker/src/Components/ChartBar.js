import React, { useEffect, useState } from 'react'
import { Bar } from 'react-chartjs-2';
import Chart from 'chart.js/auto';


function ChartBar(props) {
  const arbitraryStackKey = "stack1";
  const [updateTime, setUpdate] = useState(`21/5/2022, 9:10:55 am`);
  const [continents, setContinents] = useState([{}, {}, {}, {}, {}, {}]);
  async function getCovidData() {
    const response = await fetch('https://coviid-tracker.herokuapp.com/api/covid/continents', {
      method: 'GET',
      headers: {
        'Accept': '*/*',
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': '*',
      },
    });
    const json = await response.json();
    let tmp = await new Date(json[0].updated).toLocaleString();
    setContinents(json);
    setUpdate(tmp);
  }
  useEffect(() => {
    getCovidData();
  }, []);
  return (
    <>
    <h1 className='text-xl underline font-bold text-center'>Data by Continents</h1>
    <h1 className='text-slate-600 text-center'>(Updated at {updateTime}) </h1>
    <div>
    <Bar
      data={{
        labels: [continents[0].continent, continents[1].continent, continents[2].continent, continents[3].continent, continents[4].continent, continents[5].continent],
        datasets: [{
          hoverBackgroundColor : 'rgba(75, 192, 192, 1.8)',
          maxBarThickness : 150,
          label: '# of recovered patients',
          data: [continents[0].recovered, continents[1].recovered, continents[2].recovered, continents[3].recovered, continents[4].recovered, continents[5].recovered],
          stack: arbitraryStackKey,
          backgroundColor: [
            'rgba(75, 192, 192, 0.8)'
          ],
          borderColor: [
            'rgba(75, 192, 192, 1)'
          ],
          borderWidth: 1
        }, {
          hoverBackgroundColor : 'rgba(54, 162, 235, 1.8)',
          maxBarThickness : 150,
          label: '# of active cases',
          data: [continents[0].active, continents[1].active, continents[2].active, continents[3].active, continents[4].active, continents[5].active],
          stack: arbitraryStackKey,
          backgroundColor: [
            'rgba(54, 162, 235, 0.8)'
          ],
          borderColor: [
            'rgba(54, 162, 235, 1)'
          ],
          borderWidth: 1
        },
        { 
          hoverBackgroundColor : 'rgba(255, 99, 132, 1.8)',
          maxBarThickness :150,
          label: '# of deaths',
          data: [continents[0].deaths, continents[1].deaths, continents[2].deaths, continents[3].deaths, continents[4].deaths, continents[5].deaths],
          stack: arbitraryStackKey,
          backgroundColor: [
            'rgba(255, 99, 132, 0.8)'
          ],
          borderColor: [
            'rgba(255, 99, 132, 1)'
          ],
          borderWidth: 1
        }
        ]
      }} height={600} width={600} options={{
        maintainAspectRatio: false, scales: {
          y: {
            beginAtZero: true
          }
        },
        plugins : {
          legend : {position :'bottom'}
        }
      }} /></div>
      </>
  )
}

export default ChartBar