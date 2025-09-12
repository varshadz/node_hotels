const mongoose = require('mongoose')

const mongoURL = 'mongodb://localhost:27017/hotels'

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