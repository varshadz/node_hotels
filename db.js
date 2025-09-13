const mongoose = require('mongoose')
require('dotenv').config();

//local database URL
// const mongoURL = process.env.DB_URL
const mongoURL = process.env.MONGO_URL

//set mongodb connection
mongoose.connect(mongoURL)

//get the default connection
const db = mongoose.connection;
db.on('connected', () => {
    console.log('connected to Mongodb server!');
});

db.on('error', (err) => {
    console.log('Mongodb connection error!');
});

db.on('disconnected', () => {
    console.log('Mongodb disconnected!');
});

module.exports = db;