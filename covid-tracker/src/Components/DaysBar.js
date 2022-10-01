import React, { useEffect, useState } from 'react'
import { Bar } from 'react-chartjs-2';
import Chart from 'chart.js/auto';


function DaysBar(props) {
    const arbitraryStackKey = "stack1";
    // const [datesArr, setDatesArr] = useState([]);
    // useEffect(() => {
    //     const tmp = props.cases.map(element => Object.keys(element));
    //     setDatesArr(tmp);
    // }, [props.cases]);
    const datesArr = props.cases.map(element => Object.keys(element));
    const casesArr = props.cases.map(element => Object.values(element)[0]);
    const deathsArr = props.deaths.map(element => Object.values(element)[0]);
    return (
        <div>
            <Bar
                data={{
                    labels: datesArr,
                    datasets: [{
                        hoverBackgroundColor: 'rgba(75, 192, 192, 1.8)',
                        maxBarThickness: 150,
                        label: '# of cases',
                        data: casesArr,
                        stack: arbitraryStackKey,
                        backgroundColor: [
                            'rgba(75, 192, 192, 0.8)'
                        ],
                        borderColor: [
                            'rgba(75, 192, 192, 1)'
                        ],
                        borderWidth: 1
                    }, {
                        hoverBackgroundColor: 'rgba(54, 162, 235, 1.8)',
                        maxBarThickness: 150,
                        label: '# of deaths',
                        data: deathsArr,
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
                            beginAtZero: false
                        }
                    },
                    plugins: {
                        legend: { position: 'bottom' }
                    }
                }} /></div>
    )
}

export default DaysBar
