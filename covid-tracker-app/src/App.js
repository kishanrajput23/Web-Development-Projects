import React, { useEffect, useState } from "react";
import "./App.css";
import {
  MenuItem,
  FormControl,
  Select,
  CardContent,
  Card,
} from "@material-ui/core";
import InfoBox from "./InfoBox";
import Map from "./Map";
import Table from "./Table";
import { sortData, prettyPrintStat } from "./util";
import LineGraph from "./LineGraph";
import "leaflet/dist/leaflet.css";
import "./InfoBox.css";

function App() {
  const [countries, setCountries] = useState([]);
  const [country, setCountry] = useState("worldwide");
  const [countryInfo, setCountryInfo] = useState({});
  const [tableData, setTableData] = useState([]);
  const [mapCenter, setMapCenter] = useState([34.80746, -40.4796]);
  const [zoom, setZoom] = useState(3);
  const [mapCountries, setMapCountries] = useState([]);
  const [casesType, setCasesType] = useState("cases");
  const [isLoading, setLoading] = useState(false);

  useEffect(() => {
    fetch("https://disease.sh/v3/covid-19/all")
      .then((response) => response.json())
      .then((data) => {
        setCountryInfo(data);
      });
  }, []);

  useEffect(() => {
    const getCountriesData = async () => {
      await fetch("https://disease.sh/v3/covid-19/countries")
        .then((response) => response.json())
        .then((data) => {
          const countries = data.map((country) => ({
            name: country.country,
            value: country.countryInfo.iso2,
          }));

          const sortedData = sortData(data);
          setTableData(sortedData);
          setMapCountries(data);
          setCountries(countries);
        });
    };

    getCountriesData();
  }, []);

  const onCountryChange = async (event) => {
    setLoading(true);
    const countryCode = event.target.value;

    setCountry(countryCode);

    const url =
      countryCode === "worldwide"
        ? "https://disease.sh/v3/covid-19/all"
        : `https://disease.sh/v3/covid-19/countries/${countryCode}`;

    //https://disease.sh/v3/covid-19/all
    //https://disease.sh/v3/covid-19/countries/[countryCode]

    await fetch(url)
      .then((response) => response.json())
      .then((data) => {
        setCountry(countryCode);
        setCountryInfo(data);
        setLoading(false);

        countryCode === "worldwide"
          ? setMapCenter([34.80746, -40.4796])
          : setMapCenter([data.countryInfo.lat, data.countryInfo.long]);
        setZoom(4);
      });

    console.log(countryInfo);
  };

  return (
    <div className="app_box">
      <div className="app">
        <div className="app__left">
          <div className="app__header">
            <h1>SIRT COVID-19 TRACKER</h1>
            <FormControl className="app__dropdown">
              <Select
                variant="outlined"
                onChange={onCountryChange}
                value={country}
              >
                <MenuItem
                  value="worldwide"
                  className="dropdown"
                  backgroundColor="white"
                >
                  Worldwide
                </MenuItem>
                {countries.map((country) => (
                  <MenuItem value={country.value}>{country.name}</MenuItem>
                ))}
              </Select>
            </FormControl>
          </div>

          <div className="app__stats">
            <InfoBox
              isRed
              active={casesType === "cases"}
              className="infoBox__cases"
              onClick={(e) => setCasesType("cases")}
              title="Coronavirus Cases"
              total={prettyPrintStat(countryInfo.cases)}
              cases={prettyPrintStat(countryInfo.todayCases)}
              isloading={isLoading}
            />
            <InfoBox
              active={casesType === "recovered"}
              className="infoBox__recovered"
              onClick={(e) => setCasesType("recovered")}
              title="Recovered"
              total={prettyPrintStat(countryInfo.recovered)}
              cases={prettyPrintStat(countryInfo.todayRecovered)}
              isloading={isLoading}
            />
            <InfoBox
              isGrey
              active={casesType === "deaths"}
              className="infoBox__deaths"
              onClick={(e) => setCasesType("deaths")}
              title="Deaths"
              total={prettyPrintStat(countryInfo.deaths)}
              cases={prettyPrintStat(countryInfo.todayDeaths)}
              isloading={isLoading}
            />
          </div>
          {/* Map */}
          <Map
            countries={mapCountries}
            center={mapCenter}
            zoom={zoom}
            casesType={casesType}
          />
        </div>

        <Card className="app__right">
          <CardContent>
            <h3>Live Cases - Countries</h3>
            <Table countries={tableData} />
            <h3 className="app__graphTitle">WorldWide New{casesType} 🎏 📈</h3>
            <LineGraph className="app__graph" casesType={casesType} />
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

// ritesh singh - code

export default App;
