const express = require('express');
const router = express.Router();
const axios = require('axios');
const Data = require('../models/Data');

// Get covid data summary using : GET 'api/covid/summary'.
router.get('/summary', async (req, res) => {
    try {
        getSummary(res);
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Some error occured!")
    }
});

// Get covid data for all continents: GET 'api/covid/continents'.
router.get('/continents', async (req, res) => {
    try {
        let response = await axios.get(`https://corona.lmao.ninja/v2/continents?yesterday=true&sort`);
        let dataGot = await response.data;
        res.send(dataGot);
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Some error occured!")
    }
});

// Get covid data for particular country from a given date to another: GET 'api/covid/countrydate'.
router.get('/countrydate', async (req, res) => {
    try {
        let response = await axios.get(`https://api.covid19api.com/country/${req.body.country}/status/confirmed?from=${req.body.startdate}T00:00:00Z&to=${req.body.enddate}T00:00:00Z`);
        let dataGot = await response.data;
        res.send(dataGot);
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Some error occured!")
    }
});

// Get covid data for particular country in last n days: POST 'api/covid/countrylastdays'.
router.post('/countrylastdays', async (req, res) => {
    try {
        let response = await axios.get(`https://corona.lmao.ninja/v2/historical/${req.body.country}?lastdays=${req.body.lastdays}`);
        let dataGot = await response.data;
        res.send(dataGot);
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Some error occured!")
    }
});

// Get covid data for specific country: POST 'api/covid/countryspecific'.
router.post('/countryspecific', async (req, res) => {
    try {
        let response = await axios.get(`https://corona.lmao.ninja/v2/countries/${req.body.country}?yesterday=true&strict=true&query`);
        let dataGot = await response.data;
        res.send(dataGot);
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Some error occured!")
    }
});



async function getSummary(res) {
    let response = await axios.get(`https://api.covid19api.com/summary`);
    let dataGot = await response.data;
    let dateChck1 = dataGot.Date.slice(0, 10);
    let dateChck2 = await Data.findOne({ Date: { $regex: dateChck1 } });
    if (dateChck2) {
        res.send(dateChck2);
    }
    else {
        let data = await Data.create({
            ID: dataGot.ID,
            Message: dataGot.Message,
            Global: dataGot.Global,
            Countries: dataGot.Countries,
            Date: dataGot.Date
        });
        data.save();
        res.send(dataGot);
    }
}

module.exports = router
