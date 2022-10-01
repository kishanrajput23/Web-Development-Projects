const mongoose = require('mongoose');
const mongoURI = '';
const connectToMongo = ()=>{
    mongoose.connect(process.env.MONGODB_URI || mongoURI, {dbName:'covid-tracker'}, ()=>{
        console.log("Connected Successfully!");
    })
}

module.exports = connectToMongo;
