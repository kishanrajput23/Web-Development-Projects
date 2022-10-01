import React, { useEffect, useState } from 'react'
import DaysBar from './DaysBar';

function LastDays(props) {
  let iniDate = props.iniDate;
  let finDate = props.finDate;
  let n = 1;
  const [lst, setLst] = useState([]);
  const [lst1, setLst1] = useState([]);
  const [covdata, setCovData] = useState({ cases: {}, deaths: {} });
  async function delay() {
    return new Promise(resolve => { resolve() })
  }
  async function getData() {
    n = Math.floor((finDate - iniDate) / (1000 * 60 * 60 * 24));
    const response = await fetch('https://coviid-tracker.herokuapp.com/api/covid/countrylastdays', {
      method: 'POST',
      headers: {
        'Accept': '*/*',
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': '*',
      },
      body: JSON.stringify({ country: `${props.name}`, lastdays: `${n}` })
    });
    const json = await response.json();
    setCovData(json.timeline);
    let tmp = [];
    for (let i in covdata.cases) {
      tmp.push({ [i]: covdata.cases[i] });
    }
    await setLst(tmp);
    let tmp1 = [];
    for (let i in covdata.deaths) {
      tmp1.push({ [i]: covdata.deaths[i] });
    }
    await setLst1(tmp1);
    await delay();
  }
  useEffect(() => {
    getData();
  }, [iniDate, finDate, n, props.clickk]);
  return (
    <div>
      <DaysBar cases={lst} deaths={lst1} />
    </div>
  )
}

export default LastDays

